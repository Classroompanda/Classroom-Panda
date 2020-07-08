using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class medicationackforteacherandparent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isParentAcknowledge",
                table: "StudentMedication",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isTeacherAcknowledge",
                table: "StudentMedication",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isParentAcknowledge",
                table: "StudentMedication");

            migrationBuilder.DropColumn(
                name: "isTeacherAcknowledge",
                table: "StudentMedication");
        }
    }
}
