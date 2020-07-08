using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.Repository
{
    public class STDDDRepository : RepositoryBase<StudentDigitalDirector>, ISTDDDRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public STDDDRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
