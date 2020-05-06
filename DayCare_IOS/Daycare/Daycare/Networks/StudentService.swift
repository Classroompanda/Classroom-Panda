//
//  StudentService.swift
//  Daycare
//
//  Created by amrut waghmare on 26/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class StudentService: APIService {
    
    //MARK:---- All Student List API -----
    func getAllStudents(with target:BaseViewController?, agencyID:Int, studentName:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentName : studentName] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStudents, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let students = Student.modelsFromDictionaryArray(array: data)
                        complition(students)
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
    
    //MARK:---- All Student List for Dropdown API -----
    func getAllStudensDropdownList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStudentDropdown, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let students = StudentList.modelsFromDictionaryArray(array: data)
                        complition(students)
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
    
    //MARK:---- Student Allergies API -----
    
 func getAllStudentsAllergie(with target:BaseViewController?, complition:@escaping(Any?) -> Void){
     target?.showLoader()
    let currentDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
     let param   =   [Macros.ApiKeys.kagencyID : AppInstance.shared.user?.agencyID ?? 0, Macros.ApiKeys.kclassID : AppInstance.shared.currentCheckInClass.classesID ?? 0, Macros.ApiKeys.kteacherID : AppInstance.shared.user?.loginUserID ?? 0, Macros.ApiKeys.kaskingDate : currentDate] as [String : Any]
     super.startService(with: .POST, path: Macros.ServiceName.GetAllStudentsAllergy, parameters: param, files: []) { (result) in
         DispatchQueue.main.async {
             target?.hideLoader()
             switch result {
             case .Success(let response):
                 if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                     let studentsAllergy = StudentAllergies.modelsFromDictionaryArray(array: data)
                     complition(studentsAllergy)
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
    
    //MARK:---- Student Information API -----
    func getStudentInformation(with target:BaseViewController?, agencyID:Int, studentId:Int, parentID : Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kparentID : parentID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetStudentInformation, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let student = Student(dictionary: data)
                        complition(student)
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
    
    //MARK:---- Student List By Class API -----
    func getAllStudentsByClass(with target:BaseViewController?, agencyID:Int, classId:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kclassID : classId,Macros.ApiKeys.kstudentName : ""] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStudentsByClass, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let students = Student.modelsFromDictionaryArray(array: data)
                        complition(students)
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

    func updateStudetProfile(with target:BaseViewController?, agencyID:Int, studentId:Int,imagePath:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID : studentId,Macros.ApiKeys.kimagePath : imagePath] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.UpdateStudentProfilePicByTeacher, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    complition(response)
                case .Error(let error):
                    target?.hideLoader()
                    target?.showAlert(with: error)
                    complition(nil)
                }
            }
        }
    }
}
