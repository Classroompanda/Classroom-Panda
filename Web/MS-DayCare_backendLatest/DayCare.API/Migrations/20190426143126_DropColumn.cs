using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class DropColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillingCycleDate",
                table: "SubscriptionDetails");

            migrationBuilder.DropColumn(
                name: "PlanID",
                table: "SubscriptionDetails");

         
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlanID",
                table: "SubscriptionDetails",
                newName: "PlanId");

            migrationBuilder.AlterColumn<string>(
                name: "PlanId",
                table: "SubscriptionDetails",
                nullable: true,
                oldClrType: typeof(long));

           
        }
    }
}
