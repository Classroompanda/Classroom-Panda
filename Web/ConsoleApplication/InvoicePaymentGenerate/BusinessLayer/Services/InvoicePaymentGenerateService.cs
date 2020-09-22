using BusinessLayer.IServices;
using DataAccessLayer.IRepositories;
using DataAccessLayer.Repositories;

namespace BusinessLayer.Services
{
    public class InvoicePaymentGenerateService : IInvoicePaymentGenerateService
    {
        public void InvoicePaymentGenerate()
        {
            IInvoicePaymentGenerateRepository invoiceGenerateRepository = new InvoicePaymentGenerateRepository();
            invoiceGenerateRepository.InvoicePaymentGenerate();
        }
    }
}


