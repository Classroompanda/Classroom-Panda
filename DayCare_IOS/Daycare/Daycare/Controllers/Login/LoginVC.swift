//
//  LoginVC.swift
//  Daycare
//
//  Created by amrut waghmare on 30/11/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class LoginVC: BaseViewController {

//MARK: ----- @IBOutlets -----
    
    @IBOutlet weak var txtFieldForUsername: CustomLoginTextField!
    @IBOutlet weak var txtFieldForPassword: CustomLoginTextField!
    @IBOutlet weak var viewForImageCircle: UIView!
    @IBOutlet weak var btnForForgotPass: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        UIApplication.shared.statusBarStyle = .lightContent
        self.setNeedsStatusBarAppearanceUpdate()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    func initialSetup(){
        viewForImageCircle.cornerRadius =  UIDevice.current.userInterfaceIdiom == .pad ? 125.0 : viewForImageCircle.bounds.size.width / 2
        viewForImageCircle.layer.masksToBounds = true
        setTextFieldIcons()
        setUpForgotPassword()
    }
    
   
    
// MARK: ----- @IBAction -----
    @IBAction func actionForLogin(_ sender: Any) {
        if isValidate() {
            self.apiForLogin()
        }
    }
    
    @IBAction func actionForForgotPassword(_ sender: Any) {
        if let viewController = self.storyboard?.instantiateViewController(withIdentifier:Macros.Identifiers.Controller.ForgotPasswordVC) as? ForgotPasswordVC {
            self.navigationController?.pushViewController(viewController, animated: true)
        }
    }
    
//MARK: ----- Functions -----
    func navigateToDashboard(){
        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboard.Dashboard, bundle: nil)
        if let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.NavigationVC) as? NavigationVC {
            navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.DashboardVC)], animated: false)
            if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
                mainViewController.rootViewController   =   navigationController
                let window = UIApplication.shared.delegate!.window!!
                window.rootViewController   =   mainViewController
                UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
            }
        }
    }

    func setTextFieldIcons(){
        let imgViewForUsername = UIImageView()
        let imgForUsername = UIImage(named: "user1")
        imgViewForUsername.image = imgForUsername
        txtFieldForUsername.leftView = imgViewForUsername
        txtFieldForUsername.placeholder = "       Username"
        
        let imgViewForPassword = UIImageView()
        let imgForPassword = UIImage(named: "lockP")
        imgViewForPassword.image = imgForPassword
        txtFieldForPassword.leftView = imgViewForPassword
        txtFieldForPassword.placeholder = "       Password"
    }
    
    func setUpForgotPassword() {
        let underlineAttribute = [NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue , NSAttributedString.Key.font :  PlatformUtils.isPad ? (fonts.customLoginButtonPadFont ?? UIFont.systemFont(ofSize: 20)) : (fonts.customLoginButtonFont ?? UIFont.systemFont(ofSize: 15)), NSAttributedString.Key.foregroundColor : colorCode.selectedButtonColor] as [NSAttributedString.Key : Any]
        let underlineAttributedString = NSAttributedString(string: "Forgot Password?", attributes: underlineAttribute)
        btnForForgotPass.setAttributedTitle(underlineAttributedString, for: .normal)
    }
    
    //MARK:----- API Calling Function -----
    func apiForLogin(){
        let service = LoginService()
//        self.showLoader()
        //        AppInstance.shared.kUserDefault.value(forKey: Macros.kDeviceToken) as? String ?? ""
        service.loginTeacher(with: self, emailAddress: self.txtFieldForUsername.text!, password: self.txtFieldForPassword.text!) { (result) in
            if result != nil {
                AppInstance.shared.user = result as? User
                AppInstance.shared.user?.password = self.txtFieldForPassword.text!
                if AppInstance.shared.user?.teacherTodayAttendenceStatusId == ClockInStatus.clockedOut {
                    self.hideLoader()
                    self.showAlert(with: Macros.alertMessages.clockOutAlert)
                } else {
                    AppInstance.shared.kUserDefault.setValue(AppInstance.shared.user?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kUserDetails)
                    self.apiCallForGetTeacherInformation()
                }
            }
        }
    }
    
    func apiCallForGetTeacherInformation(){
        self.showLoader()
        let service = ProfileService()
        service.getTeacherInformation(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherId: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                AppInstance.shared.teacher = result as? Teacher ?? Teacher()
                AppInstance.shared.kUserDefault.setValue(AppInstance.shared.teacher?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kTeacherDetails)
                self.apiCallForTeacherBreakStatus()
//                self.navigateToDashboard()
            }
        }
    }
    
    func apiCallForTeacherBreakStatus(){
        let service = DashboarService()
        service.teacherCurrentBreakStatus(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), teacherID: AppInstance.shared.teacher?.id ?? 0, teacherDailyAttendanceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0) { (result) in
            AppInstance.shared.teacherBreak = result as? TeacherBreakLog
             self.navigateToDashboard()
            self.hideLoader()
        }
    }
    
    //Validation Function
    func isValidate() -> Bool{
        if txtFieldForUsername.text! != "" , txtFieldForPassword.text != "" {
                if !AlertManager.isValidEmail(testStr: txtFieldForUsername.text!) {
                    self.showAlert(with: Macros.alertMessages.emailValid)
                    return false
                } else {
                    return true
                }
        } else {
            self.showAlert(with: Macros.alertMessages.mandatoryFields)
            return false
        }
    }
}
