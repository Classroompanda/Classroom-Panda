//
//  LeftMenuTableVC.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

enum LeftMenu: Int {
  case Dashboard = 0
  case Child_Activity
  case Attendance
  case Meal_Planner
  case Message
  case Incident
  case Enrollment_History
  case Payment_History
  case Ach_Payment
  case Add_Child
  case Profile
  case Log_Out
}

class LeftMenuTableVC: UITableViewController {
  var messageCount = 0
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.initialSetup()
  }
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
  }
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillAppear(animated)
  }
  func initialSetup() {
    
    self.tableView.register(UINib(nibName: Macros.Identifiers.Cells.LeftSideMenuTableViewCell, bundle: nil), forCellReuseIdentifier: Macros.Identifiers.Cells.LeftSideMenuTableViewCell)
    self.navigationController?.navigationBar.isHidden = true
    self.tableView.separatorStyle   = .none
    self.tableView.bounces = false
    self.tableView.backgroundColor  = colorCode.applicationColor
    let swipeRight = UISwipeGestureRecognizer(target: self, action: #selector(hideMenu))
    swipeRight.direction = UISwipeGestureRecognizer.Direction.left
    self.view.addGestureRecognizer(swipeRight)
    self.tableView.showsHorizontalScrollIndicator = false
    self.tableView.showsVerticalScrollIndicator = false
    
  }
  
  //MARK: ----------SignalR Message Count hndling--------------
  override func showLeftView(_ sender: Any?) {
    showSideBar()
  }
  override func hideLeftView(_ sender: Any?) {
    hideSideBar()
  }
  func showSideBar() {
    apiCallUnreadMessageCount()
    signalRChatNotification()
    messageCount = 0
    tableView.reloadRows(at: [IndexPath(row: 4, section: 0)], with: .none)
  }
  func hideSideBar()
  {
    messageCount = 0
    NotificationCenter.default.removeObserver(self, name: NSNotification.Name(kMessageReceiveNotification), object: nil)
    self.tableView.reloadRows(at: [IndexPath(row: 4, section: 0)], with: .automatic)
  }
  func signalRChatNotification()
  {
    NotificationCenter.default.addObserver(self, selector: #selector(signalRChatMessageReceived), name: NSNotification.Name(kMessageReceiveNotification), object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(signalRChatReconnect), name: NSNotification.Name(kChatCoonectionFailNotification), object: nil)
     NotificationCenter.default.addObserver(self, selector: #selector(apiCallUnreadMessageCount), name: UIApplication.didBecomeActiveNotification, object: nil)
  }
 @objc func apiCallUnreadMessageCount()
  {
    let service = MessageService()
    service.getAllUnreadMessagesCount(with: nil, userID: AppInstance.shared.user?.loginUserID ?? 0) {(result) in
      if result != nil {
        guard let messageObject = result as? [String:Any] else {return}
        if let messageCount = messageObject["totalRows"] as? Int {
          self.messageCount = messageCount
        }
        else
        {
          self.messageCount = 0
        }
        }
        UIApplication.shared.applicationIconBadgeNumber = self.messageCount
        
        self.tableView.reloadRows(at: [IndexPath(row: 4, section: 0)], with: .automatic)
    }
  }
  @objc func signalRChatReconnect(_ notification: Notification)
  {
    SignalRConnection.sharedInstance.startConnection(currentUser: AppInstance.shared.user ?? User())
  }
  @objc func signalRChatMessageReceived(_ notification: Notification)
  {
    messageCount = messageCount + 1
    tableView.reloadRows(at: [IndexPath(row: 4, section: 0)], with: .none)
  }
  
  
  //MARK: ---------- status bar methods:----------
  @objc func hideMenu(sender:Any){
    hideLeftViewAnimated(sender)
    //        openLeftView(sender)
  }
  
  override var prefersStatusBarHidden: Bool {
    return true
  }
  
  override var preferredStatusBarStyle: UIStatusBarStyle {
    return .default
  }
  
  override var preferredStatusBarUpdateAnimation: UIStatusBarAnimation {
    for i in 0..<Macros.ConstantArray.arrForSideMenuTitle.count{
        tableView.reloadRows(at: [IndexPath(row: i, section: 0)], with: .automatic)
    }
    return .fade
  }
  
  override func showLeftViewAnimated(_ sender: Any?) {
    
  }
  override func showRightViewAnimated(_ sender: Any?) {
    
  }
  //MARK:----- API Calling Function -----
  func apiCallForGetTeacherInformation(){
  }
  
  
  // MARK: - Table view data source
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // #warning Incomplete implementation, return the number of rows
    return Macros.ConstantArray.arrForSideMenuTitle.count
  }
  
  override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    if let userHeaderView = Bundle.main.loadNibNamed(Macros.Identifiers.Cells.LeftSideMenuHeaderCell, owner: nil, options: nil)?[0] as? LeftSideMenuHeaderCell {
      
      userHeaderView.backgroundColor = colorCode.applicationColor
      userHeaderView.lblForName.text = " \(AppInstance.shared.parent?.firstName ?? "") \(AppInstance.shared.parent?.lastName ?? "")"
      userHeaderView.lblForEmail.text = AppInstance.shared.parent?.emailId
      userHeaderView.imgViewForProfile.sd_setShowActivityIndicatorView(true)
      userHeaderView.imgViewForProfile.sd_setIndicatorStyle(.gray)
      userHeaderView.imgViewForProfile.sd_setImage(with: URL(string: AppInstance.shared.parent?.imagePath ?? "")) { (image, error, type, url) in
        if error != nil {
          userHeaderView.imgViewForProfile.image = UIImage(named: "placeholder")
        }
      }
      return userHeaderView
    }
    return UIView()
  }
  
  override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
    return 202.0
  }
  
  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.LeftSideMenuTableViewCell) as? LeftSideMenuTableViewCell {
      if AppInstance.shared.user?.isGaurdian ?? false {
        if indexPath.row == 9 {
          cell.btnForTitle.setTitle(Macros.ControllerString.childList, for: .normal)
        } else {
          cell.btnForTitle.setTitle(Macros.ConstantArray.arrForSideMenuTitle[indexPath.row], for: .normal)
        }
      } else {
        cell.btnForTitle.setTitle(Macros.ConstantArray.arrForSideMenuTitle[indexPath.row], for: .normal)
      }
      
      cell.lblMessageCount.isHidden = true
      cell.lblMessageCount.text = ""
      if indexPath.row == 4
      {
        if messageCount > 0
        {
          cell.lblMessageCount.isHidden = false
          cell.lblMessageCount.text = "\(messageCount)"
        }
      }
      
      cell.btnForTitle.setImage(UIImage(named: Macros.ConstantArray.arrForSideMenuTitle[indexPath.row]), for: .normal)
      if indexPath.row == 8 { // Payment History and ACH payment have same icons
        cell.btnForTitle.setImage(UIImage(named: Macros.ConstantArray.arrForSideMenuTitle[indexPath.row - 1]), for: .normal)
      }
      cell.btnForTitle.tag = indexPath.row
      cell.selectionStyle = .none
      cell.backgroundColor = AppInstance.shared.selectedMenuIndex == indexPath.row ? colorCode.cellSelectedColor : .clear
      return cell
    }
    return UITableViewCell()
  }
  
  override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return UIDevice.current.userInterfaceIdiom == .pad ? 70 : 55
  }
  
  override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    if let menu = LeftMenu(rawValue: indexPath.row) {
      self.changeViewController(menu, tableView: tableView, indexPath: indexPath)
    }
  }
  
  //MARK:----- Functions -----z
  func changeViewController(_ menu: LeftMenu, tableView: UITableView, indexPath: IndexPath) {
    
    let storyboard = UIStoryboard(name: Macros.Identifiers.Storyboards.Dashboard, bundle: nil)
    let navigationController = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.NavigationVC) as! UINavigationController
    if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
      if menu == .Payment_History {
        if !(AppInstance.shared.user?.isGaurdian ?? false) {
          cell.backgroundColor = colorCode.cellSelectedColor
          AppInstance.shared.selectedMenuIndex = indexPath.row
        }
      } else {
        cell.backgroundColor = colorCode.cellSelectedColor
        AppInstance.shared.selectedMenuIndex = indexPath.row
      }
    }
    switch menu {
    case .Dashboard:
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.DashboardVC) as? DashboardVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    //            showOkAlert()
    case .Child_Activity:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.ChildActivityVC) as? ChildActivityVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Attendance:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AttendanceVC) as? AttendanceVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Meal_Planner:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.MealPlannerVC) as? MealPlannerVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Message:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.MessageVC) as? MessageVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Incident:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.IncidentVC) as? IncidentVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Enrollment_History:
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.EnrollmentHistoryVC) as? EnrollmentHistoryVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Payment_History:
      if (AppInstance.shared.user?.isGaurdian ?? false) {
        showOkAlert()
      } else {
        if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.PaymentHistoryVC) as? PaymentHistoryVC {
          navigationController.setViewControllers([vc], animated: false)
          if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
            mainViewController.rootViewController = navigationController
            let window = UIApplication.shared.delegate!.window!!
            window.rootViewController  =   mainViewController
            UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
          }
        }
      }
    case .Ach_Payment:
      if (AppInstance.shared.user?.isGaurdian ?? false) {
        showOkAlert()
      } else {
        let paymentStoryboard = UIStoryboard(name: Macros.Identifiers.Storyboards.Payment, bundle: nil)
        
        if let vc = paymentStoryboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.ACHPaymentVC) as? ACHPaymentVC {
          navigationController.setViewControllers([vc], animated: false)
          if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
            mainViewController.rootViewController = navigationController
            let window = UIApplication.shared.delegate!.window!!
            window.rootViewController  =   mainViewController
            UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
          }
        }
      }
      
    case .Add_Child:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.MyKidsVC) as? MyKidsVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Profile:
      //            showOkAlert()
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.ProfileVC) as? ProfileVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
    case .Log_Out:
      self.logoutUser()
    }
  }
  
  //Logout Function
  func logoutUser(){
    let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
    let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
    _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.logout , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
      switch index {
      case 0:
        UserDefaults.standard.removeObject(forKey: "isLogin")
        self.navigateToLogin()
      case 1:
        self.dismiss(animated: true, completion: nil)
      default:
        break
      }
    })
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
  
  func showOkAlert(){
    _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.unauthorizedUser, onViewController: self)
  }
}
