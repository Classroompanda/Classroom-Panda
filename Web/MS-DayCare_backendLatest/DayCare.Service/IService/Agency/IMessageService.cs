using DayCare.Model.Agency;
using DayCare.Model.Master;
using DayCare.Model.Response;

namespace DayCare.Service.IService.Agency
{
    public interface IMessageService
    {
        //ResponseViewModal GetAllIncidents(IncidentRequestViewModel getAllIncidentsRequest);
        //ResponseViewModal SaveIncident(IncidentDetailsViewModel requestSaveIncident);

        //ResponseViewModal GetIncidentsDetails(IncidentRequestViewModel getIncidentsDetailsRequest);
        //ResponseViewModal DeleteIncident(IncidentDetailsViewModel requestDeleteIncident);
        //ResponseViewModal GetAssociatedTeacherListForChat(MessageViewModel getTeacherListForChatRequest);

        //ResponseViewModal GetAssociatedParentListForChat(MessageViewModel getParentListForChatRequest);

        //ResponseViewModal GetMessageByIDForParent(MessageViewModel getMessageListRequest);

        //ResponseViewModal GetMessageByIDForTeacher(MessageViewModel getMessageListRequest);

        ResponseViewModal SaveMessage(ChatPrivateMessageDetailsViewModel saveChatRequest);
        ResponseViewModal GetListForChat(ChatRequestViewModel getChatList);

        ResponseViewModal GetMessageByID(MessageIDRequestViewModel getMessageListRequest);
        ResponseViewModal UnreadMessageByID(MessageIDRequestViewModel getMessageListRequest);

        ResponseViewModal SendEmail(BroadCastEmailViewModel sendBroadCastEmail);
        ResponseViewModal GetUnReadMessageCount(MessageIDRequestViewModel getMessageListRequest);
        ResponseViewModal SaveNotificationSetting(NotificationSoundViewModel notificationSoundRequest);

        ResponseViewModal GetNotificationSetting(NotificationSoundViewModel notificationSoundRequest);

        ResponseViewModal SendTextMessage(BroadCastEmailViewModel sendBroadCastTxtMessages);
        ResponseViewModal GetRemainingTextMessages(BroadCastEmailViewModel getTxtMessagesCount);
        ResponseViewModal SaveTextMessagePlan(TextMessagePlanViewModel textMessageRequest);
        ResponseViewModal GetTextMessagePlan(TextMessagePlanViewModel textMessageRequest);
        ResponseViewModal ActivateDeactivateTextMessagePlan(TextMessagePlanViewModel textMessageRequest);
        ResponseViewModal BuyTextMessagePlan(TextMessagePlanViewModel textMessageRequest);
    }
}
