using BusinessLayer.IServices;
using BusinessLayer.Services;

namespace ACHPayment
{
    class Program
    {
        static void Main(string[] args)
        {
            IACHPaymentGenerateService achpaymentGenerateService = new ACHPaymentGenerateService();
            achpaymentGenerateService.ACHPaymentGenerate();
        }
    }
}
