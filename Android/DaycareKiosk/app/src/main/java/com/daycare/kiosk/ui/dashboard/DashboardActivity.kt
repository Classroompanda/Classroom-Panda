package com.daycare.kiosk.ui.dashboard

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.kiosk.R
import com.daycare.kiosk.databinding.ActivityDashboardBinding
import com.daycare.kiosk.databinding.ListItemPickNDropBinding
import com.daycare.kiosk.interfaces.ILoaderCallback
import com.daycare.kiosk.interfaces.ItemCallBack
import com.daycare.kiosk.repository.ResponseCodes
import com.daycare.kiosk.ui.login.LoginActivity
import com.daycare.kiosk.utill.*
import java.util.*
import android.os.CountDownTimer
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.daycare.kiosk.model.*
import com.daycare.kiosk.repository.LogoutService
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import kotlin.collections.ArrayList


class DashboardActivity : AppCompatActivity(), ILoaderCallback,ItemCallBack {


    lateinit var binding: ActivityDashboardBinding
    lateinit var viewModel: DashboardViewModel
    lateinit var todaysDate: Date
    var loader = Loader()
    var selectedStudentsList = ArrayList<String>()
    var allInvolvedStudent = MutableLiveData<ArrayList<String>>()
    lateinit var listAdapter:DashboardAdapter
    lateinit var mListData: ArrayList<StudentListResponse.Datum>
    lateinit var timer:CountDownTimer
    var statusFlag = IS_TO_BE_CHECKED
    lateinit var selectedStudentData :StudentListResponse.Datum

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        todaysDate = Calendar.getInstance().time!!
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dashboard)
        viewModel = DashboardViewModel()
        binding.viewModel = viewModel
        attachObserver()
        binding.nameTxt.text= AppInstance.logObj!!.data!!.firstName
        val day: String = dayofWeek.format(todaysDate)
        val month: String = monthYear.format(todaysDate)
        val date: String = numDate.format(todaysDate)
        val time: String = displayTime.format(todaysDate)



        binding!!.dayTxt.text = date
        binding.monthTxt.text = month
        binding.weekDayTxt.text = day
        binding.timeTxt.text=time

        Glide.with(this).load(AppInstance.logObj?.data?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_user)
            .into(binding.circleImageView)

        viewModel.getChildList()
        val recyclerView = binding.recyclerView
        recyclerView.layoutManager = LinearLayoutManager(this, RecyclerView.HORIZONTAL, false)
        binding.recyclerView.layoutManager = recyclerView.layoutManager


        binding.enterBtn.setOnClickListener {
            allInvolvedStudent.value = listAdapter.checkedStudentList
            if (listAdapter.checkedStudentList != null && listAdapter.checkedStudentList!!.size>0) {
                selectedStudentsList = listAdapter.checkedStudentList!!
            }
        }

        binding.logOut.setOnClickListener {
            /*finish()
            val intentObj = Intent(this, LoginActivity::class.java)
            startActivity(intentObj)*/

            showLogoutDialog()


        }

        binding.sign.setOnClickListener {
            showToast(this,"Sign Please")
            val intent=Intent(this,SignatureActivity::class.java)
            if(selectedStudentData.isSubsidy) {
                intent.putExtra("StudentID", selectedStudentData.studentId)
            }
            startActivity(intent)
        }



         timer= object : CountDownTimer((2 * 60 * 10000).toLong(), 100) {

            override fun onTick(millisUntilFinished: Long) {
                //Some code
            }

            override fun onFinish() {
                finish()


                val inta=Intent(this@DashboardActivity,LoginActivity::class.java)
                startActivity(inta)
            }
        }
        binding.sign.visibility = View.INVISIBLE
    }

    private fun showLogoutDialog() {
        AlertDialog.Builder(this)
            .setTitle(R.string.logout)
            .setMessage("Are you sure you want to logout?")
            .setPositiveButton(
                "Yes"
            ) { dialog, id ->
                run {
                    dialog.cancel()
                    finish()
                    val intentObj = Intent(this, LoginActivity::class.java)
                    startActivity(intentObj)
                }
            }
            .setNegativeButton(
                "No"
            ) { dialog, id -> dialog.cancel() }
            .show()
    }


    /*override fun onPickNDropClick(view: View, data: StudentListResponse.Datum) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        val binding = DataBindingUtil.findBinding<ListItemPickNDropBinding>(view)
    }
*/
    private fun attachObserver() {

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.studentListApiResponse.observe(this, Observer<StudentListResponse> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {


                        if (it.data?.isNotEmpty()!!&&it.data!=null) {
                            binding.recyclerView.visibility= View.VISIBLE
                            //binding.txtError.visibility= View.GONE
                             mListData= it.data as ArrayList<StudentListResponse.Datum>
                            listAdapter = DashboardAdapter(this, mListData,selectedStudentsList)
                           //  Set Data in Adapter
                            binding.recyclerView.adapter = listAdapter
                            listAdapter.setClickListener(this)
                        } else {
                            binding.recyclerView.visibility= View.GONE
                            //binding.txtError.visibility= View.VISIBLE
                            showToast(this, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(this, it.message!!)
                    }
                }
            }
        })




        viewModel.updateListApiResponse.observe(this, Observer<UpdateStatusResponse> { it ->
            it?.let {

                Log.e("SWAPLOG", "updateListApiResponse  call")
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        mListData.removeAt(AppInstance.parentPosition!!)
                       listAdapter.notifyDataSetChanged()
                    }
                    else -> {
                        showToast(this, it.message!!)
                    }



            }

            }
        }
    )

        viewModel.sampleResponse.observe(this, Observer<Boolean> { it ->
            it?.let {

                Log.e("SWAPLOG", "updateListApiResponse  call Sample response")

              if(it){
                  mListData.removeAt(AppInstance.parentPosition!!)
                  listAdapter.notifyDataSetChanged()
              }else{
                  showToast(this, "No data update")
              }





            }
        }
        )


    }
    override fun startLoader(value: Boolean) {
        if (value) {
            let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }



    override fun onResume() {
        super.onResume()
        timer.start()

        //LogoutService.timer.start()
    }

    override fun onStop() {
        super.onStop()
        timer.cancel()
       // LogoutService.timer.cancel()
        EventBus.getDefault().unregister(this);
    }

    override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this);
    }

    @Subscribe(priority = 1)
    fun onEvent(event: MessageEvent){
        //showToast(this, "Hey, my message" + event.getMessage())

        mListData.removeAt(AppInstance.parentPosition!!)
        listAdapter.notifyDataSetChanged()
        if(mListData.size==0){
            this.startActivity(Intent(this, LoginActivity::class.java))
            (this).finish()
        }

    }

    override fun onPickNDropClick(view: View, data: StudentListResponse.Datum, pos: Int) {
        selectedStudentData = data
        if(selectedStudentData.isSubsidy){
            binding.sign.visibility = View.VISIBLE
        }
    }

    override fun onBreakClick(view: View, data: StudentListResponse.Datum, pos: Int) {
        selectedStudentData = data
        if(selectedStudentData.isSubsidy){
            binding.sign.visibility = View.VISIBLE
        }
    }


}
