package com.daycare.kiosk.repository



import com.daycare.kiosk.model.*
import com.daycare.kiosk.utill.WebServices.LOGIN_KIOSK
import com.daycare.kiosk.utill.WebServices.SIGN_UPLOAD
import com.daycare.kiosk.utill.WebServices.STUDENT_LIST
import com.daycare.kiosk.utill.WebServices.UPDATE_STATUS

import io.reactivex.Observable
import io.reactivex.internal.operators.observable.ObservableError
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.*


interface APIService {

    /**

     * @Base APIService interface :  This interface contain the all the mehtods
    of apis (Communicate to  servers with prdefined parameters ).
     **/



    @POST(LOGIN_KIOSK)
    fun loginRequestApi(@Body requestData: LoginRequest): Observable<LoginResponse>

    @POST(STUDENT_LIST)
    fun studentListRequestApi(@Header("Authorization") authHeader:String, @Body requestData: StudentListResponse): Observable<StudentListResponse>


    @POST(UPDATE_STATUS)
    fun updateCheckin(@Header("Authorization")  authHeader:String, @Body requestData: DropInOutRequest): Observable<UpdateStatusResponse>


    @Multipart
    @POST(SIGN_UPLOAD)
    fun postSign(
    @Part("agencyID") id: RequestBody,
    @Part("studentID") studentId: RequestBody,
    @Part("parentID") parentID: RequestBody,
    @Part file1: MultipartBody.Part?,
    @HeaderMap headers: Map<String, String>
    ): Observable<SignData>

}