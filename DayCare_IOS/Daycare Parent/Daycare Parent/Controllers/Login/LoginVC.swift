//
//  LoginVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import Material
class LoginVC: BaseViewController {
    
    @IBOutlet weak var txtFieldForUsername: CustomLoginTextField!
    @IBOutlet weak var txtFieldForPassword: CustomLoginTextField!
    @IBOutlet weak var btnForForgotPass: UIButton!
    @IBOutlet private weak var signupButton: UIButton!
    @IBOutlet weak var viewForImageCircle: UIView!
    
//    var a:Int?
    var backgroundTask: UIBackgroundTaskIdentifier = UIBackgroundTaskIdentifier.invalid
    override func viewDidLoad() {
        super.viewDidLoad()
        self.checkIsAlreadyLogin()
        // Do any additional setup after loading the view.
    }
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    // MARK: ----- @IBAction -----
    
    @IBAction func actionForLogin(_ sender: Any) {
        if isValidate() {
            self.apiForLogin()
        }
    }
    
    @IBAction func actionForForgotPassword(_ sender: Any) {
        if let viewController = self.storyboard?.instantiateViewController(withIdentifier:Macros.Identifiers.Controllers.ForgotPasswordVC) as? ForgotPasswordVC {
            self.navigationController?.pushViewController(viewController, animated: true)
        }
    }
    
    @IBAction private func actionForSignup(_ sender: Any) {
        if let viewController = self.storyboard?.instantiateViewController(withIdentifier:Macros.Identifiers.Controllers.SignupVC) as? SignupVC {
            self.navigationController?.pushViewController(viewController, animated: true)
        }
    }
    
    func initialSetup(){
        viewForImageCircle.cornerRadius =  UIDevice.current.userInterfaceIdiom == .pad ? 125.0 : viewForImageCircle.bounds.size.width / 2
        viewForImageCircle.layer.masksToBounds = true
        setTextFieldIcons()
        underlineButtonText(button: btnForForgotPass)
        underlineButtonText(button: signupButton)
    }
    
    func checkIsAlreadyLogin(){
        if  AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kUserDetails) != nil && AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kParentDetails) != nil {
            if let dictForUserDetail = AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kUserDetails) as? Dictionary<String,Any> {
                AppInstance.shared.user = User.init(dictionary: dictForUserDetail)
            }
            if let dictForParentDetail = AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kParentDetails) as? Dictionary<String,Any> {
                AppInstance.shared.parent = Parent.init(dictionary: dictForParentDetail)
            }
            if let accessToken = AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kAccessToken) as? String {
                AppInstance.shared.accessToken = accessToken
            }
            if (AppInstance.shared.user?.childCount == 0 || AppInstance.shared.user?.childCount == nil) {
                self.navigateToAddChild()
            } else {
                let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.ChildListVC) as! ChildListVC
                self.navigationController?.pushViewController(vc, animated: false)
            }
        }
    }
    
    func setTextFieldIcons(){
        let imgViewForUsername = UIImageView()
        let imgForUsername = UIImage(named: "user")
        imgViewForUsername.image = imgForUsername
        txtFieldForUsername.leftView = imgViewForUsername
        txtFieldForUsername.placeholder = "       Username"
        
        let imgViewForPassword = UIImageView()
        let imgForPassword = UIImage(named: "lockP")
        imgViewForPassword.image = imgForPassword
        txtFieldForPassword.leftView = imgViewForPassword
        txtFieldForPassword.placeholder = "       Password"
        
        self.txtFieldForUsername.error = Macros.alertMessages.email
        self.txtFieldForPassword.error = Macros.alertMessages.password
    }

 
    
    func isValidate() -> Bool{
        if txtFieldForUsername.text == "" || txtFieldForUsername.text == nil {
            self.txtFieldForUsername.isErrorRevealed = true
            return false
        } else if !AlertManager.isValidEmail(testStr: txtFieldForUsername.text!) {
            self.txtFieldForUsername.error = Macros.alertMessages.emailValid
            self.txtFieldForUsername.isErrorRevealed = true
            return false
        } else if txtFieldForPassword.text == "" || txtFieldForPassword.text == nil {
            self.txtFieldForPassword.isErrorRevealed = true
            return false
        } else {
            return true
        }
    }
    //MARK:----- API Calling Function -----
    
    func apiForLogin(){
        let service = LoginService()
        service.loginTeacher(with: self, emailAddress: self.txtFieldForUsername.text!, password: self.txtFieldForPassword.text!) { (result) in
            if result != nil {
                AppInstance.shared.user = result as? User
                AppInstance.shared.user?.password = self.txtFieldForPassword.text!
                 AppInstance.shared.kUserDefault.setValue( AppInstance.shared.user?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kUserDetails)
                self.apiForParentInformation()
            }
        }
    }
    
    func apiForParentInformation(){
        let service = LoginService()
        service.getParentInformation(with: self, agencyId: AppInstance.shared.user?.agencyID ?? 0, parentId: AppInstance.shared.user?.releventUserID ?? 0, isParent: AppInstance.shared.user?.isParent ?? false, isSecondaryParent: AppInstance.shared.user?.isSecondaryParent ?? false, isGuardian: AppInstance.shared.user?.isGaurdian ?? false) { (result) in
            if result != nil {
                AppInstance.shared.parent = result as? Parent
                AppInstance.shared.kUserDefault.setValue( AppInstance.shared.parent?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kParentDetails)
              SignalRConnection.sharedInstance.startConnection(currentUser: AppInstance.shared.user ?? User())
                if (AppInstance.shared.user?.childCount == 0 || AppInstance.shared.user?.childCount == nil) {
                    self.navigateToAddChild()
                } else {                  
                    let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.ChildListVC) as! ChildListVC
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            }
        }
    }

}

//MARK:----- UITextField Delegate ------
extension LoginVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        return true
    }
}
