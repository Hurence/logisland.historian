package com.hurence.logisland.historian.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Component
@ConfigurationProperties(prefix = "connections.opc-da")
@Validated
public class OpcDaConfigurationProperties {

    /**
     * The hostname (mandatory).
     */
    @NotNull
    private String host;
    /**
     * Server port.
     */
    private Integer port;
    /**
     * The logon domain.
     */
    private String domain;
    /**
     * The user principal.
     */
    private String user;
    /**
     * The authentication password.
     */
    private String password;
    /**
     * Socket timeout in milliseconds.
     */
    private Long timeoutMillis;
    /**
     * The OPC-DA server COM cls ID.
     */
    private String clsId;
    /**
     * The OPC-DA COM prog ID.
     */
    private String progId;
    /**
     * The data refresh period in milliseconds.
     */
    private Long refreshPeriodMillis;

    /**
     * Direct read from device or use server cache (default).
     */
    private boolean useServerCache = true;

    public boolean isUseServerCache() {
        return useServerCache;
    }

    public void setUseServerCache(boolean useServerCache) {
        this.useServerCache = useServerCache;
    }

    public Long getRefreshPeriodMillis() {
        return refreshPeriodMillis;
    }

    public void setRefreshPeriodMillis(Long refreshPeriodMillis) {
        this.refreshPeriodMillis = refreshPeriodMillis;
    }

    public String getClsId() {
        return clsId;
    }

    public void setClsId(String clsId) {
        this.clsId = clsId;
    }

    public String getProgId() {
        return progId;
    }

    public void setProgId(String progId) {
        this.progId = progId;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getTimeoutMillis() {
        return timeoutMillis;
    }

    public void setTimeoutMillis(Long timeoutMillis) {
        this.timeoutMillis = timeoutMillis;
    }
}
