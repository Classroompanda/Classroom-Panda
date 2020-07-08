using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.Repository
{
    public class ClassTransferAttendenceRepository : RepositoryBase<ClassTransferAttendence>, IClassTransferAttendenceRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ClassTransferAttendenceRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
