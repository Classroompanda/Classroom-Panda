using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.User
{
    public class UserLoginDeviceViewModel
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public int OSType { get; set; }
        public string DeviceToken { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime LastUsed { get; set; }
        public string DeviceModel { get; set; }
        public string OperatingSystemVersion { get; set; }
        public int DeviceCount { get; set; }
        public string DeviceId { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string IpAddress { get; set; }
    }

    public class Message
    {
        public string[] registration_ids { get; set; }
        public Notification notification { get; set; }
        public object data { get; set; }
    }
    public class Notification
    {
        public string title { get; set; }
        public string text { get; set; }

        public string msgForWeb { get; set; }
        public string sound { get; set; }
    }

}
