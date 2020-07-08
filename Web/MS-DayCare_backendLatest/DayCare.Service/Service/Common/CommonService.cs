using AutoMapper;
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Entity.Parent;
using DayCare.Entity.Teachers;
using DayCare.Entity.User;
using DayCare.Model.Common;
using DayCare.Model.Response;
using DayCare.Model.User;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Common;
using DayCare.Service.Service.Parents;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;

namespace DayCare.Service.Service.Common
{
    public class CommonService :ICommonService
    {

        private DataContext _dataContext;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly EmailConfig ec;
        private readonly IUserRepository _userRepository;
        private readonly IParentRepository _parentRepository;
        private readonly ITeacherInfoRepository _teacherInfoRepository;

        string PasswordLength = "8";
        string CodeLength = "6";
        string NewPassword = "";
        
        public CommonService (  
            DataContext dataContext, 
            IHttpContextAccessor httpContextAccessor, 
            IHostingEnvironment hostingEnvironment,
            IOptions<EmailConfig> emailConfig, IUserRepository userRepository, IParentRepository parentRepository
            , ITeacherInfoRepository teacherInfoRepository)
        
        {
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            this.ec = emailConfig.Value;
            _userRepository = userRepository;
            _parentRepository = parentRepository;
            _teacherInfoRepository = teacherInfoRepository;

        }

        public FileUploadResponseViewModel UploadImage(IFormFile file)
        {
           // ResponseViewModal responseModel = new ResponseViewModal();
            FileUploadResponseViewModel fileUpload = new FileUploadResponseViewModel();
            try
            {


                var request = _httpContextAccessor.HttpContext.Request;
                var uriLeftPart = _httpContextAccessor.HttpContext.Request.Host.Value;
                if (_httpContextAccessor.HttpContext.Request.IsHttps)
                {
                    uriLeftPart = "https://" + uriLeftPart;
                }
                else
                {
                    uriLeftPart = "http://" + uriLeftPart;
                }

                var folderName = "ReviewTemplateImage";
                var webRootPath = _hostingEnvironment.WebRootPath;
                if (string.IsNullOrWhiteSpace(webRootPath))
                {
                    webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {


                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    int lastIndexOFex = fileName.LastIndexOf(".");
                    string fileExtension = fileName.Substring(lastIndexOFex);
                    var imageGuid = Guid.NewGuid();
                    var imageName = imageGuid.ToString();
                    string renamedFileName = imageName + fileExtension;
                    string fileServerPath = uriLeftPart + "/" + "ReviewTemplateImage/" + renamedFileName;
                    string fullPath = Path.Combine(newPath, renamedFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    fileUpload = new FileUploadResponseViewModel()
                    {
                        FilePath = fileServerPath,
                        OriginalFileName = fileName,
                        RefferalName = imageGuid,
                       
                    };
                    //responseModel.IsSuccess = true;
                    //responseModel.StatusCode = (int)HttpStatusCodes.OK;
                    //responseModel.Message = "Successful";
                    //responseModel.Data = fileUpload;
                   
                }
                return fileUpload;
            }
            catch (Exception ex)
            {
               
                return fileUpload;

            }
        }       

        
        public bool SendEmailSync(String email, String subject, String message)
        {
            try
            {
                SendGridClient client = new SendGridClient(StripeKeySettings.SendGridAPIKey);
                EmailAddress to = new EmailAddress(email);

                EmailAddress from = new EmailAddress("no-reply@classroompanda.com", "Classroom Panda");
                SendGridMessage messages = MailHelper.CreateSingleEmail(from, to, subject, null, message);
                client.SendEmailAsync(messages);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }           
           
        }

        public bool SendBroadCastEmailSync(String fromEmail, String toEmail, String subject, String message)
        {
            try
            {
                SendGridClient client = new SendGridClient(StripeKeySettings.SendGridAPIKey);
                EmailAddress to = new EmailAddress(toEmail);

                EmailAddress from = new EmailAddress(fromEmail, "Classroom Panda");
                SendGridMessage messages = MailHelper.CreateSingleEmail(from, to, subject, null, message);
                client.SendEmailAsync(messages);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }

        public bool SendEmailAttachmentSync(String email, String subject, String message, String filePath)
        {
           try
            {
                SendGridClient client = new SendGridClient(StripeKeySettings.SendGridAPIKey);
                EmailAddress to = new EmailAddress(email);


                EmailAddress from = new EmailAddress("no-reply@classroompanda.com", "Classroom Panda");

                SendGridMessage messages = MailHelper.CreateSingleEmail(from, to, subject, null, message);
                var bytes = File.ReadAllBytes(filePath);
                var file = Convert.ToBase64String(bytes);
                messages.AddAttachment("DailyReport.pdf", file);
               
                client.SendEmailAsync(messages);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }


        public string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public string GeneratePassword()
        {

            string allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
            allowedChars += "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,";


            char[] sep = {
            ','
        };
            string[] arr = allowedChars.Split(sep);


            string IDString = "";
            string temp = "";

            Random rand = new Random();

            for (int i = 0; i < Convert.ToInt32(PasswordLength); i++)
            {
                temp = arr[rand.Next(0, arr.Length)];
                IDString += temp;
                NewPassword = IDString;

            }
            return NewPassword;
        }

        public string GenerateAgencyCode()
        {

            string allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";

            char[] sep = {
            ','
        };
            string[] arr = allowedChars.Split(sep);


            string IDString = "";
            string temp = "";

            Random rand = new Random();

            for (int i = 0; i < Convert.ToInt32(CodeLength); i++)
            {
                temp = arr[rand.Next(0, arr.Length)];
                IDString += temp;
                NewPassword = IDString;

            }
            return NewPassword;
        }

        private Random _random = new Random();

        public string GenerateRandomNo()
        {
            return _random.Next(0, 9999).ToString("D4");
        }

       





    }
}
