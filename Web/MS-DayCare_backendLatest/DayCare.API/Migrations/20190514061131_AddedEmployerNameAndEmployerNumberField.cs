using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedEmployerNameAndEmployerNumberField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployerName",
                table: "Parent",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EmployerNumber",
                table: "Parent",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployerName",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "EmployerNumber",
                table: "Parent");
        }
    }
}
