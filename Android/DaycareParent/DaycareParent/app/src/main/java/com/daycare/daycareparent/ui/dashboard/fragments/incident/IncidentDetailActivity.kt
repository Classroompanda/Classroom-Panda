package com.daycare.daycareparent.ui.dashboard.fragments.incident

import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityEventDetailBinding


import android.arch.lifecycle.Observer
import com.daycare.daycareparent.databinding.ActivityIncidentDetailBinding
import com.daycare.daycareparent.model.IncidentData
import com.daycare.daycareparent.utill.*
import com.google.ads.interactivemedia.v3.internal.it

class IncidentDetailActivity : AppCompatActivity() {

    lateinit var binding: ActivityIncidentDetailBinding
    lateinit var viewModel: IncidentViewModel
    val loader = Loader()
    var catg = ""
    var incidentData: IncidentData? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_incident_detail)
        setToolbar()
        initView()
        attachObserver()
    }

    private fun initView() {
        viewModel = IncidentViewModel()
        binding.viewModel = viewModel
        incidentData = intent.getParcelableExtra(INCIDENT_DATA)
        AppInstance.incidentData = incidentData
        try {

            binding.involveParttxttxt.setText(AppInstance.incidentData?.className)
            binding.studentNametxt.setText(AppInstance.incidentData?.studentName)


            binding.reportedBytxt.setText(AppInstance.incidentData?.teacherName)
            binding.placeOfIncidenttxt.setText(AppInstance.incidentData?.placeOfIncident)


            binding.natureofinjurytxt.setText(AppInstance.incidentData?.natureOfInjuryName)
            binding.bodyParttxt.setText(AppInstance.incidentData?.partOfBody)

            binding.contextEnviortxt.setText(AppInstance.incidentData?.contextEnviroment)
            binding.contextChildtxt.setText(AppInstance.incidentData?.contextChild)

            binding.firstAidtxt.setText(AppInstance.incidentData?.firstAidAdministeredName)
            if(AppInstance.incidentData?.isDoctorRequired==true) {
                binding.docReqtxt.setText("Yes")
            }
            else{
                binding.docReqtxt.setText("No")
            }


            binding.incedentDatetxt.setText(convertDate(AppInstance.incidentData?.incidentDate!!,serverDate, incidentDisplayDate))
            binding.incedentTimetxt.setText(convertDate(AppInstance.incidentData?.incidentTime!!,serverDate, dialogDisplayTime))

            if(AppInstance.incidentData?.wasParentInformed==true) {
                binding.wasInformtxt.setText("Yes")
            }
            else{
                binding.wasInformtxt.setText("No")
            }


            binding.informBytxt.setText(AppInstance.incidentData?.parentInformedBy)
            binding.descrtxt.setText(AppInstance.incidentData?.description)
            var stds = ""
            for (i: Int in 0 until AppInstance.incidentInvolvments?.size!!) {
                stds += if (i == AppInstance.incidentInvolvments?.size!! - 1) {
                    AppInstance.incidentInvolvments!![i].studentName
                } else {
                    AppInstance.incidentInvolvments!![i].studentName + ", "
                }
            }

            binding.involveParttxt.setText(stds+"")

            binding.actionTakentxt.setText(AppInstance.incidentData?.actionTaken)
            if(AppInstance.incidentData?.parentComment!=null)
            binding.commentText.setText(AppInstance.incidentData?.parentComment)
try {
    if (AppInstance.incidentData?.isAcknowledge!!) {
        binding.isAcknowledge.isChecked = true
        binding.btnUpdateIncident.visibility=View.GONE
    } else {
        binding.isAcknowledge.isChecked = false
        binding.btnUpdateIncident.visibility=View.VISIBLE
    }
}catch (e:Exception){
    binding.isAcknowledge.isChecked = false
}
        }catch (e:Exception){
            Log.i("Error","Intent error")
        }


        /*  data.mealPlanID = intent.getIntExtra("id", 2)
          catg = intent.getStringExtra("catg")

          viewModel.getMealDetail(this, data)*/




    }

    private fun setToolbar() {
        val toolbar: Toolbar = binding.includeToolbar
        toolbar.navigationIcon = ContextCompat.getDrawable(this, R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener {
            finish()
        }

    }

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

    }
}
