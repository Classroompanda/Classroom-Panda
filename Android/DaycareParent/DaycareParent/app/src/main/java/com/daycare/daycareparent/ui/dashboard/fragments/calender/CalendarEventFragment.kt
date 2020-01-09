package com.daycare.daycareparent.ui.dashboard.fragments.calender

import android.annotation.SuppressLint
import android.arch.lifecycle.Observer
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentCalendarEventBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.AddEventActivity
import com.daycare.daycareparent.ui.dashboard.adapter.EventAdapter
import com.daycare.daycareparent.utill.*
import com.github.sundeepk.compactcalendarview.CompactCalendarView
import com.github.sundeepk.compactcalendarview.domain.Event
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList
import com.daycare.daycareparent.utill.OptionConstant.NONE


class CalendarEventFragment : Fragment() {

    lateinit var binding: FragmentCalendarEventBinding
    lateinit var viewModel: CalendarViewModel
    private val dateFormatForMonth = SimpleDateFormat("MMM - yyyy", Locale.getDefault())
    private val monthFormatValue = SimpleDateFormat("M", Locale.getDefault())
    private val yearFormatValue = SimpleDateFormat("yyyy", Locale.getDefault())

    private val onlyDateFormatValue = SimpleDateFormat("d", Locale.getDefault())
    var firstdateofmnth: Int = 0
    var enddateofmnth: Int = 0
    var monthValue: String = ""
    var yearValue: Int = 0
    var loader = Loader()

    var mDateClicked = ""
    var mCalenderSelectedDate=""
    var isDateInBetween:Boolean = false
    private val EVENT_REQUEST = 100
    private val currentCalender = Calendar.getInstance(Locale.getDefault())
    var eventDateSendFormat = SimpleDateFormat("E MMM dd yyyy")
    var eventDetailList: List<AllEventDataList> = ArrayList()
    var trailEventDetailList:List<EventData> =ArrayList<EventData>()
    lateinit var listAdapter: EventAdapter
    var mEventModel = AllEventDataResponse()
    var contextNew: Context? =null



    var dateList: ArrayList<String> = ArrayList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_calendar_event, container, false)
        binding = FragmentCalendarEventBinding.bind(view)

        val recyclerView = binding.eventList
        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
        binding.eventList.layoutManager = recyclerView.layoutManager

        // getRequestdata()

        val mCalHeader = dateFormatForMonth.format(binding.calendarView.firstDayOfCurrentMonth)
        viewModel = CalendarViewModel(mCalHeader, NONE)
        binding.viewModel = viewModel



        //  binding.viewModel?.getEventCalenderData(getRequestdata())
     //   loadData()
        contextNew= view.context

        attachObserver(viewModel,view.context)
        /*val date = Date()
        mDateClicked=displayDate.format(date)
        defaultDateView(date,view)*/


        binding.calendarView.setListener(object : CompactCalendarView.CompactCalendarViewListener {
            @SuppressLint("LogNotTimber", "NewApi")
            override fun onDayClick(dateClicked: Date) {
                defaultDateView(dateClicked)


            }

            override fun onMonthScroll(firstDayOfNewMonth: Date) {
                binding.calendarView.removeAllEvents()
                binding.txtMonthYr.text = dateFormatForMonth.format(firstDayOfNewMonth)
                loadData()
                // val selectedDate = dateFormatForStartDate.format(compactCalendarView.getFirstDayOfCurrentMonth())
            }
        })
        return view
    }

    private fun loadData()
    {
        binding.viewModel?.getEventCalenderData(getRequestdata(),context!!)

    }

    private fun defaultDateView(dateClicked:Date){
        mDateClicked = displayDate.format(dateClicked)
        mCalenderSelectedDate= alohaDate.format(dateClicked)
        val pattern = "yyyy-mm-dd'T'hh:mm:ss"
        val details: MutableList<Event>? = binding.calendarView.getEvents(dateClicked)
        var eventList: MutableList<AllEventDataList> = ArrayList()
        if (details != null) {

            if (AppInstance.alleventDataResponse?.data != null) {
                trailEventDetailList=ArrayList()
                for (l in 0 until eventDetailList.size) {
                    // start=2019-01-02T00:00:00
                    //mCalenderSelectedDate=2019-01-09T00:00:00

                    val sdf = SimpleDateFormat("yyyy-MM-dd")
                    val date1 = sdf.parse(eventDetailList[l].start)
                    val date2 = sdf.parse(mCalenderSelectedDate)

                    println("date1 : " + sdf.format(date1))
                    println("date2 : " + sdf.format(date2))

                    if (date1.compareTo(date2) === 0) {
                        println("Date1 is equal to Date2")

                        // eventList.add(eventDetailList[l])
                        var involvedClass:String=""
                        if(eventDetailList[l].involvedEventClassesList!=null){
                            for(j:Int in 0 until eventDetailList[l].involvedEventClassesList?.size!!) {
                                if(involvedClass.isEmpty()) {
                                    involvedClass += eventDetailList[l].involvedEventClassesList?.get(j)?.className ?: "no class"
                                }
                                else{
                                    involvedClass +=", "+ eventDetailList[l].involvedEventClassesList?.get(j)?.className ?: "no class"
                                }
                            }
                        }
                        eventList.add(eventDetailList[l])


                        (trailEventDetailList as ArrayList<EventData>).add(EventData(eventDetailList[l].id.toString(),
                            convertDate(eventDetailList[l].start!!,alohaDate, mealDisplayDate),
                            convertDate(eventDetailList[l].end!!,alohaDate, mealDisplayDate),
                            eventDetailList[l].title,
                            involvedClass,
                            "Breakfast",
                            eventDetailList[l].description,
                            convertDate(
                                    eventDetailList[l].startTime!!, alohaDate,displayTime),
                            convertDate(
                                eventDetailList[l].endTime!!, alohaDate,displayTime),
                            eventDetailList[l].plannerRepeatTypeName,
                            eventDetailList[l].plannerRepeatTypeID,
                            convertDate(eventDetailList[l].endsOn!!,alohaDate, mealDisplayDate)
                        ))

                    }
                }

            }
        }

        if(trailEventDetailList.size>0)
        {
            binding.eventList.visibility=View.VISIBLE
            binding.txtError.visibility=View.GONE
            listAdapter = contextNew?.let { EventAdapter(it, trailEventDetailList) }!! //  Set Data in Adapter
            binding.eventList.adapter = listAdapter
            (binding.eventList.adapter as EventAdapter).notifyDataSetChanged()
            binding.calendarView.invalidate()
            Log.d(ContentValues.TAG, details.toString())
            //System.out.print("Hello")
        }
        else{
            binding.eventList.visibility=View.GONE
            binding.txtError.visibility=View.VISIBLE
        }
        if(eventList.size>0) {
            /*val listAdapter = EventAdapter(context, eventList) //  Set Data in Adapter
            binding.eventList.adapter = listAdapter
            (binding.eventList.adapter as EventAdapter).notifyDataSetChanged()
            Log.d(ContentValues.TAG, details.toString())*/
        }
    }

    private fun getRequestdata(): EventCalenderRequest {
        val c = Calendar.getInstance()
        val year = c.get(Calendar.YEAR)
        monthValue = monthFormatValue.format(binding.calendarView.firstDayOfCurrentMonth)
        yearValue = Integer.valueOf(yearFormatValue.format(binding.calendarView.firstDayOfCurrentMonth))
        if (Integer.valueOf(monthValue) > 0) {
            c.set(Calendar.MONTH, Integer.valueOf(monthValue) - 1)
        } else {
            c.set(Calendar.MONTH, Integer.valueOf(monthValue))
        }
        val month = c.get(Calendar.MONTH)
        val day = 1
        c.set(year, month, day)
        val numOfDaysInMonth = c.getActualMaximum(Calendar.DAY_OF_MONTH)
        System.out.println("First Day of month: " + c.time)

        val dateFormat = SimpleDateFormat("E MMM dd yyyy")
        val strDate = dateFormat.format(c.time)

        firstdateofmnth = onlyDateFormatValue.format(c.time).toInt()

        println("Converted String: $strDate")


        c.add(Calendar.DAY_OF_MONTH, numOfDaysInMonth - 1)
        System.out.println("Last Day of month: " + c.time)
        val endDate = dateFormat.format(c.time)
        enddateofmnth = onlyDateFormatValue.format(c.time).toInt()

        val body = EventCalenderRequest()
        body.agencyID =AppInstance.loginResponse?.data?.agencyID
        body.eventSearchFromDate = strDate
        body.eventSearchToDate = endDate
        return body
    }


    private fun attachObserver(viewModel: CalendarViewModel, context: Context) {
        viewModel.isFabClicked.observe(this, Observer<Boolean> { it ->
            it?.let {
               // showToast(context!!, mDateClicked)

                if(mDateClicked.isEmpty()){
                    val date = Date()
                    mDateClicked=displayDate.format(date)

                }

                val intent = Intent(context, AddEventActivity::class.java)
               intent.putExtra("selectedDate", mDateClicked)
                startActivityForResult(intent, EVENT_REQUEST)
            }
        })

        viewModel.deletedEventResponse.observe(this, Observer<Int> { it ->
            it?.let {
                //showToast(context, "Deleted")

                listAdapter.notifyItemRemoved(it)
                binding.eventList.adapter = listAdapter
                (binding.eventList.adapter as EventAdapter).notifyDataSetChanged()

                binding.calendarView.invalidate()
                //loadData()
            }

        })

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })

        viewModel.eventDataApiResponse.observe(this, Observer<AllEventDataResponse> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            (trailEventDetailList as ArrayList).clear()
                            eventDetailList=ArrayList()
                            eventDetailList = AppInstance.alleventDataResponse?.data!!

                            for (i in 0 until eventDetailList.size) {
                                val scheduleDateDataJSONObject = eventDetailList.get(i)
                                scheduleDateDataJSONObject?.start?.let { it1 -> dateList.add(it1) }
//2019-02-05T00:00:00
                                val parts = scheduleDateDataJSONObject?.start?.split("-".toRegex())
                                    ?.dropLastWhile({ it.isEmpty() })
                                    ?.toTypedArray()//2015-12-08
                                val scheduleyear = parts?.get(0)
                                // val schedulemonth = parts?.get(1)
                                var schedulemonth: String = ""
                                if (parts?.get(1)?.length!! > 1 && parts.get(1).indexOf("0") == 0) {
                                    schedulemonth = parts?.get(1).substring(1);

                                } else {
                                    schedulemonth = parts?.get(1)
                                }

                                var scheduleday: String = ""

                                if ((parts?.get(2))?.length!! > 1 && parts?.get(2).indexOf("0") == 0) {
                                    scheduleday = parts?.get(2).substring(1);

                                } else {
                                    scheduleday = parts?.get(2)
                                }


                                scheduleday = scheduleday.substring(0, scheduleday.indexOf("T"));



                                var involvedClass:String=""
                                if(eventDetailList[i].involvedEventClassesList!=null){
                                    for(j:Int in 0 until eventDetailList[i].involvedEventClassesList?.size!!)
                                        involvedClass+= eventDetailList[i].involvedEventClassesList?.get(j)?.className ?: "no class"
                                }



                                addEvents(
                                    binding.calendarView,
                                    Integer.parseInt(scheduleyear),
                                    Integer.parseInt(schedulemonth),
                                    Integer.parseInt(scheduleday),
                                    trailEventDetailList

                                )
                                binding.calendarView.invalidate()
                                val date = Date()
                                defaultDateView(date)
                            }


                        } else {


                            binding.eventList.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
                            showToast(context!!, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context!!, it.message!!)
                    }
                }
            }
        })

        /* viewModel.isLoading.observe(this, Observer<Boolean> { it ->
             it?.let {
                 if (it) {
                     loader.startLoader(context)
                 } else {
                     loader.stopLoader()
                 }
             }

         })*/

    }

    override fun onResume() {
        super.onResume()
        binding.calendarView.removeAllEvents()
        loadData()
        val date = Date()
        mDateClicked=displayDate.format(date)

        //Following code is used after Edit the event & reflect in list

        val eventdata = mEventModel.data
     /*   val mData: AllEventDataList? = AppInstance.alleventDataResponse.data[]
        if (mData != null) {
            for (pos in 0 until eventdata?.size!!) {
                if (mData.id == eventdata[pos].id) {
                    mEventModel.data?.set(pos,eventdata)
                    listAdapter.notifyDataSetChanged()
                }
            }
        }*/

    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

    }

    private fun addEvents(
        compactCalendarView: CompactCalendarView,
        year: Int,
        month: Int,
        day: Int,
        eventNewList: List<EventData>
    ) {

        currentCalender.time = Date()
        currentCalender.set(Calendar.DAY_OF_MONTH, 1)
        val firstDayOfMonth = currentCalender.time
        currentCalender.time = firstDayOfMonth

        if (month > -1) {
            currentCalender.set(Calendar.MONTH, month - 1)
            currentCalender.set(Calendar.YEAR, year)
        }
        currentCalender.add(Calendar.DATE, day - 1)
        currentCalender.set(Calendar.HOUR_OF_DAY, 0)
        currentCalender.set(Calendar.MINUTE, 0)
        currentCalender.set(Calendar.SECOND, 0)
        currentCalender.set(Calendar.MILLISECOND, 0)

        try {
            compactCalendarView.addEvent(
                Event(resources.getColor(R.color.colorPresent), currentCalender.timeInMillis, eventNewList),
                false
            )


        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

}