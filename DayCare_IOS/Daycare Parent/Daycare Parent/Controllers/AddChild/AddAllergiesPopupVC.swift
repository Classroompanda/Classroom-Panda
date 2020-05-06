//
//  AddAllergiesPopupVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 20/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import Material

class AddAllergiesPopupVC: UIViewController {

    @IBOutlet weak var lblForNavTitle: UILabel!
    @IBOutlet weak var tblViewForAddAllergies: UITableView!
    var arrForAllergyName : [DropDownModel]?
    var arrForAllergyType : [DropDownModel]?
    var arrForAllergyReactionType : [DropDownModel]?
    var dropDownForList = DropDown()
    var child: Child?
    var allergy = Allergies()
    var delegate: HealthDescriptionDelegate?
    var isEdited:Bool?
    var selectedIndex:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.lblForNavTitle.text =  (isEdited ?? false) ? Macros.NavigationBarTitle.editAllergies : Macros.NavigationBarTitle.addAllergies
        if (isEdited ?? false) {
            if allergy.firstAllergyObservation != nil && allergy.firstAllergyObservation != "" {
                allergy.firstAllergyObservationDate = CommonClassMethods.dateObjectFromDateString(date: allergy.firstAllergyObservation ?? "")
            }
            if allergy.lastAllergyObservation != nil && allergy.lastAllergyObservation != "" {
                allergy.lastAllergyObservationDate = CommonClassMethods.dateObjectFromDateString(date: allergy.lastAllergyObservation ?? "")
            }
        }
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForSaveAllergies(_ sender: Any) {
        if isValidate() {
            self.allergy.studentID = self.child?.studentId ?? 0
            self.allergy.agencyID =  AppInstance.shared.user?.agencyID ?? 0
            self.allergy.id = self.allergy.studentAllergiesID ?? 0
            self.allergy.allergyComment = self.allergy.allergyComment ?? ""
            self.allergy.firstAllergyObservation = self.allergy.firstAllergyObservation ?? ""
            self.allergy.lastAllergyObservation = self.allergy.lastAllergyObservation ?? ""
            self.allergy.studentAllergiesID = self.allergy.studentAllergiesID ?? 0
            (self.isEdited ?? false) ? (allergy.updatedBy = AppInstance.shared.user?.loginUserID) : (allergy.createdBy = AppInstance.shared.user?.loginUserID)
            delegate?.saveAction(param: self.allergy.dictionaryRepresentation(), healthStatusType: HealthDecriptionStatus.Allergies, selectedIndex: selectedIndex)
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
        dropDownForList.show()
    }
    @objc func actionForDatePicker(_ sender: UIButton) {
        
        let selectedDate = sender.tag == 4 ? CommonClassMethods.dateObjectFromDateString(date: allergy.firstAllergyObservation ?? "") : CommonClassMethods.dateObjectFromDateString(date: allergy.lastAllergyObservation ?? "")
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            if let cell = self.tblViewForAddAllergies.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            }
            switch sender.tag {
            case 4:
                self.allergy.firstAllergyObservation = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                self.allergy.firstAllergyObservationDate = dateTime
            case 5:
                self.allergy.lastAllergyObservation = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                self.allergy.lastAllergyObservationDate = dateTime
            default:
                print("Invalid case")
            }
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    func setupDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForName:[String]   =   []
        switch sender.tag {
        case 0:
            for item in arrForAllergyType ?? [] {
                arrForName.append(item.label ?? "")
            }
        case 1:
            for item in arrForAllergyName ?? [] {
                arrForName.append(item.label ?? "")
            }
        case 2:
            for item in arrForAllergyReactionType ?? [] {
                arrForName.append(item.label ?? "")
            }
        default:
            print("Invalid Case")
        }
        
        dropDownForList.anchorView = sender
        dropDownForList.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForList.dataSource = arrForName
        dropDownForList.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            switch sender.tag {
            case 0:
                self?.allergy.allergyTypeID = self?.arrForAllergyType?[index].value ?? 0
                self?.allergy.allergyTypeName = self?.arrForAllergyType?[index].label ?? ""
                if let txtfield = self?.view.viewWithTag(333) as? ErrorTextField {
                    txtfield.isErrorRevealed = false
                }
            case 1:
                self?.allergy.allergyNameID = self?.arrForAllergyName?[index].value ?? 0
                self?.allergy.allergyName = self?.arrForAllergyName?[index].label ?? ""
                if let txtfield = self?.view.viewWithTag(1) as? ErrorTextField {
                    txtfield.isErrorRevealed = false
                }
            case 2:
                self?.allergy.allergyReactionTypeID = self?.arrForAllergyReactionType?[index].value ?? 0
                self?.allergy.allergyReactionTypeName = self?.arrForAllergyReactionType?[index].label ?? ""
                if let txtfield = self?.view.viewWithTag(2) as? ErrorTextField {
                    txtfield.isErrorRevealed = false
                }
            default:
                print("Invalid Case")
            }
        }
        dropDownForList.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    func resignTextFieldResponder(){
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
    
    func isValidate() -> Bool {
        var isValidate = true
        if self.allergy.allergyTypeID == 0 || self.allergy.allergyTypeID == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(333) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        } else if self.allergy.allergyNameID == 0 || self.allergy.allergyNameID == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(1) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        } else if self.allergy.allergyReactionTypeID == 0 || self.allergy.allergyReactionTypeID == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(2) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        } else if self.allergy.treatment == "" || self.allergy.treatment == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(444) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }
        return isValidate
    }
    
}

//MARK:----- UITableView Delegate and Datasource -------
extension AddAllergiesPopupVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 7
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0,1,2:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        case 3,4,5:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        default:
            return customTextViewCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddAllergies.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.delegate = self
            cell.txtFieldForField.placeholder = Macros.ConstantArray.arrForAddAllergies[indexPath.row]
            cell.txtFieldForField.error = Macros.ConstantArray.arrForAddAllergiesValidationMsg[indexPath.row]
            cell.btnForField.isHidden = indexPath.row == 3 ? true : false
            cell.txtFieldForField.isEnabled = indexPath.row == 3 ? true : false
            cell.imgViewForArrow.isHidden = indexPath.row == 3 ? true : false
            cell.btnForField.addTarget(self, action:  #selector(actionForDatePicker(_:)), for: .touchUpInside)
            switch indexPath.row {
            case 3:
                cell.txtFieldForField.text = self.allergy.treatment
                cell.txtFieldForField.tag = 444
            case 4:
                if let date = self.allergy.firstAllergyObservationDate {
                     cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: date)
                } else {
                    cell.txtFieldForField.text = ""
                }
                 cell.txtFieldForField.tag = 4
            case 5:
                if let date = self.allergy.lastAllergyObservationDate {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: date)
                } else {
                    cell.txtFieldForField.text = ""
                }
                 cell.txtFieldForField.tag = 5
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddAllergies.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForAddAllergies[indexPath.row]
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.txtFieldForField.error = Macros.ConstantArray.arrForAddAllergiesValidationMsg[indexPath.row]
            cell.btnForField.addTarget(self, action: #selector(actionForDropDown(_:)), for: .touchUpInside)
            switch indexPath.row {
            case 0:
                for item in arrForAllergyType ?? [] {
                   if item.value == self.allergy.allergyTypeID {
                        cell.btnForField.setTitle(item.label, for: .normal)
                    }
                }
                 cell.txtFieldForField.tag = 333
            case 1:
                for item in arrForAllergyName ?? [] {
                   if item.value == self.allergy.allergyNameID {
                        cell.btnForField.setTitle(item.label, for: .normal)
                    }
                }
            case 2:
                for item in arrForAllergyReactionType ?? [] {
                   if item.value == self.allergy.allergyReactionTypeID {
                        cell.btnForField.setTitle(item.label, for: .normal)
                    }
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customTextViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForAddAllergies.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForAddAllergies[indexPath.row]
            cell.txtViewForField.text = self.allergy.allergyComment
            return cell
        }
        return UITableViewCell()
    }
}

extension AddAllergiesPopupVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        self.allergy.treatment = newString as String
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        return true
    }
}
//MARK:----- UITextView Delegates -----
extension AddAllergiesPopupVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        self.allergy.allergyComment = newString as String
        return true
    }
    
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddAllergies.cellForRow(at: IndexPath(row:6, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddAllergies.cellForRow(at: IndexPath(row:6, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}
