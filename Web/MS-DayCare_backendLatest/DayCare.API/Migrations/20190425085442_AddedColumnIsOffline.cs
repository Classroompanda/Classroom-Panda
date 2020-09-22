using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnIsOffline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOffline",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOffline",
                table: "SubscriptionDetails");
        }
    }
}
