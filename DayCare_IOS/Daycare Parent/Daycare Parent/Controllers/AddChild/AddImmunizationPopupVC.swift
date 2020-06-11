//
//  AddImmunizationPopupVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 20/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown
import Material
class AddImmunizationPopupVC: UIViewController {
  
  @IBOutlet weak var tblViewForAddImmunization: UITableView!
  @IBOutlet weak var lblForNavTitle: UILabel!
  var dropDownForImmunization = DropDown()
  var arrForImmunizationType  :   [DropDownModel]?
  var immunization = Immunization()
  var child: Child?
  var delegate: HealthDescriptionDelegate?
  var isEdited:Bool?
  var selectedIndex:Int?
  var dropDownCellCount = 4
  
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.initialSetup()
  }
  
  func initialSetup(){
    self.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:440)
    self.lblForNavTitle.text =  (isEdited ?? false) ? Macros.NavigationBarTitle.editImmunization : Macros.NavigationBarTitle.addImmunization
    if immunization.dateReceived != nil && immunization.dateReceived != "" {
      immunization.receivedDate = CommonClassMethods.dateObjectFromDateString(date: immunization.dateReceived ?? "")
    }
  }
  
  @IBAction func actionForSave(_ sender: Any) {
    if self.isValidate() {
      immunization.updatedBy = AppInstance.shared.user?.loginUserID ?? 0
      immunization.agencyID = AppInstance.shared.user?.agencyID ?? 0
      immunization.studentID = child?.studentId ?? 0
      immunization.studentImmunizationID = immunization.studentImmunizationID ?? 0
      immunization.id = immunization.studentImmunizationID ?? 0
      (self.isEdited ?? false) ? (immunization.updatedBy = AppInstance.shared.user?.loginUserID) : (immunization.createdBy = AppInstance.shared.user?.loginUserID)
      self.delegate?.saveAction(param: self.immunization.dictionaryRepresentation(), healthStatusType: HealthDecriptionStatus.Immunization, selectedIndex: selectedIndex)
      self.dismiss(animated: true, completion: nil)
    }
  }
  
  @IBAction func actionForCancel(_ sender: Any) {
    self.dismiss(animated: true, completion: nil)
  }
  
  @IBAction func actionForSelectImmunization(_ sender: UIButton) {
    resignTextFieldResponder()
    let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
    imageView?.image = UIImage(named: "arrowUp")
    self.setupImmunizationDropDown(imageView ?? UIImageView(), sender: sender)
    dropDownForImmunization.show()
  }
  
  @IBAction func actionForDateReceived(_ sender: UIButton) {
    resignTextFieldResponder()
    let selectedDate = CommonClassMethods.dateObjectFromDateString(date: immunization.dateReceived ?? "")
    let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
      picker, value, index in
      let dateTime    = value as! Date
      let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
      txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
      if let cell = self.tblViewForAddImmunization.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
        cell.txtFieldForField.isErrorRevealed = false
      }
      self.immunization.receivedDate = dateTime
      self.immunization.dateReceived = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
      return
    }, cancel: { ActionStringCancelBlock in return }, origin:sender)
    datePicker?.maximumDate = Date()
    datePicker?.show()
  }
  
  //DropDown list for country
  func setupImmunizationDropDown(_ imageView: UIImageView, sender: UIButton){
    var arrForImmunizationName:[String]   =   []
    for immunization in arrForImmunizationType ?? [] {
      arrForImmunizationName.append(immunization.label ?? "")
    }
    dropDownForImmunization.anchorView = sender
    dropDownForImmunization.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
    dropDownForImmunization.dataSource = arrForImmunizationName
    dropDownForImmunization.selectionAction = { [weak self] (index, item) in
      sender.setTitle(item, for: .normal)
      self?.immunization.immunizationID = self?.arrForImmunizationType?[index].value ?? 0
      self?.immunization.immunizationName = self?.arrForImmunizationType?[index].label ?? ""
      if let other = self?.arrForImmunizationType?[index].label {
        
        if other.lowercased() != Macros.ControllerString.Other.lowercased() {
          self?.immunization.otherImmunization = ""
          self?.immunization.abbreviation = ""
          self?.dropDownCellCount = 2
          self?.preferredContentSize = CGSize(width:(self?.view.bounds.width ?? 0 - 60),height:300)
        }
        else{
          self?.dropDownCellCount = 4
          self?.preferredContentSize = CGSize(width:(self?.view.bounds.width  ?? 0 - 60),height:440)
        }
      }
      
      self?.tblViewForAddImmunization.reloadData()
    }
    dropDownForImmunization.cancelAction = { [unowned self] in
      imageView.image = UIImage(named: "arrowDown")
    }
  }
  
  func resignTextFieldResponder(){
    let view = self.view.subviews[1] as? UITableView
    for subview in view?.subviews ?? [] where subview is DropDownTextFieldTableViewCell {
      let cell = subview as? DropDownTextFieldTableViewCell
      cell?.txtFieldForField.resignFirstResponder()
    }
    //
    for subview in view?.subviews ?? [] where subview is DateTimeSelectionTableViewCell {
      let cell = subview as? DateTimeSelectionTableViewCell
      cell?.txtFieldForleft.resignFirstResponder()
      cell?.txtFieldForRight.resignFirstResponder()
    }
  }
  func isValidate() -> Bool {
    var isValidate = true
    if self.immunization.immunizationID == 0 || self.immunization.immunizationID == nil {
      isValidate = false
      if let cell = self.tblViewForAddImmunization.cellForRow(at: IndexPath(item: 0, section: 0)) as? DropDownButtonCell {
        cell.txtFieldForField.isErrorRevealed = true
      }
    } else if self.immunization.dateReceived == "" || self.immunization.dateReceived == nil {
      isValidate = false
      if let cell = self.tblViewForAddImmunization.cellForRow(at: IndexPath(item: 1, section: 0)) as? DropDownTextFieldTableViewCell {
        cell.txtFieldForField.isErrorRevealed = true
      }
    } else if self.immunization.immunizationName?.lowercased() == Macros.ControllerString.Other.lowercased() {
      if self.immunization.otherImmunization == "" || self.immunization.otherImmunization == nil {
        isValidate = false
        if let cell = self.tblViewForAddImmunization.cellForRow(at: IndexPath(item: 2, section: 0)) as? DropDownTextFieldTableViewCell {
          cell.txtFieldForField.isErrorRevealed = true
        }
      }
    }
    return isValidate
  }
}

//MARK:----- UITableView Delegate and Datasources ------
extension AddImmunizationPopupVC: UITableViewDelegate, UITableViewDataSource{
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return dropDownCellCount
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    return indexPath.row == 0 ? customDropDownButtonCell(tableView: tableView, indexPath: indexPath): customSingleTextFieldCell(tableView: tableView, indexPath: indexPath)
  }
  
  func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
    let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
    self.tblViewForAddImmunization.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
    if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
      cell.selectionStyle = .none
      cell.lblForFieldTitle.text = Macros.ConstantArray.arrForImmunizationTitle[indexPath.row]
      cell.txtFieldForField.error = Macros.ConstantArray.arrForImmunizationValidationMsg[indexPath.row]
      cell.btnForField.tag = indexPath.row
      cell.imgViewForArrow.tag = indexPath.row
      cell.btnForField.addTarget(self, action: #selector(actionForSelectImmunization(_:)), for: .touchUpInside)
      (immunization.immunizationName == "" || immunization.immunizationName == nil) ? cell.btnForField.setTitle("Select", for: .normal) : cell.btnForField.setTitle(self.immunization.immunizationName, for: .normal)
      if !(immunization.immunizationName == "" || immunization.immunizationName == nil) {
        cell.txtFieldForField.isErrorRevealed = false
      }
      return cell
    }
    return UITableViewCell()
  }
  
  func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
    let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
    self.tblViewForAddImmunization.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
    if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
      cell.selectionStyle = .none
      cell.lblForFieldTitle.isHidden = true
      cell.btnForField.tag = indexPath.row
      cell.txtFieldForField.tag = indexPath.row
      cell.txtFieldForField.delegate = self
      cell.txtFieldForField.placeholder = Macros.ConstantArray.arrForImmunizationTitle[indexPath.row]
      cell.txtFieldForField.error = Macros.ConstantArray.arrForImmunizationValidationMsg[indexPath.row]
      cell.btnForField.isHidden = indexPath.row != 1 ? true : false
      cell.txtFieldForField.isEnabled = indexPath.row != 1 ? true : false
      cell.imgViewForArrow.isHidden = indexPath.row != 1 ? true : false
      cell.btnForField.addTarget(self, action:  #selector(actionForDateReceived(_:)), for: .touchUpInside)
      cell.txtFieldForField.isEnabled = (immunization.immunizationName?.lowercased() == Macros.ControllerString.Other.lowercased())
      switch indexPath.row {
      case 1:
        if let date = self.immunization.receivedDate {
          cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: date)
        } else {
          cell.txtFieldForField.text = ""
        }
      case 2:
        cell.txtFieldForField.text = self.immunization.otherImmunization
      case 3:
        cell.txtFieldForField.text = self.immunization.abbreviation
      default:
        print("Invalid Case")
      }
      return cell
    }
    return UITableViewCell()
  }
}

//MARK:---- UITextField Delegate -----

extension AddImmunizationPopupVC:UITextFieldDelegate{
  func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    let currentString:NSString = textField.text! as NSString
    let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
    switch textField.tag {
    case 2:
      self.immunization.otherImmunization = newString as String
      if let textfield = textField as? ErrorTextField {
        textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
      }
    case 3:
      self.immunization.abbreviation = newString as String
    default:
      print("Invalid case")
    }
    return true
  }
}
