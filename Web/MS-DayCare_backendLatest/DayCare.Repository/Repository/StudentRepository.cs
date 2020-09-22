using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentRepository : RepositoryBase<Student>, IStudentRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
