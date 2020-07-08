using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherClassAttendenceRepository : RepositoryBase<TeacherClassAttendence>, ITeacherClassAttendenceRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherClassAttendenceRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
