//
//  DashboardService.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 12/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DashboardService: APIService {
    
    //MARK:---- Classes List API -----
    func getAllClasses(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.getAllClassesAPI, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let classes = Class.modelsFromDictionaryArray(array: data)
                        complition(classes)
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
    
    //MARK:---- Parent Child List API -----
    func getChildList(with target:BaseViewController?, agencyID:Int, parentID:Int, studentName: String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kparentID : parentID, Macros.ApiKeys.kstudentName : studentName] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStudentsListOfParent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForChild = Child.modelsFromDictionaryArray(array: data)
                        complition(arrForChild)
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
    
    //MARK:---- Child Enrollment List API -----
    func getChildEnrollmentList(with target:BaseViewController?, agencyID:Int, parentID:Int, studentId: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kparentID : parentID, Macros.ApiKeys.kstudentID : studentId] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetStudentClassEnrollment, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForChildEnrollments = Enrollment.modelsFromDictionaryArray(array: data)
                        complition(arrForChildEnrollments)
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
    
    
    //MARK:---- Attendance List API -----
    func getAllAttendanceList(with target:BaseViewController?, agencyID:Int, studentID: Int, parentID: Int,askedDate: String,complition:@escaping(Any?) -> Void){
        target?.showLoader()
        // send asked Date in UTC and askeDateString in local timezone
        // askedDate is local
        let formattedDate = CommonClassMethods.convertDateFormat(strDate: askedDate, fromFormat: DateFormat.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormat.YYYY_MM_DD_HH_MM_SS)

        let UTCDate = CommonClassMethods.localToUTC(date: formattedDate, format: DateFormat.YYYY_MM_DD_HH_MM_SS, outputFormat: DateFormat.YYYY_MM_DD_HH_MM_SS)
        
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID: studentID,Macros.ApiKeys.kparentID: parentID, Macros.ApiKeys.kaskedDate: UTCDate, Macros.ApiKeys.kaskedDateString : formattedDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAttendanceListforparent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let attendanceList = Attendance.modelsFromDictionaryArray(array: data)
                        complition(attendanceList)
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
    
    //MARK:---- Get Student Break Logs -----
    func GetStudentBreakLog(with target:BaseViewController?, agencyID:Int, studentId: Int, classAttendanceId: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID  : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kclassAttendenceID : classAttendanceId]
        super.startService(with: .POST, path: Macros.ServiceName.GetStudentBreakLogs, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let studentBreakLogs = StudentBreak.modelsFromDictionaryArray(array: data)
                        complition(studentBreakLogs)
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
    
    //MARK:---- Post Activity List API -----
    func getPostActivityList(with target:BaseViewController?, studentID: Int, agencyID:Int, userID: Int, isPublic:Bool, page:Int, limit: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID : studentID, Macros.ApiKeys.kuserID : userID, Macros.ApiKeys.kisPublic : isPublic, Macros.ApiKeys.kpage: page, Macros.ApiKeys.klimit: limit] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllPostActivitiesByChildID, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let postActivities = PostActivity.modelsFromDictionaryArray(array: data)
                        complition(postActivities)
                    }else {
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
    
    //MARK:------ Save Image Like API ------
    func savePostImageLike(with target:BaseViewController?, agencyID:Int, studentId: Int, postActivitiesID: Int, postActivityImagesID: Int,likeCount: Int, comment:String, isActive: Bool, createdBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID  : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kpostActivitiesID : postActivitiesID, Macros.ApiKeys.kpostActivityImagesID : postActivityImagesID, Macros.ApiKeys.klikeCount : likeCount, Macros.ApiKeys.kcomment : comment, Macros.ApiKeys.kisActive : isActive] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.SaveParentDashboardImagedLikeInformation, parameters: param, files: []) { (result) in
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
    
    //MARK:------ Save Video Like API ------
    func savePostVideoLike(with target:BaseViewController?, agencyID:Int, studentId: Int, postActivitiesID: Int, postActivityVideosID: Int,likeCount: Int, comment:String, isActive: Bool, createdBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID  : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kpostActivitiesID : postActivitiesID, Macros.ApiKeys.kpostActivityVideosID : postActivityVideosID, Macros.ApiKeys.klikeCount : likeCount, Macros.ApiKeys.kcomment : comment, Macros.ApiKeys.kisActive : isActive] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.SaveParentDashboardVideoLikeInformation, parameters: param, files: []) { (result) in
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
    
    //MARK:------ Save Enroll Student API ------
    func enrollStudent(with target:BaseViewController?, param:Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentEnrollment, parameters: param, files: []) { (result) in
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
    
    
    //MARK:----- Save Parent Information API ------

    func saveParentInformation(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = param
        super.startService(with: .POST, path: Macros.ServiceName.SaveParentInformation, parameters: param, files: []) { (result) in
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
