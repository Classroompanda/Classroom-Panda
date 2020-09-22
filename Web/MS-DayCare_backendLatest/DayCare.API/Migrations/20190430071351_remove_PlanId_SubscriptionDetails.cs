using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class remove_PlanId_SubscriptionDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.RenameColumn(
            //    name: "PlanID",
            //    table: "SubscriptionDetails",
            //    newName: "SubscribePlanID");
            migrationBuilder.DropColumn(
               name: "PlanId",
               table: "SubscriptionDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
               name: "PlanId",
               table: "SubscriptionDetails");
            //migrationBuilder.RenameColumn(
            //    name: "SubscribePlanID",
            //    table: "SubscriptionDetails",
            //    newName: "PlanID");
        }
    }
}
