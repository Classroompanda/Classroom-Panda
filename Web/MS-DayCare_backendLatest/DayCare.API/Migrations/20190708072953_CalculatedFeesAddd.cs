using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class CalculatedFeesAddd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExtraFeesDetails_PayementDetails_PaymentDetailsID",
                table: "ExtraFeesDetails");

            migrationBuilder.DropIndex(
                name: "IX_ExtraFeesDetails_PaymentDetailsID",
                table: "ExtraFeesDetails");

            migrationBuilder.AddColumn<long>(
                name: "CalculatedFeesID",
                table: "ExtraFeesDetails",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "CalculatedFees",
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
                    PerDayFeeCalculationID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    ParentID = table.Column<long>(nullable: false),
                    ClassID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    TotalPerDayFee = table.Column<decimal>(nullable: false),
                    TotalCalculatedAmount = table.Column<decimal>(nullable: false),
                    IsInvoiceGenrated = table.Column<bool>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalculatedFees", x => x.PerDayFeeCalculationID);
                    table.ForeignKey(
                        name: "FK_CalculatedFees_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExtraFeesDetails_CalculatedFeesID",
                table: "ExtraFeesDetails",
                column: "CalculatedFeesID");

            migrationBuilder.CreateIndex(
                name: "IX_CalculatedFees_AgencyID",
                table: "CalculatedFees",
                column: "AgencyID");

            migrationBuilder.AddForeignKey(
                name: "FK_ExtraFeesDetails_CalculatedFees_CalculatedFeesID",
                table: "ExtraFeesDetails",
                column: "CalculatedFeesID",
                principalTable: "CalculatedFees",
                principalColumn: "PerDayFeeCalculationID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExtraFeesDetails_CalculatedFees_CalculatedFeesID",
                table: "ExtraFeesDetails");

            migrationBuilder.DropTable(
                name: "CalculatedFees");

            migrationBuilder.DropIndex(
                name: "IX_ExtraFeesDetails_CalculatedFeesID",
                table: "ExtraFeesDetails");

            migrationBuilder.DropColumn(
                name: "CalculatedFeesID",
                table: "ExtraFeesDetails");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraFeesDetails_PaymentDetailsID",
                table: "ExtraFeesDetails",
                column: "PaymentDetailsID");

            migrationBuilder.AddForeignKey(
                name: "FK_ExtraFeesDetails_PayementDetails_PaymentDetailsID",
                table: "ExtraFeesDetails",
                column: "PaymentDetailsID",
                principalTable: "PayementDetails",
                principalColumn: "PaymentDetailsID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
