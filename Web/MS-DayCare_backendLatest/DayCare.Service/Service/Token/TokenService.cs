using DayCare.Entity.User;
using DayCare.Entity.Masters;
using DayCare.Repository.IRepository;

namespace DayCare.Service.Token
{
    public class TokenService : ITokenService
    {

        private readonly ITokenRepository _tokenRepository;
        public TokenService(ITokenRepository tokenRepository)
        {
            this._tokenRepository = tokenRepository;

        }
            public Users GetUserByUserName(string userName)
        {
            return _tokenRepository.GetUserByUserName(userName);
        }


        public Users GetUserByEmailAddress(string EmailAddress)
        {
            return _tokenRepository.GetUserByEmailAddress(EmailAddress);
        }


        public long GetOrganizationIDByName(string businessName)
        {
            return _tokenRepository.GetOrganizationIDByName(businessName);
        }
        public Users GetUserByQuickPin(string QuickPin)
        {
            return _tokenRepository.GetUserByQuickPin(QuickPin);
        }

        public Users GetUserByQuickPinAndAgency(string QuickPin, long AgencyID)
        {
            return _tokenRepository.GetUserByQuickPinAndAgency(QuickPin, AgencyID);
        }
        public AuthorizedPerson GetAuthorizedPersonLoginByQuickPin(string QuickPin)
        {
            return _tokenRepository.GetAuthorizedPersonLoginByQuickPin(QuickPin);
        }
        public AuthorizedPerson GetAuthorizedPersonLoginByQuickPinAndAgency(string QuickPin, long AgencyID)
        {
            return _tokenRepository.GetAuthorizedPersonLoginByQuickPinAndAgency(QuickPin, AgencyID);
        }

    }
}
