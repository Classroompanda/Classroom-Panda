//
//  BreaksVC.swift
//  Daycare
//
//  Created by amrut waghmare on 12/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class StudentBreaksVC: BaseViewController {
    
    @IBOutlet weak var tblViewForBreakList: UITableView!
    var attendance : Attendance?
    var selectedDate:Date?
    var arrForStudentLogs:[StudentBreak] = []
    var refreshControl = UIRefreshControl()
    var isFirstLoad:Bool = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }

    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Breaks)
        refreshControl.attributedTitle = NSAttributedString(string: Macros.ControllerString.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        tblViewForBreakList.addSubview(refreshControl)
        apiForGetStudentLogs()
    }
    
    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetStudentLogs()
    }

    
    //MARK:----- API Calling Functions -----
    
    func apiForGetStudentLogs(){
        let service = DashboardService()
        service.GetStudentBreakLog(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: attendance?.studentID ?? 0, classAttendanceId: attendance?.id ?? 0) { (result) in
            if result != nil {
                self.isFirstLoad = false
                self.arrForStudentLogs = result as? [StudentBreak] ?? []
                self.refreshControl.endRefreshing()
                self.tblViewForBreakList.reloadData()
            }
        }
    }
}

//MARK:----- UITableView Delegates & Datasource ------
extension StudentBreaksVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : (self.arrForStudentLogs.count == 0) ? 1 : self.arrForStudentLogs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return self.arrForStudentLogs.count > 0 ? customStudenLogListTableViewCell(tableView:tableView, indexPath:indexPath) : CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForBreakList)
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customBreakHeaderTableViewCell(tableView: tableView)
    }
//    func tableView(_ tableView: UITableView, estimatedHeightForHeaderInSection section: Int) -> CGFloat {
//        return 80
//    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return PlatformUtils.isPad ? 120 : 80
    }
    
    //MARK:----- Custom function for tableView cell -----
    //custom Break Header tableView Cell
    func customBreakHeaderTableViewCell(tableView: UITableView) -> UIView{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.BreakListHeaderTableViewCell) as? BreakListHeaderTableViewCell {
            cell.lblForStudentName.text = attendance?.studentName
            cell.lblForDate.text = CommonClassMethods.dateFromDateFormat(date: self.selectedDate ?? Date())
            cell.imgViewForStudent.sd_setShowActivityIndicatorView(true)
            cell.sd_setIndicatorStyle(.gray)
            cell.imgViewForStudent.sd_setImage(with: URL(string: attendance?.imagePath ?? "")) { (image,error, type, url) in
                if error != nil {
                    cell.imgViewForStudent.image = UIImage(named: "placeholder")
                }
            }
            return cell
        } else {
            return UIView()
        }
    }
    
    //Custom student log TableView cell
    func customStudenLogListTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.BreakListTableViewCell) as? BreakListTableViewCell {
            cell.lblForReason.text = self.arrForStudentLogs[indexPath.row].breakReason
            cell.lblForBreakOut.text = CommonClassMethods.timeFromDateString(date: self.arrForStudentLogs[indexPath.row].breakOutTime ?? "")
            cell.lblForBreakIn.text = CommonClassMethods.timeFromDateString(date: self.arrForStudentLogs[indexPath.row].breakInTime ?? "")
            cell.lblForPickedUp.text = self.arrForStudentLogs[indexPath.row].pickupBy
            cell.lblForDropOffBy.text = self.arrForStudentLogs[indexPath.row].dropedBy
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UITableView Cell-----
class BreakListHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForStudent: UIImageView!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForStudent.cornerRadius = PlatformUtils.isPad ? 30.0 : imgViewForStudent.bounds.height/2
        // Initialization code
    }
}

class BreakListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForBreakOut: UILabel!
    @IBOutlet weak var lblForBreakIn: UILabel!
    @IBOutlet weak var lblForPickedUp: UILabel!
    @IBOutlet weak var lblForDropOffBy: UILabel!
    @IBOutlet weak var lblForReason: UILabel!
}
