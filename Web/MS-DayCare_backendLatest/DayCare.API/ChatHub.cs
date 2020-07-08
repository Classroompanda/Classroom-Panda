using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.User;
using DayCare.Model.Agency;
using DayCare.Model.Response;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Agency;
using DayCare.Service.IService.Common;
using DayCare.Service.IService.User;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DayCare.API
{
    public class ChatHub : Hub
    {
        private static object chatLock = new object();
        private static readonly Dictionary<string, long> liveUsers = new Dictionary<string, long>();
        //private static readonly List<ActiveUsersForChat> liveUsers = new List<ActiveUsersForChat>();

        private readonly IChatPrivateMessageDetailsRepository _chatPrivateMessageDetailsRepository;
        private readonly DataContext _dataContext;
        private readonly IActiveUsersForChatRepository _activeUsersForChatRepository;
        private readonly IPushNotification _pushNotification;
        private readonly IUserLoginDeviceRepository _userLoginDeviceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IParentRepository _parentRepository;
        private readonly ITeacherInfoRepository _teacherRepository;

        public ChatHub(IChatPrivateMessageDetailsRepository chatPrivateMessageDetailsRepository, DataContext dataContext,IActiveUsersForChatRepository activeUsersForChat, IPushNotification pushNotification,
          IUserLoginDeviceRepository userLoginDeviceRepository,IUserRepository userRepository,IParentRepository parentRepository,ITeacherInfoRepository teacherRepository)
        {
            _chatPrivateMessageDetailsRepository = chatPrivateMessageDetailsRepository;
            _dataContext = dataContext;
            _activeUsersForChatRepository = activeUsersForChat;
            _pushNotification = pushNotification;
            _userLoginDeviceRepository = userLoginDeviceRepository;
            _userRepository = userRepository;
            _parentRepository = parentRepository;
            _teacherRepository = teacherRepository;
        }

        public void SendMessage(string name, string message, long AgencyID, long senderID, long receiverID)
        {
           ResponseViewModal res = new ResponseViewModal();
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {

                    var id = Context.ConnectionId;
                    ChatPrivateMessageDetails chatObj = new ChatPrivateMessageDetails();
                    chatObj.FromUserId = senderID;
                    chatObj.ToUserId = receiverID;
                    chatObj.Message = message;
                    chatObj.AgencyID = AgencyID;
                    chatObj.CreatedDate = DateTime.Now;
                    chatObj.IsActive = true;
                    chatObj.IsDeleted = false;
                    chatObj.Token = id;
                    _chatPrivateMessageDetailsRepository.Create(chatObj);
                    _chatPrivateMessageDetailsRepository.SaveChanges();
                    daycaredb.Commit();


                    var userDeviceToken = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == receiverID).OrderByDescending(x => x.Id).Select(x => x.DeviceToken).FirstOrDefault();
                    var osTyype = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == receiverID).OrderByDescending(x => x.Id).Select(x => x.OSType).FirstOrDefault();

                    var senderNm = _userRepository.GetFirstOrDefault(check => check.Id == senderID).UserName;
                    //notification for mobile
                    if (userDeviceToken != null)
                    {
                        var userName = _userRepository.GetAll().Where(x => x.Id == senderID).Select(x => x.UserName).FirstOrDefault();
                        string[] deviceToken = { userDeviceToken };
                        string title = "New Message From  " + userName;
                        string body = message;
                        string msg = message;
                        bool isParent;
                        var parentName = _parentRepository.GetAll().Where(x => x.UserID == receiverID).Select(x => x.ParentName).FirstOrDefault();
                        if (parentName != null)
                        {
                            isParent = true;
                        }
                        else
                        {
                            isParent = false;
                        }

                        var response = _pushNotification.SendPushNotification(deviceToken, title, body, new object(), isParent);
                        var response1 = _pushNotification.SendPushNotificationForWeb(deviceToken, title, body, new object(), msg);
                        if (response.Result == true && response1.Result == true)
                        {
                            var clientId = string.Empty;

                            foreach (var item in liveUsers)
                            {
                                if (item.Value == receiverID)
                                {
                                    lock (chatLock)
                                    {
                                        var receiverConnectionId = item.Key;
                                        Clients.Client(receiverConnectionId).SendAsync("messageReceived", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID, senderName = senderNm })).ConfigureAwait(true);
                                    }
                                }
                            }

                            // Clients.All.SendAsync("messageReceived", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID }));
                            Clients.Caller.SendAsync("messageSent", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID }));

                        }
                    }
                    else
                    {
                        var clientId = string.Empty;

                        foreach (var item in liveUsers)
                        {
                            if (item.Value == receiverID)
                            {
                                lock (chatLock)
                                {
                                    var receiverConnectionId = item.Key;
                                    Clients.Client(receiverConnectionId).SendAsync("messageReceived", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID, senderName = senderNm })).ConfigureAwait(true);

                                }
                            }
                        }

                        // Clients.All.SendAsync("messageReceived", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID }));
                        Clients.Caller.SendAsync("messageSent", name, JsonConvert.SerializeObject(new { message, sender = senderID, receiver = receiverID }));
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
        }

        public void SendMessageMultiple(string name, string message, long AgencyID, long senderID, long[] receivers)
        {
           ResponseViewModal res = new ResponseViewModal();           
           try
            {
              foreach (var receiverID in receivers)
              {
                 SendMessage(name, message, AgencyID, senderID, receiverID);
              }
            }
            catch (Exception ex)
            {                  
               res.StatusCode = 987;
               res.Message = "Something went wrong.";
               res.IsSuccess = false;
               res.ReturnMessage.Add(ex.ToString());
            }            
        }

        public string GetConnectionId(long userId)
        {
            ResponseViewModal res = new ResponseViewModal();
            var connectionId = Context.ConnectionId;
            try
            {
                ActiveUsersForChat activeObj = new ActiveUsersForChat();
                activeObj.connectionID = connectionId;
                activeObj.userID = userId;
                activeObj.CreatedDate = DateTime.Now;
                _activeUsersForChatRepository.Create(activeObj);
                _activeUsersForChatRepository.SaveChanges();
            }
            catch(Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }            

            if (!liveUsers.ContainsKey(connectionId))
            {
                liveUsers.Add(connectionId, userId);
            }

            return connectionId;
        }

        //public override Task OnConnectedAsync()
        //{
        //    var userId = 0L;
        //    ResponseViewModal res = new ResponseViewModal();
        //    var connectionId = Context.ConnectionId;
        //    try
        //    {
        //        ActiveUsersForChat activeObj = new ActiveUsersForChat();
        //        activeObj.connectionID = connectionId;
        //        activeObj.userID = userId;                
        //        _activeUsersForChatRepository.Delete(activeObj);
        //        _activeUsersForChatRepository.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {
        //        res.StatusCode = 987;
        //        res.Message = "Something went wrong.";
        //        res.IsSuccess = false;
        //        res.ReturnMessage.Add(ex.ToString());
        //    }
                                 

        //    if (liveUsers.ContainsKey(Context.ConnectionId))
        //    {
        //        userId = liveUsers[Context.ConnectionId];
        //        liveUsers.Remove(Context.ConnectionId);
        //    }

        //    Clients.All.SendAsync("onDisconnect", userId);

        //    return base.OnConnectedAsync();
        //}
    }
}
