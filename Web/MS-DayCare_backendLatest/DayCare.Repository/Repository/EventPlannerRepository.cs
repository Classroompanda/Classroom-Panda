using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class EventPlannerRepository : RepositoryBase<EventPlanner>, IEventPlannerRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public EventPlannerRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
