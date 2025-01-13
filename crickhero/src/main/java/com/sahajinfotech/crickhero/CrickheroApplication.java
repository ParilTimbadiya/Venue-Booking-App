package com.sahajinfotech.crickhero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableScheduling
public class CrickheroApplication {
	public static void main(String[] args) {
		SpringApplication.run(CrickheroApplication.class, args);
	}
}
