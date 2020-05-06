//
//  StudentHealthDescriptionVC.swift
//  Daycare
//
//  Created by amrut waghmare on 27/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class StudentHealthDescriptionVC: BaseViewController {
    
    @IBOutlet weak var tblViewForHealthDescription: UITableView!
//    var student:StudentInformation?
    var healthDescriptionStatus:Int?
    var child: Child?
    
    var arrForAllergyName : [DropDownModel]?
    var arrForAllergyType : [DropDownModel]?
    var arrForImmunizationType  :   [DropDownModel]?
    var arrForAllergyReactionType : [DropDownModel]?
    var arrForDoesType : [DropDownModel]?
    
    var arrForAllergies:[Allergies] = []
    var arrForImmunization:[Immunization] = []
    var arrForMedication:[Medication] = []
    var arrForDisability:[Disability] = []
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Immunization)
        case HealthDecriptionStatus.Allergies:
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Allergies)
        case HealthDecriptionStatus.Medication:
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Medication)
        default:
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Disabilities)
        }
    }
    
    func actionForDelete(indexPath:IndexPath){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                switch self.healthDescriptionStatus {
                case HealthDecriptionStatus.Immunization:
                    self.arrForImmunization[indexPath.row].isDeleted = true
                    self.arrForImmunization[indexPath.row].deletedBy = AppInstance.shared.user?.releventUserID ?? 0
                    self.arrForImmunization[indexPath.row].deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                    var dictForParam = self.arrForImmunization[indexPath.row].dictionaryRepresentation()
                    dictForParam[Macros.ApiKeys.kIsDeleted] = true
                    self.apiForSaveImmunization(param: dictForParam, indexPath: indexPath)
                    self.arrForImmunization.remove(at: indexPath.row)
                    self.tblViewForHealthDescription.reloadData()
                    
                case HealthDecriptionStatus.Allergies:
                    self.arrForAllergies[indexPath.row].isDeleted = true
                    self.arrForAllergies[indexPath.row].deletedBy = AppInstance.shared.user?.releventUserID ?? 0
                    self.arrForAllergies[indexPath.row].deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                    var dictForParam = self.arrForAllergies[indexPath.row].dictionaryRepresentation()
                    dictForParam[Macros.ApiKeys.kIsDeleted] = true
                    self.apiForSaveAllergies(param: dictForParam, indexPath: indexPath)
                    self.arrForAllergies.remove(at: indexPath.row)
                    self.tblViewForHealthDescription.reloadData()
                    
                case HealthDecriptionStatus.Medication:
                    self.arrForMedication[indexPath.row].isDeleted = true
                    self.arrForMedication[indexPath.row].deletedBy = AppInstance.shared.user?.releventUserID ?? 0
                    self.arrForMedication[indexPath.row].deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                    var dictForParam = self.arrForMedication[indexPath.row].dictionaryRepresentation()
                    dictForParam[Macros.ApiKeys.kIsDeleted] = true
                    self.apiForSaveMedication(param: dictForParam, indexPath: indexPath)
                    self.arrForMedication.remove(at: indexPath.row)
                    self.tblViewForHealthDescription.reloadData()
                    
                default:
                    self.arrForDisability[indexPath.row].isDeleted = true
                    self.arrForDisability[indexPath.row].deletedBy = AppInstance.shared.user?.releventUserID ?? 0
                    self.arrForDisability[indexPath.row].deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                    var dictForParam = self.arrForDisability[indexPath.row].dictionaryRepresentation()
                    dictForParam[Macros.ApiKeys.kIsDeleted] = true
                    self.apiForSaveDisabilies(param: dictForParam, indexPath: indexPath)
                    self.arrForDisability.remove(at: indexPath.row)
                    self.tblViewForHealthDescription.reloadData()
                }
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    func actionForEdit(indexPath:IndexPath){
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            self.openImmunizationsPopup(indexPath: indexPath)
        case HealthDecriptionStatus.Allergies:
            self.openAlllergiesPopup(indexPath: indexPath)
        case HealthDecriptionStatus.Medication:
            self.openMedicationPopup(indexPath: indexPath)
        default:
            self.openDisabilityPopup(indexPath: indexPath)
        }
    }
    
    func openAlllergiesPopup(indexPath: IndexPath){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddAllergiesPopupVC) as! AddAllergiesPopupVC
        popoverContent.delegate = self
        popoverContent.isEdited = true
        popoverContent.child = self.child
        popoverContent.arrForAllergyName = arrForAllergyName
        popoverContent.arrForAllergyType = arrForAllergyType
        popoverContent.arrForAllergyReactionType = arrForAllergyReactionType
        popoverContent.allergy = self.arrForAllergies[indexPath.row]
        popoverContent.selectedIndex = indexPath.row
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:(self.view.bounds.height - 100))
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openImmunizationsPopup(indexPath: IndexPath){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddImmunizationPopupVC) as! AddImmunizationPopupVC
        popoverContent.delegate = self
        popoverContent.isEdited = true
        popoverContent.arrForImmunizationType = arrForImmunizationType
        popoverContent.child = self.child
        popoverContent.immunization = self.arrForImmunization[indexPath.row]
        popoverContent.selectedIndex = indexPath.row
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:440)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openDisabilityPopup(indexPath: IndexPath){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddDisabilityPopupVC) as! AddDisabilityPopupVC
        popoverContent.delegate = self
        popoverContent.child = self.child
        popoverContent.isEdited = true
        popoverContent.disabilty = self.arrForDisability[indexPath.row]
        popoverContent.selectedIndex = indexPath.row
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize =  CGSize(width:(self.view.bounds.width - 60),height:280)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openMedicationPopup(indexPath: IndexPath){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddMedicationPopupVC) as! AddMedicationPopupVC
        popoverContent.delegate = self
        popoverContent.arrForDoes = self.arrForDoesType
        popoverContent.child = self.child
        popoverContent.isEdited = true
        popoverContent.medication = self.arrForMedication[indexPath.row]
        popoverContent.selectedIndex = indexPath.row
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:(self.view.bounds.height - 100))
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    
    //MARK:----- API Calling Functions -----
    func apiForSaveImmunization(param: Dictionary<String,Any>, indexPath: IndexPath){
        let service = ChildService()
        service.saveChildImmunizationData(with: nil, param: param) { (result) in
            if result != nil {
                if self.arrForImmunization.count == 0 {
                    self.tblViewForHealthDescription.reloadData()
                }
            } else {
                if let immunization = Immunization.init(dictionary: param) {
                    self.arrForImmunization.insert(immunization, at: indexPath.row)
                    self.tblViewForHealthDescription.insertRows(at: [indexPath], with: .automatic)
                }
            }
        }
    }
    
    func apiForSaveAllergies(param: Dictionary<String,Any>, indexPath: IndexPath){
        let service = ChildService()
        service.saveChildAllergiesData(with: nil, param: param) { (result) in
            if result != nil {
                if self.arrForAllergies.count == 0 {
                    self.tblViewForHealthDescription.reloadData()
                }
            } else {
                if let allergy = Allergies.init(dictionary: param) {
                    self.arrForAllergies.insert(allergy, at: indexPath.row)
                    self.tblViewForHealthDescription.insertRows(at: [indexPath], with: .automatic)
                }
            }
        }
    }
    
    func apiForSaveMedication(param: Dictionary<String,Any>, indexPath: IndexPath){
        let service = ChildService()
        service.saveChildMedicationData(with: nil, param: param) { (result) in
            if result != nil {
                if self.arrForMedication.count == 0 {
                    self.tblViewForHealthDescription.reloadData()
                }
            } else {
                if let medication = Medication.init(dictionary: param) {
                    self.arrForMedication.insert(medication, at: indexPath.row)
                    self.tblViewForHealthDescription.insertRows(at: [indexPath], with: .automatic)
                }
            }
        }
    }
    
    func apiForSaveDisabilies(param: Dictionary<String,Any>, indexPath: IndexPath){
        let service = ChildService()
        service.saveChildDisabilityData(with: nil, param: param) { (result) in
            if result != nil {
                if self.arrForDisability.count == 0 {
                    self.tblViewForHealthDescription.reloadData()
                }
            } else {
                if let disability = Disability.init(dictionary: param) {
                    self.arrForDisability.insert(disability, at: indexPath.row)
                    self.tblViewForHealthDescription.insertRows(at: [indexPath], with: .automatic)
                }
            }
        }
    }

}

//MARK:----- UITableView DataSource and Delegates -----
extension StudentHealthDescriptionVC: UITableViewDataSource,UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return self.arrForImmunization.count == 0 ? 1 : self.arrForImmunization.count
        case HealthDecriptionStatus.Allergies:
            return self.arrForAllergies.count == 0 ? 1 : self.arrForAllergies.count
        case HealthDecriptionStatus.Medication:
            return self.arrForMedication.count == 0 ? 1 : self.arrForMedication.count
        default:
            return self.arrForDisability.count == 0 ? 1 : self.arrForDisability.count
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return (self.arrForImmunization.count == 0) ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForHealthDescription) : customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        case HealthDecriptionStatus.Allergies:
            return (self.arrForAllergies.count == 0) ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForHealthDescription) : customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        case HealthDecriptionStatus.Medication:
            return (self.arrForMedication.count == 0) ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForHealthDescription) : customMedicationDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return (self.arrForDisability.count == 0) ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForHealthDescription) : customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    
    @available(iOS 11.0, *)
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let delete =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            //do stuff
            self.actionForDelete(indexPath: indexPath)
            completionHandler(true)
        })
        let edit =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            //do stuff
            self.actionForEdit(indexPath: indexPath)
            completionHandler(true)
        })
        edit.image = UIImage(named: "editWhite")
        edit.backgroundColor = colorCode.gradientTopColor
        delete.image = UIImage(named: "delete")
        delete.backgroundColor = .red
        let confrigation = UISwipeActionsConfiguration(actions: [delete,edit])
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return self.arrForImmunization.count == 0 ? UISwipeActionsConfiguration(actions: []) : confrigation
        case HealthDecriptionStatus.Allergies:
            return self.arrForAllergies.count == 0 ? UISwipeActionsConfiguration(actions: []) : confrigation
        case HealthDecriptionStatus.Medication:
            return self.arrForMedication.count == 0 ? UISwipeActionsConfiguration(actions: []) : confrigation
        default:
            return self.arrForDisability.count == 0 ? UISwipeActionsConfiguration(actions: []) : confrigation
        }
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        let delete = UITableViewRowAction(style: .destructive, title: "Delete") { (action, indexPath) in
            self.actionForDelete(indexPath: indexPath)
            // delete item at indexPath
        }
        let edit = UITableViewRowAction(style: .normal, title: "Edit") { (action, indexPath) in
            self.actionForEdit(indexPath: indexPath)
            // share item at indexPath
        }
        edit.backgroundColor = colorCode.gradientTopColor
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return self.arrForImmunization.count == 0 ? [] : [delete, edit]
        case HealthDecriptionStatus.Allergies:
            return self.arrForAllergies.count == 0 ? [] : [delete, edit]
        case HealthDecriptionStatus.Medication:
            return self.arrForMedication.count == 0 ? [] : [delete, edit]
        default:
            return self.arrForDisability.count == 0 ? [] : [delete, edit]
        }
    }
    
    //Custom Student MedicationDescription Cell
    func customMedicationDescriptionTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MedicationDescriptionTableViewCell, for: indexPath) as? MedicationDescriptionTableViewCell {
            cell.lblForMedicationName.text = self.arrForMedication[indexPath.row].medicationName ?? "---"
            cell.lblForDoes.text = self.arrForMedication[indexPath.row].doseRepeatName ?? "---"
            cell.lblForUnit.text = String(self.arrForMedication[indexPath.row].units ?? 0)
            cell.lblForStrength.text = self.arrForMedication[indexPath.row].strength ?? "---"
            cell.lblForHowTaken.text = self.arrForMedication[indexPath.row].howTaken ?? "---"
            return cell
        }
        return UITableViewCell()
    }
    
    //Custom Student OhterHealthDescription Cell
    func customOhterHealthDescriptionTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.OhterHealthDescriptionTableViewCell, for: indexPath) as? OhterHealthDescriptionTableViewCell {
            switch healthDescriptionStatus {
            case HealthDecriptionStatus.Immunization:
                cell.lblForTitle.text = self.arrForImmunization[indexPath.row].immunizationName ?? "---"
                cell.lblForSubTitle1.text = Macros.ControllerString.DateReceived
                cell.lblForDescription1.text = CommonClassMethods.dateFromDateStringS(date: self.arrForImmunization[indexPath.row].dateReceived ?? "")
                cell.lblForSubtitle2.text = Macros.ControllerString.otherImmunization
                cell.lblForDescription2.text = self.arrForImmunization[indexPath.row].otherImmunization ?? "---"
            case HealthDecriptionStatus.Allergies:
                cell.lblForTitle.text = self.arrForAllergies[indexPath.row].allergyName ?? ""
                cell.lblForSubTitle1.text = Macros.ControllerString.reaction
                cell.lblForDescription1.text = self.arrForAllergies[indexPath.row].allergyReactionTypeName ?? "---"
                cell.lblForSubtitle2.text = Macros.ControllerString.treatment
                cell.lblForDescription2.text = self.arrForAllergies[indexPath.row].treatment ?? "---"
            default:
                cell.lblForTitle.text = self.arrForDisability[indexPath.row].disabilityDescription ?? ""
                cell.lblForSubTitle1.text = ""
                cell.lblForDescription1.text = ""
                cell.lblForSubtitle2.text = ""
                cell.lblForDescription2.text = ""
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Edit Health Information Delegate ------
extension StudentHealthDescriptionVC: HealthDescriptionDelegate{
    func saveAction(param: Dictionary<String, Any>, healthStatusType: Int, selectedIndex: Int?) {
        let indexPath = IndexPath(row: selectedIndex ?? 0, section: 0)
        switch healthStatusType {
        case HealthDecriptionStatus.Allergies:
            self.apiForSaveAllergies(param: param, indexPath: indexPath)
            if let index = selectedIndex {
                if let allergy = Allergies.init(dictionary: param) {
                    self.arrForAllergies[index] = allergy
                    let indexPath = IndexPath(item: index, section: 0)
                    self.tblViewForHealthDescription.reloadRows(at: [indexPath], with: .automatic)
                }
            }
        case HealthDecriptionStatus.Immunization:
            self.apiForSaveImmunization(param: param, indexPath: indexPath)
            if let index = selectedIndex {
                if let immunization = Immunization.init(dictionary: param) {
                    self.arrForImmunization[index] = immunization
                    let indexPath = IndexPath(item: index, section: 0)
                    self.tblViewForHealthDescription.reloadRows(at: [indexPath], with: .automatic)
                }
            }
        case HealthDecriptionStatus.Medication:
            self.apiForSaveMedication(param: param, indexPath: indexPath)
            if let index = selectedIndex {
                if let medication = Medication.init(dictionary: param) {
                    self.arrForMedication[index] = medication
                    let indexPath = IndexPath(item: index, section: 0)
                    self.tblViewForHealthDescription.reloadRows(at: [indexPath], with: .automatic)
                }
            }
        case HealthDecriptionStatus.Disability:
            self.apiForSaveDisabilies(param: param, indexPath: indexPath)
            if let index = selectedIndex {
                if let disability = Disability.init(dictionary: param) {
                    self.arrForDisability[index] = disability
                    let indexPath = IndexPath(item: index, section: 0)
                    self.tblViewForHealthDescription.reloadRows(at: [indexPath], with: .automatic)
                }
            }
        default:
            print("Inavalid Status")
        }
    }
}

//MARK:----- Add Guardian Popover Delegatge -----
extension StudentHealthDescriptionVC : UIPopoverPresentationControllerDelegate {
    
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}

//MARK:----- MedicationDescription TableView Cell -----
class MedicationDescriptionTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForMedicationName: UILabel!
    @IBOutlet weak var lblForStrength: UILabel!
    @IBOutlet weak var lblForHowTaken: UILabel!
    @IBOutlet weak var lblForDoes: UILabel!
    @IBOutlet weak var lblForUnit: UILabel!
}

//MARK:----- OtherHealthDescription TableView Cell -----
class OhterHealthDescriptionTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForSubTitle1: UILabel!
    @IBOutlet weak var lblForSubtitle2: UILabel!
    @IBOutlet weak var lblForDescription1: UILabel!
    @IBOutlet weak var lblForDescription2: UILabel!
}
