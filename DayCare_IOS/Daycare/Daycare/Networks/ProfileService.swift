//
//  ProfileService.swift
//  Daycare
//
//  Created by amrut waghmare on 15/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ProfileService: APIService {

    //MARK:----- TeacherInformation API -----
    func getTeacherInformation(with target:BaseViewController?, agencyID:Int,teacherId:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID,Macros.ApiKeys.kteacherID : teacherId]
        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherInformation, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let teacher = Teacher.init(dictionary: data)
                        complition(teacher)
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
    
    //MARK:---- Country Dropdown List API -----
    func getCountryList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllCountry, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                    target?.hideLoader()
                    switch result {
                    case .Success(let response):
                        if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                            let countries = Country.modelsFromDictionaryArray(array: data)
                            complition(countries)
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
    
    //MARK:---- State Dropdown List API -----
    func getStateList(with target:BaseViewController?, agencyID:Int,countryID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kcountryID : countryID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStates, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let states = State.modelsFromDictionaryArray(array: data)
                        complition(states)
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
    
    //MARK:---- Cities Dropdown List API -----
    func getCityList(with target:BaseViewController?, agencyID:Int, stateId : Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstateID : stateId] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllCities, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let cities = City.modelsFromDictionaryArray(array: data)
                        complition(cities)
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
    
    
    //MARK:---- Save Profile API -----
    func saveProfileData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveTeacherDetails, parameters: param, files: []) { (result) in
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
}
