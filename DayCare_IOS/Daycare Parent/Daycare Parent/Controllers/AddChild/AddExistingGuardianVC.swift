//
//  AddExistingGuardianVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 12/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class AddExistingGuardianVC: BaseViewController {

    @IBOutlet weak var tblViewForGuardianList: UITableView!
    var arrForGuardians:[Parent] = []
    var child: Child?
    var arrForRelation:[Relation]?
   
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.selectGuardian)
        apiForGetGuardianInformation()
        // Do any additional setup after loading the view.
    }
    
   @objc func actionForAddNewGuardian(){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Dashboard, vcIdentifire: Macros.Identifiers.Controllers.ProfileVC) as! ProfileVC
        vc.child = self.child
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    func actionForAddExistingGuardian(indexPath: IndexPath){
        checkGuardianAlreadyExist(guardian: self.arrForGuardians[indexPath.row]) ? self.showAlertForAlreadyExistGuardian() : self.showAlertForAddGuardian(guardian: self.arrForGuardians[indexPath.row])
    }
    
    func checkGuardianAlreadyExist(guardian: Parent) -> Bool {
        var isExist:Bool = false
        for student in guardian.associatedChild ?? [] {
            if student.studentID == self.child?.studentId {
                isExist = true
            }
        }
        return isExist
    }
    
    func genrateParameters(guardian: Parent) -> Dictionary<String,Any>{
        var arrForAssociateChild:[[String:Any]] = []
        for child in guardian.associatedChild ?? [] {
            arrForAssociateChild.append(child.dictionaryRepresentation())
        }
        let associateChild = AssociatedChild()
        associateChild.studentID = self.child?.studentId
        arrForAssociateChild.append(associateChild.dictionaryRepresentation())
        guardian.agencyID = AppInstance.shared.user?.agencyID ?? 0
        var dictForParam = guardian.dictionaryRepresentation()
        dictForParam[Macros.ApiKeys.kassociatedChild] = arrForAssociateChild
        dictForParam[Macros.ApiKeys.kupdatedBy] = AppInstance.shared.user?.loginUserID
        return dictForParam
    }
    
    //MARK:----- Alert Functions ------
    func showAlertForAlreadyExistGuardian(){
        self.showAlert(with: Macros.alertMessages.guardianAlreadyAdded)
    }
    
    func showAlertForAddGuardian(guardian: Parent){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:"\(Macros.alertMessages.guardianAssign) \(guardian.parentName ?? "") as guardian?", buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForSaveParentInformation(guardian: guardian)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    
    //MARK:----- API Calling Functions -------
    func apiForGetGuardianInformation(){
        let service = ChildService()
        service.getAllGuardians(with: self, agencyId: AppInstance.shared.user?.agencyID ?? 0, parentId: AppInstance.shared.user?.releventUserID ?? 0, isParent: AppInstance.shared.user?.isParent ?? false, isSecondaryParent: AppInstance.shared.user?.isSecondaryParent ?? false, isGuardian: AppInstance.shared.user?.isGaurdian ?? false) { (result) in
            if result != nil {
                if let arrForParents = result as? [Parent] {
                    var arrForGuardian:[Parent] = []
                    for i in 0..<arrForParents.count {
                        if arrForParents[i].isGaurdian ?? false {
                            arrForGuardian.append(arrForParents[i])
                        }
                    }
                    self.arrForGuardians = arrForGuardian
                    self.tblViewForGuardianList.reloadData()
                }
            }
        }
    }
    
    func apiCallForSaveParentInformation(guardian: Parent) {
        let dictForParam = self.genrateParameters(guardian: guardian)
        let service = DashboardService()
        service.saveParentInformation(with: self, param: dictForParam ) { (result) in
            if let response = result as? Dictionary<String,Any> {
                print(response)
                self.navigationController?.popViewController(animated: true)
//                self.showAlert(with: response["message"] as? String ?? "")
//                self.apiForGetGuardianInformation()
            }
        }
    }
}

//MARK:----- UITable View Delegate and DataSource -----
extension AddExistingGuardianVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.arrForGuardians.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customGuardianListTableViewCell(tableView:tableView, indexPath:indexPath)
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customAddGuardianCell(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 80.0
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80.0
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.actionForAddExistingGuardian(indexPath: indexPath)
    }
    
    func customAddGuardianCell(tableView: UITableView) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddGuardianCell) as? AddGuardianCell {
            
            cell.btnForNewGuardian.addTarget(self, action: #selector(actionForAddNewGuardian), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
    
    //Custom Guardian List Cell
    func customGuardianListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.GuardianListCell, for: indexPath) as? GuardianListCell {
            cell.lblForName.text = self.arrForGuardians[indexPath.row].parentName ?? ""
            cell.imgViewForGuardian.sd_setShowActivityIndicatorView(true)
            cell.imgViewForGuardian.sd_setIndicatorStyle(.gray)
            cell.imgViewForGuardian.sd_setImage(with: URL(string: self.arrForGuardians[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForGuardian.image = UIImage(named: "placeholder")
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
}
//MARK:---- UITableView Cell ----
class GuardianListCell: UITableViewCell {
    @IBOutlet weak var imgViewForGuardian: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForGuardian.cornerRadius = PlatformUtils.isPad ? 30 : 20
    }
}

class AddGuardianCell: UITableViewCell {
    @IBOutlet weak var btnForNewGuardian: UIButton!
    @IBOutlet weak var imgViewForPlaceholder: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForPlaceholder.cornerRadius = PlatformUtils.isPad ? 30 : 20
    }
}
