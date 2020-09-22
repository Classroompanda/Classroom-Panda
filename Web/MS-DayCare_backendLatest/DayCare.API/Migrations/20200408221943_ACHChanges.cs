using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ACHChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BankAccountID",
                table: "ACHInformation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankAccountID",
                table: "ACHInformation");
        }
    }
}
