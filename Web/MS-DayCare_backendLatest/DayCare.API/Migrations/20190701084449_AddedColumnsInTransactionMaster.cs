using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnsInTransactionMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountHolderName",
                table: "TransactionMaster",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AccountNumber",
                table: "TransactionMaster",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "IFSC",
                table: "TransactionMaster",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDefaultAccount",
                table: "TransactionMaster",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "OpeningBalance",
                table: "TransactionMaster",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNo",
                table: "PayementDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountHolderName",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "IFSC",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "IsDefaultAccount",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "OpeningBalance",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "InvoiceNo",
                table: "PayementDetails");
        }
    }
}
