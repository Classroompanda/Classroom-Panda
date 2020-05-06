//
//  MessageVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

class MessageVC: BaseViewController {

    @IBOutlet weak var tblViewForParentList: UITableView!
    @IBOutlet weak var txtFiedForSearch: UITextField!
    var arrForParents: [MessageUser]?
    var arrForSortedParents:[MessageUser]?
    var isSearchActive: Bool = false
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationTitle.Message)
        apiForGetAllParents()
        // Do any additional setup after loading the view.
    }
    

    //MARK:----- API Calling Functions -----
    
    func apiForGetAllParents(){
        let service = MessageService()
        service.getAllParents(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherID: AppInstance.shared.user?.releventUserID ?? 0, roleID: RoleId.parent,complition: { (result) in
            if result != nil {
               self.arrForParents = result as? [MessageUser]
                self.tblViewForParentList.reloadData()
            }
        })
    }
}
//MARK:------- UITableView Delegates & DataSources -----
extension MessageVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearchActive ? arrForSortedParents?.count ?? 0 : self.arrForParents?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customMessageListTableViewCell(tableView:tableView,indexPath:indexPath)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.ChatVC) as! ChatVC
        vc.parentUser = self.arrForParents?[indexPath.row]
        self.navigationController?.pushViewController(vc, animated: true)
    }
   
    //MARK:----- Custom TableView Cell -----

    func customMessageListTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MessageListTableViewCell) as? MessageListTableViewCell {
            let arrForParentList = isSearchActive ? arrForSortedParents : self.arrForParents
            if (arrForParentList?.count ?? 0) > 0 {
            cell.lblForDivider.isHidden = (indexPath.row == (arrForParentList?.count ?? 0) - 1)
            }
            cell.lblForTeacherName.text = arrForParentList?[indexPath.row].listUserName
            cell.imgViewForTeacher.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imgViewForTeacher.sd_setShowActivityIndicatorView(true)
//            cell.imgViewForTeacher.sd_setIndicatorStyle(.gray)
            cell.imgViewForTeacher.sd_setImage(with: URL(string: arrForParentList?[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
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
            self.arrForSortedParents = self.arrForParents?.filter({ (teacher) -> Bool in
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
}
