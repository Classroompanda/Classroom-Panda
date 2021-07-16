package com.daycare.daycareteacher.ui.dashboard.adapter

import android.app.AlertDialog
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.RecentSheetDetailActivityBinding
import com.daycare.daycareteacher.model.DailySheetSerializeRequest
import com.daycare.daycareteacher.model.StudentDailySheetDetail
import com.daycare.daycareteacher.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareteacher.utill.DailySheetConstant.DIAPER
import com.daycare.daycareteacher.utill.DailySheetConstant.HEALTH
import com.daycare.daycareteacher.utill.DailySheetConstant.MEAL
import com.daycare.daycareteacher.utill.DailySheetConstant.MOOD
import com.daycare.daycareteacher.utill.DailySheetConstant.NAP
import com.daycare.daycareteacher.utill.DailySheetConstant.NOTES
import java.text.SimpleDateFormat

class DailySheetDetailAdapter(
    var context: DailysheetDetailActivity,
    var masterPosition: Int,
    private var childrenList: ArrayList<StudentDailySheetDetail>,
) :
    RecyclerView.Adapter<DailySheetDetailAdapter.DailySheetBindingHolder>() {
    var parentPosition: Int = 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DailySheetBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        parentPosition = masterPosition

        val binding: RecentSheetDetailActivityBinding =
            RecentSheetDetailActivityBinding.inflate(layoutInflater, parent, false)
        return DailySheetBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList.size
    }

    override fun onBindViewHolder(holder: DailySheetBindingHolder, position: Int) {
        val binding = holder.binding
        //binding.viewModel= eventList[position]
        val viewModel = DailySheetViewModel(childrenList?.get(position)!!, position, parentPosition, "Detail")
        binding.viewModel = viewModel
        viewModel.setLoader(context)

        try {
            if (isToday(SimpleDateFormat("M-d-yyyy").parse(AppInstance.selectedDate))) {
                binding.btnDsEdit.visibility = View.VISIBLE
                binding.btnDelete.visibility = View.VISIBLE
            } else {
                if(isToday(SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(AppInstance.selectedDate))){
                    binding.btnDsEdit.visibility = View.VISIBLE
                    binding.btnDelete.visibility = View.VISIBLE
                }else {
                    binding.btnDsEdit.visibility = View.GONE
                    binding.btnDelete.visibility = View.GONE
                }
            }
        }catch (e:Exception){
            e.printStackTrace()
        }

        if (childrenList?.get(position)?.activityTypeID == HEALTH) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Medication Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.medication)
        }
        if (childrenList?.get(position)?.activityTypeID == ACTIVITY) {
            binding.scheduleTime.visibility = View.VISIBLE
            // var dateString: String =

          /*  binding.scheduleTime.setText(
                convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime) + " - " + convertDateUTC(
                childrenList?.get(position)?.endTime!!,
                alohaDate,
                dialogDisplayTime
            ))*/

            binding.scheduleTime.setText("  ")
            print(convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime))

            // binding.scheduleTime.setText(childrenList?.get(position).createdData)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.activity)
        }
        if (childrenList?.get(position)?.activityTypeID == NAP) {
            binding.scheduleTime.visibility = View.VISIBLE
            var dateString: String =
                convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime) + " - " + convertDateUTC(
                    childrenList?.get(position)?.endTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            binding.scheduleTime.setText(dateString)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.nap)
        }
        if (childrenList?.get(position)?.activityTypeID == MOOD) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Mood Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.happy)
        }
        if (childrenList?.get(position)?.activityTypeID == MEAL) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Meal Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.meal)
        }
        if (childrenList?.get(position)?.activityTypeID == NOTES) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Notes Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.notes)
        }
        if (childrenList?.get(position)?.activityTypeID == DIAPER) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("DIAPER")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.diaper)
        }

        binding.btnDelete.setOnClickListener {
            AlertDialog.Builder(it.context)
                .setTitle("Delete Daily sheet")
                .setMessage("Are you sure you want to Delete?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()

                        val data = childrenList?.get(position)
                        val dailySheetSerailize = DailySheetSerializeRequest()
                        var checkedStudentList = ArrayList<Int>()

                        dailySheetSerailize.id = data?.studentActivityID
                        dailySheetSerailize.agencyID = AppInstance.getUser(it.context)?.agencyID
                        dailySheetSerailize.classesID = 2
                        dailySheetSerailize.activityTypeID = data?.activityTypeID

                        val add = checkedStudentList?.add(childrenList?.get(position).studentID!!)
                        dailySheetSerailize.studentActivitiesID = data?.studentActivityID
                        dailySheetSerailize.DeletedDate = getCurrentDateTime()
                        dailySheetSerailize.deleted = true

                        /* {"agencyID":4,"IsDeleted":true,"DeletedDate":"2019-01-28T01:31:12.144Z","DeletedBy":1,
                             "activityTypeID":1,"selectedStudents":[7],"classesID":2,"studentActivitiesID":94,"id":94}
*/

                        dailySheetSerailize.selectedStudents = checkedStudentList
                        viewModel.deleteDS(it, dailySheetSerailize, position)


                        AppInstance.allDailySheetStidentList?.data?.get(parentPosition)?.activityDetail?.removeAt(
                            position
                        )
                        if (AppInstance.allDailySheetStidentList?.data?.get(parentPosition)?.totalActivityCount!! > 1) {
                            AppInstance.allDailySheetStidentList?.data?.get(parentPosition)
                                ?.totalActivityCount = AppInstance.allDailySheetStidentList?.data?.get(
                                parentPosition
                            )?.totalActivityCount!! - 1
                            notifyDataSetChanged()
//                                notifyItemRemoved(position)
                        } else {
                            AppInstance.allDailySheetStidentList?.data?.get(parentPosition)
                                ?.totalActivityCount = 0
                            notifyDataSetChanged()
//                                notifyItemRemoved(position)
                            // DailysheetDetailActivity.

                        }

                    }
                }
                .setNegativeButton(
                    "No"
                ) { dialog, id -> dialog.cancel() }
                .show()
        }


    }

    class DailySheetBindingHolder(var binding: RecentSheetDetailActivityBinding) :
        RecyclerView.ViewHolder(binding.activityContainer)

}