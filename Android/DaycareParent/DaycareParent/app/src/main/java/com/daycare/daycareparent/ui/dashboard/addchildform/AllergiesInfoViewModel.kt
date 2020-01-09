package com.daycare.daycareparent.ui.dashboard.addchildform

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.content.Intent
import android.databinding.ObservableField
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.DialogAddAllergyBinding
import com.daycare.daycareparent.databinding.DialogAddDisablityBinding
import com.daycare.daycareparent.databinding.DialogAddImmunizationBinding
import com.daycare.daycareparent.databinding.DialogAddMedicationBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.TaskId.ALLERGY
import com.daycare.daycareparent.utill.TaskId.DISABLITY
import com.daycare.daycareparent.utill.TaskId.IMMUNIZATION
import com.daycare.daycareparent.utill.TaskId.MEDICATION
import kotlin.collections.ArrayList

class AllergiesInfoViewModel : ViewModel() {

    val isLoading = MutableLiveData<Boolean>()
    lateinit var immunizationAdapter: ArrayAdapter<String>
    lateinit var allergyAdapter: ArrayAdapter<String>
    lateinit var allergyNameAdapter: ArrayAdapter<String>
    lateinit var reactionAdapter: ArrayAdapter<String>
    lateinit var doseAdapter: ArrayAdapter<String>


    val list = ArrayList<String>()
    val allergyList = ArrayList<String>()
    val allergyNameList = ArrayList<String>()
    val reactionList = ArrayList<String>()
    val doseList = ArrayList<String>()
    val imRecord = ObservableField<String>()
    val allgRecord = ObservableField<String>()
    val disbRecord = ObservableField<String>()
    val medRecord = ObservableField<String>()
    val studentData = ObservableField<StudentInfoDetail>()
    val imRecordData = ObservableField<StudentImmunization>()
    val allgRecordData = ObservableField<StudentAllergy>()
    val disbRecordData = ObservableField<StudentDisability>()
    val medRecordData = ObservableField<StudentMedication>()
    val immunizationResponse = MutableLiveData<StudentImmunization>()
    val medicationResponse = MutableLiveData<StudentMedication>()
    val allergyResponse = MutableLiveData<StudentAllergy>()
    val disabilityResponse = MutableLiveData<StudentDisability>()

    fun onClickAddImmunization(view: View) {

        addImmunization(view, null)
    }

    fun addImmunization(view: View, data: StudentImmunization?) {

        if (AppInstance.basicInfo != null) {
            val li = LayoutInflater.from(view.context)
            val dialogView = li.inflate(R.layout.dialog_add_immunization, null)
            val alertDialogBuilder = AlertDialog.Builder(view.context)
            val dialogBinding = DialogAddImmunizationBinding.bind(dialogView)
            immunizationAdapter =
                ArrayAdapter(view.context, android.R.layout.simple_spinner_dropdown_item, list)
            immunizationAdapter.setDropDownViewResource(R.layout.custom_spinner)

            dialogBinding.immunizationTxt.adapter = immunizationAdapter
            dialogBinding.dobTxtedt.setOnClickListener {
                datepicker(it.context, it as TextInputEditText)
                hideSoftKeyboard(it.context,it)
            }
            dialogBinding.immunizationTxt.onItemSelectedListener = (object : AdapterView.OnItemSelectedListener {
                override fun onNothingSelected(p0: AdapterView<*>?) {

                }

                override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
                    if (p2 == list.size - 1) {
                        dialogBinding.otherTxt.visibility = View.VISIBLE
                        dialogBinding.abbreviationTxt.visibility = View.VISIBLE
                    } else {
                        dialogBinding.otherTxt.visibility = View.GONE
                        dialogBinding.abbreviationTxt.visibility = View.GONE
                    }
                }
            })
            // set prompts.xml to alertdialog builder
            alertDialogBuilder.setView(dialogView)
            alertDialogBuilder.setCancelable(false)

            if (data != null) {
                setImmunizationData(data, dialogBinding)
            }

            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()

            dialogBinding.cancelBtn.setOnClickListener {
                alertDialog.cancel()
            }

            dialogBinding.saveBtn.setOnClickListener {
                val requestData = StudentImmunization()
                requestData.abbreviation = dialogBinding.abbreviationEdt.text.toString()
                requestData.agencyID = AppInstance.loginResponse?.data?.agencyID
                requestData.dateReceived =
                    convertDate(dialogBinding.dobTxtedt.text.toString(), incidentDisplayDate, serverDate)
                requestData.studentImmunizationID = 0
                requestData.id = 0
                requestData.immunizationID = dialogBinding.immunizationTxt.selectedItemPosition
                requestData.otherImmunization = dialogBinding.otherTxtEdt.text.toString()
                requestData.studentID = AppInstance.basicInfo!!.studentId

                if (data != null) {
                    requestData.studentImmunizationID = data.studentImmunizationID
                    requestData.id = data.studentImmunizationID
                    requestData.updatedBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }else{
                    requestData.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }

                if (validatedForm(requestData, dialogBinding)) {
                    addImmunizationApi(requestData, view)
                    alertDialog.dismiss()
                }
            }
        } else {
            showDialog(
                view.context,
                view.context.getString(R.string.app_name),
                view.context.getString(R.string.add_basic_info)
            )
        }
    }

    private fun setImmunizationData(data: StudentImmunization, dialogBinding: DialogAddImmunizationBinding) {
        data.immunizationID?.let { dialogBinding.immunizationTxt.setSelection(it) }
        dialogBinding.dobTxtedt.setText(convertDate(data.dateReceived.toString(), alohaDate, incidentDisplayDate))
        dialogBinding.abbreviationEdt.setText(data.abbreviation)
        dialogBinding.otherTxtEdt.setText(data.otherImmunization)
    }

    private fun addImmunizationApi(
        requestData: StudentImmunization,
        view: View
    ) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveStudentImmunization(requestData), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    requestData.id = response.saveId
                    requestData.studentImmunizationID = response.saveId
                    immunizationResponse.value = requestData
                }
                isLoading.value = false

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
            }
        })


    }

    private fun validatedForm(
        requestData: StudentImmunization,
        binding: DialogAddImmunizationBinding?
    ): Boolean {
        when {

            requestData.immunizationID == 0 -> {
                binding?.textView39?.visibility = View.VISIBLE
                binding?.dobTxt?.isErrorEnabled = false
                return false
            }
            requestData.dateReceived.isNullOrEmpty() -> {
                binding?.dobTxt?.error = "Please enter date."
                binding?.dobTxtedt?.requestFocus(R.id.phoneTxtedt)
                binding?.textView39?.visibility = View.GONE
                return false
            }

            else -> return true
        }

    }

    fun onClickAddAllergies(view: View) {
        addAllergy(view, null)
    }

    fun addAllergy(view: View, data: StudentAllergy?) {
        if (AppInstance.basicInfo != null) {
            val li = LayoutInflater.from(view.context)
            val dialogView = li.inflate(R.layout.dialog_add_allergy, null)
            val alertDialogBuilder = AlertDialog.Builder(view.context)
            val dialogBinding = DialogAddAllergyBinding.bind(dialogView)

            allergyAdapter =
                ArrayAdapter(view.context, android.R.layout.simple_spinner_dropdown_item, allergyList)
            allergyAdapter.setDropDownViewResource(R.layout.custom_spinner)
            dialogBinding.spinnerAllergy.adapter = allergyAdapter

            allergyNameAdapter =
                ArrayAdapter(view.context, android.R.layout.simple_spinner_dropdown_item, allergyNameList)
            allergyNameAdapter.setDropDownViewResource(R.layout.custom_spinner)
            dialogBinding.spinnerAllergyName.adapter = allergyNameAdapter

            reactionAdapter =
                ArrayAdapter(view.context, android.R.layout.simple_spinner_dropdown_item, reactionList)
            reactionAdapter.setDropDownViewResource(R.layout.custom_spinner)
            dialogBinding.spinnerReaction.adapter = reactionAdapter

            dialogBinding.frstObsTxt.setOnClickListener {
                datepicker(it.context, it as TextInputEditText)
                hideSoftKeyboard(it.context,it)

            }
            dialogBinding.lstObsTxt.setOnClickListener {
                datepicker(it.context, it as TextInputEditText)
                hideSoftKeyboard(it.context,it)

            }
            // set prompts.xml to alertdialog builder
            alertDialogBuilder.setView(dialogView)
            alertDialogBuilder.setCancelable(false)

            if (data != null) {
                setAllergyData(data, dialogBinding)
            }

            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
            dialogBinding.cancelBtn.setOnClickListener {
                alertDialog.cancel()
            }
            dialogBinding.saveBtn.setOnClickListener {
                val requestData = StudentAllergy()

                requestData.agencyID = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.agencyID
                requestData.allergyComment = dialogBinding.commentEdt.text.toString()
                requestData.allergyNameID = dialogBinding.spinnerAllergyName.selectedItemPosition
                requestData.allergyReactionTypeID = dialogBinding.spinnerReaction.selectedItemPosition
                requestData.allergyTypeID = dialogBinding.spinnerAllergy.selectedItemPosition
                requestData.firstAllergyObservation =
                    convertDate(dialogBinding.frstObsTxt.text.toString(), incidentDisplayDate, serverDate)
                requestData.id = 0
                requestData.lastAllergyObservation =
                    convertDate(dialogBinding.lstObsTxt.text.toString(), incidentDisplayDate, serverDate)
                requestData.studentAllergiesID = 0
                requestData.studentID = AppInstance.basicInfo?.studentId!!
                requestData.treatment = dialogBinding.treatmentInput.text.toString()
                if (data != null) {
                    requestData.studentAllergiesID = data.studentAllergiesID!!
                    requestData.id = data.studentAllergiesID
                    requestData.updatedBy=PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID
                }else{
                    requestData.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID
                }
                if (validatedAllergyForm(requestData, dialogBinding)) {
                    addAllergiesApi(requestData, view)
                    alertDialog.dismiss()
                }
            }
        } else {
            showDialog(
                view.context,
                view.context.getString(R.string.app_name),
                view.context.getString(R.string.add_basic_info)
            )
        }
    }

    private fun setAllergyData(data: StudentAllergy, dialogBinding: DialogAddAllergyBinding) {

        data.allergyNameID?.let { dialogBinding.spinnerAllergyName.setSelection(it) }
        data.allergyTypeID?.let { dialogBinding.spinnerAllergy.setSelection(it) }
        data.allergyReactionTypeID?.let { dialogBinding.spinnerReaction.setSelection(it) }
        dialogBinding.treatmentInput.setText(data.treatment)
        dialogBinding.frstObsTxt.setText(
            convertDate(
                data.firstAllergyObservation.toString(), alohaDate,
                incidentDisplayDate
            )
        )
        dialogBinding.lstObsTxt.setText(
            convertDate(
                data.lastAllergyObservation.toString(), alohaDate,
                incidentDisplayDate
            )
        )
        dialogBinding.commentEdt.setText(data.allergyComment)


    }

    private fun validatedAllergyForm(
        requestData: StudentAllergy,
        binding: DialogAddAllergyBinding?
    ): Boolean {

        when {

            requestData.allergyTypeID == 0 -> {
                binding?.textView44?.visibility = View.VISIBLE
                binding?.textView45?.visibility = View.GONE
                binding?.textView46?.visibility = View.GONE

                binding?.treatmentTxt?.isErrorEnabled = false
                binding?.frstObservedTxt?.isErrorEnabled = false
                binding?.lstObservedTxt?.isErrorEnabled = false

                return false
            }
            requestData.allergyNameID == 0 -> {
                binding?.textView44?.visibility = View.GONE
                binding?.textView45?.visibility = View.VISIBLE
                binding?.textView46?.visibility = View.GONE

                binding?.treatmentTxt?.isErrorEnabled = false
                binding?.frstObservedTxt?.isErrorEnabled = false
                binding?.lstObservedTxt?.isErrorEnabled = false

                return false
            }
            requestData.allergyReactionTypeID == 0 -> {
                binding?.textView44?.visibility = View.GONE
                binding?.textView45?.visibility = View.GONE
                binding?.textView46?.visibility = View.VISIBLE

                binding?.treatmentTxt?.isErrorEnabled = false
                binding?.frstObservedTxt?.isErrorEnabled = false
                binding?.lstObservedTxt?.isErrorEnabled = false

                return false
            }
            requestData.treatment.isNullOrEmpty() -> {
                binding?.textView44?.visibility = View.GONE
                binding?.textView45?.visibility = View.GONE
                binding?.textView46?.visibility = View.GONE
                binding?.lstObservedTxt?.isErrorEnabled = false
                binding?.treatmentTxt?.error = "Please enter treatment"
                binding?.treatmentInput?.requestFocus(R.id.treatmentInput)
                binding?.frstObservedTxt?.isErrorEnabled = false
                return false
            }
            requestData.firstAllergyObservation.isNullOrEmpty() -> {
                binding?.textView44?.visibility = View.GONE
                binding?.textView45?.visibility = View.GONE
                binding?.textView46?.visibility = View.GONE
                binding?.treatmentTxt?.isErrorEnabled = false
                binding?.frstObservedTxt?.error = "Please enter first observed"
                binding?.frstObsTxt?.requestFocus(R.id.frstObsTxt)
                binding?.lstObservedTxt?.isErrorEnabled = false
                return false
            }
            requestData.lastAllergyObservation.isNullOrEmpty() -> {
                binding?.textView44?.visibility = View.GONE
                binding?.textView45?.visibility = View.GONE
                binding?.textView46?.visibility = View.GONE
                binding?.treatmentTxt?.isErrorEnabled = false
                binding?.lstObservedTxt?.error = "Please enter last observed"
                binding?.lstObsTxt?.requestFocus(R.id.lstObsTxt)
                binding?.frstObservedTxt?.isErrorEnabled = false
                return false
            }


            else -> return true
        }

    }

    private fun addAllergiesApi(requestData: StudentAllergy, view: View) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveStudentAllergies(requestData), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    requestData.id = response.saveId
                    requestData.studentAllergiesID = response.saveId!!
                    allergyResponse.value = requestData
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
            }
        })

    }

    fun onClickAddMedication(view: View) {
        addMedication(view, null)
    }

    fun addMedication(view: View, data: StudentMedication?) {
        if (AppInstance.basicInfo != null) {
            val li = LayoutInflater.from(view.context)
            val dialogView = li.inflate(R.layout.dialog_add_medication, null)
            val alertDialogBuilder = AlertDialog.Builder(view.context)
            val dialogBinding = DialogAddMedicationBinding.bind(dialogView)
            doseAdapter =
                ArrayAdapter(view.context, android.R.layout.simple_spinner_dropdown_item, doseList)
            doseAdapter.setDropDownViewResource(R.layout.custom_spinner)
            dialogBinding.spinnerDose.adapter = doseAdapter
            dialogBinding.startDateEdt.setOnClickListener {
                datepickerFuture(it.context, it as TextInputEditText)
            }
            dialogBinding.endDateEdt.setOnClickListener {
                datepickerFuture(it.context, it as TextInputEditText)
                hideSoftKeyboard(it.context,it)

            }
            // set prompts.xml to alertdialog builder
            alertDialogBuilder.setView(dialogView)
            alertDialogBuilder.setCancelable(false)
            if (data != null) {
                setMedicationData(data, dialogBinding)
            }

            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
            dialogBinding.cancelBtn.setOnClickListener {
                alertDialog.cancel()
            }
            dialogBinding.saveBtn.setOnClickListener {
                val requestData = StudentMedication()
                requestData.agencyID = AppInstance.loginResponse?.data?.agencyID
                requestData.dosageQuantityID = 2
                requestData.startDate =
                    convertDate(dialogBinding.startDateEdt.text.toString(), incidentDisplayDate, serverDate)
                requestData.dosageQuantityID = 2
                requestData.endDate =
                    convertDate(dialogBinding.endDateEdt.text.toString(), incidentDisplayDate, serverDate)
                requestData.id = 0
                requestData.doseRepeatID = dialogBinding.spinnerDose.selectedItemPosition
                requestData.howTaken = dialogBinding.takeEdt.text.toString()
                requestData.studentID = AppInstance.basicInfo!!.studentId
                requestData.medicationName = dialogBinding.medEdt.text.toString()
                requestData.otherMedication = dialogBinding.otherEdt.text.toString()
                requestData.strength = dialogBinding.strengthEdt.text.toString()
                requestData.studentMedicationID = 0
                requestData.units = dialogBinding.units.text.toString()
                if (data != null) {
                    requestData.studentMedicationID = data.studentMedicationID!!
                    requestData.id = data.studentMedicationID
                    requestData.updatedBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }else{
                    requestData.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }
                if (validatMedForm(requestData, dialogBinding)) {
                    addMedicationApi(requestData, view)
                    alertDialog.dismiss()
                }
            }
        } else {
            showDialog(
                view.context,
                view.context.getString(R.string.app_name),
                view.context.getString(R.string.add_basic_info)
            )
        }
    }

    private fun validatMedForm(requestData: StudentMedication, binding: DialogAddMedicationBinding?): Boolean {

        when {
            requestData.medicationName.isNullOrEmpty() -> {
                binding?.medecineLayout?.error = "Please enter medication"
                binding?.medEdt?.requestFocus(R.id.medEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }
            requestData.strength.isNullOrEmpty() -> {
                binding?.strengthLayout?.error = "Please enter strength"
                binding?.strengthEdt?.requestFocus(R.id.medEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.medecineLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }
            requestData.units.isNullOrEmpty() -> {
                binding?.textInputLayout?.error = "Please enter units"
                binding?.units?.requestFocus(R.id.medEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }
            requestData.doseRepeatID == 0 -> {
                binding?.textView44?.visibility = View.VISIBLE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false
                return false
            }
            requestData.howTaken.isNullOrEmpty() -> {
                binding?.takeTxt?.error = "Please enter how to take"
                binding?.takeEdt?.requestFocus(R.id.medEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }
            requestData.otherMedication.isNullOrEmpty() -> {
                binding?.otherTxt?.error = "Please enter any other medication"
                binding?.otherEdt?.requestFocus(R.id.medEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }
            requestData.startDate.isNullOrEmpty() -> {
                binding?.startdateTxt?.error = "Please enter date."
                binding?.startDateEdt?.requestFocus(R.id.startDateEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false
                binding?.enddateTxt?.isErrorEnabled = false
                return false
            }

            requestData.endDate.isNullOrEmpty() -> {
                binding?.startdateTxt?.isErrorEnabled = false
                binding?.enddateTxt?.error = "Select end date"
                binding?.endDateEdt?.requestFocus(R.id.startDateEdt)
                binding?.textView44?.visibility = View.GONE
                binding?.strengthLayout?.isErrorEnabled = false
                binding?.textInputLayout?.isErrorEnabled = false
                binding?.takeTxt?.isErrorEnabled = false
                binding?.otherTxt?.isErrorEnabled = false
                binding?.medecineLayout?.isErrorEnabled = false

                return false
            }
            else -> return true
        }

    }

    private fun setMedicationData(data: StudentMedication, dialogBinding: DialogAddMedicationBinding) {

        dialogBinding.medEdt.setText(data.medicationName)
        dialogBinding.strengthEdt.setText(data.strength)
        dialogBinding.units.setText(data.units)
        data.dosageQuantityID?.let { dialogBinding.spinnerDose.setSelection(it) }
        dialogBinding.takeEdt.setText(data.howTaken)
        dialogBinding.otherEdt.setText(data.otherMedication)
        dialogBinding.startDateEdt.setText(convertDate(data.startDate.toString(), alohaDate, incidentDisplayDate))
        dialogBinding.endDateEdt.setText(convertDate(data.endDate.toString(), alohaDate, incidentDisplayDate))

    }

    private fun addMedicationApi(
        requestData: StudentMedication,
        view: View
    ) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveStudentMedication(requestData), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    requestData.id = response.saveId
                    requestData.studentMedicationID = response.saveId!!
                    medicationResponse.value = requestData
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)

            }
        })

    }

    fun onClickAddDisablity(view: View) {

        addDisability(view, null)
    }

    fun addDisability(view: View, data: StudentDisability?) {
        if (AppInstance.basicInfo != null) {
            val li = LayoutInflater.from(view.context)
            val dialogView = li.inflate(R.layout.dialog_add_disablity, null)
            val alertDialogBuilder = AlertDialog.Builder(view.context)
            val dialogBinding = DialogAddDisablityBinding.bind(dialogView)

            // set prompts.xml to alertdialog builder
            alertDialogBuilder.setView(dialogView)
            alertDialogBuilder.setCancelable(false)
            if (data != null) {
                setDisabilityData(data, dialogBinding)
            }

            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
            dialogBinding.cancelBtn.setOnClickListener {
                alertDialog.cancel()
            }
            dialogBinding.saveBtn.setOnClickListener {
                val requestData = StudentDisability()
                requestData.agencyID = AppInstance.loginResponse?.data?.agencyID
                requestData.id = 0
                requestData.studentID = AppInstance.basicInfo!!.studentId
                requestData.description = dialogBinding.description.text.toString()
                if (data != null) {
                    requestData.id = data.id
                    requestData.updatedBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }else{
                    requestData.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID

                }
                if (validatedDisabForm(requestData, dialogBinding)) {
                    addDisabilityApi(requestData, view)
                    alertDialog.dismiss()
                }
            }
        } else {
            showDialog(
                view.context,
                view.context.getString(R.string.app_name),
                view.context.getString(R.string.add_basic_info)
            )
        }
    }

    private fun validatedDisabForm(requestData: StudentDisability, binding: DialogAddDisablityBinding?): Boolean {
        return when {

            requestData.description.isNullOrEmpty() -> {
                binding?.textInputLayout2?.error = "Please enter date."
                binding?.description?.requestFocus(R.id.startDateEdt)
                false
            }

            else -> true
        }

    }

    private fun setDisabilityData(data: StudentDisability, dialogBinding: DialogAddDisablityBinding) {

        dialogBinding.description.setText(data.description)
    }

    private fun addDisabilityApi(
        requestData: StudentDisability,
        view: View
    ) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveStudentDisability(requestData), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    requestData.id = response.saveId
                    disabilityResponse.value = requestData
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)

            }
        })


    }

    fun getImmunization(context:Context) {
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getImmunizationType(data), object :
            ServiceListener<ImmunizationType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ImmunizationType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    loadImmunizationData(response)
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }

    fun getAllergy(context: Context) {
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getAllergyType(data), object :
            ServiceListener<AllergyType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AllergyType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    loadAllergyData(response)
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }

    fun getAllergyName(context: Context) {
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getAllergyNameType(data), object :
            ServiceListener<AllergyNameType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AllergyNameType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    loadAllergyNameData(response)
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }

    fun getReaction(context: Context) {
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getReactionType(data), object :
            ServiceListener<ReactionType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ReactionType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    loadReactionData(response)
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }

    fun getDosage(context: Context) {
        val data = GuardianRequest()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getAllDosage(data), object :
            ServiceListener<ReactionType> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ReactionType, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    loadDosagenData(response)
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }

    private fun loadImmunizationData(response: ImmunizationType) {
        list.clear()
        list.add("Select")
        for (data in response.data!!) {
            data.label?.let { list.add(it) }
        }

    }

    private fun loadAllergyData(response: AllergyType) {
        allergyList.clear()
        allergyList.add("Select")
        for (data in response.data!!) {
            data.label?.let { allergyList.add(it) }
        }

    }

    private fun loadAllergyNameData(response: AllergyNameType) {
        allergyNameList.clear()
        allergyNameList.add("Select")
        for (data in response.data!!) {
            data.label?.let { allergyNameList.add(it) }
        }

    }

    private fun loadReactionData(response: ReactionType) {
        reactionList.clear()
        reactionList.add("Select")
        for (data in response.data!!) {
            data.label?.let { reactionList.add(it) }
        }

    }

    private fun loadDosagenData(response: ReactionType) {
        doseList.clear()
        doseList.add("Select")
        for (data in response.data!!) {
            data.label?.let { doseList.add(it) }
        }

    }

    fun onClickImmunization(view: View) {
        val data: ArrayList<StudentImmunization>? =
            studentData.get()?.data?.studentImmunizations as ArrayList<StudentImmunization>?
        if (data != null && data.isNotEmpty()) {
            val intent = Intent(view.context, ListActivity::class.java)
            intent.putParcelableArrayListExtra("data", data)
            intent.putExtra("viewtype", IMMUNIZATION)
            view.context.startActivity(intent)
        }

    }

    fun onClickAllergy(view: View) {
        val data: ArrayList<StudentAllergy>? =
            studentData.get()?.data?.studentAllergies as ArrayList<StudentAllergy>?
        if (data != null && data.isNotEmpty()) {
            val intent = Intent(view.context, ListActivity::class.java)
            intent.putParcelableArrayListExtra("data", data)
            intent.putExtra("viewtype", ALLERGY)
            view.context.startActivity(intent)
        }
    }

    fun onClickMedication(view: View) {
        val data: ArrayList<StudentMedication>? =
            studentData.get()?.data?.studentMedications as ArrayList<StudentMedication>?
        if (data != null && data.isNotEmpty()) {
            val intent = Intent(view.context, ListActivity::class.java)

            intent.putParcelableArrayListExtra("data", data)
            intent.putExtra("viewtype", MEDICATION)
            view.context.startActivity(intent)
        }
    }

    fun onClickDisablity(view: View) {
        val data: ArrayList<StudentDisability>? =
            studentData.get()?.data?.studentDisabilities as ArrayList<StudentDisability>?
        if (data != null && data.isNotEmpty()) {
            val intent = Intent(view.context, ListActivity::class.java)
            intent.putParcelableArrayListExtra("data", data)
            intent.putExtra("viewtype", DISABLITY)
            view.context.startActivity(intent)
        }
    }

    fun onClickDelete(context: Context, taskId: Int) {
        AlertDialog.Builder(context)
            .setTitle(context.resources.getString(R.string.app_name))
            .setMessage(context.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                context.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
//                    deleteDiary(diaryId, context)
                }
            }
            .setNegativeButton(
                context.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()
    }

    fun deleteImmunization(data: StudentImmunization, view: View) {

        val value = StudentImmunization()
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
        value.isDeleted = true
        value.agencyID = data.agencyID
        value.id = data.id
        value.studentID = data.studentID
        value.deletedDate = convertDate(getCurrentDate(), displayDate, serverDate)
        value.studentImmunizationID = data.studentImmunizationID
        addImmunizationApi(value, view)

    }

    fun deleteMedication(data: StudentMedication, view: View) {

        val value = StudentMedication()
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
        value.isDeleted = true
        value.agencyID = data.agencyID
        value.id = data.id
        value.studentID = data.studentID
        value.deletedDate = convertDate(getCurrentDate(), displayDate, serverDate)
        value.studentMedicationID = data.studentMedicationID
        addMedicationApi(value, view)

    }

    fun deleteAllergy(data: StudentAllergy, view: View) {

        val value = StudentAllergy()
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
        value.isDeleted = true
        value.agencyID = data.agencyID
        value.id = data.id
        value.studentID = data.studentID
        value.deletedDate = convertDate(getCurrentDate(), displayDate, serverDate)
        value.allergyComment = data.allergyComment
        value.studentAllergiesID = data.studentAllergiesID
        addAllergiesApi(value, view)

    }

    fun deleteDisability(data: StudentDisability, view: View) {

        val value = StudentDisability()
        value.deletedBy = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.releventUserID
        value.isDeleted = true
        value.agencyID = data.agencyID
        value.id = data.id
        value.studentID = data.studentID
        value.deletedDate = convertDate(getCurrentDate(), displayDate, serverDate)
        value.description = data.description
        addDisabilityApi(value, view)

    }

}