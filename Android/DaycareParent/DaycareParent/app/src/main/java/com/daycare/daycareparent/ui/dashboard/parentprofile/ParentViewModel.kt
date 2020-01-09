package com.daycare.daycareparent.ui.dashboard.parentprofile

import android.annotation.SuppressLint
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.graphics.Bitmap
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentParentBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.*
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.util.HashMap

class ParentViewModel : ViewModel() {

    val firstName = ObservableField<String>()
    val lastName = ObservableField<String>()
    val gender = ObservableField<String>()
    val dob = ObservableField<String>()
    val email = ObservableField<String>("")
    val contact = ObservableField<String>()
    val profession = ObservableField<String>()
    val address = ObservableField<String>()
    val relation = ObservableField<Int>()
    var country = ObservableField<Int>()
    val state = ObservableField<Int>()
    val city = ObservableField<Int>()
    val zipCode = ObservableField<String>()
    val employerNumber= ObservableField<String>()
    val employerName= ObservableField<String>()

    val imageUrl = ObservableField<String>("")
    val image = ObservableField<ByteArray>()
    val mImage = ObservableField<Bitmap>()
    val isLoading = MutableLiveData<Boolean>()
    val getParentDataResponse = MutableLiveData<ParentModel>()
    val requestData = ParentData()
    var data: Data? = Data()
    val updatedParentApi = MutableLiveData<Data>()

    fun onClickSubmit(view: View) {
        val bind = DataBindingUtil.findBinding<FragmentParentBinding>(view)
        data = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)
        requestData.address = address.get()
        requestData.stateId = state.get()
        requestData.cityId = city.get()
        requestData.countryId = country.get()
        requestData.id = getParentDataResponse.value?.data?.id
        requestData.userID = getParentDataResponse.value?.data?.userID
        requestData.agencyID = data?.agencyID
        requestData.imagePath = ""
        requestData.associatedChild = getParentDataResponse.value?.data?.associatedChild
        requestData.emailId = email.get()
        requestData.profession = profession.get()
        requestData.postalCode = zipCode.get()
        requestData.employerName=employerName.get()
        requestData.employerNumber=employerNumber.get()?.toLong()

        requestData.dateOfBirth = convertDate(dob.get().orEmpty(), incidentDisplayDate, serverDate)
        requestData.firstName = firstName.get()
        requestData.isAuthorizedToPickup = bind?.radioYes?.isChecked
        requestData.lastName = lastName.get()
        requestData.genderID = 2
        requestData.isParent = getParentDataResponse.value?.data?.isParent
        requestData.isSecondaryParent = getParentDataResponse.value?.data?.isSecondaryParent
        requestData.isGaurdian = getParentDataResponse.value?.data?.isGaurdian
        requestData.updatedBy = PreferenceConnector.readUser(view.context,PreferenceConnector.USER)?.loginUserID


        if (bind?.idIsMale?.isChecked!!) {
            requestData.genderID = 1
        }
        requestData.mobile = contact.get()
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
                        requestData.imagePath = response.data[0]
                        updateParentProfile(requestData, view)

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
            updateParentProfile(requestData, view)
        }
    }

    private fun updateParentProfile(requestData: ParentData, view: View) {
//Api saveParentInfo
        if (isLoading.value != true) {

            isLoading.value = true

            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveParentInfo(requestData), object :
                ServiceListener<BaseModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: BaseModel, requestcode: Int) {
                    isLoading.value = false
                    if (response.statusCode == ResponseCodes.Success) {
                        data?.imagePath = requestData.imagePath
                        data?.firstName = requestData.firstName
                        data?.lastName = requestData.lastName
                        updatedParentApi.value = data
                    }
// else {
                    showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
//                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }

    }

    private fun validatedForm(requestData: ParentData, binding: FragmentParentBinding): Boolean {
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
            requestData.relationTypeId == 0 || requestData.relationTypeId == null -> {
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
            requestData.countryId == -1 || requestData.countryId == null -> {
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
            requestData.stateId == -1 || requestData.stateId == null -> {
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
            requestData.cityId == -1 || requestData.cityId == null -> {
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

    fun onClickDob(view: View) {
        datepicker(view.context, view as TextInputEditText)
        hideSoftKeyboard(view.context, view)

    }
//    getParentInformation

    fun getParentInfoApi(context: Context, data: ParentData) {
        if (isLoading.value != true) {
            isLoading.value = true

            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(context).getParentInformation(data), object :
                ServiceListener<ParentModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: ParentModel, requestcode: Int) {
                    isLoading.value = false
                    if (response.statusCode == ResponseCodes.Success) {
                        getParentDataResponse.value = response
                    } else {
                        showDialog(context, context.getString(R.string.app_name), response.message.toString())
                    }


                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(context, context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }
    }

    fun setFormData(
        data: ParentData,
        view: View
    ) {
        val bind = DataBindingUtil.findBinding<FragmentParentBinding>(view)
        firstName.set(data.firstName)
        lastName.set(data.lastName)
        dob.set(data.dateOfBirth?.let { convertDate(it, alohaDate, incidentDisplayDate) })
        email.set(data.emailId)
        profession.set(data.profession)
        contact.set(data.mobile)
        address.set(data.address)
        zipCode.set(data.postalCode)
        employerNumber.set(data.employerNumber.toString())
        employerName.set(data.employerName)
        imageUrl.set(data.imagePath)
        if (data.genderID == 1) {
            bind?.idIsMale?.isChecked = true
        } else {
            bind?.idIsFemale?.isChecked = true
        }


    }

}