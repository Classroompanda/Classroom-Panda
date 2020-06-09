//
//  LeftMenuTableVC.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage


class LeftMenuTableVC: UITableViewController {
  var messageCount = 0
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.initialSetup()
  }
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillAppear(animated)
  }
  
  func initialSetup() {
    apiCallForGetTeacherInformation()
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
  
  //MARK: ----------SignalR Message Count handling--------------
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
  }
  @objc func signalRChatReconnect(_ notification: Notification)
   {
    SignalRConnection.sharedInstance.startConnection(currentUser: AppInstance.shared.user ?? User())
  }
  func apiCallUnreadMessageCount()
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
      self.tableView.reloadRows(at: [IndexPath(row: 6, section: 0)], with: .automatic)
    }
  }
  @objc func signalRChatMessageReceived(_ notification: Notification)
  {
    messageCount = messageCount + 1
      tableView.reloadRows(at: [IndexPath(row: 6, section: 0)], with: .none)
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
  
  //MARK:----- API Calling Function -----
  func apiCallForGetTeacherInformation(){
    let service = ProfileService()
    service.getTeacherInformation(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherId: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
      if result != nil {
        AppInstance.shared.teacher = result as? Teacher ?? Teacher()
        AppInstance.shared.kUserDefault.setValue(AppInstance.shared.teacher?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kTeacherDetails)
      }
      self.tableView.reloadData()
    }
  }
  
  
  // MARK: - Table view data source
  
  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // #warning Incomplete implementation, return the number of rows
    return Macros.ConstantArray.arrForSideMenuTitle.count
  }
  
  override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    if let userHeaderView = Bundle.main.loadNibNamed(Macros.Identifiers.Cells.LeftSideMenuHeaderCell, owner: nil, options: nil)?[0] as? LeftSideMenuHeaderCell {
      
      userHeaderView.backgroundColor = colorCode.applicationColor
      userHeaderView.lblForName.text = AppInstance.shared.teacher?.teacherName
      userHeaderView.lblForEmail.text = AppInstance.shared.teacher?.email
      userHeaderView.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray
      
      //            userHeaderView.imgViewForProfile.sd_setShowActivityIndicatorView(true)
      //            userHeaderView.imgViewForProfile.sd_setIndicatorStyle(.gray)
      userHeaderView.imgViewForProfile.sd_setImage(with: URL(string: AppInstance.shared.teacher?.imagePath ?? "")) { (image, error, type, url) in
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
      let btnTitle = Macros.ConstantArray.arrForSideMenuTitle[indexPath.row]
      cell.lblMessageCount.isHidden = true
      cell.lblMessageCount.text = ""
      if indexPath.row == 6
      {
        if messageCount > 0
        {
          cell.lblMessageCount.isHidden = false
          cell.lblMessageCount.text = "\(messageCount)"
        }
      }
      cell.btnForTitle.setTitle(btnTitle, for: .normal)
      cell.btnForTitle.setImage(UIImage(named: Macros.ConstantArray.arrForSideMenuTitle[indexPath.row]), for: .normal)
      cell.btnForTitle.tag = indexPath.row
      cell.selectionStyle = .none
      cell.backgroundColor = AppInstance.shared.selectedMenuIndex == indexPath.row ? colorCode.selectedDrowerColor : .clear
      // Configure the cell...
      return cell
    }
    return UITableViewCell()
  }
  
  override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return UIDevice.current.userInterfaceIdiom == .pad ? 70 : 55
  }
  
  override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    
    let storyboard = UIStoryboard(name: Macros.Identifiers.Storyboard.Dashboard, bundle: nil)
    let navigationController = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.NavigationVC) as! UINavigationController
    switch indexPath.row {
    case 0:
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      if let vc = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.DashboardVC) as? DashboardVC {
        navigationController.setViewControllers([vc], animated: false)
        if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
          mainViewController.rootViewController = navigationController
          let window = UIApplication.shared.delegate!.window!!
          window.rootViewController  =   mainViewController
          UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
        }
      }
      
    case 1:
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.StudentListVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 2:
      //            showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.DailySheetsVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 3:
      //           showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.PostActivityVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 4:
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.AttendanceVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 5:
      //            showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.CalendarVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 6:
      //            showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.MessageVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 7:
      //            showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.IncidentVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 8:
      //            showOkAlert()
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.TeacherBreakLogVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 9:
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.MedicationsVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
    case 10:
      if let cell:LeftSideMenuTableViewCell = tableView.cellForRow(at: indexPath) as? LeftSideMenuTableViewCell {
        cell.backgroundColor = colorCode.selectedDrowerColor
      }
      AppInstance.shared.selectedMenuIndex = indexPath.row
      navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.AllergyVC)], animated: false)
      if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
        mainViewController.rootViewController = navigationController
        let window = UIApplication.shared.delegate!.window!!
        window.rootViewController  =   mainViewController
        UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
      }
      
    case 11:
      logoutUser()
    default:
      print("In Progress")
    }
  }
  
  //MARK:----- Functions -----
  //Logout Function
  func logoutUser(){
    let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
    let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
    _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.logout , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
      switch index {
      case 0:
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
    AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kUserDetails)
    AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kisFirstLogin)
    AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kTeacherDetails)
    let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboard.Main, bundle: nil)
    let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.LoginNavigation) as? UINavigationController
    UIApplication.shared.keyWindow?.rootViewController = navigationController
  }
  
  
  
  func showOkAlert(){
    _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: "In Progress", onViewController: self)
  }
}
