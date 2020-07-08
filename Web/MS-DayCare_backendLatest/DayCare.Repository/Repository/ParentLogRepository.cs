using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Data;
using DayCare.Entity.Parent;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class ParentLogRepository : RepositoryBase<ParentLog>, IParentLogRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ParentLogRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}


