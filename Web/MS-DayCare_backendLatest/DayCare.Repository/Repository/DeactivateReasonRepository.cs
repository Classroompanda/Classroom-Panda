using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class DeactivateReasonRepository : RepositoryBase<DeactivateReason>, IDeactivateReasonRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public DeactivateReasonRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}



