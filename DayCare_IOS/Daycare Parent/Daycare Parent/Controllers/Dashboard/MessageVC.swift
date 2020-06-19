//
//  MessageVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit


class MessageVC: BaseViewController {
  // Shiwani
  var messageCount = 0
  @IBOutlet weak var tblViewForParentList: UITableView!
  @IBOutlet weak var txtFiedForSearch: UITextField!
  @IBOutlet weak var viewForTextField: UIView!
  
  var arrForTeachers: [MessageUser]?
  var arrForSortedTeacher:[MessageUser]?
  var isSearchActive: Bool = false
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.setNavigationBar(title: Macros.NavigationBarTitle.Message)
    self.tblViewForParentList.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
    self.viewForTextField.cornerRadius = PlatformUtils.isPad ? 30 : 20
  }
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    apiForGetAllTeachers()
    signalRChatNotification()
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    NotificationCenter.default.removeObserver(self, name: NSNotification.Name(kMessageReceiveNotification), object: nil)
    NotificationCenter.default.removeObserver(self, name: UIApplication.didBecomeActiveNotification, object: nil)
  }
  //MARK:----- API Calling Functions -----
  
 @objc func apiForGetAllTeachers(){
    let service = MessageService()
    service.getAllTeacher(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0, roleID: RoleId.teacher, userID:AppInstance.shared.user?.loginUserID ?? 0,complition: { (result) in
      if result != nil {
        self.arrForTeachers = result as? [MessageUser]
        self.tblViewForParentList.reloadData()
      }
    })
  }
  
  func signalRChatNotification()
  {
    NotificationCenter.default.addObserver(self, selector: #selector(signalRChatMessageReceived), name: NSNotification.Name(kMessageReceiveNotification), object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(signalRChatReconnect), name: NSNotification.Name(kChatCoonectionFailNotification), object: nil)
     NotificationCenter.default.addObserver(self, selector: #selector(apiForGetAllTeachers), name: UIApplication.didBecomeActiveNotification, object: nil)
  }
  @objc func signalRChatMessageReceived(_ notification: Notification)
  {
    guard let messageObj : Message = notification.object as? Message else {return}
    let arrForParentList = isSearchActive ? arrForSortedTeacher : self.arrForTeachers
    if let i = arrForParentList?.firstIndex(where: {$0.listUserId == messageObj.SenderUserID}) {
      arrForParentList?[i].unreadMessageCount = (arrForParentList?[i].unreadMessageCount ?? 0) + 1
      let indexPath = NSIndexPath.init(row: i, section: 0)
      tblViewForParentList.reloadRows(at: [(indexPath as IndexPath)], with: .none)
    }
  }
  @objc func signalRChatReconnect(_ notification: Notification)
  {
    SignalRConnection.sharedInstance.startConnection(currentUser: AppInstance.shared.user ?? User())
  }
}
//MARK:------- UITableView Delegates & DataSources -----
extension MessageVC: UITableViewDelegate,UITableViewDataSource{
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return isSearchActive ? arrForSortedTeacher?.count ?? 0 : self.arrForTeachers?.count ?? 0
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    return customMessageListTableViewCell(tableView:tableView,indexPath:indexPath)
  }
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.ChatVC) as! ChatVC
    let arrForTeacherList = isSearchActive ? arrForSortedTeacher : self.arrForTeachers
    vc.teacherUser = arrForTeacherList?[indexPath.row]
    self.navigationController?.pushViewController(vc, animated: true)
  }
  
  //MARK:----- Custom TableView Cell -----
  
  func customMessageListTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
    if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MessageListTableViewCell) as? MessageListTableViewCell {
      let arrForTeacherList = isSearchActive ? arrForSortedTeacher : self.arrForTeachers
      if (arrForTeacherList?.count ?? 0) > 0 {
        cell.lblForDivider.isHidden = (indexPath.row == (arrForTeacherList?.count ?? 0) - 1)
      }
      cell.lblForUnreadMessages.isHidden = true
      if let unreadMessages = arrForTeacherList?[indexPath.row].unreadMessageCount, unreadMessages > 0 {
        cell.lblForUnreadMessages.text = "\(unreadMessages)"
        cell.lblForUnreadMessages.isHidden = false
      }
      cell.lblForTeacherName.text = arrForTeacherList?[indexPath.row].listUserName
      cell.imgViewForTeacher.sd_setShowActivityIndicatorView(true)
      cell.imgViewForTeacher.sd_setIndicatorStyle(.gray)
      cell.imgViewForTeacher.sd_setImage(with: URL(string: arrForTeacherList?[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
        if (error != nil) {
          cell.imgViewForTeacher.image = UIImage(named: "placeholder")
        }
      }
      return cell
    }
    return UITableViewCell()
  }
}

//MARK:----- UITextField Delegates -----
extension MessageVC:UITextFieldDelegate{
  func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    let currentString:NSString = textField.text! as NSString
    let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
    if newString == "" {
      isSearchActive = false
    } else {
      isSearchActive = true
      self.arrForSortedTeacher = self.arrForTeachers?.filter({ (teacher) -> Bool in
        return teacher.listUserName?.lowercased().contains(newString.lowercased) ?? false
      })
    }
    tblViewForParentList.reloadData()
    return true
  }
  
  func textFieldShouldReturn(_ textField: UITextField) -> Bool {   //delegate method
    textField.text = ""
    textField.resignFirstResponder()
    isSearchActive = false
    tblViewForParentList.reloadData()
    return true
  }
}

//MARK:------ UITableView Cell -----------
class MessageListTableViewCell: UITableViewCell{
  @IBOutlet weak var imgViewForTeacher: UIImageView!
  @IBOutlet weak var lblForUnreadMessages: UILabel!
  @IBOutlet weak var lblForTeacherName: UILabel!
  @IBOutlet weak var lblForDivider: UILabel!
  override func awakeFromNib() {
    super.awakeFromNib()
    imgViewForTeacher.cornerRadius = PlatformUtils.isPad ? 35 : imgViewForTeacher.bounds.height/2
    // Initialization code
  }
}

