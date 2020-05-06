//
//  DashboartVC.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

class DashboardVC: BaseViewController{

    @IBOutlet weak var tblViewForDashboard: UITableView!
    var selectedImageView: UIImageView!
    var arrForTeacherlogs:[TeacherClassLog] = []
    var isFirstLoad:Bool = true
    //MARK:---- View Methods -----
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        tblViewForDashboard.reloadRows(at: [IndexPath(row: 0, section: 0)], with: .automatic)
        tblViewForDashboard.tableFooterView = UIView()
    }
    
    func initialSetup(){
        if AppInstance.shared.teacherBreak?.breakStatusID == teacherBreakStatus.BreakOut {
            self.actionForTeacherBreakout(isBreakIn: true)
        }
        checkTeacherClockIn()
        self.setNavigationBar(title: Macros.NavigationTitle.Dashboard)
        self.tblViewForDashboard.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
    }
    

    //MARK:---- @IBActions ---
    @IBAction func actionForCamera(_ sender: UIButton) {
    }
    
  
    @objc @IBAction func actionForPushToController(_ sender: UIButton){
        switch sender.tag {
        case 1:
            AppInstance.shared.selectedMenuIndex = 2
            let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.DailySheetsVC) as! DailySheetsVC
            self.navigationController?.pushViewController(vc, animated: true)
        case 2:
            AppInstance.shared.selectedMenuIndex = 4
            let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.AttendanceVC) as! AttendanceVC
            self.navigationController?.pushViewController(vc, animated: true)
        case 3:
            AppInstance.shared.selectedMenuIndex = 7
            let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.IncidentVC) as! IncidentVC
            self.navigationController?.pushViewController(vc, animated: true)
        case 4:
            AppInstance.shared.selectedMenuIndex = 3
            let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.PostActivityVC) as! PostActivityVC
            self.navigationController?.pushViewController(vc, animated: true)
        case 5:
            if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
                self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
                return
            }
            AppInstance.shared.selectedMenuIndex = 10
            let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.AllergyVC) as! AllergyVC
            self.navigationController?.pushViewController(vc, animated: true)
        default:
            print("In Progress")
        }
        
    }
    
    @objc func actionForCheckedIn(sender: CustomButton){
        var isClassCheckIn = false
        for teacherClassLog in self.arrForTeacherlogs {
            if teacherClassLog.checkStatus == CheckInStatus.CheckedIn {
                self.showAlert(with: Macros.alertMessages.alreadyCheckInAlert)
                isClassCheckIn = true
            }
        }
        if !isClassCheckIn {
            self.checkInAction(sender: sender)
        }
    }
    
    @objc func actionForCheckedOut(sender: CustomButton){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.checkOut , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForCheckedOut(teacherClassLog: self.arrForTeacherlogs[sender.tag], sender: sender)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    @objc func actionForEdit(sender: CustomButton){
        self.openCheckInOutTimePopup(sender: sender)
    }
   
    
    //MARK:---- Functions ---
    
    func checkInAction(sender: CustomButton) {
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.checkIn , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForCheckedIn(teacherClassLog: self.arrForTeacherlogs[sender.tag], sender: sender)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    func checkTeacherClockIn(){
        if AppInstance.shared.user?.teacherTodayAttendenceStatusId == ClockInStatus.notClockIn {
            let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
            _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.clockIn , buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                switch index {
                case 0:
                    self.apiCallForClockIn()
                    self.dismiss(animated: true, completion: nil)
                default:
                    break
                }
            })
        } else {
            self.apiCallForGetClassLog()
        }
    }
    
    func setCurrentCheckInClass(){
        var isCheckIn = false
        for teacherClassLog in self.arrForTeacherlogs {
            if teacherClassLog.checkStatus == CheckInStatus.CheckedIn {
                AppInstance.shared.currentCheckInClass.className = teacherClassLog.className
                AppInstance.shared.currentCheckInClass.classesID = teacherClassLog.classesID
                isCheckIn = true
            }
        }
        if !isCheckIn {
            for teacherClassLog in self.arrForTeacherlogs {
                if teacherClassLog.checkStatus == CheckInStatus.CheckedOut {
                    AppInstance.shared.currentCheckInClass.className = teacherClassLog.className
                    AppInstance.shared.currentCheckInClass.classesID = teacherClassLog.classesID
                }
            }
        }
    }
    
    //Check In Popup Function
    func openCheckInOutTimePopup(sender: CustomButton){
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.ClassCheckInCheckOutPopupVC) as! ClassCheckInCheckOutPopupVC
        popoverContent.delegate = self
        popoverContent.sender = sender
        popoverContent.teacherClassLog = self.arrForTeacherlogs[sender.tag]
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = (self.arrForTeacherlogs[sender.tag].checkStatus == CheckInStatus.CheckedIn) ? CGSize(width:300,height:250) : CGSize(width:300,height:320)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //MARK:----- API calling function -----
    func apiCallForClockIn(){
        let service = DashboarService()
        service.teacherClockInClockOut(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: 0, classesID: 0, attendenceStatusID: (AppInstance.shared.user?.teacherTodayAttendenceStatusId == 0) ? ClockInStatus.clockedIn : ClockInStatus.clockedOut, teacherID: AppInstance.shared.user?.releventUserID ?? 0, time: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), attendanceDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                AppInstance.shared.user?.teacherTodayAttendenceStatusId = (AppInstance.shared.user?.teacherTodayAttendenceStatusId == 0) ? ClockInStatus.clockedIn : ClockInStatus.clockedOut
                AppInstance.shared.kUserDefault.set(AppInstance.shared.user?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kUserDetails)
                self.apiCallForGetClassLog()
            }
        }
    }
    
    func apiCallForGetClassLog(){
        let service = DashboarService()
        service.getAllTeacherClassLog(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), teacherID: AppInstance.shared.teacher?.id ?? 0) { (result) in
            if result != nil {
                self.arrForTeacherlogs = result as? [TeacherClassLog] ?? []
                self.setCurrentCheckInClass()
                self.isFirstLoad = false
                self.tblViewForDashboard.reloadData()
            }
        }
    }
    
    func apiCallForCheckedIn(teacherClassLog: TeacherClassLog, sender: UIButton){
        let service = DashboarService()
        service.teacherClassCheckIn(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: teacherClassLog.id ?? 0, checkInTime: (teacherClassLog.checkInTime != "" && teacherClassLog.checkInTime != nil) ? (teacherClassLog.checkInTime ?? "") : CommonClassMethods.convertDateToServerReadableFormat(date: Date()), classAssignmentLogID: teacherClassLog.classAssignmentLogID ?? 0, classEndTime: teacherClassLog.classEndTime ?? "", classesID: teacherClassLog.classesID ?? 0, classStartTime: teacherClassLog.classStartTime ?? "", teacherDailyAttendenceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0, teacherID: teacherClassLog.teacherID ?? 0, checkStatus: CheckInStatus.CheckedIn, checkOutTime: teacherClassLog.checkOutTime ?? "", updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                print(result!)
                self.arrForTeacherlogs[sender.tag].checkStatus = CheckInStatus.CheckedIn
                self.arrForTeacherlogs[sender.tag].id = result as? Int
                self.setCurrentCheckInClass()
                if let cell = self.tblViewForDashboard.cellForRow(at: IndexPath(row: 1, section: 0)) as? DashboardCollectionTableViewCell{
                    cell.collectionViewForCurrentClass.reloadItems(at: [IndexPath(row: sender.tag, section: 0)])
                }
//                self.tblViewForDashboard.reloadData()
            }
        }
    }
    
    func apiCallForCheckedOut(teacherClassLog: TeacherClassLog,sender: UIButton){
        let service = DashboarService()
        service.teacherClassCheckIn(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: teacherClassLog.id ?? 0, checkInTime: teacherClassLog.checkInTime ?? "", classAssignmentLogID: teacherClassLog.classAssignmentLogID ?? 0, classEndTime: teacherClassLog.classEndTime ?? "", classesID: teacherClassLog.classesID ?? 0, classStartTime: teacherClassLog.classStartTime ?? "", teacherDailyAttendenceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0, teacherID: teacherClassLog.teacherID ?? 0, checkStatus: CheckInStatus.CheckedOut,  checkOutTime:  (teacherClassLog.checkOutTime != "" && teacherClassLog.checkOutTime != nil) ? (teacherClassLog.checkOutTime ?? "") : CommonClassMethods.convertDateToServerReadableFormat(date: Date()), updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                print(result!)
                self.arrForTeacherlogs[sender.tag].checkStatus = CheckInStatus.CheckedOut
                self.arrForTeacherlogs[sender.tag].id = result as? Int
                self.setCurrentCheckInClass()
                if let cell = self.tblViewForDashboard.cellForRow(at: IndexPath(row: 1, section: 0)) as? DashboardCollectionTableViewCell{
                    cell.collectionViewForCurrentClass.reloadItems(at: [IndexPath(row: sender.tag, section: 0)])
                }
//                self.tblViewForDashboard.reloadData()
            }
        }
    }
    
    func apiCallForEdit(){
        
    }
    
    
}

//MARK:----- UITableView DataSource and Delegates -----
extension DashboardVC : UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return self.customDashboardHeaderTableCell(tableView:tableView, indexPath:indexPath)
        case 1:
            if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DashboardCollectionTableViewCell) as? DashboardCollectionTableViewCell {
                cell.collectionViewForCurrentClass.reloadData()
                return cell
            }
            return UITableViewCell()
            
        default:
            return self.customDashboardFooterTableViewCell(tableView:tableView, indexPath:indexPath)
        }
    }
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        switch indexPath.row {
        case 0:
            return PlatformUtils.isPad ? 160 : 110
        case 1:
            return PlatformUtils.isPad ? 370 : 320
        default:
            return UITableView.automaticDimension
        }
    }
    
    func customDashboardHeaderTableCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DashboardHeaderTableViewCell) as? DashboardHeaderTableViewCell
        {
           
            cell.lblForName.text = AppInstance.shared.teacher?.teacherName
            cell.lblForAddress.text = AppInstance.shared.teacher?.email
            cell.lblForCheckIn.text = "Clock In"
            cell.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
//            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
            cell.imgViewForProfile.sd_setImage(with: URL(string: AppInstance.shared.teacher?.imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDashboardFooterTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DashboardBottomTableViewCell) as? DashboardBottomTableViewCell {
            cell.btnForAttendance.addTarget(self, action: #selector(actionForPushToController(_:)), for: .touchUpInside)
            cell.btnForDailySheets.addTarget(self, action: #selector(actionForPushToController(_:)), for: .touchUpInside)
            cell.btnForPostActivity.addTarget(self, action: #selector(actionForPushToController(_:)), for: .touchUpInside)
            cell.btnForReportIncident.addTarget(self, action: #selector(actionForPushToController(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView DataSource and Delegates -----

//Collection view for class check in check out cards
extension DashboardVC : UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return isFirstLoad ? 0 :((self.arrForTeacherlogs.count == 0) ? 1 : self.arrForTeacherlogs.count)
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        return  (self.arrForTeacherlogs.count == 0) ? customEmptyClassCollectionViewCell(collectionView: collectionView, indexPath: indexPath) : customClassCheckInCollectionViewCell(collectionView: collectionView, indexPath: indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return  PlatformUtils.isPad ? CGSize(width:350, height: 350) : CGSize(width:280, height: 280)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        let totalCellWidth =  PlatformUtils.isPad ? 350 : 280
        let leftInset = (self.arrForTeacherlogs.count > 1) ? 20 : ((ScreenSize.screenWidth - CGFloat(totalCellWidth)) / 2)
        let rightInset = leftInset
        return UIEdgeInsets(top: 20, left: leftInset, bottom: 20, right: rightInset)
    }
    
    func customClassCheckInCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.CurrentClassCollectionViewCell, for: indexPath) as? CurrentClassCollectionViewCell {
            cell.btnForCheckedIn.tag = indexPath.item
            cell.btnForCheckeOut.tag = indexPath.item
            cell.btnForEdit.tag = indexPath.item
            let classDetail = arrForTeacherlogs[indexPath.row]
            
            let classNameLabelText =  "\(classDetail.className ?? "")\nPresent Students = \(classDetail.presentStudentCount ?? 0)"
            let presentStudents = "Present Students = \(classDetail.presentStudentCount ?? 0)"
            let stringRange = (classNameLabelText as NSString).range(of: presentStudents)
            let attributedString = NSMutableAttributedString.init(string: classNameLabelText)
            attributedString.addAttribute(NSAttributedString.Key.foregroundColor, value: colorCode.applicationColor, range: stringRange)
            cell.lblForClassName.attributedText =  attributedString
                
            if arrForTeacherlogs[indexPath.row].checkStatus != CheckInStatus.notCheckIn {
                cell.btnForEdit.isHidden = false
                cell.btnForCheckeOut.isHidden = false
                cell.btnForCheckedIn.isHidden = true
            } else {
                cell.btnForEdit.isHidden = true
                cell.btnForCheckeOut.isHidden = true
                cell.btnForCheckedIn.isHidden = false
            }
            cell.lblForStartTime.text = CommonClassMethods.timeFromDateString(date: arrForTeacherlogs[indexPath.row].classStartTime ?? "")
            cell.lblForEndTime.text = CommonClassMethods.timeFromDateString(date: arrForTeacherlogs[indexPath.row].classEndTime ?? "")
            
            cell.lblForClassStatus.text = (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.CheckedIn) ? Macros.ControllerStrings.DashboardVC.checkedIn : (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.CheckedOut) ? Macros.ControllerStrings.DashboardVC.checkedOut : Macros.ControllerStrings.DashboardVC.notCheckIn
            
            cell.lblForClassStatus.textColor = (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.CheckedIn) ? colorCode.checkInStatusColor : colorCode.checkOutColor
            
            cell.btnForEdit.addTarget(self, action: #selector(actionForEdit(sender:)), for: .touchUpInside)
            
            (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.notCheckIn) ? cell.btnForCheckedIn.addTarget(self, action: #selector(actionForCheckedIn(sender:)), for: .touchUpInside) : cell.btnForCheckedIn.removeTarget(nil, action: nil, for: .allEvents)

            (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.CheckedIn) ? cell.btnForCheckeOut.addTarget(self, action: #selector(actionForCheckedOut(sender:)), for: .touchUpInside) : cell.btnForCheckeOut.addTarget(self, action: #selector(actionForCheckedIn(sender:)), for: .touchUpInside)

            (arrForTeacherlogs[indexPath.row].checkStatus == CheckInStatus.CheckedIn) ? cell.btnForCheckeOut.setTitle(Macros.ControllerStrings.DashboardVC.checkOut, for: .normal) : cell.btnForCheckeOut.setTitle(Macros.ControllerStrings.DashboardVC.checkIn, for: .normal)
            
            return cell
        }
        return UICollectionViewCell()
    }
    
    func customEmptyClassCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let emptyCell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.EmptyClassCollectionViewCell, for: indexPath) as? EmptyClassCollectionViewCell {
            return emptyCell
        }
        return UICollectionViewCell()
    }
}

//MARK:----- ClassCheckInOutTime Popup Delegate -----
extension DashboardVC: ClassCheckInCheckOutDelegate{
    func submitButtonAction(teacherClassLog: TeacherClassLog?, sender: UIButton?) {
        if let teacherclassLog = teacherClassLog {
            if let senderr = sender {
                if teacherclassLog.checkStatus == CheckInStatus.CheckedIn {
                    self.apiCallForCheckedIn(teacherClassLog: teacherclassLog, sender: senderr)
                } else {
                    self.apiCallForCheckedOut(teacherClassLog: teacherclassLog, sender: senderr)
                }
            }
        }
    }
}


//MARK:----- Popover Delegates -----
extension DashboardVC: ClockInDelegate,CheckInDelegate {
        func openClockInPopup(){
        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.ClockInPopupVC) as! ClockInPopupVC
        popoverContent.delegate = self
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = CGSize(width:200,height:200)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func submitButtonAction(data: String) {
        self.view.isUserInteractionEnabled = true
        print(data)
    }
    
    func openCheckInPopup(sender: CustomButton){
        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.CheckInPopUpVC) as! CheckInPopUpVC
        popoverContent.delegate = self
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = CGSize(width:300,height:371)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func submitCheckInButtonAction(attendanceDate: String, attendenceStatusID: Int, guardianId: Int, isEditModeOn: Bool, studentID: Int, id: Int,time:String,selectedRow:Int) {
        self.view.isUserInteractionEnabled = true
        print("date")
    }
}

//MARK:----- Current Class Collection View Cell -----

class CurrentClassCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var lableForClass: UILabel!
    @IBOutlet weak var lblForClassStatus: UILabel!
    //@IBOutlet weak var imgView: UIImageView!
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var btnForCheckedIn: CustomButton!
    @IBOutlet weak var viewForCheckeOut: UIView!
    @IBOutlet weak var lblForStartTime: UILabel!
    @IBOutlet weak var lblForEndTime: UILabel!
    @IBOutlet weak var btnForCheckeOut: CustomButton!
    @IBOutlet weak var btnForEdit: CustomButton!
}

class EmptyClassCollectionViewCell: UICollectionViewCell {
    
}
//MARK:----- Dashboard Header Table View Cell -----
class DashboardHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForCheckIn: UILabel!
    @IBOutlet weak var lblForAddress: UILabel!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var imgViewForProfile: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 50 : 35
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
}

//MARK:----- Dashboard Bottom Table View Cell -----
class DashboardBottomTableViewCell: UITableViewCell {
    @IBOutlet weak var btnForPostActivity: UIButton!
    @IBOutlet weak var btnForReportIncident: UIButton!
    @IBOutlet weak var btnForAttendance: UIButton!
    @IBOutlet weak var btnForDailySheets: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
}
    
//MARK:----- Dashboard Collection Table View Cell -----
    class DashboardCollectionTableViewCell: UITableViewCell {
        @IBOutlet weak var collectionViewForCurrentClass: UICollectionView!
        override func awakeFromNib() {
            super.awakeFromNib()
            // Initialization code
        }
        override func setSelected(_ selected: Bool, animated: Bool) {
            super.setSelected(selected, animated: animated)
            // Configure the view for the selected state
        }
}

