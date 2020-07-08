using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class IncidentRepository : RepositoryBase<Incident>, IIncidentRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public IncidentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
