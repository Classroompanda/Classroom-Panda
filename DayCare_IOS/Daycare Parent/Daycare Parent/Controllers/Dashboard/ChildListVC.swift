//
//  ChildListVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 12/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ChildListVC: BaseViewController {
    
    @IBOutlet weak var tblViewForChildList: UITableView!
    
    var arrForChild:[Child]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.apiCallForChildList()
        // Do any additional setup after loading the view.
    }
    
    //MARK:----- Functions ------
    func navigateToDashboard(){
        let storyboard  =   UIStoryboard(name: Macros.Identifiers.Storyboards.Dashboard, bundle: nil)
        if let navigationController    =   storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.NavigationVC) as? NavigationVC {
            navigationController.setViewControllers([storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.DashboardVC)], animated: false)
            if let mainViewController  =   storyboard.instantiateInitialViewController() as? SideMenuVC {
                mainViewController.rootViewController   =   navigationController
                let window = UIApplication.shared.delegate!.window!!
                window.rootViewController   =   mainViewController
                UIView.transition(with: window, duration: 0.3, options: [.transitionCrossDissolve], animations: nil, completion: nil)
            }
        }
    }
    
    //MARK:----- API Calling Functions ----
    func apiCallForChildList(){
        let service = ChildService()
        service.getAllChildList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID:AppInstance.shared.user?.releventUserID ?? 0,studentName: "") { (result) in
            if result != nil {
                self.arrForChild = result  as? [Child]
                AppInstance.shared.arrForChild = result as? [Child]
                if self.arrForChild?.count == 0 {
                    self.navigateToAddChild()
                    return
                }
                self.tblViewForChildList.reloadData()
            }
        }
    }
}

//MARK:----- UITableView DataSources and Delegates -----
extension ChildListVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.arrForChild?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ChildListTableViewCell) as? ChildListTableViewCell {
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
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ChildListTableViewHeaderCell) as? ChildListTableViewHeaderCell {
            cell.lblForParentName.text = "Welcome \(AppInstance.shared.user?.firstName ?? "") \(AppInstance.shared.user?.lastName ?? "")"
            return cell
        }
        return UIView()
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 260
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        AppInstance.shared.selectedChild = self.arrForChild?[indexPath.row]
        self.navigateToDashboard()
    }
}

//MARK:----- UITableView Cell -----
class ChildListTableViewHeaderCell: UITableViewCell {
    @IBOutlet weak var lblForParentName: UILabel!
}

class ChildListTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForChild: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForClass: UILabel!
    @IBOutlet weak var lblForDOB: UILabel!
}
