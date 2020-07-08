using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class DatatypeChangeClassFeePaid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "ClassFeePaid",
                table: "InvoiceItemDetails",
                nullable: false,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "ClassFeePaid",
                table: "InvoiceItemDetails",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
