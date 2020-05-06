//
//  PaymentService.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 15/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class PaymentService: APIService {
   
    //MARK:---- Stripe account publicKey API -----
    func getStripePublicKeyForAgency(with target:BaseViewController?, agencyID:Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetStripeDetailsForAgency, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        complition(data.first)
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
    
    //MARK:---- Make Payment API ----
    
    func makeCustomPayment(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = param
        super.startService(with: .POST, path: Macros.ServiceName.makeCustomPayment, parameters: param, files: []) { (result) in
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

    //MARK:---- Create One Time Payment (ACH) ----
    
    func createOneTimePayment(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = param
        super.startService(with: .POST, path: Macros.ServiceName.createOneTimePayment, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Create Recurring Payment (ACH) ----
     
     func createRecurringPayment(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
         target?.showLoader()
         let param = param
         super.startService(with: .POST, path: Macros.ServiceName.createRecurringPayment, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Delete Recurring Payment (ACH) ----

    func DeleteRecurringPayment(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = param
        super.startService(with: .POST, path: Macros.ServiceName.deleteRecurringPayment, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Save Payment API ----
    
    func savePayment(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = param
        super.startService(with: .POST, path: Macros.ServiceName.PaymentDetails, parameters: param, files: []) { (result) in
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
    
    //MARK:------ Get Payment History -----
    
    func getPaymentHistory(with target:BaseViewController?, agencyID:Int,parentID : Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kparentID: parentID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetPaymentDetailsForParent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForPaymentHistory = PaymentHistory.modelsFromDictionaryArray(array: data)
                        complition(arrForPaymentHistory)
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
    
    //MARK:------ Get Payment History -----
    func getDuePaymentAccordingToParent(with target:BaseViewController?, agencyID:Int,parentID : Int,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kparentID: parentID, Macros.ApiKeys.klimit: 0, Macros.ApiKeys.kpage: 0] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetDueBalanceAccordingToParent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForDuePayment = Payment.modelsFromDictionaryArray(array: data)
                        complition(arrForDuePayment)
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
