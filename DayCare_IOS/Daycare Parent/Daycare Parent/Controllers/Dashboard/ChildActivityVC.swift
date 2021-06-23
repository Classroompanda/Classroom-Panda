//
//  ChildActivityVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import SDWebImage
import DropDown

class ChildActivityVC: BaseViewController {
    @IBOutlet weak var tblViewForChildActivities: UITableView!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForMonthYear: UILabel!
    @IBOutlet weak var lblForDayName: UILabel!
    var selectedDate:Date?
    var isFirstLoad:Bool = true
//    var dropDownforStudent = DropDown()
    var refreshControl = UIRefreshControl()
    var arrForDailySheet:[DailySheet]?
    var selectedStudentActivity:DailySheet?
    var arrForSubActivities: [SubActivity]?
    var arrForActivity:[ActivityDetail] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationBarTitle.ChildActivity)
         self.tblViewForChildActivities.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        self.selectedDate = Date()
        if (AppInstance.shared.selectedChild != nil) {
            self.setupChildListMenu()
            apiForGetDailySheetList()
        } else {
            (isFirstLoad = false)
        }
        
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }

    //MARK:----- @IBActions ------
    @IBAction func actionForCalendar(_ sender: UIButton) {
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: dateTime)
            self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:dateTime) + " " + CommonClassMethods.yearFromDate(date: dateTime)
            self.lblForDate.text = CommonClassMethods.dateFromDate(date: dateTime)
            if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: dateTime){
                self.selectedDate = dateTime
                self.apiForGetDailySheetList()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetDailySheetList()
    }
    
    @objc func actionForEdit(_ sender: UIButton){
        let selectedActivityTypeId = self.arrForActivity[sender.tag].activityTypeID
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity:
            apiCallForGetSubActivity()
            self.apiCallForGetOtherActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Activity, selectedIndex: sender.tag)
        case ActivityTypeID.Meal:
            self.apiCallForGetMealActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Meal, selectedIndex: sender.tag)
        case ActivityTypeID.Health:
            self.apiCallForGetHealthActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Health, selectedIndex: sender.tag)
        case ActivityTypeID.Notes:
            self.apiCallForGetNoteActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Notes, selectedIndex: sender.tag)
        case ActivityTypeID.Mood:
            self.apiCallForGetMoodActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Mood, selectedIndex: sender.tag)
        case ActivityTypeID.Nap:
            self.apiCallForGetNapActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Nap, selectedIndex: sender.tag)
        case ActivityTypeID.Diper:
            self.apiCallForGetDiaperActivityDetail(activityDetail: self.arrForActivity[sender.tag], activityTypeId: ActivityTypeID.Diper, selectedIndex: sender.tag)
        default:
            print("Invalid case")
        }
    }
    
    @objc func showEditPopup(activity : OtherActivity?, meal : ActivityMeals?, health : ActivityMedications?, notes : ActivityNotes?, mood : ActivityMoods?, nap : AcitivityNap?, diaper : ActivityDiper?, activityTypeId: Int, selectedIndex: Int) {
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Popover, vcIdentifire: Macros.Identifiers.Controllers.EditDailySheetPopupVC) as! EditDailySheetPopupVC
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.dailySheetStudent = selectedStudentActivity
        popoverContent.selectedActivityTypeId = activityTypeId
        popoverContent.selectedIndex = selectedIndex
        switch activityTypeId {
        case ActivityTypeID.Activity:
            popoverContent.arrForSubActivities = self.arrForSubActivities
            popoverContent.activity = activity
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:330) : CGSize(width:(self.view.bounds.width - 60),height:330)
        case ActivityTypeID.Meal:
            popoverContent.meal = meal
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:400) : CGSize(width:(self.view.bounds.width - 60),height:400)
        case ActivityTypeID.Health:
            popoverContent.health = health
            popoverContent.delegate = self
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:(health?.studentMedicationID ?? 0) > 0 ? 750 : 370) : CGSize(width:(self.view.bounds.width - 60),height: (health?.studentMedicationID ?? 0) > 0 ? (self.view.bounds.height - 100) : 370)
        case ActivityTypeID.Notes:
            popoverContent.notes = notes
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:200) : CGSize(width:(self.view.bounds.width - 60),height:200)
        case ActivityTypeID.Mood:
            popoverContent.mood = mood
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:350) : CGSize(width:(self.view.bounds.width - 60),height:350)
        case ActivityTypeID.Nap:
            popoverContent.nap = nap
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:400) : CGSize(width:(self.view.bounds.width - 60),height:400)
        case ActivityTypeID.Diper:
            popoverContent.diaper = diaper
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:280) : CGSize(width:(self.view.bounds.width - 60),height:280)
        default:
            print("Invalid case")
        }
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-50),width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    @objc func actionForOpenDropdown(sender: UIButton){
        self.setupDropDown(sender: sender)
        dropDownforStudent.show()
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        refreshControl.attributedTitle = NSAttributedString(string: Macros.ControllerString.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
        self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
        self.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
        tblViewForChildActivities.addSubview(refreshControl)
    }
    
    func setupChildListMenu(){
        let studentImgbutton = UIButton(type: .custom)
        studentImgbutton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        let imageView = UIImageView()
        imageView.sd_setImage(with: URL(string: AppInstance.shared.selectedChild?.imagePath ?? "")) { (image, error, imageType, url) in
            let image = imageView.image ?? UIImage(named: "placeholder")!
            UIGraphicsBeginImageContextWithOptions(studentImgbutton.frame.size, false, image.scale)
            let rect  = CGRect(x:0, y:0, width: studentImgbutton.frame.size.width, height: studentImgbutton.frame.size.height)
            UIBezierPath(roundedRect: rect, cornerRadius: rect.width/2).addClip()
            image.draw(in: rect)
            if let newImage = UIGraphicsGetImageFromCurrentImageContext() {
                UIGraphicsEndImageContext()
                studentImgbutton.setImage(newImage, for: .normal)
            }
        }
        studentImgbutton.cornerRadius = studentImgbutton.frame.bounds.width/2
        studentImgbutton.clipsToBounds = true
        studentImgbutton.layer.masksToBounds = true
        studentImgbutton.imageView?.contentMode = .scaleAspectFill
        studentImgbutton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: studentImgbutton)
        let dropdownButton = UIButton(type: .custom)
        dropdownButton.setImage(UIImage(named: "dropdown"), for: .normal)
        dropdownButton.frame = CGRect(x: 0, y: -15, width: 30, height: 30)
        dropdownButton.clipsToBounds = true
        dropdownButton.layer.masksToBounds = true
        dropdownButton.imageView?.contentMode = .scaleAspectFit
        dropdownButton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item2 = UIBarButtonItem(customView: dropdownButton)
        self.navigationItem.setRightBarButtonItems([item2,item1], animated: true)
    }

    func setupDropDown(sender: Any){
        var arrForChildName:[String]   =   []
        for child in AppInstance.shared.arrForChild ?? [] {
            arrForChildName.append(child.studentName ?? "")
        }
        dropDownforStudent.anchorView = sender as? UIButton ?? UIButton()
        dropDownforStudent.bottomOffset = CGPoint(x: 0, y: 30 )
        dropDownforStudent.width = PlatformUtils.isPad ? 300 : 200.0
        dropDownforStudent.dataSource = arrForChildName
        dropDownforStudent.cellHeight = 50
        dropDownforStudent.cellNib = UINib(nibName: Macros.Identifiers.Cells.DropdownStudentTableViewCell, bundle: nil)
        dropDownforStudent.customCellConfiguration = { (index: Index, item: String, cell: DropDownCell) -> Void in
            guard let cell = cell as? DropdownStudentTableViewCell else { return }
            cell.imgViewForStudent.sd_setShowActivityIndicatorView(true)
            cell.imgViewForStudent.sd_setIndicatorStyle(.gray)
            cell.optionLabel.font = fonts.customButtonFont
            cell.optionLabel.textColor = colorCode.grayShadeColor
            cell.imgViewForStudent.sd_setImage(with: URL(string: AppInstance.shared.arrForChild?[index].imagePath ?? ""), completed: { (image, error, imagetype, url) in
                if error != nil {
                    cell.imgViewForStudent.image = UIImage(named: "placeholder")
                }
            })
        }
        dropDownforStudent.selectionAction = {[weak self] (index, item) in
            AppInstance.shared.selectedChild = AppInstance.shared.arrForChild?[index]
            self?.setupChildListMenu()
            self?.apiForGetDailySheetList()
        }
    }
    
    //MARK:----- API Calling Function -----
    func apiForGetDailySheetList() {
        let service = ChildActivityService()
        self.selectedStudentActivity = nil
        service.getAllChildActivities(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: AppInstance.shared.selectedChild?.studentId ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0, askedDate: CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedDate ?? Date())) { (result) in
            self.isFirstLoad = false
            self.refreshControl.endRefreshing()
            self.arrForDailySheet = result as? [DailySheet]
            for dailySheet in (self.arrForDailySheet ?? []) {
                if dailySheet.studentID == (AppInstance.shared.selectedChild?.studentId ?? 0) {
                    self.selectedStudentActivity = dailySheet
                    self.arrForActivity = dailySheet.activityDetail ?? []
                }
            }
            self.tblViewForChildActivities.reloadData()
        }
    }
    
    //Get subactivies list
    func apiCallForGetSubActivity(){
        let service = ChildActivityService()
        service.getSubActivityList(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForSubActivities = result as? [SubActivity]
            }
        }
    }
    //Get other activities detail
    func apiCallForGetOtherActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = ChildActivityService()
        service.getOtherActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let activityResult = result as? OtherActivity {
                self.showEditPopup(activity: activityResult, meal: nil, health: nil, notes: nil, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Meal Activity detai
    func apiCallForGetMealActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = ChildActivityService()
        service.getMealActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if result != nil {
                var meal        = ActivityMeals()
                meal = result as? ActivityMeals ?? ActivityMeals()
                self.showEditPopup(activity: nil, meal: meal, health: nil, notes: nil, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Health activity detail
    func apiCallForGetHealthActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = ChildActivityService()
        service.getHealthActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let healthResult = result as? ActivityMedications {
                self.showEditPopup(activity: nil, meal: nil, health: healthResult, notes: nil, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Note activity detail
    func apiCallForGetNoteActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = ChildActivityService()
        service.getNotesActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if  let notesResult = result as? ActivityNotes {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: notesResult, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Mood Activity Detail
    func apiCallForGetMoodActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = ChildActivityService()
        service.getMoodActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let moodResult = result as? ActivityMoods {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: moodResult, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Nap Activity Detail
    func apiCallForGetNapActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int,selectedIndex: Int){
        let service = ChildActivityService()
        service.getNapActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let napResult = result as? AcitivityNap {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: nil, nap: napResult, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Diaper Activity Detail
    func apiCallForGetDiaperActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int,selectedIndex: Int){
        let service = ChildActivityService()
        service.getDiaperActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let diaperResult = result as? ActivityDiper {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: nil, nap: nil, diaper: diaperResult, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    func apiCallForSaveDailySheet(param: Dictionary<String,Any>){
        let service = ChildActivityService()
        service.saveDailySheetData(with: self, param: param) { (result) in
            if result as? String != nil {
                self.showAlert(with: result as? String ?? "")
            }
        }
    }
}

//MARK:------ UITableViewDataSource and Delegates -----
extension ChildActivityVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : ((self.selectedStudentActivity?.activityDetail?.count ?? 0 == 0) ? 1 : self.selectedStudentActivity?.activityDetail?.count ?? 1)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if (self.selectedStudentActivity?.activityDetail?.count != nil) &&  (self.selectedStudentActivity?.activityDetail?.count != 0) {
            return customCellForDailySheetDetail(tableView:tableView ,indexPath:indexPath)
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForChildActivities)
        }
    }
    
    func customCellForDailySheetDetail(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DailySheetListTableViewCell) as? DailySheetListTableViewCell{
            let cellCount = self.selectedStudentActivity?.activityDetail?.count
            let activity = self.selectedStudentActivity?.activityDetail?[indexPath.row]
            cell.imgViewForActivity.isHidden = false
            cell.lblForLine.isHidden = false
            cell.lblForTime.isHidden = false
            cell.btnForShowDetail.tag = indexPath.row
            cell.btnForShowDetail.addTarget(self, action: #selector(actionForEdit(_:)), for: .touchUpInside)
            cell.lblForLine.isHidden = indexPath.row == ((cellCount ?? 0) - 1) ? true : false
            cell.lblForDescription.text = activity?.activityDescription
            switch activity?.activityTypeID {
            case ActivityTypeID.Health:
                cell.imgViewForActivity.image = UIImage.init(named: "healthL")
                cell.lblForTime.text = Macros.ControllerString.medicationData
            case ActivityTypeID.Notes:
                cell.imgViewForActivity.image = UIImage.init(named: "noteL")
                cell.lblForTime.text = Macros.ControllerString.notesData
            case ActivityTypeID.Meal:
                cell.imgViewForActivity.image = UIImage.init(named: "mealL")
                cell.lblForTime.text = Macros.ControllerString.mealData
            case ActivityTypeID.Mood:
                cell.imgViewForActivity.image = UIImage.init(named: "moodL")
                cell.lblForTime.text = Macros.ControllerString.moodData
            case ActivityTypeID.Activity:
                cell.imgViewForActivity.image = UIImage.init(named: "activityL")
                cell.lblForTime.text = "\(CommonClassMethods.timeFromDateString(date: activity?.startTime ?? "")) - \(CommonClassMethods.timeFromDateString(date: activity?.endTime ?? ""))"
            case ActivityTypeID.Nap:
                cell.imgViewForActivity.image = UIImage.init(named: "napL")
                cell.lblForTime.text = "\(CommonClassMethods.timeFromDateString(date: activity?.startTime ?? "")) - \(CommonClassMethods.timeFromDateString(date: activity?.endTime ?? ""))"
            case ActivityTypeID.Diper:
                cell.imgViewForActivity.image = UIImage.init(named: "diperL")
                cell.lblForTime.text = Macros.ControllerString.diaper
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Update Medication Delegate ----
extension ChildActivityVC: UpdateMedication {
    func updateMedicationData(param: Dictionary<String,Any>) {
        self.apiCallForSaveDailySheet(param: param)
    }
}

//MARK:----- Child Activity Popover Delegatge -----
extension ChildActivityVC : UIPopoverPresentationControllerDelegate {
  
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}
//MARK:---- DailySheetDetailTableViewCell -----
class DailySheetListTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForActivity: UIImageView!
    @IBOutlet weak var lblForDescription: UILabel!
    @IBOutlet weak var lblForTime: UILabel!
    @IBOutlet weak var lblForLine: UILabel!
    @IBOutlet weak var btnForShowDetail: UIButton!
}
