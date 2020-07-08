using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnAmountPaid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AmoutPaid",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "BalanceAmount",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "CardNo",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ChequeNo",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountAmount",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "PaymentType",
                table: "PayementDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmoutPaid",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "BalanceAmount",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "CardNo",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "ChequeNo",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "DiscountAmount",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "PayementDetails");
        }
    }
}
