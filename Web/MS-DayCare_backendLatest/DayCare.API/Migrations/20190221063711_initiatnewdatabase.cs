using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class initiatnewdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Doses",
                table: "StudentMedication");

            migrationBuilder.DropColumn(
                name: "ConsumedAmount",
                table: "StudentActivityMealFoodItems");

            migrationBuilder.DropColumn(
                name: "ConsumedMeasureQuantityTypeID",
                table: "StudentActivityMealFoodItems");

            migrationBuilder.DropColumn(
                name: "ConsumedMeasureUnitTypeID",
                table: "StudentActivityMealFoodItems");

            migrationBuilder.DropColumn(
                name: "SwappedTeacherID",
                table: "ClassAssignmentLog");

            migrationBuilder.RenameColumn(
                name: "ConsumedQuantity",
                table: "StudentActivityMealFoodItems",
                newName: "FoodConsumtionID");

            migrationBuilder.AddColumn<long>(
                name: "CheckStatus",
                table: "TeacherClassAttendence",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ClassAssignmentLogID",
                table: "TeacherClassAttendence",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "BreakReason",
                table: "TeacherBreakLog",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "BreakStatusID",
                table: "TeacherBreakLog",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "StudentMedication",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "StudentMedication",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DosageQuantityID",
                table: "StudentMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "DoseRepeatID",
                table: "StudentMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "DosageQuantityID",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "DoseRepeatID",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "HowTaken",
                table: "StudentActivityMedication",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StudentMedicationID",
                table: "StudentActivityMedication",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "MilkConsumptionQuantity",
                table: "StudentActivityMealFoodItems",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LikeCount",
                table: "PostActivityVideos",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "LoveCount",
                table: "PostActivityVideos",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ThumbsDownCount",
                table: "PostActivityVideos",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ThumbsUpCount",
                table: "PostActivityVideos",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "LikeCount",
                table: "PostActivityImages",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "LoveCount",
                table: "PostActivityImages",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ThumbsDownCount",
                table: "PostActivityImages",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ThumbsUpCount",
                table: "PostActivityImages",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "GenderID",
                table: "Parent",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "DosageQuantity",
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
                    DosageQuantityID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    DosageQuantityName = table.Column<string>(maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DosageQuantity", x => x.DosageQuantityID);
                });

            migrationBuilder.CreateTable(
                name: "DoseRepeat",
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
                    DoseRepeatID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    DoseRepeatName = table.Column<string>(maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoseRepeat", x => x.DoseRepeatID);
                });

            migrationBuilder.CreateTable(
                name: "StudentBreakLog",
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
                    StudentBreakLogID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    ClassAttendenceID = table.Column<long>(nullable: false),
                    BreakInTime = table.Column<DateTime>(nullable: false),
                    BreakOutTime = table.Column<DateTime>(nullable: false),
                    AttendenceStatusID = table.Column<long>(nullable: false),
                    AttendanceDate = table.Column<DateTime>(nullable: false),
                    DropedById = table.Column<long>(nullable: false),
                    DropedByOtherId = table.Column<long>(nullable: false),
                    PickupById = table.Column<long>(nullable: false),
                    PickupByOtherId = table.Column<long>(nullable: false),
                    ApprovedDropedById = table.Column<long>(nullable: false),
                    ApprovedPickupById = table.Column<long>(nullable: false),
                    DropedByOtherNames = table.Column<string>(maxLength: 100, nullable: true),
                    PickupByOtherName = table.Column<string>(maxLength: 100, nullable: true),
                    BreakStatusId = table.Column<long>(nullable: false),
                    BreakReason = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentBreakLog", x => x.StudentBreakLogID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DosageQuantity");

            migrationBuilder.DropTable(
                name: "DoseRepeat");

            migrationBuilder.DropTable(
                name: "StudentBreakLog");

            migrationBuilder.DropColumn(
                name: "CheckStatus",
                table: "TeacherClassAttendence");

            migrationBuilder.DropColumn(
                name: "ClassAssignmentLogID",
                table: "TeacherClassAttendence");

            migrationBuilder.DropColumn(
                name: "BreakReason",
                table: "TeacherBreakLog");

            migrationBuilder.DropColumn(
                name: "BreakStatusID",
                table: "TeacherBreakLog");

            migrationBuilder.DropColumn(
                name: "DosageQuantityID",
                table: "StudentMedication");

            migrationBuilder.DropColumn(
                name: "DoseRepeatID",
                table: "StudentMedication");

            migrationBuilder.DropColumn(
                name: "DosageQuantityID",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "DoseRepeatID",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "HowTaken",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "StudentMedicationID",
                table: "StudentActivityMedication");

            migrationBuilder.DropColumn(
                name: "MilkConsumptionQuantity",
                table: "StudentActivityMealFoodItems");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "PostActivityVideos");

            migrationBuilder.DropColumn(
                name: "LoveCount",
                table: "PostActivityVideos");

            migrationBuilder.DropColumn(
                name: "ThumbsDownCount",
                table: "PostActivityVideos");

            migrationBuilder.DropColumn(
                name: "ThumbsUpCount",
                table: "PostActivityVideos");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "PostActivityImages");

            migrationBuilder.DropColumn(
                name: "LoveCount",
                table: "PostActivityImages");

            migrationBuilder.DropColumn(
                name: "ThumbsDownCount",
                table: "PostActivityImages");

            migrationBuilder.DropColumn(
                name: "ThumbsUpCount",
                table: "PostActivityImages");

            migrationBuilder.DropColumn(
                name: "GenderID",
                table: "Parent");

            migrationBuilder.RenameColumn(
                name: "FoodConsumtionID",
                table: "StudentActivityMealFoodItems",
                newName: "ConsumedQuantity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "StudentMedication",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "StudentMedication",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "Doses",
                table: "StudentMedication",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ConsumedAmount",
                table: "StudentActivityMealFoodItems",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ConsumedMeasureQuantityTypeID",
                table: "StudentActivityMealFoodItems",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ConsumedMeasureUnitTypeID",
                table: "StudentActivityMealFoodItems",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "SwappedTeacherID",
                table: "ClassAssignmentLog",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
