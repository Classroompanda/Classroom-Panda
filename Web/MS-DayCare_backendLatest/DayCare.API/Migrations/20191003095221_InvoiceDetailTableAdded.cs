using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class InvoiceDetailTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InvoiceDetailsID",
                table: "InvoiceDetails",
                newName: "InvoiceDetailID");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "InvoiceDetails",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InvoiceDetailID",
                table: "InvoiceDetails",
                newName: "InvoiceDetailsID");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "InvoiceDetails",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");
        }
    }
}
