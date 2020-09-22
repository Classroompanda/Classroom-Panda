using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class AddedTableAccountLedger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountLedger",
                columns: table => new
                {
                    AccountLedgerID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
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
                    PaymentDetailsID = table.Column<long>(nullable: false),
                    AgencyID = table.Column<long>(nullable: false),
                    AccountID = table.Column<long>(nullable: false),
                    CustomerID = table.Column<long>(nullable: false),
                    DrCr = table.Column<string>(nullable: true),
                    CreditAmount = table.Column<decimal>(nullable: false),
                    DebitAmount = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountLedger", x => x.AccountLedgerID);
                    table.ForeignKey(
                        name: "FK_AccountLedger_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountLedger_PayementDetails_PaymentDetailsID",
                        column: x => x.PaymentDetailsID,
                        principalTable: "PayementDetails",
                        principalColumn: "PaymentDetailsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountLedger_AgencyID",
                table: "AccountLedger",
                column: "AgencyID");

            migrationBuilder.CreateIndex(
                name: "IX_AccountLedger_PaymentDetailsID",
                table: "AccountLedger",
                column: "PaymentDetailsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountLedger");
        }
    }
}
