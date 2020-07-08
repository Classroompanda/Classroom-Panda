using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherBreakLogRepository : RepositoryBase<TeacherBreakLog>, ITeacherBreakLogRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherBreakLogRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
