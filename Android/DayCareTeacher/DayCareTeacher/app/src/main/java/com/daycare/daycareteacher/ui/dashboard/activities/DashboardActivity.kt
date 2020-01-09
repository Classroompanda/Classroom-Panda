package com.daycare.daycareteacher.ui.dashboard.activities

import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentTransaction
import android.support.v4.view.GravityCompat
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuItem
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDashboardBinding
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import kotlinx.android.synthetic.main.activity_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import android.widget.TextView
import android.view.View
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.databinding.PinConfirmationDialogBinding
import com.daycare.daycareteacher.databinding.TeacherBreakoutDialogBinding
import com.daycare.daycareteacher.interfaces.IFragmentCallback
import com.daycare.daycareteacher.model.BaseModel
import com.daycare.daycareteacher.model.TeacherBreakModel
import com.daycare.daycareteacher.model.TeacherClassCheckInModel
import com.daycare.daycareteacher.model.TeacherClassLogModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.adapter.ClassStatusAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.calender.CalendarFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.TestDailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dashboard.HomeFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dashboard.HomeViewModel
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentListFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentMedicationFragment
import com.daycare.daycareteacher.ui.dashboard.messenging.MsgListFragment
import com.daycare.daycareteacher.ui.login.LoginActivity
import com.daycare.daycareteacher.ui.messagebroadcast.MessageBroadcastActivity
import com.daycare.daycareteacher.ui.profile.MyBreakLogFragment
import com.daycare.daycareteacher.ui.profile.ProfileActivity
import com.daycare.daycareteacher.ui.profile.ProfileEditFragment
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.AppInstance.doClockOut
import me.drakeet.materialdialog.MaterialDialog

class DashboardActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener, IFragmentCallback {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var notificationItemCount: TextView
    private var mItemCount = 10
    private var currentFragment: Int = 0

    private var viewModel = HomeViewModel()
    lateinit var mMaterialDialog: MaterialDialog
    var loader = Loader()
    var clickFragmentID: Int = 0


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dashboard)
        binding.viewModel = viewModel
        attachObserver(viewModel, this)
        binding.drawerLayout.toolbar.title = ""
        setSupportActionBar(binding.drawerLayout.toolbar)
        goToFragment(HomeFragment(), R.id.nav_home)
        try {
            if (AppInstance.loginResponse?.data?.teacherTodayAttendenceId == 0) {
                setClockInPin(this)
            } else {
                viewModel.getTeacherBreakStatus(this)
            }


        } catch (E: Exception) {
            Log.i("DATA", "String")
        }

//        fab.setOnClickListener {
//            val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
//            startActivityForResult(cameraIntent, 777)
//        }

        val toggle = ActionBarDrawerToggle(
            this, drawer_layout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close
        )
        drawer_layout.addDrawerListener(toggle)
        toggle.syncState()
        nav_view.setNavigationItemSelectedListener(this)

        val fstr = AppInstance.loginResponse?.data?.firstName
        val lstr = AppInstance.loginResponse?.data?.lastName
        var combineName = fstr + " " + lstr
        val navigationView = findViewById<View>(R.id.nav_view) as NavigationView
        val headerView = navigationView.getHeaderView(0)
        val navUsername = headerView.findViewById(R.id.tvLoginusername) as TextView
        val navEmail = headerView.findViewById(R.id.tvEmailAddress) as TextView
        navUsername.text = combineName
        navEmail.text = AppInstance.loginResponse?.data?.emailAddress
        val profileimage = headerView.findViewById(R.id.imageView) as ImageView
//        Glide.with(this).load(AppInstance.loginResponse?.data?.imagePath)
//            .thumbnail(0.5f)
//            .crossFade()
//            .diskCacheStrategy(DiskCacheStrategy.ALL)
//            .fitCenter()
//            .placeholder(R.drawable.ic_placeholder)
//            .into(profileimage)
        Glide.with(this)
            .load(AppInstance.loginResponse?.data?.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(this))
            .into(profileimage)


    }

    private fun setClockInPin(context: Context) {
        mMaterialDialog = MaterialDialog(context)
        val dialogView = LayoutInflater.from(context)
            .inflate(
                R.layout.pin_confirmation_dialog,
                null
            )
        val dialogBinding = PinConfirmationDialogBinding.bind(dialogView)
        dialogBinding.submitPinBtn.text = "Clock In"
        dialogBinding.submitPinBtn.setOnClickListener {
            hideSoftKeyboard(this, dialogBinding.pinEntryEditText)
            // showDialog(this, "Clock In", "Clocked In Successfully!!")
            // mMaterialDialog.dismiss()
            viewModel.ClockIn(this)
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    override fun onBackPressed() {
        when {
            drawer_layout.isDrawerOpen(GravityCompat.START) -> drawer_layout.closeDrawer(GravityCompat.START)
            currentFragment == R.id.nav_home -> super.onBackPressed()
            else -> goToFragment(HomeFragment(), R.id.nav_home)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.dashboard, menu)
        val menuItem = menu.findItem(R.id.action_notification)
        val actionView = menuItem.actionView
        notificationItemCount = actionView.findViewById(R.id.notification_badge)
        setupBadge()
        actionView.setOnClickListener { onOptionsItemSelected(menuItem) }
        return true
    }

    private fun setupBadge() {

        if (notificationItemCount != null) {
            if (mItemCount == 0) {
                if (notificationItemCount.visibility != View.GONE) {
                    notificationItemCount.visibility = View.GONE
                }
            } else {
                notificationItemCount.text = (Math.min(mItemCount, 99).toString())
                if (notificationItemCount.visibility != View.VISIBLE) {
                    notificationItemCount.visibility = View.VISIBLE
                }
            }
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        when (item.itemId) {
            R.id.action_settings -> {
                showToast(this, "settings")
            }

            R.id.action_notification -> {
                showToast(this, "notification")

            }
            R.id.action_broadcast_message -> {
                val intent = Intent(this, MessageBroadcastActivity::class.java)
                startActivity(intent)
            }
            R.id.action_profile -> {
                val intent = Intent(this, ProfileActivity::class.java)
                startActivity(intent)
            }
            R.id.action_breakOut -> {
                //  showToast(this, "notification")

                mMaterialDialog = MaterialDialog(this)
                val dialogView = LayoutInflater.from(this)
                    .inflate(
                        R.layout.teacher_breakout_dialog,
                        null
                    )
                val dialogBinding = TeacherBreakoutDialogBinding.bind(dialogView)
                dialogBinding.header.setText("Break Out")
                dialogBinding.detailEditText.setText("Are you sure to go for Break?")
                dialogBinding.submitPinBtn.setOnClickListener {
                    var reason = dialogBinding.reasonEditText.text.toString()
                    viewModel.BreakOut(this, reason, mMaterialDialog)
                }
                dialogBinding.btnCCancel.setOnClickListener {
                    mMaterialDialog.dismiss()
                }
                mMaterialDialog.setCanceledOnTouchOutside(false)
                mMaterialDialog.setView(dialogView).show()
            }


            R.id.action_checkout -> {
                //  showToast(this, "notification")
                AlertDialog.Builder(this)
                    .setTitle(getString(R.string.app_name))
                    .setMessage("Are you sure to Clock Out for the day?")
                    .setPositiveButton(
                        "Ok"
                    ) { dialog, id ->
                        dialog.dismiss()
                        viewModel.ClockOut(this)


                    }
                    .setNegativeButton(
                        "Cancle"
                    ) { dialog, id -> dialog.cancel() }
                    .show()
//                mMaterialDialog = MaterialDialog(this)
//                val dialogView = LayoutInflater.from(this)
//                    .inflate(
//                        R.layout.pin_confirmation_dialog,
//                        null
//                    )
//                val dialogBinding = PinConfirmationDialogBinding.bind(dialogView)
//                dialogBinding.header.text = "Clock Out"
//                dialogBinding.detailEditText.text = "Are you sure to Clock Out for the day?"
//                dialogBinding.submitPinBtn.setOnClickListener {
//                    hideSoftKeyboard(this, dialogBinding.pinEntryEditText)
                // showDialog(this, "Clock In", "Clocked In Successfully!!")
                // mMaterialDialog.dismiss()
//                    viewModel.ClockOut(this)
//                }


//                mMaterialDialog.setCanceledOnTouchOutside(true)
//                mMaterialDialog.setView(dialogView).show()
            }
//            else -> return super.onOptionsItemSelected(item)
        }
        return true
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        // Handle navigation view item clicks here.
        when (item.itemId) {
            R.id.nav_home -> {
                clickFragmentID = 0

                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(HomeFragment(), item.itemId)
                } else {
                    //checkInAlert()
                    goToFragment(HomeFragment(), item.itemId)
                }


//                (fab as View).visibility = View.VISIBLE

            }
            R.id.nav_student -> {
                clickFragmentID = 1
//                (fab as View).visibility = View.VISIBLE
                //goToFragment(StudentListFragment(), item.itemId)


                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(StudentListFragment(), item.itemId)
                } else {
                    checkInAlert()
                }


            }
            R.id.nav_attendance -> {
                clickFragmentID = 2
//                (fab as View).visibility = View.VISIBLE
                // goToFragment(AttendanceFragment(), item.itemId)


                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(AttendanceFragment(), item.itemId)
                } else {
                    checkInAlert()
                }


            }
            R.id.nav_message -> {
                goToFragment(MsgListFragment(), item.itemId)
            }
            R.id.nav_dailysheet -> {
                clickFragmentID = 3
//                (fab as View).visibility = View.GONE
                //goToFragment(DailySheetFragment(), item.itemId)

                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(DailySheetFragment(), item.itemId)
                } else {
                    checkInAlert()
                }

            }
            R.id.nav_postactivity -> {
                clickFragmentID = 4
                (fab as View).visibility = View.GONE
                //goToFragment(PostActivityFragment(), item.itemId)


                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(PostActivityFragment(), item.itemId)
                } else {
                    checkInAlert()

                }
            }
            R.id.nav_calendar -> {
                clickFragmentID = 5
//                (fab as View).visibility = View.GONE
                //goToFragment(CalendarFragment(), item.itemId)


                if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(CalendarFragment(), item.itemId)
                } else {
                    checkInAlert()
                }

            }
            R.id.nav_incident -> {
                clickFragmentID = 6
//                (fab as View).visibility = View.GONE
                goToFragment(IncidentFragment(), item.itemId)


            }
            R.id.nav_breaks -> {
                clickFragmentID = 7
//                (fab as View).visibility = View.GONE
                goToFragment(MyBreakLogFragment(), item.itemId)

                /*if(AppInstance.teacherClassCheckInModel==null) {
                    viewModel.getCurrentCheckInStatus(this)
                }
                else{
                    if(AppInstance.teacherClassCheckInModel?.data!=null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()){
                        goToFragment(MyBreakLogFragment(), item.itemId)
                    }else{
                        checkInAlert()
                    }
                }*/
            }
            R.id.nav_medication -> {
//                (fab as View).visibility = View.GONE
                // goToFragment(StudentMedicationFragment(), item.itemId)
                clickFragmentID = 8

                if (AppInstance.teacherClassCheckInModel != null && AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
                    goToFragment(StudentMedicationFragment(), item.itemId)
                } else {
                    checkInAlert()
                }

            }


            R.id.nav_logout -> {
                showLogoutDialog()
                drawer_layout.closeDrawer(GravityCompat.START)
            }
        }
        drawer_layout.closeDrawer(GravityCompat.START)
        return true
    }


    private fun checkInAlert() {
        AlertDialog.Builder(this)
            .setTitle("Class Check In")
            .setMessage("Please Check In into the class")
            .setPositiveButton(
                "Ok"
            ) { dialog, id ->
                dialog.cancel()
            }
            .setNegativeButton(
                "Cancle"
            ) { dialog, id -> dialog.cancel() }
            .show()
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

    private fun goToFragment(fragment: Fragment, itemId: Int) {
        if (itemId != currentFragment) {


            val fragmentTransaction: FragmentTransaction = supportFragmentManager.beginTransaction()
            fragmentTransaction.replace(R.id.frame, fragment, itemId.toString())
            fragmentTransaction.commit()
            currentFragment = itemId
            binding.navView.setCheckedItem(currentFragment)
//            if(itemId==R.id.nav_home||itemId==R.id.nav_attendance||itemId==R.id.nav_student){
//                (fab as View).visibility = View.VISIBLE
//            }else{
            (fab as View).visibility = View.GONE
//            }

        }
        drawer_layout.closeDrawer(GravityCompat.START)
    }

    override fun onQuickAccessTabClicked(fragment: Fragment, nav_id: Int) {
        if (AppInstance.teacherClassCheckInModel?.data != null && AppInstance.teacherClassCheckInModel?.data!!.isNotEmpty()) {
            goToFragment(fragment, nav_id)
        } else {
            checkInAlert()
        }

    }


    private fun attachObserver(viewModel: HomeViewModel, context: Context) {
        viewModel.clockInClockOutAPIResponse.observe(this, Observer<BaseModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.statusCode == 200) {

                            mMaterialDialog.dismiss()
                            if (AppInstance.doClockOut!!) {
                                finish()
                                val intentObj = Intent(this, LoginActivity::class.java)
                                startActivity(intentObj)
                            }

                        } else {
                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })

        viewModel.teacherBreakAPIResponse.observe(this, Observer<TeacherBreakModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.statusCode == 200) {

                            if (it.data != null) {
                                if (it.data!!.breakStatusID == 1) {
                                    mMaterialDialog = MaterialDialog(this)
                                    val dialogView = LayoutInflater.from(this)
                                        .inflate(
                                            R.layout.pin_confirmation_dialog,
                                            null
                                        )
                                    val dialogBinding = PinConfirmationDialogBinding.bind(dialogView)
                                    dialogBinding.header.text = "Break In"
                                    dialogBinding.submitPinBtn.text = "Break In"
                                    dialogBinding.detailEditText.text = "Please do Break In to access the system"
                                    dialogBinding.submitPinBtn.setOnClickListener {
                                        hideSoftKeyboard(this, dialogBinding.pinEntryEditText)
                                        // showDialog(this, "Clock In", "Clocked In Successfully!!")
                                        // mMaterialDialog.dismiss()
                                        viewModel.BreakIn(this, mMaterialDialog)
                                    }
                                    mMaterialDialog.setCanceledOnTouchOutside(false)
                                    mMaterialDialog.setView(dialogView).show()
                                }
                            }

                        } else {
                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })

        viewModel.teacherClassCheckInAPIResponse.observe(this, Observer<TeacherClassCheckInModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.statusCode == 200) {

                            if (it.data != null) {
                                AppInstance.teacherClassCheckInModel = it
                            }

                        } else {
                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
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


}
