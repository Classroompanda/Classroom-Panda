//
//  EnrollStudentVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 04/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown
import Material

//MARK:----- Enroll Student Delegate Protocol -----
protocol EnrollStudentDelegate : class {
    func submitEnrollStudentAction(studentEnrollment:Enrollment)
}

class EnrollStudentVC: BaseViewController {

    @IBOutlet weak var tblViewForEnrollStudent: UITableView!
    var arrForClasses:[Class]?
    var dropdownForClasses = DropDown()
    var studentEnrollment:Enrollment = Enrollment()
    var delegate:EnrollStudentDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.studentEnrollment.classEnrollStartDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        self.studentEnrollment.enrollmentStartDateee = Date()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForSave(_ sender: UIButton){
        if isValidate() {
            self.studentEnrollment.id = self.studentEnrollment.id ?? 0
            self.studentEnrollment.studentName = AppInstance.shared.selectedChild?.studentName
            self.studentEnrollment.agencyID = AppInstance.shared.user?.agencyID ?? 0
            self.studentEnrollment.studentID = AppInstance.shared.selectedChild?.studentId ?? 0
            self.studentEnrollment.enrollmentStatus = StudentEnrollmentStatus.requested
            self.studentEnrollment.classEnrollStartDate = CommonClassMethods.convertDateToServerReadableFormat(date: self.studentEnrollment.enrollmentStartDateee ?? Date())
            self.studentEnrollment.createdBy = AppInstance.shared.user?.loginUserID
            if self.studentEnrollment.classEnrollEndDate != "" && self.studentEnrollment.classEnrollEndDate != nil {
                self.studentEnrollment.classEnrollEndDate = CommonClassMethods.convertDateToServerReadableFormat(date: self.studentEnrollment.enrollmentEndDateee ?? Date())
            }
            delegate?.submitEnrollStudentAction(studentEnrollment: self.studentEnrollment)
            self.dismiss(animated: true, completion: nil)
        }
    }
    @IBAction func actionForCancel(_ sender: UIButton){
        self.dismiss(animated: true, completion: nil)
    }
    @objc func actionForDatePicker(_ sender: UIButton) {
        let selectedDate = sender.tag == 2 ? CommonClassMethods.dateObjectFromDateString(date: studentEnrollment.classEnrollStartDate ?? "") : CommonClassMethods.dateObjectFromDateString(date: studentEnrollment.classEnrollEndDate ?? "")
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            if let cell = self.tblViewForEnrollStudent.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                cell.txtFieldForField.isErrorRevealed = false
            }
            switch sender.tag {
            case 2:
                self.studentEnrollment.classEnrollStartDate = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                self.studentEnrollment.enrollmentStartDateee = dateTime
                if (CommonClassMethods.convertDateWithoutTime(date: dateTime) < CommonClassMethods.convertDateWithoutTime(date: self.studentEnrollment.enrollmentEndDateee ?? Date())) {
                    self.studentEnrollment.classEnrollEndDate = ""
                    self.studentEnrollment.enrollmentEndDateee = nil
                    if let cell = self.tblViewForEnrollStudent.cellForRow(at: IndexPath(row: sender.tag+1, section: 0)) as? DropDownTextFieldTableViewCell {
                        cell.txtFieldForField.text = ""
                    }
                }
            case 3:
                self.studentEnrollment.classEnrollEndDate = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                self.studentEnrollment.enrollmentEndDateee = dateTime
            default:
                print("Invalid case")
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.minimumDate = sender.tag == 2 ? Date() : CommonClassMethods.dateObjectFromDateString(date: studentEnrollment.classEnrollStartDate ?? "")
//        datePicker?.minimumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForDropDown(_ sender: UIButton){
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupDropDown(imageView ?? UIImageView(), sender: sender)
        dropdownForClasses.show()
    }
    //Dropdown list For City
    func setupDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForClassName:[String]   =   []
        for classes in arrForClasses ?? [] {
            arrForClassName.append(classes.className ?? "")
        }
        dropdownForClasses.anchorView = sender
        dropdownForClasses.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropdownForClasses.dataSource = arrForClassName
        dropdownForClasses.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.studentEnrollment.className = item
            self?.studentEnrollment.classesID = self?.arrForClasses?[index].classesID ?? 0
            if let cell = self?.tblViewForEnrollStudent.cellForRow(at: IndexPath(row: 1, section: 0)) as? DropDownButtonCell {
                cell.txtFieldForField.isErrorRevealed = false
            }
        }
        dropdownForClasses.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //VAlidation function
    
    func isValidate() -> Bool {
        if (studentEnrollment.classesID == 0 || studentEnrollment.classesID == nil){
            if let cell = self.tblViewForEnrollStudent.cellForRow(at: IndexPath(row: 1, section: 0)) as? DropDownButtonCell {
                cell.txtFieldForField.isErrorRevealed = true
            }
            return false
        } else if (studentEnrollment.classEnrollStartDate == "" || studentEnrollment.classEnrollStartDate == nil){
            if let cell = self.tblViewForEnrollStudent.cellForRow(at: IndexPath(row: 2, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.isErrorRevealed = true
            }
            return false
        }
        return true
    }
}

//MARK:----- UITableView Delegate & Datasource -----
extension EnrollStudentVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 4
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return customChildInfoHeaderCell(tableView:tableView,indexPath:indexPath)
        case 1:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        default:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func customChildInfoHeaderCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EnrollStudentHederCell) as? EnrollStudentHederCell {
            cell.lblForChildName.text = AppInstance.shared.selectedChild?.studentName
           if AppInstance.shared.selectedChild?.imagePath == "" && AppInstance.shared.selectedChild?.imagePath == nil {
                cell.imgViewForChild.sd_setShowActivityIndicatorView(true)
                cell.imgViewForChild.sd_setIndicatorStyle(.gray)
                cell.imgViewForChild.sd_setImage(with: URL(string: AppInstance.shared.selectedChild?.imagePath ?? "")) { (image, error, type, url) in
                    if error != nil {
                        cell.imgViewForChild.image = UIImage(named: "child")
                    }
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForEnrollStudent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.btnForField.isHidden = false
            cell.txtFieldForField.isEnabled = false
            cell.imgViewForArrow.isHidden = false
            cell.txtFieldForField.placeholder = Macros.ConstantArray.arrForEnrollStudentTitle[indexPath.row]
            cell.txtFieldForField.error = Macros.ConstantArray.arrForEnrollStudentValidations[indexPath.row]
            cell.btnForField.addTarget(self, action:  #selector(actionForDatePicker(_:)), for: .touchUpInside)
            switch indexPath.row {
            case 2:
                if let date = self.studentEnrollment.enrollmentStartDateee {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: date)
                } else {
                    cell.txtFieldForField.text = ""
                }
            case 3:
                if let date = self.studentEnrollment.enrollmentEndDateee {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: date)
                } else {
                    cell.txtFieldForField.text = ""
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForEnrollStudent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForEnrollStudentTitle[indexPath.row]
            cell.txtFieldForField.error = Macros.ConstantArray.arrForEnrollStudentValidations[indexPath.row]
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.btnForField.addTarget(self, action: #selector(actionForDropDown(_:)), for: .touchUpInside)
            cell.txtFieldForField.text = self.studentEnrollment.className
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:---- UITableView Cell ----
class EnrollStudentHederCell: UITableViewCell{
    @IBOutlet weak var imgViewForChild: UIImageView!
    @IBOutlet weak var lblForChildName: UILabel!
}
