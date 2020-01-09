package com.daycare.daycareteacher.model

class ClassStatusData() {

    constructor(className: String?, startTime: String?, endTime: String?, checkedInStatus: Int?, classImgUrl: String?) : this() {
        this.className = className
        this.startTime = startTime
        this.endTime = endTime
        this.checkedInStatus = checkedInStatus
        this.classImgUrl = classImgUrl
    }

    var className: String? = null
    var startTime: String? = null
    var endTime: String? = null
    var checkedInStatus: Int? = null
    var classImgUrl: String? = null
}