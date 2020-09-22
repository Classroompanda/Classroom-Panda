using AutoMapper.Configuration;
using DayCare.Entity.Masters;
using DayCare.Model.Response;
using DayCare.Model.User;
using DayCare.Service.IService.User;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.User
{
    public class PushNotification : IPushNotification
    {
        public ResponseViewModal SendNotification(string deviceId, string message, string FCM_Server_Key)
        {
            ResponseViewModal res = new ResponseViewModal();
            var result = "-1";
            //string deviceId = "d3W0nY4WFy4:APA91bGBuiddp8CIUKGWcXYzOAYKPsfWDfhqBK5dPgtLDMF3nr8na0Hdc7mqzneyVkKlguQXUS4CyJGxy8TPE9_xcfNV8r-QHVEAVn__oZdC5UVbig9AzqoB9qAHwd5AZguYhTHMpArx";
            //deviceId = "cqfCsEb2PSc:APA91bHvtLdSPJlOnmrl_b3Wgxrq31A6O6u7Olw8tsKn2cywzWRQZ_UGyOyi42rnv_TJBvxN6GJk66xT6eEmmQ8u6z-_p4YZXfxjh-vkT3KbNktCw1SXW-5TZIHuACCnIoVoAQwRBszw";
            //deviceId = "cqfCsEb2PSc:APA91bHvtLdSPJlOnmrl_b3Wgxrq31A6O6u7Olw8tsKn2cywzWRQZ_UGyOyi42rnv_TJBvxN6GJk66xT6eEmmQ8u6z-_p4YZXfxjh-vkT3KbNktCw1SXW-5TZIHuACCnIoVoAQwRBszw";
            //string message = "Hello Testing Notification 112233";
            try
            {
                
                var webAddr = "https://fcm.googleapis.com/fcm/send";

                var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Authorization:key=" + FCM_Server_Key);
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = "{\"to\":\"" + deviceId + "\",\"data\": {\"body\":\"" + message + "\",}}";
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = result;
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public async Task<bool> SendPushNotification (string[] deviceTokens, string title, string body, object data,bool isParent)
        {
            try
            {
                //var ServerKey = "AIzaSyByxXJAmAgTlyI3LySZpkhvK5J5rLIkmqk";
                var NotifyKey=string.Empty;
                if (isParent == true)
                {
                    NotifyKey = StripeKeySettings.PushNotificationParentAPIKey;
                }
                else
                {
                    NotifyKey = StripeKeySettings.PushNotificationTeacherAPIKey;
                }
                var FireBasePushNotificationsURL = "https://fcm.googleapis.com/fcm/send";
                var messageInformation = new Message()
                {
                    notification = new Notification()
                    {
                        title = title,
                        text = body,
                        sound = "default"
                    },
                    data = data,
                    registration_ids = deviceTokens
                };
                //Object to JSON STRUCTURE => using Newtonsoft.Json;
                string jsonMessage = JsonConvert.SerializeObject(messageInformation);

                // Create request to Firebase API
                var request = new HttpRequestMessage(HttpMethod.Post, FireBasePushNotificationsURL);
                request.Headers.TryAddWithoutValidation("Authorization", "key =" + NotifyKey);
                request.Content = new StringContent(jsonMessage, Encoding.UTF8, "application/json");
                HttpResponseMessage result;
                using (var client = new HttpClient())
                {
                    result = await client.SendAsync(request);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return true;
        }


        public async Task<bool> SendPushNotificationForWeb(string[] deviceTokens, string title, string body, object data,string msg)
        {
            try
            {
                //var ServerKey = "AIzaSyByxXJAmAgTlyI3LySZpkhvK5J5rLIkmqk";
                var NotifyKey = string.Empty;               
                 NotifyKey = StripeKeySettings.PushNotificationWebAPIKey;
                
                var FireBasePushNotificationsURL = "https://fcm.googleapis.com/fcm/send";
                var messageInformation = new Message()
                {
                    notification = new Notification()
                    {
                        title = title +"<br/>" +msg,
                        text = body,
                        msgForWeb=msg
                    },
                    data = data,
                    registration_ids = deviceTokens
                };
                //Object to JSON STRUCTURE => using Newtonsoft.Json;
                string jsonMessage = JsonConvert.SerializeObject(messageInformation);

                // Create request to Firebase API
                var request = new HttpRequestMessage(HttpMethod.Post, FireBasePushNotificationsURL);
                request.Headers.TryAddWithoutValidation("Authorization", "key =" + NotifyKey);
                request.Content = new StringContent(jsonMessage, Encoding.UTF8, "application/json");
                HttpResponseMessage result;
                using (var client = new HttpClient())
                {
                    result = await client.SendAsync(request);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }


    }
}
