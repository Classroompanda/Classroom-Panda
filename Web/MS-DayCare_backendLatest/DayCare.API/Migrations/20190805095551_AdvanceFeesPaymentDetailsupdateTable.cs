using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AdvanceFeesPaymentDetailsupdateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvanceFeePaymentDetails_TransactionDetails_InvoiceDetailsID",
                table: "AdvanceFeePaymentDetails");

            migrationBuilder.DropIndex(
                name: "IX_AdvanceFeePaymentDetails_InvoiceDetailsID",
                table: "AdvanceFeePaymentDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AdvanceFeePaymentDetails_InvoiceDetailsID",
                table: "AdvanceFeePaymentDetails",
                column: "InvoiceDetailsID");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvanceFeePaymentDetails_TransactionDetails_InvoiceDetailsID",
                table: "AdvanceFeePaymentDetails",
                column: "InvoiceDetailsID",
                principalTable: "TransactionDetails",
                principalColumn: "TransactionDetailsID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
