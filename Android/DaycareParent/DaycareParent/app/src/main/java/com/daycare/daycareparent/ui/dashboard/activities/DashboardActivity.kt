package com.daycare.daycareparent.ui.dashboard.activities

import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentTransaction
import android.support.v4.content.ContextCompat.startActivity
import android.support.v4.view.GravityCompat
import android.support.v4.widget.DrawerLayout
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityDashboardBinding
import com.daycare.daycareparent.model.Data
import com.daycare.daycareparent.ui.dashboard.adapter.SpinnerAdapter
import com.daycare.daycareparent.ui.dashboard.addchild.AddChildFragment
import com.daycare.daycareparent.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareparent.ui.dashboard.fragments.calender.CalendarFragment
import com.daycare.daycareparent.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareparent.ui.dashboard.fragments.incident.IncidentReportFragment
import com.daycare.daycareparent.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareparent.ui.dashboard.messenging.MsgListFragment
import com.daycare.daycareparent.ui.dashboard.parentprofile.ParentFragment
import com.daycare.daycareparent.ui.dashboard.parentprofile.ProfilesFragment
import com.daycare.daycareparent.ui.dashboard.payment.PaymentListFragment
import com.daycare.daycareparent.ui.dashboard.postactivity.PostFragment
import com.daycare.daycareparent.ui.login.LoginActivity
import com.daycare.daycareparent.ui.profile.EnrollmentReportFragment
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.showDialog
import kotlinx.android.synthetic.main.activity_dashboard.*
import kotlinx.android.synthetic.main.activity_dashboard.view.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import me.drakeet.materialdialog.MaterialDialog


class DashboardActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener,
    AddChildFragment.MyInterface, DrawerLayout.DrawerListener {

    private lateinit var binding: ActivityDashboardBinding
    private var currentFragment: Int = 0
    var loader = Loader()
    var clickFragmentID: Int = 0
    var parentData = Data()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dashboard)
        binding.drawerLayout.toolbar.title = ""
        setSupportActionBar(binding.drawerLayout.toolbar)
       // if (PreferenceConnector.readChild(this, PreferenceConnector.CHILD) != null) {
        if(AppInstance.loginResponse?.data?.childCount!! >0){
            goToFragment(PostFragment(), R.id.nav_home)
        } else {
            goToFragment(AddChildFragment(), R.id.nav_add)
        }
        initView(this)

        val toggle = ActionBarDrawerToggle(
            this, drawer_layout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close
        )
        drawer_layout.addDrawerListener(toggle)
        toggle.syncState()
        nav_view.setNavigationItemSelectedListener(this)
        drawer_layout.addDrawerListener(this)
        binding.drawerLayout.toolbar.logoutTxt.setOnClickListener {
            showLogoutDialog()
        }
    }

    private fun initView(context: Context) {
        parentData = PreferenceConnector.readUser(this, PreferenceConnector.USER)!!
        if (parentData.isGaurdian!!) {
            val menu: Menu = binding.drawerLayout.nav_view.menu
            val nav_add = menu.findItem(R.id.nav_add)
            nav_add.title = "Child List"
        }
    }

    override fun onResume() {
        super.onResume()
        val arrayAdapter =
            AppInstance.allChilds?.let {
                SpinnerAdapter(this, it)
            }
        binding.drawerLayout.toolbar.dropdown.adapter = arrayAdapter
        val data = PreferenceConnector.readChild(this, PreferenceConnector.CHILD)
        if (data != null && AppInstance.allChilds != null) {
            for (pos in 0 until AppInstance.allChilds!!.size) {
                if (AppInstance.allChilds!![pos].studentId == data.studentId) {
                    binding.drawerLayout.toolbar.dropdown.setSelection(pos)
                }
            }
        }
    }
    override fun onDrawerStateChanged(p0: Int) {

    }

    override fun onDrawerSlide(p0: View, p1: Float) {

    }

    override fun onDrawerClosed(p0: View) {

    }

    override fun onDrawerOpened(p0: View) {
        parentData = PreferenceConnector.readUser(this, PreferenceConnector.USER)!!
        val fstr = parentData.firstName
        val lstr = parentData.lastName
        val combineName = fstr + " " + lstr
        val navigationView = findViewById<View>(R.id.nav_view) as NavigationView
        val headerView = navigationView.getHeaderView(0)
        val navUsername = headerView.findViewById(R.id.tvLoginusername) as TextView
        val navEmail = headerView.findViewById(R.id.tvEmailAddress) as TextView
        navUsername.text = combineName
        navEmail.text = parentData.emailAddress
        val profileimage = headerView.findViewById(R.id.imageView) as ImageView

        Glide.with(this).load(parentData.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_placeholder)
            .into(profileimage)


    }


//    override fun onBackPressed() {
//        when {
//            drawer_layout.isDrawerOpen(GravityCompat.START) -> drawer_layout.closeDrawer(GravityCompat.START)
//            currentFragment == R.id.nav_home -> super.onBackPressed()
//            else -> goToFragment(PostFragment(), R.id.nav_home)
//        }
//    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
//        menuInflater.inflate(R.menu.dashboard, menu)
//        val menuItem = menu.findItem(R.id.action_notification)
//        val actionView = menuItem.actionView
//        notificationItemCount = actionView.findViewById(R.id.notification_badge)
//        setupBadge()
//        actionView.setOnClickListener { onOptionsItemSelected(menuItem) }
        return true
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        when (item.itemId) {
//            R.id.action_settings -> {
//                showToast(this, "settings")
//            }
//
//            R.id.action_notification -> {
//                showToast(this, "notification")
//
//            }
//            R.id.action_broadcast_message -> {
//                val intent = Intent(this, MessageBroadcastActivity::class.java)
//                startActivity(intent)
//            }
//            R.id.action_profile -> {
//                val intent = Intent(this, ProfileActivity::class.java)
//                startActivity(intent)
//            }
//
//            R.id.action_breakOut -> {
//                //  showToast(this, "notification")
//
//                mMaterialDialog = MaterialDialog(this)
//                val dialogView = LayoutInflater.from(this)
//                    .inflate(
//                        R.layout.teacher_breakout_dialog,
//                        null
//                    )
//                val dialogBinding = TeacherBreakoutDialogBinding.bind(dialogView)
//                dialogBinding.header.setText("Break Out")
//                dialogBinding.detailEditText.setText("Are you sure to go for Break?")
//                dialogBinding.submitPinBtn.setOnClickListener {
//                    var reason=dialogBinding.reasonEditText.text.toString()
//                    viewModel.BreakOut(this,reason,mMaterialDialog)
//                }
//                dialogBinding.btnCCancel.setOnClickListener {
//                    mMaterialDialog.dismiss()
//                }
//                mMaterialDialog.setCanceledOnTouchOutside(false)
//                mMaterialDialog.setView(dialogView).show()
//            }
//
//
//
//            R.id.action_checkout -> {
//              //  showToast(this, "notification")
//
//                mMaterialDialog = MaterialDialog(this)
//                val dialogView = LayoutInflater.from(this)
//                    .inflate(
//                        R.layout.pin_confirmation_dialog,
//                        null
//                    )
//                val dialogBinding = PinConfirmationDialogBinding.bind(dialogView)
//                dialogBinding.header.setText("Clock Out")
//                dialogBinding.detailEditText.setText("Are you sure to Clock Out for the day?")
//                dialogBinding.submitPinBtn.setOnClickListener {
//                    hideSoftKeyboard(this, dialogBinding.pinEntryEditText)
//                    // showDialog(this, "Clock In", "Clocked In Successfully!!")
//                    // mMaterialDialog.dismiss()
//                    viewModel.ClockOut(this)
//                }
//
//                mMaterialDialog.setCanceledOnTouchOutside(false)
//                mMaterialDialog.setView(dialogView).show()
//            }
//            else -> return super.onOptionsItemSelected(item)
        }
        return true
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        // Handle navigation view item clicks here.
        when (item.itemId) {
            R.id.nav_home -> {
                clickFragmentID = 0

                goToFragment(PostFragment(), item.itemId)

            }
            R.id.nav_attendance -> {

                goToFragment(AttendanceFragment(), item.itemId)

            }
            R.id.nav_dailysheet -> {
                clickFragmentID = 5
                goToFragment(DailySheetFragment(), item.itemId)

            }

            R.id.nav_calendar -> {
                clickFragmentID = 5
                goToFragment(CalendarFragment(), item.itemId)

            }
            R.id.nav_incident -> {
                clickFragmentID = 6
//                (fab as View).visibility = View.GONE
                goToFragment(IncidentReportFragment(), item.itemId)

            }

            R.id.nav_enrollment -> {
                clickFragmentID = 6
                goToFragment(EnrollmentReportFragment(), item.itemId)
            }
            R.id.nav_add -> {
                goToFragment(AddChildFragment(), item.itemId)
            }
            R.id.nav_logout -> {
                showLogoutDialog()
                drawer_layout.closeDrawer(GravityCompat.START)
            }
            R.id.nav_message -> {
                goToFragment(MsgListFragment(), item.itemId)
            }
            R.id.nav_payment -> {
                if (parentData.isGaurdian!!) {
                    showDialog(this, getString(R.string.app_name), "Not an authorized user!!")
                } else {
                    goToFragment(PaymentListFragment(), item.itemId)
                }
            }
            R.id.nav_profile ->{
                goToFragment(ParentFragment(), item.itemId)
            }
        }
        drawer_layout.closeDrawer(GravityCompat.START)
        return true
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
                    PreferenceConnector.clearSharePreferenceKey(this, PreferenceConnector.CHILD)
                    AppInstance.postFragmentCall = null
                    val intentObj = Intent(this, LoginActivity::class.java)
                    startActivity(intentObj)
                    finish()

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
            if (itemId == R.id.nav_home || itemId == R.id.nav_attendance) {
//                (fab as View).visibility = View.VISIBLE
            } else {
                (fab as View).visibility = View.GONE
            }

        }
        drawer_layout.closeDrawer(GravityCompat.START)
    }

    override fun lockDrawer() {
        binding.drawerLayout.setDrawerLockMode(DrawerLayout.LOCK_MODE_LOCKED_CLOSED)
        binding.drawerLayout.toolbar.navigationIcon = null
        binding.drawerLayout.toolbar.logoutTxt.visibility = View.VISIBLE
    }

    override fun unlockDrawer() {
        binding.drawerLayout.setDrawerLockMode(DrawerLayout.LOCK_MODE_UNLOCKED)
        binding.drawerLayout.toolbar.navigationIcon =
            resources.getDrawable(R.drawable.ic_menu_black_24dp, resources.newTheme())
        binding.drawerLayout.toolbar.logoutTxt.visibility = View.GONE
    }


}
