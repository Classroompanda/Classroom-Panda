using DayCare.Data;
using DayCare.Entity.User;
using DayCare.Model.Common;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System.Linq;
using System;
using System.Net;

namespace DayCare.Repository.IRepository
{
    public class UserRepository : RepositoryBase<Users>, IUserRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public UserRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion

        /// <summary>
        ///  To update failed access count
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="tokenModel"></param>
        /// <returns></returns>
        public JsonModel UpdateAccessFailedCount(int userID, TokenModel tokenModel)
        {
            try
            {
                string Message = string.Empty;
                var user = _context.Users.Where(p => p.Id == userID).FirstOrDefault();
                if (user.RoleId == 1)
                {
                    Message = "Invalid username or password.";//If Admin login with wrong credentials
                }
                else if (user.AccessFailedCount >= 2) // if user attemped 3 time with wrong credentials
                {
                    user.IsBlock = true;
                    user.BlockDateTime = DateTime.UtcNow;
                    user.AccessFailedCount = user.AccessFailedCount + 1;
                    Message = "Blocked"; //UserAccountNotification.AccountDeactiveOrExpirePass;//block
                }
                else // if wrong attemped increase the failed count
                {
                    if (user.BlockDateTime == null)
                    {
                        Message = "Deactivated";//UserAccountNotification.AccountDeactive;
                        user.AccessFailedCount = user.AccessFailedCount + 1;
                        Message = "Invalid Password";//UserAccountNotification.InvalidPassword;//Invaild Password
                    }
                    else
                    {
                        user.AccessFailedCount = user.AccessFailedCount + 1;
                        Message = "Invalid Password";//UserAccountNotification.InvalidPassword;//Invaild Password
                    }
                }
                //save
                _context.Users.Update(user);
                _context.SaveChanges();
                //return
                return new JsonModel()
                {
                    data = new object(),
                    Message = Message,
                    StatusCode = (int)HttpStatusCode.Unauthorized//(Invalid credentials)
                };
            }
            catch (Exception ex)
            {
                return new JsonModel()
                {
                    data = new object(),
                    Message = ex.Message,
                    StatusCode = (int)HttpStatusCode.Unauthorized//(Invalid credentials)
                };
            }
        }

    }
}
