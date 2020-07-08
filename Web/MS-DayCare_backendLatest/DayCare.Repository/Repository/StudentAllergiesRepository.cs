
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentAllergiesRepository : RepositoryBase<StudentAllergies>, IStudentAllergiesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentAllergiesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
