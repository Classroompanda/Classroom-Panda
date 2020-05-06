//
//  AddACHAccount.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 22/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import Material


protocol ACHAccountDelegate: class {
    func accountUpdated()
}


class AddACHAccount: BaseViewController {
    
    @IBOutlet weak var achAccountTableView: UITableView!
    var delegate: ACHAccountDelegate?

    var ACHAccountDetail = ACHAccount()
    let accountTypeDropDown = DropDown()

    override func viewDidLoad() {
        super.viewDidLoad()
//        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.AddACHAccount)
     
        // Do any additional setup after loading the view.
    }
 
    //MARK:----- IBAction -----

    @IBAction func accountTypeDropdown(_ sender: UIButton){
        self.view.endEditing(true)
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupAccountTypeDropDown(imageView ?? UIImageView(), sender: sender)
        accountTypeDropDown.show()
    }
    
    @IBAction func actionForCancel(_ sender: UIButton){
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func saveAccountDetails(_ sender: UIButton) {
        if isValid() {
            addACHAccount()
        }
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
    
    func addACHAccount() {
        ACHAccountDetail.parentID = AppInstance.shared.user?.releventUserID ?? 0
        ACHAccountDetail.agencyID = AppInstance.shared.user?.agencyID ?? 0
        let accountService = ACHAccountService()
        accountService.addACHAccount(with: self, accountDetails: ACHAccountDetail) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.delegate?.accountUpdated()
                self.showSuccessMessage(message: response["message"] as? String ?? "")
            }
        }
    }
    
    //MARK:----- DropDown List -----

      func setupAccountTypeDropDown(_ imageView: UIImageView, sender: UIButton){
          let accountType:[String] = Macros.ConstantArray.arrForAccountType
          accountTypeDropDown.anchorView = sender
          accountTypeDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
          accountTypeDropDown.dataSource = accountType
          accountTypeDropDown.selectionAction = { [weak self] (index, item) in
              sender.setTitle(item, for: .normal)
            self?.ACHAccountDetail.accountType = item
              guard let accountTypeCell =  self?.achAccountTableView.cellForRow(at: IndexPath.init(row: 3, section: 0))  as? DropDownButtonCell, let accountTypeTextField = accountTypeCell.txtFieldForField  else { return }
              accountTypeTextField.text = item
              accountTypeTextField.isErrorRevealed = false
          }
          accountTypeDropDown.cancelAction = { [unowned self] in
              self.accountTypeDropDown.hide()
              imageView.image = UIImage(named: "arrowDown")
          }
      }
    
    //MARK:----- API input validation -----

    func isValid() -> Bool {
         var isValid = true
         
         guard let accountNameCell =  achAccountTableView.cellForRow(at: IndexPath.init(row: 0, section: 0))  as? DropDownTextFieldTableViewCell, let accountNameTextField = accountNameCell.txtFieldForField  else { return false }
         guard let routingNumberCell =  achAccountTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownTextFieldTableViewCell, let routingNumberTextField = routingNumberCell.txtFieldForField  else { return false }
         guard let accountHolderNameCell =  achAccountTableView.cellForRow(at: IndexPath.init(row: 2, section: 0))  as? DropDownTextFieldTableViewCell, let accountHolderNameTextField = accountHolderNameCell.txtFieldForField  else { return false }
         guard let accountTypeCell =  achAccountTableView.cellForRow(at: IndexPath.init(row: 3, section: 0))  as? DropDownButtonCell, let accountTypeTextField = accountTypeCell.txtFieldForField  else { return false }
         
         
         if let accountNameText = accountNameTextField.text, accountNameText.isEmpty {
             accountNameTextField.isErrorRevealed = true
             isValid = false
         }
         if let routingNumberText = routingNumberTextField.text, routingNumberText.isEmpty {
             routingNumberTextField.isErrorRevealed = true
             isValid = false
         }
         if  let accountHolderText = accountHolderNameTextField.text, accountHolderText.isEmpty  {
             accountHolderNameTextField.isErrorRevealed = true
             isValid = false
         }
         if  let accountTypeText = accountTypeTextField.text, accountTypeText.isEmpty  {
             accountTypeTextField.isErrorRevealed = true
             isValid = false
         }
         return isValid
     }
    
    
}

extension AddACHAccount: UITableViewDelegate,UITableViewDataSource {

    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return   Macros.ConstantArray.arrForACHAccount.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 3:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        default:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        achAccountTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            let titleString =  Macros.ConstantArray.arrForACHAccount[indexPath.row]
            let errorTitleString = Macros.ConstantArray.arrForACHAccountErrors[indexPath.row]
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            cell.btnForField.addTarget(self, action: #selector(accountTypeDropdown(_:)), for: .touchUpInside)
            if let accountType = ACHAccountDetail.accountType {
                cell.btnForField.setTitle(accountType, for: .normal)
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.achAccountTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            let titleString = Macros.ConstantArray.arrForACHAccount[indexPath.row]
            let errorTitleString = Macros.ConstantArray.arrForACHAccountErrors[indexPath.row]
            cell.txtFieldForField.delegate = self
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            cell.txtFieldForField.keyboardType = indexPath.row != 2 ? .numberPad : .default
            return cell
        }
        return UITableViewCell()
    }
    
    
    
}

extension AddACHAccount: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        
        // check for account and routing number
        if textField.tag == 0 || textField.tag == 1 {
            guard CharacterSet(charactersIn: "0123456789").isSuperset(of: CharacterSet(charactersIn: string)) else {
                return false
            }
        }
        
        switch textField.tag {
        case 0:
            ACHAccountDetail.accountNumber = newString as  String
        case 1:
            ACHAccountDetail.routingNumber = newString as  String
        case 2:
            ACHAccountDetail.accountHolderName = newString as  String
        default:
            print("Invalid case")
        }
        return true
    }
}
