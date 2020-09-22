using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Agency",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Status",
                table: "Agency",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Agency");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Agency");
        }
    }
}
