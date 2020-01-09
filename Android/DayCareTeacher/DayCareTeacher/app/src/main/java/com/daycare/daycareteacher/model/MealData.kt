package com.daycare.daycareteacher.model

class MealData(
    id: String,
    startDate: String,
    endDate: String,
    className: String,
    foodType: String,
    category: String,
    amount: String,
    quantity: String,
    qtyType: String,
    description: String,
    startTime: String,
    endTime: String
) {
    var id: String? = id
    var startDate: String? = startDate
    var endDate: String? = endDate
    var className: String? = className
    var foodType: String? = foodType
    var category: String? = category
    var startTime: String? = startTime
    var endTime: String? = endTime
    var amount: String? = amount
    var quantity: String? = quantity
    var qtyType: String? = qtyType
    var description: String? = description

}