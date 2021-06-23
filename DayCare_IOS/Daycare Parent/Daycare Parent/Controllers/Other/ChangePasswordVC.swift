//
//  ChangePasswordVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 07/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import Material
class ChangePasswordVC: BaseViewController {
    @IBOutlet weak var txtFieldForOldPassword: CustomLoginTextField!
    @IBOutlet weak var txtFieldForConfirmPassword: CustomLoginTextField!
    @IBOutlet weak var txtFieldForNewPassword: CustomLoginTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.changePassword)
        self.txtFieldForOldPassword.error = Macros.alertMessages.oldPassword
        self.txtFieldForNewPassword.error = Macros.alertMessages.validNewPassword
        self.txtFieldForConfirmPassword.error = Macros.alertMessages.validConfirmPassword
        // Do any additional setup after loading the view.
    }

    @IBAction func actionForSubmit(_ sender: Any) {
        if isValidate() {
            apiCallForUpdatePasswordPassword()
        }
    }
    
    
    
    func isValidate() -> Bool{
        if txtFieldForOldPassword.text == "" || txtFieldForOldPassword.text == nil {
            self.txtFieldForOldPassword.isErrorRevealed = true
            return false
        } else if (txtFieldForNewPassword.text?.length() ?? 0) < 6 {
//            else if !AlertManager.isValidPassword(value: txtFieldForNewPassword.text!)
            self.txtFieldForNewPassword.isErrorRevealed = true
            return false
        } else if txtFieldForNewPassword.text != txtFieldForConfirmPassword.text {
            self.txtFieldForConfirmPassword.isErrorRevealed = true
            return false
        } else if AppInstance.shared.user?.password != self.txtFieldForOldPassword.text {
            self.showAlert(with: Macros.alertMessages.coorectPassword)
            return false
        } else {
            return true
        }
    }
    
    
    //MARK:---- API Calling Function ----
    func apiCallForUpdatePasswordPassword(){
        let service = LoginService()
        service.updatePassword(with: self, emailAddress: AppInstance.shared.user?.emailAddress ?? "", password: self.txtFieldForNewPassword.text!) { (result) in
            if result as? String != nil {
                AppInstance.shared.user?.password = self.txtFieldForNewPassword.text!
                self.txtFieldForNewPassword.text = ""
                self.txtFieldForOldPassword.text = ""
                self.txtFieldForConfirmPassword.text = ""
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
}

//MARK:----- UITextField Delegate ------
extension ChangePasswordVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        return true
    }
}
