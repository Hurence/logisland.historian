package com.hurence.logisland.historian;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@SpringBootApplication/*(
        scanBasePackages = {
                "com.hurence.logisland.historian.config", "com.hurence.logisland.historian.rest"
        }
)*/
//@EnableWebMvc
public class DataHistorianApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DataHistorianApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(DataHistorianApplication.class, args);
    }
}
