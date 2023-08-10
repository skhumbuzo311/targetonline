using TargetOnline.Models;

namespace TargetOnline.Services.Emails
{
    public interface IEmailService
    {
        bool SendEmail(EmailData emailData);
    }
}
