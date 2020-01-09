package com.daycare.daycareteacher.ui.dashboard.fragments.calender

import android.annotation.SuppressLint
import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.content.ContextCompat
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentCalendarEventBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddEventActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.EventAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.github.sundeepk.compactcalendarview.CompactCalendarView
import com.github.sundeepk.compactcalendarview.domain.Event
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList
import com.daycare.daycareteacher.utill.OptionConstant.NONE
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe








class CalendarEventFragment : Fragment(), EventAdapter.EventCallback {


    lateinit var binding: FragmentCalendarEventBinding
    lateinit var viewModel: CalendarViewModel
    private val dateFormatForMonth = SimpleDateFormat("MMM - yyyy", Locale.getDefault())
    private val monthFormatValue = SimpleDateFormat("M", Locale.getDefault())
    private val yearFormatValue = SimpleDateFormat("yyyy", Locale.getDefault())
    private val onlyDateFormatValue = SimpleDateFormat("d", Locale.getDefault())
    val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
    var firstdateofmnth: Int = 0
    var enddateofmnth: Int = 0
    var monthValue: String = ""
    var yearValue: Int = 0
    var loader = Loader()
    var mDateClicked = ""
    var mCalenderSelectedDate = ""
    private val EVENT_REQUEST = 100
    private val currentCalender = Calendar.getInstance(Locale.getDefault())
    var eventDetailList: List<AllEventDataList> = ArrayList()
    lateinit var listAdapter: EventAdapter
    private var parentListPos: Int? = null
    private var childListPos: Int? = null

    val eventList: MutableList<AllEventDataList> = ArrayList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_calendar_event, container, false)
        binding = FragmentCalendarEventBinding.bind(view)

        val recyclerView = binding.eventList
        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
        binding.eventList.layoutManager = recyclerView.layoutManager
        listAdapter =
            EventAdapter(context!!, eventList, this) //  Set Data in Adapter
        binding.eventList.adapter = listAdapter

        val mCalHeader = dateFormatForMonth.format(binding.calendarView.firstDayOfCurrentMonth)
        viewModel = CalendarViewModel(mCalHeader, NONE)
        binding.viewModel = viewModel

        EventBus.getDefault().register(this);

        attachObserver(viewModel, view.context)

        binding.calendarView.setListener(object : CompactCalendarView.CompactCalendarViewListener {
            @SuppressLint("LogNotTimber", "NewApi")
            override fun onDayClick(dateClicked: Date) {
                defaultDateView(dateClicked)

            }

            override fun onMonthScroll(firstDayOfNewMonth: Date) {
                binding.calendarView.removeAllEvents()
                binding.txtMonthYr.text = dateFormatForMonth.format(firstDayOfNewMonth)
                loadData()
            }
        })
        binding.calendarView.removeAllEvents()
        loadData()
        mDateClicked = convertDate(serverDate.format(Date()), serverDate, displayDate)
        binding.calendarView.invalidate()
        return view
    }

    private fun loadData() {
        binding.viewModel?.getEventCalenderData(getRequestdata(), binding.bottomView)

    }

    private fun defaultDateView(dateClicked: Date) {
        mDateClicked = convertDate(serverDate.format(dateClicked), serverDate, displayDate)
        mCalenderSelectedDate = convertDate(mDateClicked, displayDate, serverDate)
        val details: MutableList<Event>? = binding.calendarView.getEvents(dateClicked)

        if (details != null) {

            if (AppInstance.alleventDataResponse?.data != null) {
                eventList.clear()
                for (l in 0 until eventDetailList.size) {

                    val date1 = sdf.parse(eventDetailList[l].start)
                    val date2 = sdf.parse(mCalenderSelectedDate)

                    if (isSameDay(date1, date2)) {  //date1.compareTo(date2) == 0) {
                        // eventList.add(eventDetailList[l])
                        var involvedClass: String = ""
                        if (eventDetailList[l].involvedEventClassesList != null) {
                            for (j: Int in 0 until eventDetailList[l].involvedEventClassesList?.size!!) {
                                if (involvedClass.isEmpty()) {
                                    involvedClass += eventDetailList[l].involvedEventClassesList?.get(j)?.className
                                        ?: "no class"
                                } else {
                                    involvedClass += ", ${eventDetailList[l].involvedEventClassesList?.get(j)?.className}"

                                }
                            }
                        }
                        eventDetailList[l].className = involvedClass
                        eventList.add(eventDetailList[l])

                    }
                }

            }
        }

        setAdapter(eventList)

    }

    private fun setAdapter(eventList: MutableList<AllEventDataList>) {

        if (eventList.isNotEmpty()) {
            binding.eventList.visibility = View.VISIBLE
            binding.txtError.visibility = View.GONE

            listAdapter.notifyDataSetChanged()
            binding.calendarView.invalidate()

        } else {
            binding.eventList.visibility = View.GONE
            binding.txtError.visibility = View.VISIBLE
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
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.eventSearchFromDate = strDate
        body.eventSearchToDate = endDate
        return body
    }


    private fun attachObserver(viewModel: CalendarViewModel, context: Context) {
        viewModel.isFabClicked.observe(this, Observer<Boolean> { it ->
            it?.let {
                // showToast(context!!, mDateClicked)

                if (mDateClicked.isEmpty()) {
                    val date = Date()
                    mDateClicked = displayDate.format(date)

                }

                val intent = Intent(context, AddEventActivity::class.java)
                intent.putExtra("selectedDate", mDateClicked)
                startActivityForResult(intent, EVENT_REQUEST)
            }
        })

        viewModel.deletedEventResponse.observe(this, Observer<Int> { it ->
            it?.let {
                binding.calendarView.invalidate()
                binding.calendarView.removeAllEvents()
                loadData()
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
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                eventList.clear()
                                eventDetailList = ArrayList()
                                eventDetailList = AppInstance.alleventDataResponse?.data!!
                                val dates: ArrayList<String> = ArrayList()
                                for (i in 0 until eventDetailList.size) {

                                    val day = getdayInt(eventDetailList[i].start)
                                    val month = getMonthInt(eventDetailList[i].start)
                                    val year = getyearInt(eventDetailList[i].start)

                                    if (isNewDate(dates, day, month, year)) { //to add only one event marker
                                        addEvents(binding.calendarView, year, month, day, eventList)

                                        binding.calendarView.invalidate()
                                        val date = Calendar.getInstance().time
                                        defaultDateView(date)
                                        eventDetailList[i].start?.let { it1 -> dates.add(it1) }
                                    }
                                }


                            } else {
                                binding.eventList.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
                            }
                        }
                        catch(e:Exception){
                            binding.eventList.visibility = View.GONE
                            binding.txtError.visibility = View.VISIBLE
                        }

                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })


    }

    private fun isNewDate(
        dates: ArrayList<String>,
        day: Int,
        month: Int,
        year: Int
    ): Boolean {
        for (date in dates) {
            if (day == getdayInt(date) && month == getMonthInt(date) && year == getyearInt(date)) {
                return false
            }
        }
        return true

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == EDIT && resultCode == Activity.RESULT_OK) {
            val eventData = data?.getParcelableExtra<AllEventDataList>(EVENT_DATA)
            parentListPos?.let { AppInstance.alleventDataResponse?.data?.set(it, eventData!!) }
            childListPos?.let { eventList.set(it, eventData!!) }

            listAdapter.notifyDataSetChanged()
        }



        if (requestCode == EVENT_REQUEST && resultCode == Activity.RESULT_OK) {
            loadData()
        }

        else{

        }
    }

    private fun addEvents(
        compactCalendarView: CompactCalendarView,
        year: Int,
        month: Int,
        day: Int,
        eventNewList: MutableList<AllEventDataList>
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
                Event(
                    ContextCompat.getColor(context!!, R.color.colorPrimaryDark),
                    currentCalender.timeInMillis,
                    eventNewList
                ),
                false
            )


        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

    override fun deleteEvent(eventData: AllEventDataList, position: Int) {
        viewModel.deleteEvent(context!!, eventData.id, position)
        eventList.removeAt(position)
        listAdapter.notifyDataSetChanged()

    }

    override fun editEvent(parentPos: Int, childPos: Int) {
        parentListPos = parentPos
        childListPos = childPos
        AppInstance.eventInvolvments =
            AppInstance.alleventDataResponse?.data?.get(parentPos)?.involvedEventClassesList

        val intent = Intent(context, AddEventActivity::class.java)
        intent.putExtra(EVENT_DATA, AppInstance.alleventDataResponse?.data?.get(parentPos))
        (context as Activity).startActivityForResult(intent, EDIT)
    }





    @Subscribe(priority = 1)
    fun onEvent(event: BusMessageEvent){
        showToast(context!!, "Hey, my message" + event.getMessage())
/*if(event.message.equals("Added"))
        loadData()*/

    }




    override fun onStop() {
        EventBus.getDefault().unregister(this)
        super.onStop()
    }


}