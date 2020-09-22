using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ColumnChangedPayementDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BalanceFees",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "FeesPaid",
                table: "PayementDetails");

            migrationBuilder.RenameColumn(
                name: "TotalFees",
                table: "PayementDetails",
                newName: "TotalAmount");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "PayementDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "PayementDetails");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "PayementDetails",
                newName: "TotalFees");

            migrationBuilder.AddColumn<decimal>(
                name: "BalanceFees",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "FeesPaid",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
