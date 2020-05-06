//
//  BreakInOutVC.swift
//  Daycare
//
//  Created by amrut waghmare on 13/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import SDWebImage

//MARK:----- Student Delegate Protocol -----
protocol StudentBreakDelegate : class {
    func submitBreakButtonAction(studentBreak:StudentBreak, selectedRow:Int?)
}


class StudentBreakInOutVC: BaseViewController {
    
    //MARK:----- @IBOutelets -----
    @IBOutlet weak var tblViewForBreakOot: UITableView!

    //MARK:----- Variables ------
    let pickupParentDropDown     = DropDown()
    let dropbyParentDropDown     = DropDown()
    var selectedGuardian    :   Guardian?
    var attendance : Attendance?
    var studentBreakLog: StudentBreak?
    let studentBreak = StudentBreak()
    var delegate : StudentBreakDelegate?
    var selectedIndex : Int?
    var selectedDate : Date?
    var selectedTime : Date?
    var isPickUp : Bool?
    var isEdited : Bool?
    var arrForGuardians     :   [Guardian]?
    var arrForParentNames   :   [String] = []

    
    //MARK:----- View Functions -----
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        setupStudetData()
        // Do any additional setup after loading the view.
    }

    //MARK:----- @IBActions -----
    @objc func actionForTimeSelection(_ sender: UIButton) {
        self.resignTextFieldResponder()
        var selectedDate:Date?
        if (self.isEdited ?? false) {
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (sender.tag == 0) ? (studentBreak.breakOutTime ?? "") : (studentBreak.breakInTime ?? ""))
        } else {
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.isPickUp ?? false) ? (studentBreak.breakOutTime ?? "") : (studentBreak.breakInTime ?? ""))
        }
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.selectedTime = dateTime
            if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DateTimeSelectionTableViewCell {
                cell.txtFieldForleft.text = CommonClassMethods.timeFromDate(date: dateTime)
            }
            if (self.isEdited ?? false)  {
                sender.tag == 0 ? (self.studentBreak.breakOutTime = CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedTime ?? Date())) : (self.studentBreak.breakInTime = CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedTime ?? Date()))
            } else {
            (self.isPickUp ?? false) ? (self.studentBreak.breakOutTime = CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedTime ?? Date())) : (self.studentBreak.breakInTime = CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedTime ?? Date()))
            }
            
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @IBAction func actionForPickupParentDropdown(_ sender: UIButton) {
        resignTextFieldResponder()
        pickupParentDropDown.show()
        if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
            cell.imgViewForArrow.image = UIImage(named: "arrowUp")
        }
    }
    
    @IBAction func actionForDropbyParentDropdown(_ sender: UIButton) {
        resignTextFieldResponder()
        dropbyParentDropDown.show()
        if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
            cell.imgViewForArrow.image = UIImage(named: "arrowUp")
        }
    }
    
    @IBAction func actionForCancel(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForSave(_ sender: UIButton) {
        if isValidate() {
            apiCallForStudentBreak(studentBreak: self.studentBreak)
        }
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Breaks)
        self.arrForParentNames = arrForGuardians?.map{$0.guardianName ?? ""} ?? []
//        for guardian in arrForGuardians ?? [] {
//            self.arrForParentNames.append(guardian.guardianName ?? "")
//        }
    }
    
    //Dropdown list
    func setupPickupParentsDropdown(sender:UIButton){
        pickupParentDropDown.anchorView = sender
        pickupParentDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        pickupParentDropDown.dataSource = arrForParentNames
        pickupParentDropDown.selectionAction = { [weak self] (index, item) in
            self?.selectedGuardian = self?.arrForGuardians?[index]
            if let cell = self?.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = item
                cell.imgViewForArrow.image = UIImage(named: "arrowDown")
                self?.studentBreak.pickupById = self?.arrForGuardians?[index].guardianId ?? 0
            }
        }
        self.pickupParentDropDown.cancelAction = { [unowned self] in
            if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.imgViewForArrow.image = UIImage(named: "arrowDown")
            }
        }
    }
    
    
    func setupDropbyParentsDropdown(sender:UIButton){
        dropbyParentDropDown.anchorView = sender
        dropbyParentDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        dropbyParentDropDown.dataSource = arrForParentNames
        dropbyParentDropDown.selectionAction = { [weak self] (index, item) in
            self?.selectedGuardian = self?.arrForGuardians?[index]
            if let cell = self?.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = item
                cell.imgViewForArrow.image = UIImage(named: "arrowDown")
                self?.studentBreak.dropedById = self?.arrForGuardians?[index].guardianId ?? 0
            }
        }
        self.dropbyParentDropDown.cancelAction = { [unowned self] in
            if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.imgViewForArrow.image = UIImage(named: "arrowDown")
            }
        }
    }
    
    func setupStudetData(){
        studentBreak.id = studentBreakLog?.id ?? 0
        studentBreak.agencyID = AppInstance.shared.user?.agencyID ?? 0
        studentBreak.studentID = attendance?.studentID ?? 0
        studentBreak.classAttendenceID = attendance?.id ?? 0
        studentBreak.attendanceDate = CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedDate ?? Date())
        studentBreak.attendenceStatusID = studentBreakLog?.attendenceStatusID ?? 0
        if isPickUp ?? false {
            studentBreak.breakOutTime = studentBreakLog?.breakOutTime ?? ""
        } else {
            studentBreak.breakOutTime = studentBreakLog?.breakOutTime ?? ""
            if let date = CommonClassMethods.dateObjectFromDateString(date: self.studentBreakLog?.breakInTime ?? "") {
                if date > (CommonClassMethods.dateObjectFromDateString(date: "2000-01-01T00:00:00") ?? Date()) {
                    studentBreak.breakInTime = studentBreakLog?.breakInTime ?? ""
                }else {
                    studentBreak.breakInTime = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                }
            } else {
                 studentBreak.breakInTime = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
            }
        }
        studentBreak.dropedById = studentBreakLog?.dropedById ?? 0
        studentBreak.dropedByOtherId = studentBreakLog?.dropedByOtherId ?? 0
        studentBreak.pickupById = studentBreakLog?.pickupById ?? 0
        studentBreak.pickupByOtherId = studentBreakLog?.pickupByOtherId ?? 0
        studentBreak.approvedDropedById = studentBreakLog?.approvedDropedById ?? 0
        studentBreak.approvedPickupById = studentBreakLog?.approvedPickupById ?? 0
        studentBreak.dropedByOtherNames = studentBreakLog?.dropedByOtherNames ?? ""
        studentBreak.pickupByOtherName = studentBreakLog?.pickupByOtherName ?? ""
        studentBreak.breakReason = studentBreakLog?.breakReason ?? ""
        studentBreak.breakStatusId = (self.isPickUp ?? false) ? StudentBreakStatus.BreakOut : StudentBreakStatus.BreakIn
    }
    
    func isValidate() -> Bool{
        var isValidate = true
        if (self.isEdited ?? false) {
            if (self.studentBreak.breakOutTime == nil || self.studentBreak.breakOutTime == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.pickedUpTime)
            } else if (self.studentBreak.pickupById == nil || self.studentBreak.pickupById == 0) {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.pickedUpBy)
            } else if (self.studentBreak.breakReason == nil || self.studentBreak.breakReason == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.reason)
            } else if (self.studentBreak.breakInTime == nil || self.studentBreak.breakInTime == "") {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.dropOffTime)
            } else if (self.studentBreak.dropedById == nil || self.studentBreak.dropedById == 0) {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.dropOffBy)
            }
        } else {
            if (isPickUp ?? false) {
                if (self.studentBreak.breakOutTime == nil || self.studentBreak.breakOutTime == ""){
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.pickedUpTime)
                } else if (self.studentBreak.pickupById == nil || self.studentBreak.pickupById == 0) {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.pickedUpBy)
                } else if (self.studentBreak.breakReason == nil || self.studentBreak.breakReason == "") {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.reason)
                }
            } else {
                if (self.studentBreak.breakInTime == nil || self.studentBreak.breakInTime == "") {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.dropOffTime)
                } else if (self.studentBreak.dropedById == nil || self.studentBreak.dropedById == 0) {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.dropOffBy)
                } else if (self.studentBreak.breakReason == nil || self.studentBreak.breakReason == "") {
                    isValidate = false
                    self.showAlert(with: Macros.alertMessages.reason)
                }
            }
        }
        return isValidate
    }
    
    func resignTextFieldResponder(){
        let view = self.view.subviews[0] as? UITableView
        for subview in view?.subviews ?? [] where subview is TextViewTableViewCell {
            let cell = subview as? TextViewTableViewCell
            cell?.txtViewForField.resignFirstResponder()
        }
    }
    
    //MARK:----- API calling Function -----
    func apiCallForStudentBreak(studentBreak: StudentBreak){
        let service = AttendanceService()
        (self.isEdited ?? false) ? (self.studentBreak.updatedBy = AppInstance.shared.user?.loginUserID) : (self.studentBreak.createdBy = AppInstance.shared.user?.loginUserID)
        service.studentBreakAPI(with: self, param: studentBreak.dictionaryRepresentation()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.studentBreak.id = response["saveId"] as? Int
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: response["message"] as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        self.delegate?.submitBreakButtonAction(studentBreak: self.studentBreak, selectedRow: self.selectedIndex)
                        self.navigationController?.popViewController(animated: true)
                    default:
                        break
                    }
                })
            }
        }
    }
}

//MARK:----- UITableView Delegate and Datasource ------
extension StudentBreakInOutVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (self.isEdited ?? false) ? 6 : 4
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if (isEdited ?? false) {
            switch indexPath.row {
            case 0,2 :
                return customSelectDateTimeTableViewCell(tableView: tableView, indexPath: indexPath)
            case 1,3 :
                return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
            case 4 :
                return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
            case 5 :
                return customSubmitButtonTableViewCell(tableView: tableView)
            default :
                print("Invalid case")
            }
        } else {
            if (self.isPickUp ?? false) {
                switch indexPath.row {
                case 0 :
                    return customSelectDateTimeTableViewCell(tableView: tableView, indexPath: indexPath)
                case 1 :
                    return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
                case 2 :
                    return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
                case 3 :
                    return customSubmitButtonTableViewCell(tableView: tableView)
                default :
                    print("Invalid case")
                }
            } else {
                switch indexPath.row {
                case 0 :
                    return customSelectDateTimeTableViewCell(tableView: tableView, indexPath: indexPath)
                case 1 :
                    return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
                case 2 :
                    return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
                case 3 :
                    return customSubmitButtonTableViewCell(tableView: tableView)
                default :
                    print("Invalid case")
                }
            }
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customHeaderViewCell(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 93
    }
    
    //MARK:----- Custom UITableView functions -----
    func customHeaderViewCell(tableView: UITableView) -> UIView {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.BreakInOutHeaderTableViewCell) as? BreakInOutHeaderTableViewCell {
            cell.lblForName.text = attendance?.studentName
            cell.lblForDate.text = CommonClassMethods.dateFromFormat(date: selectedDate ?? Date())
             cell.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray
//            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
//            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
            cell.imgViewForProfile.sd_setImage(with: URL(string:attendance?.imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
                }
            }
            return cell.contentView
        }
        return UIView()
    }
    
    func customDropDownTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForBreakOot.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForBreakOot.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.btnForField.tag =  indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.ViewForSelectedItems.isHidden = true
            cell.lblForSelectedItems.isHidden = true
            cell.txtFieldForField.isEnabled = false
            cell.txtFieldForField.resignFirstResponder()
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 1:
                if self.isEdited ?? false {
                    cell.lblForFieldTitle.text = Macros.ControllerStrings.StudentBreakInOutVC.pickedUp
                    for guardian in arrForGuardians ?? [] {
                        if self.studentBreak.pickupById == guardian.guardianId {
                            cell.txtFieldForField.text = guardian.guardianName
                        }
                    }
                    self.setupPickupParentsDropdown(sender: cell.btnForField)
                    cell.btnForField.addTarget(self, action: #selector(actionForPickupParentDropdown(_:)), for: .touchUpInside)
                } else {
                    if self.isPickUp ?? false {
                        cell.lblForFieldTitle.text = Macros.ControllerStrings.StudentBreakInOutVC.pickedUp
                        for guardian in arrForGuardians ?? [] {
                            if self.studentBreak.pickupById == guardian.guardianId {
                                cell.txtFieldForField.text = guardian.guardianName
                            }
                        }
                        self.setupPickupParentsDropdown(sender: cell.btnForField)
                        cell.btnForField.addTarget(self, action: #selector(actionForPickupParentDropdown(_:)), for: .touchUpInside)
                    } else {
                        cell.lblForFieldTitle.text = Macros.ControllerStrings.StudentBreakInOutVC.dropoff
                        for guardian in arrForGuardians ?? [] {
                            if self.studentBreak.dropedById == guardian.guardianId {
                                cell.txtFieldForField.text = guardian.guardianName
                            }
                        }
                        self.setupDropbyParentsDropdown(sender: cell.btnForField)
                        cell.btnForField.addTarget(self, action: #selector(actionForDropbyParentDropdown(_:)), for: .touchUpInside)
                    }
                }
            case 3:
                cell.lblForFieldTitle.text = Macros.ControllerStrings.StudentBreakInOutVC.dropoff
                for guardian in arrForGuardians ?? [] {
                    if self.studentBreak.dropedById == guardian.guardianId {
                        cell.txtFieldForField.text = guardian.guardianName
                    }
                }
                self.setupDropbyParentsDropdown(sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(actionForDropbyParentDropdown(_:)), for: .touchUpInside)
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDescriptionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForBreakOot.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForBreakOot.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            cell.txtViewForField.tag = indexPath.row
            cell.lblForFieldTitle.text = Macros.ControllerStrings.StudentBreakInOutVC.reason
            cell.txtViewForField.text = self.studentBreak.breakReason
            return cell
        }
        return UITableViewCell()
    }
    
    //Student Break In/Out DateTime TableView Cell
    func customSelectDateTimeTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForBreakOot.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = self.tblViewForBreakOot.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.backgroundColor = .clear
            cell.selectionStyle = .none
            cell.txtFieldForleft.isEnabled = false
            cell.btnForLeft.tag = indexPath.row
            cell.txtFieldForleft.tag = indexPath.row
            cell.btnForLeft.addTarget(self, action: #selector(actionForTimeSelection(_:)), for: .touchUpInside)
            cell.imgViewForLeft.image = UIImage(named: "clock")
            if isEdited ?? false {
                cell.txtFieldForleft.text = (indexPath.row == 0) ? CommonClassMethods.timeFromDateString(date: studentBreak.breakOutTime ?? "") :
                    CommonClassMethods.timeFromDateString(date: studentBreak.breakInTime ?? "")
                cell.lblForLeftTitle.text = (indexPath.row == 0) ? Macros.ControllerStrings.StudentBreakInOutVC.pickedupTime : Macros.ControllerStrings.StudentBreakInOutVC.dropoffTime
            } else {
                if (isPickUp ?? false) {
                    if (studentBreak.breakOutTime == nil || studentBreak.breakOutTime == "") {
                        cell.txtFieldForleft.text = ""
                    } else {
                        cell.txtFieldForleft.text = CommonClassMethods.timeFromDateString(date: studentBreak.breakOutTime ?? "")
                    }
                } else {
                    if (studentBreak.breakInTime == nil || studentBreak.breakInTime == "") {
                        cell.txtFieldForleft.text = ""
                    } else {
                        cell.txtFieldForleft.text = CommonClassMethods.timeFromDateString(date: studentBreak.breakInTime ?? "")
                    }
                }
                //                cell.txtFieldForleft.text = (isPickUp ?? false) ? CommonClassMethods.timeFromDateString(date: studentBreak.breakOutTime ?? "") : CommonClassMethods.timeFromDateString(date: studentBreak.breakInTime ?? "")
                cell.lblForLeftTitle.text = (isPickUp ?? false)             ? Macros.ControllerStrings.StudentBreakInOutVC.pickedupTime : Macros.ControllerStrings.StudentBreakInOutVC.dropoffTime
            }
            cell.viewForRight.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    
    
    func customSubmitButtonTableViewCell(tableView: UITableView) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForBreakOot.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = self.tblViewForBreakOot.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSave(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UITextField Delegate -----
extension StudentBreakInOutVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        self.studentBreak.breakReason = newString as String
        return true
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForBreakOot.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}

//MARK:----- UITableView Cells -----
class BreakInOutHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
}
