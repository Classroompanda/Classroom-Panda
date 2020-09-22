using DayCare.Data;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using DayCare.Entity.Agency;

namespace DayCare.Repository.IRepository
{
    public class InvolvedMealClassesRepository : RepositoryBase<InvolvedMealClasses>, IInvolvedMealClassesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public InvolvedMealClassesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

