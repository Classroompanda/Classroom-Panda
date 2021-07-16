package com.daycare.daycareteacher.model

class EventData(id:String?,startDate: String?, endDate: String?,title: String? ,className: String?, category: String?, description: String?,startTime:String?,endTime:String?,plannerRepeatTypeName:String?,plannerRepeatTypeID:Int?,endsOn:String?)

{
    //var id:Int?=id
    //var startDate: String? = startDate
    //var endDate: String? = endDate
    //var title: String? = title
    //var className: String? = className
    //var category: String? = category
    //var description: String? = description
    //var startTime:String? = startTime
    //var endTime:String? = endTime

    var id:Int?=null
    var startDate: String? = startDate
    var endDate: String? = endDate
    var title: String? = title
    var className: String? = className
    var category: String? = category
    var description: String? = description
    var startTime:String? = startTime
    var endTime:String? = endTime
    var plannerRepeatTypeName:String?=plannerRepeatTypeName

    var plannerRepeatTypeID:Int?=plannerRepeatTypeID
    var endsOn:String?=endsOn
}