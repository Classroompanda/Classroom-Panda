package com.daycare.daycareteacher.ui.profile

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.daycareteacher.databinding.FragmentBreakLogBinding
import com.daycare.daycareteacher.databinding.FragmentProfileUpdateBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.utill.*
import com.google.android.material.textfield.TextInputEditText
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

class ProfileViewModel() : ViewModel() {

    constructor(view: View, taskId: Int) : this() {
        getProfile(view)
    }

    val isLoading = MutableLiveData<Boolean>()
    var TASK_ID = OptionConstant.VIEW_LOG
    var dateofBirth = ObservableField<String>()
    var dateofHiring = ObservableField<String>()
    var firstName = ObservableField<String>()
    var lastName = ObservableField<String>()
    var emailID = ObservableField<String>()
    var mobile = ObservableField<String>()
    var address = ObservableField<String>()
    var country = ObservableField<Int>()
    var state = ObservableField<Int>()
    var city = ObservableField<Int>()

    val mCountry = ObservableField<String>()
    val mState = ObservableField<String>()
    val mCity = ObservableField<String>()

    var zip = ObservableField<String>()
    var grossPay = ObservableField<String>()
    var certification = ObservableField<String>()
    var homephone = ObservableField<String>()
    val profileApiResponse = MutableLiveData<Any>()
    val countryApiResponse = MutableLiveData<Any>()
    val stateApiResponse = MutableLiveData<StateData>()
    val cityApiResponse = MutableLiveData<Any>()
    val myBreakLogReportApiResponce = MutableLiveData<MyBreakLogModel>()
    var mSelectedDate = getCurrentDateTime()
    val todaysDate = Calendar.getInstance().time!!
    val viewId = BREAKLOGACTIVITY
    var selectedDate = MutableLiveData<String>()
    val image = ObservableField<ByteArray>()

    private fun getProfile(view: View) {
        TASK_ID = OptionConstant.EDIT
        isLoading.value = true
        val body = GetProfileRequest()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.teacherID =AppInstance.getUser(view.context)?.releventUserID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getProfileDetail(body), object :
            ServiceListener<ProfileData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ProfileData, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data != null) {
                    // countryApiResponse.value = response
                    AppInstance.profileDetail = response
                    // firstName.set(AppInstance.profileDetail!!.data?.firstName)
                    profileApiResponse.value = response

                    //loadClassData(view, TASK_ID, response)
                    // isLoading.value = false


                } else {
                    showToast(view.context, "No Data Found!!")
                    isLoading.value = false
                }
//                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentBreakLogBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String

        mDatePicker =
            DatePickerDialog(view.context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year
                try {
                    // val mdate = displayDate.parse(mDate)
                    val mdate = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault()).parse(mDate)

                    binding!!.dateTxt.text = numDate.format(mdate)
                    binding.weekDayTxt.text = dayofWeek.format(mdate)
                    binding.monthYrTxt.text = monthYear.format(mdate)

                    selectedDate.value = mDate
                   // mSelectedDate = mDate    // 4-12-2021
                    mSelectedDate = alohaDate.format(convertStringToDateWithoutTimeZone(mDate))
                    // 2021-02-07T00:00:00Z
                    var mCurrentTime :String = c.time.toString().substring(11,20)


                    // 2021-04-13 22:30:29
                    mSelectedDate=  mSelectedDate.replace("T"," ")
                    var newDate = getServerDate(mSelectedDate.replaceAfter(" ",mCurrentTime))

                    if(newDate.contains("00:00:00")){
                        newDate=  newDate.toString().replace("00:00:00",mCurrentTime)
                    }
// 2021-04-12T03:28:54.800Z
                    getBreakLogReportData(newDate,view)

                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }
            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        mDatePicker.show()
    }

    fun getCountrylist(view: View) {
        isLoading.value = false
        val body = CountryData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getCountryList(body), object :
            ServiceListener<CountryData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: CountryData, requestcode: Int) {
                isLoading.value = false
//                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!! && response.data!!.size>0) {
                countryApiResponse.value = response
                // AppInstance.allCountry = response
                //loadClassData(view, TASK_ID, response)
                isLoading.value = false
                //loadCountryData(view, TASK_ID, response)

//                } else {
//                    showToast(view.context, "No Data Found!!")
//                    isLoading.value = false
//                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onClickAddPFBtn(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentProfileUpdateBinding>(view)
        val intent = Intent()
        val data = Bundle()

        if (AppInstance.profileimagePath?.isNotEmpty()!! && AppInstance.profileimagePath != null) {
            if(!AppInstance.profileimagePath!!.contains("https")||!AppInstance.profileimagePath!!.contains("http")){
                val imagePath = AppInstance.profileimagePath
                val file1 = File(imagePath)
                val manager = NetworkManager()
                val map = HashMap<String, String>()
                map["Accept"] = "application/json"
                isLoading.value = true
                val requestFile1 = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
                val imagenPerfil1 = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)

                manager.createApiRequest(ApiUtilis.getAPIService(view.context).postQuestion(imagenPerfil1, map), object :
                    ServiceListener<UploadProfileImage> {
                    override fun getServerResponse(response: UploadProfileImage, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            isLoading.value = false
                            AppInstance.profileDetail?.data?.imagePath = response.data

                            updateProfile(view)

                        } else {
                            isLoading.value = false
                            Log.i("Error", response.statusCode.toString() + response.message)
                            showToast(view.context, "No Data Found!!")
                        }

                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        isLoading.value = false
                        Log.e("Error", error.error_message)
//                        isLoading.value = false
                    }
                })
            }else {
                AppInstance.profileimagePath=AppInstance.profileDetail?.data?.imagePath
                updateProfile(view)
            }


        } else {
            AppInstance.profileimagePath=AppInstance.profileDetail?.data?.imagePath
            updateProfile(view)
        }

    }

    private fun updateProfile(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentProfileUpdateBinding>(view)
        // val cityData = AppInstance.allCity?.data
        // val stateData = AppInstance.allState?.data
        // val countryData = AppInstance.allCountry?.data
        val profileData = TeacherData()
        isLoading.value = true
        val manager = NetworkManager()
        profileData.id = AppInstance?.profileDetail?.data?.id
        profileData.agencyID = AppInstance.getUser(view.context)?.agencyID
        profileData.firstName = binding?.edtfirstname?.text.toString()
        profileData.lastName = binding?.edtlastname?.text.toString()
        profileData.certification = binding?.edtcertification?.text.toString()
        profileData.address = binding?.edtaddress?.text.toString()
        profileData.cityId = city.get()
        profileData.stateId = state.get()
        profileData.countryId = country.get()
        profileData.email = binding?.edtemail?.text.toString()

        profileData.mPhoneNumber = binding?.edtmobile?.text.toString()
        //java.lang.Long.parseLong(binding?.edtmobile?.text.toString())
        //profileData.homePhone = binding?.edthomephone?.text.toString()
        profileData.mHomePhone=binding?.edthomephone?.text.toString()
        //java.lang.Long.parseLong(binding?.edthomephone?.text.toString())
        profileData.grossPayPerHour = AppInstance?.profileDetail?.data?.grossPayPerHour
        profileData.dateHired = convertDate(binding?.edtdoh?.text.toString(), incidentDisplayDate, serverDate)
        profileData.dateOfBirth = convertDate(binding?.edtdob?.text.toString(), incidentDisplayDate, serverDate)
        profileData.postalCode = binding?.edtzip?.text.toString()
        profileData.imagePath = AppInstance.profileDetail?.data?.imagePath


        profileData.updatedBy = AppInstance.getUser(view.context)?.loginUserID
        if (validated(profileData, view)) {

            manager.createApiRequest(ApiUtilis.getAPIService(view.context).updateProfile(profileData), object :
                ServiceListener<BaseModel> {
                override fun getServerResponse(response: BaseModel, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.imageChangedOnProfile =  AppInstance.profileDetail?.data?.imagePath
                        AppInstance.fnameChangedOnProfile = profileData.firstName
                        AppInstance.lnameChangedOnProfile = profileData.lastName
                        AppInstance.emailChangedOnProfile = profileData.email

                        isLoading.value = false

                        (view.context as Activity).setResult(Activity.RESULT_OK)
                        (view.context as Activity).finish()

                    } else {
                        isLoading.value = false
                        Log.i("Error", response.statusCode.toString() + response.message)
                        //showToast(view.context, "No Data Found!!")

                        (view.context as Activity).setResult(Activity.RESULT_OK)
                        (view.context as Activity).finish()
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        }

    }

    private fun validated(profileData: TeacherData, view: View): Boolean {
        when {
            profileData.firstName.isNullOrEmpty() -> {
                showToast(view.context, "Please enter first name")
                return false
            }
            profileData.lastName.isNullOrEmpty() -> {
                showToast(view.context, "Please enter last name")
                return false
            }
            profileData.email.isNullOrEmpty() -> {
                showToast(view.context, "Please enter email id")
                return false
            }
            profileData.mPhoneNumber.toString().isNullOrEmpty() -> {
                showToast(view.context, "Please enter phone no.")
                return false
            }
            profileData.address.isNullOrEmpty() -> {
                showToast(view.context, "Please enter address")
                return false
            }
            profileData.postalCode.toString().isNullOrEmpty() -> {
                showToast(view.context, "Please enter zip code")
                return false
            }
            profileData.dateHired.toString().isNullOrEmpty() -> {
                showToast(view.context, "Please enter hired date")
                return false
            }
            profileData.dateOfBirth.toString().isNullOrEmpty() -> {
                showToast(view.context, "Please enter date of birth")
                return false
            }

            else -> return true
        }
    }


    fun getStateData(countryID: Int?, view: View) {
        val body = StateData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.CountryId = countryID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStateList(body), object :
            ServiceListener<StateData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: StateData, requestcode: Int) {
                isLoading.value = false
                stateApiResponse.value = response
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun getCityData(stateID: Int?, view: View) {
        val body = CityData()
        val manager = NetworkManager()
        body.agencyID =AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.StateId = stateID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getCityList(body), object :
            ServiceListener<CityData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: CityData, requestcode: Int) {

//                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!! && response.data!!.size>0) {
                // AppInstance.allCity = response
                cityApiResponse.value=response
                isLoading.value = false

                //  loadCityData(view, TASK_ID, response)

//                } else {
//                    showToast(view.context, "No Data Found!!")
//                    isLoading.value = false
//                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onClickDateofBirth(view: View) {
        datepicker(view.context, view as TextInputEditText)
    }

    fun onClickDateofhiring(view: View) {
        datepicker(view.context, view as TextInputEditText)
    }

    fun getBreakLogDataRequest(view: View) {
        var newDate = getServerDate(mSelectedDate)
        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)

        if(newDate.contains("00:00:00")){
            newDate=  newDate.toString().replace("00:00:00",mCurrentTime)
        }
        getBreakLogReportData(newDate,view)
        // getBreakLogReportData(getServerDate(mSelectedDate), view)
    }

    fun getBreakLogReportData(date: String, view: View) {
        isLoading.value = true
        val body = MyBreakLogModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID

        if(date.contains("Z")||date.contains("T")){
            body.askingDate = date//getServerDate(date)
        }else{
            body.askingDate = convertDateUTC(date, displayDate, postserverDate)//getServerDate(date)
        }
        body.teacherID = AppInstance.getUser(view.context)?.releventUserID
        body.askedDateString = convertUtcToLocal(body.askingDate.toString(), alohaDate, reservationDate)

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllMyBreak(body), object :
            ServiceListener<MyBreakLogModel> {
            override fun getServerResponse(response: MyBreakLogModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    myBreakLogReportApiResponce.value = response
//                    AppInstance.allAttendanceData = response
                    Log.i("Response GetAttendence=", response.message.toString())
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }
}