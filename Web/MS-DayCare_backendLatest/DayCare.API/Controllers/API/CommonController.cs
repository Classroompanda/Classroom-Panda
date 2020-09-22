using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DayCare.Model.Common;
using DayCare.Model.Response;
using DayCare.Service.IService.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DayCare.Service.IService.User;
using DayCare.Model.User;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using DayCare.Service.Service.Login;
using Microsoft.AspNetCore.Authorization;
using DayCare.Service.Common;
using DayCare.Model.Master;
using DayCare.Service.IService.Masters;
using DayCare.Model.Parent;
using DayCare.Service.IService.Parents;
using DayCare.Model.Student;
using DayCare.Service.IService.Agency;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using DayCare.Entity.User;

namespace DayCare.API.Controllers.API
{
    [Route("api/Common")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        #region Initialize Dependency
        private readonly ICommonService _commonService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;
        ResponseViewModal response;
        private readonly CommonMethods commonMethods = null;
        private readonly IMasterService _masterService;
        private readonly IParentsService _parentService;
        private readonly IStudentService _studentService;
        private readonly IUserRepository _userRepository;
        private Microsoft.Extensions.Configuration.IConfiguration configuration;

        public CommonController(ICommonService commonService, IUserService userService, IMasterService masterService, 
            IParentsService parentService, IStudentService studentService, IUserRepository userRepository, Microsoft.Extensions.Configuration.IConfiguration iConfig)
        {
            _commonService = commonService;
            response = new ResponseViewModal();
            _userService = userService;
            commonMethods = new CommonMethods();
            _masterService = masterService;
            _parentService = parentService;
            _studentService = studentService;
            _userRepository = userRepository;
            configuration = iConfig;
        }
        #endregion

        /// <summary>
        /// Upload Images
        /// </summary>
        /// <returns></returns>
     
        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("MultipleImageUpload")]
        public async Task<ResponseViewModal> UploadImage()
        {
            try
            {
                List<string> urls = new List<string>();
                FileUploadResponseViewModel model = new FileUploadResponseViewModel();

                for (int i = 0; i<Request.Form.Files.Count; i++)
                {
                    var file = Request.Form.Files[i];
                    //var path = _commonService.UploadImage(file);
                    var streams = file.OpenReadStream();
                    var name = Guid.NewGuid() + file.FileName;                  
                    var stringPath = await UploadFileAsBlob(streams, name);
                    //model = JsonConvert.DeserializeObject<FileUploadResponseViewModel>();
                    urls.Add(stringPath);
                }

                response.Data = urls;
                response.IsSuccess = true;
                response.StatusCode = 200;


            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
                response.StatusCode = 987;
            }
            return response;
        }
        [AllowAnonymous]
        [Route("ForgotPassword")]
        [HttpPost]
        public JsonModel ForgotPassword(ForgotPasswordViewModel entity)
        {
            try
            {
                if (entity.RequestedEmail != string.Empty)
                {
                    //string newPassword = _commonService.RandomString(8);
                    string newPassword= _commonService.GeneratePassword();
                    string encryptPasword= Crypto.HashPassword(newPassword);
                    bool DoesUserExist = _userService.DoesUserExists(entity.RequestedEmail, encryptPasword);
                    if (DoesUserExist)
                    {
                        Users users = new Users();
                        users = _userRepository.Get(check => check.EmailAddress.ToUpper() == entity.RequestedEmail.ToUpper());
                        //var encodedUserId = commonMethods.Encryption(users.Id);
                        var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your User Name:</p><b> " + entity.RequestedEmail + " </b><br> <p>Please click the link to create your password</p> <b><a href = '" + url + "/" + users.Id + "'> Create Your Password </a> </b> <br/> <p>Thanks.</p></body></html>";
                        bool mailSend = _commonService.SendEmailSync(entity.RequestedEmail, "Your Password has been reset.", message);

                        return new JsonModel()
                        {

                            data = new object(),
                            Message = "Password has been sent to your mail successfully.",
                            StatusCode = 200
                        };
                    }
                    else
                    {
                        return new JsonModel()
                        {

                            data = new object(),
                            Message = "Invalid Email Address.",
                            StatusCode = 989
                        };
                    }
                }
                else
                {
                    return new JsonModel()
                    {
                        data = new object(),
                        Message = "Missing Parameter.",
                        StatusCode = 987
                    };
                }
            }
            catch (Exception ex)
            {
                return new JsonModel()
                {
                    data = new object(),
                    Message = "Something went wrong.",
                    StatusCode = 987
                };
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllPricingPlanDetails")]
        public ResponseViewModal GetAllPricingPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetAllPricingPlanDetails(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        public static async Task<string> UploadFileAsBlob(Stream stream, string filename)
        {
            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_configuration["ConnectionString:StorageConnectionString"]);
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=schoolpandastoragess;AccountKey=CUuKTIpE2yL/pTaTjT4fXIFp+nJA2PNcTqHxMiRzqt3C57dBwj1t50NSsV/4nNBMUZH1b7mK0wEZbGtR9cJ7qA==;EndpointSuffix=core.windows.net");

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve a reference to a container.
            CloudBlobContainer container = blobClient.GetContainerReference("schoolpandacontainer");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(filename);

            await blockBlob.UploadFromStreamAsync(stream);

            stream.Dispose();
            return blockBlob?.Uri.ToString();
        }


        [Route("UpdatedPassword")]
        [HttpPost]
        public JsonModel UpdatedPassword(ForgotPasswordViewModel entity)
        {
            try
            {
                if (entity.RequestedEmail != string.Empty)
                {
                    //string newPassword = _commonService.RandomString(8);
                    string newPassword = entity.UpdatedPassword;
                    string encryptPasword = Crypto.HashPassword(newPassword);
                    bool DoesUserExist = _userService.DoesUserExists(entity.RequestedEmail, encryptPasword);
                    if (DoesUserExist)
                    {
                        string message = "<!DOCTYPE html><html><head><title></title></head><body><p> Your access password has been reset. Please use the given password - " + newPassword + " </p> </body></html>";
                        bool mailSend = _commonService.SendEmailSync(entity.RequestedEmail, "Your Password has been reset.", message);

                        return new JsonModel()
                        {
                            data = new object(),
                            Message = "Password has been updated and sent to your mail successfully.",
                            StatusCode = 200
                        };
                    }
                    else
                    {
                        return new JsonModel()
                        {
                            data = new object(),
                            Message = "Invalid Email Address.",
                            StatusCode = 989
                        };
                    }
                }
                else
                {
                    return new JsonModel()
                    {
                        data = new object(),
                        Message = "Missing Parameter.",
                        StatusCode = 987
                    };
                }
            }
            catch (Exception ex)
            {
                return new JsonModel()
                {
                    data = new object(),
                    Message = "Something went wrong.",
                    StatusCode = 987
                };
            }
        }

        [AllowAnonymous]
        [HttpGet("~/api/test")]
        public string Test()
        {
            return "API working fine!";
        }

        [AllowAnonymous]
        [Route("CreatePassword")]
        [HttpPost]
        public JsonModel CreatePassword(CreatePasswordViewModel entity)
        {
            try
            {
                if (entity.UserID != 0)
                {
                    //decrypt the UserID 
                    //int Userid = commonMethods.Decryption(entity.RequestedId);
                    string newPassword = entity.NewPassword;
                    string encryptPasword = Crypto.HashPassword(newPassword);
                    var EmailAddress = _userService.GetEmailAddress(entity.UserID);//Get EmailAddress with UserId
                    bool DoesUserExist = _userService.DoesUserExists(EmailAddress, encryptPasword);
                    if (DoesUserExist)
                    {
                        string message = "<!DOCTYPE html><html><head><title></title></head><body><p> Your access password has been create. Please use the given password - " + newPassword + " </p> </body></html>";
                        bool mailSend = _commonService.SendEmailSync(EmailAddress, "Your Password has been create.", message);

                        return new JsonModel()
                        {
                            data = new object(),
                            Message = "Password has been created and sent to your mail successfully.",
                            StatusCode = 200
                        };
                    }
                    else
                    {
                        return new JsonModel()
                        {
                            data = new object(),
                            Message = "Invalid Email Address.",
                            StatusCode = 989
                        };
                    }
                }
                else
                {
                    return new JsonModel()
                    {
                        data = new object(),
                        Message = "Missing Parameter.",
                        StatusCode = 987
                    };
                }
            }
            catch (Exception ex)
            {
                return new JsonModel()
                {
                    data = new object(),
                    Message = "Something went wrong.",
                    StatusCode = 987
                };
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllAgencyList")]
        public ResponseViewModal GetAllAgencyList(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetAllAgencyList(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RegisterParentInformation")]
        public ResponseViewModal RegisterParentInformation(ParentInformationViewModel saveParentInformationRequest)
        {
            try
            {
                response = _parentService.SaveParentInformation(saveParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllCities")]
        public ResponseViewModal GetAllCities(MasterBaseRequestViewModel getAllCitiesRequest)
        {
            try
            {
                response = _masterService.GetAllCities(getAllCitiesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllStates")]
        public ResponseViewModal GetAllStates(MasterBaseRequestViewModel getAllStatesRequest)
        {
            try
            {
                response = _masterService.GetAllStates(getAllStatesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllCountry")]
        public ResponseViewModal GetAllCountry(MasterBaseRequestViewModel getAllCountryRequest)
        {
            try
            {
                response = _masterService.GetAllCountry(getAllCountryRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("AgencyRegistration")]
        public ResponseViewModal AgencyRegistration(AgencyViewModel saveAgencyRequest)
        {
            try
            {
                response = _masterService.AgencyRegistration(saveAgencyRequest);
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