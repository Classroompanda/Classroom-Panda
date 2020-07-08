using System;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{

    public class InvolvedMealFoodItems : BaseEntity, IHasMeta
    {
        [Attr("InvolvedMealFoodItemsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("InvolvedMealFoodItemsID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("MealPlanner")]
        [Attr("MealPlannerID")]
        public long MealPlannerID { get; set; }

        [Required]
        [ForeignKey("FoodType")]
        [Attr("FoodTypeID")]
        public long FoodTypeID { get; set; }

        [Attr("Amount")]
        public long Amount { get; set; }

        [Attr("quantity")]
        public long quantity { get; set; }

        [Required]
        [ForeignKey("MeasureUnitType")]
        [Attr("MeasureUnitTypeID")]
        public long MeasureUnitTypeID { get; set; }

        [Required]
        [ForeignKey("MeasureQuantityType")]
        [Attr("MeasureQuantityTypeID")]
        public long MeasureQuantityTypeID { get; set; }

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
