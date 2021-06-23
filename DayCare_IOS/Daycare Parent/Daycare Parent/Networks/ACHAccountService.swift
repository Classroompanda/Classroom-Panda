//
//  ACHAccountService.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 21/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class ACHAccountService: APIService {
    
    //MARK:---- Get ACH Account API ----
    
    func getACHAccount(with target:BaseViewController?, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = [Macros.ApiKeys.kagencyID : AppInstance.shared.user?.agencyID ?? 0, Macros.ApiKeys.kparentID : AppInstance.shared.user?.releventUserID ?? 0] as [String : Any]
        
        super.startService(with: .POST, path: Macros.ServiceName.getACHAccount, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data =  (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>> {
                        let accountDetail = ACHAccount.modelsFromDictionaryArray(array: data)
                        complition(accountDetail)
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
    
    //MARK:---- Delete ACH Account API ----

    
    func deleteACHAccount(with target:BaseViewController?, param: Dictionary<String,Any>, complition:@escaping(Any?) -> Void) {
        target?.showLoader()
        super.startService(with: .POST, path: Macros.ServiceName.deleteACHAccount, parameters: param, files: []) { (result) in
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
    
    
    //MARK:---- Get Recurring Payments API ----
    
    func getRecurringPayment(with target:BaseViewController?, complition:@escaping(Any?) -> Void) {
        target?.showLoader()
        let param = [Macros.ApiKeys.kagencyID : AppInstance.shared.user?.agencyID ?? 0, Macros.ApiKeys.kparentID : AppInstance.shared.user?.releventUserID ?? 0] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.getRecurringPayments, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data =  (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>> {
                        let accountDetail = Payment.modelsFromDictionaryArray(array: data)
                        complition(accountDetail)
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
    
    //MARK:---- Add ACH Account API ----
    
    func addACHAccount(with target:BaseViewController?,accountDetails: ACHAccount, complition:@escaping(Any?) -> Void){
         target?.showLoader()
        let param = accountDetails.dictionaryRepresentation() as [String : Any]
         
         super.startService(with: .POST, path: Macros.ServiceName.saveACHAccount, parameters: param, files: []) { (result) in
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
    
    //MARK:---- Verify ACH Account API ----
     
     func verifyACHAccount(with target:BaseViewController?,accountDetails: Payment, complition:@escaping(Any?) -> Void){
          target?.showLoader()
         let param = accountDetails.dictionaryRepresentationForACHVerification() as [String : Any]
          super.startService(with: .POST, path: Macros.ServiceName.verifyACHAccount, parameters: param, files: []) { (result) in
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
