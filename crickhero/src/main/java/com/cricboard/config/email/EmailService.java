package com.cricboard.config.email;

public interface EmailService {
    void sendSimpleMail(EmailDetailsDto detail);
    void sendMailWithAttechment(EmailDetailsDto details);
}
