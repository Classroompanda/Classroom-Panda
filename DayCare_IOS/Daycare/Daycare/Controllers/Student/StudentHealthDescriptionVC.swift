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
    var student:Student?
    var healthDescriptionStatus:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Immunization)
        case HealthDecriptionStatus.Allergies:
            self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Allergies)
        case HealthDecriptionStatus.Medication:
            self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Medication)
        default:
            self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Disabilities)
        }
    }
}

//MARK:----- UITableView DataSource and Delegates -----
extension StudentHealthDescriptionVC: UITableViewDataSource,UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return self.student?.studentImmunizations?.count ?? 0
        case HealthDecriptionStatus.Allergies:
            return self.student?.studentAllergies?.count ?? 0
        case HealthDecriptionStatus.Medication:
            return self.student?.studentMedications?.count ?? 0
        default:
            return self.student?.studentDisabilities?.count ?? 0
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch healthDescriptionStatus {
        case HealthDecriptionStatus.Immunization:
            return customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        case HealthDecriptionStatus.Allergies:
            return customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        case HealthDecriptionStatus.Medication:
            return customMedicationDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return customOhterHealthDescriptionTableViewCell(tableView:tableView,indexPath:indexPath)
        }
        
    }
    
    //Custom Student MedicationDescription Cell
    func customMedicationDescriptionTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MedicationDescriptionTableViewCell, for: indexPath) as? MedicationDescriptionTableViewCell {
            cell.lblForMedicationName.text = self.student?.studentMedications?[indexPath.row].medicationName ?? "---"
            cell.lblForDoes.text = self.student?.studentMedications?[indexPath.row].doseRepeatName ?? "---"
            cell.lblForUnit.text = String(self.student?.studentMedications?[indexPath.row].units ?? 0)
            cell.lblForStrength.text = self.student?.studentMedications?[indexPath.row].strength ?? "---"
            cell.lblForHowTaken.text = self.student?.studentMedications?[indexPath.row].howTaken ?? "---"
            return cell
        }
        return UITableViewCell()
    }
    
    //Custom Student OhterHealthDescription Cell
    func customOhterHealthDescriptionTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.OhterHealthDescriptionTableViewCell, for: indexPath) as? OhterHealthDescriptionTableViewCell {
            switch healthDescriptionStatus {
            case HealthDecriptionStatus.Immunization:
                cell.lblForTitle.text = self.student?.studentImmunizations?[indexPath.row].immunizationName ?? "---"
                cell.lblForSubTitle1.text = Macros.ControllerStrings.StudentHealthDescriptionVC.DateReceived
                cell.lblForDescription1.text = CommonClassMethods.dateFromDateString(date: self.student?.studentImmunizations?[indexPath.row].dateReceived ?? "")
                cell.lblForSubtitle2.text = Macros.ControllerStrings.StudentHealthDescriptionVC.otherImmunization
                cell.lblForDescription2.text = self.student?.studentImmunizations?[indexPath.row].otherImmunization ?? "---"
            case HealthDecriptionStatus.Allergies:
                cell.lblForTitle.text = self.student?.studentAllergies?[indexPath.row].allergyName ?? ""
                cell.lblForSubTitle1.text = Macros.ControllerStrings.StudentHealthDescriptionVC.reaction
                cell.lblForDescription1.text = self.student?.studentAllergies?[indexPath.row].allergyReactionTypeName ?? "---"
                cell.lblForSubtitle2.text = Macros.ControllerStrings.StudentHealthDescriptionVC.treatment
                cell.lblForDescription2.text = self.student?.studentAllergies?[indexPath.row].treatment ?? "---"
            default:
                cell.lblForTitle.text = self.student?.studentDisabilities?[indexPath.row].description ?? ""
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
    @IBOutlet weak var studentNameLabel: UILabel!

}
