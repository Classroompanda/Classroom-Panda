using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{

    public class StudentImmunizationRepository : RepositoryBase<StudentImmunization>, IStudentImmunizationRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentImmunizationRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
