using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class TextMessagePlanRepository : RepositoryBase<TextMessagePlan>, ITextMessagePlanRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public TextMessagePlanRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}

