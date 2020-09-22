using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DayCare.Service.IService.User;
using DayCare.Service.Response;
using DayCare.Model.Common;
using DayCare.Model.User;
using DayCare.Model.Options;
using Microsoft.Extensions.Options;
using DayCare.Model.ApplicationUser;
using DayCare.Service.Common;
using DayCare.Service.Token;
using DayCare.Service.IService.Login;
using DayCare.Service.IService.Common;
using DayCare.Model.Response;
using Microsoft.AspNetCore.Http;
using DayCare.API.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {

        #region Initialize Dependency
        private readonly CommonMethods commonMethods = null;
        private readonly ITokenService _tokenService;
        private readonly ILoginService _loginService;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IUserService _usrService;
        private readonly IResponseService responseService;
        private readonly ICommonService _commonService;
        private readonly IUserService _userService;
        private JsonModel response;
        ResponseViewModal response1;
        private readonly IPushNotification _pushNotification;


        public UserController(IUserService UserService, IResponseService ResponseService, IOptions<JwtIssuerOptions> jwtOptions
            , ITokenService tokenService, ILoginService loginService, ICommonService commonService, IUserService userService, IPushNotification pushNotification)
        {
            commonMethods = new CommonMethods();
            _jwtOptions = jwtOptions.Value;
            this._usrService = UserService;
            this.responseService = ResponseService;
            _tokenService = tokenService;
            _loginService = loginService;
            _commonService = commonService;
            response = new JsonModel();
            _pushNotification = pushNotification;
            _userService = userService;
        }
        #endregion

        #region GET 
        [HttpGet]
        public async Task<JsonModel> GetAsync()
        {
            try
            {
                response = _usrService.GetUser;
                return await Task.FromResult(response);
            }
            catch (Exception ex)
            {
                return await Task.FromResult(responseService.ExceptionResponse(ex));
            }
        }
        #endregion

        #region Authentication 
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<JsonModel> Authenticate([FromBody]LoginModel loginModel)
        {
            try
            {
                var user = _usrService.Authenticate(loginModel);

                return await Task.FromResult(user);
            }
            catch (Exception ex)
            {
                return await Task.FromResult(responseService.ExceptionResponse(ex));
            }
        }
        #endregion

        [AllowAnonymous]
        [HttpPost("login")]
        public JsonModel login([FromBody]ApplicationUser applicationUser)
        {
            TokenModel token = commonMethods.GetTokenDataModel(HttpContext);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(DayCareConstants.Secret));
            var creds = _jwtOptions.SigningCredentials ?? new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            _jwtOptions.Issuer = _jwtOptions.Issuer ?? "www.example.com";
            _jwtOptions.Audience = _jwtOptions.Issuer ?? "www.example.com";
            _jwtOptions.SigningCredentials = _jwtOptions.SigningCredentials ?? creds;

            return _loginService.Login(applicationUser, _jwtOptions, token);
        }


        /// <summary>
        /// this will set user offline
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPatch("Logout")]
        public JsonModel Logout()
        {
            TokenModel token = commonMethods.GetTokenDataModel(HttpContext);
            return _usrService.Logout(token);
        }

        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }


        [AllowAnonymous]
        [HttpPost("loginforKioskApp")]
        public JsonModel loginforKioskApp([FromBody]ApplicationUser applicationUser)
        {
            TokenModel token = commonMethods.GetTokenDataModel(HttpContext);
            return _loginService.LoginforKioskApp(applicationUser, _jwtOptions, token);
        }

        [AllowAnonymous]
        [HttpPost("loginforKioskWeb")]
        public JsonModel loginforKioskWeb([FromBody]ApplicationUser applicationUser)
        {
            TokenModel token = commonMethods.GetTokenDataModel(HttpContext);
            return _loginService.LoginforKioskWeb(applicationUser, _jwtOptions, token);
        }

        [AllowAnonymous]
        [HttpPost("SendNotification")]
        public ResponseViewModal SendNotification(string deviceId, string message, string FCM_Server_Key)
        {
          return _pushNotification.SendNotification(deviceId, message, FCM_Server_Key);
        }

        [AllowAnonymous]
        [HttpPost("SendPushNotification")]
        public dynamic SendPushNotification(string[] deviceTokens, string title, string body, object data,bool isParent)
        {
            return _pushNotification.SendPushNotification(deviceTokens, title, body, data,isParent);
        }

        //added by Aniket for local storage config
        [AllowAnonymous]
        [HttpPost("GetAuthData")]
        public JsonModel GetAuthData(UserModel tokens)
        {
            var userId = User.GetUserId();
            return _loginService.GetUserDetails(tokens, userId);
        }

        [AllowAnonymous]
        [HttpPost("GetTeacherLiginDetails")]
        public JsonModel GetTeacherLiginDetails(ApplicationUser applicationUser)
        {
            var userId = User.GetUserId();
            return _loginService.GetTeacherLiginDetails(applicationUser);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("AgencyLoginForKiosk")]
        public ResponseViewModal AgencyLoginForKiosk(ApplicationUser applicationUser)
        {
            try
            {
                response1 = _userService.GetAgencyID(applicationUser);
            }
            catch (Exception ex)
            {
                response1.IsSuccess = false;
                response1.ReturnMessage.Add(ex.ToString());
            }
            return response1;
        }
    }
}
