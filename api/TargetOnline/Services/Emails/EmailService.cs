using MailKit.Net.Smtp;
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

        public bool SendShopCreationConfirmation(Shop shop, string baseURL)
        {
            try
            {
                string FilePath = Directory.GetCurrentDirectory() + "//Services//Templates//ShopCreationConfirmation.html";
                StreamReader str = new StreamReader(FilePath);
                string MailText = str.ReadToEnd();

                var builder = new BodyBuilder();
                MailText = MailText.Replace("[logoURL]", shop.LogoURL);
                MailText = MailText.Replace("[name]", shop.Name);
                MailText = MailText.Replace("[description]", shop.Description);
                MailText = MailText.Replace("[emailAddress]", shop.EmailAddress);
                MailText = MailText.Replace("[locationAddress]", shop.Location.Description);
                MailText = MailText.Replace("[bankName]", shop.BankName);
                MailText = MailText.Replace("[accountNumber]", shop.AccountNumber);
                MailText = MailText.Replace("[ratePerKM]", shop.RatePerKM.ToString());
                MailText = MailText.Replace("[baseURL]", baseURL);
                builder.HtmlBody = MailText.Replace("[shopId]", shop.Id.ToString());


                MimeMessage emailMessage = new MimeMessage();

                MailboxAddress emailFrom = new MailboxAddress(_emailSettings.Name, _emailSettings.EmailId);
                emailMessage.From.Add(emailFrom);

                MailboxAddress emailTo = new MailboxAddress(shop.ShopOwnerName, shop.EmailAddress);
                emailMessage.To.Add(emailTo);
                MailboxAddress cc = new MailboxAddress("Target Online Pty Ltd", "targetonline2017@gmail.com");
                emailMessage.Cc.Add(cc);

                emailMessage.Subject = "Successful Registration";

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


        public bool SendProductCreationConfirmation(Product product, string baseURL)
        {
            try
            {
                string FilePath = Directory.GetCurrentDirectory() + "//Services//Templates//ProductCreationConfirmation.html";
                StreamReader str = new StreamReader(FilePath);
                string MailText = str.ReadToEnd();

                var builder = new BodyBuilder();
                builder.HtmlBody = MailText.Replace("[imageURL]", product.ImageURL);
                builder.HtmlBody = MailText.Replace("[name]", product.Name);
                builder.HtmlBody = MailText.Replace("[description]", product.Description);
                builder.HtmlBody = MailText.Replace("[price]", product.Price.ToString());
                builder.HtmlBody = MailText.Replace("[baseURL]", baseURL);

                MimeMessage emailMessage = new MimeMessage();

                MailboxAddress emailFrom = new MailboxAddress(_emailSettings.Name, _emailSettings.EmailId);
                emailMessage.From.Add(emailFrom);

                MailboxAddress emailTo = new MailboxAddress(product.Shop.ShopOwnerName, product.CreatedByUser.EmailAddress);
                emailMessage.To.Add(emailTo);
                MailboxAddress cc = new MailboxAddress("Target Online Pty Ltd", "targetonline2017@gmail.com");
                emailMessage.Cc.Add(cc);

                emailMessage.Subject = "Product Added Successfully";

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
