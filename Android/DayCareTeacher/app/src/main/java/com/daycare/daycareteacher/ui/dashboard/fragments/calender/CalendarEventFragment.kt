package com.daycare.daycareteacher.ui.dashboard.fragments.calender

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentCalendarEventBinding
import com.daycare.daycareteacher.model.AllEventDataList
import com.daycare.daycareteacher.model.AllEventDataResponse
import com.daycare.daycareteacher.model.BusMessageEvent
import com.daycare.daycareteacher.model.EventCalenderRequest
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddEventActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.EventAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.NONE
import com.github.sundeepk.compactcalendarview.CompactCalendarView
import com.github.sundeepk.compactcalendarview.domain.Event
import kotlinx.android.synthetic.main.fragment_calendar_event.*
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import java.text.SimpleDateFormat
import java.util.*

class CalendarEventFragment : Fragment(), EventAdapter.EventCallback {
    lateinit var binding: FragmentCalendarEventBinding
    lateinit var viewModel: CalendarViewModel
    var date : Date?=null
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
    var eventDetailList: List<AllEventDataList> = ArrayList()
    lateinit var listAdapter: EventAdapter
    private var parentListPos: Int? = null
    private var childListPos: Int? = null
    val eventList: MutableList<AllEventDataList> = ArrayList()
    var masterView : View?=null

    @SuppressLint("WrongConstant")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_calendar_event, container, false)
        binding = FragmentCalendarEventBinding.bind(view)

        date = Calendar.getInstance().time

        val recyclerView = binding.eventList
        recyclerView.layoutManager =
            LinearLayoutManager(
                view.context,
                LinearLayout.VERTICAL,
                false
            )
        binding.eventList.layoutManager = recyclerView.layoutManager
        listAdapter =
            EventAdapter(context!!, eventList, this) //  Set Data in Adapter
        binding.eventList.adapter = listAdapter
        val mCalHeader = dateFormatForMonth.format(binding.calendarView.firstDayOfCurrentMonth)
        viewModel = CalendarViewModel(mCalHeader, NONE)
        binding.viewModel = viewModel

        mDateClicked = convertUtcToLocal(postserverDate.format(Date()), serverDate, displayDate)

        EventBus.getDefault().register(this);

        attachObserver(viewModel, view.context)

        binding.calendarView.shouldDrawIndicatorsBelowSelectedDays(true)

        binding.calendarView.setListener(object : CompactCalendarView.CompactCalendarViewListener {
            @SuppressLint("LogNotTimber", "NewApi")
            override fun onDayClick(dateClicked: Date) {
                defaultDateView(dateClicked)
            }

            override fun onMonthScroll(firstDayOfNewMonth: Date) {
                binding.calendarView.removeAllEvents()
                binding.txtMonthYr.text = dateFormatForMonth.format(firstDayOfNewMonth)
                date = firstDayOfNewMonth
                loadData(view)
                defaultDateView(firstDayOfNewMonth)
            }
        })

        loadData(view)
        masterView = view
        return view
    }


    private fun loadData(view: View) {
        binding.viewModel?.getEventCalenderData(getRequestdata(view), binding.bottomView)
    }

    override fun onResume() {
        super.onResume()
        loadData(masterView!!)
    }

    private fun defaultDateView(dateClicked: Date) {
        mCalenderSelectedDate = postserverDate.format(dateClicked)

        val details: MutableList<Event>? = binding.calendarView.getEvents(dateClicked)

        if (details != null) {
            if (AppInstance.alleventDataResponse?.data != null) {
                eventList.clear()
                for (l in 0 until eventDetailList.size) {
                    val startDate = sdf.parse(eventDetailList[l].start)
                    val endDate = sdf.parse(eventDetailList[l].end)

                    val calendarSelectedDate = sdf.parse(mCalenderSelectedDate)

                    if((calendarSelectedDate.after(startDate) && calendarSelectedDate.before(endDate))
                        || (isSameDay(startDate, calendarSelectedDate))
                        || (isSameDay(endDate, calendarSelectedDate))){

                        var involvedClass: String = ""
                        if (eventDetailList[l].involvedEventClassesList != null) {
                            for (j: Int in 0 until eventDetailList[l].involvedEventClassesList?.size!!) {
                                if (involvedClass.isEmpty()) {
                                    involvedClass +=
                                        eventDetailList[l].involvedEventClassesList?.get(j)?.className ?: "no class"
                                } else {
                                    involvedClass += "," +
                                            " ${eventDetailList[l].involvedEventClassesList?.get(j)?.className}"
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
            //  binding.calendarView.invalidate()   prii

        } else {
            binding.eventList.visibility = View.GONE
            binding.txtError.visibility = View.VISIBLE
        }
    }

    private fun getRequestdata(view: View): EventCalenderRequest {
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
        c.set(yearValue, month, day)
        val numOfDaysInMonth = c.getActualMaximum(Calendar.DAY_OF_MONTH)
        println("First Day of month: " + c.time)


        val dateFormat = SimpleDateFormat("E MMM dd yyyy")
        val strDate = dateFormat.format(c.time)

        firstdateofmnth = onlyDateFormatValue.format(c.time).toInt()

        println("Converted String: $strDate")
        c.add(Calendar.DAY_OF_MONTH, numOfDaysInMonth - 1)
        println("Last Day of month: " + c.time)

        val endDate = dateFormat.format(c.time)
        enddateofmnth = onlyDateFormatValue.format(c.time).toInt()

        val body = EventCalenderRequest()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        body.eventSearchFromDate = strDate
        body.eventSearchToDate = endDate
        return body
    }

    @SuppressLint("NewApi")
    private fun attachObserver(viewModel: CalendarViewModel, context: Context) {
        viewModel.isFabClicked.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (mDateClicked.isEmpty()) {
                    val date = Date()
                    mDateClicked = displayDate.format(date)
                    Log.d("Calendar", "attach observer mDateClicked value: " + mDateClicked);
                }

                val intent = Intent(context, AddEventActivity::class.java)
                intent.putExtra("selectedDate", mDateClicked)
                startActivityForResult(intent, EVENT_REQUEST)
            }
        })

        viewModel.deletedEventResponse.observe(this, Observer<Int> { it ->
            it?.let {
                binding.calendarView.invalidate()
                listAdapter.notifyDataSetChanged()
                //  binding.calendarView.removeAllEvents()
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
                        try {
                            if (it.data?.isNotEmpty()!!) {
                                //  eventList.clear()
                                eventDetailList = ArrayList()
                                eventDetailList =
                                    it.data!!
                                val dates: ArrayList<String> = ArrayList()
                                for (i in 0 until eventDetailList.size) {

                                    var startDate = convertStringToDateWithoutTimeZone(
                                        eventDetailList[i].start)

                                    val endDate =
                                        convertStringToDateWithoutTimeZone(eventDetailList[i].end)

                                    while (startDate!!.before(endDate) || startDate.equals(endDate)) {
                                        addEvents(
                                            binding.calendarView,
                                            startDate,
                                            eventList
                                        )

                                        val cal = Calendar.getInstance()
                                        cal.time = startDate
                                        cal.add(Calendar.DAY_OF_MONTH, 1);

                                        startDate = cal.time
                                    }

                                    date?.let { it1 -> defaultDateView(it1) }
                                    Log.d("calendar", "date is" + date)
                                    eventDetailList[i].start?.let { it1 ->
                                        dates.add(it1)
                                    }
                                }
                            } else {
                                binding.eventList.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
                            }
                        } catch (e: Exception) {
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
            binding.calendarView.removeAllEvents()
            loadData(masterView!!)
        }

        else{

        }
    }

    private fun addEvents(
        compactCalendarView: CompactCalendarView,
        day: Date,
        eventNewList: MutableList<AllEventDataList>
    ) {

        try {
            compactCalendarView.removeEvent(
                Event(
                    ContextCompat.getColor(context!!, R.color.colorPrimaryDark),
                    day.time,
                    eventNewList
                )
            )

            compactCalendarView.addEvent(
                Event(
                    ContextCompat.getColor(context!!, R.color.colorPrimaryDark),
                    day.time,
                    eventNewList
                ),
                true
            )

        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

    override fun deleteEvent(eventData: AllEventDataList, position: Int) {
        // if(eventData!=null)
        viewModel.deleteEvent(context!!, eventData.id, position)
        eventList.removeAt(position)
        calendarView.removeEvents(convertStringToDateWithoutTimeZone(eventData.start!!))

        listAdapter.notifyDataSetChanged()

    }

    override fun notifyEvent(eventData: AllEventDataList, position: Int) {
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
        intent.putExtra("selectedDate", mDateClicked)
        (context as Activity).startActivityForResult(intent, EDIT)
    }

    @Subscribe(priority = 1)
    fun onEvent(event: BusMessageEvent){
        showToast(context!!, "Hey, my message" + event.getMessage())
    }

    override fun onStop() {
        EventBus.getDefault().unregister(this)
        super.onStop()
    }

}