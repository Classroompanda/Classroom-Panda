package com.daycare.daycareparent.ui.dashboard.addchildform

import android.app.AlertDialog
import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.view.View
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityListBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.ui.dashboard.adapter.AllergyListAdapter
import com.daycare.daycareparent.ui.dashboard.adapter.DisabilityListAdapter
import com.daycare.daycareparent.ui.dashboard.adapter.ImmunizationListAdapter
import com.daycare.daycareparent.ui.dashboard.adapter.MedicationAdapter
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant.ADD
import com.daycare.daycareparent.utill.OptionConstant.DELETE
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.TaskId.ALLERGY
import com.daycare.daycareparent.utill.TaskId.DISABLITY
import com.daycare.daycareparent.utill.TaskId.IMMUNIZATION
import com.daycare.daycareparent.utill.TaskId.MEDICATION
import kotlinx.android.synthetic.main.toolbar.view.*

class ListActivity : AppCompatActivity(), ImmunizationListAdapter.ImmunizationCallBack,
    MedicationAdapter.MedicationCallBack, AllergyListAdapter.AllergyCallBack, DisabilityListAdapter.DisablityCallBack {

    lateinit var binding: ActivityListBinding
    lateinit var viewModel: AllergiesInfoViewModel
    lateinit var toolbar: Toolbar
    var loader = Loader()
    var studentData = StudentInfoDetail()
    var state: Int = 0
    lateinit var immAdapter: ImmunizationListAdapter
    var immList = ArrayList<StudentImmunization>()
    lateinit var medAdapter: MedicationAdapter
    var medList = ArrayList<StudentMedication>()
    lateinit var allgAdapter: AllergyListAdapter
    var allgList = ArrayList<StudentAllergy>()
    lateinit var disabAdapter: DisabilityListAdapter
    var disabList = ArrayList<StudentDisability>()
    var status = ADD
    var deletePos = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_list)
        viewModel = AllergiesInfoViewModel()

        state = intent.getIntExtra("viewtype", IMMUNIZATION)
        binding.viewModel = viewModel

        setData()
        attachObserver()

    }

    private fun setData() {
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

        when (state) {
            IMMUNIZATION -> {
                toolbar.headerTxt.text = getString(R.string.immunization)
                studentData.data?.studentImmunizations = intent.getParcelableArrayListExtra("data")
                if (studentData.data?.studentImmunizations != null) {
                    val recyclerView = binding.recyclerView
                    recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
                    binding.recyclerView.layoutManager = recyclerView.layoutManager
                    immList = (studentData.data?.studentImmunizations as java.util.ArrayList<StudentImmunization>?)!!
                    immAdapter = ImmunizationListAdapter(this, immList)
                    binding.recyclerView.adapter = immAdapter
                    immAdapter.setClickListener(this)
                    viewModel.getImmunization(this)

                } else {
//                    no data found
                }
            }
            MEDICATION -> {
                toolbar.headerTxt.text = getString(R.string.medication)
                studentData.data?.studentMedications = intent.getParcelableArrayListExtra("data")
                if (studentData.data?.studentMedications != null) {
                    val recyclerView = binding.recyclerView
                    recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
                    binding.recyclerView.layoutManager = recyclerView.layoutManager

                    medList = studentData.data?.studentMedications as java.util.ArrayList<StudentMedication>
                    medAdapter = MedicationAdapter(this, medList)
                    binding.recyclerView.adapter = medAdapter
                    medAdapter.setClickListener(this)
                    viewModel.getDosage(this)

                } else {

                }
            }
            ALLERGY -> {
                toolbar.headerTxt.text = getString(R.string.allergies)
                studentData.data?.studentAllergies = intent.getParcelableArrayListExtra("data")
                if (studentData.data?.studentAllergies != null) {

                    val recyclerView = binding.recyclerView
                    recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
                    binding.recyclerView.layoutManager = recyclerView.layoutManager
                    allgList = studentData.data?.studentAllergies as java.util.ArrayList<StudentAllergy>
                    allgAdapter = AllergyListAdapter(this, allgList)
                    binding.recyclerView.adapter = allgAdapter
                    allgAdapter.setClickListener(this)
                    viewModel.getAllergy(this)
                    viewModel.getAllergyName(this)
                    viewModel.getReaction(this)

                } else {

                }
            }
            DISABLITY -> {
                toolbar.headerTxt.text = getString(R.string.disability)
                studentData.data?.studentDisabilities = intent.getParcelableArrayListExtra("data")

                if (studentData.data?.studentDisabilities != null) {

                    val recyclerView = binding.recyclerView
                    recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
                    binding.recyclerView.layoutManager = recyclerView.layoutManager
                    disabList = studentData.data?.studentDisabilities as java.util.ArrayList<StudentDisability>
                    disabAdapter = DisabilityListAdapter(this, disabList)
                    binding.recyclerView.adapter = disabAdapter
                    disabAdapter.setClickListener(this)

                } else {

                }
            }
        }

    }

    override fun onDeleteImmunization(
        position: Int,
        studentImmunization: StudentImmunization,
        it: View
    ) {
        //confirmation dialog
        //call api
        AlertDialog.Builder(this)
            .setTitle(this.resources.getString(R.string.app_name))
            .setMessage(this.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                this.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
                    status = DELETE
                    deletePos = position
                    viewModel.deleteImmunization(studentImmunization, it)
                }
            }
            .setNegativeButton(
                this!!.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()

    }

    override fun onEditImmunization(data: StudentImmunization, it: View) {
        status = EDIT
        viewModel.addImmunization(it, data)

    }

    override fun onDeleteMedication(
        position: Int,
        it: View,
        studentMedication: StudentMedication
    ) {
        AlertDialog.Builder(this)
            .setTitle(this.resources.getString(R.string.app_name))
            .setMessage(this.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                this.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
                    status = DELETE
                    deletePos = position
                    viewModel.deleteMedication(studentMedication, it)
                }
            }
            .setNegativeButton(
                this!!.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()
    }

    override fun onEditMedication(data: StudentMedication, it: View) {
        status = EDIT
        viewModel.addMedication(it, data)
    }

    override fun onDeleteAllergy(
        position: Int,
        it: View,
        studentAllergy: StudentAllergy
    ) {
        AlertDialog.Builder(this)
            .setTitle(this.resources.getString(R.string.app_name))
            .setMessage(this.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                this.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
                    status = DELETE
                    deletePos = position
                    viewModel.deleteAllergy(studentAllergy, it)
                }
            }
            .setNegativeButton(
                this!!.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()
    }

    override fun onEditAllergy(data: StudentAllergy, it: View) {
        status = EDIT
        viewModel.addAllergy(it, data)
    }

    override fun onDeleteDisablity(
        position: Int,
        it: View,
        studentDisability: StudentDisability
    ) {
        AlertDialog.Builder(this)
            .setTitle(this.resources.getString(R.string.app_name))
            .setMessage(this.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                this.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
                    status = DELETE
                    deletePos = position
                    viewModel.deleteDisability(studentDisability, it)
                }
            }
            .setNegativeButton(
                this!!.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()
    }

    override fun onEditDisablity(data: StudentDisability, it: View) {
        status = EDIT
        viewModel.addDisability(it, data)
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
        viewModel.immunizationResponse.observe(this, Observer<StudentImmunization> { it ->
            it.let {
                if (it != null) {
                    when (status) {
                        DELETE -> {
                            immList.removeAt(deletePos)
                            immAdapter.notifyItemRemoved(deletePos)
                            AppInstance.completeStdDetail?.data?.studentImmunizations?.removeAt(deletePos)
                        }
                        ADD -> {
                            immList.add(it)
                            immAdapter.notifyItemChanged(0)
                            AppInstance.completeStdDetail?.data?.studentImmunizations?.add(0,it)

                        }
                        EDIT -> {
                            for (pos in 0 until immList.size) {
                                if (immList[pos].studentImmunizationID == it.studentImmunizationID) {
                                    immList[pos] = it
                                    immList[pos].immunizationName = viewModel.list[it.immunizationID!!]
                                }
                                if (AppInstance.completeStdDetail?.data?.studentImmunizations?.get(pos)?.studentImmunizationID == it.studentImmunizationID) {
                                    AppInstance.completeStdDetail?.data?.studentImmunizations?.set(pos, immList[pos])
                                }
                            }
                            immAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
        })
        viewModel.allergyResponse.observe(this, Observer<StudentAllergy> { it ->
            it.let {
                if (it != null) {
                    when (status) {
                        DELETE -> {
                            allgList.removeAt(deletePos)
                            allgAdapter.notifyItemRemoved(deletePos)
                            AppInstance.completeStdDetail?.data?.studentAllergies?.removeAt(deletePos)

                        }
                        ADD -> {
                            allgList.add(it)
                            allgAdapter.notifyItemChanged(0)
                            AppInstance.completeStdDetail?.data?.studentAllergies?.add(0,it)
                        }
                        EDIT -> {
                            for (pos in 0 until allgList.size) {
                                if (allgList[pos].studentAllergiesID == it.studentAllergiesID) {
                                    allgList[pos] = it
                                    allgList[pos].allergyName = viewModel.allergyNameList[it.allergyNameID!!]
                                    allgList[pos].allergyTypeName = viewModel.allergyList[it.allergyTypeID!!]
                                    allgList[pos].allergyReactionTypeName =
                                        viewModel.reactionList[it.allergyReactionTypeID!!]
                                }
                                if (AppInstance.completeStdDetail?.data?.studentAllergies?.get(pos)?.studentAllergiesID == it.studentAllergiesID) {
                                    AppInstance.completeStdDetail?.data?.studentAllergies?.set(pos, allgList[pos])
                                }
                            }
                            allgAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
        })
        viewModel.medicationResponse.observe(this, Observer<StudentMedication> { it ->
            it.let {
                if (it != null) {
                    when (status) {
                        DELETE -> {
                            medList.removeAt(deletePos)
                            medAdapter.notifyItemRemoved(deletePos)
                            AppInstance.completeStdDetail?.data?.studentMedications?.removeAt(deletePos)

                        }
                        ADD -> {
                            medList.add(it)
                            medAdapter.notifyItemChanged(0)
                            AppInstance.completeStdDetail?.data?.studentMedications?.add(0,it)
                        }
                        EDIT -> {
                            for (pos in 0 until medList.size) {
                                if (medList[pos].studentMedicationID == it.studentMedicationID) {
                                    medList[pos] = it
                                    medList[pos].doseRepeatName = viewModel.doseList[it.doseRepeatID!!]
                                }
                                if (AppInstance.completeStdDetail?.data?.studentMedications?.get(pos)?.studentMedicationID == it.studentMedicationID) {
                                    AppInstance.completeStdDetail?.data?.studentMedications?.set(pos, medList[pos])
                                }
                            }
                            medAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
        })
        viewModel.disabilityResponse.observe(this, Observer<StudentDisability> { it ->
            it.let {
                if (it != null) {
                    when (status) {
                        DELETE -> {
                            disabList.removeAt(deletePos)
                            disabAdapter.notifyItemRemoved(deletePos)
                            AppInstance.completeStdDetail?.data?.studentDisabilities?.removeAt(deletePos)

                        }
                        ADD -> {
                            disabList.add(it)
                            disabAdapter.notifyItemChanged(0)
                            AppInstance.completeStdDetail?.data?.studentDisabilities?.add(0,it)
                        }
                        EDIT -> {
                            for (pos in 0 until disabList.size) {
                                if (disabList[pos].id == it.id) {
                                    disabList[pos] = it
                                }
                                if (AppInstance.completeStdDetail?.data?.studentDisabilities?.get(pos)?.id == it.id) {
                                    AppInstance.completeStdDetail?.data?.studentDisabilities?.set(pos, it)
                                }
                            }
                            disabAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
        })
//        baseViewModel.viewGuardianData.observe(this, Observer<ArrayList<GuardianData>> { it ->
//            it.let {
//                if (it != null && it.isNotEmpty()) {
//                    list.addAll(it)
//                    listAdapter.notifyDataSetChanged()
//                } else {
////                        No Record Found
//                }
//            }
//        })
    }

}
