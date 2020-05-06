//
//  BreaksVC.swift
//  Daycare
//
//  Created by amrut waghmare on 12/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

class BreaksVC: BaseViewController {
    
    @IBOutlet weak var tblViewForBreakList: UITableView!
    @IBOutlet weak var btnForAddBreak: UIButton!
    
    var attendance : Attendance?
    var isPreviousDate:Bool?
    var selectedDate:Date?
    var arrForGaudianList:[Guardian]?
    var arrForStudentLogs:[StudentBreak] = []
    var refreshControl = UIRefreshControl()
    var isFirstLoad:Bool = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        apiForGetStudentLogs()
    }
    
    //MARK:----- @IBActions -------
    @IBAction func actionForAddButton(_ sender: UIButton) {
        let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.StudentBreakInOutVC) as! StudentBreakInOutVC
        vc.arrForGuardians = arrForGaudianList
        vc.attendance = self.attendance
        vc.selectedDate = self.selectedDate
        vc.isPickUp = true
//        vc.delegate = self
        vc.isEdited = false
       self.navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc func actionForOpenBreakPopup(_ sender: UIButton){
        let vc = self.storyboard?.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.StudentBreakInOutVC) as! StudentBreakInOutVC
        vc.arrForGuardians = arrForGaudianList
        vc.attendance = self.attendance
        vc.selectedDate = self.selectedDate
        vc.selectedIndex = sender.tag
//        vc.delegate = self
        vc.isPickUp = false
        vc.isEdited = (self.arrForStudentLogs[sender.tag].breakStatusId == StudentBreakStatus.BreakIn) ? true : false
        vc.studentBreakLog = self.arrForStudentLogs[sender.tag]
       self.navigationController?.pushViewController(vc, animated: true)
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Breaks)
        btnForAddBreak.isHidden = (isPreviousDate ?? false) ? true : (attendance?.attendenceStatusID == AttendanceStatus.isCheckedOut)
        refreshControl.attributedTitle = NSAttributedString(string: Macros.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        tblViewForBreakList.addSubview(refreshControl)
        apiForGetGuardianList()
    }
    
    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetStudentLogs ()
    }
    
    func setupAddButton(){
        var btnHiddent = false
        for studentBreak in arrForStudentLogs {
            if studentBreak.breakStatusId == StudentBreakStatus.BreakOut{
                btnHiddent = true
            }
        }
        if !(isPreviousDate ?? false) && (attendance?.attendenceStatusID != AttendanceStatus.isCheckedOut) {
            self.btnForAddBreak.isHidden = btnHiddent
        }
    }
    
    //MARK:----- API Calling Functions -----
    func apiForGetGuardianList(){
        let service = AttendanceService()
        service.getGuardiansList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classID: String(attendance?.classesID ?? 0), studentId: String(attendance?.studentID ?? 0), studentName: attendance?.studentName ?? "", isAuthorized: true) { (result) in
            self.arrForGaudianList = result as? [Guardian] ?? []
            self.apiForGetStudentLogs()
        }
    }
    
    func apiForGetStudentLogs(){
        let service = AttendanceService()
        service.GetStudentBreakLog(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: attendance?.studentID ?? 0, classAttendanceId: attendance?.id ?? 0) { (result) in
            if result != nil {
                self.isFirstLoad = false
                self.arrForStudentLogs = result as? [StudentBreak] ?? []
                self.refreshControl.endRefreshing()
                self.setupAddButton()
                self.tblViewForBreakList.reloadData()
            }
        }
    }
}

//MARK:----- UITableView Delegates & Datasource ------
extension BreaksVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : (self.arrForStudentLogs.count == 0) ? 1 : self.arrForStudentLogs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return self.arrForStudentLogs.count > 0 ? customStudenLogListTableViewCell(tableView:tableView, indexPath:indexPath) : CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForBreakList)
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customBreakHeaderTableViewCell(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return PlatformUtils.isPad ? 120 : 80 
    }
    
    
    //MARK:----- Custom function for tableView cell -----
    //custom Break Header tableView Cell
    func customBreakHeaderTableViewCell(tableView: UITableView) -> UIView{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.BreakListHeaderTableViewCell) as? BreakListHeaderTableViewCell {
            cell.lblForStudentName.text = attendance?.studentName
            cell.lblForDate.text = TimeUtils.stringFromDate(self.selectedDate ?? Date(), with: DateFormats.DD_MMM_YYYY)
            cell.imgViewForStudent.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imgViewForStudent.sd_setShowActivityIndicatorView(true)
//            cell.sd_setIndicatorStyle(.gray)
            cell.imgViewForStudent.sd_setImage(with: URL(string: attendance?.imagePath ?? "")) { (image,error, type, url) in
                if error != nil {
                    cell.imgViewForStudent.image = UIImage(named: "baby")
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
            cell.btnForEdit.tag = indexPath.row
            cell.lblForReason.text = self.arrForStudentLogs[indexPath.row].breakReason
            cell.lblForBreakOut.text = CommonClassMethods.timeFromDateString(date: self.arrForStudentLogs[indexPath.row].breakOutTime ?? "")
            if let date = CommonClassMethods.dateObjectFromDateString(date: self.arrForStudentLogs[indexPath.row].breakInTime ?? "") {
                if date > (CommonClassMethods.dateObjectFromDateString(date: "0001-01-01T00:00:00") ?? Date()) {
                    cell.lblForBreakIn.text = CommonClassMethods.timeFromDateString(date: self.arrForStudentLogs[indexPath.row].breakInTime ?? "")
                }else {
                    cell.lblForBreakIn.text = "---"
                }
            }
            var pickedUpBy:String?
            var dropOffBy:String?
            for guardian in self.arrForGaudianList ?? [] {
                if self.arrForStudentLogs[indexPath.row].pickupById ?? 0 == guardian.guardianId {
//                     cell.lblForPickedUp.text = guardian.guardianName
                    pickedUpBy = guardian.guardianName
                }
                if self.arrForStudentLogs[indexPath.row].dropedById ?? 0 == guardian.guardianId {
//                    cell.lblForDropOffBy.text = guardian.guardianName
                    dropOffBy = guardian.guardianName
                }
            }
            cell.lblForPickedUp.text = pickedUpBy ?? "---"
            if let dropOff = dropOffBy {
                cell.lblForDropOffBy.text = dropOff
            } else {
               cell.lblForDropOffBy.text = "---"
            }
            cell.btnForEdit.addTarget(self, action: #selector(actionForOpenBreakPopup(_:)), for: .touchUpInside)
            cell.btnForEdit.isHidden = (self.isPreviousDate ?? false) ? true : false
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- StudentBreak Popup Delegate -----
extension BreaksVC : StudentBreakDelegate {
    func submitBreakButtonAction(studentBreak: StudentBreak, selectedRow: Int?) {
        if let index = selectedRow {
            studentBreak.breakInTime = CommonClassMethods.dateFromDateServerRequestToResponseString(date: studentBreak.breakInTime ?? "")
            studentBreak.breakOutTime = CommonClassMethods.dateFromDateServerRequestToResponseString(date: studentBreak.breakOutTime ?? "")
            self.arrForStudentLogs[index] = studentBreak
            let indexPath = IndexPath(item: index, section: 0)
            self.tblViewForBreakList.reloadRows(at: [indexPath], with: .automatic)
            
        } else {
            if self.arrForStudentLogs.count == 0 {
                self.arrForStudentLogs.append(studentBreak)
                self.tblViewForBreakList.reloadData()
            } else {
                studentBreak.breakOutTime = CommonClassMethods.dateFromDateServerRequestToResponseString(date: studentBreak.breakOutTime ?? "")
                self.arrForStudentLogs.insert(studentBreak, at: 0)
                let indexPath = IndexPath(row: 0, section: 0)
//                let indexPath = IndexPath(item: (self.arrForStudentLogs.count - 1), section: 0)
                self.tblViewForBreakList.insertRows(at: [indexPath], with: .automatic)
            }
        }
        self.setupAddButton()
    }
}


//MARK:----- UITableView Cell-----
class BreakListHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForStudent: UIImageView!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForStudent.cornerRadius = PlatformUtils.isPad ? 30 : 20
        // Initialization code
    }

}

class BreakListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForBreakOut: UILabel!
    @IBOutlet weak var lblForBreakIn: UILabel!
    @IBOutlet weak var lblForPickedUp: UILabel!
    @IBOutlet weak var lblForDropOffBy: UILabel!
    @IBOutlet weak var lblForReason: UILabel!
    @IBOutlet weak var btnForEdit: UIButton!
}

//2019-09-24T02:00:00.000Z, Break Out Time 2019-09-24T02:00:00
//2019-09-24T03:00:00.000Z,

//2019-09-24T03:00:04.046Z
