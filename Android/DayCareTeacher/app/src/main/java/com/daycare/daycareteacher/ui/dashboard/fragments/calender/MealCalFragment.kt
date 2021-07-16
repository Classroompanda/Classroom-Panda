package com.daycare.daycareteacher.ui.dashboard.fragments.calender

import android.annotation.SuppressLint
import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentMealCalBinding
import com.daycare.daycareteacher.model.AllMealDataResponse
import com.daycare.daycareteacher.model.EventCalenderRequest
import com.daycare.daycareteacher.model.MealData
import com.daycare.daycareteacher.model.MealDataResponse
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.adapter.MealAdapter
import com.daycare.daycareteacher.utill.*
import com.github.sundeepk.compactcalendarview.CompactCalendarView
import com.github.sundeepk.compactcalendarview.domain.Event
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class MealCalFragment : Fragment() {

    lateinit var binding: FragmentMealCalBinding
    private val dateFormatForMonth = SimpleDateFormat("MMM - yyyy", Locale.getDefault())
    private var mealDetailList: List<MealData> = ArrayList<MealData>()
    private val currentCalender = Calendar.getInstance(Locale.getDefault())
    private val monthFormatValue = SimpleDateFormat("M", Locale.getDefault())
    private val yearFormatValue = SimpleDateFormat("yyyy", Locale.getDefault())
    private val onlyDateFormatValue = SimpleDateFormat("d", Locale.getDefault())
    lateinit var viewModel: CalendarViewModel
    var firstdateofmnth: Int = 0
    var enddateofmnth: Int = 0
    var monthValue: String = ""
    var yearValue: Int = 0
    var loader = Loader()
    var mealDetailResponse: List<MealDataResponse> = ArrayList()
    var dateList: ArrayList<String> = ArrayList()
    var mCalenderSelectedDate=""

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_meal_cal, container, false)
        binding = FragmentMealCalBinding.bind(view)

        val recyclerView = binding.mealDetailList
        recyclerView.layoutManager =
            LinearLayoutManager(
                view.context,
                RecyclerView.VERTICAL,
                false
            )
        binding.mealDetailList.layoutManager = recyclerView.layoutManager

        val mCalHeader = dateFormatForMonth.format(binding.calendarView.firstDayOfCurrentMonth)
        viewModel = CalendarViewModel(mCalHeader, OptionConstant.NONE)
        binding.viewModel = viewModel
        loadData(view) //list of events and date of events
        attachObserver(viewModel,view.context)

        binding.calendarView.setListener(object : CompactCalendarView.CompactCalendarViewListener {

            @SuppressLint("LogNotTimber")
            override fun onDayClick(dateClicked: Date) {
                defaultDateView(dateClicked)
            }

            override fun onMonthScroll(firstDayOfNewMonth: Date) {
                binding.calendarView.removeAllEvents()
                binding.txtMonthYr.text = dateFormatForMonth.format(firstDayOfNewMonth)
                binding.mealDetailList.visibility=View.GONE
                binding.txtMealError.visibility=View.VISIBLE
                loadData(view)

            }
        })

        binding.calendarView.shouldDrawIndicatorsBelowSelectedDays(true)
        return view
    }

    private fun defaultDateView(dateClicked: Date) {
        binding.txtMonthYr.text = dateFormatForMonth.format(dateClicked)
        val details: MutableList<Event>? = binding.calendarView.getEvents(dateClicked)
        var mealList: List<MealData> = ArrayList()
        mCalenderSelectedDate = postserverDate.format(dateClicked)  //convertDate(mDateClicked, displayDate, serverDate)
        val pattern = "yyyy-mm-dd'T'hh:mm:ss"
        val simpleDateFormat = SimpleDateFormat(pattern)

        if (details != null) {
            Log.d(ContentValues.TAG, details.toString())

            for (detail in details) {

                mealList = detail.data as List<MealData>

            }

            if (AppInstance.allmealDataResponse?.data != null) {
                mealDetailList=ArrayList()
                for (l in 0 until AppInstance.allmealDataResponse?.data?.size!!) {

                    val sdf = SimpleDateFormat("yyyy-MM-dd")
                    val date1 = sdf.parse(AppInstance.allmealDataResponse?.data!![l].start)
                    val date2 = sdf.parse(mCalenderSelectedDate)

                    println("date1 : " + sdf.format(date1))
                    println("date2 : " + sdf.format(date2))

                    if (date1.compareTo(date2) === 0) {
                        println("Date1 is equal to Date2")

                        // eventList.add(eventDetailList[l])
                        var involvedClass:String=""
                        var fooditem:String=""
                        var foodType:String=""
                        if(AppInstance.allmealDataResponse?.data!![l].involvedClass!=null){
                            for(j:Int in 0 until AppInstance.allmealDataResponse?.data!![l].involvedClass?.size!!) {
                                if(involvedClass.isEmpty()) {
                                    involvedClass += AppInstance.allmealDataResponse?.data!![l].involvedClass?.get(j)?.className ?: "no class"
                                }
                                else{
                                    involvedClass +=", "+ AppInstance.allmealDataResponse?.data!![l].involvedClass?.get(j)?.className ?: "no class"
                                }
                            }

                            for(j:Int in 0 until AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.size!!) {
                                if(fooditem.isEmpty()) {
                                    fooditem += AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.foodTypeName+" "+AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.quantity+" "+AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.measureUnitTypeName ?: "no food"
                                }
                                else{
                                    fooditem +=", "+ AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.foodTypeName+" "+AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.quantity+" "+AppInstance.allmealDataResponse?.data!![l].involvedMealFoodItems?.get(j)?.measureUnitTypeName ?: "no food"
                                }
                            }
                        }

                        if(AppInstance.mealCategoryData!=null && AppInstance.mealCategoryData?.data?.size!! >0){
                            for(k:Int in 0 until AppInstance.mealCategoryData?.data?.size!!){
                                if(AppInstance.mealCategoryData?.data!![k].value==AppInstance.allmealDataResponse?.data!![l].mealTypeID)
                                    foodType= AppInstance.mealCategoryData?.data!![k]?.label.toString()
                            }
                        }

                        (mealDetailList as ArrayList<MealData>).add(MealData(AppInstance.allmealDataResponse?.data!![l].id.toString(),
                            convertLocalToUtc(AppInstance.allmealDataResponse?.data!![l].start!!,alohaDate, mealDisplayDate),
                            convertLocalToUtc(AppInstance.allmealDataResponse?.data!![l].end!!,alohaDate, mealDisplayDate),

                            involvedClass,
                            AppInstance.allmealDataResponse?.data!![l].title.orEmpty(),
                            foodType
                            ,"","","",
                            AppInstance.allmealDataResponse?.data!![l].description.orEmpty(),
                            AppInstance.allmealDataResponse?.data!![l].startTime.orEmpty(),
                            AppInstance.allmealDataResponse?.data!![l].endTime.orEmpty()

                        ))
                    }
                }

            }

            if(mealDetailList.size>0) {
                binding.mealDetailList.visibility=View.VISIBLE
                binding.txtMealError.visibility=View.GONE
                val listAdapter = MealAdapter(context, mealDetailList) //  Set Data in Adapter
                binding.mealDetailList.adapter = listAdapter
                (binding.mealDetailList.adapter as MealAdapter).notifyDataSetChanged()
            }else{
                binding.mealDetailList.visibility=View.GONE
                binding.txtMealError.visibility=View.VISIBLE
            }
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
        body.agencyID = AppInstance.getUser(view!!.context)?.agencyID
        body.eventSearchFromDate = strDate//"Sat Dec 01 2018"
        body.eventSearchToDate = endDate//"Mon Dec 31 2018"

        //Sat Dec 01 2018"
        //eventSearchToDate: "Mon Dec 31 2018"
        return body
    }

    private fun loadData(view: View) {
        System.out.println("Meal Page call")

        binding.viewModel?.getMealCalenderData(getRequestdata(view),view)
       }


    private fun attachObserver(viewModel: CalendarViewModel,context: Context) {
        viewModel.mealDataApiResponse.observe(this, Observer<AllMealDataResponse> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                mealDetailResponse = AppInstance.allmealDataResponse?.data!!
                                for (i in 0 until mealDetailResponse.size) {
                                    val scheduleDateDataJSONObject = mealDetailResponse.get(i)
                                    scheduleDateDataJSONObject?.start?.let { it1 -> dateList.add(it1) }
                                    var classname:String=""
                                    val parts = scheduleDateDataJSONObject?.start?.split("-".toRegex())
                                        ?.dropLastWhile({ it.isEmpty() })
                                        ?.toTypedArray() //2015-12-08
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
                                    addEvents(
                                        binding.calendarView,
                                        Integer.parseInt(scheduleyear!!),
                                        Integer.parseInt(schedulemonth),
                                        Integer.parseInt(scheduleday),
                                        mealDetailList
                                    )
                                    binding.calendarView.invalidate()
                                }
                                val date = Date()
                                defaultDateView(date)

                            }
                        }
                        catch (e:Exception){
                            showToast(context, "No Meal plan added yet")
                        }
                    }
                }
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

    }

    private fun addEvents(
        compactCalendarView: CompactCalendarView,
        year: Int,
        month: Int,
        day: Int,
        mealDetailList: List<MealData>
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

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

                compactCalendarView.removeEvent(
                    Event(
                        resources.getColor(R.color.colorAbsent, resources.newTheme()),
                        currentCalender.timeInMillis,
                        mealDetailList
                    ))

                compactCalendarView.addEvent(
                    Event(
                        resources.getColor(R.color.colorAbsent, resources.newTheme()),
                        currentCalender.timeInMillis,
                        mealDetailList
                    ),
                    false
                )
            } else {
                compactCalendarView.removeEvent( Event(
                    resources.getColor(R.color.colorAbsent),
                    currentCalender.timeInMillis,
                    mealDetailList
                ))

                compactCalendarView.addEvent(
                    Event(
                        resources.getColor(R.color.colorAbsent),
                        currentCalender.timeInMillis,
                        mealDetailList
                    ),
                    false
                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

}