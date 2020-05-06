//
//  AddDisabilityPopupVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 25/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
class AddDisabilityPopupVC: UIViewController {

    @IBOutlet weak var lblForNavTitle: UILabel!
    @IBOutlet weak var txtViewForComment: CustomTextView!
    @IBOutlet weak var lblForTxtView: UILabel!
    @IBOutlet weak var lblForReason: UILabel!
    var child: Child?
    var disabilty = Disability()
    var delegate: HealthDescriptionDelegate?
    var isEdited:Bool?
    var selectedIndex:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.lblForReason.isHidden = true
        txtViewForComment.delegate = self
        self.lblForNavTitle.text =  (isEdited ?? false) ? Macros.NavigationBarTitle.editDisability : Macros.NavigationBarTitle.addDisability
        txtViewForComment.text = (isEdited ?? false) ? disabilty.disabilityDescription : ""
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
         self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForSave(_ sender: Any) {
        self.disabilty.studentID = self.child?.studentId ?? 0
        self.disabilty.agencyID = AppInstance.shared.user?.agencyID ?? 0
        self.disabilty.id = self.disabilty.id ?? 0
        self.disabilty.disabilityDescription = txtViewForComment.text
        if txtViewForComment.text == "" || txtViewForComment.text == nil {
            self.lblForReason.text = Macros.alertMessages.description
            self.lblForReason.isHidden = false
        } else {
            (self.isEdited ?? false) ? (disabilty.updatedBy = AppInstance.shared.user?.loginUserID) : (disabilty.createdBy = AppInstance.shared.user?.loginUserID)
            self.delegate?.saveAction(param: self.disabilty.dictionaryRepresentation(), healthStatusType: HealthDecriptionStatus.Disability, selectedIndex: selectedIndex)
            self.dismiss(animated: true, completion: nil)
        }
    }
}
//MARK:----- UITextView Delegates -----
extension AddDisabilityPopupVC: UITextViewDelegate{
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        lblForTxtView.backgroundColor = colorCode.applicationColor
        lblForTxtView.frame = CGRect(x: lblForTxtView.frame.minX, y: lblForTxtView.frame.minY, width: lblForTxtView.frame.width, height: 2.0)
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        lblForTxtView.backgroundColor = .lightGray
        lblForTxtView.frame = CGRect(x: lblForTxtView.frame.minX, y: lblForTxtView.frame.minY, width: lblForTxtView.frame.width, height: 1.0)
        return true
    }
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        if newString.length > 500 {
            self.lblForReason.text = Macros.alertMessages.descriptionMaxLength
            self.lblForReason.isHidden = false
            return false
        } else {
            self.lblForReason.text = Macros.alertMessages.description
            self.lblForReason.isHidden = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() != 0
            return true
        }
    }
}
