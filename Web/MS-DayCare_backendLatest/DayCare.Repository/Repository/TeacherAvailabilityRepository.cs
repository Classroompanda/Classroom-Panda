using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherAvailabilityRepository : RepositoryBase<TeacherAvailability>, ITeacherAvailabilityRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherAvailabilityRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
