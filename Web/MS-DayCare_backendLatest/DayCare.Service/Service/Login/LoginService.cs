using DayCare.Model.ApplicationUser;
using DayCare.Model.Common;
using DayCare.Model.Options;
using DayCare.Service.Common;
using DayCare.Service.IService.Login;
using DayCare.Service.IService.User;
using DayCare.Service.Token;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;
using System.Security.Claims;
using System.Security.Principal;
using static DayCare.Service.Common.CommonEnum;
using System.IdentityModel.Tokens.Jwt;
using DayCare.Model.User;
using DayCare.Repository.IRepository;
using System.Linq;
using DayCare.Service.IService.Agency;
using DayCare.Model.Student;
using DayCare.Entity.Parent;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.User;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using DayCare.Model.Teacher;
using DayCare.Model.Master;
using System.Collections.Generic;
using DayCare.Model.Agency;

namespace DayCare.Service.Service.Login
{
    public class LoginService : ILoginService
    {
        private readonly ILogger _logger;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IStudentService _studentService;
        private readonly ITeacherInfoRepository _teacherInfoRepository;
        private readonly IParentRepository _parentRepository;
        private readonly IAgencyRepository _agencyRepository;
        private readonly ITeacherDailyAttendenceRepository _teacherDailyAttendenceRepository;
        private readonly IStudentRepository _studentRepository;
        public  readonly IStudentSubsidyDetailsRepository _studentsubsidyDetailsRepository;
        public  readonly IAuthorizedPersonRepository _authorizedPersonDetails;
        private readonly IParentStudentMappingRepository _parentStudentMappingRepository;
        private readonly ISubscriptionDetailsRepository _subscriptionDetailsRepository;
        private readonly IStripeDetailsRepository _stripeDetailsRepository;
        private readonly DataContext _dataContext;
        private readonly IUserLoginDeviceRepository _userLoginDeviceRepository;
        private readonly IUserRepository _userRepository;
        //private readonly double BlockedHour = 2;
        CommonMethods commonMethods = null;
        private string DomainName = HCOrganizationConnectionStringEnum.Host; //its Merging db
        public LoginService(ITokenService tokenService, IOptions<JwtIssuerOptions> jwtOptions, ILoggerFactory loggerFactory, IUserService userService
            , ITeacherInfoRepository teacherInfoRepository, IUserRepository userRepository, IParentRepository parentRepository, IAgencyRepository agencyRepository,
            ITeacherDailyAttendenceRepository teacherDailyAttendenceRepository, IStudentService studentService, IStudentRepository studentRepository, IParentStudentMappingRepository parentStudentMappingRepository,ISubscriptionDetailsRepository subscriptionDetailsRepository,IStripeDetailsRepository stripeDetailsRepository,
            IUserLoginDeviceRepository userLoginDeviceRepository, IAuthorizedPersonRepository authorizedPersonDetails, IStudentSubsidyDetailsRepository studentsubsidyDetailsRepository, DataContext dataContext
            )
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
            _userService = userService;
            _studentService = studentService;
            commonMethods = new CommonMethods();
            _logger = loggerFactory.CreateLogger<LoginService>();
            _teacherInfoRepository = teacherInfoRepository;
            _parentRepository = parentRepository;
            _agencyRepository = agencyRepository;
            _teacherDailyAttendenceRepository = teacherDailyAttendenceRepository;
            _studentRepository = studentRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
            _subscriptionDetailsRepository = subscriptionDetailsRepository;
            _stripeDetailsRepository = stripeDetailsRepository;
            _userLoginDeviceRepository = userLoginDeviceRepository;
            _authorizedPersonDetails = authorizedPersonDetails;
            _studentsubsidyDetailsRepository = studentsubsidyDetailsRepository;
            _userRepository = userRepository;
        }

        public JsonModel Login(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token)
        {
            JsonModel Result = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                //check user exit in database or not
                long OrgID = GetOrganizationIDByBusinessName(token);
                var dbUser = _tokenService.GetUserByEmailAddress(applicationUser.EmailAddress);
                var identity = GetClaimsIdentity(applicationUser, dbUser);                

               List<AgencyViewModel> allAgency = new List<AgencyViewModel>();                

               if (dbUser != null && Crypto.ValidatePassword(applicationUser.Password, dbUser.Password))
               {
                 if (dbUser.RoleId == 2)
                 {
                    IQueryable<Entity.Masters.Agency> agencyDetails = _agencyRepository.GetAll().Where(Check => Check.UserID == dbUser.Id);

                     allAgency = (from ADObj in agencyDetails
                                  where ADObj.UserID == dbUser.Id
                                  select new AgencyViewModel()
                                             {
                                                 Id = ADObj.Id,
                                                 UserID = ADObj.UserID,
                                                 EmailId = ADObj.EmailId,
                                                 IsDeleted = ADObj.IsDeleted,
                                                 AgencyName = ADObj.AgencyName
                                             }).ToList();

                  }
                  if (dbUser.RoleId == 1)
                  {
                     IQueryable<Users> agencyDetails = _userRepository.GetAll().Where(Check => Check.EmailAddress == dbUser.EmailAddress);

                     allAgency = (from ADObj in agencyDetails
                                  where ADObj.EmailAddress == dbUser.EmailAddress
                                  select new AgencyViewModel()
                                   {
                                         Id = ADObj.Id,                                        
                                         EmailId = ADObj.EmailAddress,
                                         IsDeleted = ADObj.IsDeleted 
                                   }).ToList();
                    }
                  if (!(dbUser.RoleId == 2 || dbUser.RoleId == 1))
                   {
                       IQueryable<Entity.Masters.Agency> agencyDetails = _agencyRepository.GetAll().Where(Check => Check.Id == dbUser.AgencyID);

                        allAgency = (from ADObj in agencyDetails
                                             where ADObj.Id == dbUser.AgencyID
                                             select new AgencyViewModel()
                                             {
                                                 Id = ADObj.Id,
                                                 UserID = ADObj.UserID,
                                                 EmailId = ADObj.EmailId,
                                                 IsDeleted = ADObj.IsDeleted,
                                                 AgencyName = ADObj.AgencyName
                                             }).ToList();
                    }

                 if(allAgency.Count > 0)
                  {
                     if(allAgency[0].IsDeleted == false)
                        {
                            if (applicationUser.PhoneTypeID == dbUser.PhoneTypeID && applicationUser.DeviceToken == dbUser.DeviceToken)
                            {
                                bool istokensaved = _userService.SaveMobileToken(applicationUser);
                                if (istokensaved)
                                {
                                    var objLoginUser = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                                    applicationUser.LoggedUserId = dbUser.Id;
                                    var saveUserLoginDevice = SaveLoginInfo(applicationUser);
                                    if (saveUserLoginDevice.SaveId > 0)
                                    {
                                        dbUser = _tokenService.GetUserByEmailAddress(applicationUser.EmailAddress);
                                        Result = objLoginUser;
                                        Result.Message = "User is authorized.";
                                        Result.StatusCode = (long)HttpStatusCodes.OK;
                                        return Result;
                                    }
                                    else
                                    {
                                        Result.data = new object();
                                        Result.StatusCode = 987;
                                        Result.Message = "Something went wrong.";
                                        return Result;
                                    }
                                }
                                else
                                {

                                    Result.data = new object();
                                    Result.Message = StatusMessage.InvalidUserOrPassword;
                                    Result.StatusCode = (long)HttpStatusCodes.BadRequest;
                                    return Result;
                                }
                            }
                            else
                            {
                                // update the old token with a new token
                                bool istokensaved = _userService.SaveMobileToken(applicationUser);
                                if (istokensaved)
                                {
                                    var objLoginUser = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                                    applicationUser.LoggedUserId = dbUser.Id;
                                    var saveUserLoginDevice = SaveLoginInfo(applicationUser);
                                    if (saveUserLoginDevice.SaveId > 0)
                                    {
                                        dbUser = _tokenService.GetUserByEmailAddress(applicationUser.EmailAddress);
                                        Result = objLoginUser;
                                        Result.Message = "User is authorized.";
                                        Result.StatusCode = (long)HttpStatusCodes.OK;
                                        return Result;
                                    }
                                    //dbUser = _tokenService.GetUserByEmailAddress(applicationUser.EmailAddress);
                                    //Result = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                                    //Result.Message = "User is authorized.";
                                    //Result.StatusCode = (long)HttpStatusCodes.OK;
                                    //return Result;
                                }
                                else
                                {
                                    Result.data = new object();
                                    Result.Message = StatusMessage.InvalidUserOrPassword;
                                    Result.StatusCode = (long)HttpStatusCodes.BadRequest;
                                    return Result;
                                }
                            }
                        }
                        else
                        {
                            Result.data = new object();
                            Result.Message = StatusMessage.AccountDeactivated;
                            Result.StatusCode = (long)HttpStatusCodes.BadRequest;
                            return Result;
                        }                       
                    }
                }
                else
                 {
                     Result.data = new object();
                     Result.Message = StatusMessage.InvalidUserOrPassword;
                     Result.StatusCode = (long)HttpStatusCodes.BadRequest;
                     return Result;
                 }

                return Result;                                  
            }
            catch (Exception ex)
            {
                Result.data = new object();
                Result.Message = StatusMessage.InvalidUserOrPassword;
                Result.StatusCode = (long)HttpStatusCodes.BadRequest;
                return Result;
                throw ex;
            }
        }

        /// <summary>
        /// this will get the organizationID from host name 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        private long GetOrganizationIDByBusinessName(TokenModel token)
        {
            long OrgID = 0;
            StringValues businessName;
            token.Request.Request.Headers.TryGetValue("DomainName", out businessName); //get host name from header            
            OrgID = 1;//_tokenService.GetOrganizationIDByName(commonMethods.Decrypt(businessName));
            return OrgID;
        }

        private static ClaimsIdentity GetClaimsIdentity(ApplicationUser user, Entity.User.Users dbUser)
        {
            CommonMethods commonMethods = new CommonMethods();

            if (dbUser != null && (user.EmailAddress.ToUpper() == dbUser.EmailAddress.ToUpper() && Crypto.ValidatePassword(user.Password, dbUser.Password))) //commonMethods.Decrypt(dbUser.Password)))
            {
                return new ClaimsIdentity(new GenericIdentity(user.EmailAddress, "Token"),
                  new[]
                  {
                   new System.Security.Claims.Claim("DayCare", "IAmAuthorized")
                  });
            }
            else
            {
                return null;
            }

            // Credentials are invalid, or account doesn't exist
            //return Task.FromResult<ClaimsIdentity>(null);
        }

        private JsonModel LoginUser(ApplicationUser applicationUser, Entity.User.Users dbUser, TokenModel token, ClaimsIdentity identity, JwtIssuerOptions _jwtOptions)
        {
            JsonModel response = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                #region get doman name   

                StringValues Host = string.Empty; token.Request.Request.Headers.TryGetValue("BusinessToken", out Host);
                if (!string.IsNullOrEmpty(Host))
                {
                    DomainName = commonMethods.Decrypt(!string.IsNullOrEmpty(Host) ? Host.ToString() : applicationUser.BusinessToken);
                }
                #endregion

                //get login user role name
                string[] userRole = { dbUser.RoleId.ToString() };

                string NewQuickPin;
                if (String.IsNullOrEmpty(dbUser.QuickPin))
                {
                    NewQuickPin = string.Empty;
                }
                else
                {
                    NewQuickPin = dbUser.QuickPin;
                }
                //create claim for login user           
                dynamic claims;
                try
                {
                    ClaimsIdentity ident = new ClaimsIdentity();
                    claims = new Claim[]
                                 {
                    new System.Security.Claims.Claim("UserID", dbUser.Id.ToString()),
                    new System.Security.Claims.Claim("RoleID", dbUser.RoleId.ToString()),
                    new System.Security.Claims.Claim("UserName", dbUser.UserName.ToString()),
                    new System.Security.Claims.Claim("QuickPin", NewQuickPin),
                    //new System.Security.Claims.Claim("OrganizationID", dbUser.OrganizationID.ToString()),
                    //new System.Security.Claims.Claim("StaffID", StaffID.ToString()),
                    //new System.Security.Claims.Claim("LocationID", defaultLocation.ToString()),
                    new System.Security.Claims.Claim("DomainName",DomainName), // Domain name always add in token
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, applicationUser.EmailAddress),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, _jwtOptions.JtiGenerator()),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                    ident.FindFirst("DayCare")
                                  };
                }
                catch (Exception ex)
                {
                    throw;
                }


                //Not required to reset user its already done from where this method call

                // Create the JWT security token and encode it.
                var jwt = new JwtSecurityToken(
                    issuer: _jwtOptions.Issuer,
                    audience: _jwtOptions.Audience,
                    claims: claims,
                    notBefore: _jwtOptions.NotBefore,
                    expires: _jwtOptions.Expiration,
                    signingCredentials: _jwtOptions.SigningCredentials);              


                //add login user's role in token
                jwt.Payload["roles"] = userRole;

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                LoginUserInfo userInfo = new LoginUserInfo();
                if (dbUser != null)
                {
                    switch (dbUser.RoleId)
                    {
                        case 1:
                            userInfo.FirstName = "David";
                            userInfo.LastName = "Smith";
                            userInfo.ImagePath = "";
                            userInfo.ReleventUserID = 0;
                            userInfo.RoleId = 1;
                            userInfo.AgencyID = 0;
                            userInfo.EmailAddress = "tom@yopmail.com";
                            userInfo.LoginUserID = dbUser.Id;
                            break;
                        case 2:
                            IQueryable<Entity.Masters.Agency> agencyCollection = _agencyRepository.GetAll().Where(check => check.UserID == dbUser.Id);
                            userInfo = (from agencyObj in agencyCollection
                                        where (!agencyObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = agencyObj.OwnerFirstName,
                                            LastName = agencyObj.OwnerLastName,
                                            ImagePath = agencyObj.ImagePath,
                                            ReleventUserID = agencyObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = agencyObj.Id,
                                            EmailAddress = dbUser.EmailAddress,
                                            LoginUserID = dbUser.Id,
                                            LoginStatus = agencyObj.LoginStatus
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();

                            if (userInfo != null)
                            {
                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && (check.ValidToDate.Date >= DateTime.Now.Date));
                                if(subscriptionsCollection!=null && subscriptionsCollection.Count()> 0 )
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }
                                IQueryable<Entity.Masters.Agency> agencyStatus = _agencyRepository.GetAll().Where(check => check.Id == userInfo.AgencyID && check.Status==1 && !check.IsDeleted);
                                if (agencyStatus != null && agencyStatus.Count() > 0)
                                {
                                    userInfo.IsApprovedAgency = true;
                                }
                                else
                                {
                                    userInfo.IsApprovedAgency = false;
                                }
                            }
                            break;
                        case 3:
                            IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(check => check.AgencyID == dbUser.AgencyID && check.UserID == dbUser.Id);
                            userInfo = (from teachersObj in teacherCollection
                                        where (!teachersObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = teachersObj.FirstName,
                                            LastName = teachersObj.LastName,
                                            ImagePath = teachersObj.ImagePath,
                                            ReleventUserID = teachersObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = teachersObj.AgencyID,
                                            EmailAddress = teachersObj.Email,
                                            LoginUserID = dbUser.Id
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();

                            if (userInfo != null)
                            {
                                IQueryable<Entity.Teachers.TeacherDailyAttendence> teacherDailyAttendence = _teacherDailyAttendenceRepository.GetAll().Where(
                                check => Convert.ToDateTime(check.AttendanceDate.Date) == DateTime.UtcNow.Date && check.TeacherID == userInfo.ReleventUserID);

                                var allDetails = (from SSD in teacherDailyAttendence
                                                  where Convert.ToDateTime(SSD.AttendanceDate.Date) == DateTime.UtcNow.Date && SSD.TeacherID == userInfo.ReleventUserID &&
                                                  SSD.IsDeleted == false
                                                  orderby SSD.Id descending
                                                  select new TeacherDailyAttendenceRequestViewModel()
                                                  {
                                                      TeacherDailyAttendenceID = SSD.Id,
                                                      AttendenceStatusID = SSD.AttendenceStatusID
                                                  }).ToList();

                                if (allDetails != null && allDetails.Count > 0)
                                {
                                    userInfo.TeacherTodayAttendenceId = allDetails[0].TeacherDailyAttendenceID;
                                    userInfo.TeacherTodayAttendenceStatusId = allDetails[0].AttendenceStatusID;                                   
                                }
                                else
                                {
                                    userInfo.TeacherTodayAttendenceId = 0;
                                    userInfo.TeacherTodayAttendenceStatusId = 0;
                                }
                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && check.ValidToDate.Date >= DateTime.Now.Date);
                                if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }
                            }
                            break;
                        case 4:
                            IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(check => check.AgencyID == dbUser.AgencyID
                            && check.UserID == dbUser.Id);
                            userInfo = (from parentObj in parentCollection
                                        where (!parentObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = parentObj.FirstName,
                                            LastName = parentObj.LastName,
                                            ImagePath = parentObj.ImagePath,
                                            ReleventUserID = parentObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = parentObj.AgencyID,
                                            EmailAddress = parentObj.EmailId,
                                            IsParent = parentObj.IsParent,
                                            IsGaurdian = parentObj.IsGaurdian,
                                            IsSecondaryParent = parentObj.IsSecondaryParent,
                                            AddedByID = parentObj.AddedByID,
                                            LoginUserID = dbUser.Id
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                            if (userInfo != null)
                            {                               
                                IQueryable<Entity.Agency.StripeDetails> stripeCollection = _stripeDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID);
                                if (stripeCollection != null && stripeCollection.Count() > 0)
                                {
                                    userInfo.IsStripeAccount = true;
                                }
                                else
                                {
                                    userInfo.IsStripeAccount = false;
                                }

                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && check.ValidToDate.Date >= DateTime.Now.Date);
                                if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }

                                IQueryable<Entity.Parent.ParentStudentMapping> mapActivity = _parentStudentMappingRepository.GetAll().Where(
                               check => check.ParentID == userInfo.ReleventUserID && !check.IsDeleted);

                                if (mapActivity != null && mapActivity.Count() > 0)
                                {
                                    userInfo.ChildCount = mapActivity.Count();                                   
                                }
                                else
                                {
                                    userInfo.ChildCount = 0;                                   
                                }
                            }

                            break;
                        default:
                            break;
                    }
                }
                response = new JsonModel
                {
                    access_token = encodedJwt,
                    expires_in = (long)_jwtOptions.ValidFor.TotalSeconds,
                    data = userInfo,//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = (long)HttpStatusCodes.OK,
                    Message = "User is authorized."
                };
                return response;
            }
            catch (Exception ex)
            {
                response = new JsonModel
                {
                    expires_in = (long)_jwtOptions.ValidFor.TotalSeconds,
                    data = new object(),//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = 401,
                    Message = StatusMessage.InvalidUserOrPassword
                };
                return response;
                throw ex;
            }
        }

        private JsonModel LoginUserAuth(ApplicationUser applicationUser, Entity.Masters.AuthorizedPerson dbAuthorizedPersonLogin, TokenModel token, ClaimsIdentity identity, JwtIssuerOptions _jwtOptions)
        {
            JsonModel response = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                #region get doman name   

                StringValues Host = string.Empty; token.Request.Request.Headers.TryGetValue("BusinessToken", out Host);
                if (!string.IsNullOrEmpty(Host))
                {
                    DomainName = commonMethods.Decrypt(!string.IsNullOrEmpty(Host) ? Host.ToString() : applicationUser.BusinessToken);
                }
                #endregion

                //get login user role name
                string[] userRole = { "4" };

                string NewQuickPin;
                if (String.IsNullOrEmpty(dbAuthorizedPersonLogin.QuickPin))
                {
                    NewQuickPin = string.Empty;
                }
                else
                {
                    NewQuickPin = dbAuthorizedPersonLogin.QuickPin;
                }
                //create claim for login user           
                dynamic claims;
                try
                {
                    ClaimsIdentity ident = new ClaimsIdentity();
                    claims = new Claim[]
                    {
                   // new System.Security.Claims.Claim("UserID", dbUser.Id.ToString()),
                   // new System.Security.Claims.Claim("RoleID", dbUser.RoleId.ToString()),
                   // new System.Security.Claims.Claim("UserName", dbUser.UserName.ToString()),
                    new System.Security.Claims.Claim("QuickPin", NewQuickPin),
                    //new System.Security.Claims.Claim("OrganizationID", dbUser.OrganizationID.ToString()),
                    //new System.Security.Claims.Claim("StaffID", StaffID.ToString()),
                    //new System.Security.Claims.Claim("LocationID", defaultLocation.ToString()),
                    new System.Security.Claims.Claim("DomainName",DomainName),                     // Domain name always add in token
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, applicationUser.EmailAddress),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, _jwtOptions.JtiGenerator()),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                    ident.FindFirst("DayCare")
                  };
                }
                catch (Exception ex)
                {
                    throw;
                }

                //Not required to reset user its already done from where this method call

                // Create the JWT security token and encode it.
                var jwt = new JwtSecurityToken(
                    issuer: _jwtOptions.Issuer,
                    audience: _jwtOptions.Audience,
                    claims: claims,
                    notBefore: _jwtOptions.NotBefore,
                    expires: _jwtOptions.Expiration,
                    signingCredentials: _jwtOptions.SigningCredentials);               


                //add login user's role in token
                jwt.Payload["roles"] = userRole;

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                LoginUserInfo userInfoAuth = new LoginUserInfo();
                if (dbAuthorizedPersonLogin != null)
                {
                    IQueryable<Entity.Masters.AuthorizedPerson> AuthLoginDetails = _authorizedPersonDetails.GetAll().Where(m => m.QuickPin == applicationUser.QuickPin && m.IsActive == true && m.IsDeleted == false);

                    userInfoAuth = (from authloginObj in AuthLoginDetails
                                    where authloginObj.QuickPin == applicationUser.QuickPin && authloginObj.IsActive == true && authloginObj.IsDeleted == false
                                    select new LoginUserInfo
                                    {
                                        FirstName = authloginObj.AuthorizedPersonName,
                                        LastName = authloginObj.AuthorizedPersonName,
                                        ImagePath = authloginObj.ImagePath,
                                        ReleventUserID = authloginObj.ParentID,
                                        AgencyID = authloginObj.AgencyID,
                                        EmailAddress = authloginObj.EmailId,                                       
                                    }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                }
                response = new JsonModel
                {
                    access_token = encodedJwt,
                    expires_in = (long)_jwtOptions.ValidFor.TotalSeconds,
                    data = userInfoAuth,//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = (long)HttpStatusCodes.OK,
                    Message = "User is authorized."
                };
                return response;
            }
            catch (Exception ex)
            {
                response = new JsonModel
                {
                    expires_in = (long)_jwtOptions.ValidFor.TotalSeconds,
                    data = new object(),//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = 401,
                    Message = StatusMessage.InvalidUserOrPassword
                };
                return response;
                throw ex;
            }
        }

        private TokenModel GetIPFromRequst(TokenModel token)
        {
            StringValues ipAddress;
            token.Request.Request.Headers.TryGetValue("IPAddress", out ipAddress);
            if (!string.IsNullOrEmpty(ipAddress)) { token.IPAddress = ipAddress; } else { token.IPAddress = "203.129.220.76"; }
            return token;
        }

        private static long ToUnixEpochDate(DateTime date)
       => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
        //private static ClaimsIdentity GetClaimsIdentity(ApplicationUser user, User dbUser)
        //{
        //    CommonMethods commonMethods = new CommonMethods();

        //    if (dbUser != null && (user.UserName.ToUpper() == dbUser.UserName.ToUpper() && user.Password == commonMethods.Decrypt(dbUser.Password)))
        //    {
        //        return new ClaimsIdentity(new GenericIdentity(user.UserName, "Token"),
        //          new[]
        //          {
        //           new System.Security.Claims.Claim("DayCare", "IAmAuthorized")
        //          });
        //    }
        //    else
        //    {
        //        return null;
        //    }

        //    // Credentials are invalid, or account doesn't exist
        //    //return Task.FromResult<ClaimsIdentity>(null);
        //}
        
        [HttpPost]
        public JsonModel LoginforKioskApp(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token)
        {
            JsonModel Result = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                //check user exit in database or not
                long OrgID = GetOrganizationIDByBusinessName(token);
                var dbUser = _tokenService.GetUserByQuickPin(applicationUser.QuickPin);
                var dbAuthorizedPersonLogin = _tokenService.GetAuthorizedPersonLoginByQuickPin(applicationUser.QuickPin);
                               
                if (dbUser != null)
                {
                    applicationUser.EmailAddress = dbUser.EmailAddress;
                    applicationUser.Password = dbUser.Password;
                    applicationUser.AgencyID = dbUser.AgencyID;
                    applicationUser.DeviceToken = null;
                }

                if (dbAuthorizedPersonLogin != null)
                {
                    applicationUser.EmailAddress = dbAuthorizedPersonLogin.EmailId;                    
                    applicationUser.AgencyID = dbAuthorizedPersonLogin.AgencyID;
                    applicationUser.DeviceToken = null;
                }

                var identity = GetClaimsIdentity(applicationUser, dbUser);              

                if (dbUser != null && dbUser.QuickPin == applicationUser.QuickPin && dbUser.AgencyID == applicationUser.AgencyID)
                {
                    if (applicationUser.PhoneTypeID == dbUser.PhoneTypeID && applicationUser.DeviceToken == dbUser.DeviceToken)
                    // applicationUser.PhoneTypeID != 0 && applicationUser.DeviceToken != string.Empty
                    {
                        bool istokensaved = _userService.SaveMobileToken(applicationUser);
                        if (istokensaved)
                        {
                            dbUser = _tokenService.GetUserByQuickPin(applicationUser.QuickPin);
                            Result = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                            Result.Message = "User is authorized.";
                            Result.StatusCode = (long)HttpStatusCodes.OK;
                            Result.IsAuthPerson = false;
                            return Result;
                        }
                        else
                        {
                            Result.data = new object();
                            Result.Message = StatusMessage.InvalidUserOrPassword;
                            Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                            return Result;
                        }
                    }
                    else
                    {
                        // update the old token with a new token
                        bool istokensaved = _userService.SaveMobileToken(applicationUser);
                        if (istokensaved)
                        {
                            dbUser = _tokenService.GetUserByQuickPin(applicationUser.QuickPin);
                            Result = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                            Result.Message = "User is authorized.";
                            Result.StatusCode = (long)HttpStatusCodes.OK;
                            Result.IsAuthPerson = false;                            
                            return Result;
                        }
                        else
                        {
                            Result.data = new object();
                            Result.Message = StatusMessage.InvalidUserOrPassword;
                            Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                            return Result;
                        }
                    }
                }                

                if(dbAuthorizedPersonLogin != null && dbAuthorizedPersonLogin.QuickPin == applicationUser.QuickPin)
                {                   
                    Result = LoginUserAuth(applicationUser, dbAuthorizedPersonLogin, token, identity, _jwtOptions);                   
                    Result.Message = "User is authorized.";
                    Result.StatusCode = (long)HttpStatusCodes.OK;
                    Result.IsAuthPerson = true;
                    Result.QuickPin = applicationUser.QuickPin;
                    return Result;
                }
                else
                {
                    Result.data = new object();
                    Result.Message = StatusMessage.InvalidUserOrPassword;
                    Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                    return Result;
                }                
            }           
            catch (Exception ex)
            {
                Result.data = new object();
                Result.Message = StatusMessage.InvalidUserOrPassword;
                Result.StatusCode = (long)HttpStatusCodes.InternalServerError;
                return Result;
                throw ex;
            }
        }

        [HttpPost]
        public JsonModel LoginforKioskWeb(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token)
        {
            JsonModel Result = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                //check user exit in database or not
                long OrgID = GetOrganizationIDByBusinessName(token);
                var dbUser = _tokenService.GetUserByQuickPinAndAgency(applicationUser.QuickPin, applicationUser.AgencyID);
                var dbAuthorizedPersonLogin = _tokenService.GetAuthorizedPersonLoginByQuickPinAndAgency(applicationUser.QuickPin, applicationUser.AgencyID);

                if (dbUser != null)
                {
                    applicationUser.EmailAddress = dbUser.EmailAddress;
                    applicationUser.Password = dbUser.Password;
                    applicationUser.AgencyID = dbUser.AgencyID;
                    applicationUser.DeviceToken = null;
                }

                if (dbAuthorizedPersonLogin != null)
                {
                    applicationUser.EmailAddress = dbAuthorizedPersonLogin.EmailId;
                    applicationUser.AgencyID = dbAuthorizedPersonLogin.AgencyID;
                    applicationUser.DeviceToken = null;
                }

                var identity = GetClaimsIdentity(applicationUser, dbUser);

                if (dbUser != null && dbUser.QuickPin == applicationUser.QuickPin && dbUser.AgencyID == applicationUser.AgencyID)
                {
                    if (applicationUser.PhoneTypeID == dbUser.PhoneTypeID && applicationUser.DeviceToken == dbUser.DeviceToken)
                    // applicationUser.PhoneTypeID != 0 && applicationUser.DeviceToken != string.Empty
                    {
                        bool istokensaved = _userService.SaveMobileToken(applicationUser);
                        if (istokensaved)
                        {
                            dbUser = _tokenService.GetUserByQuickPin(applicationUser.QuickPin);
                            Result = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                            Result.Message = "User is authorized.";
                            Result.StatusCode = (long)HttpStatusCodes.OK;
                            Result.IsAuthPerson = false;
                            return Result;
                        }
                        else
                        {
                            Result.data = new object();
                            Result.Message = StatusMessage.InvalidUserOrPassword;
                            Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                            return Result;
                        }
                    }
                    else
                    {
                        // update the old token with a new token
                        bool istokensaved = _userService.SaveMobileToken(applicationUser);
                        if (istokensaved)
                        {
                            dbUser = _tokenService.GetUserByQuickPin(applicationUser.QuickPin);
                            Result = LoginUser(applicationUser, dbUser, token, identity, _jwtOptions);
                            Result.Message = "User is authorized.";
                            Result.StatusCode = (long)HttpStatusCodes.OK;
                            Result.IsAuthPerson = false;
                            return Result;
                        }
                        else
                        {
                            Result.data = new object();
                            Result.Message = StatusMessage.InvalidUserOrPassword;
                            Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                            return Result;
                        }
                    }
                }

                if (dbAuthorizedPersonLogin != null && dbAuthorizedPersonLogin.QuickPin == applicationUser.QuickPin)
                {
                    Result = LoginUserAuth(applicationUser, dbAuthorizedPersonLogin, token, identity, _jwtOptions);
                    Result.Message = "User is authorized.";
                    Result.StatusCode = (long)HttpStatusCodes.OK;
                    Result.IsAuthPerson = true;
                    Result.QuickPin = applicationUser.QuickPin;
                    return Result;
                }
                else
                {
                    Result.data = new object();
                    Result.Message = StatusMessage.InvalidUserOrPassword;
                    Result.StatusCode = (long)HttpStatusCodes.Unauthorized;
                    return Result;
                }
            }
            catch (Exception ex)
            {
                Result.data = new object();
                Result.Message = StatusMessage.InvalidUserOrPassword;
                Result.StatusCode = (long)HttpStatusCodes.InternalServerError;
                return Result;
                throw ex;
            }
        }

        public ResponseViewModal SaveLoginInfo(ApplicationUser applicationUser)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    UserLoginDevice objUserLoginDevice = new UserLoginDevice();
                    var existingDeviceRecord = _dataContext.UserLoginDevice.Where(x => x.DeviceToken == applicationUser.BusinessToken).OrderByDescending(x=>x.LastUsed).FirstOrDefault();
                    if(existingDeviceRecord != null && existingDeviceRecord.Id > 0)
                    {
                        existingDeviceRecord.DeviceCount = existingDeviceRecord.DeviceCount + 1;
                        existingDeviceRecord.DeviceId = applicationUser.BusinessToken;
                        existingDeviceRecord.DeviceToken = applicationUser.BusinessToken;
                        existingDeviceRecord.IpAddress = applicationUser.IpAddress;
                        existingDeviceRecord.LastUsed = DateTime.UtcNow;
                        existingDeviceRecord.Latitude = applicationUser.Latitude;
                        existingDeviceRecord.Longitude = applicationUser.Longitude;                        
                       
                        _userLoginDeviceRepository.SaveChanges();
                        daycaredb.Commit();
                        res.SaveId = existingDeviceRecord.Id;
                    }
                    else
                    {
                        objUserLoginDevice = new UserLoginDevice()
                        {
                            DateAdded = DateTime.UtcNow,
                            DeviceCount = 0,
                            DeviceId = applicationUser.BusinessToken,
                            DeviceModel = applicationUser.DeviceModel,
                            DeviceToken = applicationUser.BusinessToken,
                            IpAddress = applicationUser.IpAddress,
                            LastUsed = DateTime.UtcNow,
                            Latitude = applicationUser.Latitude,
                            Longitude = applicationUser.Longitude,
                            OperatingSystemVersion = applicationUser.OperatingSystemVersion,
                            OSType = applicationUser.OSType,
                            UserId = applicationUser.LoggedUserId
                        };
                        _userLoginDeviceRepository.Create(objUserLoginDevice);
                        _userLoginDeviceRepository.SaveChanges();
                        daycaredb.Commit();
                        res.SaveId = objUserLoginDevice.Id;
                    }                    
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Record Saved Successfully";
                    res.IsSuccess = true;
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;                    
                }
                return res;
            }
        }

        public JsonModel GetUserDetails(UserModel tokens, long userId)
        {
            JsonModel response = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
           try
            {
                ResponseViewModal res = new ResponseViewModal();

                LoginUserInfo userInfo = new LoginUserInfo();
                var dbUser = _userRepository.GetFirstOrDefault(check => check.Id == userId);
                if (dbUser != null)
                {
                    switch (dbUser.RoleId)
                    {
                        case 1:
                            userInfo.FirstName = "David";
                            userInfo.LastName = "Smith";
                            userInfo.ImagePath = "";
                            userInfo.ReleventUserID = 0;
                            userInfo.RoleId = 1;
                            userInfo.AgencyID = 0;
                            userInfo.EmailAddress = "tom@yopmail.com";
                            userInfo.LoginUserID = dbUser.Id;
                            break;
                        case 2:
                            IQueryable<Entity.Masters.Agency> agencyCollection = _agencyRepository.GetAll().Where(check => check.UserID == dbUser.Id);
                            userInfo = (from agencyObj in agencyCollection
                                        where (!agencyObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = agencyObj.OwnerFirstName,
                                            LastName = agencyObj.OwnerLastName,
                                            ImagePath = "",
                                            ReleventUserID = agencyObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = agencyObj.Id,
                                            EmailAddress = dbUser.EmailAddress,
                                            LoginUserID = dbUser.Id
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                            if (userInfo != null)
                            {
                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && (check.ValidToDate.Date >= DateTime.Now.Date));
                                if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }
                                IQueryable<Entity.Masters.Agency> agencyStatus = _agencyRepository.GetAll().Where(check => check.Id == userInfo.AgencyID && check.Status == 1 && !check.IsDeleted);
                                if (agencyStatus != null && agencyStatus.Count() > 0)
                                {
                                    userInfo.IsApprovedAgency = true;
                                }
                                else
                                {
                                    userInfo.IsApprovedAgency = false;
                                }
                            }
                            break;
                        case 3:
                            IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(check => check.AgencyID == dbUser.AgencyID && check.UserID == dbUser.Id);
                            userInfo = (from teachersObj in teacherCollection
                                        where (!teachersObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = teachersObj.FirstName,
                                            LastName = teachersObj.LastName,
                                            ImagePath = teachersObj.ImagePath,
                                            ReleventUserID = teachersObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = teachersObj.AgencyID,
                                            EmailAddress = teachersObj.Email,
                                            LoginUserID = dbUser.Id
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                            if (userInfo != null)
                            {
                                IQueryable<Entity.Teachers.TeacherDailyAttendence> teacherDailyAttendence = _teacherDailyAttendenceRepository.GetAll().Where(
                                check => check.AttendanceDate.Date == DateTime.UtcNow.Date && check.TeacherID == userInfo.ReleventUserID);
                                if (teacherDailyAttendence != null && teacherDailyAttendence.Count() > 0)
                                {
                                    userInfo.TeacherTodayAttendenceId = teacherDailyAttendence.Select(check => check.Id).FirstOrDefault();
                                    userInfo.TeacherTodayAttendenceStatusId = teacherDailyAttendence.Select(check => check.AttendenceStatusID).FirstOrDefault();
                                }
                                else
                                {
                                    userInfo.TeacherTodayAttendenceId = 0;
                                    userInfo.TeacherTodayAttendenceStatusId = 0;
                                }
                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && check.ValidToDate.Date >= DateTime.Now.Date);
                                if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }
                            }
                            break;
                        case 4:
                            IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(check => check.AgencyID == dbUser.AgencyID
                            && check.UserID == dbUser.Id);
                            userInfo = (from parentObj in parentCollection
                                        where (!parentObj.IsDeleted)
                                        select new LoginUserInfo
                                        {
                                            FirstName = parentObj.FirstName,
                                            LastName = parentObj.LastName,
                                            ImagePath = parentObj.ImagePath,
                                            ReleventUserID = parentObj.Id,
                                            RoleId = dbUser.RoleId,
                                            AgencyID = parentObj.AgencyID,
                                            EmailAddress = parentObj.EmailId,
                                            IsParent = parentObj.IsParent,
                                            IsGaurdian = parentObj.IsGaurdian,
                                            IsSecondaryParent = parentObj.IsSecondaryParent,
                                            AddedByID = parentObj.AddedByID,
                                            LoginUserID = dbUser.Id
                                        }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                            if (userInfo != null)
                            {
                                IQueryable<Entity.Parent.ParentStudentMapping> mapActivity = _parentStudentMappingRepository.GetAll().Where(
                                check => check.ParentID == userInfo.ReleventUserID && !check.IsDeleted);

                                if (mapActivity != null && mapActivity.Count() > 0)
                                {
                                    userInfo.ChildCount = mapActivity.Count();
                                }
                                else
                                {
                                    userInfo.ChildCount = 0;
                                }
                                IQueryable<Entity.Agency.StripeDetails> stripeCollection = _stripeDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID);
                                if (stripeCollection != null && stripeCollection.Count() > 0)
                                {
                                    userInfo.IsStripeAccount = true;
                                }
                                else
                                {
                                    userInfo.IsStripeAccount = false;
                                }

                                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && check.ValidToDate.Date >= DateTime.Now.Date);
                                if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                                {
                                    userInfo.IsSubscriptionActive = true;
                                }
                                else
                                {
                                    userInfo.IsSubscriptionActive = false;
                                }
                            }

                            break;
                        default:
                            break;
                    }
                }
                response = new JsonModel
                {
                    access_token = tokens.Token,
                    data = userInfo,//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = (long)HttpStatusCodes.OK,
                    Message = "User is authorized."
                };
                return response;
            }
            catch (Exception ex)
            {
                response = new JsonModel
                {
                    data = new object(),//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = 401,
                    Message = "Unauthorized User"
                };
                return response;
                throw ex;
            }
        }

        public JsonModel GetTeacherLiginDetails(ApplicationUser applicationUser)
        {
            JsonModel response = new JsonModel()
            {
                data = false,
                Message = StatusMessage.ServerError,
                StatusCode = (long)HttpStatusCodes.InternalServerError
            };
            try
            {
                LoginUserInfo userInfo = new LoginUserInfo();
                Users selectedUser = _userRepository.Get(check => check.Id == applicationUser.LoggedUserId && check.AgencyID == applicationUser.AgencyID && !check.IsDeleted);
                if (selectedUser != null)
                {
                    IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(check => check.AgencyID == selectedUser.AgencyID && check.UserID == selectedUser.Id);
                    userInfo = (from teachersObj in teacherCollection
                                where (!teachersObj.IsDeleted)
                                select new LoginUserInfo
                                {
                                    FirstName = teachersObj.FirstName,
                                    LastName = teachersObj.LastName,
                                    ImagePath = teachersObj.ImagePath,
                                    ReleventUserID = teachersObj.Id,
                                    RoleId = selectedUser.RoleId,
                                    AgencyID = teachersObj.AgencyID,
                                    EmailAddress = teachersObj.Email,
                                    LoginUserID = selectedUser.Id
                                }).OrderBy(c => c.ReleventUserID).FirstOrDefault();
                    if (userInfo != null)
                    {
                        IQueryable<Entity.Teachers.TeacherDailyAttendence> teacherDailyAttendence = _teacherDailyAttendenceRepository.GetAll().Where(
                        check => Convert.ToDateTime(check.AttendanceDate.Date) == DateTime.UtcNow.Date && check.TeacherID == userInfo.ReleventUserID);

                        var allDetails = (from SSD in teacherDailyAttendence
                                          where Convert.ToDateTime(SSD.AttendanceDate.Date) == DateTime.UtcNow.Date && SSD.TeacherID == userInfo.ReleventUserID &&
                                          SSD.IsDeleted == false
                                          orderby SSD.Id descending
                                          select new TeacherDailyAttendenceRequestViewModel()
                                          {
                                              TeacherDailyAttendenceID = SSD.Id,
                                              AttendenceStatusID = SSD.AttendenceStatusID
                                          }).ToList();

                        if (allDetails != null && allDetails.Count > 0)
                        {
                            userInfo.TeacherTodayAttendenceId = allDetails[0].TeacherDailyAttendenceID;
                            userInfo.TeacherTodayAttendenceStatusId = allDetails[0].AttendenceStatusID;
                            //userInfo.TeacherTodayAttendenceId = allDetails.Select(check => check.TeacherDailyAttendenceID).LastOrDefault();
                            //userInfo.TeacherTodayAttendenceStatusId = allDetails.Select(check => check.AttendenceStatusID).LastOrDefault();
                        }
                        else
                        {
                            userInfo.TeacherTodayAttendenceId = 0;
                            userInfo.TeacherTodayAttendenceStatusId = 0;
                        }
                        IQueryable<Entity.Agency.SubscriptionDetails> subscriptionsCollection = _subscriptionDetailsRepository.GetAll().Where(check => check.AgencyID == userInfo.AgencyID && check.ValidToDate.Date >= DateTime.Now.Date);
                        if (subscriptionsCollection != null && subscriptionsCollection.Count() > 0)
                        {
                            userInfo.IsSubscriptionActive = true;
                        }
                        else
                        {
                            userInfo.IsSubscriptionActive = false;
                        }
                    }
                }
                else
                {
                    response = new JsonModel
                    {
                        access_token = "",
                        expires_in = 0,
                        data = userInfo,//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                        StatusCode = 401,
                        Message = "User is Unauthorized."
                    };
                }
                response = new JsonModel
                {
                    access_token = applicationUser.BusinessToken,
                    expires_in = 0,
                    data = userInfo,//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = (long)HttpStatusCodes.OK,
                    Message = "User is authorized."
                };
            }
            catch (Exception ex)
            {
                response = new JsonModel
                {
                    access_token = "",
                    expires_in = 0,
                    data = new object(),//_tokenService.GetUserByEmailAddress(applicationUser.EmailAddress)
                    StatusCode = 400,
                    Message = ex.Message
                };
            }

            return response;
        }
    }
}
