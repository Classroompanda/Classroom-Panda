using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.Repository
{
    
    public class ExtraFeeChargeMasterRepository : RepositoryBase<ExtraFeeChargeMaster>, IExtraFeeChargeMasterRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ExtraFeeChargeMasterRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
