//
//  APIManager.swift
//  iOSArchitecture
//
//  Created by Amit on 23/02/18.
//  Copyright © 2018 smartData. All rights reserved.
//

import Foundation
import UIKit
/*
 // shiwani
 Agency Admin(U/P): testagency@yopmail.com / daycare@123
 Teacher(U/P): toby@yopmail.com / daycare@123
 Parent (U/P): parent1@yopmail.com / daycare@123
 // Live Super Admin
 david@classroompanda.com / daycare@123
 */

public enum HttpMethod: String {
    case POST
    case GET
    case PUT
    case DELETE
}

extension String {
    var nsdata: Data {
        return self.data(using: String.Encoding.utf8, allowLossyConversion: false)!
    }
}

struct File {
    let name: String?
    let filename: String?
    let data: Data?
    init(name: String?,filename: String?, data: Data?) {
        self.name = name
        self.filename = filename
        self.data = data
    }
}

private enum ResponseCode: Int {
    case success = 200
    case unAuthorized = 401
    case notFound = 404
}

enum Result <T>{
    case Success(T)
    case Error(String)
}

public class APIService: NSObject {
    
    func startService(with method:HttpMethod,path:String,parameters:Dictionary<String,Any>?,files:Array<File>?, completion: @escaping (Result<Any?>) -> Void) {
          
//          if !isInternetReachable() {
//              completion(.Error(AlertMessage.LOST_INTERNET))
//              return
//          }
          
          guard let url =  URL(string:Macros.URLs.baseServer+path) else { return completion(.Error("Invalid URL, we can't proceed.")) }
          let request = self.buildRequest(with: method, url: url, parameters: parameters, files: files)
          print("\n API URL: \n", url)
          print("\n Request: \n", parameters)
          let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
              guard error == nil else {              
                 print("\n Error = \(error!.localizedDescription)")
                completion(.Error(error!.localizedDescription))
                  return
            }
              guard let data = data else { return completion(.Error(error?.localizedDescription ?? "Data not found."))
              }
              self.handleResponse(data: data, response: response, completion: completion)
          }
          task.resume()
      }
    
    func internalJsonResponseHandler(data: Data, completion: @escaping (Result<Any?>) -> Void) {
         do {
             if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
                 print("\n Response: " , json)
                 let status = json["statusCode"] as? Int ?? 0
                 switch status {
                 case 200:
                     completion(.Success(json))
                 default:
                     completion(.Error(json["message"] as? String ?? ""))
                 }
             }
         } catch let error {
             print(error.localizedDescription)
             completion(.Error(error.localizedDescription))
         }
     }
     
     func handleResponse(data: Data, response:URLResponse?, completion: @escaping (Result<Any?>) -> Void) {
         let statusCode = (response as? HTTPURLResponse)?.statusCode ?? 0
         switch statusCode {
         case ResponseCode.success.rawValue:
             internalJsonResponseHandler(data: data, completion: completion)
//         case ResponseCode.unAuthorized.rawValue:
//             if let vc = UIApplication.topViewController() as? BaseViewController {
//                 vc.logoutTokenExpire()
//             }
         default:
             completion(.Error("Some error occurred"))
         }
         
     }
    
//    func handleResponse(data: Data, response:URLResponse?, completion: @escaping (Result<Any?>) -> Void) {
//        let statusCode = (response as? HTTPURLResponse)?.statusCode ?? 0
//
//        switch statusCode {
//        case ResponseCode.success.rawValue,987:
//            do {
//                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
//                    completion(.Success(json))
//                }
//            } catch let error {
//                completion(.Error(error.localizedDescription))
//            }
//        default:
//            do {
//                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
//                    completion(.Error(json["message"] as? String ?? ""))
//                }
//            } catch let error {
//                completion(.Error(error.localizedDescription))
//            }
//        }
//    }
    
    
//    func startService(with method:HttpMethod,path:String,parameters:Dictionary<String,Any>?,files:Array<File>?, completion: @escaping (Result<Any?>) -> Void) {
//        guard let url = URL(string:Macros.URLs.baseServer+path) else { return completion(.Error("Invalid URL, we can't proceed.")) }
//        let request = self.buildRequest(with: method, url: url, parameters: parameters, files: files)
//        print(parameters as Any)
//        ////
//        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
//            guard error == nil else { return completion(.Error(error!.localizedDescription)) }
//            guard let data = data else { return completion(.Error(error?.localizedDescription ?? "Data not found."))
//            }
//
//                let statusCode = (response as? HTTPURLResponse)?.statusCode ?? 0
//            switch statusCode {
//            case 200, 987:
//                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
//                    completion(.Success(json))
//                }
//            default:
//                do {
//                    if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
//                        completion(.Success(json))
//                    }
//                } catch let error {
//                    print(error.localizedDescription)
//                    completion(.Error(error.localizedDescription))
//                }
//            }
////                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? Dictionary<String,AnyObject> {
////                    print(json)
////                    let status = json["statusCode"] as? Int ?? 0
////                    switch status {
////                    case 200:
////                        completion(.Success(json))
////                    case 987:
////                        completion(.Success(json))
////                    default:
////                        completion(.Error(json["message"] as? String ?? ""))
////                    }
////                }
//
//        }
//        task.resume()
//
//    }
    
}

extension APIService {
    
    func buildRequest(with method:HttpMethod,url:URL,parameters:Dictionary<String,Any>?,files:Array<File>?) -> URLRequest {
        
        var request:URLRequest? = nil
        
        switch method {
        
        case .GET:
            
            if let params = parameters,params.count > 0 {
                let queryUrl = url.appendingPathComponent("?"+buildParams(parameters: params))
                request = URLRequest(url: queryUrl)
            } else {
                request = URLRequest(url: url)
                
            }
            request?.addValue("application/json", forHTTPHeaderField: "Content-Type")
            
        case .POST,.PUT:
            
            request = URLRequest(url: url)
            
            if let images = files,images.count > 0 {
                
                let boundary = "Boundary-\(UUID().uuidString)"
                let boundaryPrefix = "--\(boundary)\r\n"
                let boundarySuffix = "--\(boundary)--\r\n"
               request?.addValue("multipart/form-data; boundary=" + boundary, forHTTPHeaderField: "Content-Type")
                let data = NSMutableData()
                if let params = parameters,params.count > 0{
                    for (key, value) in params {
                        data.append("--\(boundary)\r\n".nsdata)
                        data.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".nsdata)
                        data.append("\((value as! String))\r\n".nsdata)
                    }
                }
                for file in images {
                    data.append(boundaryPrefix.nsdata)
                    data.append("Content-Disposition: form-data; name=\"\(file.name!)\"; filename=\"\(NSString(string: file.filename!))\"\r\n\r\n".nsdata)
                    if let a = file.data {
                        data.append(a)
                        data.append("\r\n".nsdata)
                        
                    } else {
                        print("Could not read file data")
                    }
                }
            
                data.append(boundarySuffix.nsdata)
                
                request?.httpBody = data as Data
            } else if let params = parameters,params.count > 0 {
              request?.addValue("application/json", forHTTPHeaderField: "Content-Type")
                let  jsonData = try? JSONSerialization.data(withJSONObject: params, options: .prettyPrinted)
                request?.httpBody = jsonData
            }
        default:
            // write code for delete here
            break
        }
        
       var req = request ?? URLRequest(url: url)
        // pass your authorisation token here.
        if var token = AppInstance.shared.accessToken {
            token = "Bearer "+token
            print("Token \(token)")
           req.addValue(token, forHTTPHeaderField: "Authorization")
        }
        req.httpMethod = method.rawValue
//         print(req)
        return req
    }
    
    func buildParams(parameters: Dictionary<String,Any>) -> String {
        var components: [(String, String)] = []
        for (key,value) in parameters {
            components += self.queryComponents(key, value)
        }
        return (components.map{"\($0)=\($1)"} as [String]).joined(separator: "&")
    }
    func queryComponents(_ key: String, _ value: Any) -> [(String, String)] {
        var components: [(String, String)] = []
        if let dictionary = value as? Dictionary<String,Any> {
            for (nestedKey, value) in dictionary {
                components += queryComponents("\(key)[\(nestedKey)]", value)
            }
        } else if let array = value as? [AnyObject] {
            for value in array {
                components += queryComponents("\(key)", value)
            }
        } else {
            components.append(contentsOf: [(escape(string: key), escape(string: "\(value)"))])
        }
        
        return components
    }
    func escape(string: String) -> String {
        if let encodedString = string.addingPercentEncoding( withAllowedCharacters: .urlQueryAllowed) {
            return encodedString
        }
        return ""
    }
}
