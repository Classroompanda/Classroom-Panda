using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class AdvanceFeesPaymentDetailsAddedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdvanceFeePaymentDetails",
                columns: table => new
                {
                    IsActive = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedDate = table.Column<DateTime>(nullable: true),
                    DeletedFromIP = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<long>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    CreatedFromIP = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedFromIP = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    PaymentDetailsID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    ParentID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    InvoiceDetailsID = table.Column<long>(nullable: false),
                    IsAdvanceCreditAmount = table.Column<bool>(nullable: false),
                    CreditAdvanceAmount = table.Column<decimal>(nullable: false),
                    IsAdvanceDebitAmount = table.Column<bool>(nullable: false),
                    DebitAdvanceAmount = table.Column<decimal>(nullable: false),
                    BalanceAmount = table.Column<decimal>(nullable: false),
                    IsOffline = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvanceFeePaymentDetails", x => x.PaymentDetailsID);
                    table.ForeignKey(
                        name: "FK_AdvanceFeePaymentDetails_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvanceFeePaymentDetails_TransactionDetails_InvoiceDetailsID",
                        column: x => x.InvoiceDetailsID,
                        principalTable: "TransactionDetails",
                        principalColumn: "TransactionDetailsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvanceFeePaymentDetails_AgencyID",
                table: "AdvanceFeePaymentDetails",
                column: "AgencyID");

            migrationBuilder.CreateIndex(
                name: "IX_AdvanceFeePaymentDetails_InvoiceDetailsID",
                table: "AdvanceFeePaymentDetails",
                column: "InvoiceDetailsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvanceFeePaymentDetails");
        }
    }
}
