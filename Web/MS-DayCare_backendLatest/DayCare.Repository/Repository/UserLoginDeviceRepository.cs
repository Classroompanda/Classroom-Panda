using DayCare.Data;
using DayCare.Entity.User;
using DayCare.Repository.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.IRepository
{
    public class UserLoginDeviceRepository : RepositoryBase<UserLoginDevice>, IUserLoginDeviceRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public UserLoginDeviceRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion

    }
}
