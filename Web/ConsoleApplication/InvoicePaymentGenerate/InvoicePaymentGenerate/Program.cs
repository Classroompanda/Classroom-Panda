using BusinessLayer.IServices;
using BusinessLayer.Services;

namespace InvoicePaymentGenerate
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IInvoicePaymentGenerateService invoicepaymentGenerateService = new InvoicePaymentGenerateService();
            invoicepaymentGenerateService.InvoicePaymentGenerate();
        }
    }
}

