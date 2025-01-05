package com.sahajinfotech.crickhero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class CrickheroApplication {
	public static void main(String[] args) {
		SpringApplication.run(CrickheroApplication.class, args);
	}
}
