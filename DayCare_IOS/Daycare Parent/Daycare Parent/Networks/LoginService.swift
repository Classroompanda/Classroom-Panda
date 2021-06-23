//
//  LoginService.swift
//  Daycare
//
//  Created by amrut waghmare on 02/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import FirebaseInstanceID

class LoginService: APIService {
   
    //MARK:---- Parent Login API -----
    func loginTeacher(with target:BaseViewController?, emailAddress:String, password:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kemailAddress : emailAddress, Macros.ApiKeys.kpassword : password,  Macros.ApiKeys.kisValid : true, Macros.ApiKeys.kosType : 2, Macros.ApiKeys.kbusinessToken : AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kDeviceToken) as? String ?? ""] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.UserLogin, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let token = (response as? Dictionary<String,Any>)?[Macros.ApiKeys.kaccess_token] as? String {
                        AppInstance.shared.accessToken = token
                        AppInstance.shared.kUserDefault.setValue( AppInstance.shared.accessToken, forKey: Macros.DefaultKeys.kAccessToken)
                    }
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let user = User.init(dictionary: data)
                        AppInstance.shared.accessToken = (response as? Dictionary<String,Any>)?[Macros.ApiKeys.kaccess_token] as? String ?? ""
                        if user?.roleId == RoleId.parent {
                            complition(user)
                        } else {
                            target?.showAlert(with: Macros.alertMessages.invalidCredentials)
                            complition(nil)
                        }
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
    
    //MARK:---- Parent SignUp API -----
    
    func signupParent(with target:BaseViewController?, parendtData: Parent, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kfirstName : parendtData.firstName ?? "", Macros.ApiKeys.klastName : parendtData.lastName ?? "",  Macros.ApiKeys.kemailId : parendtData.emailId ?? "", Macros.ApiKeys.kagencyID : parendtData.agencyID ?? 0, Macros.ApiKeys.kisParent : true, Macros.ApiKeys.kcreatedBy : parendtData.agencyID ?? 0] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.ParentSignup, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                 case .Success(let response):
                                  if let data = (response as? Dictionary<String,Any>)?["message"] as? String {
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
    
    //MARK:---- Parent Agency Listing API -----

    func getAgencyList(with target:BaseViewController?, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = [Macros.ApiKeys.klimit : 0, Macros.ApiKeys.kpage : 0,  Macros.ApiKeys.kstatus : 1, Macros.ApiKeys.kagencyName : ""] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.getAgencyListing, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data =  (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>> {
                        let parent = Agency.modelsFromDictionaryArray(array: data)  //Agency.init(dictionary: data)
                        complition(parent)
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
    
    
    //MARK:---- Parent Forgot Password API -----
    func teacherForgotPassword(with target:BaseViewController?, emailAddress:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.krequestedEmail : emailAddress]
        super.startService(with: .POST, path: Macros.ServiceName.ForgotPassword, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["message"] as? String {
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
    
    func getParentInformation(with target:BaseViewController?, agencyId:Int, parentId:Int, isParent: Bool, isSecondaryParent: Bool, isGuardian: Bool, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyId, Macros.ApiKeys.kparentID : parentId,  Macros.ApiKeys.kisParent : isParent, Macros.ApiKeys.kisSecondaryparent : isSecondaryParent, Macros.ApiKeys.kisGaurdian : isGuardian] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetParentInformation, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let parent = Parent.init(dictionary: data)
                        complition(parent)
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
    
    //MARK:---- Update password API -----
    func updatePassword(with target:BaseViewController?, emailAddress:String, password:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.krequestedEmail : emailAddress, Macros.ApiKeys.kupdatedPassword : password] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.UpdatedPassword, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                     if let data = (response as? Dictionary<String,Any>)?["message"] as? String {
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
