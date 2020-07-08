using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class RemoveColumnStudentActivityID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DigitalDirectorMaster_StudentActivities_StudentActivitiesID",
                table: "DigitalDirectorMaster");

            migrationBuilder.DropIndex(
                name: "IX_DigitalDirectorMaster_StudentActivitiesID",
                table: "DigitalDirectorMaster");

            migrationBuilder.DropColumn(
                name: "StudentActivitiesID",
                table: "DigitalDirectorMaster");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StudentActivitiesID",
                table: "DigitalDirectorMaster",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_DigitalDirectorMaster_StudentActivitiesID",
                table: "DigitalDirectorMaster",
                column: "StudentActivitiesID");

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalDirectorMaster_StudentActivities_StudentActivitiesID",
                table: "DigitalDirectorMaster",
                column: "StudentActivitiesID",
                principalTable: "StudentActivities",
                principalColumn: "StudentActivitiesID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
