using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnInvoiceNoInTransactionDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceFromDate",
                table: "TransactionDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNo",
                table: "TransactionDetails",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceToDate",
                table: "TransactionDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceFromDate",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "InvoiceNo",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "InvoiceToDate",
                table: "TransactionDetails");
        }
    }
}
