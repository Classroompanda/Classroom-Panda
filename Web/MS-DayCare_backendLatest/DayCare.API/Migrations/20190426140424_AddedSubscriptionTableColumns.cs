using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedSubscriptionTableColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlanID",
                table: "SubscriptionDetails",
                newName: "PlanId");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "BillingCycleDate",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CustomerId",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "SubscriptionDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Interval",
                table: "SubscriptionDetails",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PlanID",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "PlanName",
                table: "SubscriptionDetails",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ProductId",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "SubscriptionDetails",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StripePlanId",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "SubscriptionId",
                table: "SubscriptionDetails",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "BillingCycleDate",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "Interval",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "PlanID",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "PlanName",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "StripePlanId",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "SubscriptionDetails");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "SubscriptionDetails",
                newName: "PlanID");
        }
    }
}
