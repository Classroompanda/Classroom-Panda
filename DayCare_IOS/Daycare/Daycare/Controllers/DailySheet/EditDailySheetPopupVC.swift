//
//  EditDailySheetPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 28/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown

protocol EditDailySheetVCDelegate : class {
    func doneButtonAction(dataParam:Dictionary<String,Any>,selectedIndex: Int?)
}

class EditDailySheetPopupVC: BaseViewController {
    @IBOutlet weak var tblViewForEditDailySheet: UITableView!
    var dropDownForMealItemConsumption = DropDown()
    var activity    : OtherActivity?
    var meal        : ActivityMeals?
    var health      : ActivityMedications?
    var notes       : ActivityNotes?
    var mood        : ActivityMoods?
    var nap         : AcitivityNap?
    var diaper      : ActivityDiper?
    var selectedIndex: Int?
    var delegate: EditDailySheetVCDelegate?
    var activityDetail:ActivityDetail?
    var dailySheetStudent: DailySheet?
    var selectedClass:OperationalClass?
    var selectedActivityTypeId: Int?
    var arrForSubActivities: [SubActivity]?
    var arrForSelectedStudent:[DailySheet] = []
    var isMedication:Bool?
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
        //MARK:------ @IBActiions ------
    @IBAction func actionForSave(_ sender: Any) {
        if isValidate() {
            delegate?.doneButtonAction(dataParam: self.genarateParameters(), selectedIndex: selectedIndex)
            self .dismiss(animated: true, completion: nil)
        } else {
            self.showAlert(with: Macros.alertMessages.mandatoryFields)
        }
//        print(self.genarateParameters())
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @objc func actionForMealItemConsume(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        self.setupMealItemConsumptionDropDown(imageView ?? UIImageView(), sender: sender)
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForMealItemConsumption.show()
    }
    
    @objc func actionForSelectTime(_ sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForTime = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForTime?.text = CommonClassMethods.timeFromDate(date: dateTime)
            switch sender.tag {
            case 85:
                self.activity?.startTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 86:
                self.activity?.endTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 102:
                self.nap?.sleptAtTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 103:
                self.nap?.workUpTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 119:
                self.diaper?.diaperChangeTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            default:
                print("Invalid Case")
            }
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.show()
    }
    
    //    function for return attributed String
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    func genarateParameters() -> Dictionary<String,Any> {
        var dictForParameters:[String:Any] = [:]
        var dictForSubParametere:[String:Any] = [:]
        if self.dailySheetStudent != nil {
            self.arrForSelectedStudent.append(self.dailySheetStudent ?? DailySheet())
        }
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Activity
            dictForSubParametere = activity?.dictionaryRepresentation() ?? [:]
            dictForParameters[Macros.ApiKeys.kstudentOtherActivity] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = activity?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = activity?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Meal:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Meal
            dictForSubParametere = meal?.dictionaryRepresentation() ?? [:]
            dictForSubParametere[Macros.ApiKeys.kstudentActivityMealFoodItems] = self.genrateMealItemArrayParam()
            dictForParameters[Macros.ApiKeys.kstudentActivityMeals] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = meal?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = meal?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Health:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Health
            health?.acknowledgeParentID = health?.acknowledgeParentID ?? 0
            health?.acknowledgeTeacherID = AppInstance.shared.user?.loginUserID ?? 0
            health?.isParentAcknowledge = health?.isParentAcknowledge
            health?.isTeacherAcknowledge = (self.isMedication ?? false) ? true : health?.isTeacherAcknowledge
            dictForSubParametere = health?.dictionaryRepresentation() ?? [:]
            dictForSubParametere[Macros.ApiKeys.kisTeacherAcknowledge] = (self.isMedication ?? false) ? true : health?.isTeacherAcknowledge
            dictForParameters[Macros.ApiKeys.kstudentActivityMedications] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = health?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = health?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Notes:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Notes
            dictForSubParametere = notes?.dictionaryRepresentation() ?? [:]
            dictForParameters[Macros.ApiKeys.kstudentActivityNotes] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = notes?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = notes?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Mood:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Mood
            dictForSubParametere = mood?.dictionaryRepresentation() ?? [:]
            dictForParameters[Macros.ApiKeys.kstudentActivityMoods] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = mood?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = mood?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Nap:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Nap
            dictForSubParametere = nap?.dictionaryRepresentation() ?? [:]
            dictForParameters[Macros.ApiKeys.kstudentAcitivityNap] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = nap?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = nap?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        case ActivityTypeID.Diper:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Diper
            dictForSubParametere = diaper?.dictionaryRepresentation() ?? [:]
            dictForParameters[Macros.ApiKeys.kstudentAcitivityDiper] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kid] = diaper?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = (diaper?.createdDate?.isEmpty ?? true) ?  CommonClassMethods.convertDateToServerReadableFormat(date: Date()) : diaper?.createdDate
        default:
            print("Invalid Choice")
        }
        if let activityRegDate = dictForParameters[Macros.ApiKeys.kactivityRegisterDate] as? String, activityRegDate.isEmpty {
           dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        }
        dictForParameters[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
        var arrForSelectedStudentId = [Int]()
        for i in 0..<(self.arrForSelectedStudent.count) {
            arrForSelectedStudentId.append(self.arrForSelectedStudent[i].studentID ?? 0)
        }
        dictForParameters[Macros.ApiKeys.kselectedStudents] = arrForSelectedStudentId
        dictForParameters[Macros.ApiKeys.kclassesID] = selectedClass?.value ?? 0
        dictForParameters[Macros.ApiKeys.kupdatedBy] = AppInstance.shared.user?.loginUserID
        return dictForParameters
    }
    
    func genrateMealItemArrayParam() -> Array<Dictionary<String,Any>> {
        var arrForFoodItem:[[String:Any]] = []
        for i in 0..<(self.meal?.studentActivityMealFoodItems?.count ?? 0) {
            arrForFoodItem.append(self.meal?.studentActivityMealFoodItems?[i].dictionaryRepresentation() ?? [:])
        }
        return arrForFoodItem
    }
   
    //Dropdown list for Meal Item Consumption
    func setupMealItemConsumptionDropDown(_ imageView: UIImageView, sender: UIButton){
        dropDownForMealItemConsumption.anchorView = sender
        dropDownForMealItemConsumption.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForMealItemConsumption.dataSource = Macros.ConstantArray.arrForMealPlanConsume
        dropDownForMealItemConsumption.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            switch index {
            case 0:
                self?.meal?.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.None
            case 1:
                self?.meal?.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.Some
            case 2:
                self?.meal?.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.Most
            case 3:
                self?.meal?.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.All
            default :
                print("Invalid Case")
            }
        }
        dropDownForMealItemConsumption.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    func isValidate() -> Bool {
        var isValidate = true
        switch selectedActivityTypeId {
        case  ActivityTypeID.Activity:
            if (activity?.startTime == nil || activity?.startTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.startTime)
            } else if(activity?.endTime == nil || activity?.endTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.endTime)
            }else if(activity?.otherActivityNote == nil || activity?.otherActivityNote == "")  {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.activityNote)
            }
        case ActivityTypeID.Health:
            if (health?.recordedTemparture == nil || health?.recordedTemparture == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.temprature)
            } else if (health?.studentHealthDescription == nil || health?.studentHealthDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case ActivityTypeID.Notes:
            if (notes?.noteDescription == nil || notes?.noteDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case ActivityTypeID.Mood:
            if (mood?.moodTypeID == nil) {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.mood)
            } else if (mood?.studentMoodDescription == nil || mood?.studentMoodDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case ActivityTypeID.Nap:
            if (nap?.workUpTime == nil || nap?.workUpTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.wokeUptime)
            } else if (nap?.sleptAtTime == nil || nap?.sleptAtTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.sleepAttime)
            }
        case ActivityTypeID.Diper:
            if diaper?.diaperChangeTime == "" || diaper?.diaperChangeTime == nil {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.time)
            }
        case ActivityTypeID.Meal:
            if (meal?.mealPlanTitle == "" || meal?.mealPlanTitle == nil){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.mealPlan)
            } else if (!self.isMealPlanValidate()) {
                isValidate = false
            }
        default:
            print("Invalid Choice")
        }
        return isValidate
    }
    
    func isMealPlanValidate() -> Bool {
        var isValidate = true
        for i in 0..<(meal?.studentActivityMealFoodItems?.count ?? 0){
            if (self.meal?.studentActivityMealFoodItems?[i].foodTypeName?.lowercased() == Macros.ControllerStrings.DailySheetVC.milk.lowercased()) {
                if self.meal?.studentActivityMealFoodItems?[i].milkConsumptionQuantity == "" || self.meal?.studentActivityMealFoodItems?[i].milkConsumptionQuantity == nil {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.milk)
                }
            } else {
                if (self.meal?.studentActivityMealFoodItems?[i].foodConsumtionID == 0 || self.meal?.studentActivityMealFoodItems?[i].foodConsumtionID == nil) {
                    isValidate = false
                     self.showAlert(with: Macros.alertMessages.mealConsumption)
                }
            }
        }
        return isValidate
    }
    func resignTextFieldResponder(){
        let view = self.view.subviews[0] as? UITableView
        for subview in view?.subviews ?? [] where subview is DropDownTextFieldTableViewCell {
            let cell = subview as? DropDownTextFieldTableViewCell
            cell?.txtFieldForField.resignFirstResponder()
        }
        for subview in view?.subviews ?? [] where subview is TextViewTableViewCell {
            let cell = subview as? TextViewTableViewCell
            cell?.txtViewForField.resignFirstResponder()
        }
    }
}

extension EditDailySheetPopupVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch selectedActivityTypeId {
        case ActivityTypeID.Health:
            return (self.health?.studentMedicationID ?? 0 > 0) ? 6 : 2
        case ActivityTypeID.Notes:
            return 1
        case ActivityTypeID.Meal:
            return (5 + (self.meal?.studentActivityMealFoodItems?.count ?? 0))
        case ActivityTypeID.Mood:
            return 2
        case ActivityTypeID.Activity:
            return 4
        case ActivityTypeID.Nap:
            return 3
        case ActivityTypeID.Diper:
            return 3
        default:
            return 0
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch selectedActivityTypeId {
        case ActivityTypeID.Health:
            return cellForHealthTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Notes:
            return cellForNotesTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Meal:
            return cellForMealTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Mood:
            return cellForMoodTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Activity:
            return cellForActivityTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Diper:
            return cellForDiaperTableView(tableView: tableView, indexPath: indexPath)
        default:
            return cellForNapTableView(tableView: tableView, indexPath: indexPath)
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity:
            return indexPath.row == 3 ? 100 : UITableView.automaticDimension
        case ActivityTypeID.Diper:
            return indexPath.row == 2 ? 100 : UITableView.automaticDimension
        default:
           return UITableView.automaticDimension
        }
    }
    
    //MARK:----- TableView Cell Loading Function -----
    
    //Cell for Activity
    func cellForActivityTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0,1:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 2:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customCollectionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    //Cell for Meal
    func cellForMealTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let totalNoOfRows = (5 + (self.meal?.studentActivityMealFoodItems?.count ?? 0))
        switch indexPath.row {
        case 0:
            return customDropDownButtonTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customMealPlanTitleTableViewCell(tableView:tableView,indexPath:indexPath)
        case (totalNoOfRows - 6)...(totalNoOfRows - 4) :
            return customMealPlanItemTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    //Cell for Health
    func cellForHealthTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0,2,3,4,5:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return UITableViewCell()
        }
//        return  (indexPath.row == 0) ? customDropDownTableViewCell(tableView: tableView, indexPath: indexPath) : customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Notes
    func cellForNotesTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Mood
    func cellForMoodTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return indexPath.row == 0 ? customCollectionTableViewCell(tableView: tableView, indexPath: indexPath) : customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Nap
    func cellForNapTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return indexPath.row != 2 ? customDropDownTableViewCell(tableView: tableView, indexPath: indexPath) : customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Diaper
    func cellForDiaperTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customCollectionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    
    //MARK:----- Custom TableView Cell functions -----
    
    func customDescriptionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            if selectedActivityTypeId == ActivityTypeID.Meal {
                let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
                switch indexPath.row {
                case ((mealItemCount ?? 0)+2) :
                    cell.txtViewForField.tag = 3111
                case ((mealItemCount ?? 0)+3) :
                    cell.txtViewForField.tag = 3222
                case ((mealItemCount ?? 0)+4) :
                    cell.txtViewForField.tag = 3333
                default:
                    print("Invalid case")
                }
                let rowIndex = (indexPath.row - (self.meal?.studentActivityMealFoodItems?.count ?? 0))
                cell.lblForFieldTitle.attributedText =  self.getAttributedStringForMandatoryField(text: arrForTitles[rowIndex] as? String ?? "")
            } else {
                cell.txtViewForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
                cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            }
            
            switch cell.txtViewForField.tag {
            case 87:
                cell.txtViewForField.text = self.activity?.otherActivityNote
            case 18:
                cell.txtViewForField.text =  self.health?.studentHealthDescription
            case 34:
                cell.txtViewForField.text = self.notes?.noteDescription
            case 69:
                cell.txtViewForField.text = self.mood?.studentMoodDescription
            case 104:
                cell.txtViewForField.text = self.nap?.napNote
            case 120:
                cell.txtViewForField.text = self.diaper?.studentActivityDiaperNote
            case 3111:
                cell.txtViewForField.text = self.meal?.otherThanPlanMealComment
            case 3222:
                cell.txtViewForField.text = self.meal?.otherThanPlanMeal
            case 3333:
                cell.txtViewForField.text = self.meal?.mealComment
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            cell.ViewForSelectedItems.isHidden = true
            cell.lblForSelectedItems.isHidden = true
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            cell.btnForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
            cell.btnForField.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            cell.txtFieldForField.keyboardType = selectedActivityTypeId == ActivityTypeID.Health ? .decimalPad : .default
            switch selectedActivityTypeId {
            case ActivityTypeID.Activity:
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.text = (indexPath.row == 0) ? (activity?.startTime != nil) ? (CommonClassMethods.timeFromDateString(date: activity?.startTime ?? "")) : "" : (activity?.endTime != nil) ? (CommonClassMethods.timeFromDateString(date: activity?.endTime ?? "")) : ""
                
            case ActivityTypeID.Nap:
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.text = (indexPath.row == 0) ? (nap?.sleptAtTime != nil) ? CommonClassMethods.timeFromDateString(date: nap?.sleptAtTime ?? "") : "" : (nap?.workUpTime != nil) ? CommonClassMethods.timeFromDateString(date: nap?.workUpTime ?? "") : ""
                
            case ActivityTypeID.Health:
                cell.txtFieldForField.tag = 4000
                cell.btnForField.isHidden = true
                cell.imgViewForArrow.isHidden = true
//                cell.txtFieldForField.text = String(self.health?.recordedTemparture ?? "")
                switch indexPath.row {
                case 0:
                    cell.txtFieldForField.text = self.health?.recordedTemparture
                case 2:
                    cell.txtFieldForField.text = self.health?.studentMedicationName
                case 3:
                    cell.txtFieldForField.text = self.health?.howTaken
                case 4:
                    cell.txtFieldForField.text = self.health?.doseRepeatName
                case 5:
                    cell.txtFieldForField.text = String(describing: self.health?.unit ?? 0)
                default:
                    print("Invalid Case")
                }
                if indexPath.row == 0 {
                    cell.txtFieldForField.isEnabled = true
                    cell.txtFieldForField.textColor = .black
                    cell.txtFieldForField.dividerColor = colorCode.applicationColor
                } else {
                    cell.txtFieldForField.isEnabled = false
                    cell.txtFieldForField.textColor = .gray
                    cell.txtFieldForField.dividerColor = .gray
                }
                
            case ActivityTypeID.Diper:
                cell.txtFieldForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.imgViewForArrow.image = UIImage(named: "clock")
                cell.txtFieldForField.text = (CommonClassMethods.timeFromDateString(date: diaper?.diaperChangeTime ?? ""))
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customCollectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EditDailySheetCollectionTableViewCell) as? EditDailySheetCollectionTableViewCell {
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            if ActivityTypeID.Diper == selectedActivityTypeId {
                 cell.lblForFieldTitle.isHidden = true
            } else {
                cell.lblForFieldTitle.isHidden = false
                cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            }
            cell.collectionViewForActivityMoodSelection.reloadData()
            return cell
        }
        return UITableViewCell()  
    }
    
    func customMealPlanTitleTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EditMealPlanTitleTableViewCell) {
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.backgroundColor = .lightGray
            cell.btnForField.setTitle(self.meal?.mealPlanTitle ?? "", for: .normal)
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            cell.lblForFieldTitle.attributedText =  self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            return cell
        }
        return UITableViewCell()
    }
    
    func customMealPlanItemTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MealPlanEditItemTableViewCell) as? MealPlanEditItemTableViewCell {
            cell.lblForFoodItem.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName
            cell.lblForAmount.text = String(self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].amount ?? 0)
            cell.lblForUnit.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].measureUnitTypeName
            cell.btnForConsume.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForConsumeData.delegate = self
            cell.btnForConsume.removeTarget(nil, action: nil, for: .allEvents)
            if (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName?.lowercased() == Macros.ControllerStrings.DailySheetVC.milk.lowercased()) {
                cell.txtFieldForConsumeData.tag = (5000 + (indexPath.row - 2))
                cell.txtFieldForConsumeData.isEnabled = true
                cell.btnForConsume.isHidden = true
                cell.imgViewForArrow.isHidden = true
                cell.txtFieldForConsumeData.isDividerHidden = false
                cell.txtFieldForConsumeData.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].milkConsumptionQuantity
            } else {
                cell.txtFieldForConsumeData.isEnabled = false
                cell.btnForConsume.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForConsumeData.isDividerHidden = true
                
                (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != nil && self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != "") ? cell.btnForConsume.setTitle(self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName, for: .normal) : cell.btnForConsume.setTitle("Select", for: .normal)
                
                if (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID != nil && self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID != 0) {
                    switch (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID) {
                    case FoodConsumptionID.None :
                        cell.btnForConsume.setTitle(Macros.ControllerStrings.DailySheetVC.None, for: .normal)
                    case FoodConsumptionID.Some :
                        cell.btnForConsume.setTitle(Macros.ControllerStrings.DailySheetVC.Some, for: .normal)
                    case FoodConsumptionID.Most :
                        cell.btnForConsume.setTitle(Macros.ControllerStrings.DailySheetVC.Most, for: .normal)
                    case FoodConsumptionID.All :
                        cell.btnForConsume.setTitle(Macros.ControllerStrings.DailySheetVC.All, for: .normal)
                    default:
                        cell.btnForConsume.setTitle("Select", for: .normal)
                    }
                }
                
                cell.btnForConsume.addTarget(self, action: #selector(actionForMealItemConsume(_:)), for: .touchUpInside)
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView DataSource and Delegates -----

extension EditDailySheetPopupVC: UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity:
            return self.arrForSubActivities?.count ?? 0
        case ActivityTypeID.Mood:
            return Macros.ConstantArray.arrForMoodTitle.count
        case ActivityTypeID.Diper:
            return Macros.ConstantArray.arrForDiperTypeSelection.count
        default :
            return 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
         return ((selectedActivityTypeId == ActivityTypeID.Activity) || (selectedActivityTypeId == ActivityTypeID.Diper)) ? customTabSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath) : customImageSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity :
            let lblSize =  self.arrForSubActivities?[indexPath.row].subActivityLabel?.sizeOfString(font: fonts.addIncidentTitle ?? UIFont.systemFont(ofSize: 15)) ?? CGSize()
            return CGSize(width: lblSize.width + 30, height: 50)
        case ActivityTypeID.Diper:
            return CGSize(width: 100, height: 50)
        default:
            return CGSize(width: 90, height: 115)
        }
//        if selectedActivityTypeId == ActivityTypeID.Activity {
//
//        } else {
//            return CGSize(width: 90, height: 115)
//        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity:
            let txtViewForNote = self.view.viewWithTag(87) as? CustomTextView
            let textString = txtViewForNote?.text
            txtViewForNote?.text =  textString != "" ? ("\(textString ?? "")  \(self.arrForSubActivities?[indexPath.item].subActivityText ?? "")") : (self.arrForSubActivities?[indexPath.item].subActivityText ?? "")
            self.activity?.otherActivityNote = txtViewForNote?.text
        case ActivityTypeID.Diper:
            let txtViewForNote = self.view.viewWithTag(120) as? CustomTextView
            let textString = txtViewForNote?.text
            txtViewForNote?.text =  textString != "" ? ("\(textString ?? "")  \(Macros.ConstantArray.arrForDiperTypeDescription[indexPath.item])") : (Macros.ConstantArray.arrForDiperTypeDescription[indexPath.item])
            self.diaper?.studentActivityDiaperNote = txtViewForNote?.text
        default :
            self.mood?.moodTypeID = (indexPath.item + 1)
            for i in 0..<Macros.ConstantArray.arrForMoodTitle.count {
                let button = collectionView.viewWithTag(i+1) as? UIButton
                if i == indexPath.item {
                    button?.setImage(UIImage(named: Macros.ConstantArray.arrForSelectedMoodImages[i]), for: .normal)
                } else {
                    button?.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[i]), for: .normal)
                }
            }
        }
    }
    
    func customTabSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.EditDailySheetActivityCollectionViewCell, for: indexPath) as? EditDailySheetActivityCollectionViewCell {
            cell.lblForActivityKey.text = (selectedActivityTypeId == ActivityTypeID.Activity) ?  (self.arrForSubActivities?[indexPath.item].subActivityLabel ?? "") : (Macros.ConstantArray.arrForDiperTypeSelection[indexPath.item])
            return cell
        }
        return UICollectionViewCell()
    }
    
    func customImageSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.EditDailySheetMoodCollectionViewCell, for: indexPath) as? EditDailySheetMoodCollectionViewCell {
            if mood?.moodTypeID != nil {
                (indexPath.item == ((mood?.moodTypeID ?? 0) - 1)) ?  cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForSelectedMoodImages[indexPath.item]), for: .normal) :  cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[indexPath.item]), for: .normal)
            } else {
                cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[indexPath.item]), for: .normal)
            }
            cell.btnForImage.tag = (indexPath.item + 1)
            cell.lblForImageTitle.text = Macros.ConstantArray.arrForMoodTitle[indexPath.item]
            return cell
        }
        return UICollectionViewCell()
    }
}

//MARK:----- UITextField Delegates -----
extension EditDailySheetPopupVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if textField.tag == 4000 {
            if Macros.ConstantArray.numberStringArray.contains(string){
                self.health?.recordedTemparture = newString as String
                return true
            } else {
                return false
            }
        }else {
            self.meal?.studentActivityMealFoodItems?[textField.tag - 5000].milkConsumptionQuantity = newString as String
            return true
        }
    }
}

//MARK:----- UITextView Delegates -----
extension EditDailySheetPopupVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        switch textView.tag {
        case 87:
            self.activity?.otherActivityNote         = newString as String
        case 18:
            self.health?.studentHealthDescription    = newString as String
        case 34:
            self.notes?.noteDescription              = newString as String
        case 69:
            self.mood?.studentMoodDescription        = newString as String
        case 104:
            self.nap?.napNote                        = newString as String
        case 120:
            self.diaper?.studentActivityDiaperNote   = newString as String
        case 3111:
            self.meal?.otherThanPlanMealComment      = newString as String
        case 3222:
            self.meal?.otherThanPlanMeal             = newString as String
        case 3333:
            self.meal?.mealComment                   = newString as String
        default:
            print("Invalid Case")
        }
        return true
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        switch textView.tag {
        case 18,69,120:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:1, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 87,104:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:2, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 34:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:0, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 3111:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+2), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 3222:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+3), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 3333:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+4), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        default:
            print("Invalid Case")
        }
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        switch textView.tag {
        case 18,69,120:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:1, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 87,104:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:2, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 34:
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:0, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3111:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+2), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3222:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+3), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3333:
            let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForEditDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+4), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        default:
            print("Invalid Case")
        }
        return true
    }
}

//MARK:----- EditDailySheetCollectionTableViewCell -----
class EditDailySheetCollectionTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForFieldTitle                         : UILabel!
    @IBOutlet weak var collectionViewForActivityMoodSelection   : UICollectionView!
}

//MARK:----- EditDailySheetActivityCollectionViewCell -----
class EditDailySheetActivityCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var lblForActivityKey    : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:----- EditDailySheetMoodCollectionViewCell -----
class EditDailySheetMoodCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var btnForImage          : UIButton!
    @IBOutlet weak var lblForImageTitle     : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:------ MealPlan AddItem TableView Cell -----
class MealPlanEditItemTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFoodItem: UILabel!
    @IBOutlet weak var lblForAmount: UILabel!
    @IBOutlet weak var lblForUnit: UILabel!
    @IBOutlet weak var btnForConsume: UIButton!
    @IBOutlet weak var imgViewForArrow: UIImageView!
    @IBOutlet weak var txtFieldForConsumeData: CustomTextField!
}
