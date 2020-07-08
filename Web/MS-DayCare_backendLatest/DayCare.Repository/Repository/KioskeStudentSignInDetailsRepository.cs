using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.IRepository
{
    public class KioskeStudentSignInDetailsRepository :  RepositoryBase<KioskeStudentSignInDetails>, IKioskeStudentSignInDetailsRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public KioskeStudentSignInDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
