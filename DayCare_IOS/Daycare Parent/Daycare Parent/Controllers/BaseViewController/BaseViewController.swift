//
//  BaseViewController.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import SpinKit
import DropDown

class BaseViewController: UIViewController {
    let appDelegate : AppDelegate = AppDelegate().sharedInstance()
    let spinner = RTSpinKitView.init(style: .styleChasingDots, color: colorCode.applicationColor)
    let viewForSpin = UIView()
    var dropDownforStudent = DropDown()

    override func viewDidLoad() {
        super.viewDidLoad()
//        if let StatusbarView = UIApplication.shared.value(forKey: "statusBar") as? UIView {
//            StatusbarView.backgroundColor = .clear
//        }
        self.loaderSetup()
        // Do any additional setup after loading the view.
    }
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
    func navigateToAddChild(){
        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboards.Dashboard, bundle: nil)
        if let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.NavigationVC) as? NavigationVC {
            navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.MyKidsVC)], animated: false)
            if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
                mainViewController.rootViewController   =   navigationController
                let window = UIApplication.shared.delegate!.window!!
                window.rootViewController   =   mainViewController
                UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
            }
        }
    }
    
    //get View Controller
    func getViewController(storyboardIdentifire:String,vcIdentifire:String) -> UIViewController {
        let storyboard = UIStoryboard.init(name: storyboardIdentifire, bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: vcIdentifire)
        return vc
    }
    
    func underlineButtonText(button: UIButton) {
        let underlineAttribute = [NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue , NSAttributedString.Key.font :  PlatformUtils.isPad ? (fonts.customButtonFontForPad ?? UIFont.systemFont(ofSize: 20)) : (fonts.customButtonFont ?? UIFont.systemFont(ofSize: 15)), NSAttributedString.Key.foregroundColor : colorCode.grayShadeColor] as [NSAttributedString.Key : Any]
        let buttonTitle = button.title(for: .normal) ?? ""
        let underlineAttributedString = NSAttributedString(string: buttonTitle, attributes: underlineAttribute)
        button.setAttributedTitle(underlineAttributedString, for: .normal)
    }
    
    //MARK:---- Loader functions ----
    func loaderSetup(){
        viewForSpin.frame = self.view.frame
        self.viewForSpin.addSubview(spinner ?? UIView())
        spinner?.spinnerSize = 70
        spinner?.center.x = self.view.center.x - 20
        spinner?.center.y = self.view.center.y - 20
        spinner?.sizeToFit()
        spinner?.isHidden = true
        spinner?.hidesWhenStopped = true
        viewForSpin.isUserInteractionEnabled = false
    }
    
    func showLoader() {
        addDullView()
        spinner?.startAnimating()
        spinner?.isHidden = false
        self.view.isUserInteractionEnabled = false
    }
    
    func hideLoader() {
        spinner?.stopAnimating()
        spinner?.isHidden = true
        self.view.isUserInteractionEnabled = true
        removeDullView()
    }
    
    func addDullView(){
        appDelegate.window?.addSubview(viewForSpin)
        viewForSpin.backgroundColor = colorCode.dullColoer
    }
    
    func removeDullView(){
        viewForSpin.backgroundColor = .clear
        viewForSpin.removeFromSuperview()
    }
    
    //MARK:---- Alert function ----
    func showAlert(with message:String) {
        AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: message, onViewController: self).view.tintColor = colorCode.applicationColor
    }
    
    //MARK:----- NavigationBar -----
    
    func setNavigationBar(title: String) {
        self.navigationController?.navigationBar.isHidden       = false
        self.setGradientColor()
        let menuButton = UIButton(type: .custom)
        menuButton.setImage(UIImage(named: "menu"), for: .normal)
        menuButton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        menuButton.addTarget(self, action: #selector(showMenu), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: menuButton)
        
        let titleLable = UILabel(frame: CGRect(x: 0, y: 0, width: 100, height: 30))
        titleLable.tintColor = .white
        titleLable.textColor = .white
        titleLable.text = title
        titleLable.font = fonts.navigationTitleFont
        let item2 = UIBarButtonItem(customView: titleLable)
        
        let swipeRight = UISwipeGestureRecognizer(target: self, action: #selector(showMenu))
        swipeRight.direction = UISwipeGestureRecognizer.Direction.right
        self.view.addGestureRecognizer(swipeRight)
        
        self.navigationItem.setLeftBarButtonItems([item1,item2], animated: true)
    }
    
    func setNavigationBarWithBackButton(title: String) {
        self.navigationController?.navigationBar.isHidden = false
        self.setGradientColor()
        let backButton = UIButton(type: .custom)
        backButton.setImage(UIImage(named: "back"), for: .normal)
        backButton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        backButton.addTarget(self, action: #selector(actionForBackButton), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: backButton)
        
        let titleLable = UILabel(frame: CGRect(x: 0, y: 0, width: 100, height: 30))
        titleLable.tintColor = .white
        titleLable.textColor = .white
        titleLable.text = title
        titleLable.font = fonts.navigationTitleFont
        let item2 = UIBarButtonItem(customView: titleLable)
        
        self.navigationItem.setLeftBarButtonItems([item1,item2], animated: true)
    }
    
    //MARK:----- Common functions -----

    func popViewController(message: String){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: message, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.navigationController?.popViewController(animated: true)
            default:
                break
            }
        })
    }
    
    //MARK:----- Navigation bar item Actions -----
    
    
    @objc func actionForBackButton(sender:UIButton){
        self.navigationController?.popViewController(animated: true)
    }
    
    @objc func showMenu(sender:Any){
        showLeftViewAnimated(sender)
        //        openLeftView(sender)
    }
    
    func setGradientColor(){
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = CGRect(x: 0, y: -50, width: self.navigationController?.navigationBar.bounds.width ?? 0, height: (self.navigationController?.navigationBar.bounds.height ?? 0 + 50))
        gradientLayer.colors = [colorCode.gradinetBottomColor.cgColor, colorCode.gradientTopColor.cgColor]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5) // Horizontal gradient start
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 0.5) // Horizontal gradient end
        
        UIGraphicsBeginImageContext(gradientLayer.bounds.size)
        gradientLayer.render(in: UIGraphicsGetCurrentContext()!)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        self.navigationController?.navigationBar.setBackgroundImage(image, for: UIBarMetrics.default)
    }
    
    func logoutTokenExpire(){
        DispatchQueue.main.async {
            let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
            _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.sessionExpired , buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                switch index {
                case 0:
                    UserDefaults.standard.removeObject(forKey: "isLogin")

                    self.navigateToLogin()
                default:
                    self.dismiss(animated: true, completion: nil)
                    break
                }
            })
        }
    }
    
    func navigateToLogin(){
        AppInstance.shared.selectedMenuIndex = 0
        AppInstance.shared.selectedChild = nil
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kUserDetails)
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kParentDetails)
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kAccessToken)
        AppInstance.shared.kUserDefault.removeObject(forKey: Macros.DefaultKeys.kUserDetails)
        AppInstance.shared.kUserDefault.removeObject(forKey: Macros.DefaultKeys.kParentDetails)
        AppInstance.shared.kUserDefault.removeObject(forKey: Macros.DefaultKeys.kAccessToken)
        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboards.Main, bundle: nil)
        let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.LoginNavigation) as? UINavigationController
        UIApplication.shared.keyWindow?.rootViewController = navigationController
    }
}
