using DayCare.Data;
using DayCare.Entity.User;
using DayCare.Entity.Masters;
using DayCare.Repository.IRepository;
using System;
using System.Linq;
namespace DayCare.Repository.IRepository
{
    public class TokenRepository : ITokenRepository
    {

        private readonly DataContext _context;
        public TokenRepository(DataContext context)
        {
            this._context = context;
        }

        public Users GetUserByUserName(string userName)
        {
            try
            {
                var alluser = _context.Users;
                var user = _context.Users.Where(m => m.UserName.ToUpper() == userName.ToUpper() && m.IsActive == true && !m.IsDeleted).FirstOrDefault();
                return user;
            }
            catch (Exception ex )
            {
                return null;
            }
        }

        public Users GetUserByEmailAddress(string EmailAddress)
        {
            try
            {
                return _context.Users.Where(m => m.EmailAddress.ToUpper() == EmailAddress.ToUpper() && m.IsActive == true && m.IsDeleted == false).FirstOrDefault();
                 
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int GetOrganizationIDByName(string businessName)
        {
            return 0;
           // return _masterContext.MasterOrganization.Where(a => a.BusinessName == businessName && a.IsActive == true && a.IsDeleted == false).Select(a => a.Id).FirstOrDefault();
        }


        public Users GetUserByQuickPin(string QuickPin)
        {
            try
            {
                return _context.Users.Where(m => m.QuickPin == QuickPin && m.IsActive == true && m.IsDeleted == false).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Users GetUserByQuickPinAndAgency(string QuickPin , long AgencyID)
        {
            try
            {
                return _context.Users.Where(m => m.QuickPin == QuickPin && m.AgencyID == AgencyID && m.IsActive == true && m.IsDeleted == false).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public AuthorizedPerson GetAuthorizedPersonLoginByQuickPin(string QuickPin)
        {
            try
            {
                return _context.AuthorizedPerson.Where(m => m.QuickPin == QuickPin && m.IsActive == true && m.IsDeleted == false).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public AuthorizedPerson GetAuthorizedPersonLoginByQuickPinAndAgency(string QuickPin, long AgencyID)
        {
            try
            {
                return _context.AuthorizedPerson.Where(m => m.QuickPin == QuickPin && m.AgencyID == AgencyID && m.IsActive == true && m.IsDeleted == false).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
