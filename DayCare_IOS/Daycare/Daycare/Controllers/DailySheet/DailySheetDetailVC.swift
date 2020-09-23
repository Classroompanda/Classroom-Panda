//
//  DailySheetDetailVC.swift
//  Daycare
//
//  Created by amrut waghmare on 18/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

class DailySheetDetailVC: BaseViewController {

    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForDay: UILabel!
    @IBOutlet weak var tblViewForDailySheetDetails: UITableView!
    @IBOutlet weak var imgViewForStudentProfile: UIImageView!
    
    var dailySheetStudent: DailySheet?
    var selectedDate: Date?
    var selectedClass: Class?
    var arrForActivity:[ActivityDetail] = []
    var arrForSubActivities: [SubActivity]?
    
  var isCompleteDailySheet = false
    override func viewDidLoad() {
        super.viewDidLoad()
        arrForActivity = dailySheetStudent?.activityDetail ?? []
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    //MARK:----- @IBActions -----
    @IBAction func actionForAddButton(_ sender: Any) {
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddDailySheetVC) as! AddDailySheetVC
        vc.arrForSelectedStudent.append(dailySheetStudent ?? DailySheet())
        vc.selectedClass = self.selectedClass
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    @IBAction func actionForCalendar(_ sender: Any) {
    }
    
    @objc func actionForDelete(_ sender: UIButton){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                if (self.arrForActivity[sender.tag].activityTypeID != nil) {
                    self.apiCallForDeleteActivity(param: self.genarateParameter(activity: self.arrForActivity[sender.tag]))
                    self.arrForActivity.remove(at: sender.tag)
                    self.tblViewForDailySheetDetails.reloadData()
                }
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
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
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.EditDailySheetPopupVC) as! EditDailySheetPopupVC
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.dailySheetStudent = dailySheetStudent
        popoverContent.selectedClass = self.selectedClass
        popoverContent.selectedActivityTypeId = activityTypeId
        popoverContent.selectedIndex = selectedIndex
        popoverContent.delegate = self
        switch activityTypeId {
        case ActivityTypeID.Activity:
            popoverContent.arrForSubActivities = self.arrForSubActivities
            popoverContent.activity = activity
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:600) :  CGSize(width:(self.view.bounds.width - 60),height:510)
        case ActivityTypeID.Meal:
            popoverContent.meal = meal
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:500) : CGSize(width:(self.view.bounds.width - 60),height:400)
        case ActivityTypeID.Health:
            popoverContent.health = health
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:(health?.studentMedicationID ?? 0) > 0 ? 750 : 370) : CGSize(width:(self.view.bounds.width - 60),height:(health?.studentMedicationID ?? 0) > 0 ? (self.view.bounds.height - 100) : 300)
        case ActivityTypeID.Notes:
            popoverContent.notes = notes
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:300) : CGSize(width:(self.view.bounds.width - 60),height:200)
        case ActivityTypeID.Mood:
            popoverContent.mood = mood
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:420) : CGSize(width:(self.view.bounds.width - 60),height:350)
        case ActivityTypeID.Nap:
            popoverContent.nap = nap
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:500) : CGSize(width:(self.view.bounds.width - 60),height:410)
        case ActivityTypeID.Diper:
            popoverContent.diaper = diaper
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:(self.view.bounds.width - 150),height:500) : CGSize(width:(self.view.bounds.width - 60),height:400)
        default:
            print("Invalid case")
        }
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-120),width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.navigationController?.navigationBar.setValue(true, forKey: "hidesShadow")
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.DailySheetDetail)
        lblForStudentName.text = dailySheetStudent?.studentName
        lblForClassName.text = dailySheetStudent?.className
        lblForDay.text = CommonClassMethods.dateFromDateFormat(date: selectedDate ?? Date())
        imgViewForStudentProfile.cornerRadius = imgViewForStudentProfile.bounds.height/2
        imgViewForStudentProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//        imgViewForStudentProfile.sd_setShowActivityIndicatorView(true)
//        imgViewForStudentProfile.sd_setIndicatorStyle(.gray)
        imgViewForStudentProfile.sd_setImage(with: URL(string: dailySheetStudent?.imagePath ?? "")) { (image, error, type, url) in
            if error != nil {
                self.imgViewForStudentProfile.image = UIImage(named: "placeholder")
            }
        }
    }
    
    func genarateParameter(activity: ActivityDetail) -> Dictionary<String,Any>{
        var dictForParameter:[String:Any] = [:]
        dictForParameter[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
        dictForParameter[Macros.ApiKeys.kisDeleted] = true
        dictForParameter[Macros.ApiKeys.kdeletedBy] = AppInstance.shared.user?.loginUserID
        dictForParameter[Macros.ApiKeys.kactivityTypeID] = activity.activityTypeID
        dictForParameter[Macros.ApiKeys.kselectedStudents] = [dailySheetStudent?.studentID] as? [Int]
        dictForParameter[Macros.ApiKeys.kclassesID] = selectedClass?.classesID
        dictForParameter[Macros.ApiKeys.kstudentActivitiesID] = activity.studentActivityID
        dictForParameter[Macros.ApiKeys.kid] = activity.studentActivityID
        return dictForParameter
    }
    
    //MARK:----- API Calling Function -----
    func apiCallForDeleteActivity(param: Dictionary<String,Any>){
        let service = DailySheetService()
        service.saveDailySheetData(with: nil, param: param) { (result) in
            if result as? String != nil {
                if self.arrForActivity.count == 0 {
                    self.tblViewForDailySheetDetails.reloadData()
                }
            }
        }
    }
    
    func apiCallForSaveDailySheet(param: Dictionary<String,Any>, selectedIndex: Int){
        let service = DailySheetService()
        service.saveDailySheetData(with: self, param: param) { (result) in
            if result as? String != nil {
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: result as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        self.navigationController?.popViewController(animated: true)
                        break
                    default:
                        break
                    }
                })
            }
        }
    }
    
    //Get subactivies list
    func apiCallForGetSubActivity(){
        let service = DailySheetService()
        service.getSubActivityList(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForSubActivities = result as? [SubActivity]
            }
        }
    }
    
    //Get other activities detail
    func apiCallForGetOtherActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = DailySheetService()
        service.getOtherActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let activityResult = result as? OtherActivity {
                self.showEditPopup(activity: activityResult, meal: nil, health: nil, notes: nil, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Meal Activity detai
    func apiCallForGetMealActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = DailySheetService()
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
        let service = DailySheetService()
        service.getHealthActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let healthResult = result as? ActivityMedications {
                self.showEditPopup(activity: nil, meal: nil, health: healthResult, notes: nil, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Note activity detail
    func apiCallForGetNoteActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = DailySheetService()
        service.getNotesActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if  let notesResult = result as? ActivityNotes {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: notesResult, mood: nil, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Mood Activity Detail
    func apiCallForGetMoodActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int, selectedIndex: Int){
        let service = DailySheetService()
        service.getMoodActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let moodResult = result as? ActivityMoods {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: moodResult, nap: nil, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Nap Activity Detail
    func apiCallForGetNapActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int,selectedIndex: Int){
        let service = DailySheetService()
        service.getNapActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let napResult = result as? AcitivityNap {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: nil, nap: napResult, diaper: nil, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
    
    //Get Diaper Activity Detail
    func apiCallForGetDiaperActivityDetail(activityDetail:ActivityDetail, activityTypeId: Int,selectedIndex: Int){
        let service = DailySheetService()
        service.getDiaperActivityDetails(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: activityDetail.studentID ?? 0, studentAcitivityId: activityDetail.studentActivityID ?? 0) { (result) in
            if let diaperResult = result as? ActivityDiper {
                self.showEditPopup(activity: nil, meal: nil, health: nil, notes: nil, mood: nil, nap: nil, diaper: diaperResult, activityTypeId: activityTypeId, selectedIndex: selectedIndex)
            }
        }
    }
}

//MARK:------ UITableViewDataSource and Delegates -----
extension DailySheetDetailVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return arrForActivity.count == 0 ? 1 : arrForActivity.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return arrForActivity.count > 0 ? customCellForDailySheetDetail(tableView:tableView ,indexPath:indexPath) : customEmptyTableViewCell(tableView: tableView)
    }
    
    func customCellForDailySheetDetail(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DailySheetDetailTableViewCell) as? DailySheetDetailTableViewCell{
            let cellCount = arrForActivity.count
            let activity = arrForActivity[indexPath.row]
            cell.imgViewForActivity.isHidden = false
            cell.lblForLine.isHidden = false
            cell.lblForTime.isHidden = false
            cell.btnForEdit.isHidden = false
            cell.btnForDelete.isHidden = false
          if isCompleteDailySheet {
            cell.btnForEdit.isHidden = true
            cell.btnForDelete.isHidden = true
          }
            cell.btnForDelete.tag = indexPath.row
            cell.btnForEdit.tag = indexPath.row
            cell.lblForLine.isHidden = indexPath.row == (cellCount - 1) ? true : false
            cell.lblForDescription.text = activity.activityDescription
            cell.btnForEdit.addTarget(self, action: #selector(actionForEdit(_:)), for: .touchUpInside)
            cell.btnForDelete.addTarget(self, action: #selector(actionForDelete(_:)), for: .touchUpInside)
            switch activity.activityTypeID {
            case ActivityTypeID.Health:
                cell.imgViewForActivity.image = UIImage.init(named: "healthL")
                cell.lblForTime.text = Macros.ControllerStrings.DailySheetDetailVC.medicationData
            case ActivityTypeID.Notes:
                cell.imgViewForActivity.image = UIImage.init(named: "noteL")
                cell.lblForTime.text = Macros.ControllerStrings.DailySheetDetailVC.notesData
            case ActivityTypeID.Meal:
                cell.imgViewForActivity.image = UIImage.init(named: "mealL")
                cell.lblForTime.text = Macros.ControllerStrings.DailySheetDetailVC.mealData
            case ActivityTypeID.Mood:
                cell.imgViewForActivity.image = UIImage.init(named: "moodL")
                cell.lblForTime.text = Macros.ControllerStrings.DailySheetDetailVC.moodData
            case ActivityTypeID.Activity:
                cell.imgViewForActivity.image = UIImage.init(named: "activityL")
                cell.lblForTime.text = "\(CommonClassMethods.timeFromDateString(date: activity.startTime ?? "")) - \(CommonClassMethods.timeFromDateString(date: activity.endTime ?? ""))"
            case ActivityTypeID.Nap:
                cell.imgViewForActivity.image = UIImage.init(named: "napL")
                cell.lblForTime.text = "\(CommonClassMethods.timeFromDateString(date: activity.startTime ?? "")) - \(CommonClassMethods.timeFromDateString(date: activity.endTime ?? ""))"
            case ActivityTypeID.Diper:
                cell.imgViewForActivity.image = UIImage.init(named: "diperL")
                cell.lblForTime.text = Macros.ControllerStrings.DailySheetDetailVC.diaper
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //For Empty cell
    func customEmptyTableViewCell(tableView: UITableView) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DailySheetDetailTableViewCell) as? DailySheetDetailTableViewCell{
            cell.imgViewForActivity.isHidden = true
            cell.lblForLine.isHidden = true
            cell.lblForTime.isHidden = true
            cell.btnForEdit.isHidden = true
            cell.btnForDelete.isHidden = true
            cell.lblForDescription.text = Macros.ControllerStrings.DailySheetDetailVC.emptyRecord
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Edit Daily Sheet Delegate -----
extension DailySheetDetailVC: EditDailySheetVCDelegate{
    func doneButtonAction(dataParam: Dictionary<String, Any>, selectedIndex: Int?) {
        if let index = selectedIndex {
            self.apiCallForSaveDailySheet(param: dataParam, selectedIndex: index)
        }
    }
}

//MARK:---- DailySheetDetailTableViewCell -----
class DailySheetDetailTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForActivity: UIImageView!
    @IBOutlet weak var lblForDescription: UILabel!
    @IBOutlet weak var lblForTime: UILabel!
    @IBOutlet weak var lblForLine: UILabel!
    @IBOutlet weak var btnForEdit: UIButton!
    @IBOutlet weak var btnForDelete: UIButton!
}
