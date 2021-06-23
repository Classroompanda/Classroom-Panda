//
//  CalendarService.swift
//  Daycare
//
//  Created by amrut waghmare on 09/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class CalendarService: APIService {
    
    //MARK:---- Repeat Type Dropdown List API -----
    func getRepeatDropDownList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllRepeatTypeDropdown, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let repeatTypeDropdown = Repeat.modelsFromDictionaryArray(array: data)
                        complition(repeatTypeDropdown)
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
    
    //MARK:---- Save Event API -----
    func saveEvent(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveEvent, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Get All Event API -----
    func getAllEvent(with target:BaseViewController?, agencyID:Int, eventFromDate:String, eventToDate:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.keventSearchFromDate: eventFromDate, Macros.ApiKeys.keventSearchToDate :  eventToDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllEvents, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let events = Event.modelsFromDictionaryArray(array: data)
                        complition(events)
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
    
    
    //MARK:---- Delete Event API -----
    func deleteEvent(with target:BaseViewController?, agencyID:Int, id:Int,isDeleted:Bool,deletedDate:String,deletedBy:Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID,   Macros.ApiKeys.kid :   id,
                         Macros.ApiKeys.kisDeleted : isDeleted,
                         Macros.ApiKeys.kdeletedDate : deletedDate,Macros.ApiKeys.kdeletedBy:deletedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.DeleteEvent, parameters: param, files: []) { (result) in
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
    
    
    
    //MARK:---- Get All MealPlan API -----
    func getAllMealPlan(with target:BaseViewController?, agencyID:Int, eventFromDate:String, eventToDate:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.keventSearchFromDate: eventFromDate, Macros.ApiKeys.keventSearchToDate :  eventToDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllMealPlan, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let mealPlans = Meal.modelsFromDictionaryArray(array: data)
                        complition(mealPlans)
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
    
    //MARK:---- Meal Type Dropdown List API -----
    func getMealTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllMealTypeDropdown, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let mealType = MealType.modelsFromDictionaryArray(array: data)
                        complition(mealType)
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
    
    //MARK:---- Get Perticular MealPlan API -----
    func getPerticularMealPlan(with target:BaseViewController?, agencyID:Int, mealPlanID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kmealPlanID: mealPlanID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetParticularMealPlan, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let mealPlans = Meal.modelsFromDictionaryArray(array: data)
                        complition(mealPlans)
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

