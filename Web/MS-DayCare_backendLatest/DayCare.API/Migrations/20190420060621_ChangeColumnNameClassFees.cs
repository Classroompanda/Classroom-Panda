using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeColumnNameClassFees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClassFeePaid",
                table: "InvoiceItemDetails",
                newName: "ClassFees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClassFees",
                table: "InvoiceItemDetails",
                newName: "ClassFeePaid");
        }
    }
}
