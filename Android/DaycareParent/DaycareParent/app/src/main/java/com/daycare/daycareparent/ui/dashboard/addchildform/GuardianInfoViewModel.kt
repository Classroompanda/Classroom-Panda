package com.daycare.daycareparent.ui.dashboard.addchildform

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.graphics.Bitmap
import android.support.design.widget.TextInputEditText
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddGuardianBinding
import com.daycare.daycareparent.databinding.FragmentParentBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.dashboard.activities.AddGuardianActivity
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.ADD_TASK
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.util.HashMap

class GuardianInfoViewModel : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val guardianRecords = ObservableField<String>("0")
    val guardianData = MutableLiveData<ParentData>()
    val relationApiResponse = MutableLiveData<RelationType>()
    val status = ObservableField<Int>(ADD_TASK)
    val gurdiandata = ObservableField<ParentData>()
    val image = ObservableField<ByteArray>()
    val mImage = ObservableField<Bitmap>()
    val imageUrl = ObservableField<String>("")
    //    val requestData = GuardianData()
    val requestData = ParentData()
    var country = ObservableField<Int>()
    val state = ObservableField<Int>()
    val city = ObservableField<Int>()
    val onImageUpload = MutableLiveData<GuardianData>()

    fun onClickUploadProfile(view: View) {
        if (ContextCompat.checkSelfPermission(
                (view.context as Activity),
                Manifest.permission.CAMERA
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(view.context as Activity, arrayOf(Manifest.permission.CAMERA), 1001)

        }

        val chooseImageIntent = ImagePicker.getPickImageIntent(view.context)
        (view.context as Activity).startActivityForResult(chooseImageIntent, OptionConstant.PICK_IMAGE_ID)
    }

    //    fun onClickSubmit(view: View) {
//        val bind = DataBindingUtil.findBinding<ActivityAddGuardianBinding>(view)
//        val data = AppInstance.basicInfo
//        requestData.address = bind?.addressTxtedt?.text?.toString()
//        requestData.stateId = 0
//        requestData.cityId = 0
//        requestData.countryId = 0
//        requestData.guardianId = 0
//        requestData.id = 0
//        if (gurdiandata.get() != null) {
//            requestData.guardianId = gurdiandata.get()?.guardianId
//            requestData.id = gurdiandata.get()?.guardianId
//        }
//        requestData.studentID = data?.studentId
//        requestData.agencyID = data?.agencyID
//        requestData.imagePath = ""
//        requestData.firstName = bind?.fNameTxtedt?.text.toString()
//        requestData.isAuthorizedToPickup = bind?.radioYes?.isChecked
//        requestData.lastName = bind?.lNameTxtedt?.text.toString()
//        requestData.mobile = bind?.phoneTxtedt?.text.toString()
//        requestData.reasonNotToAllow = bind?.reasonTxtedt?.text.toString()
//        requestData.relationTypeId = bind?.relationTxt?.selectedItemPosition
//        if (validatedForm(requestData, bind!!)) {
//            var imagePath1: String = ""
//            if (mImage.get() != null) {
//                imagePath1 = bitmapToFile(mImage.get()!!, view.context).toString()
//                val bitmapnew = rotateImageIfRequired(mImage.get()!!, bitmapToFile(mImage.get()!!, view.context))
//                imagePath1 = bitmapToFile(bitmapnew, view.context).toString()
//            }
////            uploadImage(view, imagePath1)
//
//        }
//
//    }
    fun onClickSubmit(view: View) {
        val bind = DataBindingUtil.findBinding<ActivityAddGuardianBinding>(view)
        val data = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)
        val child = AssociatedChild()
        val childList = ArrayList<AssociatedChild>()
        child.studentID = AppInstance.basicInfo?.studentId
        childList.add(child)
        requestData.address = bind?.addressTxtedt?.text?.toString()
        requestData.stateId = state.get()
        requestData.cityId = city.get()
        requestData.countryId = country.get()
        requestData.id = 0
        requestData.userID = 0
        requestData.agencyID = data?.agencyID
        requestData.imagePath = ""
        requestData.associatedChild = childList
        requestData.emailId = bind?.emailTxtedt?.text?.toString()
        requestData.profession = bind?.professTxtedt?.text?.toString()
        requestData.postalCode = bind?.zipTxtedt?.text?.toString()
        requestData.dateOfBirth =
            convertDate(bind?.dobTxtedt?.text?.toString().orEmpty(), incidentDisplayDate, serverDate)
        requestData.firstName = bind?.fNameTxtedt?.text?.toString()
        requestData.isAuthorizedToPickup = bind?.radioYes?.isChecked
        requestData.lastName = bind?.lNameTxtedt?.text?.toString()
        requestData.genderID = 2
        requestData.isParent = false
        requestData.isSecondaryParent = false
        requestData.isGaurdian = true
        requestData.addedByID = data?.releventUserID
//        requestData.createdBy = data?.releventUserID

        if (gurdiandata.get() != null) {
            requestData.id = gurdiandata.get()?.id
            requestData.userID = gurdiandata.get()?.userID
            requestData.associatedChild = gurdiandata.get()?.associatedChild
            requestData.updatedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.loginUserID
        } else {
            requestData.createdBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.loginUserID
        }
        if (bind?.idIsMale?.isChecked!!) {
            requestData.genderID = 1
        }
        requestData.mobile = bind.phoneTxtedt.text?.toString()
        requestData.relationTypeId = bind.relationTxt.selectedItemPosition

        if (validatedForm(requestData, bind)) {
            var imagePath1: String = ""
            if (mImage.get() != null) {
                imagePath1 = bitmapToFile(mImage.get()!!, view.context).toString()
                val bitmapnew = rotateImageIfRequired(mImage.get()!!, bitmapToFile(mImage.get()!!, view.context))
                imagePath1 = bitmapToFile(bitmapnew, view.context).toString()
            }
            uploadImage(view, imagePath1)

        }
    }


    fun onClickDob(view: View) {
        datepicker(view.context, view as TextInputEditText)
        hideSoftKeyboard(view.context, view)
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
                        requestData.imagePath = response.data[0]

                        addGuardian(requestData, view)


                    } else {
                        Log.i("Error", response.statusCode.toString() + response.message)
//                    showToast(view.context, "No Data Found!!")
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        } else {
            requestData.imagePath = imageUrl.get()
            addGuardian(requestData, view)
        }
    }

    private fun validatedForm(
        requestData: ParentData,
        binding: ActivityAddGuardianBinding
    ): Boolean {
        when {
            requestData.firstName.isNullOrEmpty() -> {
                binding.fNameTxt.error = "Please enter first name."
                binding.fNameTxtedt.requestFocus(R.id.fNameTxtedt)
                binding.lNameTxt.isErrorEnabled = false
                binding.phoneTxt.isErrorEnabled = false
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false


                return false
            }
            requestData.lastName.isNullOrEmpty() -> {
                binding.lNameTxt.error = "Please enter last name."
                binding.lNameTxtedt.requestFocus(R.id.lNameTxtedt)
                binding.fNameTxt.isErrorEnabled = false
                binding.phoneTxt.isErrorEnabled = false
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false


                return false
            }
            requestData.dateOfBirth.isNullOrEmpty() -> {
                binding.dobTxt.error = "Please enter Date of birth."
                binding.dobTxtedt.requestFocus(R.id.dobTxtedt)
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }
            requestData.emailId.isNullOrEmpty() -> {
                binding.emailTxt.error = "Please enter email Id."
                binding.emailTxtedt.requestFocus(R.id.emailTxtedt)
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }
            requestData.mobile.isNullOrEmpty() -> {
                binding.phoneTxt.error = "Please enter phone number."
                binding.phoneTxtedt.requestFocus(R.id.phoneTxtedt)
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false


                return false
            }
            requestData.relationTypeId == 0 -> {
                binding.relationerr.visibility = View.VISIBLE
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                binding.phoneTxt.isErrorEnabled = false
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false

                return false
            }
            requestData.address.isNullOrEmpty() -> {
                binding.addressTxt.error = "Please enter address"
                binding.phoneTxtedt.requestFocus(R.id.phoneTxtedt)
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }
            requestData.countryId == -1 -> {
                binding.countryerr.visibility = View.VISIBLE
                binding.cityerr.visibility = View.GONE
                binding.stateerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }
            requestData.stateId == -1 -> {
                binding.stateerr.visibility = View.VISIBLE
                binding.cityerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }
            requestData.cityId == -1 -> {
                binding.cityerr.visibility = View.VISIBLE
                binding.stateerr.visibility = View.GONE
                binding.countryerr.visibility = View.GONE
                binding.addressTxt.isErrorEnabled = false
                binding.relationerr.visibility = View.GONE
                binding.phoneTxt.isErrorEnabled = false
                binding.emailTxt.isErrorEnabled = false
                binding.dobTxt.isErrorEnabled = false
                binding.fNameTxt.isErrorEnabled = false
                binding.lNameTxt.isErrorEnabled = false
                return false
            }

            else -> return true
        }
    }

    fun addGuardian(info: ParentData, view: View) {
        if (isLoading.value != true) {

            isLoading.value = true

            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveParentInfo(info), object :
                ServiceListener<BaseModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: BaseModel, requestcode: Int) {
                    isLoading.value = false

                    if (response.statusCode == ResponseCodes.Success) {
                        guardianData.value = info
                        showToast(view.context, response.message.toString())
                    } else {
                        showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)

                }
            })


        }

    }

    fun getRelation(context: Context) {
        isLoading.value = true
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getRelationType(data), object :
            ServiceListener<RelationType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: RelationType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    relationApiResponse.value = response

                }
                isLoading.value = false

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false

            }
        })


    }

    fun deleteGuardian(data: GuardianData, view: View) {
        val value = GuardianData()
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
        value.isDeleted = true
        value.agencyID = data.agencyID
        value.firstName = data.firstName
        value.guardianId = data.guardianId
        value.id = data.guardianId
        value.studentID = data.studentID
        value.lastName = data.lastName
        value.deletedDate = convertDate(getCurrentDate(), displayDate, serverDate)
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.loginUserID

//            addGuardian(value, view)
    }

    val guardianListApi = MutableLiveData<GuardianListModel>()

    //getParentAccToLogin
    fun getGuardianList(context: Context) {
        isLoading.value = true
        val user = PreferenceConnector.readUser(context, PreferenceConnector.USER)
        val data = ParentData()
        data.agencyID = user?.agencyID
        data.isGaurdian = user?.isGaurdian
        data.isSecondaryParent = user?.isSecondaryParent
        data.isParent = user?.isParent
        data.parentID = user?.releventUserID

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getParentAccToLogin(data), object :
            ServiceListener<GuardianListModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: GuardianListModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    guardianListApi.value = response
                } else {
                    showDialog(context, context.getString(R.string.app_name), response.message.toString())
                }
                isLoading.value = false

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showDialog(context, context.getString(R.string.app_name), error.error_message)

            }
        })


    }

}