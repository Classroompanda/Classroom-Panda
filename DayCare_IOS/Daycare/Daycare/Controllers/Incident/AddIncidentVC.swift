//
//  AddIncidentVC.swift
//  Daycare
//
//  Created by amrut waghmare on 25/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0

//MARK:----- AddIncident Delegate Protocol -----
protocol AddIncidentDelegate : class {
    func submitAddIncidentAction(incident:Incident, selectedRow:Int?)
}

class AddIncidentVC: BaseViewController {
    
    @IBOutlet weak var tblViewForAddIncident: UITableView!
    
    let dropDownForClasses = DropDown()
    let dropDownForStudentList = DropDown()
    let dropDownForNameOfInjury = DropDown()
    let dropDownForTeachearList =   DropDown()
    var incident:Incident = Incident()
    var selectedClass       :   Class?
    var selectedStudent     :   Student?
    var selectedNatureOfInjury  :   NatureOfInjury?
    var selectedTeacher     :   Teacher?
    var selectedIndex: Int?
    var delegate : AddIncidentDelegate?
    var arrForClass         :   [Class]     = []
    var arrForSelectedClassStudents     :   [Student]   =   []
    var arrForSelectedStudents  :   [StudentList]   =   []
    var arrForAllStudents   :   [StudentList]   = []
    var arrForNatureOfInjury:   [NatureOfInjury]    =   []
    var arrForTeacher       :   [Teacher]   =   []
   
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        (incident.id ?? 0) > 0 ? (incident.isAcknowledge ?? false) ? self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.incident) : self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.UpdateIncident) : self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.AddIncident)
        apiForGetAllClasses()
        apiForGetNatureOfInjury()
        apiForGetAllStudents()
        apiForGetAllTeachers()
        if incident.incidentDate == "" || incident.incidentDate == nil {
            incident.incidentDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        }
        if incident.isDoctorRequired == nil {
            incident.isDoctorRequired = false
        }
        if incident.wasParentInformed == nil {
            incident.wasParentInformed = false
        }
    }

    //MARK:----- Actions -----
    @objc func actionForSubmit(){
        if isValidate() {
            apiForAddIncident()
        }
    }
    
    @objc func actionForSelectTime(_ sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.incident.incidentTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            let txtfieldForTime = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForTime?.text = CommonClassMethods.timeFromDate(date: dateTime)
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.show()
    }
    
    @objc func actionForSelectDate(_ sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            self.incident.incidentDate = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForSwitch(_ sender: UISwitch){
        resignTextFieldResponder()
        if let cell = self.tblViewForAddIncident.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? AddIncidentSwitchTableViewCell {
            cell.lblForSwitchStatus.text = sender.isOn ? "On" : "Off"
        }
        if sender.tag == 8{
            incident.wasParentInformed = sender.isOn
            let txtFieldForField = self.view.viewWithTag(sender.tag + 1) as? CustomTextField
            let btnForField = self.view.viewWithTag((sender.tag + 1)*100) as? UILabel
            if sender.isOn == false {
                btnForField?.isEnabled = false
                txtFieldForField?.isEnabled = false
                txtFieldForField?.textColor = .gray
                txtFieldForField?.dividerColor = .gray
                txtFieldForField?.text = ""
                incident.parentInformedBy = ""
            } else {
                btnForField?.isEnabled = true
                txtFieldForField?.isEnabled = true
                txtFieldForField?.textColor = .black
                txtFieldForField?.dividerColor = colorCode.applicationColor
            }
        } else {
            incident.isDoctorRequired = sender.isOn
        }
    }
    
    @objc func showClassesDropdown(sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForClasses.show()
    }
   
    @objc func showStudentListDropdown(sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForStudentList.show()
    }
    
    @objc func showInjuryListDropdown(sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForNameOfInjury.show()
    }
    
    @objc func showTeacherListDropdown(sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForTeachearList.show()
    }

    @objc func showStudentListPopup(sender: UIButton) {
        resignTextFieldResponder()
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.StudentListPopupVC) as! StudentListPopupVC
        popoverContent.delegate = self
        popoverContent.arrForAllStudents = self.arrForAllStudents
        popoverContent.selectedIndex = sender.tag
        popoverContent.arrForSelectedStudents = self.arrForSelectedStudents
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = CGSize(width:300,height:400)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75)   ,width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //MARK:----- Functions -----
    

    //Function for Empty Fields Validation
    func isValidate() -> Bool {
        var isValidate:Bool = true
        if (incident.className == nil || incident.className == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.classes)
        } else  if (incident.studentName == nil || incident.studentName == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.student)
        } else if (incident.placeOfIncident == nil || incident.placeOfIncident == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.placeOfIncident)
        } else if (incident.natureOfInjuryName == nil || incident.natureOfInjuryName == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.natureOfInjury)
        } else if (incident.firstAidAdministeredName == nil || incident.firstAidAdministeredName == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.firstAidAdministrator)
        } else if (incident.incidentDate == nil || incident.incidentDate == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.date)
        }else if (incident.incidentTime == nil || incident.incidentTime == "") {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.time)
        }
        return isValidate
    }
    
//    function for return attributed String
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    //Dropdown list For Classes
    func setupClassesDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrforClassesName   :   [String]    = arrForClass.map{$0.className ?? ""}
        dropDownForClasses.anchorView = sender
        dropDownForClasses.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForClasses.dataSource = arrforClassesName
        dropDownForClasses.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.selectedClass?.className != self?.arrForClass[index].className {
                self?.selectedClass = self?.arrForClass[index]
                self?.incident.classesID = self?.arrForClass[index].classesID
                self?.incident.className = item
                self?.incident.studentID = nil
                self?.incident.studentName = nil
                self?.selectedStudent = nil
                self?.apiForGetStudentsByClasses()
            }
            imageView.image = UIImage(named: "arrowDown")
        }
        dropDownForClasses.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown List For Student List
    func setupStudentListByClassDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrforStudentsName   :   [String]    = arrForSelectedClassStudents.map{$0.studentName ?? ""}
//        for i in 0 ..< arrForSelectedClassStudents.count {
//            arrforStudentsName.append(arrForSelectedClassStudents[i].studentName ?? "")
//        }
        dropDownForStudentList.anchorView = sender
        dropDownForStudentList.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForStudentList.dataSource = arrforStudentsName
        dropDownForStudentList.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.selectedStudent?.studentName != self?.arrForSelectedClassStudents[index].studentName {
                self?.incident.studentID = self?.arrForSelectedClassStudents[index].studentId
                self?.incident.studentName = self?.arrForSelectedClassStudents[index].studentName
                self?.selectedStudent = self?.arrForSelectedClassStudents[index]
            }
            imageView.image = UIImage(named: "arrowDown")
        }
        dropDownForStudentList.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown List For Injury List
    func setupInjuryListDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrforInjuryName   :   [String]    = arrForNatureOfInjury.map{$0.natureOfInjuryName ?? ""}
//        for i in 0 ..< arrForNatureOfInjury.count {
//            arrforInjuryName.append(arrForNatureOfInjury[i].natureOfInjuryName ?? "")
//        }
        dropDownForNameOfInjury.anchorView = sender
        dropDownForNameOfInjury.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForNameOfInjury.dataSource = arrforInjuryName
        dropDownForNameOfInjury.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.selectedNatureOfInjury?.natureOfInjuryName != self?.arrForNatureOfInjury[index].natureOfInjuryName {
                self?.selectedNatureOfInjury = self?.arrForNatureOfInjury[index]
                self?.incident.natureOfInjuryName = item
                self?.incident.natureOfInjuryID = self?.arrForNatureOfInjury[index].id
            }
            imageView.image = UIImage(named: "arrowDown")
        }
        dropDownForNameOfInjury.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }

    //Dropdown List For Teacher List
    func setupTeacherListDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrforTeacherName   :   [String]    = arrForTeacher.map{$0.teacherName ?? ""}
//        for i in 0 ..< arrForTeacher.count {
//            arrforTeacherName.append(arrForTeacher[i].teacherName ?? "")
//        }
        dropDownForTeachearList.anchorView = sender
        dropDownForTeachearList.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForTeachearList.dataSource = arrforTeacherName
        dropDownForTeachearList.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.selectedTeacher?.teacherName != self?.arrForTeacher[index].teacherName {
                self?.selectedTeacher = self?.arrForTeacher[index]
                self?.incident.teacherID = self?.arrForTeacher[index].id
                self?.incident.teacherName = item
                self?.incident.firstAidAdministeredID = self?.arrForTeacher[index].id
                self?.incident.firstAidAdministeredName = self?.arrForTeacher[index].teacherName
            }
            imageView.image = UIImage(named: "arrowDown")
        }
        dropDownForTeachearList.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }

    //Genarate Incident Model Data from Incident Data Dictionary
    func genrateIncidentParameters() -> Dictionary<String,Any> {
        var parameters :[String:Any] = [:]
        incident.id = incident.id ?? 0
        incident.agencyID = AppInstance.shared.user?.agencyID
        incident.incidentPriortyTypeID = incident.incidentPriortyTypeID ?? 2
        incident.reporter = incident.reporter ?? 1
        parameters = incident.dictionaryRepresentation()
//        var  arrForIncidentInvolvement: [[String:Any]] = []
//        for incidentInvolvement in (self.incident.incidentInvolvments ?? []) {
//            arrForIncidentInvolvement.append(incidentInvolvement.dictionaryRepresentation())
//        }
//
        let arrForIncidentInvolvement: [[String:Any]] = self.incident.incidentInvolvments?.map({ (incident) -> [String:Any] in
            incident.dictionaryRepresentation()
        }) ?? [[:]]
        
        parameters[Macros.ApiKeys.kincidentInvolvments] = arrForIncidentInvolvement
        parameters[Macros.ApiKeys.kwasParentInformed] = incident.wasParentInformed
        parameters[Macros.ApiKeys.kisDoctorRequired] = incident.isDoctorRequired
        ((incident.id ?? 0) > 0) ? (parameters[Macros.ApiKeys.kupdatedBy] = AppInstance.shared.user?.loginUserID) : (parameters[Macros.ApiKeys.kcreatedBy] = AppInstance.shared.user?.loginUserID)
        return parameters
    }

    
    
    func resignTextFieldResponder(){
        let view = self.view.subviews[0] as? UITableView
        for subview in view?.subviews ?? [] where subview is DropDownTextFieldTableViewCell {
            let cell = subview as? DropDownTextFieldTableViewCell
            cell?.txtFieldForField.resignFirstResponder()
        }
        for subview in view?.subviews ?? [] where subview is TextViewTableViewCell {
            let cell = subview as? TextViewTableViewCell
            cell?.txtViewForField.resignFirstResponder()
        }
    }
    
    //MARK:----- API Calling Functions -----
    
    func apiForGetAllClasses(){
        let service = AttendanceService()
        service.getAllClasses(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if let arrForClasses = result as? [Class]{
                self.arrForClass = arrForClasses
                for classObj in arrForClasses {
                    if self.incident.classesID == classObj.classesID {
                        self.selectedClass = classObj
                        self.apiForGetStudentsByClasses()
                    }
                }
                if self.incident.className == nil || self.incident.className == "" {
                    self.selectedClass = self.arrForClass.first
                    self.incident.classesID = self.arrForClass.first?.classesID
                    self.incident.className = self.arrForClass.first?.className
                    self.apiForGetStudentsByClasses()
                }
                self.tblViewForAddIncident.reloadData()
            }
        }
    }
    
    func apiForGetNatureOfInjury(){
        let service = IncidentService()
        service.getNatureOfInjuryList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.arrForNatureOfInjury = result as? [NatureOfInjury] ?? []
            for injury in self.arrForNatureOfInjury {
                if self.incident.natureOfInjuryID == injury.id {
                    self.selectedNatureOfInjury = injury
                }
            }
            self.tblViewForAddIncident.reloadData()
        }
    }
    
    func apiForGetStudentsByClasses(){
        
        let service = StudentService()
        service.getAllStudentsByClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classId: selectedClass?.classesID ?? 0) { (result) in
            self.arrForSelectedClassStudents = result as? [Student] ?? []
            for student in self.arrForSelectedClassStudents {
                if self.incident.studentID == student.studentId {
                    self.selectedStudent = student
                }
            }
            self.tblViewForAddIncident.reloadData()
        }
    }
    
    func apiForGetAllStudents(){
        let service = StudentService()
        service.getAllStudensDropdownList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.arrForAllStudents = result as? [StudentList] ?? []
            if let incidentInvolvments = self.incident.incidentInvolvments {
                for i in 0..<self.arrForAllStudents.count {
                    for incidentInvolvment in incidentInvolvments {
                        if incidentInvolvment.studentID == self.arrForAllStudents[i].value {
                            self.arrForAllStudents[i].isSelected = true
                            self.arrForSelectedStudents.append(self.arrForAllStudents[i])
                        }
                    }
                }
            }
        }
    }
    
    func apiForGetAllTeachers(){
        let service = IncidentService()
        service.getTeacherList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            self.arrForTeacher = result as? [Teacher] ?? []
            for teacher in self.arrForTeacher {
                if self.incident.firstAidAdministeredID == teacher.id {
                    self.selectedTeacher = teacher
                }
            }
            self.tblViewForAddIncident.reloadData()
        }
    }

    
    func apiForAddIncident(){
        let service = IncidentService()
        service.saveIncidentData(with: self, param: self.genrateIncidentParameters()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.incident.id = response["saveId"] as? Int
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: response["message"] as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        self.delegate?.submitAddIncidentAction(incident: self.incident, selectedRow: self.selectedIndex)
                        self.navigationController?.popViewController(animated: true)
                    default:
                        break
                    }
                })
            }
        }
    }
}

//MARK:----- UITableView Datasource and Delegates -----
extension AddIncidentVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (incident.id != 0 && incident.id != nil ) ? 17 : 16
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0,1,3,4,5 :
            return customDropDownButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case 7:
            return customAddIncidentDateTimeTableViewCell(tableView:tableView,indexPath:indexPath)
        case 6,8:
            return customAddIncidentSwitchTableViewCell(tableView:tableView,indexPath:indexPath)
        case 10,11:
            return customAddIncidentTextViewTableViewCell(tableView:tableView,indexPath:indexPath)
        case 15 :
            return (incident.id != 0 && incident.id != nil ) ? customParentCommentTableViewCell(tableView: tableView, indexPath: indexPath) : customSubmitButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case 16 :
            return (incident.isAcknowledge ?? false) ? UITableViewCell() : customSubmitButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return customAddIncidentDropDownTableViewCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //AddIncident DateTime TableView Cell
    func customAddIncidentDateTimeTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForAddIncident.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = self.tblViewForAddIncident.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.backgroundColor = .clear
            cell.selectionStyle = .none
            cell.lblForLeftTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ControllerStrings.AddIncidentVC.DateOfIncident)
            cell.lblForRightTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ControllerStrings.AddIncidentVC.TimeOfIncident)
            cell.txtFieldForRight.isEnabled = false
            cell.txtFieldForleft.isEnabled = false
            cell.txtFieldForleft.text = incident.incidentDate != nil ? (CommonClassMethods.dateFromDateString(date: incident.incidentDate ?? "")) : CommonClassMethods.dateFromDateFormat(date: Date())
            if incident.incidentTime != nil {
                cell.txtFieldForRight.text = CommonClassMethods.timeFromDateString(date: incident.incidentTime ?? "")
            }
            cell.btnForLeft.tag = (indexPath.row * 10)
            cell.txtFieldForleft.tag = (indexPath.row * 10)
            cell.btnForLeft.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
            cell.btnForRight.tag = (indexPath.row * 20)
            cell.txtFieldForRight.tag = (indexPath.row * 20)
            cell.btnForRight.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            cell.imgViewForLeft.image = UIImage(named: "calendarBlue")
            cell.imgViewForRight.image = UIImage(named: "clock")
            return cell
        }
        return UITableViewCell()
    }
    
    //AddIncident DropDown TableView Cell
    func customAddIncidentDropDownTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddIncident.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForAddIncident.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.lblForFieldTitle.tag = (indexPath.row * 100)
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForIncidentTitle[indexPath.row])
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.isEnabled = true
            cell.txtFieldForField.isEnabled = true
            cell.txtFieldForField.textColor = .black
            cell.txtFieldForField.dividerColor = colorCode.applicationColor
            if indexPath.row >= 9 || indexPath.row == 2 {
                cell.btnForField.isHidden = true
                cell.imgViewForArrow.isHidden = true
                switch indexPath.row {
                case 2:
                    cell.txtFieldForField.isEnabled = true
                    if incident.placeOfIncident != nil && incident.placeOfIncident != "" {
                        cell.txtFieldForField.text = incident.placeOfIncident
                    }else{
                        cell.txtFieldForField.text =  ""
                        cell.txtFieldForField.placeholder = Macros.ControllerStrings.AddIncidentVC.Place
                    }
                case 12:
                    cell.txtFieldForField.isEnabled = true
                    if incident.partOfBody != nil && incident.partOfBody != "" {
                        cell.txtFieldForField.text = incident.partOfBody
                    }else{
                        cell.txtFieldForField.text =  ""
                        cell.txtFieldForField.placeholder = Macros.ControllerStrings.AddIncidentVC.partOfBody
                    }
                case 13:
                    cell.txtFieldForField.isEnabled = true
                    if incident.contextEnviroment != nil && incident.contextEnviroment != "" {
                        cell.txtFieldForField.text = incident.contextEnviroment
                    }else{
                        cell.txtFieldForField.text =  ""
                        cell.txtFieldForField.placeholder = Macros.ControllerStrings.AddIncidentVC.contextEnviornment
                    }
                case 14:
                    cell.txtFieldForField.isEnabled = true
                    if incident.contextChild != nil && incident.contextChild != "" {
                        cell.txtFieldForField.text = incident.contextChild
                    }else{
                        cell.txtFieldForField.text =  ""
                        cell.txtFieldForField.placeholder = Macros.ControllerStrings.AddIncidentVC.contextChild
                    }
                default:
                    cell.txtFieldForField.placeholder = ""
                        if incident.wasParentInformed ?? false {
                            cell.btnForField.isEnabled = true
                            cell.txtFieldForField.isEnabled = true
                            cell.txtFieldForField.textColor = .black
                            cell.txtFieldForField.dividerColor = colorCode.applicationColor
                            if incident.parentInformedBy != nil && incident.parentInformedBy != "" {
                                cell.txtFieldForField.text = incident.parentInformedBy
                            }else{
                                cell.txtFieldForField.text =  ""
                            }
                        } else {
                            cell.btnForField.isEnabled = false
                            cell.txtFieldForField.isEnabled = false
                            cell.txtFieldForField.textColor = .gray
                            cell.txtFieldForField.dividerColor = .gray
                            cell.txtFieldForField.text =  ""
                        }
                    }
                }
                return cell
            }
        return UITableViewCell()
    }
    
    //AddIncident Switch TableView Cell
    func customAddIncidentSwitchTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddIncidentSwitchTableViewCell) as? AddIncidentSwitchTableViewCell {
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForIncidentTitle[indexPath.row])
            cell.switchForField.tag = indexPath.row
            cell.lblForSwitchStatus.tag = indexPath.row
            indexPath.row == 6 ? (cell.switchForField.isOn = incident.isDoctorRequired ?? false) : (cell.switchForField.isOn = incident.wasParentInformed ?? false)
            indexPath.row == 6 ? (cell.lblForSwitchStatus.text = incident.isDoctorRequired ?? false ? "On" : "Off") : (cell.lblForSwitchStatus.text = incident.wasParentInformed ?? false ? "On" : "Off")
            cell.switchForField.addTarget(self, action: #selector(actionForSwitch(_:)), for: .valueChanged)
            return cell
        }
        return UITableViewCell()
    }
    
    
    //AddIncident TextView TableView Cell
    func customAddIncidentTextViewTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForAddIncident.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForAddIncident.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForIncidentTitle[indexPath.row])
            cell.txtViewForField.tag = indexPath.row
            switch indexPath.row {
            case 10:
                if incident.incidentDescription != nil && incident.incidentDescription != "" {
                    cell.txtViewForField.text = incident.incidentDescription
                }else{
                    cell.txtViewForField.text =  ""
                }
            case 11:
                if incident.actionTaken != nil && incident.actionTaken != "" {
                    cell.txtViewForField.text = incident.actionTaken
                }else{
                    cell.txtViewForField.text =  ""
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddIncident.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForAddIncident.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForIncidentTitle[indexPath.row])
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 0:
                self.setupClassesDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(showClassesDropdown(sender:)), for: .touchUpInside)
                if incident.className != nil && incident.className != "" {
                    cell.btnForField.setTitle(incident.className, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
            case 1:
                self.setupStudentListByClassDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(showStudentListDropdown(sender:)), for: .touchUpInside)
                if incident.studentName != nil && incident.studentName != "" {
                    cell.btnForField.setTitle(incident.studentName, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
            case 3:
                self.setupInjuryListDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(showInjuryListDropdown(sender:)), for: .touchUpInside)
                if incident.natureOfInjuryName != nil && incident.natureOfInjuryName != "" {
                    cell.btnForField.setTitle(incident.natureOfInjuryName, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
            case 4:
                cell.btnForField.setTitle("Select", for: .normal)
                cell.btnForField.addTarget(self, action: #selector(showStudentListPopup(sender:)), for: .touchUpInside)
                if (incident.incidentInvolvments?.count ?? 0) > 0 {
                    cell.lblForSelectedItems.isHidden = false
                    cell.ViewForSelectedItems.isHidden = false
//                    var nameOfStudents = String()
//                    let incidentInvolvments = incident.incidentInvolvments
//                    if incidentInvolvments?.count ?? 0 > 0 {
//                        for student in incidentInvolvments! {
//                            nameOfStudents.append("\(student.studentName ?? ""), ")
//                        }
//                    }
//                    nameOfStudents.remove(at: nameOfStudents.index(before: nameOfStudents.endIndex))
//                    nameOfStudents.remove(at: nameOfStudents.index(before: nameOfStudents.endIndex))
//                    cell.lblForSelectedItems.text = nameOfStudents
                    cell.lblForSelectedItems.text = incident.incidentInvolvments?.map{$0.studentName ?? ""}.joined(separator: ",")
                } else {
                    cell.lblForSelectedItems.isHidden = true
                    cell.ViewForSelectedItems.isHidden = true
                }
            case 5:
                self.setupTeacherListDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(showTeacherListDropdown(sender:)), for: .touchUpInside)
                if incident.firstAidAdministeredName != nil && incident.firstAidAdministeredName != "" {
                    cell.btnForField.setTitle(incident.firstAidAdministeredName, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customParentCommentTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ParentCommentOnIncidentTableViewCell) as? ParentCommentOnIncidentTableViewCell {
            cell.lblForParentComment.text = (self.incident.parentComment != "" && self.incident.parentComment != nil) ? self.incident.parentComment : Macros.ControllerStrings.AddIncidentVC.parentComment
            return cell
        }
        return UITableViewCell()
    }
    
    func customSubmitButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForAddIncident.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = self.tblViewForAddIncident.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Student List Popup Delegate -----
extension AddIncidentVC: StudentListVCDelegate{

    func doneButtonAction(data: String,selectedIndex:Int,selectedStudents: [StudentList]) {
        print(data)
        self.arrForSelectedStudents = selectedStudents
//        var arrForIncidentInvolvemet:[IncidentInvolvments] = []
//            for i in 0..<selectedStudents.count {
//                let incidentInvolvemet = IncidentInvolvments()
//                incidentInvolvemet.agencyID = AppInstance.shared.user?.agencyID ?? 0
//                incidentInvolvemet.studentName =  selectedStudents[i].label
//                incidentInvolvemet.studentID   =  selectedStudents[i].value
////                incidentInvolvemet.className   =  selectedStudents[i].className
////                incidentInvolvemet.classesID   =  selectedStudents[i].classId
//                incidentInvolvemet.id          =  0
//                incidentInvolvemet.incidentID  =  0
//                arrForIncidentInvolvemet.append(incidentInvolvemet)
//            }
//        self.incident.incidentInvolvments = arrForIncidentInvolvemet
        self.incident.incidentInvolvments = selectedStudents.map({ (student) -> IncidentInvolvments in
            let incidentInvolvemet = IncidentInvolvments()
            incidentInvolvemet.agencyID = AppInstance.shared.user?.agencyID ?? 0
            incidentInvolvemet.studentName =  student.label
            incidentInvolvemet.studentID   =  student.value
            incidentInvolvemet.id          =  0
            incidentInvolvemet.incidentID  =  0
            return incidentInvolvemet
        })
        let indexPath = IndexPath(row: selectedIndex, section: 0)
        self.tblViewForAddIncident.reloadRows(at: [indexPath], with: .none)
    }
}

//MARK:----- UITextField Delegates -----
extension AddIncidentVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        switch textField.tag {
        case 2:
            incident.placeOfIncident = newString as String
        case 12:
            incident.partOfBody = newString as String
        case 13:
            incident.contextEnviroment = newString as String
        case 14:
            incident.contextChild = newString as String
        default:
            incident.parentInformedBy = newString as String
        }
//        textField.tag == 2 ? (incident.placeOfIncident = newString as String) : (incident.parentInformedBy = newString as String)
//        self.arrOfdictForIncidentData[textField.tag]["text"] = newString
        return true
    }
}

//MARK:----- UITextView Delegates -----
extension AddIncidentVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        textView.tag == 10 ? (incident.incidentDescription = newString as String) : (incident.actionTaken = newString as String)
//        self.arrOfdictForIncidentData[textView.tag]["text"] = newString
        return true
    }
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddIncident.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    func textViewDidEndEditing(_ textView: UITextView) {
        if let cell = self.tblViewForAddIncident.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
    }
    func textViewDidBeginEditing(_ textView: UITextView) {
        if let cell = self.tblViewForAddIncident.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
    }
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddIncident.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}


//MARK:----- AddIncidentSwitch TableView Cell -----
class AddIncidentSwitchTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var switchForField: UISwitch!
    @IBOutlet weak var lblForSwitchStatus: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        switchForField.onTintColor = switchForField.isOn ? colorCode.applicationColor : .darkGray
        // Initialization code
    }
}

class ParentCommentOnIncidentTableViewCell: UITableViewCell {
    
    @IBOutlet weak var lblForParentComment: UILabel!
}


