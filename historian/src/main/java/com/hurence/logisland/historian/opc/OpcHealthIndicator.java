package com.hurence.logisland.historian.opc;

import com.hurence.opc.ConnectionState;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.da.OpcDaOperations;
import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health;

public class OpcHealthIndicator extends AbstractHealthIndicator {

    private final OpcOperations beanToObserve;

    public OpcHealthIndicator(OpcOperations beanToObserve) {
        this.beanToObserve = beanToObserve;
    }

    @Override
    protected void doHealthCheck(Health.Builder builder) {
        if (beanToObserve.getConnectionState() == ConnectionState.CONNECTED) {
            builder.up();
        } else {
            builder.down().withDetail("status", (beanToObserve.getConnectionState()));
        }
    }


}
