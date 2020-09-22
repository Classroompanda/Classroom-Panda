using DayCare.Service.IService.Agency;
using DayCare.Data;
using DayCare.Repository.IRepository;
using DayCare.Model.Response;
using System;
using DayCare.Model.Master;
using System.Collections.Generic;
using System.Linq;
using DayCare.Model.Agency;
using DayCare.Entity.Agency;
using AutoMapper;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Entity.User;
using DayCare.Service.IService.Common;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Conversations.V1.Conversation;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Chat.V1.Service.Channel;
using DayCare.Entity.Masters;
using Stripe;

namespace DayCare.Service.Service.Agency
{
    public class MessageService : IMessageService
    {
        public DataContext _dataContext;
        public IIncidentRepository _incidentRepository;
        public IIncidentInvolvmentRepository _incidentInvolvmentRepository;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classesRepository;
        public ITeacherInfoRepository _teacherRepository;
        public IIncidentPriortyTypeRepository _incidentPriortyTypeRepository;
        public INatureOfInjuryRepository _natureOfInjuryRepository;
        public ITeacherInfoRepository _teacherInfoRepository;
        public IParentStudentMappingRepository _parentStudentMappingRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IClassAssignmentLogRepository _classAssignmentLogRepository;
        public IChatPrivateMessageDetailsRepository _chatPrivateMessageDetailsRepository;
        public IParentRepository _parentRepository;
        public IUserRepository _userRepository;
        public IAgencyRepository _agencyRepository;
        string DisplayMessage = "";
        private readonly ICommonService _commonService;
        public INotificationSoundSettingRepository _notificationSoundSettingRepository;
        private IConfiguration configuration;
        public ITextMessagePlanRepository _textMessagePlanRepository;

        public MessageService(DataContext dataContext,
           IIncidentRepository incidentRepository,
           IIncidentInvolvmentRepository incidentInvolvmentRepository,
           IStudentRepository studentRepository,
           IClassesRepository classesRepository,
           ITeacherInfoRepository teacherRepository,
           IIncidentPriortyTypeRepository incidentPriortyTypeRepository,
           INatureOfInjuryRepository natureOfInjuryRepository,
           ITeacherInfoRepository teacherInfoRepository,
           IParentStudentMappingRepository parentStudentMappingRepository,
           IClassEnrollmentRepository classEnrollmentRepository,
           IClassAssignmentLogRepository classAssignmentLogRepository,
           IChatPrivateMessageDetailsRepository chatPrivateMessageDetailsRepository,
           IParentRepository parentRepository,
           IUserRepository userRepository,
           IAgencyRepository agencyRepository,
           ICommonService commonService,
           INotificationSoundSettingRepository notificationSoundSettingRepository,
           IConfiguration iconfig,
           ITextMessagePlanRepository textMessagePlanRepository
           )
        {
            _dataContext = dataContext;
            _incidentRepository = incidentRepository;
            _incidentInvolvmentRepository = incidentInvolvmentRepository;
            _studentRepository = studentRepository;
            _classesRepository = classesRepository;
            _teacherRepository = teacherRepository;
            _incidentPriortyTypeRepository = incidentPriortyTypeRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
            _teacherInfoRepository = teacherInfoRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _classAssignmentLogRepository = classAssignmentLogRepository;
            _chatPrivateMessageDetailsRepository = chatPrivateMessageDetailsRepository;
            _parentRepository = parentRepository;
            _userRepository = userRepository;
            _agencyRepository = agencyRepository;
            _commonService = commonService;
            _notificationSoundSettingRepository = notificationSoundSettingRepository;
            configuration = iconfig;
            _textMessagePlanRepository = textMessagePlanRepository;
        }

        public ResponseViewModal SaveMessage(ChatPrivateMessageDetailsViewModel saveChatRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long Id = 0;
            ChatPrivateMessageDetails chatObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveChatRequest.AgencyID > 0)
                    {
                        if (saveChatRequest.Id == 0)
                        {
                            saveChatRequest.CreatedBy = saveChatRequest.CreatedBy;
                            saveChatRequest.CreatedDate = DateTime.UtcNow;
                            saveChatRequest.IsActive = true;
                            saveChatRequest.IsDeleted = false;
                            chatObj = new ChatPrivateMessageDetails();
                            Mapper.Map(saveChatRequest, chatObj);
                            _chatPrivateMessageDetailsRepository.Create(chatObj);
                            _chatPrivateMessageDetailsRepository.SaveChanges();
                            Id = chatObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Chat Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        res.Message = DisplayMessage;
                        res.ReturnMessage.Add(DisplayMessage);
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }



        public ResponseViewModal GetListForChat(ChatRequestViewModel getChatList)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var chatUserList = new List<ChatResponseViewModel>();
                var teacherList = new List<ChatResponseViewModel>();
                var parentList = new List<ChatResponseViewModel>();
                var agencyList = new List<ChatResponseViewModel>();
                var isNameEmpty = string.IsNullOrEmpty(getChatList.SerachByName);

                //User list for teacher
                if (getChatList.RoleID == 3)
                {
                    IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Parent.ParentStudentMapping> mapCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && Check.ParentID == getChatList.ParentID && !Check.IsDeleted);
                    IQueryable<Entity.Agency.ClassEnrollment> enrollCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && Check.EnrollmentStatus == 2 && !Check.IsDeleted);
                    IQueryable<Entity.Agency.ClassAssignmentLog> assignmentCollection = _classAssignmentLogRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.User.Users> userCollection = _userRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                    IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                    teacherList = (from mapObj in mapCollection
                                   join enrollObj in enrollCollection on mapObj.StudentID equals enrollObj.StudentID
                                   join assignmentObj in assignmentCollection on enrollObj.ClassesID equals assignmentObj.ClassesID
                                   join teacherObj in teacherCollection on assignmentObj.TeacherID equals teacherObj.Id

                                   join msgObj in messageCollection
                                   on teacherObj.UserID equals msgObj.FromUserId
                                   into messageTypeobj
                                   from msgObj in messageTypeobj.DefaultIfEmpty()
                                   orderby msgObj.Id descending

                                   where (!teacherObj.IsDeleted)
                                   select new ChatResponseViewModel
                                   {
                                       ListUserId = teacherObj.UserID,
                                       ListUserName = teacherObj.TeacherName,
                                       ImagePath = teacherObj.ImagePath,
                                       UserRole = "Teacher",
                                       CreatedDate = msgObj.CreatedDate,
                                       Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == teacherObj.UserID && a.ToUserId == getChatList.UserID)
                                   }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                    IQueryable<Entity.Masters.Agency> agencyCollection = _agencyRepository.GetAll().Where(check => check.Id == getChatList.AgencyID && !check.IsDeleted);

                    agencyList = (from agencyObj in agencyCollection

                                  join msgObj in messageCollection
                                  on agencyObj.UserID equals msgObj.FromUserId
                                  into messageTypeobj
                                  from msgObj in messageTypeobj.DefaultIfEmpty()
                                  orderby msgObj.Id descending

                                  where (!agencyObj.IsDeleted)
                                  select new ChatResponseViewModel
                                  {
                                      ListUserId = agencyObj.UserID,
                                      ListUserName = agencyObj.OwnerFirstName + " " + agencyObj.OwnerLastName,
                                      ImagePath = agencyObj.ImagePath,
                                      IsAgencyAdminAdmin = true,
                                      UserRole = "Agency",
                                      CreatedDate = msgObj.CreatedDate,
                                      Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == agencyObj.UserID && a.ToUserId == getChatList.UserID)
                                  }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                }

                //User list for Parent
                else if (getChatList.RoleID == 4)
                {
                    IQueryable<Entity.Parent.Parent> parentsCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Parent.ParentStudentMapping> mapCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Agency.ClassEnrollment> enrollCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && Check.EnrollmentStatus == 2 && !Check.IsDeleted);
                    IQueryable<Entity.Agency.ClassAssignmentLog> assignmentCollection = _classAssignmentLogRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && Check.Id == getChatList.TeacherID && !Check.IsDeleted);

                    IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                           Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                    parentList = (from classenrolObj in enrollCollection
                                  join assignmentObj in assignmentCollection on getChatList.TeacherID equals assignmentObj.TeacherID
                                  join mapObj in mapCollection on classenrolObj.StudentID equals mapObj.StudentID
                                  join parentObj in parentsCollection on mapObj.ParentID equals parentObj.Id

                                  join msgObj in messageCollection
                                  on parentObj.UserID equals msgObj.FromUserId
                                  into messageTypeobj
                                  from msgObj in messageTypeobj.DefaultIfEmpty()
                                  orderby msgObj.Id descending

                                  select new ChatResponseViewModel
                                  {
                                      ListUserId = parentObj.UserID,
                                      ListUserName = parentObj.ParentName,
                                      ImagePath = parentObj.ImagePath,
                                      UserRole = "Parent",
                                      CreatedDate = msgObj.CreatedDate,
                                      Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == parentObj.UserID && a.ToUserId == getChatList.UserID)
                                  }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                    IQueryable<Entity.Masters.Agency> agencyCollection = _agencyRepository.GetAll().Where(check => check.Id == getChatList.AgencyID && !check.IsDeleted);

                    agencyList = (from agencyObj in agencyCollection

                                  join msgObj in messageCollection
                                  on agencyObj.UserID equals msgObj.FromUserId
                                  into messageTypeobj
                                  from msgObj in messageTypeobj.DefaultIfEmpty()
                                  orderby msgObj.Id descending

                                  where (!agencyObj.IsDeleted)
                                  select new ChatResponseViewModel
                                  {
                                      ListUserId = agencyObj.UserID,
                                      ListUserName = agencyObj.OwnerFirstName + "" + agencyObj.OwnerLastName,
                                      ImagePath = agencyObj.ImagePath,
                                      IsAgencyAdminAdmin = true,
                                      UserRole = "Agency",
                                      CreatedDate = msgObj.CreatedDate,
                                      Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == agencyObj.UserID && a.ToUserId == getChatList.UserID)
                                  }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                }



                //User list for Agency
                else if (getChatList.RoleID == 2)
                {
                    if (getChatList.FilteredUser == 0 || getChatList.FilteredUser == 3)
                    {
                        string Teachername;
                        if (getChatList.SerachByName == null)
                        {
                            Teachername = "";
                        }
                        else
                        {
                            Teachername = getChatList.SerachByName.TrimStart();
                            Teachername = Teachername.TrimEnd();
                        }

                        IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted && (isNameEmpty
                        || Check.TeacherName.ToUpper().Contains(Teachername.ToUpper())));

                        if (getChatList.ClassID > 0)
                        {
                            IQueryable<Entity.Agency.ClassAssignmentLog> classteacherCollection = _classAssignmentLogRepository.GetAll().Where(Check => Check.ClassesID == getChatList.ClassID && Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                            IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                            Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                            teacherList = (from teacherObj in teacherCollection
                                           join classteacherObj in classteacherCollection on teacherObj.Id equals classteacherObj.TeacherID

                                           join msgObj in messageCollection
                                           on teacherObj.UserID equals msgObj.FromUserId
                                           into messageTypeobj
                                           from msgObj in messageTypeobj.DefaultIfEmpty()
                                           orderby msgObj.Id descending

                                           where (classteacherObj.ClassesID == getChatList.ClassID && !teacherObj.IsDeleted)
                                           select new ChatResponseViewModel
                                           {
                                               ListUserId = teacherObj.UserID,
                                               ListUserName = teacherObj.TeacherName,
                                               ImagePath = teacherObj.ImagePath,
                                               UserRole = "Teacher",
                                               CreatedDate = msgObj.CreatedDate,
                                               EmailID = teacherObj.Email,
                                               PhoneNumber = teacherObj.PhoneNumber,
                                               //Count = 2
                                               Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == teacherObj.UserID && a.ToUserId == getChatList.UserID)
                                           }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                        }
                        else
                        {
                            IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                            Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                            teacherList = (from teacherObj in teacherCollection

                                           join msgObj in messageCollection
                                           on teacherObj.UserID equals msgObj.FromUserId
                                           into messageTypeobj
                                           from msgObj in messageTypeobj.DefaultIfEmpty()
                                           orderby msgObj.Id descending

                                           where (!teacherObj.IsDeleted)
                                           select new ChatResponseViewModel
                                           {
                                               ListUserId = teacherObj.UserID,
                                               ListUserName = teacherObj.TeacherName,
                                               ImagePath = teacherObj.ImagePath,
                                               UserRole = "Teacher",
                                               CreatedDate = msgObj.CreatedDate,
                                               EmailID = teacherObj.Email,
                                               PhoneNumber = teacherObj.PhoneNumber,
                                               Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == teacherObj.UserID && a.ToUserId == getChatList.UserID)
                                               //Count = 2
                                           }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                        }
                    }

                    if (getChatList.FilteredUser == 0 || getChatList.FilteredUser == 4)
                    {
                        string Parentname;
                        if (getChatList.SerachByName == null)
                        {
                            Parentname = "";
                        }
                        else
                        {
                            Parentname = getChatList.SerachByName.TrimStart();
                            Parentname = Parentname.TrimEnd();
                        }

                        IQueryable<Entity.Parent.Parent> parentsCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted &&
                           (isNameEmpty || Check.ParentName.ToUpper().Contains(Parentname.ToUpper())));

                        if (getChatList.ClassID > 0)
                        {
                            IQueryable<Entity.Agency.ClassEnrollment> ClassEnrollments = _classEnrollmentRepository.GetAll().Where(Check => Check.ClassesID == getChatList.ClassID && Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);
                            IQueryable<Entity.Parent.ParentStudentMapping> mappingStudentParents = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                            IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                            Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);


                            parentList = (from parentObj in parentsCollection
                                          join MPSObj in mappingStudentParents on parentObj.Id equals MPSObj.ParentID
                                          join CE in ClassEnrollments on MPSObj.StudentID equals CE.StudentID

                                          join msgObj in messageCollection
                                          on parentObj.UserID equals msgObj.FromUserId
                                          into messageTypeobj
                                          from msgObj in messageTypeobj.DefaultIfEmpty()
                                          orderby msgObj.Id descending

                                          where (CE.ClassesID == getChatList.ClassID && !parentObj.IsDeleted)
                                          select new ChatResponseViewModel
                                          {
                                              ListUserId = parentObj.UserID,
                                              ListUserName = parentObj.ParentName,
                                              ImagePath = parentObj.ImagePath,
                                              UserRole = "Parent",
                                              CreatedDate = msgObj.CreatedDate,
                                              EmailID = parentObj.EmailId,
                                              PhoneNumber = parentObj.Mobile,
                                              Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == parentObj.UserID && a.ToUserId == getChatList.UserID)
                                              //Count = 2
                                          }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();
                        }
                        else
                        {
                            IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                            Check.AgencyID == getChatList.AgencyID && !Check.IsDeleted);

                            parentList = (from parentObj in parentsCollection

                                          join msgObj in messageCollection
                                          on parentObj.UserID equals msgObj.FromUserId
                                          into messageTypeobj
                                          from msgObj in messageTypeobj.DefaultIfEmpty()
                                          orderby msgObj.Id descending

                                          where (!parentObj.IsDeleted)
                                          select new ChatResponseViewModel
                                          {
                                              ListUserId = parentObj.UserID,
                                              ListUserName = parentObj.ParentName,
                                              ImagePath = parentObj.ImagePath,
                                              UserRole = "Parent",
                                              CreatedDate = msgObj.CreatedDate,
                                              EmailID = parentObj.EmailId,
                                              PhoneNumber = parentObj.Mobile,
                                              Count = messageCollection.Count(a => a.IsRead == false && a.FromUserId == parentObj.UserID && a.ToUserId == getChatList.UserID)
                                              //Count = 2
                                          }).GroupBy(p => p.ListUserId).Select(p => p.First()).ToList();

                        }
                    }
                }

                if (teacherList != null && teacherList.Count > 0)
                {
                    chatUserList.AddRange(teacherList);
                }
                if (parentList != null && parentList.Count > 0)
                {
                    chatUserList.AddRange(parentList);
                }
                if (agencyList != null && agencyList.Count > 0)
                {
                    chatUserList.AddRange(agencyList);
                }

                chatUserList = chatUserList.OrderByDescending(c => c.CreatedDate).ToList();

                var result = chatUserList;

                if (getChatList.limit != 0)
                {
                    res.Data = result.Skip((getChatList.page) * getChatList.limit).Take(getChatList.limit).ToList();
                }

                res.Data = result;
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Chat list has been feteched";
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


        public ResponseViewModal GetMessageByID(MessageIDRequestViewModel getMessageListRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<MessageIDResponseViewModel> allMessageList = new List<MessageIDResponseViewModel>();
                IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check =>
                (Check.FromUserId == getMessageListRequest.senderUserID && Check.ToUserId == getMessageListRequest.receiverUserID)
                || (Check.FromUserId == getMessageListRequest.receiverUserID && Check.ToUserId == getMessageListRequest.senderUserID && !Check.IsDeleted));

                allMessageList = (from messageObj in messageCollection
                                  select new MessageIDResponseViewModel
                                  {
                                      Id = messageObj.Id,
                                      SenderUserID = messageObj.FromUserId,
                                      ReceiverUserID = messageObj.ToUserId,
                                      Message = messageObj.Message,
                                      CreatedDateTime = Convert.ToDateTime(messageObj.CreatedDate)
                                  }).OrderBy(x => x.Id).ToList();

                IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection1 = _chatPrivateMessageDetailsRepository.GetAll().Where(check =>
                check.FromUserId == getMessageListRequest.receiverUserID && check.ToUserId == getMessageListRequest.senderUserID && check.IsDeleted == false && check.IsRead == false);
                if (messageCollection1.Count() != 0)
                {
                    List<ChatPrivateMessageDetails> chatPrivateMessageDetails = messageCollection1.ToList();
                    for (int i = 0; i < chatPrivateMessageDetails.Count(); i++)
                    {
                        chatPrivateMessageDetails[i].IsRead = true;
                    }
                    _chatPrivateMessageDetailsRepository.SaveChanges();
                }

                var result = allMessageList;
                if (getMessageListRequest.limit != 0)
                {
                    res.Data = result.Skip((getMessageListRequest.page) * getMessageListRequest.limit).Take(getMessageListRequest.limit).ToList();
                }
                res.Data = result;
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Message list has been feteched";
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

        public ResponseViewModal UnreadMessageByID(MessageIDRequestViewModel getMessageListRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection1 = _chatPrivateMessageDetailsRepository.GetAll().Where(check =>
                check.FromUserId == getMessageListRequest.senderUserID && check.ToUserId == getMessageListRequest.receiverUserID && check.IsDeleted == false && check.IsRead == false);
                if (messageCollection1.Count() != 0)
                {
                    List<ChatPrivateMessageDetails> chatPrivateMessageDetails = messageCollection1.ToList();
                    for (int i = 0; i < chatPrivateMessageDetails.Count(); i++)
                    {
                        chatPrivateMessageDetails[i].IsRead = true;
                    }
                    _chatPrivateMessageDetailsRepository.SaveChanges();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Unread Done";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Message not found";
                }
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

        public ResponseViewModal SendEmail(BroadCastEmailViewModel sendBroadCastEmail)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                Users userObj = new Users();
                userObj = _userRepository.Get(x => x.Id == sendBroadCastEmail.SenderID && !x.IsDeleted);
                string fromEmail = userObj.EmailAddress;
                string name = userObj.UserName;
                string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Message From " + name + "</p> <br><p> " + sendBroadCastEmail.Message + " </p><br> <p>Thanks.</p></body></html>";
                foreach (var toEmail in sendBroadCastEmail.EmailArray)
                {
                    string EmailIdSpace = toEmail.TrimStart();
                    string Email = EmailIdSpace.TrimEnd();
                    _commonService.SendBroadCastEmailSync(fromEmail, Email, sendBroadCastEmail.Subject, message);
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Email send successfully";
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal GetUnReadMessageCount(MessageIDRequestViewModel getMessageListRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            int count = 0;
            try
            {
                List<MessageIDResponseViewModel> allMessageList = new List<MessageIDResponseViewModel>();
                //count = _chatPrivateMessageDetailsRepository.GetAll().Where(Check => Check.ToUserId == getMessageListRequest.receiverUserID
                //&& Check.IsDeleted == false && Check.IsRead == false).Count();
                IQueryable<Entity.User.Users> usersCollection = _userRepository.GetAll().Where(check => check.IsDeleted == false);

                IQueryable<Entity.Agency.ChatPrivateMessageDetails> messageCollection = _chatPrivateMessageDetailsRepository.GetAll().Where(Check => Check.ToUserId == getMessageListRequest.receiverUserID &&
                Check.IsDeleted == false && Check.IsRead == false);

                allMessageList = (from messageObj in messageCollection
                                  join userObj in usersCollection on messageObj.FromUserId equals userObj.Id
                                  select new MessageIDResponseViewModel
                                  {
                                      Id = messageObj.Id,
                                      SenderUserID = messageObj.FromUserId,
                                      ReceiverUserID = messageObj.ToUserId,
                                      Message = messageObj.Message,
                                      CreatedDateTime = Convert.ToDateTime(messageObj.CreatedDate)
                                  }).OrderBy(x => x.Id).ToList();
                count = allMessageList.Count();
                res.Count = count;
                res.TotalRows = count;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Message Count has been feteched";
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

        public ResponseViewModal SaveNotificationSetting(NotificationSoundViewModel notificationSoundRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                NotificationSoundSetting notificationSound = new NotificationSoundSetting();
                try
                {
                    if (notificationSoundRequest.OnOff != null)
                    {
                        notificationSound = _notificationSoundSettingRepository.Get(check => check.IsDeleted == false && check.UserId == notificationSoundRequest.UserID);
                        if (!ReferenceEquals(notificationSound, null))
                        {
                            notificationSound.OnOff = notificationSoundRequest.OnOff;
                            notificationSound.UpdatedDate = DateTime.Now;
                            notificationSound.UpdatedBy = notificationSoundRequest.UserID;

                            _notificationSoundSettingRepository.SaveChanges();
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Notification setting updated Successfully.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                        else
                        {
                            NotificationSoundSetting notificationSounds = new NotificationSoundSetting();
                            notificationSoundRequest.IsActive = true;
                            notificationSoundRequest.IsDeleted = false;
                            notificationSoundRequest.CreatedDate = DateTime.UtcNow;
                            notificationSoundRequest.UserID = notificationSoundRequest.UserID;
                            notificationSoundRequest.OnOff = notificationSoundRequest.OnOff;

                            Mapper.Map(notificationSoundRequest, notificationSounds);
                            _notificationSoundSettingRepository.Create(notificationSounds);
                            _notificationSoundSettingRepository.SaveChanges();
                            id = notificationSounds.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Notification Setting Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetNotificationSetting(NotificationSoundViewModel notificationSoundRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                NotificationSoundSetting notificationSound = new NotificationSoundSetting();
                notificationSound = _notificationSoundSettingRepository.GetAll().Where(check => check.IsDeleted == false && check.UserId == notificationSoundRequest.UserID).FirstOrDefault();

                if (notificationSound != null)
                {
                    res.NotificationSetting = notificationSound.OnOff;
                }
                else
                {
                    res.NotificationSetting = "On";
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Notification Setting has been successfully fetched.";
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal SendSingleTextMessage(String toPhone, String message)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var mes = Twilio.Rest.Api.V2010.Account.MessageResource.Create(
                    body: message,
                    from: new Twilio.Types.PhoneNumber("+12058570726"),
                    to: new Twilio.Types.PhoneNumber(toPhone)
                    );
                res.Message = mes.Sid;
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal SendTextMessage(BroadCastEmailViewModel sendBroadCastTxtMessages)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    var size = sendBroadCastTxtMessages.Message.Length;
                    if (sendBroadCastTxtMessages.AgencyID > 0)
                    {
                        Entity.Masters.Agency agencyObj = new Entity.Masters.Agency();
                        agencyObj = _agencyRepository.Get(x => x.Id == sendBroadCastTxtMessages.AgencyID && !x.IsDeleted);
                        int SendMessageCount = sendBroadCastTxtMessages.PhoneArray.Length;
                        if (agencyObj.MessageCount >= SendMessageCount)
                        {
                            string name = agencyObj.AgencyName;
                            string accountID = configuration.GetSection("TwilioAccountDetails").GetSection("AccountSid").Value;
                            string accountToken = configuration.GetSection("TwilioAccountDetails").GetSection("AuthToken").Value;
                            TwilioClient.Init(accountID, accountToken);

                            string message = sendBroadCastTxtMessages.Message + ", By " + name;
                            var size1 = message.Length;
                            if (size1 > 160)
                            {
                                res.IsSuccess = false;
                                daycaredb.Commit();
                                res.StatusCode = 207;
                                res.Message = "Message is long";
                                return res;
                            }
                            else
                            {
                                agencyObj.MessageCount = agencyObj.MessageCount - SendMessageCount;
                                _agencyRepository.SaveChanges();
                                foreach (var toPhone in sendBroadCastTxtMessages.PhoneArray)
                                {
                                    string toPhoneNumber = toPhone.ToString();
                                    SendSingleTextMessage(toPhoneNumber, message);
                                }
                                res.IsSuccess = true;
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                                res.Message = "Message send successfully";
                            }
                        }
                        else
                        {
                            daycaredb.Rollback();
                            res.IsSuccess = false;
                            res.StatusCode = 206;
                            res.Message = "Message is not remaining";
                        }
                    }
                    else
                    {
                        daycaredb.Rollback();
                        res.IsSuccess = false;
                        res.StatusCode = 986;
                        res.Message = "Missing Parametes";
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
            return res;
        }

        public ResponseViewModal GetRemainingTextMessages(BroadCastEmailViewModel getTxtMessagesCount)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var Date = Convert.ToDateTime(getTxtMessagesCount.AskedDateString);
                var DateMonth = Date.Month;
                var DateYear = Date.Year;
                Entity.Masters.Agency agencyObj = new Entity.Masters.Agency();
                agencyObj = _agencyRepository.Get(x => x.Id == getTxtMessagesCount.AgencyID && !x.IsDeleted);

                if (agencyObj.MessageCountStartDate.Month != DateMonth || agencyObj.MessageCountStartDate.Year != DateYear)
                {
                    UpdateTestMessage(getTxtMessagesCount);
                    res.Count = 100;
                }
                else
                {
                    res.Count = agencyObj.MessageCount;
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Message Count fetched Successfully";
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

        public ResponseViewModal UpdateTestMessage(BroadCastEmailViewModel getTxtMessagesCount)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    Entity.Masters.Agency agency = new Entity.Masters.Agency();
                    if (getTxtMessagesCount.AgencyID != 0)
                    {
                        var Date = Convert.ToDateTime(getTxtMessagesCount.AskedDateString);
                        agency = _agencyRepository.Get(check => !check.IsDeleted && check.Id == getTxtMessagesCount.AgencyID);
                        agency.MessageCount = 100;
                        agency.MessageCountStartDate = Date;
                        _agencyRepository.SaveChanges();

                        res.IsSuccess = true;
                        res.Message = "Message Update Successfully.";
                        daycaredb.Commit();
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        daycaredb.Rollback();
                        res.StatusCode = 987;
                        res.Message = "Something went wrong.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                }
            }
            return res;
        }

        // For Text Message Plan
        public ResponseViewModal SaveTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                TextMessagePlan textMessage = new TextMessagePlan();
                try
                {
                    if (textMessageRequest.Id == 0)
                    {
                        textMessage = _textMessagePlanRepository.Get(namecheck => namecheck.Amount == textMessageRequest.Amount);
                        if (!ReferenceEquals(textMessage, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Text Message Plan Already exists Same Amount.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            TextMessagePlan textMessages = new TextMessagePlan();
                            textMessageRequest.IsActive = true;
                            textMessageRequest.IsDeleted = false;
                            textMessageRequest.CreatedDate = DateTime.UtcNow;
                            textMessageRequest.Amount = textMessageRequest.Amount;
                            textMessageRequest.Messages = textMessageRequest.Messages;

                            Mapper.Map(textMessageRequest, textMessages);
                            _textMessagePlanRepository.Create(textMessages);
                            _textMessagePlanRepository.SaveChanges();
                            id = textMessages.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Text Message Plan Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<TextMessagePlanViewModel> allTextPlans = new List<TextMessagePlanViewModel>();
                if (textMessageRequest.AgencyID == 0)
                {
                    allTextPlans = (from txtobj in _textMessagePlanRepository.GetAll().Where(check => check.IsActive == true)
                                 select new TextMessagePlanViewModel()
                                 {
                                     Id = txtobj.Id,
                                     Amount = txtobj.Amount,
                                     Messages = txtobj.Messages,
                                     IsDeleted = txtobj.IsDeleted,
                                     IsActive = txtobj.IsActive
                                 }).OrderBy(c => c.Id).ToList();
                }
                else
                {
                    allTextPlans = (from txtobj in _textMessagePlanRepository.GetAll().Where(check => check.IsActive == true && check.IsDeleted == false)
                                 select new TextMessagePlanViewModel()
                                 {
                                     Id = txtobj.Id,
                                     Amount = txtobj.Amount,
                                     Messages = txtobj.Messages,
                                     IsDeleted = txtobj.IsDeleted,
                                     IsActive = txtobj.IsActive
                                 }).OrderBy(c => c.Id).ToList();
                }
                res.Data = allTextPlans;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Text Message Plan has been successfully fetched.";
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

        public ResponseViewModal ActivateDeactivateTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            TextMessagePlan textMessage;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    if (textMessageRequest.Id > 0)
                    {
                        if (textMessageRequest.IsDeleted == true)
                        {
                            // For Deactivate Agency                          
                            var planDetail = _textMessagePlanRepository.GetAll().Where(Check => Check.Id == textMessageRequest.Id).ToList();

                            if (planDetail.Count > 0)
                            {
                                textMessage = _textMessagePlanRepository.Get(Check => Check.Id == planDetail[0].Id);
                                if (!ReferenceEquals(textMessage, null))
                                {
                                    textMessage.IsDeleted = true;
                                    textMessage.DeletedDate = DateTime.UtcNow;
                                    textMessage.DeletedBy = textMessageRequest.DeletedBy;
                                    _textMessagePlanRepository.Update(textMessage);
                                    _textMessagePlanRepository.SaveChanges();
                                }
                            }
                        }

                        if (textMessageRequest.IsDeleted == false)
                        {
                            // For Activate Plan                        
                            var planDetail = _textMessagePlanRepository.GetAll().Where(Check => Check.Id == textMessageRequest.Id).ToList();

                            if (planDetail.Count > 0)
                            {
                                textMessage = _textMessagePlanRepository.Get(Check => Check.Id == planDetail[0].Id);
                                if (!ReferenceEquals(textMessage, null))
                                {
                                    textMessage.IsDeleted = false;
                                    textMessage.UpdatedDate = DateTime.UtcNow;
                                    textMessage.UpdatedBy = textMessageRequest.UpdatedBy;
                                    _textMessagePlanRepository.Update(textMessage);
                                    _textMessagePlanRepository.SaveChanges();
                                }
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.StatusCode = 987;
                        res.Message = "Paramter Not Found";
                    }
                }
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

        public ResponseViewModal BuyTextMessagePlan(TextMessagePlanViewModel textMessageRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (textMessageRequest.AgencyID > 0)
                    {
                        long id = 0;
                        TextMessagePlan textMessage = new TextMessagePlan();
                        Entity.Masters.Agency agencyObj = new Entity.Masters.Agency();
                        StripeConfiguration.SetApiKey(APIValue);
                        StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);

                        var customers = new StripeCustomerService();
                        var charges = new StripeChargeService();

                        var charge = charges.Create(new StripeChargeCreateOptions
                        {
                            Amount = Convert.ToInt32(textMessageRequest.Amount) * 100,
                            Description = "Text Messages Payment",
                            Currency = "usd",
                            SourceTokenOrExistingSourceId = textMessageRequest.TokenID
                        });

                        textMessage = _textMessagePlanRepository.Get(namecheck => namecheck.Amount == textMessageRequest.Amount);
                        
                        agencyObj = _agencyRepository.Get(x => x.Id == textMessageRequest.AgencyID && !x.IsDeleted);
                        agencyObj.MessageCount = agencyObj.MessageCount + Convert.ToInt32(textMessage.Messages);
                        agencyObj.MessageCountStartDate = DateTime.Now;
                        _agencyRepository.SaveChanges();
                        
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.Message = "Payement Done Successfully.";
                        daycaredb.Commit();
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
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
            return res;
        }

    }
}

