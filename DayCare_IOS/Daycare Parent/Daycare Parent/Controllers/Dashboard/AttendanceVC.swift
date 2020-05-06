//
//  AttendanceVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import SDWebImage
import DropDown
class AttendanceVC: BaseViewController {
    @IBOutlet weak var tblViewForAttendanceList: UITableView!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForMonthYear: UILabel!
    @IBOutlet weak var lblForDayName: UILabel!
    var selectedDate:Date?
    var isFirstLoad:Bool = true
//    var dropDownforStudent = DropDown()
    var arrForAttendanceList:[Attendance]?
    override func viewDidLoad() {
        super.viewDidLoad()
       self.initialSetup()
        
        // Do any additional setup after loading the view.
    }
    
    //MARK:----- @IBActions ------
    @IBAction func actionForCalendar(_ sender: UIButton) {
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: dateTime)
            self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:dateTime) + " " + CommonClassMethods.yearFromDate(date: dateTime)
            self.lblForDate.text = CommonClassMethods.dateFromDate(date: dateTime)
            if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: dateTime){
                self.selectedDate = dateTime
                self.apiForGetAttendanceList()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForOpenDropdown(sender: UIButton){
        self.setupDropDown(sender: sender)
        dropDownforStudent.show()
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.selectedDate = Date()
        self.setNavigationBar(title: Macros.NavigationBarTitle.Attendance)
        self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
        self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
        self.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
        if (AppInstance.shared.selectedChild != nil) {
            self.setupChildListMenu()
            self.apiForGetAttendanceList()
        } else {
            (isFirstLoad = false)
        }
    }
    
    func setupChildListMenu(){
        let studentImgbutton = UIButton(type: .custom)
        studentImgbutton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        let imageView = UIImageView()
        imageView.sd_setImage(with: URL(string: AppInstance.shared.selectedChild?.imagePath ?? "")) { (image, error, imageType, url) in
            let image = imageView.image ?? UIImage(named: "placeholder")!
            UIGraphicsBeginImageContextWithOptions(studentImgbutton.frame.size, false, image.scale)
            let rect  = CGRect(x:0, y:0, width: studentImgbutton.frame.size.width, height: studentImgbutton.frame.size.height)
            UIBezierPath(roundedRect: rect, cornerRadius: rect.width/2).addClip()
            image.draw(in: rect)
            if let newImage = UIGraphicsGetImageFromCurrentImageContext() {
                UIGraphicsEndImageContext()
                studentImgbutton.setImage(newImage, for: .normal)
            }
        }
        studentImgbutton.cornerRadius = studentImgbutton.frame.bounds.width/2
        studentImgbutton.clipsToBounds = true
        studentImgbutton.layer.masksToBounds = true
        studentImgbutton.imageView?.contentMode = .scaleAspectFill
        studentImgbutton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: studentImgbutton)

        let dropdownButton = UIButton(type: .custom)
        dropdownButton.setImage(UIImage(named: "dropdown"), for: .normal)
        dropdownButton.frame = CGRect(x: 0, y: -15, width: 30, height: 30)
        dropdownButton.clipsToBounds = true
        dropdownButton.layer.masksToBounds = true
        dropdownButton.imageView?.contentMode = .scaleAspectFit
        dropdownButton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item2 = UIBarButtonItem(customView: dropdownButton)
        self.navigationItem.setRightBarButtonItems([item2,item1], animated: true)
    }


    func setupDropDown(sender: Any){
        var arrForChildName:[String]   =   []
        for child in AppInstance.shared.arrForChild ?? [] {
            arrForChildName.append(child.studentName ?? "")
        }
        dropDownforStudent.anchorView = sender as? UIButton ?? UIButton()
        dropDownforStudent.bottomOffset = CGPoint(x: 0, y: 30 )
        dropDownforStudent.width = 200.0
        dropDownforStudent.dataSource = arrForChildName
        dropDownforStudent.cellHeight = 50
        dropDownforStudent.cellNib = UINib(nibName: Macros.Identifiers.Cells.DropdownStudentTableViewCell, bundle: nil)
        dropDownforStudent.customCellConfiguration = { (index: Index, item: String, cell: DropDownCell) -> Void in
            guard let cell = cell as? DropdownStudentTableViewCell else { return }
            cell.imgViewForStudent.sd_setShowActivityIndicatorView(true)
            cell.imgViewForStudent.sd_setIndicatorStyle(.gray)
            cell.optionLabel.font = fonts.customButtonFont
            cell.optionLabel.textColor = colorCode.grayShadeColor
            cell.imgViewForStudent.sd_setImage(with: URL(string: AppInstance.shared.arrForChild?[index].imagePath ?? ""), completed: { (image, error, imagetype, url) in
                if error != nil {
                    cell.imgViewForStudent.image = UIImage(named: "placeholder")
                }
            })
        }
        dropDownforStudent.selectionAction = {[weak self] (index, item) in
            AppInstance.shared.selectedChild = AppInstance.shared.arrForChild?[index]
            self?.setupChildListMenu()
            self?.apiForGetAttendanceList()
        }
    }
    
    //MARK:----- API Calling Function -----
    func apiForGetAttendanceList() {
        let service = DashboardService()
        service.getAllAttendanceList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: AppInstance.shared.selectedChild?.studentId ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0, askedDate: CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedDate ?? Date())) { (result) in
            self.isFirstLoad = false
            self.arrForAttendanceList = result as? Array<Attendance>
            self.tblViewForAttendanceList.reloadData()
        }
    }
}

//MARK:----- TableViewDatasource and TableViewDelegates
extension AttendanceVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : ((arrForAttendanceList?.count ?? 0 == 0) ? 1 : arrForAttendanceList?.count ?? 1)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if arrForAttendanceList?.count != nil &&  arrForAttendanceList?.count != 0 {
            return customAttendanceListTableViewCell(tableView:tableView,indexPath:indexPath)
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForAttendanceList)
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //Custom IncidentList TableView Cell
    func customAttendanceListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AttendanceListTableViewCell) as? AttendanceListTableViewCell {
           cell.lblForChildName.text = self.arrForAttendanceList?[indexPath.row].studentName
            cell.lblForPickUpBy.text = self.arrForAttendanceList?[indexPath.row].pickupByName
            cell.lblForClassName.text = self.arrForAttendanceList?[indexPath.row].className
            cell.lblForDropOffBy.text = self.arrForAttendanceList?[indexPath.row].dropedByName
            cell.lblForCheckInTime.text = CommonClassMethods.timeFromDateString(date: self.arrForAttendanceList?[indexPath.row].checkInTime ?? "")
            cell.lblForCheckOutTime.text = CommonClassMethods.timeFromDateString(date: self.arrForAttendanceList?[indexPath.row].checkOutTime ?? "")
            return cell
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.StudentBreaksVC) as! StudentBreaksVC
        vc.attendance = self.arrForAttendanceList?[indexPath.row]
        self.navigationController?.pushViewController(vc, animated: true)
    }
}

//MARK:----- UITableView Cell -----
class AttendanceListTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForChildName: UILabel!
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForCheckInTime: UILabel!
    @IBOutlet weak var lblForCheckOutTime: UILabel!
    @IBOutlet weak var lblForDropOffBy: UILabel!
    @IBOutlet weak var lblForPickUpBy: UILabel!
    
}
