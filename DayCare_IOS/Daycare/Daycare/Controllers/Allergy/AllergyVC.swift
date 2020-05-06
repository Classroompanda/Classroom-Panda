//
//  AllergyVC.swift
//  Daycare
//
//  Created by Kiran Thakur on 16/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class AllergyVC: BaseViewController {

    var studentAllergies : Array<StudentAllergies>?
    @IBOutlet weak var allergyTableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationTitle.allergy)
        allergyTableView.rowHeight = UITableView.automaticDimension

        if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
            self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
            return
        }
        getAllStudentAllergies()
    }
    
    //MARK:----- API Calling Function -----
    
    func getAllStudentAllergies() {
        let service = StudentService()
        service.getAllStudentsAllergie(with: self, complition: { (result) in
            if result != nil {
                self.studentAllergies = result as? [StudentAllergies]
                self.allergyTableView.reloadData()
            }
        })
    }

}

//MARK:----- UITableView DataSource and Delegates -----

extension AllergyVC: UITableViewDataSource,UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
          return UITableView.automaticDimension
      }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return studentAllergies?.count ?? 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        return studentAllergies?.count ?? 0 > 0 ? customStudentAllergyTableViewCell(tableView:tableView, indexPath:indexPath) : CommonClassMethods.customNoDataFoundCell(tableView:allergyTableView)
    }
    
    func customStudentAllergyTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.OhterHealthDescriptionTableViewCell, for: indexPath) as? OhterHealthDescriptionTableViewCell {
            let allergyDetail = studentAllergies?[indexPath.row]
            cell.selectionStyle = .none
            cell.lblForTitle.text = allergyDetail?.allergyName ?? ""
            cell.lblForSubTitle1.text =  Macros.ControllerStrings.StudentHealthDescriptionVC.reaction
            cell.lblForDescription1.text = allergyDetail?.allergyReactionTypeName ?? "---"
            cell.lblForSubtitle2.text = Macros.ControllerStrings.StudentHealthDescriptionVC.treatment
            cell.lblForDescription2.text = allergyDetail?.treatment ?? "---"
            cell.studentNameLabel.text = allergyDetail?.studentName ?? ""
            return cell
        }
        return UITableViewCell()
    }
    
    
}
