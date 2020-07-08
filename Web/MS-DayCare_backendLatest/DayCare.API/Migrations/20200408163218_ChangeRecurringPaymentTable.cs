using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeRecurringPaymentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentFirstDate",
                table: "RecurringPayment",
                newName: "PreviousPaymentDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstPaymentDate",
                table: "RecurringPayment",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NextPaymentDate",
                table: "RecurringPayment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstPaymentDate",
                table: "RecurringPayment");

            migrationBuilder.DropColumn(
                name: "NextPaymentDate",
                table: "RecurringPayment");

            migrationBuilder.RenameColumn(
                name: "PreviousPaymentDate",
                table: "RecurringPayment",
                newName: "PaymentFirstDate");
        }
    }
}
