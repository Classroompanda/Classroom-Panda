using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class columnProfessionApartmentinParentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Apartment",
                table: "Parent",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Profession",
                table: "Parent",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Apartment",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "Profession",
                table: "Parent");
        }
    }
}
