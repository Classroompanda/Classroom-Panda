//
//  MyKidsVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 13/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class MyKidsVC: BaseViewController {
   
    @IBOutlet weak var btnForAddChild: UIButton!
    @IBOutlet weak var tblViewForChildList: UITableView!
    @IBOutlet weak var viewForAddChild: UIView!
    var arrForChild:[Child]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.btnForAddChild.isHidden = (AppInstance.shared.user?.isGaurdian ?? false)
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if (AppInstance.shared.selectedChild != nil) {
            (AppInstance.shared.user?.isGaurdian ?? false) ? self.setNavigationBar(title: Macros.NavigationBarTitle.ChildList) : self.setNavigationBar(title: Macros.NavigationBarTitle.MyKids)
            self.navigationItem.rightBarButtonItem = nil
        } else {
            self.setNavigationBarWithLogoutButton()
        }
        self.apiCallForChildList()
    }
    
    @IBAction func actionForAddChild(_ sender: Any) {
//        let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddKidVC) as! AddKidVC
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.AddKidVC) as! AddKidVC
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    //Logout Function
    @objc func actionForLogoutUser(){
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
    
    func initialSetup(){
        
    }
    
//    func navigateToLogin(){
//        AppInstance.shared.selectedMenuIndex = 0
//        AppInstance.shared.selectedChild = nil
//        AppInstance.shared.kUserDefault.setValue(nil, forKey: Macros.DefaultKeys.kUserDetails)
//        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboards.Main, bundle: nil)
//        let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.LoginNavigation) as? UINavigationController
//        UIApplication.shared.keyWindow?.rootViewController = navigationController
//    }
    func setNavigationBarWithLogoutButton() {
        self.navigationController?.navigationBar.isHidden       = false
        self.setGradientColor()
        let btnForLogout:UIBarButtonItem = UIBarButtonItem(title: "Log Out", style: .plain, target: self, action: #selector(actionForLogoutUser))
        btnForLogout.tintColor = .white
        self.navigationItem.leftBarButtonItem = nil
        self.navigationItem.setRightBarButton(btnForLogout, animated: true)
    }
    
    //MARK:----- API Calling Functions ----
    func apiCallForChildList(){
        let service = ChildService()
        service.getAllChildList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID:AppInstance.shared.user?.releventUserID ?? 0,studentName: "") { (result) in
            if result != nil {
                self.arrForChild = result  as? [Child]
                AppInstance.shared.arrForChild = result as? [Child]
                if (self.arrForChild?.count ?? 0) > 0 {
                    self.viewForAddChild.isHidden = true
                    self.tblViewForChildList.reloadData()
                } else {
                    self.viewForAddChild.isHidden = false
                }
            } else {
                self.viewForAddChild.isHidden = false
            }
        }
    }
}

//MARK:----- UITableView Delegates & DataSources --------
extension MyKidsVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.arrForChild?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ParentChildListTableViewCell) as? ParentChildListTableViewCell {
            cell.lblForName.text = self.arrForChild?[indexPath.row].studentName
           
            cell.lblForDOB.text = CommonClassMethods.dateFromDateStringS(date: self.arrForChild?[indexPath.row].dateOfBirth ?? "")
            cell.imgViewForChild.sd_setShowActivityIndicatorView(true)
            cell.imgViewForChild.sd_setIndicatorStyle(.gray)
            cell.imgViewForChild.sd_setImage(with: URL(string: (self.arrForChild?[indexPath.row].imagePath ?? ""))) { (image, error, type, url) in
                if (error != nil) {
                    cell.imgViewForChild.image = UIImage(named: "placeholder")
                }
            }
            var classList = String()
            for i in 0..<(self.arrForChild?[indexPath.row].enrolledClassesInformation?.count ?? 0) {
                if i == ((self.arrForChild?[indexPath.row].enrolledClassesInformation?.count ?? 0) - 1) {
                    classList.append("\(String(describing: self.arrForChild?[indexPath.row].enrolledClassesInformation?[i].className ?? ""))")
                } else {
                    classList.append("\(String(describing: self.arrForChild?[indexPath.row].enrolledClassesInformation?[i].className ?? "")),")
                }
            }
            cell.lblForClass.text = (self.arrForChild?[indexPath.row].enrolledClassesInformation?.count ?? 0 > 0) ? classList : Macros.ControllerString.notEnrolledInClass
            return cell
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if !(AppInstance.shared.user?.isGaurdian ?? false) {
             let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.AddKidVC) as! AddKidVC
            vc.child = self.arrForChild?[indexPath.row] ?? Child()
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
}
//MARK:----- UITableView Cell -----
class ParentChildListTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForChild: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForClass: UILabel!
    @IBOutlet weak var lblForDOB: UILabel!
}

