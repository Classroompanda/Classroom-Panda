//
//  Agency.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 15/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class Agency: NSObject {
    
    public var agencyName : String?
    public var agencyId : Int?
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Agency]
       {
           var models:[Agency] = []
           for item in array
           {
               models.append(Agency(dictionary: item)!)
           }
           return models
       }


       required public init?(dictionary: Dictionary<String,Any>) {
           agencyId = dictionary["id"] as? Int ?? 0
           agencyName = dictionary["agencyName"] as? String ?? ""
       }
  
}
