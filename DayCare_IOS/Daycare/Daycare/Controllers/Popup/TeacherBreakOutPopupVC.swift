//
//  TeacherBreakOutPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 15/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

//MARK:----- TeacherBreak Delegate Protocol -----
protocol TeacherBreakDelegate : class {
    func submitBreakButtonAction(teacherBreak:TeacherBreakLog)
}

class TeacherBreakOutPopupVC: UIViewController {

    @IBOutlet weak var txtViewForReason: CustomTextView!
    @IBOutlet weak var lblForBreakHeader: UILabel!
    @IBOutlet weak var lblForDivider: UILabel!
    @IBOutlet weak var lblForBreakTitle: UILabel!
    @IBOutlet weak var viewForBreakIn: UIView!
    @IBOutlet weak var lblForReasonAlert: UILabel!
    var teacherBreak = TeacherBreakLog()
    var delegate: TeacherBreakDelegate?
    var isBreakIn:Bool?
    override func viewDidLoad() {
        super.viewDidLoad()
        txtViewForReason.placeholderLabel.text = "Reason"
        lblForReasonAlert.isHidden = true
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        if isBreakIn ?? false {
            self.viewForBreakIn.isHidden = false
            self.lblForBreakTitle.text = Macros.alertMessages.breakInAlert
            self.lblForBreakHeader.text = Macros.alertMessages.breakInHeader
            self.teacherBreak = AppInstance.shared.teacherBreak ?? TeacherBreakLog()
            self.teacherBreak.breakStatusID = teacherBreakStatus.BreakIn
            self.teacherBreak.id = AppInstance.shared.teacherBreak?.id
            self.teacherBreak.agencyID = AppInstance.shared.user?.agencyID
            self.teacherBreak.teacherDailyAttendenceID = AppInstance.shared.user?.teacherTodayAttendenceId
            self.teacherBreak.breakTypesID = 0
        } else {
            self.viewForBreakIn.isHidden = true
            self.teacherBreak.agencyID = AppInstance.shared.user?.agencyID
            self.teacherBreak.id = 0
            self.teacherBreak.teacherDailyAttendenceID = AppInstance.shared.user?.teacherTodayAttendenceId
            self.teacherBreak.breakTypesID = 0
            self.teacherBreak.breakStatusID = teacherBreakStatus.BreakOut
            self.lblForBreakTitle.text = Macros.alertMessages.breakOutAlert
            self.lblForBreakHeader.text = Macros.alertMessages.breakOutHeader
        }
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForBreakIn(_ sender: Any) {
        teacherBreak.updatedBy = AppInstance.shared.user?.loginUserID
        teacherBreak.breakIn  = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        delegate?.submitBreakButtonAction(teacherBreak: teacherBreak)
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForSubmit(_ sender: Any) {
        if teacherBreak.breakStatusID == teacherBreakStatus.BreakOut {
            teacherBreak.breakOut = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        } else {
            teacherBreak.breakIn  = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
            self.dismiss(animated: true, completion: nil)
        }
        if txtViewForReason.text.trimmed != "" && txtViewForReason.text != nil {
            lblForReasonAlert.isHidden = true
            teacherBreak.createdBy = AppInstance.shared.user?.loginUserID
            AppInstance.shared.teacherBreak?.createdBy = AppInstance.shared.user?.loginUserID
            AppInstance.shared.teacherBreak = self.teacherBreak
            delegate?.submitBreakButtonAction(teacherBreak: teacherBreak)
            self.dismiss(animated: true, completion: nil)
        } else {
            lblForReasonAlert.isHidden = false
        }
    }
}

//MARK:----- UITextField Delegate -----
extension TeacherBreakOutPopupVC: UITextViewDelegate{
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        teacherBreak.breakReason = newString as String
        if teacherBreak.breakReason?.trimmed.length() == 0 {
            lblForReasonAlert.isHidden = false
        } else {
            lblForReasonAlert.isHidden = true
        }
        return true
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        lblForDivider.backgroundColor = colorCode.applicationColor
        lblForDivider.frame = CGRect(x: lblForDivider.frame.minX, y: lblForDivider.frame.minY, width: lblForDivider.frame.width, height: 2.0)
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        lblForDivider.backgroundColor = .lightGray
        lblForDivider.frame = CGRect(x: lblForDivider.frame.minX, y: lblForDivider.frame.minY, width: lblForDivider.frame.width, height: 1.0)
        return true
    }
}

