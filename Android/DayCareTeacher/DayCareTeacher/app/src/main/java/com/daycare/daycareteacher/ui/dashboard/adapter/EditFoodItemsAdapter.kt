package com.daycare.daycareteacher.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import com.daycare.daycareteacher.databinding.DailysheetMealEditItemBinding
import com.daycare.daycareteacher.model.StudentActivityMealFoodItem
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.AppInstance
import java.util.*

class EditFoodItemsAdapter(
    var childrenList: ArrayList<StudentActivityMealFoodItem>?,
    var selectedStudentsList: ArrayList<String>,
    var parentPOS:Int
) :
    RecyclerView.Adapter<EditFoodItemsAdapter.StudentsBindingHolder>() {
    private val myList: ArrayList<StudentActivityMealFoodItem>? = childrenList   // for loading main list
    private var arraylist: ArrayList<StudentActivityMealFoodItem>? = null  // for loading  filter data
    var checkedStudentList: ArrayList<String>?


    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
        checkedStudentList  = selectedStudentsList
        AppInstance.MealPlanPos=parentPOS
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EditFoodItemsAdapter.StudentsBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DailysheetMealEditItemBinding.inflate(layoutInflater, parent, false)
        return StudentsBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        //return 10 //
        return childrenList?.size!!
    }


    override fun onBindViewHolder(holder: EditFoodItemsAdapter.StudentsBindingHolder, position: Int) {
        val binding = holder.binding
        val dataset = LinkedList(Arrays.asList("None", "Some", "Most", "All"))
       /* val viewModel = DailySheetViewModel(myList?.get(position)!!,position)
        binding.viewModel = viewModel
*/
        binding.foodItemTxt.text=myList?.get(position)?.foodTypeName
        //binding.foodItemTxt.setText(myList?.get(position)?.foodTypeName)
        binding.amountTxt.setText(myList?.get(position)?.amount!!.toString())
        binding.unitTxt.setText(myList?.get(position)?.measureUnitTypeName)

        if(myList?.get(position)?.foodTypeName.equals("Milk")||myList?.get(position)?.foodTypeName.equals("milk")){
            binding.consumeAmountTxt.visibility= View.VISIBLE
            binding.foodSpinnerOptions.visibility= View.GONE
            binding.consumeAmountTxt.setText(myList?.get(position)?.milkConsumptionQuantity)
        }else{
            binding.consumeAmountTxt.visibility= View.GONE
            binding.foodSpinnerOptions.visibility= View.VISIBLE
            binding.foodSpinnerOptions.attachDataSource(dataset)
            if(AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID!=null) {
                if (AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID == 4) {
                    binding.foodSpinnerOptions.selectedIndex = 0

                } else if (AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID == 3) {
                    binding.foodSpinnerOptions.selectedIndex = 1
                } else if (AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID == 2) {
                    binding.foodSpinnerOptions.selectedIndex = 2
                } else if (AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID == 1) {
                    binding.foodSpinnerOptions.selectedIndex = 3
                }
            }
            else{
                binding.foodSpinnerOptions.selectedIndex = 4
                AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=4
            }

        }






        binding.foodSpinnerOptions?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, pos: Int, id: Long) {
                if(pos==0)
                    AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=4
                if(pos==1)
                    AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=3
                if(pos==2)
                    AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=2
                if(pos==3)
                    AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=1



            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].foodConsumtionID=4
            }
        })


        binding.consumeAmountTxt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

                AppInstance.editMealModel?.data?.studentActivityMealFoodItems!![position].milkConsumptionQuantity=binding.consumeAmountTxt.text.toString()
            }

            override fun afterTextChanged(editable: Editable) {

            }
        })




    }



    class StudentsBindingHolder(var binding: DailysheetMealEditItemBinding) :
        RecyclerView.ViewHolder(binding.selectMealContainer)

}