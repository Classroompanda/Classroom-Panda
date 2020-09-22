using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ColumnAddedIsGaurdian : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGaurdian",
                table: "Parent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSecondaryParent",
                table: "Parent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsGaurdian",
                table: "MappingParentStudent",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGaurdian",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "IsSecondaryParent",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "IsGaurdian",
                table: "MappingParentStudent");
        }
    }
}
