using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class InvoiceDetailsUpdatedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InvoiceDetailID",
                table: "InvoiceDetails",
                newName: "InvoiceDetailsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InvoiceDetailsID",
                table: "InvoiceDetails",
                newName: "InvoiceDetailID");
        }
    }
}
