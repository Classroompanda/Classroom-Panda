using DayCare.Model.Common;
using Serilog;
using System;
using System.Net;

namespace DayCare.Service.Response
{
    public class ResponseService : IResponseService
    {

        #region Initialize Dependency
        private JsonModel response;

        public ResponseService()
        {
            response = new JsonModel();
        }
        #endregion

        #region Response class methods
        public JsonModel ExceptionResponse(Exception ex)
        {
            Log.Error(ex.Message);
            response = new JsonModel()
            {
                StatusCode = (long)HttpStatusCode.InternalServerError,
                Message = CommonErrorMessages.UnknownError
            };

            return response;
        }
        #endregion

        #region Constant Strings  
        public static class StatusMessage
        {
            public const string GetSucessfully = "Data retrived successfully";
            public const string UserInsertSucessfully = "User has been added successfully.";
            public const string WrongUsernamePassword = "Username or password is incorrect";
            public const string LoginSuccessfully = "Login successfully!";
        }

        public static class EntityStatusNotification
        {
            public const string EntityCreated = "Entity created succesfully";
            public const string EntityUpdated = "Entity has been updated successfully";
            public const string EntityDeleted = "Entity deleted successfully";
        }

        public static class RoleStatusNotification
        {
            public const string RoleCreated = "Role Created";
            public const string RoleUpdated = "Role Updated";
            public const string RoleDeleted = "Role Deleted";
        }

        public static class CommonErrorMessages
        {
            public const string UnknownError = "Sorry, we have encountered an error";
        }

        public static class LoginLogLoginAttempt
        {
            public const string Failed = "Failed";
            public const string Success = "Success";
        }

        public static class SecurityQuestionNotification
        {
            public const string RequiredAnswers = "Please give answers to these questions.";
            public const string AtleastOneAnswer = "Please answer any one of these questions.";
            public const string IncorrectAnswer = "Answer doesn't match please retry.";
        }
        #endregion

    }
}
