//
//  PostActivityService.swift
//  Daycare
//
//  Created by amrut waghmare on 31/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class PostActivityService: APIService {
    
    //MARK:---- Post Activity List API -----
    func getPostActivityList(with target:BaseViewController?,id: Int, agencyID:Int,classesID: Int,postedDate:String, userID: Int, complition:@escaping(Any?) -> Void){
        target?.showLoader()
          let localCurrentDate =  CommonClassMethods.convertDateToServerReadableFormatGET(date:  Date(), toFormat:DateFormats.YYYY_MM_DD_HH_MM_SS)
        let param   =   [Macros.ApiKeys.kagencyID : agencyID, Macros.ApiKeys.kid : id, Macros.ApiKeys.kclassesID : classesID, Macros.ApiKeys.kpostedDate : postedDate, Macros.ApiKeys.kuserID: userID, Macros.ApiKeys.kaskedDateString : localCurrentDate] as [String : Any]
        super.startService(with: .POST, path: Macros.ServiceName.GetAllPostActivities, parameters: param, files: []) { (result) in
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
                
//                if let data:Data = videoURL?.dataRepresentation {
//                    arrOfFile.append(File.init(name: "video\(CommonClassMethods.dateStringFromDate(date: Date()))", filename: "video.mp4", data: data))
//                }
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
    
    //MARK:----- Save Post Activities ----
    func savePostActivity(with target:BaseViewController?,dictForParam:[String:Any], complition:@escaping(Any?) -> Void){
        target?.showLoader()
        let param   =   dictForParam
        super.startService(with: .POST, path: Macros.ServiceName.SavePostActivites, parameters: param, files: []) { (result) in
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
}
