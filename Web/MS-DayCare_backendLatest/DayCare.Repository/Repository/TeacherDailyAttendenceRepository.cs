using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherDailyAttendenceRepository : RepositoryBase<TeacherDailyAttendence>, ITeacherDailyAttendenceRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherDailyAttendenceRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
