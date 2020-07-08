using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class emergencycontquickpinadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEmergencyContact",
                table: "AuthorizedPerson",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "QuickPin",
                table: "AuthorizedPerson",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmergencyContact",
                table: "AuthorizedPerson");

            migrationBuilder.DropColumn(
                name: "QuickPin",
                table: "AuthorizedPerson");
        }
    }
}
