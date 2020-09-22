//
//  IncidentDetailVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 14/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

protocol IncidentDelegate: class {
    func updateIncident(incident: Incident?, index: Int)
}

class IncidentDetailVC: BaseViewController {
    
    @IBOutlet weak var tblViewForIncidentDetail: UITableView!
    var incident:Incident?
    var selectedIndex:Int?
    var delegate: IncidentDelegate?
    var isAlreadyAcknowledge = Bool()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.IncidentDetail)
        self.tblViewForIncidentDetail.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        self.isAlreadyAcknowledge = incident?.isAcknowledge ?? false
        // Do any additional setup after loading the view.
    }
    
    @objc func actionForAcknowledgement(_ sender: UIButton){
        sender.isSelected = !sender.isSelected
    }
    
    @objc func actionForSubmit(_ sender: UIButton) {
//        if incident?.parentComment != nil && incident?.parentComment != "" {
            self.showConfirmationAlert()
//        } else {
//            self.showAlert(with: Macros.alertMessages.comment)
//        }
    }
    
    func showConfirmationAlert(){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.updateIncident , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForUpdateIncident()
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
//    func popViewController(message: String){
//        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
//        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: message, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
//            switch index {
//            case 0:
//                self.navigationController?.popViewController(animated: true)
//            default:
//                break
//            }
//        })
//    }

    
    //MARK:------ API Calling Functions ------
    func apiCallForUpdateIncident(){
        let service = IncidentService()
        service.updateIncidentByParent(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, incidentId: incident?.id ?? 0, isAcknowledge: incident?.isAcknowledge ?? false, parentComment: incident?.parentComment ?? "", updatedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.delegate?.updateIncident(incident: self.incident, index: self.selectedIndex ?? 0)
                self.popViewController(message: response["message"] as? String ?? "")
            }
        }
    }
}
//MARK:----- UITableView Delegates and DataSource ------
extension IncidentDetailVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch (indexPath.row) {
        case 0:
            return customIncidentDetailTableViewCell(tableView: tableView, indexPath: indexPath)
//        case 1:
//            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
            // David asked to remove comment as some parents are rude. So they might add inappropriate comment
        case 1:
            return customAcknowledgeTableViewCell(tableView: tableView, indexPath: indexPath)
        case 2:
            return customSubmitButtonCell(tableView: tableView, indexPath: indexPath)
        default :
            return UITableViewCell()
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.row == 1 {
             if let cell = tableView.cellForRow(at: indexPath) as? IncidentAcknowledgeCheckTableViewCell {
                if !isAlreadyAcknowledge {
                    cell.btnForAcknowledge.isSelected = !cell.btnForAcknowledge.isSelected
                    self.incident?.isAcknowledge = cell.btnForAcknowledge.isSelected
                }
            }
        }
    }
    
    func customIncidentDetailTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.IncidentDetailTableViewCell) as? IncidentDetailTableViewCell {
            cell.lblForClassName.text = incident?.className
            cell.lblForStudentName.text = incident?.studentName
            cell.lblForReportedBy.text = incident?.teacherName
            cell.lblForPlaceOfIncident.text = incident?.placeOfIncident
            cell.lblForNatureOfInjury.text = incident?.natureOfInjuryName
            cell.lblForPartOfBody.text = incident?.partOfBody
            cell.lblForContextEnviroment.text = incident?.contextEnviroment
            cell.lblForContextChild.text = incident?.contextChild
            cell.lblForFirstAidAdministretor.text = incident?.firstAidAdministeredName
            cell.lblForDoctorRequired.text = (incident?.isDoctorRequired ?? false) ? "Yes" : "No"
            cell.lblForDateOfIncident.text = (CommonClassMethods.dateMonthFromDateString(date: incident?.incidentDate ?? ""))
            cell.lblForTimeOfIncident.text = (CommonClassMethods.timeFromDateString(date: incident?.incidentTime ?? ""))
            cell.lblForParentInformed.text = (incident?.wasParentInformed ?? false) ? "Yes" : "No"
            cell.lblForParentInformedByLabel.isHidden = !(incident?.wasParentInformed ?? false)
            cell.lblForParentInformedBy.isHidden = !(incident?.wasParentInformed ?? false)
            cell.lblForParentInformedBy.text = incident?.parentInformedBy
            if (incident?.incidentInvolvments?.count ?? 0) > 0 {
                let arrForStudents:[String] = incident?.incidentInvolvments?.map { ($0.studentName ?? "") } ?? []
                let students = arrForStudents.joined(separator:", ")
                cell.lblForInvolveParticipant.text = students
            }
            cell.lblForDescription.text = incident?.incidentDescription
            cell.lblForActionTaken.text = incident?.actionTaken
            return cell
        }
        return UITableViewCell()
    }
    
    func customDescriptionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForIncidentDetail.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForIncidentDetail.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.tag = indexPath.row
            cell.txtViewForField.delegate = self
            cell.lblForFieldTitle.text = "Comment"
            cell.txtViewForField.text = incident?.parentComment
            return cell
        }
        return UITableViewCell()
    }
    
    func customAcknowledgeTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.IncidentAcknowledgeCheckTableViewCell) as? IncidentAcknowledgeCheckTableViewCell {
            cell.selectionStyle = .none
            cell.btnForAcknowledge.isSelected = self.incident?.isAcknowledge ?? false
//            cell.btnForAcknowledge.addTarget(self, action: #selector(actionForSubmit(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
    
    
    func customSubmitButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForIncidentDetail.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = tblViewForIncidentDetail.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UITextView Delegates -----
extension IncidentDetailVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        if newString.length > 500 {
            return false
        } else {
            self.incident?.parentComment = newString as String
            return true
        }
    }
    
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForIncidentDetail.cellForRow(at: IndexPath(row:textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForIncidentDetail.cellForRow(at: IndexPath(row:textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}


//MARK:----- UITableView Cell -----
class IncidentDetailTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForReportedBy: UILabel!
    @IBOutlet weak var lblForPlaceOfIncident: UILabel!
    @IBOutlet weak var lblForNatureOfInjury: UILabel!
    @IBOutlet weak var lblForPartOfBody: UILabel!
    @IBOutlet weak var lblForContextEnviroment: UILabel!
    @IBOutlet weak var lblForContextChild: UILabel!
    @IBOutlet weak var lblForFirstAidAdministretor: UILabel!
    @IBOutlet weak var lblForDoctorRequired: UILabel!
    @IBOutlet weak var lblForDateOfIncident: UILabel!
    @IBOutlet weak var lblForTimeOfIncident: UILabel!
    @IBOutlet weak var lblForParentInformed: UILabel!
    @IBOutlet weak var lblForParentInformedBy: UILabel!
    @IBOutlet weak var lblForInvolveParticipant: UILabel!
    @IBOutlet weak var lblForDescription: UILabel!
    @IBOutlet weak var lblForActionTaken: UILabel!
    @IBOutlet weak var lblForParentInformedByLabel: UILabel!
}

class IncidentAcknowledgeCheckTableViewCell: UITableViewCell {
    @IBOutlet weak var btnForAcknowledge: UIButton!
}
