using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class updatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiscountDetails",
                table: "ExtraFeesDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiscountDetails",
                table: "CalculatedFees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Agency",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountDetails",
                table: "ExtraFeesDetails");

            migrationBuilder.DropColumn(
                name: "DiscountDetails",
                table: "CalculatedFees");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Agency");
        }
    }
}
