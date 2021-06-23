//
//  AddPaymentVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 22/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import Material
import ActionSheetPicker_3_0

protocol ACHRecurringPaymentAddedDelegate: class {
    func refreshRecurringPayment()
}


class AddPaymentVC: BaseViewController {
    static let ongoingPaymentEndDate = "01/01/2080"

    @IBOutlet weak var paymentTableView: UITableView!
    @IBOutlet weak var recurringPaymentButton: UIButton!
    @IBOutlet weak var oneTimePaymentButton: UIButton!
    
    var delegate: ACHRecurringPaymentAddedDelegate?
    var paymentDetail = Payment()
    let recurringTypeDropDown = DropDown()

    var paymentFromDate = Date()
    var paymentToDate = Date()

    override func viewDidLoad() {
        super.viewDidLoad()
      
        oneTimePaymentButton.isSelected = true
    }
    
    //MARK:----- IBAction -----
    
    @IBAction func actionForSave(_ sender: UIButton){
        if recurringPaymentButton.isSelected, self.isRecurringPaymentValid() {
            saveRecurringPayment()
        } else if oneTimePaymentButton.isSelected, self.isSinglePaymentValid() {
            saveOneTimePayment()
        }
    }
    
    @IBAction func actionForCancel(_ sender: UIButton){
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func radioButton(_ sender: UIButton){
        sender.isSelected = true
        //Reset values
        paymentFromDate = Date()
        paymentToDate = Date()
        paymentDetail = Payment()
        paymentDetail.isOnGoingRecurring = false
        if sender == recurringPaymentButton {
            oneTimePaymentButton.isSelected = false
        } else {
            recurringPaymentButton.isSelected = false
        }
        paymentTableView.reloadData()
    }
    
    @IBAction func showDropdown(_ sender: UIButton){
        self.view.endEditing(true)
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupRecurringCycleDropDown(imageView ?? UIImageView(), sender: sender)
        recurringTypeDropDown.show()
    }
    
    @IBAction func onGoingButton(_ sender: UIButton){
        sender.isSelected = !sender.isSelected
        paymentDetail.isOnGoingRecurring = sender.isSelected
        paymentTableView.reloadData()
    }
    
    //MARK:----- API Calling Function -------
    
    func showSuccessMessage(message: String) {
         let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
         _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: message, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
             switch index {
             case 0:
                 self.dismiss(animated: true, completion: nil)
             default:
                 break
             }
         })
     }
     
    func saveRecurringPayment() {
         let paymentservice = PaymentService()
        paymentDetail.parentID = AppInstance.shared.user?.releventUserID ?? 0
        paymentDetail.agencyID = AppInstance.shared.user?.agencyID ?? 0
         paymentservice.createRecurringPayment(with: self, param: paymentDetail.dictionaryRepresentationForRecurringPayment()) { (result) in
             if let response = result as? Dictionary<String,Any> {
                 self.delegate?.refreshRecurringPayment()
                 self.showSuccessMessage(message: response["message"] as? String ?? "")
                 
             }
         }
     }
    
    func saveOneTimePayment() {
        let paymentservice = PaymentService()
        paymentDetail.parentID = AppInstance.shared.user?.releventUserID ?? 0
        paymentDetail.agencyID = AppInstance.shared.user?.agencyID ?? 0
        paymentservice.createOneTimePayment(with: self, param: paymentDetail.dictionaryRepresentationForOneTimePayment()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.showSuccessMessage(message: response["message"] as? String ?? "")
                
            }
        }
    }
    
      //MARK:----- API Validation -----
      
    func isSinglePaymentValid() -> Bool {
        var isValid = true
        guard let amountCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 0, section: 0))  as? DropDownTextFieldTableViewCell, let amountTextField = amountCell.txtFieldForField  else { return false }
        guard let paymentDateCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownTextFieldTableViewCell, let paymentDateTextField = paymentDateCell.txtFieldForField  else { return false }
        
        if let amountText = amountTextField.text, amountText.isEmpty {
            amountTextField.isErrorRevealed = true
            isValid = false
        }
        if let paymentDateText = paymentDateTextField.text, paymentDateText.isEmpty  {
            paymentDateTextField.isErrorRevealed = true
            isValid = false
        }
        return isValid
    }
    
    func isRecurringPaymentValid() -> Bool {
        var isValid = true
        
        guard let amountCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 0, section: 0))  as? DropDownTextFieldTableViewCell, let amountTextField = amountCell.txtFieldForField  else { return false }
         guard let recurringCycleCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownButtonCell, let recurringCycleTextField = recurringCycleCell.txtFieldForField  else { return false }
        guard let startDateCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 2, section: 0))  as? DropDownTextFieldTableViewCell, let startDateTextField = startDateCell.txtFieldForField  else { return false }
        
        if !(paymentDetail.isOnGoingRecurring ?? false) {
            guard let endDateCell =  paymentTableView.cellForRow(at: IndexPath.init(row: 4, section: 0))  as? DropDownTextFieldTableViewCell, let endDateTextField = endDateCell.txtFieldForField  else { return false }
            if  let endDateText = endDateTextField.text, endDateText.isEmpty  {
                     endDateTextField.isErrorRevealed = true
                     isValid = false
                 }
        } else {
            paymentDetail.paymentToDate = AddPaymentVC.ongoingPaymentEndDate
        }

        if let amountText = amountTextField.text, amountText.isEmpty {
            amountTextField.isErrorRevealed = true
            isValid = false
        }
        if let recurringCycleText = recurringCycleTextField.text, recurringCycleText.isEmpty {
            recurringCycleTextField.isErrorRevealed = true
            isValid = false
        }
        if  let startDateText = startDateTextField.text, startDateText.isEmpty  {
            startDateTextField.isErrorRevealed = true
            isValid = false
        }
     
    
        return isValid
    }
    
    //MARK:----- DropDown List -----
    
    func setupRecurringCycleDropDown(_ imageView: UIImageView, sender: UIButton){
        let accountType:[String] = Macros.ConstantArray.arrForBillingCycle
        recurringTypeDropDown.anchorView = sender
        recurringTypeDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        recurringTypeDropDown.dataSource = accountType
        recurringTypeDropDown.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.paymentDetail.billingCycle = index + 1
            guard let accountTypeCell =  self?.paymentTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownButtonCell, let accountTypeTextField = accountTypeCell.txtFieldForField  else { return }
            accountTypeTextField.text = item
            accountTypeTextField.isErrorRevealed = false
        }
        recurringTypeDropDown.cancelAction = { [unowned self] in
            self.recurringTypeDropDown.hide()
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //MARK:----- Date Picker -----

    func getSelectedDate(index: Int) -> String {
        var selecteddate = ""
        switch index {
        case 1:
            selecteddate = self.paymentDetail.paymentDate ?? ""
        case 2:
            selecteddate = self.paymentDetail.paymentFromDate ?? ""
        case 3:
            selecteddate = self.paymentDetail.paymentToDate ?? ""
        case 4:
            selecteddate = self.paymentDetail.firstPaymentDate ?? ""
        default:
            print("Default")
        }
        return selecteddate
    }
    
    func setDatePickerDataInModel(selectedDate: String, index: Int) {
        switch index {
        case 1:
            self.paymentDetail.paymentDate = selectedDate
        case 2:
            self.paymentDetail.paymentFromDate = selectedDate
        case 4:
            self.paymentDetail.paymentToDate = selectedDate
//        case 4:
//            self.paymentDetail.firstPaymentDate = selectedDate
        default:
            print("Default")
        }
    }
    
    @objc func actionForSelectDate(_ sender: UIButton){
        view.endEditing(true)
        let selectedDate = sender.tag == 2 ? paymentFromDate : paymentToDate
         let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            if sender.tag == 2 {
                self.paymentFromDate = dateTime
            } else {
                self.paymentToDate = dateTime
            }
            self.setDatePickerDataInModel(selectedDate: txtfieldForDate?.text ?? "", index: sender.tag)
             if let cell = self.paymentTableView.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                 cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                 cell.txtFieldForField.isErrorRevealed = false
             }
             return
         }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        
        
        if sender.tag == 2 { //Payment start date
            if self.paymentDetail.paymentToDate != nil && !(self.paymentDetail.isOnGoingRecurring ?? false) { //in case to date is already addded
            datePicker?.maximumDate = paymentToDate
            }
            //else { // if to date is empty
                datePicker?.minimumDate = Date()
           // }
        } else if sender.tag == 4 && self.paymentDetail.paymentFromDate != nil {
            datePicker?.minimumDate = paymentFromDate
        } else {
            datePicker?.minimumDate = Date()
        }
       // datePicker?.minimumDate = Date()
        datePicker?.show()
    }
    
}

extension AddPaymentVC: UITableViewDelegate,UITableViewDataSource {

    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if recurringPaymentButton.isSelected {
            if paymentDetail.isOnGoingRecurring ?? false {
                return Macros.ConstantArray.arrForRecurringPayment.count - 1 //Payment End date should be removed
            }
            return Macros.ConstantArray.arrForRecurringPayment.count
        }
        return Macros.ConstantArray.arrForSinglePayment.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if recurringPaymentButton.isSelected {
            switch indexPath.row {
            case 1:
                return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
            case 3:
                return customCheckMarkButtonCell(tableView:tableView,indexPath:indexPath)
            default:
                return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
            }
        }
        return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
    }

    func customCheckMarkButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.CheckMarkTVC, bundle: nil)
               paymentTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.CheckMarkTVC)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.CheckMarkTVC) as? CheckMarkTVC {
            cell.checkMarkButton.tag = indexPath.row
            cell.checkMarkButton.isSelected = self.paymentDetail.isOnGoingRecurring ?? false
            cell.checkMarkButton.addTarget(self, action: #selector(onGoingButton(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        paymentTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            let titleString =  Macros.ConstantArray.arrForRecurringPayment[indexPath.row]
            let errorTitleString = Macros.ConstantArray.arrForACHAccountErrors[indexPath.row]
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            cell.btnForField.addTarget(self, action: #selector(showDropdown(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        paymentTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.txtFieldForField.text = ""
            cell.txtFieldForField.delegate = self

            var titleString = ""
            var errorTitleString = ""
            if recurringPaymentButton.isSelected {
                titleString = Macros.ConstantArray.arrForRecurringPayment[indexPath.row]
                errorTitleString = Macros.ConstantArray.arrForRecurringPaymentErrors[indexPath.row]
                
            } else {
                titleString = Macros.ConstantArray.arrForSinglePayment[indexPath.row]
                errorTitleString = Macros.ConstantArray.arrForSinglePaymentErrors[indexPath.row]
            }
          
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            if indexPath.row != 0 && recurringPaymentButton.isSelected ||  indexPath.row == 1 && oneTimePaymentButton.isSelected{
                cell.setupUIForDatePicker()
                cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
            } else {
                cell.txtFieldForField.keyboardType = .numberPad
            }
            setText(indexPath: indexPath, textField: cell.txtFieldForField)
            return cell
        }
        return UITableViewCell()
    }
    
    func setText(indexPath: IndexPath, textField: CustomTextField) {
        switch indexPath.row {
        case 0:
            textField.text = "\(self.paymentDetail.amount ?? 0)"
        case 1:
            textField.text = self.paymentDetail.paymentDate
        case 2:
            textField.text = self.paymentDetail.paymentFromDate
        case 4:
            textField.text = self.paymentDetail.paymentToDate
            //        case 4:
        //            self.paymentDetail.firstPaymentDate = selectedDate
        default:
            print("Default")
        }
        // paymentDetail
    }
    
}


extension AddPaymentVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
   
        switch textField.tag {
        case 0:
            guard CharacterSet(charactersIn: "0123456789").isSuperset(of: CharacterSet(charactersIn: string)) else {
                return false
            }
            paymentDetail.amount = Int(newString as String)
   
        default:
            print("Invalid case")
        }
        return true
    }
}


