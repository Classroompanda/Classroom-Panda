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
    func getAllIncidents(with target:BaseViewController?, agencyID:Int, page:Int, limit:Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kpage: page, Macros.ApiKeys.klimit: limit]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllIncidents, parameters: param, files: []) { (result) in
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

    //MARK:---- Bitting log List API -----
    func getAllBittingLogs(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetBittingIncidentsDetails, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Nature Of Injury List API -----
    func getNatureOfInjuryList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllNatureofinjury, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let natureOfInjuries = NatureOfInjury.modelsFromDictionaryArray(array: data)
                        complition(natureOfInjuries)
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
    
    //MARK:---- Teacher List API -----
    func getTeacherList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllTeachers, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let teachers = Teacher.modelsFromDictionaryArray(array: data)
                        complition(teachers)
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
    
    //MARK:---- Delete Incident API -----
    func deleteIncident(with target:BaseViewController?, agencyID:Int, id:Int,isDeleted:Bool,deletedDate:String,deletedBy:Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = [Macros.ApiKeys.kagencyID : agencyID,   Macros.ApiKeys.kid :   id,
                         Macros.ApiKeys.kisDeleted : isDeleted,
                         Macros.ApiKeys.kdeletedDate : deletedDate,Macros.ApiKeys.kdeletedBy:deletedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.DeleteIncident, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["message"] as? String{
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
    
    
    //MARK:----- Save Incident API -----
    
    func saveIncidentData(with target:BaseViewController?,param:Dictionary<String,Any>,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   = param
        super.startService(with: .POST, path: Macros.ServiceName.SaveIncident, parameters: param, files: []) { (result) in
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
