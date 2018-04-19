package com.hurence.logisland.historian.config;

import com.hurence.logisland.historian.config.properties.OpcDaConfigurationProperties;
import com.hurence.logisland.historian.opc.OpcFactories;
import com.hurence.logisland.historian.opc.OpcHealthIndicator;
import com.hurence.opc.OpcOperations;
import com.hurence.opc.da.OpcDaConnectionProfile;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.validation.Valid;
import java.time.Duration;

@Configuration
public class OpcDaConfig {


    @Bean
    public OpcHealthIndicator OPCHealthIndicator(OpcOperations opcOperations) {
        return new OpcHealthIndicator(opcOperations);
    }

    @Bean
    @Profile("!opcda")
    public OpcFactories.OpCFakeFactoryBean opcFakeOperations() {
        return new OpcFactories.OpCFakeFactoryBean(300L);
    }


    @Bean
    @Profile("opcda")
    public OpcFactories.OpcDaFactoryBean opcDaOperations(@Valid OpcDaConfigurationProperties properties) {
        OpcDaConnectionProfile connectionProfile = new OpcDaConnectionProfile()
                .withHost(properties.getHost())
                .withDomain(properties.getDomain())
                .withUser(properties.getUser())
                .withPassword(properties.getPassword())
                .withComClsId(properties.getClsId())
                .withComProgId(properties.getProgId());

        connectionProfile.setDirectRead(!properties.isUseServerCache());


        if (properties.getPort() != null) {
            connectionProfile.setPort(properties.getPort());
        }

        if (properties.getRefreshPeriodMillis() != null) {
            connectionProfile.setRefreshPeriodMillis(properties.getRefreshPeriodMillis());
        }

        if (properties.getTimeoutMillis() != null) {
            connectionProfile.setSocketTimeout(Duration.ofMinutes(properties.getTimeoutMillis()));
        }

        return new OpcFactories.OpcDaFactoryBean(connectionProfile, true);


    }


}
