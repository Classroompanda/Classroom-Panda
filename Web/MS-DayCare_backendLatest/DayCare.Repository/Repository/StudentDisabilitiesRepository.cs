using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.IRepository
{
    public class StudentDisabilitiesRepository : RepositoryBase<StudentDisabilities>, IStudentDisabilitiesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentDisabilitiesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
