using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class InvoiceDetailsTableUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualAmount",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "AdvanceAmount",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "ExtraFeesID",
                table: "PayementDetails");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "InvoiceDetails",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "InvoiceAmount",
                table: "InvoiceDetails",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "DueAmount",
                table: "InvoiceDetails",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountAmount",
                table: "InvoiceDetails",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AddColumn<long>(
                name: "PerDayFeeCalculationID",
                table: "InvoiceDetails",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PerDayFeeCalculationID",
                table: "InvoiceDetails");

            migrationBuilder.AddColumn<decimal>(
                name: "ActualAmount",
                table: "PayementDetails",
                type: "decimal(6,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AdvanceAmount",
                table: "PayementDetails",
                type: "decimal(6,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "ExtraFeesID",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "InvoiceDetails",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "InvoiceAmount",
                table: "InvoiceDetails",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "DueAmount",
                table: "InvoiceDetails",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountAmount",
                table: "InvoiceDetails",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");
        }
    }
}
