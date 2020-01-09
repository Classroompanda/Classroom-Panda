package com.daycare.daycareparent.ui.dashboard.adapter

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.support.v7.app.AlertDialog
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.EventListItemBinding
import com.daycare.daycareparent.model.EventData
import com.daycare.daycareparent.ui.dashboard.activities.AddEventActivity
import com.daycare.daycareparent.ui.dashboard.fragments.calender.CalendarViewModel
import com.daycare.daycareparent.ui.dashboard.fragments.calender.EventDetailActivity
import com.daycare.daycareparent.ui.dashboard.fragments.calender.MealDetailActivity
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.EDIT

class EventAdapter( var context: Context, private var eventList: List<EventData>) :
    RecyclerView.Adapter<EventAdapter.EventBindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventBindingHolder {

        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: EventListItemBinding = EventListItemBinding.inflate(layoutInflater, parent, false)
        return EventBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return eventList.size
    }

    override fun onBindViewHolder(holder: EventBindingHolder, position: Int) {
        val binding = holder.binding
        val calenderViewModel = CalendarViewModel()
        binding.viewModel= eventList[position]

        binding.eventContainer1.setOnClickListener {
            val intent = Intent(it.context, EventDetailActivity::class.java)
            intent.putExtra("startDate",eventList[position].startDate)
            intent.putExtra("endDate",eventList[position].endDate)
            intent.putExtra("startTime",eventList[position].startTime)
            intent.putExtra("endTime",eventList[position].endTime)
            intent.putExtra("desc",eventList[position].description)
            intent.putExtra("classname",eventList[position].className)
            intent.putExtra("title",eventList[position].title)
            intent.putExtra("repeat",eventList[position].plannerRepeatTypeName)
            intent.putExtra("repeatid",eventList[position].plannerRepeatTypeID.toString())
            intent.putExtra("endsOn",eventList[position].endsOn)
            it.context.startActivity(intent)
        }


//        binding.editButton.setOnClickListener {
//            binding.eventContainer.close(true)
//            var positionnew: Int=0
//            calenderViewModel.onClickAddEventFab(it)
//            for (i in 0 until AppInstance.alleventDataResponse?.data!!.size) {
//                if(AppInstance.alleventDataResponse?.data?.get(i)?.id ==Integer.valueOf(eventList[position].id)){
//                    positionnew=i
//                    break;
//                }
//            }
//
//            val intent = Intent(it.context, AddEventActivity::class.java)
//            intent.putExtra(EVENT_DATA, AppInstance.alleventDataResponse?.data?.get(positionnew))
//
//
//            AppInstance.eventInvolvments=AppInstance.alleventDataResponse?.data?.get(positionnew)?.involvedEventClassesList
//
//
//            (context as Activity).startActivityForResult(intent, EDIT)
////            it.context.startActivity(intent)
//        }



//        binding.deleteButton.setOnClickListener {
//            AlertDialog.Builder(it.context)
//                .setTitle("Delete Event")
//                .setMessage("Are you sure you want to Delete?")
//                .setPositiveButton(
//                    "Yes"
//                ) { dialog, id ->
//                    run {
//                        dialog.cancel()
//                        //calenderViewModel.deleteEvent(eventList[position].id)
//                        calenderViewModel.deleteEvent(it, Integer.valueOf(eventList[position].id), position)
//
//                        //AppInstance.alleventDataResponse?.data?.re
//                        notifyItemRemoved(position)
//                    }
//                }
//                .setNegativeButton(
//                    "No"
//                ) { dialog, id -> dialog.cancel() }
//                .show()
//
//        }


    }

    class EventBindingHolder(var binding: EventListItemBinding) : RecyclerView.ViewHolder(binding.eventContainer1)

}