package com.hurence.logisland.historian.opc;

import com.hurence.opc.ConnectionProfile;
import com.hurence.opc.ConnectionState;
import com.hurence.opc.OpcData;
import com.hurence.opc.OpcOperations;
import org.apache.commons.lang3.RandomStringUtils;
import org.jinterop.dcom.core.JIVariant;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class FakeOpcOperations implements OpcOperations<FakeOpcOperations.NullConnectionProfile, OpcData> {

    static class NullConnectionProfile extends ConnectionProfile<NullConnectionProfile> {

        /**
         * Data refresh period in milliseconds.
         */
        private final long refreshPeriodMillis;

        /**
         * Standard constructor. Data refresh period is 1 s.
         */
        public NullConnectionProfile() {
            this(1000);
        }

        /**
         * Constructor with explicit data refresh period.
         *
         * @param refreshPeriodMillis Data refresh period in milliseconds.
         */
        public NullConnectionProfile(long refreshPeriodMillis) {
            this.refreshPeriodMillis = refreshPeriodMillis;
        }

        public long getRefreshPeriodMillis() {
            return refreshPeriodMillis;
        }


    }

    private ConnectionState connectionState = ConnectionState.DISCONNECTED;
    private NullConnectionProfile connectionProfile;

    @Override
    public void connect(NullConnectionProfile connectionProfile) {
        this.connectionProfile = connectionProfile;
        connectionState = ConnectionState.CONNECTED;
    }

    @Override
    public void disconnect() {
        connectionState = ConnectionState.DISCONNECTED;
    }

    @Override
    public ConnectionState getConnectionState() {
        return connectionState;
    }

    @Override
    public Collection<String> browseTags() {
        List<String> ret = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            ret.add(RandomStringUtils.randomAlphabetic(6));
        }
        return ret;
    }

    private OpcData randomData(String tagName) {
        Random r = new Random();
        OpcData ret = new OpcData();
        ret.setQuality(r.nextInt());
        ret.setValue(JIVariant.makeVariant(new Double(r.nextDouble())));
        ret.setTag(tagName);
        ret.setTimestamp(Instant.now());
        return ret;
    }

    @Override
    public Collection<OpcData> read(String... tags) {
        return Arrays.stream(tags).map(this::randomData)
                .collect(Collectors.toList());
    }

    @Override
    public boolean write(OpcData... data) {
        return true;
    }

    @Override
    public Stream<OpcData> stream(String... tags) {
        final List<OpcData> data = new ArrayList<>();
        return Stream.generate(() -> {
            if (getConnectionState() == ConnectionState.CONNECTED) {
                if (data.isEmpty()) {
                    try {
                        Thread.sleep(connectionProfile.getRefreshPeriodMillis());
                    } catch (InterruptedException e) {
                        throw new RuntimeException("Interrupted", e);
                    }
                    data.addAll(read(tags));
                }
                return data.remove(0);
            } else {
                throw new RuntimeException("Stream terminated. Source disconnected.");
            }
        });
    }

    @Override
    public boolean awaitConnected() {
        while (connectionState != ConnectionState.CONNECTED) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                break;
            }
        }
        return connectionState == ConnectionState.CONNECTED;
    }

    @Override
    public boolean awaitDisconnected() {
        while (connectionState != ConnectionState.DISCONNECTED) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                break;
            }
        }
        return connectionState == ConnectionState.DISCONNECTED;
    }
}
