using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentActivityMedicationRepository : RepositoryBase<StudentActivityMedication>, IStudentActivityMedicationRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentActivityMedicationRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

