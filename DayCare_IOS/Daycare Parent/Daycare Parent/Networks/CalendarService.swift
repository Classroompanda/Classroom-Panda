//
//  CalendarService.swift
//  Daycare
//
//  Created by amrut waghmare on 09/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class CalendarService: APIService {
   
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

