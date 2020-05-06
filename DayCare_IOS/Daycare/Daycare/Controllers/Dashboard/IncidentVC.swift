//
//  IncidentVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class IncidentVC: BaseViewController {
    @IBOutlet weak var btnForIncident: UIButton!
    @IBOutlet weak var btnForBiting: UIButton!
    @IBOutlet weak var lblForBiting: UILabel!
    @IBOutlet weak var lblForIncident: UILabel!
    @IBOutlet weak var tblViewForIncidentList: UITableView!
    var isFirstLoad:Bool = true
    var refreshControl = UIRefreshControl()
    var arrForIncidents : [Incident] = []
    var arrForBittingLogs : [Incident] = []
    var limit:Int   =   20
    var pageNumber:Int = 0
    var shouldCallAPI: Bool = true
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationTitle.IncidentReport)
//        setNavigationBarItems()
        self.btnForIncident.isSelected = true
        self.btnForIncident.titleLabel?.textColor = colorCode.selectedButtonColor
        self.btnForBiting.titleLabel?.textColor = colorCode.unSelectedButtonColor
        apiForGetIncidentList (pageNo: pageNumber)
        apiForGetBittingLogList()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
  
    func setNavigationBarItems(){
        let btnForSelectAll = UIButton(type: .custom)
        btnForSelectAll.setImage(UIImage(named: "search"), for: .normal)
        btnForSelectAll.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        btnForSelectAll.addTarget(self, action: #selector(actionForSearch), for: .touchUpInside)
        let item2 = UIBarButtonItem(customView: btnForSelectAll)
        
        self.navigationItem.setRightBarButtonItems([item2], animated: true)
    }
    
    //MARK:----- @IBActions -----
   
    @objc func actionForSearch(){
        
    }
    
    @IBAction func actionForAddButton(_ sender: Any) {
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddIncidentVC) as! AddIncidentVC
        vc.delegate = self
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    @IBAction func actionForIncidentReport(_ sender: Any) {
        self.btnForBiting.isSelected = false
        self.btnForIncident.isSelected = true
        self.btnForIncident.titleLabel?.textColor = colorCode.selectedButtonColor
        self.btnForBiting.titleLabel?.textColor = colorCode.unSelectedButtonColor
        lblForIncident.backgroundColor = colorCode.applicationColor
        lblForBiting.backgroundColor = .white
        tblViewForIncidentList.reloadData()
    }
    
    @IBAction func actionForBitingLog(_ sender: Any) {
        self.btnForIncident.isSelected = false
        self.btnForBiting.isSelected = true
        self.btnForIncident.titleLabel?.textColor = colorCode.unSelectedButtonColor
        self.btnForBiting.titleLabel?.textColor = colorCode.selectedButtonColor
        lblForIncident.backgroundColor = .white
        lblForBiting.backgroundColor = colorCode.applicationColor
        tblViewForIncidentList.reloadData()
    }

    @objc func actionForRefresh(sender:AnyObject) {
        if btnForBiting.isSelected {
            apiForGetBittingLogList()
            return
        }
        self.arrForIncidents = []
        self.shouldCallAPI = true
        self.pageNumber = 0
        apiForGetIncidentList (pageNo: pageNumber)
    }
    
    
    func actionForDelete(indexPath : IndexPath){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                if self.btnForBiting.isSelected {
                    self.apiForDeleteIncident(incident: self.arrForBittingLogs[indexPath.row], indexPath: indexPath)
                    self.arrForBittingLogs.remove(at: indexPath.row)
                } else {
                    self.apiForDeleteIncident(incident: self.arrForIncidents[indexPath.row], indexPath: indexPath)
                    self.arrForIncidents.remove(at: indexPath.row)
                }
                self.tblViewForIncidentList.reloadData()

            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    func actionForEditIncident(indexPath : IndexPath){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddIncidentVC) as! AddIncidentVC
        vc.incident =  btnForBiting.isSelected ? self.arrForBittingLogs[indexPath.row] : self.arrForIncidents[indexPath.row]
        vc.selectedIndex = indexPath.row
        vc.delegate = self
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.btnForBiting.titleLabel?.textColor = colorCode.unSelectedButtonColor
        refreshControl.attributedTitle = NSAttributedString(string: Macros.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        tblViewForIncidentList.addSubview(refreshControl)
    }
    
    //MARK:----- API Calling Function -----
    func apiForGetIncidentList(pageNo: Int) {
        let service = IncidentService()
        service.getAllIncidents(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, page: pageNo, limit: limit) { (result) in
            self.isFirstLoad = false
            self.refreshControl.endRefreshing()
            if let incidents = result as? Array<Incident> {
                if incidents.count < self.limit {
                    self.shouldCallAPI = false
                }
                if self.pageNumber == 0 {
                    self.arrForIncidents.removeAll()
                    self.arrForIncidents = incidents
                }else{
                    self.arrForIncidents.append(contentsOf: incidents)
                }
                self.tblViewForIncidentList.reloadData()
            }
        }
    }
    
    func apiForGetBittingLogList() {
        let service = IncidentService()
        service.getAllBittingLogs(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.isFirstLoad = false
            self.refreshControl.endRefreshing()
             if let bittingsArray = result as? Array<Incident> {
                self.arrForBittingLogs = bittingsArray
            }
            self.tblViewForIncidentList.reloadData()
        }
    }
    
    func apiForDeleteIncident(incident:Incident,indexPath:IndexPath){
        let service = IncidentService()
        service.deleteIncident(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: incident.id ?? 0, isDeleted: true, deletedDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), deletedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                if self.arrForIncidents.count == 0 {
                    self.tblViewForIncidentList.reloadData()
                }
            } else {
                self.arrForIncidents.insert(incident, at: indexPath.row)
                self.tblViewForIncidentList.insertRows(at: [indexPath], with: .automatic)
            }
        }
    }
}

//MARK:----- TableViewDatasource and TableViewDelegates
extension IncidentVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : ((btnForIncident.isSelected) ? ((arrForIncidents.count == 0) ? 1 : arrForIncidents.count) : (arrForBittingLogs.isEmpty ? 1 : arrForBittingLogs.count))
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let selectedArray = btnForBiting.isSelected ? self.arrForBittingLogs : self.arrForIncidents
        if selectedArray.isEmpty {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForIncidentList)
        } else {
            return customIncidentListTableViewCell(tableView:tableView,indexPath:indexPath)
        }
//        if btnForIncident.isSelected {
//            if arrForIncidents.count != 0 {
//                return customIncidentListTableViewCell(tableView:tableView,indexPath:indexPath)
//            } else {
//                return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForIncidentList)
//            }
//        } else {
//            if !arrForBittingLogs.isEmpty {
//                return customIncidentListTableViewCell(tableView:tableView,indexPath:indexPath)
//            } else {
//                return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForIncidentList)
//            }
//        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
//    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//        if self.arrForIncidents.count > indexPath.row {
//         if (self.arrForIncidents[indexPath.row].isAcknowledge ?? false) {
//            self.actionForEditIncident(indexPath: indexPath)
//        }
//        }
//    }
    
    @available(iOS 11.0, *)
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let delete =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            //do stuff
            self.actionForDelete(indexPath: indexPath)
            completionHandler(true)
        })
        let edit =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            //do stuff
            self.actionForEditIncident(indexPath: indexPath)
            completionHandler(true)
        })
        edit.image = UIImage(named: "editWhite")
        edit.backgroundColor = colorCode.applicationColor
        delete.image = UIImage(named: "delete")
        delete.backgroundColor = .red
        
        let selectedIncident = btnForBiting.isSelected ? self.arrForBittingLogs[indexPath.row] : self.arrForIncidents[indexPath.row]
        
        if selectedIncident.isAcknowledge ?? false {
            return UISwipeActionsConfiguration(actions: [edit])
        } else {
            return UISwipeActionsConfiguration(actions: [delete,edit])
        }
        
//        if btnForBiting.isSelected {
//            if !(arrForBittingLogs.isEmpty) {
//                if self.arrForBittingLogs[indexPath.row].isAcknowledge ?? false {
//                    return UISwipeActionsConfiguration(actions: [edit])
//                } else {
//                    return UISwipeActionsConfiguration(actions: [delete,edit])
//                }
//            } else {
//                return UISwipeActionsConfiguration(actions: [])
//            }
//        }
//
//        if arrForIncidents.count == 0 {
//            return UISwipeActionsConfiguration(actions: [])
//        } else {
//            if (self.arrForIncidents[indexPath.row].isAcknowledge ?? false) {
//                return UISwipeActionsConfiguration(actions: [edit])
//            } else {
//               return UISwipeActionsConfiguration(actions: [delete,edit])
//            }
////            return confrigation
//        }
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        let delete = UITableViewRowAction(style: .destructive, title: "Delete") { (action, indexPath) in
            self.actionForDelete(indexPath: indexPath)
            // delete item at indexPath
        }
        let edit = UITableViewRowAction(style: .normal, title: "Edit") { (action, indexPath) in
            self.actionForEditIncident(indexPath: indexPath)
            // share item at indexPath
        }
        edit.backgroundColor = colorCode.applicationColor
        
        let selectedIncident = btnForBiting.isSelected ? self.arrForBittingLogs[indexPath.row] : self.arrForIncidents[indexPath.row]
        
        if selectedIncident.isAcknowledge ?? false {
            return [edit]
        } else {
            return [delete, edit]
        }
        
//        if btnForBiting.isSelected {
//            if !(arrForBittingLogs.isEmpty) {
//                if self.arrForBittingLogs[indexPath.row].isAcknowledge ?? false {
//                    return [edit]
//                } else {
//                    return [delete, edit]
//                }
//            } else {
//                return []
//            }
//        }
//
//        if arrForIncidents.count == 0 {
//            return []
//        } else {
//            if (self.arrForIncidents[indexPath.row].isAcknowledge ?? false) {
//                return [edit]
//            } else {
//                return [delete, edit]
//            }
////            return [delete, edit]
//        }
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //Custom IncidentList TableView Cell
    func customIncidentListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let arrForPopulation:[Incident] = btnForIncident.isSelected ? self.arrForIncidents : self.arrForBittingLogs
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.IncidentLisTableViewCell) as? IncidentLisTableViewCell {
            cell.lblForIncidentName.text = arrForPopulation[indexPath.row].natureOfInjuryName
            cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: arrForPopulation[indexPath.row].incidentDate ?? "")
            cell.lblForReportedBy.text = arrForPopulation[indexPath.row].teacherName
            cell.lblForStudent.text = arrForPopulation[indexPath.row].studentName
            cell.lblForLocation.text = arrForPopulation[indexPath.row].placeOfIncident
            cell.lblForActionTaken.text = arrForPopulation[indexPath.row].actionTaken
            if btnForIncident.isSelected {
                if indexPath.row == arrForIncidents.count - 1 {
                    if shouldCallAPI{
                        self.pageNumber += 1
                        self.apiForGetIncidentList(pageNo: self.pageNumber)
                    }
                }
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Add Incident Delegate -----
extension IncidentVC: AddIncidentDelegate{
    func submitAddIncidentAction(incident: Incident, selectedRow: Int?) {
        if let index = selectedRow {
            let selectedarray = btnForBiting.isSelected ? arrForBittingLogs : arrForIncidents
            if selectedarray.count > index {
                if btnForBiting.isSelected {
                    arrForBittingLogs[index] = incident
                } else {
                  arrForIncidents[index] = incident
                }
                tblViewForIncidentList.reloadRows(at: [IndexPath(row: index, section: 0)], with: .automatic)
            }
        } else {
            actionForRefresh(sender: refreshControl)
//            if self.arrForIncidents.count == 0 {
//                self.arrForIncidents.append(incident)
//                self.tblViewForIncidentList.reloadData()
//            } else {
//                self.arrForIncidents.insert(incident, at: 0)
//                let indexPath = IndexPath(item: 0, section: 0)
//                self.tblViewForIncidentList.insertRows(at: [indexPath], with: .automatic)
//            }
        }
    }
}

//MARK:----- IncidentList TableView Cell -----
class IncidentLisTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForIncidentName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForReportedBy: UILabel!
    @IBOutlet weak var lblForStudent: UILabel!
    @IBOutlet weak var lblForLocation: UILabel!
    @IBOutlet weak var lblForActionTaken: UILabel!
}

