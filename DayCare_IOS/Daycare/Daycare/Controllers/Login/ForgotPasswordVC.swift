//
//  ForgotPasswordVC.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class ForgotPasswordVC: BaseViewController {
    
    //MARK: ----- @IBOutlets -----
    @IBOutlet weak var txtFieldForUsername: CustomLoginTextField!
    @IBOutlet weak var viewForImageCircle: UIView!
    @IBOutlet weak var btnForBackToLogin: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setTextFieldIcons()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        viewForImageCircle.cornerRadius =  UIDevice.current.userInterfaceIdiom == .pad ? 125.0 : viewForImageCircle.bounds.size.width / 2
        viewForImageCircle.layer.masksToBounds = true
        let underlineAttribute = [NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue , NSAttributedString.Key.font : PlatformUtils.isPad ? (fonts.customLoginButtonPadFont ?? UIFont.systemFont(ofSize: 20)) : (fonts.customLoginButtonFont ?? UIFont.systemFont(ofSize: 15)), NSAttributedString.Key.foregroundColor : colorCode.selectedButtonColor] as [NSAttributedString.Key : Any]
        let underlineAttributedString = NSAttributedString(string: "Back To Login", attributes: underlineAttribute)
        self.btnForBackToLogin.setAttributedTitle(underlineAttributedString, for: .normal)
    }
    

// MARK: ----- @IBAction -----
    @IBAction func actionForSubmit(_ sender: Any) {
        if !AlertManager.isValidEmail(testStr: txtFieldForUsername.text!) {
            self.showAlert(with: Macros.alertMessages.emailValid)
        } else {
            self.apiCallForForgotPassword()
        }
    }
    @IBAction func actionForBackToLogin(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    
    func setTextFieldIcons(){
        let imgViewForUsername = UIImageView()
        let imgForUsername = UIImage(named: "user1")
        imgViewForUsername.image = imgForUsername
        txtFieldForUsername.leftView = imgViewForUsername
        txtFieldForUsername.placeholder = "      Enter email id"
    }
    
    func apiCallForForgotPassword(){
        let service = LoginService()
        service.teacherForgotPassword(with: self, emailAddress: self.txtFieldForUsername.text!) { (result) in
            if result as? String != nil {
                self.txtFieldForUsername.text = ""
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
