//
//  ForgotPasswordVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ForgotPasswordVC: BaseViewController {

    @IBOutlet weak var txtFieldForUsername: CustomLoginTextField!
    @IBOutlet weak var viewForImageCircle: UIView!
    @IBOutlet weak var btnForBackToLogin: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setTextFieldIcons()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    //MARK:----- @IBActions ------
    @IBAction func actionForSubmit(_ sender: Any) {
        if !AlertManager.isValidEmail(testStr: txtFieldForUsername.text!) {
            _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.emailValid, onViewController: self)
            self.showAlert(with: Macros.alertMessages.emailValid)
        } else {
            self.apiCallForForgotPassword()
        }
    }
    @IBAction func actionForBackToLogin(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    
    func initialSetup(){
        viewForImageCircle.cornerRadius = PlatformUtils.isPad ? 125.0 : viewForImageCircle.bounds.size.width / 2
        viewForImageCircle.layer.masksToBounds = true
        let underlineAttribute = [NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue , NSAttributedString.Key.font : PlatformUtils.isPad ? (fonts.customButtonFontForPad ?? UIFont.systemFont(ofSize: 20)) : (fonts.customButtonFont ?? UIFont.systemFont(ofSize: 15)), NSAttributedString.Key.foregroundColor : colorCode.grayShadeColor] as [NSAttributedString.Key : Any]
        let underlineAttributedString = NSAttributedString(string: "Back To Login", attributes: underlineAttribute)
        self.btnForBackToLogin.setAttributedTitle(underlineAttributedString, for: .normal)
    }

    func setTextFieldIcons(){
        let imgViewForUsername = UIImageView()
        let imgForUsername = UIImage(named: "user")
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
