using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Agency;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Model.PostActivity;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using DayCare.Entity.PostActivity;
using AutoMapper;
using DayCare.Model.Common;
using static DayCare.Service.Common.CommonEnum;
using MoreLinq;

namespace DayCare.Service.Service.Agency
{
    public class PostActivitiesService : IPostActivitiesService
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public DataContext _dataContext;
        public IClassesRepository _classesRepository;
        public IStudentAgeCategoriesRepository _studentAgeCategoriesRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IClassStatusRepository _classStatusRepository;
        public IStudentRepository _studentRepository;
        public IPostActivitiesRepository _postActivitiesRepository;
        public IPostActivityVideosRepository _postActivityVideosRepository;
        public IPostActivityImagesRepository _postActivityImagesRepository;
        public IUnApprovedImagesRepository _unApprovedImagesRepository;
        public IImageApproveTypeRepository _imageApproveTypeRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public readonly ITeacherInfoRepository _teacherRepository;
        public readonly IPostImageslikeDetailsRepository _postimageslikedetailsrepository;
        public readonly IPostVideolikeDetailsRepository _postvideolikedetailsrepository;
        private readonly IParentStudentMappingRepository _parentStudentMapping;
        public PostActivitiesService(DataContext dataContext,
           IClassesRepository classesRepository,
           IStudentAgeCategoriesRepository studentAgeCategoriesRepository,
           IClassEnrollmentRepository classEnrollmentRepository,
           IClassStatusRepository classStatusRepository,
           IFeePaymentTypeRepository feePaymentTypeRepository,
           IStudentRepository studentRepository,
           IPostActivitiesRepository postActivitiesRepository,
           IPostActivityVideosRepository postActivityVideosRepository,
           IPostActivityImagesRepository postActivityImagesRepository,
           IHostingEnvironment hostingEnvironment,
           IHttpContextAccessor httpContextAccessor,
           ITeacherInfoRepository teacherRepository,
           IPostImageslikeDetailsRepository postimageslikedetailsrepository,
           IPostVideolikeDetailsRepository postvideolikedetailsrepository,
           IParentStudentMappingRepository parentStudentMapping,
           IUnApprovedImagesRepository unApprovedImagesRepository,
           IImageApproveTypeRepository imageApproveTypeRepository
           )
        {
            _dataContext = dataContext;
            _classesRepository = classesRepository;
            _studentAgeCategoriesRepository = studentAgeCategoriesRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _classStatusRepository = classStatusRepository;
            _studentRepository = studentRepository;
            _postActivitiesRepository = postActivitiesRepository;
            _postActivityVideosRepository = postActivityVideosRepository;
            _postActivityImagesRepository = postActivityImagesRepository;
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _teacherRepository = teacherRepository;
            _postimageslikedetailsrepository = postimageslikedetailsrepository;
            _postvideolikedetailsrepository = postvideolikedetailsrepository;
            _parentStudentMapping = parentStudentMapping;
            _unApprovedImagesRepository = unApprovedImagesRepository;
            _imageApproveTypeRepository = imageApproveTypeRepository;
        }

        public ResponseViewModal GetAllPostActivities(PostActivitiesRequestViewModel getAllPostActivitiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllPostActivitiesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassesID == getAllPostActivitiesRequest.ClassesID && classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.Id == getAllPostActivitiesRequest.ClassesID && classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<PostActivities> selectedPostActivities = _postActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getAllPostActivitiesRequest.AgencyID
                    && filter.PostedDate.Date == getAllPostActivitiesRequest.PostedDate.Date && !filter.IsDeleted
                    && (getAllPostActivitiesRequest.StudentID == 0 || filter.StudentID == getAllPostActivitiesRequest.StudentID)
                    && (getAllPostActivitiesRequest.ClassesID == 0 || filter.ClassesID == getAllPostActivitiesRequest.ClassesID));

                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    List<PostActivitiesViewModel> postedActivities = new List<PostActivitiesViewModel>();
                    if (selectedPostActivities != null)
                    {
                        postedActivities = (from postActivitiesObj in selectedPostActivities
                                            join studentsObj in students on postActivitiesObj.StudentID equals studentsObj.Id
                                            join selectedTeacherObj in selectedTeacher on postActivitiesObj.TeacherID equals selectedTeacherObj.Id
                                            join classesObj in classes on postActivitiesObj.ClassesID equals classesObj.Id
                                            where !studentsObj.IsDeleted &&
                                            !selectedTeacherObj.IsDeleted && selectedTeacherObj.Id == getAllPostActivitiesRequest.UserID
                                            select new PostActivitiesViewModel
                                            {
                                                StudentName = studentsObj.StudentName,
                                                ImagePath = studentsObj.ImagePath,
                                                Id = postActivitiesObj.Id,
                                                TeacherID = postActivitiesObj.TeacherID,
                                                Sender = selectedTeacherObj.TeacherName,
                                                PostTitle = postActivitiesObj.PostTitle,
                                                PostDescription = postActivitiesObj.PostDescription,
                                                AgencyID = postActivitiesObj.AgencyID,
                                                StudentID = postActivitiesObj.StudentID,
                                                ClassesID = postActivitiesObj.ClassesID,
                                                ClassName = classesObj.ClassName,
                                                PostedDate = postActivitiesObj.PostedDate,
                                                IsPublic = postActivitiesObj.IsPublic,
                                                CreatedBy = postActivitiesObj.CreatedBy,
                                                CreatedDate = postActivitiesObj.CreatedDate,
                                                UpdatedBy = postActivitiesObj.UpdatedBy,
                                                UpdatedDate = postActivitiesObj.UpdatedDate,
                                                DeletedBy = postActivitiesObj.DeletedBy,
                                                DeletedDate = postActivitiesObj.DeletedDate
                                            }).OrderBy(c => c.Id).ToList();

                        foreach (var postActivity in postedActivities)
                        {
                            if (postActivity.Id > 0 && postActivity.AgencyID > 0)
                            {
                                postActivity.selectedStudents = new List<long>();
                                postActivity.selectedStudents.Add(postActivity.StudentID);
                                postActivity.PostActivityVideos = GetPostedVedios(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                postActivity.PostActivityImages = GetPostedImages(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                postActivity.TotalLikes = postActivity.PostActivityVideos != null ? postActivity.PostActivityVideos.Count : postActivity.PostActivityImages.Count;
                                postActivity.CommentCount = 13;
                            }
                        }
                        res.Data = postedActivities;
                        if (getAllPostActivitiesRequest.limit != 0)
                        {
                            res.Data = postedActivities.Skip((getAllPostActivitiesRequest.page - 1) * getAllPostActivitiesRequest.limit).Take(getAllPostActivitiesRequest.limit).ToList();
                        }
                        res.TotalRows = postedActivities.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Post Activities has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "No Data Found";
                        res.IsSuccess = false;
                    }
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
            return res;
        }

        public ResponseViewModal GetAllPostActivitiesForAgency(PostActivitiesRequestViewModel getAllPostActivitiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllPostActivitiesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassesID == getAllPostActivitiesRequest.ClassesID && classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.Id == getAllPostActivitiesRequest.ClassesID && classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<PostActivities> selectedPostActivities = _postActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getAllPostActivitiesRequest.AgencyID
                    && filter.PostedDate.Date == getAllPostActivitiesRequest.PostedDate.Date && !filter.IsDeleted
                    && (getAllPostActivitiesRequest.StudentID == 0 || filter.StudentID == getAllPostActivitiesRequest.StudentID)
                    && (getAllPostActivitiesRequest.ClassesID == 0 || filter.ClassesID == getAllPostActivitiesRequest.ClassesID));

                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    List<PostActivitiesViewModel> postedActivities = new List<PostActivitiesViewModel>();
                    if (selectedPostActivities != null)
                    {
                        postedActivities = (from postActivitiesObj in selectedPostActivities
                                            join studentsObj in students on postActivitiesObj.StudentID equals studentsObj.Id
                                            join selectedTeacherObj in selectedTeacher on postActivitiesObj.TeacherID equals selectedTeacherObj.Id
                                            join classesObj in classes on postActivitiesObj.ClassesID equals classesObj.Id
                                            where !studentsObj.IsDeleted &&
                                            !selectedTeacherObj.IsDeleted
                                            select new PostActivitiesViewModel
                                            {
                                                StudentName = studentsObj.StudentName,
                                                ImagePath = studentsObj.ImagePath,
                                                Id = postActivitiesObj.Id,
                                                TeacherID = postActivitiesObj.TeacherID,
                                                Sender = selectedTeacherObj.TeacherName,
                                                PostTitle = postActivitiesObj.PostTitle,
                                                PostDescription = postActivitiesObj.PostDescription,
                                                AgencyID = postActivitiesObj.AgencyID,
                                                StudentID = postActivitiesObj.StudentID,
                                                ClassesID = postActivitiesObj.ClassesID,
                                                ClassName = classesObj.ClassName,
                                                PostedDate = postActivitiesObj.PostedDate,
                                                IsPublic = postActivitiesObj.IsPublic,
                                                CreatedBy = postActivitiesObj.CreatedBy,
                                                CreatedDate = postActivitiesObj.CreatedDate,
                                                UpdatedBy = postActivitiesObj.UpdatedBy,
                                                UpdatedDate = postActivitiesObj.UpdatedDate,
                                                DeletedBy = postActivitiesObj.DeletedBy,
                                                DeletedDate = postActivitiesObj.DeletedDate
                                            }).OrderBy(c => c.Id).ToList();
                        foreach (var postActivity in postedActivities)
                        {
                            if (postActivity.Id > 0 && postActivity.AgencyID > 0)
                            {
                                postActivity.selectedStudents = new List<long>();
                                postActivity.selectedStudents.Add(postActivity.StudentID);
                                postActivity.PostActivityVideos = GetPostedVedios(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                postActivity.PostActivityImages = GetPostedImages(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                postActivity.TotalLikes = postActivity.PostActivityVideos != null ? postActivity.PostActivityVideos.Count : postActivity.PostActivityImages.Count;
                                postActivity.CommentCount = 13;
                            }
                        }
                        res.Data = postedActivities;
                        if (getAllPostActivitiesRequest.limit != 0)
                        {
                            res.Data = postedActivities.Skip((getAllPostActivitiesRequest.page) * getAllPostActivitiesRequest.limit).Take(getAllPostActivitiesRequest.limit).ToList();
                        }
                        res.TotalRows = postedActivities.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Post Activities has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "No Data Found";
                        res.IsSuccess = false;
                    }
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
            return res;
        }

        public ResponseViewModal GetPostActivityInfo(PostActivitiesRequestViewModel getPostActivityInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getPostActivityInfoRequest.AgencyID > 0 && getPostActivityInfoRequest.Id > 0 && getPostActivityInfoRequest.ClassesID > 0)
                {
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassesID == getPostActivityInfoRequest.ClassesID && classCheck.AgencyID == getPostActivityInfoRequest.AgencyID);
                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getPostActivityInfoRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.Id == getPostActivityInfoRequest.ClassesID && classCheck.AgencyID == getPostActivityInfoRequest.AgencyID);
                    IQueryable<PostActivities> selectedPostActivities = _postActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getPostActivityInfoRequest.AgencyID
                    && filter.Id == getPostActivityInfoRequest.Id);
                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(check => check.AgencyID == getPostActivityInfoRequest.AgencyID);
                    PostActivitiesViewModel postedActivity = new PostActivitiesViewModel();

                    postedActivity = (from classEnrollmentObj in classEnrollment

                                      join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id

                                      join classObj in classes on classEnrollmentObj.ClassesID equals classObj.Id

                                      join postActivitiesprimeobj in selectedPostActivities
                                      on studentObj.Id equals postActivitiesprimeobj.StudentID
                                      into postActivitiesobj
                                      from postActivitiesprimeobj in postActivitiesobj.DefaultIfEmpty()

                                      join teacherObj in selectedTeacher on postActivitiesprimeobj.TeacherID equals teacherObj.Id
                                      where !classEnrollmentObj.IsDeleted &&
                                      !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID
                                      select new PostActivitiesViewModel
                                      {
                                          StudentName = studentObj.StudentName,
                                          ImagePath = studentObj.ImagePath,
                                          Id = postActivitiesprimeobj != null ? postActivitiesprimeobj.Id : 0,
                                          TeacherID = postActivitiesprimeobj != null ? postActivitiesprimeobj.TeacherID : 0,
                                          Sender = postActivitiesprimeobj != null ? teacherObj.TeacherName : "",
                                          PostTitle = postActivitiesprimeobj.PostTitle,
                                          PostDescription = postActivitiesprimeobj.PostDescription,
                                          AgencyID = studentObj.AgencyID,
                                          StudentID = studentObj.Id,
                                          ClassesID = classObj.Id,
                                          PostedDate = postActivitiesprimeobj != null ? postActivitiesprimeobj.PostedDate : DateTime.MinValue,
                                          IsPublic = postActivitiesprimeobj != null ? postActivitiesprimeobj.IsPublic : false
                                      }).FirstOrDefault();

                    if (postedActivity != null && postedActivity.Id > 0 && postedActivity.AgencyID > 0)
                    {
                        postedActivity.selectedStudents = new List<long>();
                        postedActivity.selectedStudents.Add(postedActivity.StudentID);
                        postedActivity.PostActivityVideos = GetPostedVedios(postedActivity.Id, postedActivity.AgencyID, getPostActivityInfoRequest.UserID, getPostActivityInfoRequest.CreatedBy);
                        postedActivity.PostActivityImages = GetPostedImages(postedActivity.Id, postedActivity.AgencyID, getPostActivityInfoRequest.UserID, getPostActivityInfoRequest.CreatedBy);

                        if (postedActivity.PostActivityVideos.Count() > 0)
                        {
                            postedActivity.TotalLikes = postedActivity.PostActivityVideos[0].LikeCount;
                        }
                        else
                        {
                            postedActivity.TotalLikes = postedActivity.PostActivityImages[0].LikeCount;
                        }

                        postedActivity.CommentCount = 13;
                        res.Data = postedActivity;
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Post Activity Information has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "No Data found.";
                        res.IsSuccess = false;
                    }
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
            return res;
        }

        private List<PostActivityVideosViewModel> GetPostedVedios(long postActivitiesID, long agencyID, long userID, long createdBy = 0)
        {
            bool alreadyliked = false;
            List<PostActivityVideosViewModel> postActivityVideos = new List<PostActivityVideosViewModel>();
            try
            {
                if (agencyID > 0 && postActivitiesID != 0)
                {
                    IQueryable<PostActivityVideos> selectedPostActivityVideos = _postActivityVideosRepository.GetAll().Where(check => check.AgencyID == agencyID
                    && check.PostActivitiesID == postActivitiesID);

                    IQueryable<PostVideolikeDetails> selectedPostActivityVideoLikeCount = _postvideolikedetailsrepository.GetAll().Where(check => check.AgencyID == agencyID && check.PostActivitiesID == postActivitiesID);

                    foreach (var like_count in selectedPostActivityVideoLikeCount)
                    {
                        //if (like_count.LikeCount > 0)
                        if (selectedPostActivityVideoLikeCount.Where(x => x.CreatedBy == createdBy).Count() > 0)
                        {
                            alreadyliked = true;
                        }
                        else
                        {
                            alreadyliked = false;
                        }
                    }
                    if (selectedPostActivityVideos.Count() > 0)
                    {
                        postActivityVideos = (from postActivityVideosObj in selectedPostActivityVideos
                                              where (!postActivityVideosObj.IsDeleted)
                                              select new PostActivityVideosViewModel
                                              {
                                                  Id = postActivityVideosObj.Id,
                                                  PostActivitiesID = postActivitiesID,
                                                  AgencyID = postActivityVideosObj.AgencyID,
                                                  StudentID = postActivityVideosObj.StudentID,
                                                  ClassesID = postActivityVideosObj.ClassesID,
                                                  VedioServerPath = postActivityVideosObj.VedioServerPath,
                                                  LoveCount = postActivityVideosObj.LoveCount,
                                                  LikeCount = selectedPostActivityVideoLikeCount.Count(),
                                                  ThumbsUpCount = postActivityVideosObj.ThumbsUpCount,
                                                  ThumbsDownCount = postActivityVideosObj.ThumbsDownCount,
                                                  CreatedBy = postActivityVideosObj.CreatedBy ?? 0,
                                                  CreatedDate = postActivityVideosObj.CreatedDate ?? DateTime.MinValue,
                                                  UpdatedBy = postActivityVideosObj.UpdatedBy ?? 0,
                                                  UpdatedDate = postActivityVideosObj.UpdatedDate ?? DateTime.MinValue,
                                                  DeletedBy = postActivityVideosObj.DeletedBy ?? 0,
                                                  DeletedDate = postActivityVideosObj.DeletedDate ?? DateTime.MinValue,
                                                  alreadyliked = alreadyliked,
                                                  Comment = postActivityVideosObj.Comment
                                              }).OrderBy(c => c.Id).ToList();
                        foreach (var i in postActivityVideos)
                        {
                            i.LikeCount = selectedPostActivityVideoLikeCount
                                          .Where(x => x.PostActivitiesID == i.PostActivitiesID
                                          && x.AgencyID == i.AgencyID
                                          && x.StudentID == i.StudentID
                                          && !x.IsDeleted).Count();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                postActivityVideos = new List<PostActivityVideosViewModel>();
            }
            return postActivityVideos;
        }

        private List<PostActivityImagesViewModel> GetPostedImages(long postActivitiesID, long agencyID, long userID, long createdBy = 0)
        {
            bool alreadyliked = false;
            List<PostActivityImagesViewModel> postActivityVideos = new List<PostActivityImagesViewModel>();
            try
            {
                if (agencyID > 0 && postActivitiesID != 0)
                {
                    IQueryable<PostActivityImages> selectedPostActivityImages = _postActivityImagesRepository.GetAll().Where(check => check.AgencyID == agencyID
                    && check.PostActivitiesID == postActivitiesID);

                    IQueryable<PostImageslikeDetails> selectedPostActivityImagesLikeCount = _postimageslikedetailsrepository.GetAll().Where(check => check.AgencyID == agencyID && check.PostActivitiesID == postActivitiesID);

                    foreach (var like_count in selectedPostActivityImagesLikeCount)
                    {
                        //if(like_count.LikeCount > 0)
                        if (selectedPostActivityImagesLikeCount.Where(x => x.CreatedBy == createdBy).Count() > 0)
                        {
                            alreadyliked = true;
                        }
                        else
                        {
                            alreadyliked = false;
                        }
                    }

                    if (selectedPostActivityImages.Count() > 0)
                    {
                        postActivityVideos = (from postActivityImagesObj in selectedPostActivityImages
                                              where (!postActivityImagesObj.IsDeleted)
                                              select new PostActivityImagesViewModel
                                              {
                                                  Id = postActivityImagesObj.Id,
                                                  PostActivitiesID = postActivitiesID,
                                                  AgencyID = postActivityImagesObj.AgencyID,
                                                  StudentID = postActivityImagesObj.StudentID,
                                                  ClassesID = postActivityImagesObj.ClassesID,
                                                  ImageServerPath = postActivityImagesObj.ImageServerPath,
                                                  LoveCount = postActivityImagesObj.LoveCount,
                                                  LikeCount = selectedPostActivityImagesLikeCount.Count(),
                                                  ThumbsUpCount = postActivityImagesObj.ThumbsUpCount,
                                                  ThumbsDownCount = postActivityImagesObj.ThumbsDownCount,
                                                  CreatedBy = postActivityImagesObj.CreatedBy ?? 0,
                                                  CreatedDate = postActivityImagesObj.CreatedDate ?? DateTime.MinValue,
                                                  UpdatedBy = postActivityImagesObj.UpdatedBy ?? 0,
                                                  UpdatedDate = postActivityImagesObj.UpdatedDate ?? DateTime.MinValue,
                                                  DeletedBy = postActivityImagesObj.DeletedBy ?? 0,
                                                  DeletedDate = postActivityImagesObj.DeletedDate ?? DateTime.MinValue,
                                                  alreadyliked = alreadyliked,
                                                  IsApprove = postActivityImagesObj.IsApprove,
                                                  Comment = postActivityImagesObj.Comment
                                              }).OrderBy(c => c.Id).ToList();

                        foreach (var i in postActivityVideos)
                        {
                            i.LikeCount = selectedPostActivityImagesLikeCount
                                          .Where(x => x.PostActivitiesID == i.PostActivitiesID
                                          && x.AgencyID == i.AgencyID
                                          && x.StudentID == i.StudentID
                                          && !x.IsDeleted).Count();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                postActivityVideos = new List<PostActivityImagesViewModel>();
            }
            return postActivityVideos;
        }

        public ResponseViewModal UploadImage(IFormFile file)
        {
            ResponseViewModal responseModel = new ResponseViewModal();
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
                        RefferalName = imageGuid
                    };
                    responseModel.IsSuccess = true;
                    responseModel.StatusCode = (int)HttpStatusCodes.OK;
                    responseModel.Message = "Successfully";
                    responseModel.Data = fileUpload;
                    return responseModel;
                }
                else
                {
                    responseModel.IsSuccess = false;
                    responseModel.StatusCode = (int)HttpStatusCodes.BadRequest;
                    return responseModel;
                }
            }
            catch (Exception ex)
            {
                responseModel.IsSuccess = false;
                responseModel.StatusCode = (int)HttpStatusCodes.InternalServerError;
                return responseModel;
            }
        }
        /// <summary>
        /// Check And Create Directory
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        internal static string CheckAndCreateDirectory(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            return path;
        }

        public ResponseViewModal SavePostActivities(PostActivitiesRequestViewModel PostActivityRequestViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            bool DoesContainFile = (PostActivityRequestViewModel.PostActivityImages != null && PostActivityRequestViewModel.PostActivityImages.Count > 0) ||
                (PostActivityRequestViewModel.PostActivityVideos != null && PostActivityRequestViewModel.PostActivityVideos.Count > 0) ? true : false;
            if (DoesContainFile)
            {
                PostActivityRequestViewModel.PostedDate = System.DateTime.UtcNow;
                for (int i = 0; i < PostActivityRequestViewModel.selectedStudents.Count; i++)
                {
                    PostActivityRequestViewModel.StudentID = PostActivityRequestViewModel.selectedStudents[i];
                    res = SaveStudentPostActivity(PostActivityRequestViewModel);
                }
            }
            return res;
        }

        public ResponseViewModal SaveStudentPostActivity(PostActivitiesRequestViewModel PostActivityRequestViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (PostActivityRequestViewModel.AgencyID > 0 && PostActivityRequestViewModel.StudentID > 0)
                    {
                        long id = 0;
                        PostActivities studentPostActivitiesObj = null;
                        if (PostActivityRequestViewModel.Id == 0)
                        {
                            PostActivityRequestViewModel.CreatedDate = DateTime.UtcNow;
                            studentPostActivitiesObj = new PostActivities();
                            Mapper.Map(PostActivityRequestViewModel, studentPostActivitiesObj);
                            _postActivitiesRepository.Create(studentPostActivitiesObj);
                            _postActivitiesRepository.SaveChanges();
                            id = studentPostActivitiesObj.Id;
                        }
                        else
                        {
                            studentPostActivitiesObj = _postActivitiesRepository.Get(x => x.Id == PostActivityRequestViewModel.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentPostActivitiesObj, null))
                            {
                                studentPostActivitiesObj.UpdatedDate = DateTime.UtcNow;
                                studentPostActivitiesObj.AgencyID = PostActivityRequestViewModel.AgencyID;
                                studentPostActivitiesObj.StudentID = PostActivityRequestViewModel.StudentID;
                                studentPostActivitiesObj.PostedDate = PostActivityRequestViewModel.PostedDate;
                                studentPostActivitiesObj.PostTitle = PostActivityRequestViewModel.PostTitle;
                                studentPostActivitiesObj.PostDescription = PostActivityRequestViewModel.PostDescription;
                                studentPostActivitiesObj.IsDeleted = PostActivityRequestViewModel.IsDeleted;
                                studentPostActivitiesObj.DeletedBy = PostActivityRequestViewModel.DeletedBy != null ? PostActivityRequestViewModel.DeletedBy : 0;
                                studentPostActivitiesObj.DeletedDate = PostActivityRequestViewModel.DeletedDate != null ? PostActivityRequestViewModel.DeletedDate : DateTime.MinValue;
                                _postActivitiesRepository.SaveChanges();
                                id = studentPostActivitiesObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (PostActivityRequestViewModel.StudentID > 0)
                        {
                            if (PostActivityRequestViewModel.PostActivityImages != null && PostActivityRequestViewModel.PostActivityImages.Count > 0)
                            {
                                foreach (PostActivitiesImagesRequestViewModel postImage in PostActivityRequestViewModel.PostActivityImages)
                                {
                                    postImage.PostActivitiesID = id;
                                    postImage.AgencyID = PostActivityRequestViewModel.AgencyID;
                                    postImage.ClassesID = PostActivityRequestViewModel.ClassesID;
                                    postImage.StudentID = PostActivityRequestViewModel.StudentID;
                                    postImage.PostTitle = PostActivityRequestViewModel.PostTitle;
                                    postImage.TeacherID = PostActivityRequestViewModel.TeacherID;
                                    SavePostActivityImages(postImage);
                                }
                            }
                            if (PostActivityRequestViewModel.PostActivityVideos != null && PostActivityRequestViewModel.PostActivityVideos.Count > 0)
                            {
                                foreach (PostActivitiesVideoRequestViewModel postVedio in PostActivityRequestViewModel.PostActivityVideos)
                                {
                                    postVedio.PostActivitiesID = id;
                                    postVedio.AgencyID = PostActivityRequestViewModel.AgencyID;
                                    postVedio.ClassesID = PostActivityRequestViewModel.ClassesID;
                                    postVedio.StudentID = PostActivityRequestViewModel.StudentID;
                                    SavePostActivityVideos(postVedio);
                                }
                            }
                        }
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Post Activity registered for the student";
                        res.SaveId = id;
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
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        private ResponseViewModal SavePostActivityImages(PostActivitiesImagesRequestViewModel savePostActivityImagesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string ImagePath = savePostActivityImagesRequest.ImageServerPath;
            UnApproveImagesViewModel unApproveImages = new UnApproveImagesViewModel();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (savePostActivityImagesRequest.AgencyID > 0 && savePostActivityImagesRequest.StudentID > 0)
                    {
                        long id = 0;
                        PostActivityImages studentActivityImagesObj = null;
                        if (savePostActivityImagesRequest.Id == 0)
                        {
                            ImageApproveType approveType = new ImageApproveType();
                            approveType = _imageApproveTypeRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == savePostActivityImagesRequest.AgencyID).FirstOrDefault();
                            if (approveType == null)
                            {
                                savePostActivityImagesRequest.IsApprove = true;
                            }
                            else
                            {
                                if (approveType.ApproveType == "Manual")
                                {
                                    savePostActivityImagesRequest.ImageServerPath = null;
                                    savePostActivityImagesRequest.IsApprove = false;
                                }
                                else
                                {
                                    savePostActivityImagesRequest.IsApprove = true;
                                }
                            }
                            
                            if (savePostActivityImagesRequest.Id == 0)
                            {
                                savePostActivityImagesRequest.CreatedDate = DateTime.UtcNow;
                                studentActivityImagesObj = new PostActivityImages();
                                Mapper.Map(savePostActivityImagesRequest, studentActivityImagesObj);
                                _postActivityImagesRepository.Create(studentActivityImagesObj);
                                _postActivityImagesRepository.SaveChanges();
                                id = studentActivityImagesObj.Id;
                            }
                            savePostActivityImagesRequest.ImageServerPath = ImagePath;
                            if (approveType != null)
                            {
                                if (approveType.ApproveType == "Manual")
                                {
                                    UnApprovedImages unApprovedImages = new UnApprovedImages();
                                    unApproveImages.IsActive = true;
                                    unApproveImages.IsDeleted = false;
                                    unApproveImages.CreatedBy = savePostActivityImagesRequest.TeacherID;
                                    unApproveImages.CreatedDate = DateTime.Now;
                                    unApproveImages.PostActivityImagesID = id;
                                    unApproveImages.StudentID = savePostActivityImagesRequest.StudentID;
                                    unApproveImages.AgencyID = savePostActivityImagesRequest.AgencyID;
                                    unApproveImages.TeacherID = savePostActivityImagesRequest.TeacherID;
                                    unApproveImages.ImageServerPath = ImagePath;
                                    unApproveImages.PostTitle = savePostActivityImagesRequest.PostTitle;
                                    Mapper.Map(unApproveImages, unApprovedImages);
                                    _unApprovedImagesRepository.Create(unApprovedImages);
                                    _unApprovedImagesRepository.SaveChanges();
                                    id = unApprovedImages.Id;
                                }
                            }
                        }

                        else
                        {
                            studentActivityImagesObj = _postActivityImagesRepository.Get(x => x.Id == savePostActivityImagesRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityImagesObj, null))
                            {
                                studentActivityImagesObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityImagesObj.DeletedDate = savePostActivityImagesRequest.DeletedDate;
                                studentActivityImagesObj.DeletedBy = savePostActivityImagesRequest.DeletedBy;
                                studentActivityImagesObj.IsDeleted = savePostActivityImagesRequest.DeletedBy > 0 ? savePostActivityImagesRequest.IsDeleted : false;
                                studentActivityImagesObj.AgencyID = savePostActivityImagesRequest.AgencyID;
                                studentActivityImagesObj.StudentID = savePostActivityImagesRequest.StudentID;
                                studentActivityImagesObj.ImageServerPath = savePostActivityImagesRequest.ImageServerPath;
                                studentActivityImagesObj.LikeCount = savePostActivityImagesRequest.LikeCount;
                                studentActivityImagesObj.LoveCount = savePostActivityImagesRequest.LoveCount;
                                studentActivityImagesObj.ThumbsUpCount = savePostActivityImagesRequest.ThumbsUpCount;
                                studentActivityImagesObj.ThumbsDownCount = savePostActivityImagesRequest.ThumbsDownCount;
                                studentActivityImagesObj.IsDeleted = savePostActivityImagesRequest.IsDeleted;
                                studentActivityImagesObj.DeletedBy = savePostActivityImagesRequest.DeletedBy;
                                studentActivityImagesObj.DeletedDate = savePostActivityImagesRequest.DeletedDate != null ? savePostActivityImagesRequest.DeletedDate : DateTime.MinValue;
                                _postActivityImagesRepository.SaveChanges();
                                id = studentActivityImagesObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Saved Image for the student";
                        res.SaveId = id;
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
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        private ResponseViewModal SavePostActivityVideos(PostActivitiesVideoRequestViewModel savePostActivityVideoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (savePostActivityVideoRequest.AgencyID > 0 && savePostActivityVideoRequest.StudentID > 0)
                    {
                        long id = 0;
                        PostActivityVideos studentActivityVideosObj = null;
                        if (savePostActivityVideoRequest.Id == 0)
                        {
                            savePostActivityVideoRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityVideosObj = new PostActivityVideos();
                            Mapper.Map(savePostActivityVideoRequest, studentActivityVideosObj);
                            _postActivityVideosRepository.Create(studentActivityVideosObj);
                            _postActivityVideosRepository.SaveChanges();
                            id = studentActivityVideosObj.Id;
                        }
                        else
                        {
                            studentActivityVideosObj = _postActivityVideosRepository.Get(x => x.Id == savePostActivityVideoRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityVideosObj, null))
                            {
                                studentActivityVideosObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityVideosObj.DeletedDate = savePostActivityVideoRequest.DeletedDate;
                                studentActivityVideosObj.DeletedBy = savePostActivityVideoRequest.DeletedBy;
                                studentActivityVideosObj.IsDeleted = savePostActivityVideoRequest.DeletedBy > 0 ? savePostActivityVideoRequest.IsDeleted : false;
                                studentActivityVideosObj.AgencyID = savePostActivityVideoRequest.AgencyID;
                                studentActivityVideosObj.StudentID = savePostActivityVideoRequest.StudentID;
                                studentActivityVideosObj.VedioServerPath = savePostActivityVideoRequest.VedioServerPath;
                                studentActivityVideosObj.LikeCount = savePostActivityVideoRequest.LikeCount;
                                studentActivityVideosObj.LoveCount = savePostActivityVideoRequest.LoveCount;
                                studentActivityVideosObj.ThumbsUpCount = savePostActivityVideoRequest.ThumbsUpCount;
                                studentActivityVideosObj.ThumbsDownCount = savePostActivityVideoRequest.ThumbsDownCount;
                                studentActivityVideosObj.IsDeleted = savePostActivityVideoRequest.IsDeleted;
                                studentActivityVideosObj.DeletedBy = savePostActivityVideoRequest.DeletedBy;
                                studentActivityVideosObj.DeletedDate = savePostActivityVideoRequest.DeletedDate != null ? savePostActivityVideoRequest.DeletedDate : DateTime.MinValue;
                                _postActivityImagesRepository.SaveChanges();
                                id = studentActivityVideosObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Saved Video for the student";
                        res.SaveId = id;
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
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetAllPostActivitiesByChildID(PostActivitiesRequestViewModel getAllPostActivitiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<PostActivities> selectedPostActivities = null;
                if (getAllPostActivitiesRequest.AgencyID > 0)
                {
                    if (getAllPostActivitiesRequest.IsPublic == true)
                    {
                        // Find Students Id for perticular parent
                        IQueryable<Entity.Parent.ParentStudentMapping> selectedMapStudents = _parentStudentMapping.GetAll().Where(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID && check.ParentID == getAllPostActivitiesRequest.UserID);
                        List<long> StudentIDs = new List<long>();
                        foreach (var item in selectedMapStudents)
                        {
                            StudentIDs.Add(item.StudentID);
                        }
                        IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID);
                        List<long> ClassesIDFromClasses = new List<long>();
                        foreach (var item in classes)
                        {
                            ClassesIDFromClasses.Add(item.Id);
                        }
                        //Find Classes of Student for a perticular parent
                        IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(a => StudentIDs.Contains(a.StudentID) && a.EnrollmentStatus == 2 && a.AgencyID == getAllPostActivitiesRequest.AgencyID && ClassesIDFromClasses.Contains(a.ClassesID));
                        List<long> ClassesIDFromClassEnrollment = new List<long>();
                        foreach (var item in classEnrollment)
                        {
                            ClassesIDFromClassEnrollment.Add(item.ClassesID);
                        }
                        //Get Distinct list of classes associate with students
                        ClassesIDFromClassEnrollment = ClassesIDFromClassEnrollment.Distinct().ToList();

                        selectedPostActivities = _postActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getAllPostActivitiesRequest.AgencyID
                        && (getAllPostActivitiesRequest.StudentID == 0 || filter.StudentID == getAllPostActivitiesRequest.StudentID) && filter.IsPublic == getAllPostActivitiesRequest.IsPublic
                        && !filter.IsDeleted && ClassesIDFromClassEnrollment.Contains(filter.ClassesID));

                        List<PostActivities> selectedPostActivitiesList = selectedPostActivities.ToList().DistinctBy(m => new { m.PostedDate, m.TeacherID, m.AgencyID }).ToList();
                        selectedPostActivities = selectedPostActivitiesList.AsQueryable();
                    }
                    else
                    {
                        selectedPostActivities = _postActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getAllPostActivitiesRequest.AgencyID
                            && (getAllPostActivitiesRequest.StudentID == 0 || filter.StudentID == getAllPostActivitiesRequest.StudentID) && filter.IsPublic == getAllPostActivitiesRequest.IsPublic
                            && !filter.IsDeleted);
                    }
                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.AgencyID == getAllPostActivitiesRequest.AgencyID);

                    List<PostActivitiesViewModel> postedActivities = new List<PostActivitiesViewModel>();

                    if (selectedPostActivities != null)
                    {
                        if (getAllPostActivitiesRequest.IsPublic == true)
                        {
                            postedActivities = (from postActivitiesObj in selectedPostActivities
                                                join classObj in selectedClasses on postActivitiesObj.ClassesID equals classObj.Id
                                                join selectedTeacherObj in selectedTeacher on postActivitiesObj.TeacherID equals selectedTeacherObj.Id
                                                where !postActivitiesObj.IsDeleted
                                                select new PostActivitiesViewModel
                                                {
                                                    ClassName = classObj.ClassName,
                                                    Id = postActivitiesObj.Id,
                                                    TeacherID = postActivitiesObj.TeacherID,
                                                    Sender = selectedTeacherObj.TeacherName,
                                                    PostTitle = postActivitiesObj.PostTitle,
                                                    PostDescription = postActivitiesObj.PostDescription,
                                                    AgencyID = postActivitiesObj.AgencyID,
                                                    StudentID = postActivitiesObj.StudentID,
                                                    ClassesID = postActivitiesObj.ClassesID,
                                                    PostedDate = postActivitiesObj.PostedDate,
                                                    IsPublic = postActivitiesObj.IsPublic,
                                                    CreatedBy = postActivitiesObj.CreatedBy,
                                                    CreatedDate = postActivitiesObj.CreatedDate,
                                                    UpdatedBy = postActivitiesObj.UpdatedBy,
                                                    UpdatedDate = postActivitiesObj.UpdatedDate,
                                                    DeletedBy = postActivitiesObj.DeletedBy,
                                                    DeletedDate = postActivitiesObj.DeletedDate
                                                }).OrderByDescending(c => c.PostedDate).ToList();
                        }
                        else
                        {
                            postedActivities = (from postActivitiesObj in selectedPostActivities
                                                join studentsObj in students on postActivitiesObj.StudentID equals studentsObj.Id
                                                join selectedTeacherObj in selectedTeacher on postActivitiesObj.TeacherID equals selectedTeacherObj.Id
                                                where !studentsObj.IsDeleted && !postActivitiesObj.IsDeleted
                                                select new PostActivitiesViewModel
                                                {
                                                    StudentName = studentsObj.StudentName,
                                                    ImagePath = studentsObj.ImagePath,
                                                    Id = postActivitiesObj.Id,
                                                    TeacherID = postActivitiesObj.TeacherID,
                                                    Sender = selectedTeacherObj.TeacherName,
                                                    PostTitle = postActivitiesObj.PostTitle,
                                                    PostDescription = postActivitiesObj.PostDescription,
                                                    AgencyID = postActivitiesObj.AgencyID,
                                                    StudentID = postActivitiesObj.StudentID,
                                                    ClassesID = postActivitiesObj.ClassesID,
                                                    PostedDate = postActivitiesObj.PostedDate,
                                                    IsPublic = postActivitiesObj.IsPublic,
                                                    CreatedBy = postActivitiesObj.CreatedBy,
                                                    CreatedDate = postActivitiesObj.CreatedDate,
                                                    UpdatedBy = postActivitiesObj.UpdatedBy,
                                                    UpdatedDate = postActivitiesObj.UpdatedDate,
                                                    DeletedBy = postActivitiesObj.DeletedBy,
                                                    DeletedDate = postActivitiesObj.DeletedDate
                                                }).OrderByDescending(c => c.PostedDate).ToList();
                        }

                        foreach (var postActivity in postedActivities)
                        {
                            if (postActivity.Id > 0 && postActivity.AgencyID > 0)
                            {
                                postActivity.selectedStudents = new List<long>();
                                postActivity.selectedStudents.Add(postActivity.StudentID);
                                postActivity.PostActivityVideos = GetPostedVedios(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                postActivity.PostActivityImages = GetPostedImages(postActivity.Id, postActivity.AgencyID, getAllPostActivitiesRequest.UserID, getAllPostActivitiesRequest.CreatedBy);
                                if (postActivity.PostActivityImages.Count > 0)
                                {
                                    postActivity.TotalLikes = postActivity.PostActivityImages[0].LikeCount;
                                    postActivity.IsPostALreadyLiked = postActivity.PostActivityImages[0].alreadyliked;
                                    postActivity.PostComment = postActivity.PostActivityImages[0].Comment != null ? postActivity.PostActivityImages[0].Comment : string.Empty;
                                    if (postActivity.PostComment != null && postActivity.PostComment != string.Empty && postActivity.PostComment != "" && postActivity.PostComment != " ")
                                    {
                                        postActivity.IsAlreadyPostComment = true;
                                    }
                                    else
                                    {
                                        postActivity.IsAlreadyPostComment = false;
                                    }
                                }
                                else if (postActivity.PostActivityVideos.Count > 0)
                                {
                                    postActivity.IsAlreadyPostComment = postActivity.PostActivityVideos[0].IsAlreadyPostComment;
                                    postActivity.TotalLikes = postActivity.PostActivityVideos[0].LikeCount;
                                    postActivity.IsPostALreadyLiked = postActivity.PostActivityVideos[0].alreadyliked;
                                    postActivity.PostComment = postActivity.PostActivityVideos[0].Comment != null ? postActivity.PostActivityVideos[0].Comment : string.Empty;

                                    if (postActivity.PostComment != null && postActivity.PostComment != string.Empty && postActivity.PostComment != "" && postActivity.PostComment != " ")
                                    {
                                        postActivity.IsAlreadyPostComment = true;
                                    }
                                    else
                                    {
                                        postActivity.IsAlreadyPostComment = false;
                                    }
                                }
                                else
                                {
                                    postActivity.TotalLikes = 0;
                                    postActivity.IsPostALreadyLiked = false;
                                    postActivity.IsAlreadyPostComment = false;
                                    postActivity.PostComment = string.Empty;
                                }
                                postActivity.CommentCount = 13;
                            }
                        }

                        res.Data = postedActivities;

                        if (getAllPostActivitiesRequest.limit != 0 && getAllPostActivitiesRequest.limit != null)
                        {
                            res.Data = postedActivities.Skip((getAllPostActivitiesRequest.page) * getAllPostActivitiesRequest.limit).Take(getAllPostActivitiesRequest.limit).ToList(); // By KG
                        }
                        else
                        {
                            res.Data = postedActivities.ToList();
                        }
                        res.TotalRows = selectedPostActivities.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Post Activities has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "No Data Found";
                        res.IsSuccess = false;
                    }
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
            return res;
        }

        public ResponseViewModal GetUnApproveImages(UnApproveImagesViewModel unApproveImagesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (unApproveImagesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.PostActivity.UnApprovedImages> unApprovedImages = _unApprovedImagesRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == unApproveImagesRequest.AgencyID);
                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == unApproveImagesRequest.AgencyID);
                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(check => check.AgencyID == unApproveImagesRequest.AgencyID);

                    List<UnApproveImagesViewModel> unApprovedImagesList = new List<UnApproveImagesViewModel>();
                    if (unApprovedImages != null)
                    {
                        unApprovedImagesList = (from imageObj in unApprovedImages
                                                join studentObj in students on imageObj.StudentID equals studentObj.Id
                                                join selectedTeacherObj in selectedTeacher on imageObj.TeacherID equals selectedTeacherObj.Id
                                                where !imageObj.IsDeleted
                                                select new UnApproveImagesViewModel
                                                {

                                                    Id = imageObj.Id,
                                                    PostActivityImagesID = imageObj.PostActivityImagesID,
                                                    AgencyID = imageObj.AgencyID,
                                                    StudentID = imageObj.StudentID,
                                                    StudentName = studentObj.StudentName,
                                                    TeacherID = imageObj.TeacherID,
                                                    Sender = selectedTeacherObj.TeacherName,
                                                    ImageServerPath = imageObj.ImageServerPath,
                                                    PostTitle = imageObj.PostTitle,
                                                    PostedDate = imageObj.CreatedDate,
                                                    CreatedBy = imageObj.CreatedBy,
                                                    CreatedDate = imageObj.CreatedDate,
                                                    UpdatedBy = imageObj.UpdatedBy,
                                                    UpdatedDate = imageObj.UpdatedDate,
                                                    DeletedBy = imageObj.DeletedBy,
                                                    DeletedDate = imageObj.DeletedDate
                                                }).OrderByDescending(c => c.PostedDate).ToList();


                        res.Data = unApprovedImagesList;
                        res.TotalRows = unApprovedImagesList.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Images has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "No Data Found";
                        res.IsSuccess = false;
                    }
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
            return res;
        }

        public ResponseViewModal ApproveImages(UnApproveImagesViewModel unApproveImagesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                UnApprovedImages unApprovedImages = new UnApprovedImages();
                PostActivityImages studentActivityImagesObj = new PostActivityImages();
                try
                {
                    if (unApproveImagesRequest.PostActivityImagesID > 0 && unApproveImagesRequest.Id > 0 && unApproveImagesRequest.IsDeleted == false)
                    {
                        unApprovedImages = _unApprovedImagesRepository.Get(x => x.Id == unApproveImagesRequest.Id && !x.IsDeleted && x.AgencyID == unApproveImagesRequest.AgencyID);
                        studentActivityImagesObj = _postActivityImagesRepository.Get(x => x.Id == unApprovedImages.PostActivityImagesID && !x.IsDeleted && x.AgencyID == unApproveImagesRequest.AgencyID);
                        if (!ReferenceEquals(studentActivityImagesObj, null) && !ReferenceEquals(unApprovedImages, null))
                        {
                            studentActivityImagesObj.ImageServerPath = unApprovedImages.ImageServerPath;
                            studentActivityImagesObj.IsApprove = true;
                            studentActivityImagesObj.UpdatedDate = DateTime.Now;
                            _postActivityImagesRepository.SaveChanges();

                            unApprovedImages.IsDeleted = true;
                            unApprovedImages.DeletedBy = unApproveImagesRequest.AgencyID;
                            unApprovedImages.DeletedDate = DateTime.UtcNow;
                            _unApprovedImagesRepository.SaveChanges();

                            res.IsSuccess = true;
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                        else
                        {
                            res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                            res.Message = "Missing Parameter.";
                            res.IsSuccess = false;
                        }
                    }
                    else if (unApproveImagesRequest.PostActivityImagesID > 0 && unApproveImagesRequest.Id > 0 && unApproveImagesRequest.IsDeleted == true)
                    {
                        unApprovedImages = _unApprovedImagesRepository.Get(x => x.Id == unApproveImagesRequest.Id && !x.IsDeleted && x.AgencyID == unApproveImagesRequest.AgencyID);
                        if (!ReferenceEquals(unApprovedImages, null))
                        {
                            unApprovedImages.IsDeleted = true;
                            unApprovedImages.DeletedBy = unApproveImagesRequest.AgencyID;
                            unApprovedImages.DeletedDate = DateTime.UtcNow;
                            _unApprovedImagesRepository.SaveChanges();

                            res.IsSuccess = true;
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                        else
                        {
                            res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                            res.Message = "Missing Parameter.";
                            res.IsSuccess = false;
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

    }
}
