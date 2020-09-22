using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Student
{
    public class StudentActivityMealFoodItems : BaseEntity, IHasMeta
    {
        [Attr("StudentActivityMealFoodItemsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentActivityMealFoodItemsID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("StudentActivityMeal")]
        [Attr("StudentActivityMealID")]
        public long StudentActivityMealID { get; set; }

        [Required]
        [ForeignKey("FoodType")]
        [Attr("FoodTypeID")]
        public long FoodTypeID { get; set; }

        //[Attr("Amount")]
        //public long ConsumedAmount { get; set; }

        //[Attr("quantity")]
        //public long ConsumedQuantity { get; set; }

        //[Required]
        //[ForeignKey("MeasureUnitType")]
        //[Attr("MeasureUnitTypeID")]
        //public long ConsumedMeasureUnitTypeID { get; set; }

        //[Required]
        //[ForeignKey("MeasureQuantityType")]
        //[Attr("MeasureQuantityTypeID")]
        //public long ConsumedMeasureQuantityTypeID { get; set; }

        [Required]
        [ForeignKey("FoodConsumtion")]
        [Attr("FoodConsumtionID")]
        public long FoodConsumtionID { get; set; }

        [StringLength(100)]
        [ForeignKey("MilkConsumptionQuantity")]
        public string MilkConsumptionQuantity { get; set; }

        public Dictionary<string, object> GetMeta(IJsonApiContext context)
        {
            try
            {
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
            catch (Exception)
            {
                context.PageManager.PageSize = 10;
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
        }
    }

}
