using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class RemoveColumnStudentID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DigitalDirectorMaster_Student_StudentID",
                table: "DigitalDirectorMaster");

            migrationBuilder.DropIndex(
                name: "IX_DigitalDirectorMaster_StudentID",
                table: "DigitalDirectorMaster");

            migrationBuilder.DropColumn(
                name: "StudentID",
                table: "DigitalDirectorMaster");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StudentID",
                table: "DigitalDirectorMaster",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_DigitalDirectorMaster_StudentID",
                table: "DigitalDirectorMaster",
                column: "StudentID");

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalDirectorMaster_Student_StudentID",
                table: "DigitalDirectorMaster",
                column: "StudentID",
                principalTable: "Student",
                principalColumn: "StudentID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
