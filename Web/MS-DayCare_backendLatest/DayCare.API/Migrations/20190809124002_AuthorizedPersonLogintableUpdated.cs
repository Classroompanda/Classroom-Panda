using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AuthorizedPersonLogintableUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizedPersonID",
                table: "AuthorizedPersonLogin");

            migrationBuilder.AddColumn<string>(
                name: "AuthorizedPersonEmailId",
                table: "AuthorizedPersonLogin",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizedPersonEmailId",
                table: "AuthorizedPersonLogin");

            migrationBuilder.AddColumn<long>(
                name: "AuthorizedPersonID",
                table: "AuthorizedPersonLogin",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
