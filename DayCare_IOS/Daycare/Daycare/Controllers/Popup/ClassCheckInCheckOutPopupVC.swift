//
//  ClassCheckInCheckOutPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 05/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0

protocol ClassCheckInCheckOutDelegate : class {
    func submitButtonAction(teacherClassLog:TeacherClassLog?, sender:UIButton?)
}

class ClassCheckInCheckOutPopupVC: UIViewController {

    @IBOutlet weak var tblViewForClassCheckTime: UITableView!
    @IBOutlet weak var lblForClassName: UILabel!
    var teacherClassLog:TeacherClassLog?
    var delegate:ClassCheckInCheckOutDelegate?
    var sender:UIButton?
    override func viewDidLoad() {
        super.viewDidLoad()
        lblForClassName.text = teacherClassLog?.className
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForSubmit(_ sender: Any) {
        delegate?.submitButtonAction(teacherClassLog: self.teacherClassLog, sender: sender as? UIButton)
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @objc func actionForSelectTime(_ sender: UIButton){
        let selectedDate = CommonClassMethods.dateObjectFromDateString(date: (sender.tag == 0) ? (teacherClassLog?.checkInTime ?? "") : (teacherClassLog?.checkOutTime ?? ""))
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            (sender.tag == 0) ? (self.teacherClassLog?.checkInTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)) : (self.teacherClassLog?.checkOutTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime))
            if let cell = self.tblViewForClassCheckTime.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.timeFromDate(date: dateTime)
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
}

//MARK:----- UITableView Delegate & Datasource ----
extension ClassCheckInCheckOutPopupVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (teacherClassLog?.checkStatus == CheckInStatus.CheckedIn) ? 1 : 2
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customTextFieldProfileTableViewCell(tableView:tableView,indexPath:indexPath)
    }
    
    func customTextFieldProfileTableViewCell(tableView: UITableView,indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForClassCheckTime.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForClassCheckTime.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.ViewForSelectedItems.isHidden = true
            cell.txtFieldForField.isEnabled = false
            cell.imgViewForArrow.isHidden = false
            cell.btnForField.isHidden = false
            cell.imgViewForArrow.image = UIImage(named: "clock")
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.btnForField.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForClassCheckInOutEdit[indexPath.row]
            cell.txtFieldForField.text = (indexPath.row == 0) ? CommonClassMethods.timeFromDateString(date: teacherClassLog?.checkInTime ?? "") : CommonClassMethods.timeFromDateString(date: teacherClassLog?.checkOutTime ?? "")
            return cell
        }
        return UITableViewCell()
    }
}
