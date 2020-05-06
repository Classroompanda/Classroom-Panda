//
//  IncidentService.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class IncidentService: APIService {
    
    //MARK:---- Incident List API -----
    func getAllIncidents(with target:BaseViewController?, agencyID:Int, studentID: Int, incidentDate: String,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID: studentID, Macros.ApiKeys.kincidentDate: incidentDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllIncidentsByChildID, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let incidents = Incident.modelsFromDictionaryArray(array: data)
                        complition(incidents)
                    } else {
                        complition(nil)
                    }
                case .Error(let error):
                    target?.hideLoader()
                    target?.showAlert(with: error)
                    complition(nil)
                }
            }
        }
    }
    
    //MARK:---- Update Incident API ----
    func updateIncidentByParent(with target:BaseViewController?, agencyID:Int, incidentId: Int, isAcknowledge: Bool, parentComment: String, updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kid: incidentId, Macros.ApiKeys.kisAcknowledge: isAcknowledge, Macros.ApiKeys.kparentComment: parentComment, Macros.ApiKeys.kupdatedBy: updatedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.UpdateIncidentDetailsByParent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>){
                        complition(data)
                    } else {
                        complition(nil)
                    }
                case .Error(let error):
                    target?.hideLoader()
                    target?.showAlert(with: error)
                    complition(nil)
                }
            }
        }
    }
}
