using DayCare.Model.Response;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DayCare.Service.IService.User
{
    public interface IPushNotification
    {
        ResponseViewModal SendNotification(string deviceId, string message, string FCM_Server_Key);
        Task<bool> SendPushNotification(string[] deviceTokens, string title, string body, object data, bool isParent);

        Task<bool> SendPushNotificationForWeb(string[] deviceTokens, string title, string body, object data, string msg);
    }
}
