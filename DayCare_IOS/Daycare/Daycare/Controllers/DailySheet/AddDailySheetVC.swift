//
//  AddDailySheetVC.swift
//  Daycare
//
//  Created by amrut waghmare on 18/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown

class AddDailySheetVC: BaseViewController {
    @IBOutlet weak var tblViewForAddDailySheet  : UITableView!
   
    var dropDownForMealSelection = DropDown()
    var dropDownForMealItemConsumption = DropDown()
    
    var activity    = OtherActivity()
    var meal        = ActivityMeals()
    var health      = ActivityMedications()
    var notes       = ActivityNotes()
    var mood        = ActivityMoods()
    var nap         = AcitivityNap()
    var diper       = ActivityDiper()
    
    var activityDetail:ActivityDetail?
    var dailySheetStudent: DailySheet?
    var selectedClass:OperationalClass?
    var arrForSelectedStudent:[DailySheet] = []
    var arrForSubActivities: [SubActivity]?
    var selectedIndex = 1
    var selectedActivityTypeId: Int?
    var arrForTodaysMealPlan : [ActivityMeals]?
    var selectedMealPlan : ActivityMeals?
    var selectedActivityDate : Date?
    //MARK:----- View functions ------
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    func initialSetup(){
        self.navigationController?.navigationBar.setValue(true, forKey: "hidesShadow")
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.AddDailySheet)
        self.navigationController?.navigationBar.isHidden       = false
        self.navigationController?.navigationBar.isTranslucent = false
        apiCallForGetSubActivity()
        apiCallForGetTodaysMealPlan()
    }
    
    //MARK:----- @IBActions  -----
    
    @objc func actionForActivitySelection(_ sender: UIButton){
        resignTextFieldResponder()
        selectedIndex = sender.tag
        tblViewForAddDailySheet.reloadData()
    }
    
    @objc func actionForSubmit(_ sender: Any){
        if isValidate() {
            self.apiCallForSaveDailySheet(param: self.genarateParameters())
        } 
    }
    
    @objc func actionForSelectTime(_ sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            
            let txtfieldForTime = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForTime?.text = CommonClassMethods.timeFromDate(date: dateTime)
            switch sender.tag {
            case 2000:
                self.activity.startTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 500:
                self.activity.endTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 2005:
                self.nap.sleptAtTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 505:
                self.nap.workUpTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 3500:
                self.diper.diaperChangeTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            default:
                print("Invalid Case")
            }
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
//            datePicker?.maximumDate = sender.tag == 500 ? Date() : nil
        datePicker?.show()
    }
    
    @objc func actionForMealPlanList(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForMealSelection.show()
    }
    
    @objc func actionForMealItemConsume(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        self.setupMealItemConsumptionDropDown(imageView ?? UIImageView(), sender: sender)
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForMealItemConsumption.show()
    }
    
    func isValidate() -> Bool {
        var isValidate = true
        switch selectedIndex {
        case 1:
            if (activity.startTime == nil || activity.startTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.startTime)
            } else if(activity.endTime == nil || activity.endTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.endTime)
            }else if(activity.otherActivityNote == nil || activity.otherActivityNote == "")  {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.activityNote)
            }
        case 3:
            if (health.recordedTemparture == nil || health.recordedTemparture == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.temprature)
            } else if (health.studentHealthDescription == nil || health.studentHealthDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case 2:
            if (meal.mealPlanTitle == "" || meal.mealPlanTitle == nil){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.mealPlan)
            } else if (!self.isMealPlanValidate()) {
                isValidate = false
            }
        case 4:
            if (notes.noteDescription == nil || notes.noteDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case 5:
            if (mood.moodTypeID == nil) {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.mood)
            } else if (mood.studentMoodDescription == nil || mood.studentMoodDescription == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.description)
            }
        case 6:
            if (nap.workUpTime == nil || nap.workUpTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.wokeUptime)
            } else if (nap.sleptAtTime == nil || nap.sleptAtTime == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.sleepAttime)
            }
        case 7:
            if diper.diaperChangeTime == nil || diper.diaperChangeTime == "" {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.time)
            }
        default:
            print("Invalid Choice")
        }
        return isValidate
    }
    
    func isMealPlanValidate() -> Bool {
        var isValidate = true
        for i in 0..<(meal.studentActivityMealFoodItems?.count ?? 0){
            if (self.meal.studentActivityMealFoodItems?[i].foodTypeName?.lowercased() == Macros.ControllerStrings.DailySheetVC.milk.lowercased()) {
                if self.meal.studentActivityMealFoodItems?[i].milkConsumptionQuantity == "" || self.meal.studentActivityMealFoodItems?[i].milkConsumptionQuantity == nil {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.milk)
                }
            } else {
                if (self.meal.studentActivityMealFoodItems?[i].foodConsumtionID == 0 || self.meal.studentActivityMealFoodItems?[i].foodConsumtionID == nil) {
                    isValidate = false
                     self.showAlert(with: Macros.alertMessages.mealConsumption)
                }
            }
        }
        return isValidate
    }
    
    func genarateParameters() -> Dictionary<String,Any> {
        var dictForParameters:[String:Any] = [:]
        var dictForSubParametere:[String:Any] = [:]
        if self.dailySheetStudent != nil {
            self.arrForSelectedStudent.append(self.dailySheetStudent ?? DailySheet())
        }
        
        switch selectedIndex {
        case 1:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Activity
            dictForSubParametere = activity.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = activity.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentOtherActivity] = dictForSubParametere
        case 2:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Meal
            dictForSubParametere = meal.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = meal.id ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivityMealFoodItems] = self.genrateMealItemArrayParam()
            dictForParameters[Macros.ApiKeys.kstudentActivityMeals] = dictForSubParametere
        case 3:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Health
            dictForSubParametere = health.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = health.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentActivityMedications] = dictForSubParametere
        case 4:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Notes
            dictForSubParametere = notes.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = notes.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentActivityNotes] = dictForSubParametere
        case 5:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Mood
            dictForSubParametere = mood.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = mood.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentActivityMoods] = dictForSubParametere
        case 6:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Nap
            dictForSubParametere = nap.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = nap.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentAcitivityNap] = dictForSubParametere
        case 7:
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = ActivityTypeID.Diper
            dictForSubParametere = diper.dictionaryRepresentation()
            dictForSubParametere[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForSubParametere[Macros.ApiKeys.kstudentActivitiesID] = 0
            dictForSubParametere[Macros.ApiKeys.kid] = diper.id ?? 0
            dictForParameters[Macros.ApiKeys.kstudentAcitivityDiper] = dictForSubParametere
        default:
            print("Invalid Choice")
        }
        
        dictForParameters[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
        var arrForSelectedStudentId = [Int]()
        for i in 0..<(self.arrForSelectedStudent.count) {
            arrForSelectedStudentId.append(self.arrForSelectedStudent[i].studentID ?? 0)
        }
        dictForParameters[Macros.ApiKeys.kselectedStudents] = arrForSelectedStudentId
        dictForParameters[Macros.ApiKeys.kclassesID] = selectedClass?.value ?? 0
        dictForParameters[Macros.ApiKeys.kid] = 0
        dictForParameters[Macros.ApiKeys.kcreatedBy] = AppInstance.shared.user?.loginUserID
        dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        return dictForParameters
    }
    
    
    func genrateMealItemArrayParam() -> Array<Dictionary<String,Any>> {
        var arrForFoodItem:[[String:Any]] = []
        for i in 0..<(self.meal.studentActivityMealFoodItems?.count ?? 0) {
            arrForFoodItem.append(self.meal.studentActivityMealFoodItems?[i].dictionaryRepresentation() ?? [:])
        }
        return arrForFoodItem
    }
    
    //    function for return attributed String
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    //Dropdown list For Meal Plan
    func setupMealPlanDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForMealPlanName:[String]   =   []
        for mealPlan in arrForTodaysMealPlan ?? [] {
            arrForMealPlanName.append(mealPlan.mealPlanTitle ?? "")
        }
        dropDownForMealSelection.anchorView = sender
        dropDownForMealSelection.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForMealSelection.dataSource = arrForMealPlanName
        dropDownForMealSelection.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.meal = self?.arrForTodaysMealPlan?[index] ?? ActivityMeals()
            self?.tblViewForAddDailySheet.reloadData()
        }
        dropDownForMealSelection.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
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
                self?.meal.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.None
            case 1:
                self?.meal.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.Some
            case 2:
                self?.meal.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.Most
            case 3:
                self?.meal.studentActivityMealFoodItems?[sender.tag - 2].foodConsumtionID = FoodConsumptionID.All
            default :
                print("Invalid Case")
            }
        }
        dropDownForMealItemConsumption.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    func resignTextFieldResponder(){
        if self.view.subviews.count > 0 {
            let mainView = self.view.subviews[0]
            if mainView.subviews.count > 0 {
                let view = mainView.subviews[0] as? UITableView
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
    }
    
    //MARK:----- API Calling Functions -----
    func apiCallForGetSubActivity(){
        let service = DailySheetService()
        service.getSubActivityList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForSubActivities = result as? [SubActivity]
            }
            self.tblViewForAddDailySheet.reloadData()
        }
    }
    
    func apiCallForGetTodaysMealPlan(){
        let service = DailySheetService()
        service.getTodaysMealPlan(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classId: selectedClass?.value ?? 0, askedDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date())) { (result) in
            if result != nil {
                self.arrForTodaysMealPlan = result as? [ActivityMeals] ?? []
                if self.meal.mealPlanTitle == "" || self.meal.mealPlanTitle == nil {
                    if (self.arrForTodaysMealPlan?.count ?? 0) > 0 {
                        self.meal = self.arrForTodaysMealPlan?[0] ?? ActivityMeals()
                    }
                }
            }
            self.tblViewForAddDailySheet.reloadData()
        }
    }

    func apiCallForSaveDailySheet(param: Dictionary<String,Any>){
        let service = DailySheetService()
        service.saveDailySheetData(with: self, param: param) { (result) in
            if result as? String != nil {
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: result as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        for controller in self.navigationController!.viewControllers as Array {
                            if controller.isKind(of: DailySheetsVC.self) {
                                self.navigationController!.popToViewController(controller, animated: true)
                                break
                            }
                        }
                    default:
                        break
                    }
                })
            }
        }
    }
}

//MARK:----- UITableView DataSource and Delegates -----
extension AddDailySheetVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch selectedIndex {
            case 1:
             return 4
            case 2:
                return (6 + (self.meal.studentActivityMealFoodItems?.count ?? 0))
            case 3:
             return 3
            case 4:
             return 2
            case 5:
             return 3
            case 6:
             return 3
            case 7:
            return 4
        default:
            return 0
        }
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddDailySheetHeaderTableView) as? AddDailySheetHeaderTableView {
            cell.btnForActivity.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForMeal.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForHealth.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForNotes.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForMood.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForNap.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            cell.btnForDiper.addTarget(self, action: #selector(actionForActivitySelection(_:)), for: .touchUpInside)
            for i in 1..<8 {
                let button = cell.viewWithTag(i) as? UIButton
                button?.isSelected = (selectedIndex == i)
//                if selectedIndex == i {
//                    button?.isSelected = true
//                } else {
//                    button?.isSelected = false
//                }
            }
            
            
            return cell.contentView
        }
        return UIView()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch selectedIndex {
        case 1:
            return cellForActivityTableView(tableView: tableView, indexPath: indexPath)
        case 2:
            return cellForMealTableView(tableView: tableView, indexPath: indexPath)
        case 3:
            return cellForHealthTableView(tableView: tableView, indexPath: indexPath)
        case 4:
            return cellForNotesTableView(tableView: tableView, indexPath: indexPath)
        case 5:
            return cellForMoodTableView(tableView: tableView, indexPath: indexPath)
        case 6:
            return cellForNapTableView(tableView: tableView, indexPath: indexPath)
        case 7:
            return cellForDiperTableView(tableView: tableView, indexPath: indexPath)
        default:
            return UITableViewCell()
        }
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 400
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if selectedIndex == 1 || selectedIndex == 7 {
            if indexPath.row == 2 {
                return 100
            } else {
              return UITableView.automaticDimension
            }
        } else {
           return UITableView.automaticDimension
        }
    }
    
    //MARK:----- TableView Cell Loading Function -----
    
    //Cell for Activity
    func cellForActivityTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDateTimeSelectionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 2:
            return customCollectionTableViewCell(tableView: tableView, indexPath: indexPath)
            
        default:
            return customSubmitButtonTableViewCell()
        }
    }
    
    //Cell for Meal
    func cellForMealTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let totalNoOfRows = (6 + (self.meal.studentActivityMealFoodItems?.count ?? 0))
        switch indexPath.row {
        case 0:
            return customDropDownButtonTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customMealPlanTitleTableViewCell(tableView:tableView,indexPath:indexPath)
        case (totalNoOfRows - 4)...(totalNoOfRows - 2) :
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        case totalNoOfRows - 1 :
            return customSubmitButtonTableViewCell()
        default:
            return customMealPlanItemTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    //Cell for Health
    func cellForHealthTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customSubmitButtonTableViewCell()
        }
    }
    
    //Cell for Notes
    func cellForNotesTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customSubmitButtonTableViewCell()
        }
    }
    
    //Cell for Mood
    func cellForMoodTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customCollectionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customSubmitButtonTableViewCell()
        }
    }
    
    //Cell for Nap
    func cellForNapTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDateTimeSelectionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
           return customSubmitButtonTableViewCell()
        }
    }
    
    //Cell for Diper
    func cellForDiperTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 2:
            return customCollectionTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customSubmitButtonTableViewCell()
        }
    }

    //MARK:----- Custom TableView Cell functions -----
    func customDateTimeSelectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForAddDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.backgroundColor = .clear
            cell.selectionStyle = .none
            var arrForTitles = Macros.ConstantArray.arrForDailySheetTitles[selectedIndex - 1]
            let arrForTitleLbl:[String] = arrForTitles[indexPath.row] as? [String] ?? []
            cell.lblForLeftTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitleLbl[0])
            cell.lblForRightTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitleLbl[1])
            cell.imgViewForLeft.image = UIImage(named: "clock")
            cell.imgViewForRight.image = UIImage(named: "clock")
            cell.btnForLeft.tag = selectedIndex + 1999
            cell.txtFieldForleft.tag = selectedIndex + 1999
            cell.btnForRight.tag = selectedIndex + 499
            cell.txtFieldForRight.tag = selectedIndex + 499
            cell.btnForLeft.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            cell.btnForRight.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            switch selectedIndex {
            case 1:
                cell.txtFieldForleft.text = (activity.startTime != nil) ? CommonClassMethods.timeFromDateString(date: activity.startTime ?? "") : ""
                cell.txtFieldForRight.text = (activity.endTime != nil) ? CommonClassMethods.timeFromDateString(date: activity.startTime ?? "") : ""
            case 6:
                cell.txtFieldForleft.text = (nap.sleptAtTime != nil) ? CommonClassMethods.timeFromDateString(date: nap.sleptAtTime ?? "") : ""
                cell.txtFieldForRight.text = (nap.workUpTime != nil) ? CommonClassMethods.timeFromDateString(date: nap.workUpTime ?? "") : ""
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDescriptionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForAddDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            var arrForTitles = Macros.ConstantArray.arrForDailySheetTitles[selectedIndex - 1]
            if selectedIndex != 2 {
                cell.txtViewForField.tag = (17 * selectedIndex) + indexPath.row
                cell.lblForFieldTitle.attributedText =  self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            } else {
                let mealItemCount = self.meal.studentActivityMealFoodItems?.count
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
                let rowIndex = (indexPath.row - (self.meal.studentActivityMealFoodItems?.count ?? 0))
                cell.lblForFieldTitle.attributedText =  self.getAttributedStringForMandatoryField(text: arrForTitles[rowIndex] as? String ?? "")
            }
            switch cell.txtViewForField.tag {
            case 18:
                cell.txtViewForField.text = self.activity.otherActivityNote
            case 3333:
                cell.txtViewForField.text = self.meal.mealComment
            case 3222:
                cell.txtViewForField.text = self.meal.otherThanPlanMeal
            case 3111:
                cell.txtViewForField.text = self.meal.otherThanPlanMealComment
            case 52:
                cell.txtViewForField.text =  self.health.studentHealthDescription
            case 68:
                cell.txtViewForField.text = self.notes.noteDescription
            case 86:
                cell.txtViewForField.text = self.mood.studentMoodDescription
            case 103:
                cell.txtViewForField.text = self.nap.napNote
            case 120:
                cell.txtViewForField.text = self.diper.studentActivityDiaperNote
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            var arrForTitles = Macros.ConstantArray.arrForDailySheetTitles[selectedIndex - 1]
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            switch selectedIndex {
            case 3:
                cell.txtFieldForField.tag = 4000
                cell.btnForField.isHidden = true
                cell.imgViewForArrow.isHidden = true
                if let temp = self.health.recordedTemparture {
                    cell.txtFieldForField.text = temp
                } else {
                    cell.txtFieldForField.text = ""
                }
                cell.txtFieldForField.keyboardType = .decimalPad
            case 7:
                cell.btnForField.isHidden = false
                cell.btnForField.tag = 3500
                cell.txtFieldForField.tag = 3500
                cell.imgViewForArrow.isHidden = false
                cell.imgViewForArrow.image = UIImage(named: "clock")
                cell.txtFieldForField.text = (diper.diaperChangeTime != nil) ? CommonClassMethods.timeFromDateString(date: diper.diaperChangeTime ?? "") : ""
                cell.btnForField.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            default:
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.text = self.meal.mealPlanTitle
                cell.txtFieldForField.keyboardType = .default
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customCollectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddDailySheetCollectionTableViewCell) as? AddDailySheetCollectionTableViewCell {
            cell.collectionViewForActivityMoodSelection.reloadData()
            var arrForTitles = Macros.ConstantArray.arrForDailySheetTitles[selectedIndex - 1]
            if selectedIndex == 1 {
                cell.lblForFieldTitle.isHidden = false
                cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            } else {
                cell.lblForFieldTitle.isHidden = true
                cell.lblForFieldTitle.text = ""
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customMealPlanTitleTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddMealPlanTitleTableViewCell) {
            return cell
        }
         return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            var arrForTitles = Macros.ConstantArray.arrForDailySheetTitles[selectedIndex - 1]
            cell.lblForFieldTitle.attributedText =  self.getAttributedStringForMandatoryField(text: arrForTitles[indexPath.row] as? String ?? "")
            cell.selectionStyle = .none
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            self.setupMealPlanDropDown(cell.imgViewForArrow, sender: cell.btnForField)
            cell.btnForField.addTarget(self, action: #selector(actionForMealPlanList(_:)), for: .touchUpInside)
            (self.meal.mealPlanTitle != nil && self.meal.mealPlanTitle != "") ? cell.btnForField.setTitle(self.meal.mealPlanTitle ?? "", for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            return cell
        }
        return UITableViewCell()
    }
    
    func customMealPlanItemTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MealPlanAddItemTableViewCell) as? MealPlanAddItemTableViewCell {
            cell.lblForFoodItem.text = self.meal.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName
            cell.lblForAmount.text = String(self.meal.studentActivityMealFoodItems?[indexPath.row - 2].amount ?? 0)
            cell.lblForUnit.text = self.meal.studentActivityMealFoodItems?[indexPath.row - 2].measureUnitTypeName
            
            cell.btnForConsume.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForConsumeData.delegate = self
            cell.btnForConsume.removeTarget(nil, action: nil, for: .allEvents)
            if (self.meal.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName?.lowercased() == Macros.ControllerStrings.DailySheetVC.milk.lowercased()) {
                cell.txtFieldForConsumeData.tag = (5000 + (indexPath.row - 2))
                cell.txtFieldForConsumeData.isEnabled = true
                cell.btnForConsume.isHidden = true
                cell.imgViewForArrow.isHidden = true
                cell.txtFieldForConsumeData.isDividerHidden = false
                cell.txtFieldForConsumeData.text = self.meal.studentActivityMealFoodItems?[indexPath.row - 2].milkConsumptionQuantity 
            } else {
                cell.txtFieldForConsumeData.isEnabled = false
                cell.btnForConsume.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForConsumeData.isDividerHidden = true
                (self.meal.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != nil && self.meal.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != "") ? cell.btnForConsume.setTitle(self.meal.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName, for: .normal) : cell.btnForConsume.setTitle("Select", for: .normal)
                cell.btnForConsume.addTarget(self, action: #selector(actionForMealItemConsume(_:)), for: .touchUpInside)
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSubmitButtonTableViewCell() ->  UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForAddDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = self.tblViewForAddDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            cell.btnForSubmit.setTitle("ADD ACTIVITY", for: .normal)
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView DataSource and Delegates -----

extension AddDailySheetVC: UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch selectedIndex {
        case 1:
            return self.arrForSubActivities?.count ?? 0
        case 5:
            return Macros.ConstantArray.arrForMoodTitle.count
        case 7:
            return Macros.ConstantArray.arrForDiperTypeSelection.count
        default :
            return 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return (selectedIndex == 1 || selectedIndex == 7) ? customTabSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath) : customImageSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch selectedIndex {
        case 1:
            let lblSize =  self.arrForSubActivities?[indexPath.row].subActivityLabel?.sizeOfString(font: fonts.addIncidentTitle ?? UIFont.systemFont(ofSize: 15)) ?? CGSize()
            return CGSize(width: lblSize.width + 30, height: 50)
        case 7:
//            let lblSize =  Macros.ConstantArray.arrForDiperTypeSelection[indexPath.item].sizeOfString(font: fonts.addIncidentTitle ?? UIFont.systemFont(ofSize: 15))
//            return CGSize(width: lblSize.width + 30, height: 50)
            return CGSize(width: 100, height: 50)
        default:
            return CGSize(width: 90, height: 115)
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        switch selectedIndex {
        case 1:
            let txtViewForNote = self.view.viewWithTag(18) as? CustomTextView
            let textString = txtViewForNote?.text
            txtViewForNote?.text =  textString != "" ? ("\(textString ?? "")  \(self.arrForSubActivities?[indexPath.item].subActivityText ?? "")") : (self.arrForSubActivities?[indexPath.item].subActivityText ?? "")
            self.activity.otherActivityNote = txtViewForNote?.text
        case 7:
            let txtViewForNote = self.view.viewWithTag(120) as? CustomTextView
            let textString = txtViewForNote?.text
            txtViewForNote?.text =  textString != "" ? ("\(textString ?? "")  \(Macros.ConstantArray.arrForDiperTypeDescription[indexPath.item])") : (Macros.ConstantArray.arrForDiperTypeDescription[indexPath.item])
            self.diper.studentActivityDiaperNote = txtViewForNote?.text
        default :
            self.mood.moodTypeID = (indexPath.item + 1)
            for i in 0..<Macros.ConstantArray.arrForMoodTitle.count {
                let button = collectionView.viewWithTag(i+1) as? UIButton
                (i == indexPath.item) ? button?.setImage(UIImage(named: Macros.ConstantArray.arrForSelectedMoodImages[i]), for: .normal) : button?.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[i]), for: .normal)
            }
        }
    }
    
    func customTabSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.AddDailySheetActivityCollectionViewCell, for: indexPath) as? AddDailySheetActivityCollectionViewCell {
            cell.lblForActivityKey.text = (selectedIndex == 1) ? (self.arrForSubActivities?[indexPath.item].subActivityLabel ?? "") : (Macros.ConstantArray.arrForDiperTypeSelection[indexPath.item])
            return cell
        }
        return UICollectionViewCell()
    }
    
    func customImageSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.AddDailySheetMoodCollectionViewCell, for: indexPath) as? AddDailySheetMoodCollectionViewCell {
            cell.btnForImage.tag = (indexPath.item + 1)
            cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[indexPath.item]), for: .normal)
            cell.lblForImageTitle.text = Macros.ConstantArray.arrForMoodTitle[indexPath.item]
            return cell
        }
        return UICollectionViewCell()
    }
}

//MARK:----- UITextField Delegates -----
extension AddDailySheetVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if textField.tag == 4000 {
            if Macros.ConstantArray.numberStringArray.contains(string){
                self.health.recordedTemparture = newString as String
                return true
            } else {
                return false
            }
        }else {
            self.meal.studentActivityMealFoodItems?[textField.tag - 5000].milkConsumptionQuantity = newString as String
            return true
        }
    }
}

//MARK:----- UITextView Delegates -----
extension AddDailySheetVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
       switch textView.tag {
        case 18:
            self.activity.otherActivityNote         = newString as String
        case 3111:
            self.meal.otherThanPlanMeal             = newString as String
        case 3222:
            self.meal.otherThanPlanMealComment      = newString as String
        case 3333:
            self.meal.mealComment                   = newString as String
        case 52:
            self.health.studentHealthDescription    = newString as String
        case 68:
            self.notes.noteDescription              = newString as String
        case 86:
            self.mood.studentMoodDescription        = newString as String
        case 103:
            self.nap.napNote                        = newString as String
       case 120:
            self.diper.studentActivityDiaperNote    = newString as String
        default:
            print("Invalid Case")
        }
        return true
    }
    
    //let mealItemCount = self.meal.studentActivityMealFoodItems?.count
    // cell.txtViewForField.tag = 3111
    //((mealItemCount ?? 0)+2)
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        switch textView.tag {
        case 18,35,52,86,103,120:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:1, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
       case 36:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:2, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 37:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:3, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 68:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:0, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 3111:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+2), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
            
        case 3222:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+3), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = colorCode.applicationColor
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
            }
        case 3333:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+4), section: 0)) as? TextViewTableViewCell {
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
        case 18,35,52,86,103,120:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:1, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 36:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:2, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 37:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:3, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 68:
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:0, section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3111:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+2), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3222:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+3), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        case 3333:
            let mealItemCount = self.meal.studentActivityMealFoodItems?.count
            if let cell = self.tblViewForAddDailySheet.cellForRow(at: IndexPath(row:((mealItemCount ?? 0)+4), section: 0)) as? TextViewTableViewCell {
                cell.lblForDivider.backgroundColor = .lightGray
                cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
            }
        default:
            print("Invalid Case")
        }
        return true
    }
}


//MARK:----- AddDailySheetCollectionTableViewCell -----
class AddDailySheetCollectionTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForFieldTitle                         : UILabel!
    @IBOutlet weak var collectionViewForActivityMoodSelection   : UICollectionView!
}


//MARK:----- AddDailySheetActivityCollectionViewCell -----
class AddDailySheetActivityCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var lblForActivityKey    : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:----- AddDailySheetHeaderTableView -----
class AddDailySheetHeaderTableView: UITableViewCell {
    @IBOutlet weak var btnForActivity           : UIButton!
    @IBOutlet weak var btnForMeal               : UIButton!
    @IBOutlet weak var btnForHealth             : UIButton!
    @IBOutlet weak var btnForNotes              : UIButton!
    @IBOutlet weak var btnForMood               : UIButton!
    @IBOutlet weak var btnForNap                : UIButton!
    @IBOutlet weak var btnForDiper              : UIButton!
}

//MARK:----- AddDailySheetMoodCollectionViewCell -----
class AddDailySheetMoodCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var btnForImage          : UIButton!
    @IBOutlet weak var lblForImageTitle     : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:------ MealPlan AddItem TableView Cell -----
class MealPlanAddItemTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFoodItem: UILabel!
    @IBOutlet weak var lblForAmount: UILabel!
    @IBOutlet weak var lblForUnit: UILabel!
    @IBOutlet weak var btnForConsume: UIButton!
    @IBOutlet weak var imgViewForArrow: UIImageView!
    @IBOutlet weak var txtFieldForConsumeData: CustomTextField!
}
