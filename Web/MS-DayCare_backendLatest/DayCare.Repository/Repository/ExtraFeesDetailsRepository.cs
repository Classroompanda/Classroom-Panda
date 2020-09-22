using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.Repository
{
  

    public class ExtraFeesDetailsRepository : RepositoryBase<ExtraFeesDetails>, IExtraFeesDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ExtraFeesDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
