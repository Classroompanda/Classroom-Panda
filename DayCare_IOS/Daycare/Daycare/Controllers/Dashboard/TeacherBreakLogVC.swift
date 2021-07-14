//
//  TeacherBreakLogVC.swift
//  Daycare
//
//  Created by amrut waghmare on 28/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0

class TeacherBreakLogVC: BaseViewController {
    @IBOutlet weak var tblViewForTeacherBreakLog: UITableView!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForMonthYear: UILabel!
    @IBOutlet weak var lblForDayName: UILabel!
     var selectedDate:Date?
    var arrForTeacherBreakLogs:[TeacherBreakLog] = []
    var isFirstLoad = true
   
    override func viewDidLoad() {
        super.viewDidLoad()
                print(AppInstance.shared.user?.teacherTodayAttendenceId ?? 0)
        NotificationCenter.default.addObserver(self, selector: #selector(getBreakList(sender:)), name:  NSNotification.Name.init(rawValue: "breakIn"), object: nil)
        self.selectedDate = Date()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
   
    
    //MARK:----- @IBActions ------
    @IBAction func actionForCalendar(_ sender: UIButton) {
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: self.selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: dateTime)
            self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:dateTime) + " " + CommonClassMethods.yearFromDate(date: dateTime)
            self.lblForDate.text = CommonClassMethods.dateFromDate(date: dateTime)
            if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: dateTime){
                self.selectedDate = dateTime
                self.apiForGetTeacherLog()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationTitle.MyBreaks)
        self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
        self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
        self.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
        apiForGetTeacherLog()
    }
    
    //MARK:----- API Calling Functions-------
    func apiForGetTeacherLog() {
        let service = DashboarService()
      // shiwani
//        service.getTeacherBreakLogs(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherID: AppInstance.shared.teacher?.id ?? 0,  askingDate: CommonClassMethods.convertDateToServerReadableFormatGET(date: selectedDate ?? Date())) { (result) in
      service.getTeacherBreakLogs(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherID: AppInstance.shared.teacher?.id ?? 0,  askingDate: CommonClassMethods.convertDateToServerReadableFormatGET(date: selectedDate ?? Date())) { (result) in
            if result != nil {
                self.isFirstLoad = false
                self.arrForTeacherBreakLogs = result as? [TeacherBreakLog] ?? []
                self.tblViewForTeacherBreakLog.reloadData()
            }
        }
    }
    
    @objc func getBreakList(sender: NSNotification) {
        apiForGetTeacherLog()
    }
   
}

//MARK:------ UITableView Delegates & Datasources -----
extension TeacherBreakLogVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return  (self.arrForTeacherBreakLogs.count == 0) ? 1 : self.arrForTeacherBreakLogs.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
        return (self.arrForTeacherBreakLogs.count) != 0 ? customTeacherBreakLogCell(tableView: tableView, indexPath: indexPath) : CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForTeacherBreakLog)
       
    }
    
    func customTeacherBreakLogCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TeacherBreakLogTableViewCell) as? TeacherBreakLogTableViewCell{
            cell.lblForBreakinTime.text = CommonClassMethods.timeFromDateString(date: self.arrForTeacherBreakLogs[indexPath.row].breakIn ?? "")
            cell.lblForBreakoutTime.text = CommonClassMethods.timeFromDateString(date: self.arrForTeacherBreakLogs[indexPath.row].breakOut ?? "")
            cell.lblForReason.text = self.arrForTeacherBreakLogs[indexPath.row].breakReason
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- TeacherBreakLogListTableViewCell -----
class TeacherBreakLogTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForReason: UILabel!
    @IBOutlet weak var lblForBreakinTime: UILabel!
    @IBOutlet weak var lblForBreakoutTime: UILabel!
}
