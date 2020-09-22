using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Entity.Masters
{
    public static class StripeKeySettings
    {
        public static string APIKeySettings { get; set; }
        public static string PushNotificationTeacherAPIKey { get; set; }

        public static string PushNotificationParentAPIKey { get; set; }

        public static string PushNotificationWebAPIKey { get; set; }

        public static string SendGridAPIKey { get; set; }
    }
}
