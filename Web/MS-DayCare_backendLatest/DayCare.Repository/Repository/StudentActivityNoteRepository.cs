using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentActivityNoteRepository : RepositoryBase<StudentActivityNote>, IStudentActivityNoteRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentActivityNoteRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

