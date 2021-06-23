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
   
    //MARK:---- Teacher Login API -----
    func loginTeacher(with target:BaseViewController?, emailAddress:String, password:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let date = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        let formattedDate = TimeUtils.convertDateFormat(strDate: date, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ)
               
                 let localDate = TimeUtils.UTCToLocal(date: date, format: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, outputFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)
//        var token: String?
//        InstanceID.instanceID().instanceID(handler: { (tokenString, error) in
//            if error != nil {
//                print(error?.localizedDescription ?? "")
//            } else {
//                token = tokenString?.token
//            }
//        })
        let param   =   [Macros.ApiKeys.kemailAddress : emailAddress, Macros.ApiKeys.kpassword : password,  Macros.ApiKeys.kisValid : true,Macros.ApiKeys.kosType : 2, Macros.ApiKeys.kbusinessToken : AppInstance.shared.kUserDefault.value(forKey: Macros.DefaultKeys.kDeviceToken) as? String ?? "", Macros.ApiKeys.kaskedDate: formattedDate, Macros.ApiKeys.kaskedDateString: localDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.UserLogin, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
//                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let token = (response as? Dictionary<String,Any>)?[Macros.ApiKeys.kaccess_token] as? String {
                        AppInstance.shared.accessToken = token
                    }
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let user = User.init(dictionary: data)
                        AppInstance.shared.accessToken = (response as? Dictionary<String,Any>)?[Macros.ApiKeys.kaccess_token] as? String ?? ""
                        AppInstance.shared.firstTimeLogin = (response as? Dictionary<String,Any>)?[Macros.ApiKeys.kfirstTimeLogin] as? Bool ?? false
                        AppInstance.shared.kUserDefault.set(AppInstance.shared.firstTimeLogin, forKey: Macros.DefaultKeys.kisFirstLogin)
                        if user?.roleId == RoleId.teacher {
                            complition(user)
                        } else {
                            target?.hideLoader()
                            target?.showAlert(with: Macros.alertMessages.invalidCredentials)
                            complition(nil)
                        }
                    } else {
                        target?.hideLoader()
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
    
    
    //MARK:---- Teacher Forgot Password API -----
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
