using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class IncidentInvolvmentRepository : RepositoryBase<IncidentInvolvment>, IIncidentInvolvmentRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public IncidentInvolvmentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
