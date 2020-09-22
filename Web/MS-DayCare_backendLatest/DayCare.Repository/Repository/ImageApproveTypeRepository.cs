using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class ImageApproveTypeRepository : RepositoryBase<ImageApproveType>, IImageApproveTypeRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ImageApproveTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}


