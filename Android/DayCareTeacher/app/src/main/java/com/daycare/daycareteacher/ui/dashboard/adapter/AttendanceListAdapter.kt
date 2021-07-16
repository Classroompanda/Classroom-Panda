package com.daycare.daycareteacher.ui.dashboard.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.MutableLiveData
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.AttendanceListItemBinding
import com.daycare.daycareteacher.databinding.TransferConfirmationBinding
import com.daycare.daycareteacher.interfaces.IListAdapterCallBack
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog

class AttendanceListAdapter(
    var context: AttendanceFragment,
    var childrenList: List<AttendanceData>?,
    var date: String,
    var listener: EventListener,
    var callback: ViewItemClickListener<AttendanceData>, val viewModel: AttendanceViewModel
) :
    RecyclerView.Adapter<AttendanceListAdapter.BindingHolder>() {
    private lateinit var iAdapterFragmentCallback: IListAdapterCallBack
    private lateinit var iLoaderCallback: ILoaderCallback
    var mTransferClass = 0
    val isLoading = MutableLiveData<Boolean>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: AttendanceListItemBinding =
            AttendanceListItemBinding.inflate(layoutInflater, parent, false)
        return BindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    fun setLoader1(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    override fun onBindViewHolder(holder: BindingHolder, position: Int) {
        val binding = holder.binding
        val data = childrenList?.get(position)

        childrenList?.get(position)?.calendarSelectedDate = date

        if (data?.attendenceStatusID == IS_CHECKED_IN && data.breakStatusId == 1) {
            data.attendenceStatusID = IS_ON_BREAK
            loadState(binding, IS_ON_BREAK)
        } else {
            data?.attendenceStatusID?.let {
                loadState(binding, it)
            }
        }

        var newDate: String
        //12-09-2020  //2020-12-09 03:57:45  -- date formats coming like this
        if (date.length > 10) {
            newDate = convertDate(date, alohaDate1, displayDate)
        } else {
            newDate = convertDate(date, displayDate, displayDate)
        }

        if (!getCurrentDate().equals(newDate)) {
            if (data?.attendenceStatusID == IS_TO_BE_CHECKED) {  // check in green button
                binding.transferBtn.visibility = View.VISIBLE
                binding.transferBtn.isChecked = false
                binding.transferBtn.isClickable = false
                binding.transferBtn.isEnabled = false

                binding.btnEditDisabled.visibility = View.VISIBLE
                binding.btnEdit.visibility = View.INVISIBLE

                binding.absentBtn.isClickable = true
                binding.absentBtn.isEnabled = true

            } else {
                binding.transferBtn.visibility = View.VISIBLE
                binding.transferBtn.isChecked = false
                binding.transferBtn.isClickable = false
                binding.transferBtn.isEnabled = false
            }
        } else {
            if (data?.attendenceStatusID == IS_TO_BE_CHECKED) {  // check in green button
                binding.transferBtn.visibility = View.VISIBLE
                binding.transferBtn.isChecked = true
                binding.transferBtn.isClickable = true
                binding.transferBtn.isEnabled = true
            }
        }
        setLoader1(context)

        binding.viewModel = viewModel
        binding.attendanceData = childrenList?.get(position)

        binding.btnCheckin.setOnClickListener {
            callback.onViewItemClick(childrenList?.get(position)!!, position, 0) // 0 means checkIn
        }

        binding.btnCheckout.setOnClickListener {
            callback.onViewItemClick(childrenList?.get(position)!!, position, 1) // 1 means checkOut
        }

        binding.btnEdit.setOnClickListener {
            callback.onViewItemClick(childrenList?.get(position)!!, position, 2) // 2 means edit
        }

        binding.absentBtn.setOnClickListener {
            callback.onViewItemClick(
                childrenList?.get(position)!!,
                position,
                3
            ) // 3 means absent clicked
        }

        binding.childImg.setOnClickListener {
            callback.onViewItemClick(
                childrenList?.get(position)!!,
                position,
                4
            ) // 4 means onBreakInRedirectPage
        }

        binding.textView3.setOnClickListener {
            callback.onViewItemClick(
                childrenList?.get(position)!!,
                position,
                4
            ) // 4 means onBreakInRedirectPage
        }

        binding.transferBtn.setOnClickListener {
            getTransferClass(binding.transferBtn, position)
        }
    }

    fun getTransferClass(view: View, position: Int) {
        iLoaderCallback.startLoader(true)
        val body = TransferClassRequest()
        val manager = NetworkManager()
        val data = childrenList?.get(position)
        body.agencyID = data?.agencyID
        body.classID = data?.classesID

        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).getTransferClass(body),
            object :
                ServiceListener<ClassModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: ClassModel, requestcode: Int) {
                    if (response.statusCode == ResponseCodes.Success) {
                        transferData(
                            view,
                            response,
                            data!!,
                            position,
                            AppInstance.allAttendanceData!!
                        )
                    } else {
                        Log.i("Error Checkout", response.statusCode.toString() + response.message)
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                }
            })
    }

    fun transferData(
        view: View,
        response: ClassModel,
        data: AttendanceData,
        adapterPosition: Int,
        attendanceModel: AttendanceModel
    ) {
        iLoaderCallback.startLoader(false)
        val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
        val data = childrenList?.get(adapterPosition)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(R.layout.transfer_confirmation, null)
        val dialogBinding = TransferConfirmationBinding.bind(dialogView)
        dialogBinding.viewModel = data

        var day = formatDateToWeekDay(data?.attendanceDate!!)   // 12-09-2020 4:03:00 am
        var datemonth = formatDateToMonth(data?.attendanceDate!!)
        var year = formatDateToYear(data?.attendanceDate!!)

        dialogBinding.txtDate.text = day + " " + datemonth + " " + year

        val time: String? =
            data?.attendanceDate?.let {/* getDayName(it) + " " + */getCurrentTime() }
        dialogBinding.txtTime.text = time

        setTransferClassSpinnerData(dialogBinding.transferSpinner, response, view.context)
        dialogBinding.btnCCancel.setOnClickListener {
            binding!!.transferBtn.isChecked = binding!!.transferBtn.isChecked

            // binding!!.transferBtn.isChecked = false
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnCCheckin.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnCCheckin.visibility = View.INVISIBLE
            dialogBinding.spinKit.visibility = View.VISIBLE
            val body = TransferClassRequest()
            val manager = NetworkManager()
            val data = childrenList?.get(adapterPosition)
            body.agencyID = data?.agencyID
            body.classID = data?.classesID
            body.fromClassID = data?.classesID
            body.toClassID = mTransferClass
            body.studentID = data?.studentID
            body.teacherID = AppInstance.getUser(view.context)?.loginUserID
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).saveTransferClass(body),
                object :
                    ServiceListener<BaseModel> {
                    @SuppressLint("LogNotTimber")
                    override fun getServerResponse(response: BaseModel, requestcode: Int) {
                        if (response.statusCode == ResponseCodes.Success) {
                            showToast(view.context, "Student transferred successfully")
                            isLoading.value = false
                            mMaterialDialog.dismiss()
                            notifyDataSetChanged()
                            val game = attendanceModel
                            listener.onEvent(game, adapterPosition)

                        } else {
                            binding!!.transferBtn.isChecked = false
                            isLoading.value = false
                            mMaterialDialog.dismiss()
                            showToast(view.context, response.message!!)
                            Log.i(
                                "Error Checkout",
                                response.statusCode.toString() + response.message
                            )
                        }
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                    }
                })
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun setTransferClassSpinnerData(
        spinner: Spinner,
        response: ClassModel?,
        context: Context
    ) {
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
            for (pos in 0 until response.data.size) {
                response.data[pos].className?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context, android.R.layout.simple_list_item_1, data
            )

            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View,
                    position: Int,
                    id: Long
                ) {
                    isLoading.value = true
                    mTransferClass = response.data[position].classesID!!
                }

                override fun onNothingSelected(parent: AdapterView<*>) {
                    // showToast(context, "Please Select Guardian")
                }
            }

        } else {
            showToast(context, "No Data Found!!")
        }
    }

    interface EventListener {
        fun onEvent(data: AttendanceModel, adapterPosition: Int)
    }

    class BindingHolder(var binding: AttendanceListItemBinding) :
        RecyclerView.ViewHolder(binding.container)

    fun loadState(binding: AttendanceListItemBinding, state: Int) {
        // val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
        Log.d("status", ":  " + state)
        when (state) {
            /* val IS_CHECKED_IN = 3
             val IS_CHECKED_OUT = 4
             val IS_CHECKED_ABSENT = 5
             val IS_TO_BE_CHECKED = 2
             val IS_ON_BREAK =10*/
            IS_CHECKED_IN -> {
                binding!!.btnEdit.visibility = View.VISIBLE
                binding.btnEditDisabled.visibility = View.GONE
                binding.btnCheckin.visibility = View.INVISIBLE
                binding.btnCheckout.visibility = View.VISIBLE
                binding.btnCheckedOut.visibility = View.INVISIBLE
                binding.absentBtn.visibility = View.VISIBLE
                binding.absentBtn.isChecked = false
                binding.absentBtn.isClickable = false
                binding.absentBtn.isEnabled = false

                binding.btnOnBreak.visibility = View.GONE
                //AS PER CLIENT REQUEST WE ARE CHANGING IT
//                binding.transferBtn.visibility = View.VISIBLE
//                binding.transferBtn.isEnabled = true
//                binding.transferBtn.isClickable = true
//                binding.transferBtn.isChecked = true
            }
            IS_CHECKED_OUT -> {
                binding!!.btnEdit.visibility = View.VISIBLE
                binding.btnEditDisabled.visibility = View.GONE
                binding.btnCheckin.visibility = View.INVISIBLE
                binding.btnCheckout.visibility = View.INVISIBLE
                binding.btnCheckedOut.visibility = View.VISIBLE
                binding.absentBtn.visibility = View.VISIBLE
                binding.absentBtn.isChecked = false
                binding.absentBtn.isClickable = false
                binding.absentBtn.isEnabled = false
                //AS PER CLIENT REQUEST WE ARE CHANGING IT
//                binding.transferBtn.isChecked = false
//                binding.transferBtn.isClickable = false
//                binding.transferBtn.isEnabled = false

                binding.btnOnBreak.visibility = View.GONE
            }
            IS_CHECKED_ABSENT -> {
                binding.btnEdit.visibility = View.INVISIBLE
                binding.btnEditDisabled.visibility = View.GONE
                binding.btnCheckin.visibility = View.INVISIBLE
                binding.btnCheckout.visibility = View.INVISIBLE
                binding.btnCheckedOut.visibility = View.VISIBLE
                binding.btnCheckedOut.isClickable = false
                binding.absentBtn.visibility = View.VISIBLE
                binding.absentBtn.isChecked = true
                binding.absentBtn.isClickable = true //false
                binding.absentBtn.isEnabled = true//false
                binding.btnOnBreak.visibility = View.GONE
//AS PER CLIENT REQUEST WE ARE CHANGING IT
                //                binding.transferBtn.visibility = View.GONE
            }
            IS_TO_BE_CHECKED -> {
                binding!!.btnEdit.visibility = View.INVISIBLE
                binding.btnCheckin.visibility = View.VISIBLE
                binding.btnCheckout.visibility = View.INVISIBLE
                binding.btnCheckedOut.visibility = View.INVISIBLE
                binding.absentBtn.visibility = View.VISIBLE
                binding.absentBtn.isChecked = false
                binding.absentBtn.isClickable = true
                binding.absentBtn.isEnabled = true
                binding.btnOnBreak.visibility = View.GONE
                //AS PER CLIENT REQUEST WE ARE CHANGING IT
//                binding.transferBtn.visibility = View.VISIBLE
//                binding.transferBtn.isChecked = true
//                binding.transferBtn.isClickable = true
            }
            IS_ON_BREAK -> {
                binding!!.btnEdit.visibility = View.VISIBLE
                binding.btnEditDisabled.visibility = View.GONE
                binding.btnCheckin.visibility = View.INVISIBLE
                binding.btnCheckout.visibility = View.INVISIBLE
                binding.btnCheckedOut.visibility = View.INVISIBLE
                binding.absentBtn.isClickable = false
                binding.absentBtn.isEnabled = false
                binding.absentBtn.isChecked = false
                binding.absentBtn.visibility = View.INVISIBLE
                //AS PER CLIENT REQUEST WE ARE CHANGING IT
//                binding.transferBtn.visibility = View.VISIBLE
//                binding.transferBtn.isClickable = false
//                binding.transferBtn.isChecked = false
//                binding.transferBtn.isEnabled = false
                binding.btnOnBreak.visibility = View.VISIBLE
            }
        }
    }

    fun setCalendarDate(date1: String) {
        this.date = date1
    }
}
