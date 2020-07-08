﻿using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class IncidentPriortyTypeRepository : RepositoryBase<IncidentPriortyType>, IIncidentPriortyTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public IncidentPriortyTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
