using BusinessLayer.IServices;
using DataAccessLayer.IRepositories;
using DataAccessLayer.Repositories;

namespace BusinessLayer.Services
{
    public class ACHPaymentGenerateService : IACHPaymentGenerateService
    {
        public void ACHPaymentGenerate()
        {
            IACHPaymentGenerateRepository achpaymentGenerateRepository = new ACHPaymentGenerateRepository();
            achpaymentGenerateRepository.ACHPaymentGenerate();
        }
    }
}


