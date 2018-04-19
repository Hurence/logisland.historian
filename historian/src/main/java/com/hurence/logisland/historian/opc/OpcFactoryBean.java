package com.hurence.logisland.historian.opc;

import com.hurence.opc.ConnectionProfile;
import com.hurence.opc.ConnectionState;
import com.hurence.opc.OpcData;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.util.AutoReconnectOpcOperations;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.FactoryBean;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * Factory bean instantiating a {@link OpcOperations} and handling its lifecycle.
 */
abstract class OpcFactoryBean<T extends ConnectionProfile<T>, U extends OpcData> implements FactoryBean<OpcOperations<T, U>> {

    /**
     * The connection information.
     */
    private final T connectionProfile;
    /**
     * If true the provided object will automatically reconnect to the server in case of disconnection.
     */
    private final boolean autoReconnect;
    /**
     * The delegate instance.
     */
    private OpcOperations<T, U> instance;

    /**
     * Construct an instance of this bean factory.
     *
     * @param connectionProfile the connection profile
     * @param autoReconnect     if true will use a {@link AutoReconnectOpcOperations} as a backing bean.
     */
    public OpcFactoryBean(T connectionProfile, boolean autoReconnect) {
        this.connectionProfile = connectionProfile;
        this.autoReconnect = autoReconnect;
    }

    protected abstract OpcOperations<T, U> createInstance();

    @Override
    public Class<?> getObjectType() {
        return instance.getClass();
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    @Override
    public OpcOperations<T, U> getObject() {
        return instance;
    }

    @PostConstruct
    public void init() {
        OpcOperations<T, U> tmp = createInstance();
        if (autoReconnect) {
            instance = new AutoReconnectOpcOperations<>(tmp);
        } else {
            instance = tmp;
        }
        instance.connect(connectionProfile);
        if (!instance.awaitConnected()) {
            throw new BeanInitializationException("Unable to connect to OPC-DA server");
        }
    }

    @PreDestroy
    public void destroy() {
        if (instance != null && instance.getConnectionState() != ConnectionState.DISCONNECTED) {
            instance.disconnect();
            instance.awaitDisconnected();
        }
    }


}
