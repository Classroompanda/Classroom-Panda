using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizedPersonEmailId",
                table: "AuthorizedPersonLogin");

            migrationBuilder.DropColumn(
                name: "QuickPin",
                table: "AuthorizedPersonLogin");

            migrationBuilder.RenameColumn(
                name: "AuthorizedPersonLoginID",
                table: "AuthorizedPersonLogin",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "AuthorizedPersonLogin",
                newName: "AuthorizedPersonLoginID");

            migrationBuilder.AddColumn<string>(
                name: "AuthorizedPersonEmailId",
                table: "AuthorizedPersonLogin",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuickPin",
                table: "AuthorizedPersonLogin",
                nullable: true);
        }
    }
}
