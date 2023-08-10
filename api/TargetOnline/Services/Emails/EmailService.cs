﻿using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using TargetOnline.Models;
using System;
using System.IO;

namespace TargetOnline.Services.Emails
{
    public class EmailService : IEmailService
    {
        EmailSettings _emailSettings = null;
        public EmailService(IOptions<EmailSettings> options)
        {
            _emailSettings = options.Value;
        }

        public bool SendEmail(EmailData emailData)
        {
            try
            {
                string FilePath = Directory.GetCurrentDirectory() + "//Services//Templates//Template.html";
                StreamReader str = new StreamReader(FilePath);
                string MailText = str.ReadToEnd();

                var builder = new BodyBuilder();
                builder.HtmlBody = MailText.Replace("[encryptedPassword]", emailData.EncryptedPassword);

                MimeMessage emailMessage = new MimeMessage();

                MailboxAddress emailFrom = new MailboxAddress(_emailSettings.Name, _emailSettings.EmailId);
                emailMessage.From.Add(emailFrom);

                MailboxAddress emailTo = new MailboxAddress(emailData.EmailToName, emailData.EmailToId);
                emailMessage.To.Add(emailTo);

                emailMessage.Subject = emailData.EmailSubject;

                BodyBuilder emailBodyBuilder = new BodyBuilder();
                //emailBodyBuilder.TextBody = emailData.EmailBody;
                emailMessage.Body = builder.ToMessageBody(); //emailBodyBuilder.ToMessageBody();

                SmtpClient emailClient = new SmtpClient();
                emailClient.Connect(_emailSettings.Host, _emailSettings.Port, _emailSettings.UseSSL);
                emailClient.Authenticate(_emailSettings.EmailId, _emailSettings.Password);
                emailClient.Send(emailMessage);
                emailClient.Disconnect(true);
                emailClient.Dispose();

                return true;
            }
            catch (Exception ex)
            {
                //Log Exception Details
                Console.WriteLine("Failed to send email");

                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
