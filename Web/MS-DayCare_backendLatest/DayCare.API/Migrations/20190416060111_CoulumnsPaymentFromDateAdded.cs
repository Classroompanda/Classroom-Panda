using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class CoulumnsPaymentFromDateAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BalanceFees",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentFromDate",
                table: "PayementDetails",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentToDate",
                table: "PayementDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BalanceFees",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "PaymentFromDate",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "PaymentToDate",
                table: "PayementDetails");
        }
    }
}
