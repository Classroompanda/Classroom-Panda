//
//  MessageVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit


class MessageVC: BaseViewController {
    
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
        apiForGetAllTeachers()
        // Do any additional setup after loading the view.
    }
    
    
    //MARK:----- API Calling Functions -----
    
    func apiForGetAllTeachers(){
        let service = MessageService()
        service.getAllTeacher(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0, roleID: RoleId.teacher,complition: { (result) in
            if result != nil {
                self.arrForTeachers = result as? [MessageUser]
                self.tblViewForParentList.reloadData()
            }
        })
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
        }else {
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
    @IBOutlet weak var lblForTeacherName: UILabel!
    @IBOutlet weak var lblForDivider: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForTeacher.cornerRadius = PlatformUtils.isPad ? 35 : imgViewForTeacher.bounds.height/2
        // Initialization code
    }
}

