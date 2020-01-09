package com.daycare.daycareteacher.ui.dashboard.fragments.postactivity

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Intent
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.AdapterView
import android.widget.LinearLayout
import android.widget.SearchView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAddPostActivityBinding
import com.daycare.daycareteacher.databinding.FragmentPostActivityBinding
import com.daycare.daycareteacher.databinding.MultiselectDialogBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.activities.PostActivityDetailActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.ChooseStudentsAdapter
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class PostActivityViewModel() : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val todaysDate = Calendar.getInstance().time!!
    val viewId = POSTACTIVITY
    private lateinit var masterView: View
    val classApiResponse = MutableLiveData<ClassModel>()
    var mSelectedDate = getCurrentDateTime()
    var mClassId = 0
    val postActivityApiResponse = MutableLiveData<PostActivityStudentList>()
    var selectedDate = MutableLiveData<String>()
    private lateinit var data: PostActivityStudentData

    private lateinit var dataVideo: PostActivityStudentData.PostActivityVideo
    var position: Int = 0
    val studentApiResponse = MutableLiveData<StudentModel>()
    var allInvolvedStudent = MutableLiveData<ArrayList<String>>()
    var selectedStudentsList = ArrayList<String>()
    var isPublic = ObservableField<Boolean>()
    var selectedClassList = ArrayList<String>()


    /*
    * Adapter methods
    */
    constructor(childData: PostActivityStudentData, position: Int) : this() {
        this.data = childData
        /* imgUrl.set(data.imagePath)
         studentName.set(data.studentName)
         className.set(data.className)*/
        this.position = position


    }

    /*
   * Image Adapter methods
   */
    constructor(
        childData: ArrayList<PostActivityStudentData>?, position: Int,
        tag: String
    ) : this() {
        //  this.dataImage = childData
        /* imgUrl.set(data.imagePath)
         studentName.set(data.studentName)
         className.set(data.className)*/
        this.position = position


    }


    constructor(view: View) : this() {
        val c = Calendar.getInstance().getTime()
        println("Current time => $c")

        val df = SimpleDateFormat("dd MMM yyyy")
        var formattedDate = df.format(c)
        //incidentDate.set(formattedDate)

        getAddFormClassData(view)
    }


    fun onClickStudentCard(view: View) {

        val intent = Intent(view.context, PostActivityDetailActivity::class.java)
        intent.putExtra("POSITION", position.toString())
        intent.putExtra("SelectedDate", mSelectedDate)
        view.context.startActivity(intent)

    }


    fun deletePostActivity(view: View, id: Int?, position: Int) {
        isLoading.value = true

        val body = PostActivityModel()
        isLoading.value = true
        val manager = NetworkManager()
        val classList = AppInstance.allClasses?.data
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classesID = AppInstance.postActivityDetailData?.get(position)?.classesID
        body.id = AppInstance.postActivityDetailData?.get(position)?.id
        body.isDeleted = true
        body.selectedStudents =
            AppInstance.postActivityDetailData?.get(position)?.selectedStudents as java.util.ArrayList<Int>?
        body.postActivityImages =
            AppInstance.postActivityDetailData?.get(position)?.postActivityImages as java.util.ArrayList<PostActivityImage>
        body.postActivityVideos =
            AppInstance.postActivityDetailData?.get(position)?.postActivityVideos as java.util.ArrayList<PostActivityVideo>
        body.postTitle = AppInstance.postActivityDetailData?.get(position)?.postTitle
        body.postDescription = AppInstance.postActivityDetailData?.get(position)?.postDescription
        body.postedDate = AppInstance.postActivityDetailData?.get(position)?.postedDate
        body.deletedBy =  AppInstance.loginResponse?.data?.loginUserID


        manager.createApiRequest(ApiUtilis.getAPIService(view.context).deletepostActivity(body), object :
            ServiceListener<PostActivitySaveResponse> {
            override fun getServerResponse(response: PostActivitySaveResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Post deleted successfully.")
                    /*   AppInstance.alleventDataResponse?.data?.removeAt(positionnew)
                       deletedEventResponse.value=position*/


                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }


    fun uploadImage(view: View, img1: String, img2: String, img3: String) {
        val imagePath1 = ""
        val imagePath2 = ""

        isLoading.value = true


        val file1 = File(img1)
        val file2 = File(img2)
        val file3 = File(img3)
        val manager = NetworkManager()
        val map = HashMap<String, String>()
        map["Accept"] = "application/json"
        var I1: Boolean = false
        var I2: Boolean = false
        var I3: Boolean = false
        var requestFile1: RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
        var imagenPerfil1: MultipartBody.Part = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)
        var requestFile2: RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file2)
        var imagenPerfil2: MultipartBody.Part = MultipartBody.Part.createFormData("fileData1", file2.name, requestFile2)
        var requestFile3: RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file3)
        var imagenPerfil3: MultipartBody.Part = MultipartBody.Part.createFormData("fileData2", file3.name, requestFile3)




        if (img1.isNotEmpty()) {
            I1 = true
            requestFile1 = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
            imagenPerfil1 = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)

        }
        if (img2.isNotEmpty()) {
            I2 = true
            requestFile2 = RequestBody.create(MediaType.parse("multipart/form-data"), file2)
            imagenPerfil2 = MultipartBody.Part.createFormData("fileData1", file2.name, requestFile2)

        }
        if (img3.isNotEmpty()) {
            I3 = true
            requestFile3 = RequestBody.create(MediaType.parse("multipart/form-data"), file3)
            imagenPerfil3 = MultipartBody.Part.createFormData("fileData2", file3.name, requestFile3)

        }
        if (I1 && !I2 && !I3) {
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).multipleImageUpload1(imagenPerfil1, map), object :
                ServiceListener<MultipleImageUploadResponse> {
                override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.postActivityImage = response
                        addPostActivity(view, "Image")


                    } else {
                        Log.i("Error", response.statusCode.toString() + response.message)
                        showToast(view.context, "No Data Found!!")
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })

        } else if (I2 && !I1 && !I3) {
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).multipleImageUpload1(imagenPerfil2, map), object :
                ServiceListener<MultipleImageUploadResponse> {
                override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.postActivityImage = response
                        addPostActivity(view, "Image")

                    } else {
                        Log.i("Error", response.statusCode.toString() + response.message)
                        showToast(view.context, "No Data Found!!")
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        } else if (I3 && !I1 && !I2) {
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).multipleImageUpload1(imagenPerfil3, map), object :
                ServiceListener<MultipleImageUploadResponse> {
                override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.postActivityImage = response
                        addPostActivity(view, "Image")


                    } else {
                        Log.i("Error", response.statusCode.toString() + response.message)
                        showToast(view.context, "No Data Found!!")
                    }
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        } else if (I1 && I2 && !I3) {
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).multipleImageUpload2(imagenPerfil1, imagenPerfil2, map),
                object :
                    ServiceListener<MultipleImageUploadResponse> {
                    override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            AppInstance.postActivityImage = response
                            addPostActivity(view, "Image")


                        } else {
                            Log.i("Error", response.statusCode.toString() + response.message)
                            showToast(view.context, "No Data Found!!")
                        }
                        isLoading.value = false
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        isLoading.value = false
                    }
                })
        } else if (I2 && I3 && !I1) {
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).multipleImageUpload2(imagenPerfil2, imagenPerfil3, map),
                object :
                    ServiceListener<MultipleImageUploadResponse> {
                    override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            AppInstance.postActivityImage = response
                            addPostActivity(view, "Image")


                        } else {
                            Log.i("Error", response.statusCode.toString() + response.message)
                            showToast(view.context, "No Data Found!!")
                        }
                        isLoading.value = false
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        isLoading.value = false
                    }
                })
        } else if (I1 && I3 && !I2) {
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).multipleImageUpload2(imagenPerfil1, imagenPerfil3, map),
                object :
                    ServiceListener<MultipleImageUploadResponse> {
                    override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            AppInstance.postActivityImage = response
                            addPostActivity(view, "Image")

                        } else {
                            Log.i("Error", response.statusCode.toString() + response.message)
                            showToast(view.context, "No Data Found!!")
                        }
                        isLoading.value = false
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        isLoading.value = false
                    }
                })
        } else if (I1 && I3 && I2) {
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).multipleImageUpload(
                    imagenPerfil1,
                    imagenPerfil2,
                    imagenPerfil3,
                    map
                ), object :
                    ServiceListener<MultipleImageUploadResponse> {
                    override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            // AppInstance.profileDetail?.data?.imagePath=response.data.filePath
                            AppInstance.postActivityImage = response
                            addPostActivity(view, "Image")


                        } else {
                            Log.i("Error", response.statusCode.toString() + response.message)
                            showToast(view.context, "No Data Found!!")
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


    fun uploadVideo(view: View, videoPath: String) {
        val imagePath1 = ""
        isLoading.value = true

        val file1 = File(videoPath)

        val manager = NetworkManager()
        val map = HashMap<String, String>()
        map["Accept"] = "application/json"
        var requestFile1: RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
        //  val requestFile1 = RequestBody.create(MediaType.parse("video/*"), file1)
        var imagenPerfil1: MultipartBody.Part = MultipartBody.Part.createFormData(file1.name, file1.name, requestFile1)
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).multipleImageUpload1(imagenPerfil1, map), object :
            ServiceListener<MultipleImageUploadResponse> {
            override fun getServerResponse(response: MultipleImageUploadResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.postActivityVideo = response
                    addPostActivity(view, "Video")

                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }


    private fun addPostActivity(view: View, tag: String) {
        val binding = DataBindingUtil.findBinding<ActivityAddPostActivityBinding>(view)
        val body = PostActivityModel()
        if(isLoading.value!=true) {
            isLoading.value = true
        }
        val manager = NetworkManager()
        val classList = AppInstance.allClasses?.data
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classesID = classList?.get(binding?.spinnerClassName!!.selectedIndex)?.classesID
        body.postTitle = binding?.titleedt?.text.toString()
        body.postDescription = binding?.edtincidentplace?.text.toString()
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.isPublic = isPublic.get()
        if (tag.equals("Image")) {
            body.postActivityImages = getImageList()
            body.postActivityVideos = null
        } else {
            body.postActivityVideos = getVideoList()
            body.postActivityImages = null
        }
        body.selectedStudents = getStudent()
        body.postedDate = convertDate(getCurrentDateTime(), checkInDate, serverDate)
        body.createdBy =AppInstance.loginResponse?.data?.loginUserID

        if (validated(body, view)) {
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).postActivitySave(body), object :
                ServiceListener<PostActivitySaveResponse> {
                override fun getServerResponse(response: PostActivitySaveResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        // AppInstance.profileDetail?.data?.imagePath=response.data.filePath
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
//        }


    }

    private fun getStudent(): ArrayList<Int>? {
        val list: ArrayList<Int> = ArrayList()
        for (l in 0 until AppInstance.allStudents?.data?.size!!) {
            if (selectedStudentsList.contains(AppInstance.allStudents?.data!![l].studentName))
                list.add(AppInstance.allStudents?.data!![l].studentId!!)
        }
        return list
    }

    private fun getImageList(): ArrayList<PostActivityImage>? {
        val list: ArrayList<PostActivityImage> = ArrayList()
        for (l in 0 until AppInstance.postActivityImage?.data?.size!!) {
            val data = PostActivityImage()
            data.id = 0
            data.postActivitiesID = 0
            data.imageServerPath = AppInstance.postActivityImage?.data!![l]
            list.add(data)
        }
        return list

    }

    private fun getVideoList(): ArrayList<PostActivityVideo>? {
        val list: ArrayList<PostActivityVideo> = ArrayList()
        for (l in 0 until AppInstance.postActivityVideo?.data?.size!!) {
            val data = PostActivityVideo()
            data.id = 0
            data.postActivitiesID = 0
            data.vedioServerPath = AppInstance.postActivityVideo?.data!![l]
            list.add(data)
        }
        return list

    }

    private fun getAddFormClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    classApiResponse.value = response
                    AppInstance.allClasses = response
                    loadClassData(view, response)
                    isLoading.value = false

                } else {
                    showToast(view.context, "No Data Found!!")
                    isLoading.value = false
                }
//                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    private fun loadClassData(
        view: View,
        response: ClassModel
    ) {
        val binding = DataBindingUtil.findBinding<ActivityAddPostActivityBinding>(view)
        Log.i("Response GetClass >> ", response.message.toString())
        val niceSpinner = binding?.spinnerClassName
        val data: MutableList<String> = mutableListOf()
        for (pos in 0 until response.data?.size!!) {
            response.data[pos].className?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        var position = 0
        niceSpinner?.attachDataSource(dataset)
        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                isLoading.value = true
                getStudentData(response.data[position].classesID, view)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        })
        getStudentData(response.data[position].classesID, view)
    }

    private fun getStudentData(classId: Int?, view: View) {
//        isLoading.value = true
        val body = StudentData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classId = classId
        body.studentName = ""
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStudentsByClass(body), object :
            ServiceListener<StudentModel> {
            override fun getServerResponse(response: StudentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    isLoading.value = false

                    AppInstance.allStudents = response
                    studentApiResponse.value = response


                } else {
                    showToast(view.context, "No Data Found!!")
                    Log.i("Error", response.statusCode.toString() + response.message)
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }


    fun getClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {
                classApiResponse.value = response
                AppInstance.allClasses = response
                if (response.statusCode == ResponseCodes.Success) {
                    val binding = DataBindingUtil.findBinding<FragmentPostActivityBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data?.isNotEmpty()!!) {
                        val niceSpinner = binding?.classSpinner
                        val data: MutableList<String> = mutableListOf()
                        for (pos in 0 until response.data.size) {
                            response.data[pos].className?.let { it1 -> data.add(it1) }
                        }
                        val dataset = LinkedList(data)
                        niceSpinner?.attachDataSource(dataset)

                        var selectedPOS: Int = 0
                        for (indexpos in 0 until dataset.size) {
                            if (dataset[indexpos].equals(AppInstance.teacherClassCheckInModel?.data!![0].label)) {
                                selectedPOS = indexpos
                                mClassId = AppInstance.teacherClassCheckInModel?.data!![0].value!!
                                // mClassId=3
                                break
                            }
                        }
                        niceSpinner!!.selectedIndex = selectedPOS


                        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
                            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                                isLoading.value = true
                                mClassId = response.data[position].classesID!!
                                getPostActivityData(

                                    getServerDate(mSelectedDate),
                                    mClassId,view
                                )

                            }

                            override fun onNothingSelected(parent: AdapterView<*>) {}
                        })
                    } else {
                        showToast(view.context, "No Data Found!!")
                    }
                    /* getPostActivityData(getServerDate(mSelectedDate), response.data[0].classesID)
                     mClassId = response.data[0].classesID!!*/

                    if (AppInstance.teacherClassCheckInModel?.data != null) {
                        mClassId = AppInstance.teacherClassCheckInModel?.data!!.get(0).value!!
                        getPostActivityData(getServerDate(mSelectedDate), mClassId, view)

                    }

                } else {
                    isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                isLoading.value = false
            }
        })

    }

    fun multipleSelectDialog(view: View, response: StudentModel) {
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.multiselect_dialog,
                null
            )
        val dialogBinding = MultiselectDialogBinding.bind(dialogView)
        val recyclerView = dialogBinding.selectContainer

        recyclerView.layoutManager = LinearLayoutManager(dialogView.context, LinearLayout.VERTICAL, false)
        (recyclerView.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
        dialogBinding.selectContainer.layoutManager = recyclerView.layoutManager
        val listAdapter = ChooseStudentsAdapter(response.data as ArrayList<StudentData>?, selectedStudentsList)
        dialogBinding.selectContainer.adapter = listAdapter
        dialogBinding.searchStudent.setOnQueryTextListener(object : SearchView.OnQueryTextListener {

            override fun onQueryTextChange(p0: String): Boolean {
                listAdapter.filter(p0)
                return false
            }

            override fun onQueryTextSubmit(p0: String): Boolean {
                listAdapter.filter(p0)
                return false
            }

        })

        dialogBinding.searchStudent.setOnClickListener {
            dialogBinding.searchStudent.isIconified = false
            dialogBinding.searchStudent.clearFocus()
        }
        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        dialogBinding.absBtnSave.setOnClickListener {

            allInvolvedStudent.value = listAdapter.checkedStudentList
            if (listAdapter.checkedStudentList != null) {
                selectedStudentsList = listAdapter.checkedStudentList!!
            }
            mMaterialDialog.dismiss()

        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun getPostActivityData(date: String, id: Int?, view: View) {
        val body = PostActivityModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classesID = id
        body.postedDate = date
        body.userID = AppInstance.loginResponse?.data?.releventUserID
        body.id = 0
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassPostActivity(body), object :
            ServiceListener<PostActivityStudentList> {
            override fun getServerResponse(response: PostActivityStudentList, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.postActivityStudentList = response
                    Log.i("Response GetAttendence=", response.message.toString())

                    postActivityApiResponse.value = response

                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })


    }

    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentPostActivityBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String
        masterView = view

        mDatePicker =
            DatePickerDialog(view.context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year
                try {
                    val mdate = displayDate.parse(mDate)
                    binding!!.dateTxt.text = numDate.format(mdate)
                    binding.weekDayTxt.text = dayofWeek.format(mdate)
                    binding.monthYrTxt.text = monthYear.format(mdate)
                    selectedDate.value = mDate
                    mSelectedDate = mDate
                    isLoading.value = true
                    getPostActivityData(getServerDate(mSelectedDate), mClassId, view)
                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: Exception) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        mDatePicker.show()
    }


    private fun validated(postActivityModel: PostActivityModel, view: View): Boolean {


        when {

            postActivityModel.postTitle.isNullOrEmpty() -> {
                showToast(view.context, "Please enter title")
                return false
            }
            postActivityModel.postDescription.isNullOrEmpty() -> {
                showToast(view.context, "Please enter post description")
                return false
            }
            postActivityModel.selectedStudents!!.size == 0 -> {
                showToast(view.context, "Please select student")
                return false
            }

            else -> return true
        }



        return true
    }


}