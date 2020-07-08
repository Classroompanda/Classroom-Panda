using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedAgencyIDinExtraFeeChargeMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExtraFeeChargeMaster_Agency_AgencyID",
                table: "ExtraFeeChargeMaster");

            migrationBuilder.AlterColumn<long>(
                name: "AgencyID",
                table: "ExtraFeeChargeMaster",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ExtraFeeChargeMaster_Agency_AgencyID",
                table: "ExtraFeeChargeMaster",
                column: "AgencyID",
                principalTable: "Agency",
                principalColumn: "AgencyID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExtraFeeChargeMaster_Agency_AgencyID",
                table: "ExtraFeeChargeMaster");

            migrationBuilder.AlterColumn<long>(
                name: "AgencyID",
                table: "ExtraFeeChargeMaster",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_ExtraFeeChargeMaster_Agency_AgencyID",
                table: "ExtraFeeChargeMaster",
                column: "AgencyID",
                principalTable: "Agency",
                principalColumn: "AgencyID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
