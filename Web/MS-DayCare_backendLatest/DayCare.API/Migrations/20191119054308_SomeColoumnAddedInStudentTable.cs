using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class SomeColoumnAddedInStudentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ActivityTypeID",
                table: "Student",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "HrsInterval",
                table: "Student",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "MinInterval",
                table: "Student",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityTypeID",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "HrsInterval",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "MinInterval",
                table: "Student");
        }
    }
}
