using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ackcolminmedicationactivitytbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isParentAcknowledge",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isTeacherAcknowledge",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isParentAcknowledge",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "isTeacherAcknowledge",
                table: "StudentActivityMedication");
        }
    }
}
