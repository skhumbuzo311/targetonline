using System.Collections.Generic;

namespace TargetOnline.Models
{
    public class SignupResponse
    {
        public List<string> AdminsExpoPushTokens { get; set; }
        public User User { get; set; }
    }
}
