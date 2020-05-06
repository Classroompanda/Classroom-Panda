//
//  SignupVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 15/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import Material

class SignupVC: BaseViewController {
    
    @IBOutlet weak var viewForImageCircle: UIView!
    @IBOutlet weak var signupTableView: UITableView!

    @IBOutlet weak var tableHeight: NSLayoutConstraint!

    var agencyList = [Agency]()
    var parentUser = Parent()

    let agencyDropDown = DropDown()


    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        apiForAgencyList()
        AppInstance.shared.accessToken = nil // clear token if already saved otherwise it will create error in signup services
    }

    private func initialSetup(){
        viewForImageCircle.cornerRadius =  UIDevice.current.userInterfaceIdiom == .pad ? 125.0 : viewForImageCircle.bounds.size.width / 2
        viewForImageCircle.layer.masksToBounds = true
        signupTableView.estimatedRowHeight = 100.0
        signupTableView.rowHeight = UITableView.automaticDimension
    }
    
    //MARK:----- IBAction -----

     @IBAction func popToLogin(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    
    @IBAction func actionForAgencyDropdown(_ sender: UIButton){
        self.view.endEditing(true)
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupRelationDropDown(imageView ?? UIImageView(), sender: sender)
        agencyDropDown.show()
    }
    
    @IBAction func actionForSignUp(_ sender: UIButton){
        if isValid() {
            apiForParentSignUp()
        }
    }
    
    //DropDown list for relation
    func setupRelationDropDown(_ imageView: UIImageView, sender: UIButton){
        let agencyNameList:[String] = agencyList.map{ ($0.agencyName ?? "") }
        agencyDropDown.anchorView = sender
        agencyDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        agencyDropDown.dataSource = agencyNameList
        agencyDropDown.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.parentUser.agencyName = item
            self?.parentUser.agencyID =  self?.agencyList[index].agencyId
            guard let agencyNameCell =  self?.signupTableView.cellForRow(at: IndexPath.init(row: 3, section: 0))  as? DropDownButtonCell, let agencyNameTextField = agencyNameCell.txtFieldForField  else { return }
            agencyNameTextField.text = item
            agencyNameTextField.isErrorRevealed = false
        }
        agencyDropDown.cancelAction = { [unowned self] in
            self.agencyDropDown.hide()
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //MARK:----- Validate Signup Data -----

    
    func isValid() -> Bool {
        var isValid = true
        
        guard let firstNameCell =  signupTableView.cellForRow(at: IndexPath.init(row: 0, section: 0))  as? DropDownTextFieldTableViewCell, let firstNameTextField = firstNameCell.txtFieldForField  else { return false }
        guard let LastNameCell =  signupTableView.cellForRow(at: IndexPath.init(row: 1, section: 0))  as? DropDownTextFieldTableViewCell, let lastNameTextField = LastNameCell.txtFieldForField  else { return false }
        guard let emailCell =  signupTableView.cellForRow(at: IndexPath.init(row: 2, section: 0))  as? DropDownTextFieldTableViewCell, let emailTextField = emailCell.txtFieldForField  else { return false }
        guard let agencyNameCell =  signupTableView.cellForRow(at: IndexPath.init(row: 3, section: 0))  as? DropDownButtonCell, let agencyNameTextField = agencyNameCell.txtFieldForField  else { return false }
        
        
        if let firstNameText = firstNameTextField.text, firstNameText.isEmpty {
            firstNameTextField.isErrorRevealed = true
            isValid = false
        }
        if let lastNameText = lastNameTextField.text, lastNameText.isEmpty {
            lastNameTextField.isErrorRevealed = true
            isValid = false
        }
        if  let emailText = emailTextField.text, emailText.isEmpty  {
            emailTextField.isErrorRevealed = true
            isValid = false
        }
        else if !(AlertManager.isValidEmail(testStr: emailTextField.text ?? "")) {
            isValid = false
            emailTextField.error = Macros.alertMessages.emailValid
            emailTextField.isErrorRevealed = true
        }
        if  let agencyText = agencyNameTextField.text, agencyText.isEmpty  {
            agencyNameTextField.isErrorRevealed = true
            isValid = false
        }
        
        if isValid {
            parentUser.firstName = firstNameTextField.text
            parentUser.lastName = lastNameTextField.text
            parentUser.emailId = emailTextField.text
        }
        
        return isValid
    }
    
    //MARK:----- API Calling Function -----
    
    func apiForAgencyList() {
        let service = LoginService()
        service.getAgencyList(with: self) { (result) in
            guard let receivedAgencies = result as? [Agency] else { return }
            self.agencyList = receivedAgencies
        }
    }
    
    func apiForParentSignUp() {
        let service = LoginService()
        service.signupParent(with: self, parendtData: parentUser) { (result) in
            let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
            _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: result as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                switch index {
                case 0:
                    self.navigationController?.popViewController(animated: true)
                default:
                    break
                }
            })
        }
    }
    
    
}

extension SignupVC: UITableViewDelegate,UITableViewDataSource {

    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return   Macros.ConstantArray.arrForSignUp.count + 1 // +1 is footer view
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 3:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        case 4:
            return customFooterViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func customFooterViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SignupFooterTVC, bundle: nil)
        signupTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SignupFooterTVC)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SignupFooterTVC) as? SignupFooterTVC {
            cell.signupButton.addTarget(self, action: #selector(actionForSignUp(_:)), for: .touchUpInside)
            cell.loginButton.addTarget(self, action: #selector(popToLogin(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        signupTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            let titleString =  Macros.ConstantArray.arrForSignUp[indexPath.row]
            let errorTitleString = Macros.ConstantArray.arrForSignUpErrors[indexPath.row]
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            cell.btnForField.addTarget(self, action: #selector(actionForAgencyDropdown(_:)), for: .touchUpInside)
            if let agencyName = parentUser.agencyName {
                cell.btnForField.setTitle(agencyName, for: .normal)
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.signupTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            let titleString = Macros.ConstantArray.arrForSignUp[indexPath.row]
            var errorTitleString = Macros.ConstantArray.arrForSignUpErrors[indexPath.row]
            // check for email
            if indexPath.row == 2, !cell.txtFieldForField.isEmpty {
                errorTitleString = Macros.alertMessages.emailValid
            }
            cell.txtFieldForField.delegate = self
            cell.setupUI(error: errorTitleString, title: titleString, index: indexPath.row)
            return cell
        }
        return UITableViewCell()
    }
    
    
    
}

extension SignupVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        switch textField.tag {
        case 0:
            parentUser.firstName = newString as  String
        case 1:
            parentUser.lastName = newString as  String
        case 2:
            parentUser.emailId = newString as  String
        default:
            print("Invalid case")
        }
        return true
    }
}
