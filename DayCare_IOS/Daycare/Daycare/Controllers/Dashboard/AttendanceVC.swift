//
//  AttendanceVC.swift
//  Daycare
//
//  Created by amrut waghmare on 10/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import AVFoundation
import ActionSheetPicker_3_0
import SDWebImage

class AttendanceVC: BaseViewController {

    @IBOutlet weak var tblViewForAttendanceList: UITableView!
   
    let classesDropDown     = DropDown()
    var arrforClassesName   :   [String]    = []
    var arrForClass         :   [OperationalClass]     = []
    var arrForOperationalClass : [OperationalClass]?
    var arrForAttendance    :   [Attendance] = []
    var selectedClass       :   OperationalClass?
    var selectedAttendance  :   Attendance?
    var selectedDate        :   Date?
    var arrForLeaveReasons  :   [LeaveReason]   =   []
    var arrForTransferClass : [Class]?
    var isFirstLoad:Bool = true
    //MARK:-----View Functions-----
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationTitle.Attendance)
//         self.tblViewForAttendanceList.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        apiForGetAbsentReason()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.apiForGetAllClasses()
    }
    
    
    //MARK:----- @IBActions -----
    
    @IBAction func actionForCamera(_ sender: UIButton) {

    }

    @objc func showClassesDropdown(sender: UIButton){
        if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()){
            if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
                self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
            } else {
                sender.setImage(UIImage(named: "arrowUp"), for: .normal)
                classesDropDown.show()
            }
        } else {
            sender.setImage(UIImage(named: "arrowUp"), for: .normal)
            classesDropDown.show()
        }
    }
    
    @objc func actionForCheckedIn(sender: CustomButton){
        self.selectedAttendance = arrForAttendance[sender.tag]
        apiForGetGuardianList(sender: sender)
    }
    
    @objc func actionForAbsent(sender: CustomButton){
        self.openAbsentPopup(sender: sender)
    }
    
    @objc func actionForTransferStudent(sender: CustomButton) {
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.TransferStudentPopupVC) as? TransferStudentPopupVC
        vc?.show(target: self,attendance: self.arrForAttendance[sender.tag], selectedDate:  selectedDate,arrClass: self.arrForTransferClass,width: PlatformUtils.isPad ? 500 : 300, height: PlatformUtils.isPad ? 500 : 320, index: sender.tag, { (result) in
            self.apiCallForTransferStudent(studentId: self.arrForAttendance[sender.tag].studentID ?? 0, fromClassID: self.selectedClass?.value ?? 0, toClassID: result)
            print(result)
        })
    }
    
    @objc func actionForEdit(sender: CustomButton){
        self.selectedAttendance = arrForAttendance[sender.tag]
        if CommonClassMethods.convertDateWithoutTime(date: selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
            (arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isCheckedAbsent)  ? self.openAbsentPopup(sender: sender) :  apiForGetGuardianList(sender: sender)
//            if arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isCheckedAbsent {
//                self.openAbsentPopup(sender: sender)
//            } else {
//                apiForGetGuardianList(sender: sender)
//            }
        } else if arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isCheckedAbsent || arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isToBeChecked {
                 self.openAbsentPopup(sender: sender)
        } else {
            apiForGetGuardianList(sender: sender)
        }
    }
    
    @objc func openDatePicker(sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: self.selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let tagDayLabel   = self.view.viewWithTag(1003) as! UILabel
            let tagMonthYearLabel   = self.view.viewWithTag(1002) as! UILabel
            let tagDateLabel   = self.view.viewWithTag(1001) as! UILabel
            tagDayLabel.text = CommonClassMethods.dayNameFromDate(date: dateTime)
            tagMonthYearLabel.text = CommonClassMethods.monthNameFromDate(date:dateTime) + " " + CommonClassMethods.yearFromDate(date: dateTime)
            tagDateLabel.text = CommonClassMethods.dateFromDate(date: dateTime)
            if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: dateTime){
                self.selectedDate = dateTime
                if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
                    if (self.arrForOperationalClass?.count ?? 0) > 0 {
                        self.selectedClass = self.arrForOperationalClass?[0]
                    } else {
                        self.selectedClass = nil
                    }
                } else {
                    if self.selectedClass == nil || self.selectedClass?.label == "" ||
                        self.selectedClass?.label == nil {
                      if self.arrForOperationalClass?.count ?? 0 > 0 {
                          self.selectedClass = self.arrForOperationalClass?[0]
                        }
                    }
                }
              // shiwani
//                self.apiForGetClassAttendance()
              self.apiCallGetTeacherCurrentOperationalClass()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    //MARK:----- Functions -----
    
    //Navigate to Breaks View Controller
    func navigateToBreakViewController(attendance: Attendance){
        if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.BreaksVC) as? BreaksVC {
            vc.attendance = attendance
            vc.isPreviousDate = CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: Date())
            vc.selectedDate = self.selectedDate
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    //Dropdown list
    func setupClassesDropDown(sender:UIButton) {
        self.arrforClassesName = []
        var arrForClassDropDown:[OperationalClass] = []
        if CommonClassMethods.convertDateWithoutTime(date: selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
            self.arrforClassesName = arrForOperationalClass?.map{$0.label ?? ""} ?? []
            arrForClassDropDown = arrForOperationalClass ?? []
        } else {
            self.arrforClassesName = arrForOperationalClass?.map{$0.label ?? ""} ?? []
          arrForClassDropDown = arrForOperationalClass ?? []
        }
        classesDropDown.anchorView = sender
        classesDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        classesDropDown.dataSource = arrforClassesName
        classesDropDown.selectionAction = { [weak self] (index, item) in
            sender.setTitle(self?.classesDropDown.dataSource[index], for: .normal)
            if self?.selectedClass?.label != arrForClassDropDown[index].label {
                self?.selectedClass = arrForClassDropDown[index]
                self?.apiForGetClassAttendance()
                self?.apiCallForGetTransferClass()
            }
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
        }
        classesDropDown.cancelAction = { [unowned self] in
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
        }
    }
    
    func checkOutAlertConfirmation(studentId: Int, classId: Int, askedDate:String){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.checkOutConfirmation , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForSendDailySheetToParent(studentId:studentId, classId: classId, askedDate: askedDate)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }

    
    //MARK:----- API Calling Functions -----
    
    func apiForGetAllClasses() {
        let service = AttendanceService()
        service.getAllClasses(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if let arrForClasses = result as? [OperationalClass]{
                self.arrForClass = arrForClasses
                if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
                    self.isFirstLoad = false
                    self.tblViewForAttendanceList.reloadData()
                    if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
                        self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
                    }
                } else {
                    self.apiCallGetTeacherCurrentOperationalClass()
                }
            }
        }
    }
    
    func apiCallGetTeacherCurrentOperationalClass(){
        let service = DashboarService()
      // shiwwani
//        service.getTeacherCurrentOperationalClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), teacherID: AppInstance.shared.teacher?.id ?? 0, teacherDailyAttendanceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0) { (result) in
      service.getTeacherCurrentOperationalClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: selectedDate ?? Date()), teacherID: AppInstance.shared.teacher?.id ?? 0, teacherDailyAttendanceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0) { (result) in
            if result != nil {
                self.arrForOperationalClass = []
                let operationalClassArray:[OperationalClass] = result as? [OperationalClass] ?? []
              self.arrForOperationalClass = operationalClassArray
//                let arrClassesId = operationalClassArray.map{$0.value}
//                self.arrForOperationalClass = self.arrForClass.filter{arrClassesId.contains($0.classesID)}
                
//                for classes in self.arrForClass {
//                    for operationalClass in operationalClassArray {
//                        if classes.classesID == operationalClass.value {
//                            self.arrForOperationalClass?.append(classes)
//                        }
//                    }
//                }
                
                // shiwani, as per discussion wioth abhishek
              self.selectedClass = nil
              if self.arrForOperationalClass?.count ?? 0 > 0
              {
                self.selectedClass = self.arrForOperationalClass?[0]
                self.apiCallForGetTransferClass()
              }
             
              self.apiForGetClassAttendance()
                // shiwani, commented
             /*   if self.selectedClass == nil {
                    if (self.arrForOperationalClass?.count ?? 0) > 0 {
                        self.selectedClass = self.arrForOperationalClass?[0]
                        self.apiCallForGetTransferClass()
                    }
                }
                self.apiForGetClassAttendance()*/
            }
        }
    }
    
    func apiForGetClassAttendance(){
        let service = AttendanceService()
        service.getClassAttendance(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classID: String(selectedClass?.value ?? 0),askedDate:  CommonClassMethods.convertDateToServerReadableFormatGET(date: selectedDate ?? Date())) { (result) in
            self.isFirstLoad = false
            self.arrForAttendance = result as? [Attendance] ?? []
            self.tblViewForAttendanceList.reloadData()
        }
    }
    
    func apiForGetGuardianList(sender: CustomButton){
        let service = AttendanceService()
        service.getGuardiansList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classID: String(selectedClass?.value ?? 0), studentId: String(selectedAttendance?.studentID ?? 0), studentName: selectedAttendance?.studentName ?? "", isAuthorized: true) { (result) in
           let arrForGuardians = result as? [Guardian] ?? []
            self.openCheckInPopup(sender: sender, arrForGuardians: arrForGuardians)
        }
    }
    
    func apiForLeaveReasonList(sender: CustomButton){
        let service = AttendanceService()
        service.GetAllLeaveReasonType(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.arrForLeaveReasons = result as? [LeaveReason] ?? []
        }
    }
    func apiForCheckInAttendanceStudent(agencyID:Int,attendanceDate:String,attendenceStatusID:Int,className:String,classesID:Int,dropedById:Int,isEditModeOn:Bool,studentID:Int,id:Int,checkInTime:String,selectedRow:Int){
        let service = AttendanceService()
        DispatchQueue.global(qos: .background).async {
            service.checkInAttendanceStudent(with: nil, agencyID: agencyID, attendanceDate: attendanceDate, attendanceStatusId: attendenceStatusID, className: className, classesID: classesID, dropedById: dropedById, isEditModeOn: isEditModeOn, studentId: studentID, id:id,checkInTime:checkInTime,updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
                self.arrForAttendance[selectedRow].dropedById = dropedById
                self.arrForAttendance[selectedRow].isEditModeOn = isEditModeOn
                self.arrForAttendance[selectedRow].attendanceDate = attendanceDate
                self.arrForAttendance[selectedRow].className = self.selectedClass?.label ?? ""
                self.arrForAttendance[selectedRow].classesID = self.selectedClass?.value ?? 0
                self.arrForAttendance[selectedRow].checkInTime = checkInTime
                self.arrForAttendance[selectedRow].id   =   result as? Int ?? 0
                print(result as Any)
            }
        }
    }
    
    func apiForCheckOutAttendanceStudent(agencyID:Int,attendanceDate:String,attendenceStatusID:Int,className:String,classesID:Int,pickupById:Int,isEditModeOn:Bool,studentID:Int,id:Int,checkOutTime:String,selectedRow:Int){
        let service = AttendanceService()
         DispatchQueue.global(qos: .background).async {
            service.checkOutAttendanceStudent(with: nil, agencyID: agencyID, attendanceDate: attendanceDate, attendanceStatusId: attendenceStatusID, className: className, classesID: classesID,pickupById: pickupById, isEditModeOn: isEditModeOn, studentId: studentID, id: id, checkOutTime: checkOutTime,updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
                self.arrForAttendance[selectedRow].pickupById = pickupById
                self.arrForAttendance[selectedRow].isEditModeOn = isEditModeOn
                self.arrForAttendance[selectedRow].attendanceDate = attendanceDate
                self.arrForAttendance[selectedRow].className = self.selectedClass?.label ?? ""
                self.arrForAttendance[selectedRow].classesID = self.selectedClass?.value ?? 0
                self.arrForAttendance[selectedRow].checkOutTime = checkOutTime
                self.arrForAttendance[selectedRow].id   =   result as? Int ?? 0
                self.checkOutAlertConfirmation(studentId: studentID, classId: classesID, askedDate: attendanceDate)
                print(result as Any)
            }
        }
    }
    
    func apiForGetAbsentReason(){
        let service = AttendanceService()
        service.GetAllLeaveReasonType(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.arrForLeaveReasons = result as? [LeaveReason] ?? []
        }
    }
    
    func apiForAbsentAttendanceStudent( agencyID:Int,attendanceDate:String,attendanceStatusId:Int,className:String,classesID:Int,onLeave:Bool,studentId:Int,id:Int,onLeaveComment:String,reasonId:String,selectedRow:Int){
        let service = AttendanceService()
        DispatchQueue.global(qos: .background).async {
            service.absentAttendanceStudent(with: nil, agencyID: agencyID, attendanceDate: attendanceDate, attendanceStatusId: attendanceStatusId, className: className, classesID: classesID, onLeave: onLeave, studentId: studentId, id: id, onLeaveComment: onLeaveComment, reasonId: reasonId,updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
                self.arrForAttendance[selectedRow].onLeave = onLeave
                self.arrForAttendance[selectedRow].onLeaveComment = onLeaveComment
                self.arrForAttendance[selectedRow].reasonId = Int(reasonId)
                self.arrForAttendance[selectedRow].id   =   result as? Int ?? 0
                print(result as Any)
            }
        }
    }
    
    func apiCallForSendDailySheetToParent(studentId: Int, classId: Int, askedDate:String){
        let service = AttendanceService()
        service.GetDailySheetActivityReportByEmail(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: studentId, classId: classId, askedDate: askedDate, parentID: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            print(result)
        }
    }
    
    func apiCallForGetTransferClass() {
        let service = AttendanceService()
        service.getAllClassesForTransferStudents(with: self, classID: selectedClass?.value ?? 0, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
        self.arrForTransferClass = result as? [Class] ?? []
        }
    }
    
    func apiCallForTransferStudent(studentId: Int, fromClassID: Int, toClassID: Int){
        let service = AttendanceService()
        service.transferStudentToOtherClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: studentId, fromClassId: fromClassID, toClassId: toClassID, teacherId: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                self.apiForGetClassAttendance()
            }
        }
    }
}

//MARK:----- UITableView DataSource and Delegates -----
extension AttendanceVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : (arrForAttendance.count > 0) ? arrForAttendance.count : 1
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customDateToddlerHeaderCell(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if self.arrForAttendance.count > 0 {
            return customAttendanceListTableViewCell(tableView:tableView,indexPath:indexPath)
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForAttendanceList)
        }
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return PlatformUtils.isPad ? 90.0 : 70.0
        
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if (self.arrForAttendance[indexPath.row].attendenceStatusID != AttendanceStatus.isToBeChecked && self.arrForAttendance[indexPath.row].attendenceStatusID != AttendanceStatus.isCheckedAbsent) {
            self.navigateToBreakViewController(attendance: self.arrForAttendance[indexPath.row])
        }
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //TableView Header Cell
    func customDateToddlerHeaderCell(tableView:UITableView) -> UIView{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateToddlerHeaderCell, bundle: nil)
        self.tblViewForAttendanceList.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateToddlerHeaderCell)
        if let cell = self.tblViewForAttendanceList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateToddlerHeaderCell) as? DateToddlerHeaderCell {
            self.setupClassesDropDown(sender: cell.btnForToddler)
            if arrforClassesName.count > 0 {
                if self.selectedClass != nil {
                    cell.btnForToddler.setTitle(selectedClass?.label, for: .normal)
                }
            }
            cell.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
            cell.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
            cell.lblForDay.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
            cell.btnForToddler.addTarget(self, action: #selector(showClassesDropdown), for: .touchUpInside)
            cell.btnForCalender.addTarget(self, action: #selector(openDatePicker), for: .touchUpInside)
            return cell
        }
        return UIView()
    }
    
    //Attendance List Cell
    func customAttendanceListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AttendanceListTableViewCell) as? AttendanceListTableViewCell {
            cell.btnForCheckout.isHidden = arrForAttendance[indexPath.row].breakStatusId == BreakStatus.onBreak
            
            cell.selectionStyle = .none
            cell.lblForName.text = arrForAttendance[indexPath.row].studentName
            cell.btnForCheckout.tag = indexPath.row
            cell.btnForEdit.tag = indexPath.row
            cell.btnForAbsent.tag   =   indexPath.row
            cell.btnForTransfer.tag = indexPath.row
            cell.btnForCheckout.addTarget(self, action: #selector(actionForCheckedIn), for: .touchUpInside)
            cell.btnForEdit.addTarget(self, action: #selector(actionForEdit(sender:)), for: .touchUpInside)
            cell.imageViewForChild.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imageViewForChild.sd_setShowActivityIndicatorView(true)
//            cell.imageViewForChild.sd_setIndicatorStyle(.gray)
            cell.imageViewForChild.sd_setImage(with: URL(string: arrForAttendance[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if (error != nil) {
                    cell.imageViewForChild.image = UIImage(named: "placeholder")
                }
            }
          let date = self.selectedDate?.toLocalTime() ?? Date()
          cell.btnForAbsent.backgroundColor = .lightGray
          if CommonClassMethods.convertDateWithoutTime(date: date) != CommonClassMethods.convertDateWithoutTime(date: Date()) {
//                cell.btnForTransfer.isHidden = true
                cell.btnForEdit.isHidden = false
//            cell.btnForTransfer.setImage(UIImage.init(named: "TransferDisable"), for: .normal)
            cell.btnForTransfer.backgroundColor = colorCode.disableColor
            cell.btnForTransfer.removeTarget(nil, action: nil, for: .allEvents)
            } else {
//                cell.btnForTransfer.isHidden = !(arrForAttendance[indexPath.row].attendenceStatusID == AttendanceStatus.isToBeChecked)
              cell.btnForTransfer.backgroundColor = .lightGray
                cell.btnForEdit.isHidden = (arrForAttendance[indexPath.row].attendenceStatusID == AttendanceStatus.isToBeChecked)
                cell.btnForTransfer.addTarget(self, action: #selector(actionForTransferStudent(sender:)), for: .touchUpInside)
            }
                switch arrForAttendance[indexPath.row].attendenceStatusID {
                case AttendanceStatus.isToBeChecked:
                    cell.btnForCheckout.backgroundColor = colorCode.checkInColor
                    cell.btnForCheckout.setTitle("Check In", for: .normal)
                    cell.btnForCheckout.isEnabled = true
                    cell.btnForEdit.isEnabled = false
                  cell.btnForAbsent.backgroundColor = .lightGray
//                    cell.btnForTransfer.isHidden = false
                    cell.btnForAbsent.addTarget(self, action: #selector(actionForAbsent(sender:)), for: .touchUpInside)
                case AttendanceStatus.isCheckedIn:
                    cell.btnForCheckout.backgroundColor = colorCode.checkOutColor
                    cell.btnForCheckout.isEnabled = true
                    cell.btnForCheckout.setTitle("Check Out", for: .normal)
                    cell.btnForEdit.isEnabled = true
                    cell.btnForAbsent.backgroundColor = colorCode.disableColor
                    cell.btnForAbsent.removeTarget(nil, action: nil, for: .allEvents)
//                    cell.btnForTransfer.isHidden = false

                case AttendanceStatus.isCheckedOut:
                    cell.btnForCheckout.backgroundColor = colorCode.disableColor
                    cell.btnForCheckout.setTitle("Check Out", for: .normal)
                    cell.btnForCheckout.isEnabled = false
                    cell.btnForEdit.isEnabled = true
                    cell.btnForAbsent.backgroundColor = colorCode.disableColor
                    cell.btnForAbsent.removeTarget(nil, action: nil, for: .allEvents)
                case AttendanceStatus.isCheckedAbsent:
                    cell.btnForCheckout.backgroundColor = colorCode.disableColor
                    cell.btnForCheckout.isEnabled = false
                    cell.btnForAbsent.backgroundColor = colorCode.checkOutColor
                    cell.btnForEdit.isEnabled = true
                    cell.btnForAbsent.removeTarget(nil, action: nil, for: .allEvents)
                default:
                    print("Invalid Status")
                }
//            }
            return cell
        }
        return UITableViewCell()
    }
}


//MARK:----- Check In and Absent Popover Delegatge -----
extension AttendanceVC : CheckInDelegate,AbsentDelegate {
   
    //Check In Popup Function
    func openCheckInPopup(sender: CustomButton, arrForGuardians: [Guardian]){
        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.CheckInPopUpVC) as! CheckInPopUpVC
        popoverContent.delegate = self
        popoverContent.arrForGuardians = arrForGuardians
        popoverContent.attendance = self.arrForAttendance[sender.tag]
        popoverContent.selectedDate = self.selectedDate
        popoverContent.selectedRow = sender.tag
        (sender.title(for: .normal) == nil) ? (popoverContent.isEditButtonClicked = true) : (popoverContent.isEditButtonClicked = false)
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        if self.arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isToBeChecked {
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:500,height:280) : CGSize(width:300,height:260)
        }else if self.arrForAttendance[sender.tag].attendenceStatusID == AttendanceStatus.isCheckedIn {
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:500,height:280) : CGSize(width:300,height:260)
        } else {
            popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:500,height:400) : CGSize(width:300,height:371)
        }
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //CheckIn popup delegate function
    func submitCheckInButtonAction(attendanceDate:String,attendenceStatusID:Int,guardianId:Int,isEditModeOn:Bool,studentID:Int,id:Int,time:String,selectedRow:Int){
        if attendenceStatusID != 0 {
            if attendenceStatusID == AttendanceStatus.isCheckedIn {
                self.apiForCheckInAttendanceStudent(agencyID: AppInstance.shared.user?.agencyID ?? 0, attendanceDate: attendanceDate, attendenceStatusID: attendenceStatusID, className: self.selectedClass?.label ?? "", classesID: self.selectedClass?.value ?? 0,  dropedById: guardianId, isEditModeOn: isEditModeOn, studentID: studentID, id: id,checkInTime:time, selectedRow: selectedRow)
                self.arrForAttendance[selectedRow].attendenceStatusID = attendenceStatusID
                let indexPath = IndexPath(item: selectedRow, section: 0)
                self.tblViewForAttendanceList.reloadRows(at: [indexPath], with: .automatic)
            } else {
                self.apiForCheckOutAttendanceStudent(agencyID:AppInstance.shared.user?.agencyID ?? 0,attendanceDate:attendanceDate,attendenceStatusID:attendenceStatusID,className:self.selectedClass?.label ?? "",classesID:self.selectedClass?.value ?? 0,pickupById:guardianId,isEditModeOn:true,studentID:studentID,id:id,checkOutTime:time, selectedRow: selectedRow)
                self.arrForAttendance[selectedRow].attendenceStatusID = attendenceStatusID
                let indexPath = IndexPath(item: selectedRow, section: 0)
                self.tblViewForAttendanceList.reloadRows(at: [indexPath], with: .none)
            }
        }
        self.view.isUserInteractionEnabled = true
    }
    
    //Absent Popup Function
    func openAbsentPopup(sender: CustomButton){
        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.AbsentPopupVC) as! AbsentPopupVC
        popoverContent.delegate = self
        popoverContent.attendance = self.arrForAttendance[sender.tag]
        popoverContent.selectedDate = self.selectedDate
        popoverContent.arrForReason = self.arrForLeaveReasons
        popoverContent.selectedRow = sender.tag
        (sender.title(for: .normal) == nil) ? (popoverContent.isEditButtonClicked = true) : (popoverContent.isEditButtonClicked = false)
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:500,height:430) : CGSize(width:300,height:400)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //Absent popup delegate function
    func submitAbsentButtonAction(attendanceDate:String,selectedRow:Int,id:Int,attendenceStatusID:Int,onLeave: Bool,onLeaveComment:String,reasonId:String,studentID:Int) {
        self.view.isUserInteractionEnabled = true
        if attendenceStatusID != 0 {
            self.apiForAbsentAttendanceStudent(agencyID: AppInstance.shared.user?.agencyID ?? 0, attendanceDate: attendanceDate, attendanceStatusId: attendenceStatusID, className: self.selectedClass?.label ?? "", classesID: self.selectedClass?.value ?? 0, onLeave: onLeave, studentId: studentID, id: id, onLeaveComment: onLeaveComment, reasonId: reasonId, selectedRow: selectedRow)
            self.arrForAttendance[selectedRow].attendenceStatusID = attendenceStatusID
            let indexPath = IndexPath(item: selectedRow, section: 0)
            self.tblViewForAttendanceList.reloadRows(at: [indexPath], with: .none)
        }
    }
}


//MARK:----- AttendanceList TableView Cell -----
class AttendanceListTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForBreak: UILabel!
    @IBOutlet weak var btnForSelect: UIButton!
    @IBOutlet weak var imageViewForChild: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var btnForCheckout: CustomButton!
    @IBOutlet weak var btnForEdit: CustomButton!
    @IBOutlet weak var btnForTransfer: CustomButton!
    @IBOutlet weak var btnForAbsent: CustomButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        imageViewForChild.cornerRadius = PlatformUtils.isPad ? 30 : imageViewForChild.bounds.width / 2
        // Initialization code
    }
}
