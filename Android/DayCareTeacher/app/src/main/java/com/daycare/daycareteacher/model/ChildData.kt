package com.daycare.daycareteacher.model

class ChildData() {
    constructor(name: String?, childImgUrl: String?, studentStatus: Int?, pickedBy: String?, droppedBy: String?) : this() {
        this.name = name
        this.childImgUrl = childImgUrl
        this.studentStatus = studentStatus
        this.pickedBy = pickedBy
        this.droppedBy = droppedBy
    }

    var name: String? = null
    var childImgUrl: String? = null
    var studentStatus: Int? = 0
    var pickedBy: String? = null
    var droppedBy: String? =null
}