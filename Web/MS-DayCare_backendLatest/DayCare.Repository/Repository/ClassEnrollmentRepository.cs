using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ClassEnrollmentRepository : RepositoryBase<ClassEnrollment>, IClassEnrollmentRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ClassEnrollmentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
