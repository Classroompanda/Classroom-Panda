//
//  AddMedicationPopupVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 25/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown
import Material

class AddMedicationPopupVC: UIViewController {

    @IBOutlet weak var tblViewForAddMedication: UITableView!
    var arrForDoes:[DropDownModel]?
    var medication = Medication()
    var dropDownForDoes = DropDown()
    var child : Child?
    var delegate: HealthDescriptionDelegate?
    var isEdited:Bool?
    var selectedIndex:Int?
    
    @IBOutlet weak var lblForNavTitle: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if medication.startDate != nil && medication.startDate != "" {
            medication.startDatee = CommonClassMethods.dateObjectFromDateString(date: medication.startDate ?? "")
        }
        if medication.endDate != nil && medication.endDate != "" {
            medication.endDatee = CommonClassMethods.dateObjectFromDateString(date: medication.endDate ?? "")
        }
        self.lblForNavTitle.text =  (isEdited ?? false) ? Macros.NavigationBarTitle.editMedication : Macros.NavigationBarTitle.addMedication
        // Do any additional setup after loading the view.
    }
  override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardDidShow(with:)), name: UIResponder.keyboardDidShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(with:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardDidShowNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardWillHideNotification, object: nil)
    }
  
  // MARK: Keyboard Handling
    @objc func keyboardDidShow(with notification: Notification) {
        guard let userInfo = notification.userInfo as? [String: AnyObject],
            let keyboardFrame = (userInfo[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue
            else { return }

        var contentInset = self.tblViewForAddMedication.contentInset
        contentInset.bottom += keyboardFrame.height

        tblViewForAddMedication.contentInset = contentInset
        tblViewForAddMedication.scrollIndicatorInsets = contentInset
      tblViewForAddMedication.contentSize = CGSize.init(width: 0, height: tblViewForAddMedication.contentSize.height - contentInset.bottom)
    }

    @objc func keyboardWillHide(with notification: Notification) {
        guard let userInfo = notification.userInfo as? [String: AnyObject],
            let keyboardFrame = (userInfo[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue
            else { return }

        var contentInset = self.tblViewForAddMedication.contentInset
        contentInset.bottom -= keyboardFrame.height

        tblViewForAddMedication.contentInset = contentInset
        tblViewForAddMedication.scrollIndicatorInsets = contentInset
    }
  
    @IBAction func actionForSave(_ sender: Any) {
        resignTextFieldResponder()
        if self.isValidate() {
          self.medication.updatedBy = AppInstance.shared.user?.loginUserID ?? 0
            self.medication.id = self.medication.studentMedicationID ?? 0
            self.medication.studentMedicationID = self.medication.studentMedicationID ?? 0
            self.medication.studentID = self.child?.studentId ?? 0
            self.medication.agencyID = AppInstance.shared.user?.agencyID
            self.medication.dosageQuantityID = 2
            self.medication.otherMedication = self.medication.otherMedication ?? ""
            (self.isEdited ?? false) ? (medication.updatedBy = AppInstance.shared.user?.loginUserID) : (medication.createdBy = AppInstance.shared.user?.loginUserID)
            self.delegate?.saveAction(param: self.medication.dictionaryRepresentation(), healthStatusType: HealthDecriptionStatus.Medication, selectedIndex: selectedIndex)
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
         self.dismiss(animated: true, completion: nil)
    }
    
    @objc func actionForDropDown(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForDoes.show()
    }
    
    @objc func actionForDatePicker(_ sender: UIButton) {
        resignTextFieldResponder()
            let selectedDate = sender.tag == 6 ? CommonClassMethods.dateObjectFromDateString(date: medication.startDate ?? "") : CommonClassMethods.dateObjectFromDateString(date: medication.endDate ?? "")
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            if let cell = self.tblViewForAddMedication.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                cell.txtFieldForField.isErrorRevealed = false
                switch sender.tag {
                case 6:
                    self.medication.startDatee = dateTime
                    self.medication.startDate = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                case 7:
                    self.medication.endDatee = dateTime
                    self.medication.endDate = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                default:
                    print("Invalid case")
                }
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
//        datePicker?.minimumDate = Date()
        datePicker?.show()
    }
    
    func setupDropDown(_ imageView: UIImageView, sender: UIButton){
        
        var arrForName:[String]   =   []
        for item in arrForDoes ?? [] {
            arrForName.append(item.label ?? "")
        }
        dropDownForDoes.anchorView = sender
        dropDownForDoes.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForDoes.dataSource = arrForName
        dropDownForDoes.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.medication.doseRepeatID = self?.arrForDoes?[index].value
            self?.medication.doseRepeatName = item
            if let txtfield = self?.view.viewWithTag(333) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
        dropDownForDoes.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    func resignTextFieldResponder(){
        if self.view.subviews.count > 2 {
            let view = self.view.subviews[2] as? UITableView
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
    }
    
    func isValidate() -> Bool{
        var isValidate = true
        if medication.medicationName == "" || medication.medicationName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(444) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if medication.strength == "" || medication.strength == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(1) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if medication.units == 0 || medication.units == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(2) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }  else if medication.doseRepeatID == 0 || medication.doseRepeatID == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(333) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        } else if medication.howTaken == "" || medication.howTaken == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(4) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if medication.startDate == "" || medication.startDate == nil {
            isValidate = false
            isValidate = false
            if let txtfield = self.view.viewWithTag(6) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        }else if medication.endDate == "" || medication.endDate == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(7) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        }
        return isValidate
    }
}

//MARK:------ UITableView Delegate and Datasource -------
extension AddMedicationPopupVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 8
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return indexPath.row == 3 ? customDropDownButtonCell(tableView: tableView, indexPath: indexPath) : customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddMedication.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.txtFieldForField.delegate = self
            cell.txtFieldForField.placeholder = Macros.ConstantArray.arrForMedicationTitle[indexPath.row]
            cell.txtFieldForField.error = Macros.ConstantArray.arrForMedicationValidationMsg[indexPath.row]
            cell.btnForField.addTarget(self, action:  #selector(actionForDatePicker(_:)), for: .touchUpInside)
            cell.txtFieldForField.keyboardType = (indexPath.row == 2) ? .numberPad : .default
//            cell.txtFieldForField.text = ""
            switch indexPath.row {
            case 0:
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isEnabled = false
                cell.txtFieldForField.text = self.medication.medicationName
                cell.txtFieldForField.tag = 444
            case 1:
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isEnabled = false
                cell.txtFieldForField.text = self.medication.strength
                cell.txtFieldForField.tag = 1
            case 2:
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isEnabled = false
                cell.txtFieldForField.text = String(self.medication.units ?? 0)
                cell.txtFieldForField.tag = 2
            case 4:
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isEnabled = false
                cell.txtFieldForField.text = self.medication.howTaken
                cell.txtFieldForField.tag = 4
            case 5:
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isEnabled = false
                cell.txtFieldForField.text = self.medication.otherMedication
                cell.txtFieldForField.tag = 5
            case 6:
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.isEnabled = false
                cell.btnForField.isEnabled = true
                if medication.startDate == "" || medication.startDate == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: medication.startDatee ?? Date())
                }
                cell.txtFieldForField.tag = 6
            case 7:
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.isEnabled = false
                cell.btnForField.isEnabled = true
                if medication.endDate == "" || medication.endDate == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: medication.endDatee ?? Date())
                }
                cell.txtFieldForField.tag = 7
            default:
                print("Invalid Data")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddMedication.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForMedicationTitle[indexPath.row]
            cell.txtFieldForField.error = Macros.ConstantArray.arrForMedicationValidationMsg[indexPath.row]
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForField.tag = 333
            cell.btnForField.addTarget(self, action: #selector(actionForDropDown(_:)), for: .touchUpInside)
            (medication.doseRepeatName != nil && medication.doseRepeatName != "") ? cell.btnForField.setTitle(medication.doseRepeatName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UITextField Delegates -----
extension AddMedicationPopupVC:UITextFieldDelegate{
  
  func textFieldDidBeginEditing(_ textField: UITextField) {
    perform(#selector(scrollTable(_:)), with: textField, afterDelay: 0.3)
  }
  
  @objc func scrollTable(_ txtField:Any?)
  {
      let pathToLastRow = IndexPath.init(row: 1, section: 0)
    let cell = tblViewForAddMedication.cellForRow(at: pathToLastRow)
    let cellrect = cell?.convert(cell?.frame ?? CGRect.zero, to: tblViewForAddMedication) ?? CGRect.zero
    tblViewForAddMedication.scrollRectToVisible(cellrect, animated: false)
  }
  
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        switch textField.tag{
        case 444:
            self.medication.medicationName = newString as String
        case 1:
            self.medication.strength = newString as String
        case 2:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let unit:String = newString as String
                self.medication.units = Int(unit)
                return true
            } else {
                return false
            }
        case 4:
            self.medication.howTaken = newString as String
        case 5:
            self.medication.otherMedication = newString as String
        default:
            print("Invalid Case")
        }
        return true
    }
}
