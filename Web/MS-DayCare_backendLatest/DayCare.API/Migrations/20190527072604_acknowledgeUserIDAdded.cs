using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class acknowledgeUserIDAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AcknowledgeParentID",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "AcknowledgeTeacherID",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcknowledgeParentID",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "AcknowledgeTeacherID",
                table: "StudentActivityMedication");
        }
    }
}
