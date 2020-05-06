//
//  AttendanceService.swift
//  Daycare
//
//  Created by amrut waghmare on 10/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class AttendanceService: APIService {
    
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
    //MARK:---- get class Attendance -----
    func getClassAttendance(with target:BaseViewController?, agencyID:Int,classID:String,askedDate:String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [
            Macros.ApiKeys.kagencyID  : agencyID,   Macros.ApiKeys.kclassID : classID,
            Macros.ApiKeys.kaskedDate : askedDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetClassAttendence, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let attendance = Attendance.modelsFromDictionaryArray(array: data)
                        complition(attendance)
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
    
    //MARK:---- Get GuardiansList -----

    func getGuardiansList(with target:BaseViewController?, agencyID:Int,classID:String,studentId:String,studentName:String,isAuthorized : Bool, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        
        let param   =   [
            Macros.ApiKeys.kagencyID  : agencyID,   Macros.ApiKeys.kclassID     : classID,
            Macros.ApiKeys.kstudentID : studentId,  Macros.ApiKeys.kstudentName : studentName, Macros.ApiKeys.kisAuthorized : isAuthorized] as [String : Any]
        
        super.startService(with: .POST, path: Macros.ServiceName.GetAllGuardiansForStudents, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let guardians = Guardian.modelsFromDictionaryArray(array: data)
                        complition(guardians)
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
    
    //MARK:---- Check in attendance student -----
   
    func checkInAttendanceStudent(with target:BaseViewController?, agencyID:Int,attendanceDate:String,attendanceStatusId:Int,className:String,classesID:Int,dropedById:Int,isEditModeOn:Bool,studentId:Int,id:Int,checkInTime:String,updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [
            Macros.ApiKeys.kagencyID  : agencyID,    Macros.ApiKeys.kattendanceDate : attendanceDate,
            Macros.ApiKeys.kattendenceStatusID : attendanceStatusId,    Macros.ApiKeys.kid  : id,
            Macros.ApiKeys.kclassName : className,  Macros.ApiKeys.kclassesID       : classesID,
            Macros.ApiKeys.kdropedById : dropedById,    Macros.ApiKeys.kisEditModeOn : isEditModeOn,
            Macros.ApiKeys.kstudentID : studentId,  Macros.ApiKeys.kcheckInTime : checkInTime, Macros.ApiKeys.kupdatedBy : updatedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.CheckInAttendenceStudent, parameters: param, files: []) { (result) in
            DispatchQueue.global(qos: .background).async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let id = (response as? Dictionary<String,Any>)?["saveId"] as? Int{
                        complition(id)
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
    
    
    //MARK:---- Check out attendance student -----
    
    func checkOutAttendanceStudent(with target:BaseViewController?, agencyID:Int,attendanceDate:String,attendanceStatusId:Int,className:String,classesID:Int,pickupById:Int,isEditModeOn:Bool,studentId:Int,id:Int,checkOutTime:String,updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [
            Macros.ApiKeys.kagencyID : agencyID,       Macros.ApiKeys.kattendanceDate : attendanceDate,
            Macros.ApiKeys.kattendenceStatusID : attendanceStatusId,
            Macros.ApiKeys.kclassName : className,     Macros.ApiKeys.kclassesID : classesID,
            Macros.ApiKeys.kpickupById : pickupById,   Macros.ApiKeys.kid : id,
            Macros.ApiKeys.kisEditModeOn : isEditModeOn,
            Macros.ApiKeys.kstudentID : studentId,   Macros.ApiKeys.kcheckOutTime : checkOutTime, Macros.ApiKeys.kupdatedBy : updatedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.CheckOutAttendenceStudent, parameters: param, files: []) { (result) in
            DispatchQueue.global(qos: .background).async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let id = (response as? Dictionary<String,Any>)?["saveId"] as? Int{
                        complition(id)
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
    
    //MARK:---- Get AbsentReason -----
    
    func GetAllLeaveReasonType(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID  : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllLeaveReasonType, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let leaveReasons = LeaveReason.modelsFromDictionaryArray(array: data)
                        complition(leaveReasons)
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
    
    //MARK:---- Absent Attendence Student -----
    
    func absentAttendanceStudent(with target:BaseViewController?, agencyID:Int,attendanceDate:String,attendanceStatusId:Int,className:String,classesID:Int,onLeave:Bool,studentId:Int,id:Int,onLeaveComment:String,reasonId:String, updatedBy: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [
            Macros.ApiKeys.kagencyID : agencyID,       Macros.ApiKeys.kattendanceDate : attendanceDate,
            Macros.ApiKeys.kattendenceStatusID : attendanceStatusId,
            Macros.ApiKeys.kclassName : className,     Macros.ApiKeys.kclassesID : classesID,
            Macros.ApiKeys.konLeave : onLeave,   Macros.ApiKeys.kid : id,
            Macros.ApiKeys.konLeaveComment : onLeaveComment,
            Macros.ApiKeys.kstudentID : studentId,   Macros.ApiKeys.kreasonId : reasonId, Macros.ApiKeys.kupdatedBy : updatedBy] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.AbsentAttendenceStudent, parameters: param, files: []) { (result) in
            DispatchQueue.global(qos: .background).async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let id = (response as? Dictionary<String,Any>)?["saveId"] as? Int{
                        complition(id)
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
        
    //MARK:---- Student Break Out API -----
    func studentBreakAPI(with target:BaseViewController?, param:Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        super.startService(with: .POST, path: Macros.ServiceName.BreakInOutAttendenceStudentMobile, parameters: param, files: []) { (result) in
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
    
    
    
//    body.studentID = data?.studentID
//    body.agencyID = data?.agencyID
//    body.classID=data?.classID
//    body.askedDate
    
    func GetDailySheetActivityReportByEmail(with target:BaseViewController?, agencyID:Int, studentId: Int, classId: Int, askedDate: String, parentID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID  : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kclassID : classId, Macros.ApiKeys.kaskedDate : askedDate, Macros.ApiKeys.kparentID : parentID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetDailySheetActivityReportByEmail, parameters: param, files: []) { (result) in
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
    
    func getAllClassesForTransferStudents(with target: BaseViewController?, classID: Int, agencyID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = [Macros.ApiKeys.kclassID: classID, Macros.ApiKeys.kagencyID: agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllClassesForStudentAttendenceTransfer, parameters: param, files: []) { (result) in
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
                    target?.showAlert(with: error)
                    complition(nil)
                }
            }
        }
    }

    func transferStudentToOtherClass(with target: BaseViewController?,agencyID: Int, studentId: Int, fromClassId: Int, toClassId:Int, teacherId:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param = [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kfromClassID : fromClassId, Macros.ApiKeys.ktoClassID : toClassId, Macros.ApiKeys.kteacherID : teacherId]
        super.startService(with: .POST, path: Macros.ServiceName.StudentClassTransferAttendence, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result{
                case .Success(let response):
                    complition(response)
                case .Error(let error):
                    target?.showAlert(with: error)
                    complition(nil)
                }
            }
        }
    }
}
