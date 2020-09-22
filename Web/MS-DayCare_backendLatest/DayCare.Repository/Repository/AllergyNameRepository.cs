    using DayCare.Data;
    using DayCare.Entity.Masters;
    using DayCare.Repository.Core;
    using DayCare.Repository.IRepository;

    namespace DayCare.Repository.IRepository
    {
        public class AllergyNameRepository : RepositoryBase<AllergyName>, IAllergyNameRepository
        {

            #region Initialize DI
            private readonly DataContext _context;
            public AllergyNameRepository(DataContext context) : base(context)
            {
                this._context = context;
            }


            #endregion
        }
    }