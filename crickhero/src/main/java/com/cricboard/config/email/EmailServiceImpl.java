package com.cricboard.config.email;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService{
    @Autowired
    JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public void sendSimpleMail(EmailDetailsDto detail) {
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender);
            message.setTo(detail.getRecipient());
            message.setText(detail.getMsgBody());
            message.setSubject(detail.getSubject());
            javaMailSender.send(message);
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendMailWithAttechment(EmailDetailsDto details) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());

            FileSystemResource fileSystemResource = new FileSystemResource(new File(details.getAttachment()));
            mimeMessageHelper.addAttachment(fileSystemResource.getFilename(),fileSystemResource);

            javaMailSender.send(mimeMessage);
        }catch (Exception e){
            log.error(e.getMessage());
        }
    }
}
