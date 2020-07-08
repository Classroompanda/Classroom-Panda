using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class RecurringBillingChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillingCycle",
                table: "RecurringBilling");

            migrationBuilder.DropColumn(
                name: "BillingDescription",
                table: "RecurringBilling");

            migrationBuilder.DropColumn(
                name: "TransactionType",
                table: "RecurringBilling");

            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceGenerateDate",
                table: "RecurringBilling",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceGenerateDate",
                table: "RecurringBilling");

            migrationBuilder.AddColumn<DateTime>(
                name: "BillingCycle",
                table: "RecurringBilling",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "BillingDescription",
                table: "RecurringBilling",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TransactionType",
                table: "RecurringBilling",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
