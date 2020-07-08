using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class Added_ExtrafeesDetails_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExtraFeesDetails",
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
                    ExtraFeesDetailsID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    PaymentDetailsID = table.Column<long>(nullable: false),
                    ExtraFeeChargeMasterID = table.Column<long>(nullable: false),
                    ChargeAmount = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtraFeesDetails", x => x.ExtraFeesDetailsID);
                    table.ForeignKey(
                        name: "FK_ExtraFeesDetails_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExtraFeesDetails_ExtraFeeChargeMaster_ExtraFeeChargeMasterID",
                        column: x => x.ExtraFeeChargeMasterID,
                        principalTable: "ExtraFeeChargeMaster",
                        principalColumn: "ExtraFeeChargeMasterID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExtraFeesDetails_PayementDetails_PaymentDetailsID",
                        column: x => x.PaymentDetailsID,
                        principalTable: "PayementDetails",
                        principalColumn: "PaymentDetailsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExtraFeesDetails_AgencyID",
                table: "ExtraFeesDetails",
                column: "AgencyID");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraFeesDetails_ExtraFeeChargeMasterID",
                table: "ExtraFeesDetails",
                column: "ExtraFeeChargeMasterID");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraFeesDetails_PaymentDetailsID",
                table: "ExtraFeesDetails",
                column: "PaymentDetailsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExtraFeesDetails");
        }
    }
}
