//
//  AbsentPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 12/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import SDWebImage

//MARK:----- Absent Popup Delegate Protocol -----
protocol AbsentDelegate : class {
    func submitAbsentButtonAction(attendanceDate:String,selectedRow:Int,id:Int,attendenceStatusID:Int,onLeave: Bool,onLeaveComment:String,reasonId:String,studentID:Int)
}

class AbsentPopupVC: UIViewController {
    @IBOutlet weak var btnForSave: CustomButton!
    @IBOutlet weak var btnForCancel: CustomButton!
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForDayTime: UILabel!
    @IBOutlet weak var txtFieldForReason: CustomTextField!
    @IBOutlet weak var btnForReason: UIButton!
    @IBOutlet weak var txtFiildForNote: CustomTextField!
    @IBOutlet weak var btnForUndo: UIButton!
    @IBOutlet weak var imgForUndo: UIImageView!
    
    let reasonDropDown     = DropDown()
    var arrForReason   :   [LeaveReason]?
    var arrForReasonNames   :   [String] = []
    var selectedReason      :   LeaveReason?
    var delegate : AbsentDelegate?
    var attendance : Attendance?
    var selectedDate : Date?
    var selectedTime : Date?
    var selectedRow : Int?
    var isEditButtonClicked :   Bool?
    var isUndo : Bool?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 30 : 20
        if isEditButtonClicked ?? false {
            btnForUndo.isHidden = false
            imgForUndo.isHidden = false
        } else {
            btnForUndo.isHidden = true
            imgForUndo.isHidden = true
        }
    }
    

    //MARK:----- @IBOutlets -----
    
    @IBAction func actionForUndo(_ sender: UIButton) {
        if imgForUndo.image == UIImage(named:"selectedFill") {
            isUndo = false
            imgForUndo.image = UIImage(named:"unselected")
        } else {
            isUndo = true
            imgForUndo.image = UIImage(named:"selectedFill")
        }
//        if sender.image(for: .normal) == UIImage(named:"selectedFill"){
//            isUndo = false
//            sender.setImage(UIImage(named:"unselected"), for: .normal)
//        } else {
//            isUndo = true
//            sender.setImage(UIImage(named:"selectedFill"), for: .normal)
//        }
    }
    
    @IBAction func actionForSave(_ sender: Any) {
        if self.txtFieldForReason.text == "", !(isUndo ?? false) {
            _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.selectAbsentReason, onViewController: self)
        } else {
            delegate?.submitAbsentButtonAction(attendanceDate: attendance?.attendanceDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date()),selectedRow:selectedRow ?? 0,id: attendance?.id ?? 0,attendenceStatusID:(isUndo ?? false) ? AttendanceStatus.isToBeChecked : AttendanceStatus.isCheckedAbsent,onLeave: isUndo ?? false,onLeaveComment:(isUndo ?? false) ? "" : txtFiildForNote.text!,reasonId:String(selectedReason?.leaveReasonTypeID ?? 0),studentID:self.attendance?.studentID ?? 0)
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        delegate?.submitAbsentButtonAction(attendanceDate:"",selectedRow:selectedRow ?? 0,id:0,attendenceStatusID:0,onLeave: true,onLeaveComment:"",reasonId:"",studentID:0)
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForSelectReason(_ sender: UIButton) {
        sender.setImage(UIImage(named: "arrowUp"), for: .normal)
        reasonDropDown.show()
    }
    
    @IBAction func actionForEdit(_ sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: Date(), doneBlock: {
            picker, value, index in
            print("value = \(String(describing: value))")
            let dateTime    = value as! Date
            self.selectedTime = dateTime
            self.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: self.selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:self.selectedTime ?? Date())
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    //MARK:----- Functions -----
    
    //Initial Setup
    func initialSetup(){
        
        btnForSave.frame = CGRect(x: btnForSave.bounds.minX, y: btnForSave.bounds.minY, width: btnForSave.bounds.width, height: 50.0)
        btnForCancel.frame = CGRect(x: btnForCancel.bounds.minX, y: btnForCancel.bounds.minY, width: btnForCancel.bounds.width, height: 50.0)
        self.lblForName.text = attendance?.studentName
        self.lblForDate.text = CommonClassMethods.dateFromFormat(date: selectedDate ?? Date())
        self.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//        self.imgViewForProfile.sd_setShowActivityIndicatorView(true)
//        self.imgViewForProfile.sd_setIndicatorStyle(.gray)
        self.imgViewForProfile.sd_setImage(with: URL(string: attendance?.imagePath ?? "")) { (image, error, type, url) in
            if error != nil {
                self.imgViewForProfile.image = UIImage(named: "placeholder")
            }
        }
        for reason in arrForReason ?? [] {
            self.arrForReasonNames.append(reason.leaveReasonTypeName ?? "")
        }
        self.lblForDayTime.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.timeFromDate(date:selectedTime ?? Date())
        if attendance?.attendenceStatusID == AttendanceStatus.isCheckedAbsent {
            self.txtFiildForNote.text = attendance?.onLeaveComment
            for reason in arrForReason ?? [] {
                if attendance?.reasonId == reason.leaveReasonTypeID {
                    self.txtFieldForReason.text = reason.leaveReasonTypeName
                    self.selectedReason = reason
                }
            }
        }
        self.setupReasonDropdown(sender: btnForReason)
    }
    
    
    //Dropdown list
    func setupReasonDropdown(sender:UIButton){
        reasonDropDown.anchorView = sender
        reasonDropDown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        reasonDropDown.dataSource = arrForReasonNames
        reasonDropDown.selectionAction = { [weak self] (index, item) in
            self?.txtFieldForReason.text = self?.arrForReasonNames[index]
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
            self?.selectedReason = self?.arrForReason?[index]
        }
        reasonDropDown.cancelAction = { [unowned self] in
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
        }
    }
    
}
