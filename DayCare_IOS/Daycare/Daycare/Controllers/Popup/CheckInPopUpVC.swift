//
//  CheckInPopUpVC.swift
//  Daycare
//
//  Created by amrut waghmare on 11/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import SDWebImage

protocol CheckInDelegate : class {
  func submitCheckInButtonAction(attendanceDate:String,attendenceStatusID:Int,guardianId:Int,isEditModeOn:Bool,studentID:Int,id:Int,time:String,selectedRow:Int)
}

class CheckInPopUpVC: UIViewController {
  
  @IBOutlet weak var tblViewForCheckInOut: UITableView!
  @IBOutlet weak var btnForSave: CustomButton!
  @IBOutlet weak var btnForCancel: CustomButton!
  
  
  var selectedDate    : Date?
  let pickupParentDropDown     = DropDown()
  let dropbyParentDropDown     = DropDown()
  var arrForGuardians     :   [Guardian]?
  var arrForParentNames   :   [String] = []
  var attendance          :   Attendance?
  var isEditButtonClicked :   Bool?
  var delegate : CheckInDelegate?
  var selectedTime : Date?
  var selectedGuardian    :   Guardian?
  var selectedRow     :   Int?
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.initialSetup()
    // Do any additional setup after loading the view.
  }
  
  //MARK:----- @IBOutlets -----
  
  @IBAction func actionForSave(_ sender: Any) {
    if isValidate() {
      functionForSaveButton()
    }
  }
  
  @IBAction func actionForCancel(_ sender: Any) {
    delegate?.submitCheckInButtonAction(attendanceDate: "", attendenceStatusID: 0, guardianId: 0,  isEditModeOn: true, studentID: 0, id: self.attendance?.id ?? 0, time: "", selectedRow: 0)
    self.dismiss(animated: true, completion: nil)
  }
  
  @IBAction func actionForPickupParentDropdown(_ sender: UIButton) {
    pickupParentDropDown.show()
    if let cell = self.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
      cell.imgViewForArrow.image = UIImage(named: "arrowUp")
    }
  }
  
  @IBAction func actionForDropbyParentDropdown(_ sender: UIButton) {
    dropbyParentDropDown.show()
    if let cell = self.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
      cell.imgViewForArrow.image = UIImage(named: "arrowUp")
    }
  }
  
  @IBAction func actionForEdit(_ sender: UIButton){
    let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: Date(), doneBlock: {
      picker, value, index in
      let dateTime    = value as! Date
      self.selectedTime = dateTime
      if let lblForDayTime = self.view.viewWithTag(1000) as? UILabel {
        lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: self.selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:self.selectedTime ?? Date())
      }
      return
    }, cancel: { ActionStringCancelBlock in return }, origin:sender)
    datePicker?.maximumDate = Date()
    datePicker?.show()
  }
  
  //MARK:----- Functions -----
  
  //Initial Setup
  func initialSetup(){
    btnForSave.frame = CGRect(x: btnForSave.bounds.minX, y: btnForSave.bounds.minY, width: btnForSave.bounds.width, height: 50.0)
    btnForCancel.frame = CGRect(x: btnForCancel.bounds.minX, y: btnForCancel.bounds.minY, width: btnForCancel.bounds.width, height: 50.0)
    self.arrForParentNames = arrForGuardians?.map{$0.guardianName ?? ""} ?? []
    //        for guardian in arrForGuardians ?? [] {
    //            self.arrForParentNames.append(guardian.guardianName ?? "")
    //        }
  }
  
  func isValidate() -> Bool {
    if let cell = self.tblViewForCheckInOut.cellForRow(at: IndexPath(row: 0, section: 0)) as? DropDownTextFieldTableViewCell {
      if !(isEditButtonClicked ?? false){
        if (cell.txtFieldForField.text == nil || cell .txtFieldForField.text == "") {
          if (attendance?.attendenceStatusID == AttendanceStatus.isToBeChecked) {
            _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.selectDropOff, onViewController: self)
            return false
          } else if (attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn){
            _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.pickedUp, onViewController: self)
            return false
          }
          return true
        }
        return true
      }
      return true
    }
    return true
  }
  
  //Dissmiss Popup
  func functionForSaveButton(){
    var status:Int?
    var editMode: Bool = true
    if attendance?.attendenceStatusID == AttendanceStatus.isToBeChecked {
      status = AttendanceStatus.isCheckedIn
      //            editMode = false
      editMode = (attendance?.id ?? 0) > 0
    } else if attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn {
      if isEditButtonClicked ?? false {
        status = AttendanceStatus.isCheckedIn
        editMode = true
      } else {
        status = AttendanceStatus.isCheckedOut
      }
    } else {
      status = AttendanceStatus.isCheckedOut
    }
    
    delegate?.submitCheckInButtonAction(attendanceDate: CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedDate ?? Date()), attendenceStatusID: status ?? 0, guardianId: self.selectedGuardian?.guardianId ?? 0, isEditModeOn: editMode, studentID: self.attendance?.studentID ?? 0, id: attendance?.id ?? 0,time:CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedTime ?? Date()), selectedRow: selectedRow ?? 0)
    self .dismiss(animated: true, completion: nil)
  }
  //Dropdown list
  func setupPickupParentsDropdown(sender:UIButton) {
    pickupParentDropDown.anchorView = sender
    pickupParentDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
    pickupParentDropDown.dataSource = arrForParentNames
    pickupParentDropDown.selectionAction = { [weak self] (index, item) in
      self?.selectedGuardian = self?.arrForGuardians?[index]
      if let cell = self?.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.txtFieldForField.text = item
        cell.imgViewForArrow.image = UIImage(named: "arrowDown")
      }
    }
    self.pickupParentDropDown.cancelAction = { [unowned self] in
      if let cell = self.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.imgViewForArrow.image = UIImage(named: "arrowDown")
      }
    }
  }
  
  func setupDropbyParentsDropdown(sender:UIButton) {
    dropbyParentDropDown.anchorView = sender
    dropbyParentDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
    dropbyParentDropDown.dataSource = arrForParentNames
    dropbyParentDropDown.selectionAction = { [weak self] (index, item) in
      self?.selectedGuardian = self?.arrForGuardians?[index]
      if let cell = self?.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.txtFieldForField.text = item
        cell.imgViewForArrow.image = UIImage(named: "arrowDown")
      }
    }
    self.dropbyParentDropDown.cancelAction = { [unowned self] in
      if let cell = self.tblViewForCheckInOut.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.imgViewForArrow.image = UIImage(named: "arrowDown")
      }
    }
  }
}

//MARK:----- UITableView Delegates & Datasources -----
extension CheckInPopUpVC: UITableViewDelegate, UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    if attendance?.attendenceStatusID == AttendanceStatus.isToBeChecked {
      return 1
    } else if attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn {
      //            return (isEditButtonClicked ?? false) ? 1 : 2
      return 1
    }
    return 2
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    return customDropDownTableViewCell(tableView:tableView,indexPath:indexPath)
  }
  
  func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    return customHeaderViewCell(tableView: tableView)
  }
  
  func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
    return 93
  }
  
  //MARK:----- Custom UITableView functions -----
  
  func customDropDownTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
    let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
    self.tblViewForCheckInOut.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
    if let cell = self.tblViewForCheckInOut.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
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
      case 0:
        if attendance?.attendenceStatusID == AttendanceStatus.isToBeChecked {
          cell.lblForFieldTitle.text = Macros.ConstantArray.arrForCheckInTitles[indexPath.row]
          checkInCell(cell: cell)
        } else if attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn {
          cell.lblForFieldTitle.text = (isEditButtonClicked ?? false) ? Macros.ConstantArray.arrForCheckInTitles[indexPath.row] : Macros.ConstantArray.arrForCheckInTitles[indexPath.row+1]
          (isEditButtonClicked ?? false) ? checkInCell(cell: cell) : checkOutCell(cell: cell)
        }else{
          cell.lblForFieldTitle.text = Macros.ConstantArray.arrForCheckInTitles[indexPath.row]
          checkInCell(cell: cell)
        }
      case 1:
        cell.lblForFieldTitle.text = Macros.ConstantArray.arrForCheckInTitles[indexPath.row]
        checkOutCell(cell: cell)
      default:
        print("Invalid Case")
      }
      
      return cell
    }
    return UITableViewCell()
  }
  
  //custom function for checkIn
  func checkInCell(cell: DropDownTextFieldTableViewCell){
    if attendance?.dropedById != 0 {
      for guardian in arrForGuardians ?? [] {
        if guardian.guardianId == attendance?.dropedById {
          cell.txtFieldForField.text = guardian.guardianName
          self.selectedGuardian = guardian
        }
      }
    }
    if attendance?.attendenceStatusID == AttendanceStatus.isToBeChecked {
      cell.txtFieldForField.isEnabled = true
      cell.txtFieldForField.textColor = .black
      cell.txtFieldForField.dividerColor = colorCode.applicationColor
      cell.btnForField.isEnabled = true
    } else if attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn && (self.isEditButtonClicked ?? false) {
      cell.txtFieldForField.isEnabled = true
      cell.txtFieldForField.textColor = .black
      cell.txtFieldForField.dividerColor = colorCode.applicationColor
      cell.btnForField.isEnabled = true
    } else {
      cell.txtFieldForField.isEnabled = false
      cell.txtFieldForField.textColor = .gray
      cell.txtFieldForField.dividerColor = .gray
      cell.btnForField.isEnabled = false
    }
    self.setupDropbyParentsDropdown(sender: cell.btnForField)
    cell.btnForField.addTarget(self, action: #selector(actionForDropbyParentDropdown(_:)), for: .touchUpInside)
  }
  
  func checkOutCell(cell: DropDownTextFieldTableViewCell){
    for guardian in arrForGuardians ?? [] {
      if self.attendance?.pickupById == guardian.guardianId {
        cell.txtFieldForField.text = guardian.guardianName
      }
    }
    self.setupPickupParentsDropdown(sender: cell.btnForField)
    cell.btnForField.addTarget(self, action: #selector(actionForPickupParentDropdown(_:)), for: .touchUpInside)
  }
  
  //HeaderView Cell
  func customHeaderViewCell(tableView: UITableView) -> UIView {
    if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.CheckInOutHeaderTableViewCell) as? CheckInOutHeaderTableViewCell {
      cell.lblForName.text = attendance?.studentName
      cell.lblForDate.text = CommonClassMethods.dateFromFormat(date: selectedDate ?? Date())
      cell.btnForEdit.addTarget(self, action: #selector(actionForEdit(_:)), for: .touchUpInside)
      cell.lblForDayTime.tag = 1000
      cell.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray
      
      //            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
      //            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
      cell.imgViewForProfile.sd_setImage(with: URL(string: attendance?.imagePath ?? "")) { (image, error, type, url) in
        if error != nil {
          cell.imgViewForProfile.image = UIImage(named: "placeholder")
        }
      }
      if (isEditButtonClicked ?? false){
        if attendance?.attendenceStatusID == AttendanceStatus.isCheckedIn {
          cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDateString(date: attendance?.checkInTime ?? "")
        } else if attendance?.attendenceStatusID == AttendanceStatus.isCheckedOut {
          cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDateString(date: attendance?.checkOutTime ?? "")
        } else {
          cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:selectedTime ?? Date())
        }
      } else {
        cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:selectedTime ?? Date())
      }
      
      
      //            if CommonClassMethods.convertDateWithoutTime(date: selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: Date()) {
      //                cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDateString(date: attendance?.checkInTime ?? "")
      //            } else {
      //                cell.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:selectedTime ?? Date())
      //            }
      return cell
    }
    return UIView()
  }
}

//MARK:----- UITableView Cells -----
class CheckInOutHeaderTableViewCell: UITableViewCell {
  @IBOutlet weak var imgViewForProfile: UIImageView!
  @IBOutlet weak var lblForName: UILabel!
  @IBOutlet weak var lblForDate: UILabel!
  @IBOutlet weak var lblForDayTime: UILabel!
  @IBOutlet weak var btnForEdit: UIButton!
  override func awakeFromNib() {
    super.awakeFromNib()
    imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 30 : 20
    // Initialization code
  }
}
