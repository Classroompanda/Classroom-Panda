using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnAgencyIDToTableTransactionMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AgencyID",
                table: "TransactionMaster",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionMaster_AgencyID",
                table: "TransactionMaster",
                column: "AgencyID");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionMaster_Agency_AgencyID",
                table: "TransactionMaster",
                column: "AgencyID",
                principalTable: "Agency",
                principalColumn: "AgencyID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionMaster_Agency_AgencyID",
                table: "TransactionMaster");

            migrationBuilder.DropIndex(
                name: "IX_TransactionMaster_AgencyID",
                table: "TransactionMaster");

            migrationBuilder.DropColumn(
                name: "AgencyID",
                table: "TransactionMaster");
        }
    }
}
