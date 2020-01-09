package com.daycare.daycareparent.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import com.daycare.daycareparent.databinding.DailysheetMealPlanListItemBinding

import com.daycare.daycareparent.model.StudentActivityMealFoodItem
import com.daycare.daycareparent.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareparent.utill.AppInstance

import java.util.*
import android.text.Editable
import android.text.TextWatcher





class SetFoodItemsAdapter(
    var childrenList: ArrayList<StudentActivityMealFoodItem>?,
    var selectedStudentsList: ArrayList<String>,
    var parentPOS:Int
) :
    RecyclerView.Adapter<SetFoodItemsAdapter.StudentsBindingHolder>() {
    private val myList: ArrayList<StudentActivityMealFoodItem>? = childrenList   // for loading main list
    private var arraylist: ArrayList<StudentActivityMealFoodItem>? = null  // for loading  filter data
    var checkedStudentList: ArrayList<String>?


    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
        checkedStudentList  = selectedStudentsList
        AppInstance.MealPlanPos=parentPOS
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SetFoodItemsAdapter.StudentsBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DailysheetMealPlanListItemBinding.inflate(layoutInflater, parent, false)
        return StudentsBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        //return 10 //
        return childrenList?.size!!
    }


    override fun onBindViewHolder(holder: SetFoodItemsAdapter.StudentsBindingHolder, position: Int) {
        val binding = holder.binding

        val viewModel = DailySheetViewModel(myList?.get(position)!!,position)
        binding.viewModel = viewModel

        if(myList.get(position).foodTypeName.equals("Milk")||myList.get(position).foodTypeName.equals("milk")){
            binding.consumeAmountTxt.visibility=View.VISIBLE
            binding.foodSpinnerOptions.visibility=View.GONE
        }else{
            binding.consumeAmountTxt.visibility=View.GONE
            binding.foodSpinnerOptions.visibility=View.VISIBLE
            AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=4
        }


        val dataset = LinkedList(Arrays.asList("None", "Some", "Most", "All"))
        binding.foodSpinnerOptions.attachDataSource(dataset)


        binding.foodSpinnerOptions?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, pos: Int, id: Long) {
                if(pos==0)
                AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=4
                if(pos==1)
                    AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=3
                 if(pos==2)
                    AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=2
                 if(pos==3)
                    AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=1

var data1:String="ggg"
               /* for (pos in 0 until response?.data?.size!!) {
                    if(pos==position){
                        val listAdapter = SetFoodItemsAdapter(response.data!!.get(pos).studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>, selectedItemList)
                        binding?.recentMealRv?.adapter = listAdapter

                    }
                }*/

            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].foodConsumtionID=4
            }
        })


        binding.consumeAmountTxt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

                AppInstance.mealPlanModel?.data?.get(parentPOS)?.studentActivityMealFoodItems!![position].milkConsumptionQuantity=binding.consumeAmountTxt.text.toString()
            }

            override fun afterTextChanged(editable: Editable) {

            }
        })


      /*  if (checkedStudentList?.isNotEmpty()!!) {
            if (checkedStudentList?.contains(myList[position].studentName)!!) {
                binding.checkBox2.isChecked = true
            }
        }
        binding.checkBox2.setOnCheckedChangeListener { p0, p1 ->
            if (p1) {
                myList[position].studentName?.let { checkedStudentList?.add(it) }
            } else {

                if (checkedStudentList!!.contains(myList[position].studentName)) {
                    checkedStudentList!!.remove(myList[position].studentName)
                }

            }
        }*/

    }

    /*fun filter(charText: String) {
        val text = charText.toLowerCase(Locale.getDefault())
        myList?.clear()
        if (charText.isEmpty()) {
            arraylist?.let { myList?.addAll(it) }
        } else {
            if (arraylist != null) {
                for (wp in arraylist!!) {
                    if (wp.studentName?.toLowerCase(Locale.getDefault())?.contains(text)!!) {
                        myList?.add(wp)
                    }
                }
            }
        }
        notifyDataSetChanged()
    }*/

    class StudentsBindingHolder(var binding: DailysheetMealPlanListItemBinding) :
        RecyclerView.ViewHolder(binding.selectMealContainer)

}