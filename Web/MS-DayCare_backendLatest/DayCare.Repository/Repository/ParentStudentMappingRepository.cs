using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Data;
using DayCare.Entity.Parent;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ParentStudentMappingRepository : RepositoryBase<ParentStudentMapping>, IParentStudentMappingRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ParentStudentMappingRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
