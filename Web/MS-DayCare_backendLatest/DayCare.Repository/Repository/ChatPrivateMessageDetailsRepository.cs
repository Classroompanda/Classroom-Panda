using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Repository.IRepository
{
    public class ChatPrivateMessageDetailsRepository : RepositoryBase<ChatPrivateMessageDetails>,IChatPrivateMessageDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ChatPrivateMessageDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
