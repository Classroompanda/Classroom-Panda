using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class rename_SubscriptionId_SubscriptionDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "SubscribePlanID",
            //    table: "SubscriptionDetails");

            migrationBuilder.RenameColumn(
                name: "SubscriptionId",
                table: "SubscriptionDetails",
                newName: "StripeSubscriptionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StripeSubscriptionId",
                table: "SubscriptionDetails",
                newName: "SubscriptionId");

            //migrationBuilder.AddColumn<long>(
            //    name: "SubscribePlanID",
            //    table: "SubscriptionDetails",
            //    nullable: false,
            //    defaultValue: 0L);
        }
    }
}
