using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class RemoveColumnFromTableTransactionDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BalanceAmount",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "PaidAmount",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "TransactionDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BalanceAmount",
                table: "TransactionDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PaidAmount",
                table: "TransactionDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "TransactionDetails",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
