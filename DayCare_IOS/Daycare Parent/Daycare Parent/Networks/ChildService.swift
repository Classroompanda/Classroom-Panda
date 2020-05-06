//
//  ChildService.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 13/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ChildService: APIService {
    
    //MARK:---- Student Information API -----
    func getStudentInformation(with target:BaseViewController?, agencyID:Int,studentId: Int, parentId: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID : studentId, Macros.ApiKeys.kparentID: parentId] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetStudentInformation, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any>{
                        let studentInformation = StudentInformation.init(dictionary: data)
                        complition(studentInformation)
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
    func getAllChildList(with target:BaseViewController?, agencyID:Int, parentID:Int, studentName: String, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kparentID : parentID, Macros.ApiKeys.kstudentName : studentName] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStudentsOfParent, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForChild = Child.modelsFromDictionaryArray(array: data)
                        complition(arrForChild)
                    }
//                    if let data =  (response as? Dictionary<String,Any>)?["data"] as? Dictionary<String,Any> {
//                        let arrForChild = Child.init(dictionary: data)
//                        complition(arrForChild)
//                    }
                    else {
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
    
    //MARK:---- Country Dropdown List API -----
    func getCountryList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllCountry, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let countries = Country.modelsFromDictionaryArray(array: data)
                        complition(countries)
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
    
    //MARK:---- State Dropdown List API -----
    func getStateList(with target:BaseViewController?, agencyID:Int,countryID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kcountryID : countryID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllStates, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let states = State.modelsFromDictionaryArray(array: data)
                        complition(states)
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
    
    //MARK:---- Cities Dropdown List API -----
    func getCityList(with target:BaseViewController?, agencyID:Int, stateId : Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstateID : stateId] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllCities, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let cities = City.modelsFromDictionaryArray(array: data)
                        complition(cities)
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
    //MARK:---- Save Child API ----
    func saveChildData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudent, parameters: param, files: [], withVersion: ApiVersion.v2) { (result) in
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

    
    //MARK:----- Upload Image or video -----
    func uploadImageVideos(with target:BaseViewController?, imgArray:[UIImage]?, videoURL:NSURL?,complition:@escaping(Any?) -> Void){
        var arrOfFile:[File] = []
        target?.showLoader()
        if (imgArray?.count ?? 0) > 0 {
            for i in 0..<(imgArray?.count ?? 0) {
                if let data:Data = imgArray?[i].jpegData(compressionQuality: 0.5) {
                    // Handle operations with data here...
                    arrOfFile.append(File.init(name: "image\(CommonClassMethods.dateStringFromDate(date: Date()))", filename: "image.jpg", data: data))
                }
            }
        } else {
            if videoURL != nil {
                var movieData: NSData?
                do {
                    movieData = try NSData(contentsOfFile: (videoURL?.relativePath ?? ""), options: NSData.ReadingOptions.alwaysMapped)
                    arrOfFile.append(File.init(name: "video\(CommonClassMethods.dateStringFromDate(date: Date()))", filename: "video.mp4", data: movieData as Data?))
                } catch _ {
                    movieData = nil
                    return
                }
            }
        }
        
        super.startService(with: .POST, path: Macros.ServiceName.MultipleImageUpload, parameters: [:], files: arrOfFile) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<String>{
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
    
    //MARK:----- GetRelationTypeAPI --------
    func getRelationTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetRelationType, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let relations = Relation.modelsFromDictionaryArray(array: data)
                        complition(relations)
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
    
    //MARK:---- Save Guardian API ----
    func saveGuardianData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentGaurdians, parameters: param, files: []) { (result) in
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

    
    //MARK:----- Get All Guardian API --------
    func getAllGuardian(with target:BaseViewController?, agencyID:Int, studentID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kstudentID: studentID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllGuardiansForStudents, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForGuardians = Guardian.modelsFromDictionaryArray(array: data)
                        complition(arrForGuardians)
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
    
    //MARK:----- GetAllergyTypeAPI --------
    func getAllergyTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllergyType, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let allergyTypesArray = DropDownModel.modelsFromDictionaryArray(array: data)
                        complition(allergyTypesArray)
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
    
    //MARK:----- GetImmunizationTypeAPI --------
    func getImmunizationTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetImmunizationType, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let immunizationTypesArray = DropDownModel.modelsFromDictionaryArray(array: data)
                        complition(immunizationTypesArray)
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
    
    //MARK:----- GetAllergyNameAPI --------
    func getAllergyNamesList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllergyName, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let allergyNamesArray = DropDownModel.modelsFromDictionaryArray(array: data)
                        complition(allergyNamesArray)
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
    
    //MARK:----- GetAllergyReactionTypeAPI --------
    func GetAllergyReactionTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllergyReactionType, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let GetAllergyReactionTypeArray = DropDownModel.modelsFromDictionaryArray(array: data)
                        complition(GetAllergyReactionTypeArray)
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
    
    //MARK:----- GetAllDosesTypeAPI --------
    func GetAllDosesTypeList(with target:BaseViewController?, agencyID:Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyID] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllDoseRepeat, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let GetAllergyReactionTypeArray = DropDownModel.modelsFromDictionaryArray(array: data)
                        complition(GetAllergyReactionTypeArray)
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
    
    //MARK:---- Save Child Immunization API ----
    func saveChildImmunizationData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentImmunization, parameters: param, files: []) { (result) in
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

    //MARK:---- Save Child Allergies API ----
    func saveChildAllergiesData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentAllergies, parameters: param, files: []) { (result) in
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

    //MARK:---- Save Child Medication API ----
    func saveChildMedicationData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentMedication, parameters: param, files: []) { (result) in
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

    //MARK:---- Save Child Disabilities API ----
    func saveChildDisabilityData(with target:BaseViewController?, param : Dictionary<String,Any>, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   param
        super.startService(with: .POST, path: Macros.ServiceName.SaveStudentDisabilities, parameters: param, files: []) { (result) in
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
    
    //MARK:----- Get guardians list ------
    
    func getAllGuardians(with target:BaseViewController?, agencyId:Int, parentId:Int, isParent: Bool, isSecondaryParent: Bool, isGuardian: Bool, complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   [Macros.ApiKeys.kagencyID : agencyId, Macros.ApiKeys.kparentID : parentId,  Macros.ApiKeys.kisParent : isParent, Macros.ApiKeys.kisSecondaryparent : isSecondaryParent, Macros.ApiKeys.kisGaurdian : isGuardian] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetParentAccordingtoLogin, parameters: param, files: []) { (result) in
            DispatchQueue.main.async {
                target?.hideLoader()
                switch result {
                case .Success(let response):
                    if let data = (response as? Dictionary<String,Any>)?["data"] as? Array<Dictionary<String,Any>>{
                        let arrForGuardians = Parent.modelsFromDictionaryArray(array: data)
                        complition(arrForGuardians)
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
