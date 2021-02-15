//
//  DashboarService.swift
//  Daycare
//
//  Created by amrut waghmare on 11/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DashboarService: APIService {
    
    //MARK:---- Teacher Class Log List API -----
    func getAllTeacherClassLog(with target:BaseViewController?, agencyID:Int, askingDate:String, teacherID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        //askingDate is UTC date
        let formattedDate = TimeUtils.convertDateFormat(strDate: askingDate, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)

        let localDate = TimeUtils.UTCToLocal(date: formattedDate, format: DateFormats.YYYY_MM_DD_HH_MM_SS, outputFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kaskingDate : formattedDate, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kaskedDateString : localDate] as [String : Any]
        
        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherClassLog, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let teacherClassLogs = TeacherClassLog.modelsFromDictionaryArray(array: data)
                        complition(teacherClassLogs)
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
   
    
    //MARK:---- Teacher Class CheckIn API -----
    func teacherClassCheckIn(with target:BaseViewController?, agencyID:Int, id: Int, checkInTime:String, classAssignmentLogID:Int, classEndTime:String, classesID:Int, classStartTime:String, teacherDailyAttendenceID: Int, teacherID: Int, checkStatus: Int, checkOutTime:String, updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        var param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kid : id, Macros.ApiKeys.kcheckInTime : checkInTime, Macros.ApiKeys.kclassAssignmentLogID : classAssignmentLogID, Macros.ApiKeys.kclassEndTime : classEndTime, Macros.ApiKeys.kclassesID : classesID, Macros.ApiKeys.kclassStartTime : classStartTime, Macros.ApiKeys.kteacherDailyAttendenceID : teacherDailyAttendenceID, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kcheckStatus : checkStatus, Macros.ApiKeys.kupdatedBy : updatedBy] as [String : Any]
        if checkStatus == CheckInStatus.CheckedOut {
            param[Macros.ApiKeys.kcheckOutTime] = checkOutTime
        }
        super.startService(with: .POST, path: Macros.ServiceName.TeacherCheckInCheckOut, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["saveId"] as? Int{
                        complition(data)
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
    
    //MARK:---- Teacher clockIn API -----
    func teacherClockInClockOut(with target:BaseViewController?, agencyID:Int, id:Int, classesID:Int, attendenceStatusID:Int, teacherID:Int, time:String, attendanceDate:String, updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        var param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kid : id,  Macros.ApiKeys.kclassesID : classesID, Macros.ApiKeys.kattendenceStatusID : attendenceStatusID, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kattendanceDate : attendanceDate, Macros.ApiKeys.kupdatedBy : updatedBy] as [String : Any]
        (attendenceStatusID == ClockInStatus.clockedIn) ? (param[Macros.ApiKeys.kclockIn] = time) : (param[Macros.ApiKeys.kclockOut] = time)
        super.startService(with: .POST, path: Macros.ServiceName.TeacherClockInClockOut, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["message"] as? String{
                        complition(data)
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
    
    //MARK:---- Teacher Break Logs API -----
    func getTeacherBreakLogs(with target:BaseViewController?, agencyID:Int, teacherID:Int, askingDate:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        //askingDate is local
        let askngDate = TimeUtils.convertDateFormat(strDate: askingDate, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS)
// shiwani
//        let askngDateString = TimeUtils.localToUTC(date: askingDate, format: DateFormats.YYYY_MM_DD_HH_MM_SS, outputFormat: DateFormats.YYYY_MM_DD_T_hh_MM_SS_SSSZ)
      let askngDateString = TimeUtils.UTCToLocal(date: askingDate, format: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, outputFormat: DateFormats.YYYY_MM_DD_hh_MM_SS)
//            ,"askedDateString":"2021-02-08 23:03:00"
        // shiwani
//        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kaskingDate : UTCDate, Macros.ApiKeys.kaskedDateString : formattedDate] as [String : Any]
      let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kaskingDate : askngDate, Macros.ApiKeys.kaskedDateString : askngDateString] as [String : Any]
      
        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherBreakLog, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrOfTeacherBreakLogs = TeacherBreakLog.modelsFromDictionaryArray(array: data)
                        complition(arrOfTeacherBreakLogs)
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
    
    //MARK:---- Teacher Break In/Out API -----
    func teacherBreakInOut(with target:BaseViewController?, param:Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   = param
        super.startService(with: .POST, path: Macros.ServiceName.TeacherBreakInBreakOut, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["saveId"] as? Int{
                        complition(data)
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
    
    //MARK:---- Teacher Current Break Status API -----
    func teacherCurrentBreakStatus(with target:BaseViewController?, agencyID:Int, askingDate: String, teacherID: Int, teacherDailyAttendanceID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   = [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kaskingDate : askingDate, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kteacherDailyAttendenceID : teacherDailyAttendanceID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherCurrentBreakStatus, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let teacherBreakStatus = TeacherBreakLog.init(dictionary: data)
                        complition(teacherBreakStatus)
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

    //MARK:---- Teacher Medication Log API -----
    func getTeacherMedicationLogs(with target:BaseViewController?, agencyID:Int, askingDate: String, teacherID: Int, classId: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        //askingDate is UTC
        let formattedDate = TimeUtils.convertDateFormat(strDate: askingDate, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)

        let localDate = TimeUtils.UTCToLocal(date: formattedDate, format: DateFormats.YYYY_MM_DD_HH_MM_SS, outputFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)
        let param   = [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kaskingDate : formattedDate, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kclassID : classId, Macros.ApiKeys.kaskedDateString : localDate] as [String : Any]

        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherTodayMedicationTasks, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForTeacherMedicationLogs = TeacherMedicationLog.modelsFromDictionaryArray(array: data)
                        complition(arrForTeacherMedicationLogs)
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
    
//    MARK:---- Teacher Current Operational Class API -----
    func getTeacherCurrentOperationalClass(with target:BaseViewController?, agencyID:Int, askingDate:String, teacherID: Int, teacherDailyAttendanceID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        //askingDate is UTC
//        let formattedDate = TimeUtils.convertDateFormat(strDate: askingDate, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)
// shiwani, correct time format
      let formattedDate = TimeUtils.convertDateFormat(strDate: askingDate, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, toFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ)
      
        let localDate = TimeUtils.UTCToLocal(date: askingDate, format: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSSZ, outputFormat: DateFormats.YYYY_MM_DD_HH_MM_SS)
        
      // shiwani
//        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kaskingDate : formattedDate, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kteacherDailyAttendenceID : teacherDailyAttendanceID, Macros.ApiKeys.kaskedDateString : localDate] as [String : Any]
      
      let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kaskingDate : formattedDate, Macros.ApiKeys.kteacherID : teacherID, Macros.ApiKeys.kaskedDateString : localDate] as [String : Any]
      
        super.startService(with: .POST, path: Macros.ServiceName.GetTeacherOperationalClasses, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForOperationalClasses = OperationalClass.modelsFromDictionaryArray(array: data)
                        complition(arrForOperationalClasses)
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
