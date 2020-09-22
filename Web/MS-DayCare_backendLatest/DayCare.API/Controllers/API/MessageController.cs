using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DayCare.Model.Agency;
using DayCare.Model.Master;
using DayCare.Model.Response;
using DayCare.Service.IService.Agency;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;
        ResponseViewModal response;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
            response = new ResponseViewModal();
        }
                       

        [HttpPost]
        [Route("SaveMessage")]
        public ResponseViewModal SaveMessage(ChatPrivateMessageDetailsViewModel saveChatRequest)
        {
            try
            {
                response = _messageService.SaveMessage(saveChatRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetListForChat")]
        public ResponseViewModal GetListForChat(ChatRequestViewModel getChatList)
        {
            try
            {
                response = _messageService.GetListForChat(getChatList);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetMessageByID")]
        public ResponseViewModal GetMessageByID(MessageIDRequestViewModel getMessageListRequest)
        {
            try
            {
                response = _messageService.GetMessageByID(getMessageListRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("UnreadMessageByID")]
        public ResponseViewModal UnreadMessageByID(MessageIDRequestViewModel getMessageListRequest)
        {
            try
            {
                response = _messageService.UnreadMessageByID(getMessageListRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SendEmail")]
        public ResponseViewModal SendEmail(BroadCastEmailViewModel sendBroadCastEmail)
        {
            try
            {
                response = _messageService.SendEmail(sendBroadCastEmail);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetUnReadMessageCount")]
        public ResponseViewModal GetUnReadMessageCount(MessageIDRequestViewModel getMessageListRequest)
        {
            try
            {
                response = _messageService.GetUnReadMessageCount(getMessageListRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("SaveNotificationSetting")]
        public ResponseViewModal SaveNotificationSetting(NotificationSoundViewModel notificationSoundRequest)
        {
            try
            {
                response = _messageService.SaveNotificationSetting(notificationSoundRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("GetNotificationSetting")]
        public ResponseViewModal GetNotificationSetting(NotificationSoundViewModel notificationSoundRequest)
        {
            try
            {
                response = _messageService.GetNotificationSetting(notificationSoundRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        // Send Text Message From Twilio
        [HttpPost]
        [Route("SendTextMessage")]
        public ResponseViewModal SendTextMessage(BroadCastEmailViewModel sendBroadCastTxtMessages)
        {
            try
            {
                response = _messageService.SendTextMessage(sendBroadCastTxtMessages);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetRemainingTextMessages")]
        public ResponseViewModal GetRemainingTextMessages(BroadCastEmailViewModel getTxtMessagesCount)
        {
            try
            {
                response = _messageService.GetRemainingTextMessages(getTxtMessagesCount);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // Text Message Plan

        [HttpPost]
        [Route("SaveTextMessagePlan")]
        public ResponseViewModal SaveTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            try
            {
                response = _messageService.SaveTextMessagePlan(textMessageRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTextMessagePlan")]
        public ResponseViewModal GetTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            try
            {
                response = _messageService.GetTextMessagePlan(textMessageRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ActivateDeactivateTextMessagePlan")]
        public ResponseViewModal ActivateDeactivateTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            try
            {
                response = _messageService.ActivateDeactivateTextMessagePlan(textMessageRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("BuyTextMessagePlan")]
        public ResponseViewModal BuyTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            try
            {
                response = _messageService.BuyTextMessagePlan(textMessageRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


    }
}