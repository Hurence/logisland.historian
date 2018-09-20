package com.hurence.logisland.historian;

import com.hurence.logisland.historian.config.bean.LogislandConfigurationBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableSwagger2
@EnableConfigurationProperties({LogislandConfigurationBean.class})
public class DataHistorianApplication {


    public static void main(String[] args) {
        SpringApplication.run(DataHistorianApplication.class, args);
    }
}
