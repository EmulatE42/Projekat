package com.ftn.service.implementation;

import com.ftn.domain.Guest;
import com.ftn.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;

/**
 * Created by EmulatE on 24-May-17.
 */
@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;


    @Autowired
    public MailServiceImpl(JavaMailSender mailSender)
    {
        this.mailSender = mailSender;
    }


    @Override
    public void sendUserActivationEmail(Guest guest, String token) {

        MimeMessagePreparator preparator = getActivationMessagePreparator(guest, token);

        try
        {
            mailSender.send(preparator);
            //System.out.println("Message Send...Hurrey");
        }
        catch (MailException ex)
        {
            System.err.println(ex.getMessage());
        }
    }



    private MimeMessagePreparator getActivationMessagePreparator(Guest guest, String token) {

        System.out.println("TOKEN JEEEEEEEEEEEE " + token);
        String messageText = "Hello " + guest.getFirst_name() + " " + guest.getLast_name()  + ",\n\n" +
                "To activate your account please click the following link: " +
                "http://localhost:8090/guest/" + guest.getEmail() + "/" + token ;

        return getPreparator(guest.getEmail(), messageText, "Activation email");
    }




    private MimeMessagePreparator getPreparator(String email, String messageText, String subject)
    {
        MimeMessagePreparator mmp = mimeMessage ->
        {
            mimeMessage.setFrom("emulate42@gmail.com");
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress("isamrs123@gmail.com"));
            mimeMessage.setText(messageText);
            mimeMessage.setSubject(subject);
        };
        return mmp;
    }

}
