using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeColumnUserID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_StripeDetails_Users_OwnerId",
            //    table: "StripeDetails");

            //migrationBuilder.DropIndex(
            //    name: "IX_StripeDetails_OwnerId",
            //    table: "StripeDetails");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "StripeDetails");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "StripeDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "StripeDetails");

            migrationBuilder.AddColumn<long>(
                name: "OwnerId",
                table: "StripeDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_StripeDetails_OwnerId",
                table: "StripeDetails",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_StripeDetails_Users_OwnerId",
                table: "StripeDetails",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
