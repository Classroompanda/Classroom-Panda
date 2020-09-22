using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentBreakLogRepository : RepositoryBase<StudentBreakLog>, IStudentBreakLogRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentBreakLogRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
