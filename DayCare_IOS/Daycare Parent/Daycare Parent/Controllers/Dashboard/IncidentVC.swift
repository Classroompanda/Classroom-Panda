//
//  IncidentVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import SDWebImage
import DropDown

class IncidentVC: BaseViewController {
    @IBOutlet weak var tblViewForIncidentList: UITableView!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForMonthYear: UILabel!
    @IBOutlet weak var lblForDayName: UILabel!
    var selectedDate:Date?
    var isFirstLoad:Bool = true
    var refreshControl = UIRefreshControl()
//    var dropDownforStudent = DropDown()
    var arrForIncidents : [Incident]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationBarTitle.IncidentReport)
        self.selectedDate = Date()
        if (AppInstance.shared.selectedChild != nil) {
            self.setupChildListMenu()
            apiForGetIncidentList ()
        } else {
            (isFirstLoad = false)
        }
        // Do any additional setup after loading the view.
    }

    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
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
                self.apiForGetIncidentList ()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }

    @objc func actionForSearch(){

    }

    

    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetIncidentList ()
    }

    @objc func actionForOpenDropdown(sender: UIButton){
        self.setupDropDown(sender: sender)
        dropDownforStudent.show()
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        refreshControl.attributedTitle = NSAttributedString(string: Macros.ControllerString.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
        self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
        self.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
        if (AppInstance.shared.selectedChild != nil) {
            tblViewForIncidentList.addSubview(refreshControl)
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
        studentImgbutton.imageView?.contentMode = .scaleAspectFit
        studentImgbutton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: studentImgbutton)

        let dropdownButton = UIButton(type: .custom)
        dropdownButton.setImage(UIImage(named: "dropdown"), for: .normal)
        dropdownButton.frame = CGRect(x: 0, y: -15, width: 30, height: 30)
        dropdownButton.clipsToBounds = true
        dropdownButton.layer.masksToBounds = true
        dropdownButton.imageView?.contentMode = .scaleAspectFill
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
            self?.apiForGetIncidentList ()
        }
    }

    //MARK:----- API Calling Function -----
    func apiForGetIncidentList() {
        let service = IncidentService()
        service.getAllIncidents(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentID: AppInstance.shared.selectedChild?.studentId ?? 0, incidentDate: CommonClassMethods.convertDateToServerReadableFormat(date: self.selectedDate ?? Date())) { (result) in
            self.isFirstLoad = false
            self.refreshControl.endRefreshing()
            self.arrForIncidents = result as? Array<Incident>
            self.tblViewForIncidentList.reloadData()
        }
    }
}

//MARK:----- TableViewDatasource and TableViewDelegates
extension IncidentVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : ((arrForIncidents?.count ?? 0 == 0) ? 1 : arrForIncidents?.count ?? 1)
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if arrForIncidents?.count != nil &&  arrForIncidents?.count != 0 {
            return customIncidentListTableViewCell(tableView:tableView,indexPath:indexPath)
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForIncidentList)
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if (self.arrForIncidents?.count ?? 0) > 0 {
            let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.IncidentDetailVC) as! IncidentDetailVC
            vc.incident = self.arrForIncidents?[indexPath.row]
            vc.selectedIndex = indexPath.row
            vc.delegate = self
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }

    //MARK:----- Custom TableView Cell -----

    //Custom IncidentList TableView Cell
    func customIncidentListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let arrForPopulation:[Incident] = self.arrForIncidents ?? []
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.IncidentLisTableViewCell) as? IncidentLisTableViewCell {
            cell.lblForIncidentName.text = arrForPopulation[indexPath.row].natureOfInjuryName
//            cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: arrForPopulation[indexPath.row].incidentDate ?? "")
            cell.lblForDate.text = ""
            cell.lblForReportedBy.text = arrForPopulation[indexPath.row].teacherName
            cell.lblForStudent.text = arrForPopulation[indexPath.row].studentName
            cell.lblForLocation.text = arrForPopulation[indexPath.row].placeOfIncident
            cell.lblForActionTaken.text = arrForPopulation[indexPath.row].actionTaken
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Update incident Delegate -----
extension IncidentVC : IncidentDelegate {
    func updateIncident(incident: Incident?, index: Int) {
        if (self.arrForIncidents?.count ?? 0) > index {
            if let selectedIncident = incident {
                self.arrForIncidents?[index] = selectedIncident
            }
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
