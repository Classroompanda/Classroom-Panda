package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class StudentActivityMealFoodItem {

    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("studentActivityMealID")
     var studentActivityMealID: Int? = null
    @SerializedName("foodTypeID")
     var foodTypeID: Int? = null
    @SerializedName("foodTypeName")
     var foodTypeName: String? = null
    /*@SerializedName("consumedAmount")
     var consumedAmount: Int? = null
    @SerializedName("consumedQuantity")
     var consumedQuantity: Int? = null
    @SerializedName("consumedMeasureUnitTypeID")
     var consumedMeasureUnitTypeID: Int? = null
    @SerializedName("consumedMeasureQuantityTypeID")
     var consumedMeasureQuantityTypeID: Int? = null*/
    @SerializedName("amount")
     var amount: Int? = null
    @SerializedName("quantity")
     var quantity: Int? = null
    @SerializedName("quantityName")
     var quantityName: Any? = null
    @SerializedName("measureUnitTypeID")
     var measureUnitTypeID: Int? = null
    @SerializedName("measureUnitTypeName")
     var measureUnitTypeName: String? = null
    @SerializedName("measureQuantityTypeID")
     var measureQuantityTypeID: Int? = null
    @SerializedName("measureQuantityTypeName")
     var measureQuantityTypeName: String? = null
    @SerializedName("stringId")
     var stringId: Int? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null

    @SerializedName("foodConsumtionID")
    var foodConsumtionID: Int? = null

    @SerializedName("foodConsumtionName")
    var foodConsumtionName: String? = null

    @SerializedName("milkConsumptionQuantity")
    var milkConsumptionQuantity: String? = null





}