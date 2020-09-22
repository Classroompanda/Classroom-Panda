using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ColumnAddedIsAuthorizedToPickupAndReasonNotToAllow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAuthorizedToPickup",
                table: "Parent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ReasonNotToAllow",
                table: "Parent",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAuthorizedToPickup",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "ReasonNotToAllow",
                table: "Parent");
        }
    }
}
