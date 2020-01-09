package com.daycare.kiosk.utill


/*val IS_CHECKED_IN = 3
val IS_CHECKED_OUT = 4
val IS_CHECKED_ABSENT = 5
val IS_TO_BE_CHECKED = 2
val IS_BREAK_OUT=6
val IS_BREAK_IN=7*/

val IS_TO_BE_CHECKED = 0
val IS_CHECKED_IN = 1
val IS_BREAK_OUT=2
val IS_BREAK_IN=3
val IS_CHECKED_OUT = 4







object WebServices {
    var IMAGE_URL = "http://75.126.168.31:9942/"
    //var WS_Staging_URL = "https://www.stagingwin.com:9943/api/"
    var WS_Staging_URL="https://www.stagingwin.com:9943/api/"
    //" https://schoolpandaapp.azurewebsites.net/api/"

// "https://www.stagingwin.com:9943/api/"

    //  var IMAGE_URL="http://75.126.168.31:9189/"
    // var WS_Staging_URL = "http://75.126.168.31:9189/api/"

    const val LOGIN_KIOSK ="User/loginforKioskApp"
    const val STUDENT_LIST="Agency/GetAllStudentsforKioskApp"
    const val UPDATE_STATUS="Agency/SaveKioskeStudentSignInDetailsInformation"
    const val SIGN_UPLOAD="Parent/SaveParentSignatureDetails"
}