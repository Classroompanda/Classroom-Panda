using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeDatatypeRecordedTemparture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RecordedTemparture",
                table: "StudentActivityMedication",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "RecordedTemparture",
                table: "StudentActivityMedication",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
