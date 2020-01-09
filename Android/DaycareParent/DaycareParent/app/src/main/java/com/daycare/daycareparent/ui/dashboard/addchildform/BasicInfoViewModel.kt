package com.daycare.daycareparent.ui.dashboard.addchildform

import android.annotation.SuppressLint
import android.app.Activity
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.graphics.Bitmap
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentBasicInfoFormBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.*
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.util.HashMap

class BasicInfoViewModel : ViewModel() {

    val isLoading = MutableLiveData<Boolean>()
    val countryApiResponse = MutableLiveData<Any>()
    val stateApiResponse = MutableLiveData<StateData>()
    val cityApiResponse = MutableLiveData<Any>()
    val mFirstName = ObservableField<String>()
    val mLastName = ObservableField<String>()
    val mContact = ObservableField<String>()
    val mDob = ObservableField<String>()
    val mAddress = ObservableField<String>()
    val mGender = ObservableField<String>()
    val mCountry = ObservableField<String>()
    val mState = ObservableField<String>()
    val mCity = ObservableField<String>()
    val mZipCode = ObservableField<String>()
    val mPContact = ObservableField<String>()

    val mEmail = ObservableField<String>("")
    val imageUrl = ObservableField<String>("")
    val image = ObservableField<ByteArray>()
    val mImage = ObservableField<Bitmap>()
    val prefferedhosp = ObservableField<String>("")
    val basicInfo = ParentChild()


    //    Get Country List Data API
    fun getCountrylist(view: View) {
        isLoading.value = true
        val body = CountryData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getCountryList(body), object :
            ServiceListener<CountryData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: CountryData, requestcode: Int) {

                countryApiResponse.value = response
                AppInstance.allCountry = response
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }

    fun getStateData(countryID: Int?, view: View) {
//        isLoading.value = true
        val body = StateData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.CountryId = countryID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStateList(body), object :
            ServiceListener<StateData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: StateData, requestcode: Int) {
                isLoading.value = false
//                if(response.data!=null && response.data!!.isNotEmpty()){
                stateApiResponse.value = response
                AppInstance.allState = response
//                    loadStateData(view, TASK_ID, response)
//                }else{
//                    showToast(view.context,"No state data found")
//                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun getCityData(stateID: Int?, view: View) {
//        isLoading.value = true
        val body = CityData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.StateId = stateID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getCityList(body), object :
            ServiceListener<CityData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: CityData, requestcode: Int) {

                AppInstance.allCity = response
                cityApiResponse.value = response
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onClickSaveBtn(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentBasicInfoFormBinding>(view)
        basicInfo.agencyID = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.agencyID
        basicInfo.firstName = mFirstName.get()
        basicInfo.lastName = mLastName.get()
        basicInfo.dateOfBirth = convertDate(mDob.get().toString(), incidentDisplayDate, serverDate)
        if (binding?.radioMale?.isChecked!!) {
            basicInfo.genderID = 1
        } else {
            basicInfo.genderID = 2
        }
        basicInfo.address = mAddress.get()
        basicInfo.postalCode = mZipCode.get()
        basicInfo.physicianContactNumber=mPContact.get()//?.toLong()
        basicInfo.parentEmailAddress = mEmail.get()
        basicInfo.childsContactNumber = mContact.get()//?.toLong()
        basicInfo.countryId = mCountry.get()?.toInt()
        basicInfo.stateId = mState.get()?.toInt()
        basicInfo.cityId = mCity.get()?.toInt()
        basicInfo.physicianName = mEmail.get().toString()
        basicInfo.preferredHospital = prefferedhosp.get().toString()

        if (AppInstance.basicInfo != null) {
            val data = AppInstance.basicInfo
            basicInfo.parentID = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
            basicInfo.id = data?.id
            basicInfo.studentId = data?.studentId
            basicInfo.feePaymentTypeID = data?.feePaymentTypeID
            basicInfo.transportationID = data?.transportationID
            basicInfo.updatedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.loginUserID

        } else {
            basicInfo.parentID = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
            basicInfo.id = 0
            basicInfo.studentId = 0
            basicInfo.feePaymentTypeID = 1
            basicInfo.transportationID = 1
            basicInfo.updatedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.loginUserID
        }
        if (validatedForm(basicInfo, view)) {
            isLoading.value = true
            var imagePath1: String = ""
            if (mImage.get() != null) {
                imagePath1 = bitmapToFile(mImage.get()!!, view.context).toString()
                val bitmapnew = rotateImageIfRequired(mImage.get()!!, bitmapToFile(mImage.get()!!, view.context))
                imagePath1 = bitmapToFile(bitmapnew, view.context).toString()
            }
            uploadImage(view, imagePath1)
        }

    }

    private fun uploadImage(view: View, img1: String) {
        val file1 = File(img1)
        var requestFile1: RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
        var img: MultipartBody.Part = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)

        if (img1.isNotEmpty()) {
            requestFile1 = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
            img = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)


            val manager = NetworkManager()
            val map = HashMap<String, String>()
            map["Accept"] = "application/json"
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).multipleImageUpload1(img, map), object :
                ServiceListener<MultipleImageUploadResponse> {
                override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.postActivityImage = response
                        basicInfo.imagePath = response.data[0]
                        saveChildData(view)


                    } else {
                        Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context,response.message.toString())
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        } else {
            basicInfo.imagePath = imageUrl.get()
            saveChildData(view)
        }
    }

    private fun validatedForm(requestData: ParentChild, view: View): Boolean {
        val binding = DataBindingUtil.findBinding<FragmentBasicInfoFormBinding>(view)

        when {
            requestData.firstName.isNullOrEmpty() -> {
                binding?.fNameTxt?.error = "Enter first name."
                binding?.fNameTxtedt?.requestFocus(R.id.fNameTxtedt)
                binding?.lNameTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.addressTxt?.isErrorEnabled = false
                binding?.zipTxt?.isErrorEnabled = false
                return false
            }
            requestData.lastName.isNullOrEmpty() -> {
                binding?.lNameTxt?.error = "Enter last name."

                binding?.fNameTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.addressTxt?.isErrorEnabled = false
                binding?.zipTxt?.isErrorEnabled = false

                return false
            }
            requestData.childsContactNumber == null -> {
                binding?.phoneTxt?.error = "Enter contact number."

                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.addressTxt?.isErrorEnabled = false
                binding?.zipTxt?.isErrorEnabled = false

                return false
            }
            requestData.dateOfBirth.isNullOrEmpty() -> {
                binding?.dobTxt?.error = "Enter date of birth."

                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.addressTxt?.isErrorEnabled = false
                binding?.zipTxt?.isErrorEnabled = false

                return false
            }
            requestData.address.isNullOrEmpty() -> {
                binding?.addressTxt?.error = "Enter address."

                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.zipTxt?.isErrorEnabled = false

                return false
            }
            requestData.postalCode.isNullOrEmpty() -> {
                binding?.zipTxt?.error = "Enter zip code."

                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.addressTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false

                return false
            }
            requestData.countryId == -1 || requestData.countryId == null -> {
                binding?.countryerr?.visibility = View.VISIBLE
                binding?.cityerr?.visibility = View.GONE
                binding?.stateerr?.visibility = View.GONE
                binding?.addressTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.emailTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                return false
            }
            requestData.stateId == -1 || requestData.stateId == null -> {
                binding?.stateerr?.visibility = View.VISIBLE
                binding?.cityerr?.visibility = View.GONE
                binding?.countryerr?.visibility = View.GONE
                binding?.addressTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.emailTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                return false
            }
            requestData.cityId == -1 || requestData.cityId == null -> {
                binding?.cityerr?.visibility = View.VISIBLE
                binding?.stateerr?.visibility = View.GONE
                binding?.countryerr?.visibility = View.GONE
                binding?.addressTxt?.isErrorEnabled = false
                binding?.phoneTxt?.isErrorEnabled = false
                binding?.emailTxt?.isErrorEnabled = false
                binding?.dobTxt?.isErrorEnabled = false
                binding?.fNameTxt?.isErrorEnabled = false
                binding?.lNameTxt?.isErrorEnabled = false
                return false
            }

            else -> return true
        }


    }

    private fun saveChildData(view: View) {

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveStudent(basicInfo), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
//                    val intent = Intent()
                    basicInfo.studentId = response.saveId
                    basicInfo.id = response.saveId
                    AppInstance.studentId = response.saveId
                    AppInstance.basicInfo = basicInfo
//                    intent.putExtra("data", basicInfo)
//                    (view.context as Activity).setResult(Activity.RESULT_OK, intent)
//                    (view.context as Activity).finish()
                }
                isLoading.value = false


            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                isLoading.value = false
                showToast(view.context,error.error_message)
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onClickDob(view: View) {
        datepicker(view.context, view as TextInputEditText)
        hideSoftKeyboard(view.context, view)
    }

    fun closeKeyboard(view: View) {
        hideSoftKeyboard(view.context, view)
    }

}