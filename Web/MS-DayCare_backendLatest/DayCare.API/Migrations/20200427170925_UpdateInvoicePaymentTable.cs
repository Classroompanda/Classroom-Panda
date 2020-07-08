using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class UpdateInvoicePaymentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentComment",
                table: "PayementDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceComment",
                table: "InvoiceDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentComment",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "InvoiceComment",
                table: "InvoiceDetails");
        }
    }
}
