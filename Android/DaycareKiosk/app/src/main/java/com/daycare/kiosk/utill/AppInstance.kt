package com.daycare.kiosk.utill

import com.daycare.kiosk.model.LoginResponse
import com.daycare.kiosk.model.StudentListResponse

object AppInstance {
    private var appInstance: AppInstance? = null
    var logObj: LoginResponse? = null
    var studentListResponse: StudentListResponse? = null
    var parentPosition:Int?=null

    fun getAppInstance(): AppInstance {
        if (appInstance == null) {
            appInstance = AppInstance()

            /**
             * The object will manage the User information
             */
            logObj = LoginResponse()
        }

        return appInstance as AppInstance
    }

    private operator fun invoke(): AppInstance? {
        return null
    }
}