package com.daycare.daycareteacher.model

class TeacherDataSample() {

    constructor(teacherName: String?, imgUrl: String?, clockedin: String?, data: List<ClassStatusData>) : this() {
        this.teacherName = teacherName
        this.imgUrl = imgUrl
        this.clockedin = clockedin
        this.data = data
    }

    var teacherName: String? = null
    var imgUrl: String? = ""
    var clockedin: String? = null
    var data: List<ClassStatusData>? = null

}