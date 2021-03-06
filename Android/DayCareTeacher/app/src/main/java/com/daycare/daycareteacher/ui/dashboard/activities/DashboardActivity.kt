package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.databinding.DataBindingUtil
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import androidx.lifecycle.Observer
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDashboardBinding
import com.daycare.daycareteacher.databinding.PinConfirmationDialogBinding
import com.daycare.daycareteacher.databinding.TeacherBreakoutDialogBinding
import com.daycare.daycareteacher.interfaces.IFragmentCallback
import com.daycare.daycareteacher.model.BaseModel
import com.daycare.daycareteacher.model.TeacherBreakModel
import com.daycare.daycareteacher.model.TeacherClassCheckInModel
import com.daycare.daycareteacher.model.UnReadMessageResponse
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.fragments.allergy.AllergyFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.calender.CalendarFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
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
import com.daycare.daycareteacher.utill.*
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.activity_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import me.drakeet.materialdialog.MaterialDialog

class DashboardActivity : AppCompatActivity(),
    NavigationView.OnNavigationItemSelectedListener, IFragmentCallback,
    DrawerLayout.DrawerListener {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var notificationItemCount: TextView
    private var mItemCount = 10
    private var currentFragment: Int = 0

    private var viewModel = HomeViewModel()
    lateinit var mMaterialDialog: MaterialDialog
    var loader = Loader()
    var clickFragmentID: Int = 0
    lateinit var profileimage: ImageView
    lateinit var navEmail: TextView
    lateinit var navUsername: TextView
    var fstr: String? = null
    var lstr: String? = null
    var combineName: String? = null
    //var teacherClassCheckInModel:TeacherClassCheckInModel?=null

    companion object {
        var context: Context? = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dashboard)
        binding.viewModel = viewModel
        attachObserver(viewModel, this)
        binding.drawerLayout.toolbar.title = ""
        setSupportActionBar(binding.drawerLayout.toolbar)
        context = this
        goToFragment(HomeFragment(), R.id.nav_home)

        try {

            if (!(AppInstance.getUser(this)?.teacherTodayAttendenceStatusId == 1)) {
                setClockInPin(this)
            } else {
                viewModel.getTeacherBreakStatus(this)
            }

        } catch (E: Exception) {
            Log.i("DATA", "String")
        }

        val toggle = ActionBarDrawerToggle(
            this,
            drawer_layout,
            toolbar,
            R.string.navigation_drawer_open,
            R.string.navigation_drawer_close
        )

        drawer_layout.addDrawerListener(toggle)
        toggle.syncState()
        nav_view.setNavigationItemSelectedListener(this)
        drawer_layout.addDrawerListener(this)

        fstr = AppInstance.getUser(this)?.firstName
        lstr = AppInstance.getUser(this)?.lastName

        combineName = fstr + " " + lstr

        val navigationView = findViewById<View>(R.id.nav_view) as NavigationView
        val headerView = navigationView.getHeaderView(0)
        navUsername = headerView.findViewById(R.id.tvLoginusername)
        navEmail = headerView.findViewById(R.id.tvEmailAddress)
        navUsername.text = combineName
        navEmail.text = AppInstance.getUser(this)?.emailAddress
        profileimage = headerView.findViewById(R.id.imageView) as ImageView

        Glide.with(this)
            .load(AppInstance.getUser(this)?.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(this))
            .into(profileimage)

    }

    override fun onResume() {
        super.onResume()
        if (AppInstance.imageChangedOnProfile != null) {
            Glide.with(this)
                .load(AppInstance.imageChangedOnProfile)
                .placeholder(R.drawable.ic_placeholder)
                .transform(CircleTransform(this))
                .into(profileimage)
        }

        if (AppInstance.emailChangedOnProfile != null) {
            navEmail.text = AppInstance.emailChangedOnProfile
        }
        if (AppInstance.fnameChangedOnProfile != null) {
            fstr = AppInstance.fnameChangedOnProfile
        }
        if (AppInstance.lnameChangedOnProfile != null) {
            lstr = AppInstance.lnameChangedOnProfile
        }
        combineName = fstr + " " + lstr

        navUsername.text = combineName
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
            viewModel.ClockIn(this@DashboardActivity)
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    override fun onBackPressed() {
        when {
            drawer_layout.isDrawerOpen(GravityCompat.START) -> drawer_layout.closeDrawer(
                GravityCompat.START
            )
            currentFragment == R.id.nav_home -> super.onBackPressed()
            else -> goToFragment(HomeFragment(), R.id.nav_home)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.dashboard, menu)
        val menuItem = menu.findItem(R.id.action_notification)
        val actionView = menuItem.actionView
        //   notificationItemCount = actionView.findViewById(R.id.notification_badge)
        // setupBadge()
        actionView.setOnClickListener { onOptionsItemSelected(menuItem) }
        return true
    }

    private fun setupBadge() {

        /*val badgeCount = 1
        ShortcutBadger.applyCount(context, badgeCount) //for 1.1.4+ */

        // ShortcutBadger.applyCount(this, 10)

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
                        "Cancel"
                    ) { dialog, id -> dialog.cancel() }
                    .show()

            }
        }
        return true
    }

    // Handle navigation view item clicks here.
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.nav_home -> {
                clickFragmentID = 0

                if (AppInstance.getTeacherInfo(this)?.data != null) {
                    goToFragment(HomeFragment(), item.itemId)
                } else {
                    goToFragment(HomeFragment(), item.itemId)
                }
            }
            R.id.nav_student -> {
                clickFragmentID = 1

                if (AppInstance.getTeacherInfo(this)?.data != null/* && AppInstance.AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()*/) {
                    goToFragment(StudentListFragment(), item.itemId)
                } else {
                    checkInAlert()
                }
            }

            R.id.nav_attendance -> {
                clickFragmentID = 2

                if (AppInstance.getTeacherInfo(this)?.data != null && AppInstance.getTeacherInfo(
                        this
                    )?.data!!.isNotEmpty()
                ) {
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

                if (AppInstance.getTeacherInfo(this)?.data != null
                    && AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()
                ) {
                    goToFragment(DailySheetFragment(), item.itemId)
                } else {
                    checkInAlert()
                }

            }
            R.id.nav_postactivity -> {
                clickFragmentID = 4
                (fab as View).visibility = View.GONE

                if (AppInstance.getTeacherInfo(this)?.data != null && AppInstance.getTeacherInfo(
                        this
                    )?.data!!.isNotEmpty()
                ) {
                    goToFragment(PostActivityFragment(), item.itemId)
                } else {
                    checkInAlert()

                }
            }
            R.id.nav_calendar -> {
                clickFragmentID = 5

                if (AppInstance.getTeacherInfo(this)?.data != null /*&& AppInstance.AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()*/) {
                    goToFragment(CalendarFragment(), item.itemId)
                } else {
                    checkInAlert()
                }
            }
            R.id.nav_incident -> {
                clickFragmentID = 6
                goToFragment(IncidentFragment(), item.itemId)


            }
            R.id.nav_breaks -> {
                clickFragmentID = 7
                goToFragment(MyBreakLogFragment(), item.itemId)
            }

            R.id.nav_medication -> {
                clickFragmentID = 8

                if (AppInstance.getTeacherInfo(this) != null && AppInstance.getTeacherInfo(this)?.data != null
                    && AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()
                ) {
                    goToFragment(StudentMedicationFragment(), item.itemId)
                } else {
                    checkInAlert()
                }

            }

            R.id.nav_allergy -> {
                clickFragmentID = 9

                if (AppInstance.getTeacherInfo(this) != null && AppInstance.getTeacherInfo(this)?.data != null
                    && AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()
                ) {
                    goToFragment((AllergyFragment()), item.itemId)
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
                "Cancel"
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
            (fab as View).visibility = View.GONE

        }
        drawer_layout.closeDrawer(GravityCompat.START)
    }

    override fun onQuickAccessTabClicked(fragment: Fragment, nav_id: Int) {
        if (AppInstance.getTeacherInfo(this)?.data != null && AppInstance.getTeacherInfo(this)?.data!!.isNotEmpty()) {
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
                            try {
                                if (mMaterialDialog != null)
                                    mMaterialDialog.dismiss()
                            } catch (ex: Exception) {
                                ex.printStackTrace()
                            }
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

        viewModel.unreadMessageResponse.observe(this, Observer<UnReadMessageResponse> { it ->
            it.let {
                when (it?.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.statusCode == 200) {
                            if (it.totalRows != null && !(it.totalRows == 0)) {
                                binding.navView.menu.findItem(R.id.nav_message)
                                    .setTitle("Message          " + it.totalRows)
                            } else {
                                binding.navView.menu.findItem(R.id.nav_message).setTitle("Message")
                            }
                        }
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
                                var breakModel: TeacherBreakModel
                                breakModel = it!!
                                if (it.data!!.breakStatusID == 1) {
                                    mMaterialDialog = MaterialDialog(this)
                                    val dialogView = LayoutInflater.from(this)
                                        .inflate(
                                            R.layout.pin_confirmation_dialog,
                                            null
                                        )
                                    val dialogBinding =
                                        PinConfirmationDialogBinding.bind(dialogView)
                                    dialogBinding.header.text = "Break In"
                                    dialogBinding.submitPinBtn.text = "Break In"
                                    dialogBinding.detailEditText.text =
                                        "Please do Break In to access the system"
                                    dialogBinding.submitPinBtn.setOnClickListener {
                                        hideSoftKeyboard(this, dialogBinding.pinEntryEditText)
                                        // showDialog(this, "Clock In", "Clocked In Successfully!!")
                                        // mMaterialDialog.dismiss()
                                        viewModel.BreakIn(this, mMaterialDialog, breakModel)

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

        viewModel.teacherClassCheckInAPIResponse.observe(
            this,
            Observer<TeacherClassCheckInModel> { it ->
                it?.let {
                    when (it.statusCode) {
                        ResponseCodes.Success -> {
                            if (it.statusCode == 200) {

                                if (it.data != null) {
                                    // teacherClassCheckInModel = it
                                    PreferenceConnector.writeTeacherData(
                                        context!!,
                                        PreferenceConnector.TEACHER_CHECKIN,
                                        it
                                    )

                                    //  AppInstance.teacherClassCheckInModel = it
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

    override fun onDrawerStateChanged(p0: Int) {
    }

    override fun onDrawerSlide(p0: View, p1: Float) {
    }

    override fun onDrawerClosed(p0: View) {
    }

    override fun onDrawerOpened(p0: View) {
        viewModel.getUnReadCount(this)

    }
}
