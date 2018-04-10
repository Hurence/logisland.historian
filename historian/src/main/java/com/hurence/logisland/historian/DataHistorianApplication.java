package com.hurence.logisland.historian;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;


@SpringBootApplication(
		scanBasePackages = {
				"com.hurence.logisland.historian.config", "com.hurence.logisland.historian.rest"
		}
)
public class DataHistorianApplication /*{

	public static void main(String[] args) {
		SpringApplication.run(DataHistorianApplication.class, args);
	}
}*/

		extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(DataHistorianApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(DataHistorianApplication.class, args);
	}
}
