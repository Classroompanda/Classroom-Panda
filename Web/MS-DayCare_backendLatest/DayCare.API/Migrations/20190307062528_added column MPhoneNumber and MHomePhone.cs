using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class addedcolumnMPhoneNumberandMHomePhone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MHomePhone",
                table: "TeacherInfo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MPhoneNumber",
                table: "TeacherInfo",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MHomePhone",
                table: "TeacherInfo");

            migrationBuilder.DropColumn(
                name: "MPhoneNumber",
                table: "TeacherInfo");
        }
    }
}
