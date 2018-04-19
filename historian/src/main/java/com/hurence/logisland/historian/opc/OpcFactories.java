package com.hurence.logisland.historian.opc;

import com.hurence.opc.OpcData;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.da.OpcDaConnectionProfile;
import com.hurence.opc.da.OpcDaOperations;

public class OpcFactories {


    /**
     * OPC-DA Factory bean for {@link OpcOperations}
     */
    public static class OpcDaFactoryBean extends OpcFactoryBean<OpcDaConnectionProfile, OpcData> {

        /**
         * Create a new spring managed bean.
         *
         * @param connectionProfile the connection information.
         * @param autoReconnect     if true will autoreconnect.
         */
        public OpcDaFactoryBean(OpcDaConnectionProfile connectionProfile, boolean autoReconnect) {
            super(connectionProfile, autoReconnect);
        }

        @Override
        protected OpcOperations<OpcDaConnectionProfile, OpcData> createInstance() {
            return new OpcDaOperations();
        }
    }

    public static class OpCFakeFactoryBean extends OpcFactoryBean<FakeOpcOperations.NullConnectionProfile, OpcData> {

        /**
         * Create a new spring managed bean.
         */
        public OpCFakeFactoryBean(Long refreshPeriodMillis) {
            super(refreshPeriodMillis != null ? new FakeOpcOperations.NullConnectionProfile() :
                            new FakeOpcOperations.NullConnectionProfile(refreshPeriodMillis),
                    false);
        }

        @Override
        protected OpcOperations<FakeOpcOperations.NullConnectionProfile, OpcData> createInstance() {
            return new FakeOpcOperations();
        }
    }
}
