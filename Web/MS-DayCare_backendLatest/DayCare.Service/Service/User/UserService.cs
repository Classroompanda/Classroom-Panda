using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using static DayCare.Service.Response.ResponseService;
using DayCare.Model.User;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.User;
using DayCare.Service.Response;
using DayCare.Model.Common;
using DayCare.Entity.User;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Model.ApplicationUser;
using DayCare.Data;
using DayCare.Model.Response;

namespace DayCare.Service.Service.User
{
    public class UserService : IUserService
    {

        #region Initialize Dependency
        private readonly IUserRepository _userRepository;
        private readonly IResponseService responseService;
        private JsonModel response;
        private readonly AppSettings _appSettings;
        private readonly DataContext _dataContext;
        private readonly IParentRepository _parentRepository;
        private readonly IAgencyRepository _agencyRepository;



        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<UserModel> users = new List<UserModel>
        {
            new UserModel { Id = 1, FirstName = "Test", LastName = "User", UserName = "test", Password = "test" }
        };

        public UserService(IUserRepository UserRepository, IResponseService ResponseService
            , IOptions<AppSettings> appSettings, DataContext dataContext, IParentRepository parentRepository, IAgencyRepository agencyRepository)
        {
            _userRepository = UserRepository;
            this.responseService = ResponseService;
            _appSettings = appSettings.Value;
            _dataContext = dataContext;
            this.response = new JsonModel();
            _parentRepository = parentRepository;
            _agencyRepository = agencyRepository;
        }
        #endregion

        #region Authentication
        public JsonModel Authenticate(LoginModel loginModel)
        {
            try
            {
                var user = users.SingleOrDefault(x => x.UserName == loginModel.UserName && x.Password == loginModel.Password);

                // return null if user not found
                if (user == null)
                    return response = new JsonModel()
                    {
                        data = null,
                        StatusCode = (long)HttpStatusCode.Unauthorized,
                        Message = StatusMessage.WrongUsernamePassword
                    };

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // remove password before returning
                user.Password = null;

                return response = new JsonModel()
                {
                    data = user,
                    StatusCode = (long)HttpStatusCode.OK,
                    Message = StatusMessage.LoginSuccessfully
                };
            }
            catch (Exception ex)
            {
                return responseService.ExceptionResponse(ex);
            }
        }

        JsonModel IUserService.Authenticate(LoginModel loginModel)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Get the list of all users
        public JsonModel GetUser
        {
            get
            {
                try
                {
                    IQueryable<UserModel> userModel = _userRepository.GetAll().ProjectTo<UserModel>();

                    return response = new JsonModel()
                    {
                        data = userModel,
                        StatusCode = (long)HttpStatusCode.OK,
                        Message = StatusMessage.GetSucessfully
                    };
                }
                catch (Exception ex)
                {
                    return responseService.ExceptionResponse(ex);
                }
            }
        }

        JsonModel IUserService.GetUser => throw new NotImplementedException();
        #endregion
        /// <summary>
        /// this will get the organizationID from host name 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public bool SaveMobileToken(ApplicationUser applicationUser)
        {
            bool res = new bool();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (applicationUser.EmailAddress != string.Empty)
                    {
                        long id = 0;
                        Users userObj = null;
                        userObj = _userRepository.Get(x => x.EmailAddress == applicationUser.EmailAddress && !x.IsDeleted);
                        if (!ReferenceEquals(userObj, null))
                        {
                            userObj.PhoneTypeID = applicationUser.PhoneTypeID;
                            userObj.UpdatedBy = userObj.Id;
                            userObj.DeviceToken = applicationUser.DeviceToken;
                            userObj.UpdatedDate = System.DateTime.UtcNow;
                            _userRepository.SaveChanges();
                            id = userObj.Id;
                        }
                        daycaredb.Commit();
                        res = true;
                    }
                    else
                    {
                        res = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;
                }
            }
            return res;
        }
        public JsonModel Logout(TokenModel token)
        {
            Users user = _userRepository.GetAll().Where(a => a.Id == token.UserID && a.IsActive == true && a.IsDeleted == false).FirstOrDefault();
            if (user != null)
            {
                user.IsLoggedIn = false;
                _userRepository.Update(user);
                //audit logs
                //_auditLogRepository.SaveChangesWithAuditLogs(AuditLogsScreen.Login, AuditLogAction.Logout, null, token.UserID, "", token);

                return new JsonModel()
                {
                    data = new object(),
                    Message = "User has been logged out"/*UserAccountNotification.LoggedOut*/,
                    StatusCode = (long)HttpStatusCodes.OK
                };
            }
            else
            {
                return new JsonModel()
                {
                    data = new object(),
                    Message = "Something went wrong"/*UserAccountNotification.LoggedOut*/,
                    StatusCode = (long)HttpStatusCodes.OK
                };
            }
        }
        public JsonModel UpdateAccessFailedCount(int userID, TokenModel tokenModel)
        {
            return _userRepository.UpdateAccessFailedCount(userID, tokenModel);
        }

        public bool DoesUserExists(string applicationUserEmail, string newPassword)
        {
            bool res = new bool();
                try
                {
                    if (applicationUserEmail != string.Empty)
                    {
                        long id = 0;
                        Users userObj = null;
                        userObj = _userRepository.Get(x => x.EmailAddress.ToUpper() == applicationUserEmail.ToUpper() && !x.IsDeleted);
                        if (!ReferenceEquals(userObj, null))
                        {
                            if(userObj.Id > 0)
                            {
                                res = true;
                                res = ResetUserPassword(userObj.Id, newPassword);
                            }
                            else
                            {
                                res = false;
                            }                           
                        }
                    }
                    else
                    {
                        res = false;
                    }
                }
                catch (Exception ex)
                {
                    res = false;
                }
            return res;
        }

        private bool ResetUserPassword(long UserId , string newpassword)
        {
            bool res;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (UserId > 0 && newpassword != string.Empty)
                    {
                        long id = 0;
                        Users UserObj = null;
                        UserObj = _userRepository.Get(x => x.Id == UserId && !x.IsDeleted);
                        if (!ReferenceEquals(UserObj, null))
                        {
                            UserObj.UpdatedBy = UserId;
                            UserObj.UpdatedDate = DateTime.UtcNow;
                            UserObj.Password = newpassword;
                            _userRepository.SaveChanges();
                            id = UserObj.Id;
                        }
                        daycaredb.Commit();
                        res = true;
                    }
                    else
                    {
                        res = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;
                }
            }
            return res;
        }

        public string GetEmailAddress(int? UserId)
        {
            string res = null;
            try
            {
                if (UserId != null)
                {
                    Users userObj = null;
                    userObj = _userRepository.Get(x => x.Id == UserId && !x.IsDeleted);
                    if (!ReferenceEquals(userObj, null))
                    {
                        if (userObj.Id > 0)
                        {
                            res = userObj.EmailAddress;
                        }
                        else
                        {
                            res = null;
                        }
                    }
                }
                else
                {
                    res = null;
                }
            }
            catch (Exception ex)
            {
                res = null;
            }
            return res;
        }

        public long GetAgencyID(string QuickPin)
        {
            long res = 0;
            try
            {
                if (QuickPin != null)
                {
                    Entity.Masters.Agency agencyObj = null;
                    agencyObj = _agencyRepository.GetAll().Where(x => x.QuickPin == QuickPin).FirstOrDefault();
                    if (!ReferenceEquals(agencyObj, null))
                    {
                        if (agencyObj.Id > 0)
                        {
                            res = agencyObj.Id;
                        }
                        else
                        {
                            res = 0;
                        }
                    }
                }
                else
                {
                    res = 0;
                }
            }
            catch (Exception ex)
            {
                res = 0;
            }
            return 0;
        }

        public ResponseViewModal GetAgencyID(ApplicationUser applicationUser)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                Entity.Masters.Agency agencyObj = null;
                agencyObj = _agencyRepository.GetAll().Where(x => x.QuickPin == applicationUser.QuickPin && x.IsDeleted == false).FirstOrDefault();
                if (!ReferenceEquals(agencyObj, null))
                {
                    if (agencyObj.Id > 0)
                    {
                        res.AgencyId = agencyObj.Id;
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Login successfully.";
                    }
                    else
                    {
                        res.AgencyId = 0;
                        res.IsSuccess = false;
                        res.StatusCode = 203;
                        res.Message = "Login successfully.";
                    }
                }
                else
                {
                    res.AgencyId = 0;
                    res.IsSuccess = false;
                    res.StatusCode = 203;
                    res.Message = "Login successfully.";
                }

            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.WrongUsernamePassword;
            }
            return res;
        }


    }
}
