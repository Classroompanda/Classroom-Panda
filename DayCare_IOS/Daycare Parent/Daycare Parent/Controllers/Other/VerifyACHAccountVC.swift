//
//  VerifyACHAccountVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 23/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit
import Material

protocol ACHAccountVerifiedDelegate: class {
    func accountVerified()
}

class VerifyACHAccountVC: BaseViewController {
    
    @IBOutlet weak var achVerifyAccountTableView: UITableView!
    var delegate: ACHAccountVerifiedDelegate?
    
    var paymentDetail = Payment()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func actionForCancel(_ sender: UIButton){
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func saveAccountDetails(_ sender: UIButton) {
        if isValid() {
            verifyACHAccount()
        }
    }
    
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
    
    func verifyACHAccount() {
        paymentDetail.parentID = AppInstance.shared.user?.releventUserID ?? 0
        paymentDetail.agencyID = AppInstance.shared.user?.agencyID ?? 0
        
        // replace any . in amount with empty space as ACH only accept int value as per backend developer
        paymentDetail.amountOne = paymentDetail.amountOne?.replacingOccurrences(of: ".", with: "")
        paymentDetail.amountTwo = paymentDetail.amountTwo?.replacingOccurrences(of: ".", with: "")

        let accountService = ACHAccountService()
        accountService.verifyACHAccount(with: self, accountDetails: paymentDetail) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.delegate?.accountVerified()
                self.showSuccessMessage(message: response["message"] as? String ?? "")
            }
        }
    }
    
    func isValid() -> Bool {
        var isValid = true
        
        guard let firstAmountCell =  achVerifyAccountTableView.cellForRow(at: IndexPath.init(row: 0, section: 0))  as? DropDownTextFieldTableViewCell, let firstAmountTextField = firstAmountCell.txtFieldForField  else { return false }
        guard let secondAmountCell =  achVerifyAccountTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownTextFieldTableViewCell, let secondAmountTextField = secondAmountCell.txtFieldForField  else { return false }
        
        if let accountNameText = firstAmountTextField.text, accountNameText.isEmpty {
            firstAmountTextField.isErrorRevealed = true
            isValid = false
        }
        if let secondAmountText = secondAmountTextField.text, secondAmountText.isEmpty {
            secondAmountTextField.isErrorRevealed = true
            isValid = false
        }
        
        return isValid
    }
}

extension VerifyACHAccountVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return   Macros.ConstantArray.arrForACHAccountVerification.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
    }
    
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.achVerifyAccountTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            let titleString = Macros.ConstantArray.arrForACHAccountVerification[indexPath.row]
            let errorTitleString = Macros.ConstantArray.arrForACHAccountVerificationErrors[indexPath.row]
            cell.txtFieldForField.keyboardType = .decimalPad
            cell.txtFieldForField.delegate = self
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            return cell
        }
        return UITableViewCell()
    }
    
}


extension VerifyACHAccountVC: UITextFieldDelegate{
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        guard CharacterSet(charactersIn: "0123456789.").isSuperset(of: CharacterSet(charactersIn: string)) else {
            return false
        }
        switch textField.tag {
        case 0:
            paymentDetail.amountOne = newString as  String
        case 1:
            paymentDetail.amountTwo = newString as  String
        default:
            print("Invalid case")
        }
        return true
    }
}
