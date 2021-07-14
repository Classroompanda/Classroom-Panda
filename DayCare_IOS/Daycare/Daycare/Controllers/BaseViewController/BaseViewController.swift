//
//  BaseViewControler.swift
//  iOSArchitecture
//
//  Created by Amit on 24/02/18.
//  Copyright © 2018 smartData. All rights reserved.
//

import Foundation
import UIKit
import DropDown
import SpinKit


class BaseViewController: UIViewController {
    
    let appDelegate : AppDelegate = AppDelegate().sharedInstance()
    let spinner = RTSpinKitView.init(style: .styleChasingDots, color: colorCode.applicationColor)
    let viewForSpin = UIView()
    let dropDownForMoreMenu = DropDown()

    
    
    //MARK:---- View functions ----
    override func viewDidLoad() {
        super.viewDidLoad()
        viewForSpin.frame = self.view.frame
        self.viewForSpin.addSubview(spinner ?? UIView())
        spinner?.spinnerSize = 70
        spinner?.center.x = self.view.center.x - 20
        spinner?.center.y = self.view.center.y - 20
        spinner?.sizeToFit()
        spinner?.isHidden = true
        spinner?.hidesWhenStopped = true
        viewForSpin.isUserInteractionEnabled = false
        
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidDisappear(_ animated: Bool) {
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
//        self.setNeedsStatusBarAppearanceUpdate()
    }
    //MARK:----- Functions -----
    
   
    
    func navigateToLogin(){
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kUserDetails)
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kisFirstLogin)
        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kTeacherDetails)
        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboard.Main, bundle: nil)
        let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.LoginNavigation) as? UINavigationController
        UIApplication.shared.keyWindow?.rootViewController = navigationController
    }
    
    //get View Controller
    func getViewController(storyboardIdentifire:String,vcIdentifire:String) -> UIViewController {
        let storyboard = UIStoryboard.init(name: storyboardIdentifire, bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: vcIdentifire)
        return vc
    }
    
    //MARK:---- Loader functions ----
    func showLoader() {
       addDullView()
        spinner?.startAnimating()
        spinner?.isHidden = false
//        self.view.isUserInteractionEnabled = false
    }
    
    func hideLoader() {
        spinner?.stopAnimating()
        spinner?.isHidden = true
//        self.view.isUserInteractionEnabled = true
        removeDullView()
    }
    
    func addDullView(){
        appDelegate.window?.addSubview(viewForSpin)
        viewForSpin.backgroundColor = colorCode.dullColoer
        viewForSpin.isUserInteractionEnabled = false
    }
    
    func removeDullView(){
        viewForSpin.backgroundColor = .clear
        viewForSpin.removeFromSuperview()
        viewForSpin.isUserInteractionEnabled = true
    }
    
     //MARK:---- Alert function ----
    func showAlert(with message:String) {
        AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: message, onViewController: self).view.tintColor = colorCode.applicationColor
    }
 
    //MARK:----- NavigationBar -----

    func setNavigationBar(title: String) {
        self.navigationController?.navigationBar.isHidden       = false
        self.navigationController?.navigationBar.barTintColor   = colorCode.applicationColor
        self.navigationController?.navigationBar.tintColor      = .white
   
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
        
        let moreButton = UIButton(type: .custom)
        moreButton.setImage(UIImage(named: "more"), for: .normal)
        moreButton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        self.setupMenuDropDown(moreButton)
        moreButton.addTarget(self, action: #selector(actionForMoreButton), for: .touchUpInside)
        
        self.navigationItem.setRightBarButton(UIBarButtonItem.init(customView: moreButton), animated: true)
        let swipeRight = UISwipeGestureRecognizer(target: self, action: #selector(showMenu))
        swipeRight.direction = UISwipeGestureRecognizer.Direction.right
        self.view.addGestureRecognizer(swipeRight)
        
        self.navigationItem.setLeftBarButtonItems([item1,item2], animated: true)
    }
    
    func setNavigationBarWithBackButton(title: String) {
        self.navigationController?.navigationBar.isHidden       = false
        self.navigationController?.navigationBar.barTintColor   = colorCode.applicationColor
        self.navigationController?.navigationBar.tintColor      = .white
        
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
    
    //MARK:----- Navigation bar item Actions -----
    @objc func actionForMoreButton(){
        dropDownForMoreMenu.show()
    }
    
    @objc func actionForBackButton(sender:UIButton){
        self.navigationController?.popViewController(animated: true)
    }
    
    @objc func showMenu(sender:Any){
        showLeftViewAnimated(sender)
//        openLeftView(sender)
    }
    
    //Dropdown list For Country
    func setupMenuDropDown(_ sender: UIButton){
        dropDownForMoreMenu.anchorView = sender
        dropDownForMoreMenu.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForMoreMenu.width = 150
        dropDownForMoreMenu.dataSource = Macros.ConstantArray.arrForMoreMenu
        dropDownForMoreMenu.selectionAction = { [weak self] (index, item) in
            print(item)
            switch index {
            case 0:
                let vc = self?.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.ProfileVC) as! ProfileVC
                self?.navigationController?.pushViewController(vc, animated: true)
            case 1:
//                self?.showAlert(with: Macros.alertMessages.inProgress)
                self?.actionForTeacherBreakout(isBreakIn: false)
            case 2:
//                self?.showAlert(with: Macros.alertMessages.inProgress)
                self?.clockedOut()
//            case 3:
//                self?.showAlert(with: Macros.alertMessages.inProgress)
            default:
                print("Invalid Case")
            }
        }
        dropDownForMoreMenu.cancelAction = { [unowned self] in
        }
    }
    
    func actionForTeacherBreakout(isBreakIn: Bool) {
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboard.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.TeacherBreakOutPopupVC) as! TeacherBreakOutPopupVC
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:250,height:250)
        popoverContent.isBreakIn = isBreakIn
        popoverContent.delegate = self
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //Break out Function
    func breakOut(){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.breakOut , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.actionForTeacherBreakout(isBreakIn: true)
//                self.dismiss(animated: true, completion: nil)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    //clockOut Function
    func clockedOut(){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.clockOut , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForClockOut()
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    //MARK:----- API Calling Function -----
    func apiCallForClockOut(){
        let service = DashboarService()
        service.teacherClockInClockOut(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: 0, classesID: 0, attendenceStatusID: (AppInstance.shared.user?.teacherTodayAttendenceStatusId == 0) ? ClockInStatus.clockedIn : ClockInStatus.clockedOut, teacherID: AppInstance.shared.user?.releventUserID ?? 0, time: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), attendanceDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()),updatedBy:  AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                self.navigateToLogin()
            }
        }
    }
    
    func apiCallForTeacherBreakStatus(teacherBreak: TeacherBreakLog){
        let service = DashboarService()
        
        print("\(AppInstance.shared.user?.teacherTodayAttendenceId)")
        teacherBreak.teacherDailyAttendenceID = AppInstance.shared.user?.teacherTodayAttendenceId ?? 0
        print("\(teacherBreak.teacherDailyAttendenceID)")
                //teacherBreak.setValue(AppInstance.shared.user?.teacherTodayAttendenceId ?? 0, forKey: "teacherDailyAttendenceID")
        let param = teacherBreak.dictionaryRepresentation()
       print("\(param)")
        service.teacherBreakInOut(with: self, param: param) { (result) in
            if result != nil {
                if let id = result as? Int {
                    if id > 0 {
                        AppInstance.shared.teacherBreak?.id = id
                        if teacherBreak.breakStatusID == teacherBreakStatus.BreakOut {
                            AppInstance.shared.teacherBreak?.breakStatusID = teacherBreakStatus.BreakOut
                            DispatchQueue.main.async {
                                self.actionForTeacherBreakout(isBreakIn: true)
                            }
                        }
                    }
                }
            }
        }
    }
}

//MARK:----- Teacher BreakIn/Out Popover Delegatge -----
extension BaseViewController : UIPopoverPresentationControllerDelegate,TeacherBreakDelegate {
    
    func submitBreakButtonAction(teacherBreak: TeacherBreakLog) {
        self.apiCallForTeacherBreakStatus(teacherBreak: teacherBreak)
        if teacherBreak.breakIn != nil {
        NotificationCenter.default.post(name: NSNotification.Name.init(rawValue: "breakIn"), object: nil)
        }
    }
    
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}
