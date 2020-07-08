using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DayCare.Entity.User
{
    public class UserLoginDevice
    {
        [Key]
        public long Id  {get;set;}
        public long UserId  {get;set;}
        public int OSType  {get;set;}
        public string DeviceToken  {get;set;}
        public DateTime DateAdded  {get;set;}
        public DateTime LastUsed  {get;set;}
        public string DeviceModel  {get;set;}
        public string  OperatingSystemVersion  {get;set;}
        public int DeviceCount  {get;set;}
        public string DeviceId  {get;set;}
        public string Latitude  {get;set;}
        public string Longitude  {get;set;}
        public string IpAddress   {get;set;}
    }
}
