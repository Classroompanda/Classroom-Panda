using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class RecurringBillingChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BillingCycle",
                table: "RecurringBilling",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BillingDescription",
                table: "RecurringBilling",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransactionType",
                table: "RecurringBilling",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
