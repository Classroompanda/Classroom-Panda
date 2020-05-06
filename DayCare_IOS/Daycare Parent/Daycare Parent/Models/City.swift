//
//  City.swift
//  Daycare
//
//  Created by amrut waghmare on 15/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import Foundation

class City {
    
    public var id : Int?
    public var cityName : String?
    public var cityCode : String?
    public var stateID  : Int?
    public var numCode : String?
    public var phoneCode : String?
    public var agencyID : Int?
    public var isActive : Bool?
    public var isDeleted : Bool?
    public var deletedBy : Int?
    public var deletedDate : String?
    public var createdBy : Int?
    public var createdDate : String?
    public var updatedDate : String?
    public var updatedBy : Int?
    public var deletedFromIP : String?
    public var createdFromIP : String?
    public var updatedFromIP : String?
   
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [City]
    {
        var models:[City] = []
        for item in array
        {
            models.append(City(dictionary: item)!)
        }
        return models
    }
    
    required public init?(dictionary: Dictionary<String,Any>) {
        
        id = dictionary["id"] as? Int ?? 0
        cityName = dictionary["cityName"] as? String ?? ""
        stateID = dictionary["stateID"] as? Int ?? 0
        cityCode = dictionary["cityCode"] as? String ?? ""
        numCode = dictionary["numCode"] as? String ?? ""
        phoneCode = dictionary["phoneCode"] as? String ?? ""
        agencyID = dictionary["agencyID"] as? Int ?? 0
        isActive = dictionary["isActive"] as? Bool ?? false
        isDeleted = dictionary["isDeleted"] as? Bool ?? false
        deletedBy = dictionary["deletedBy"] as? Int ?? 0
        deletedDate = dictionary["deletedDate"] as? String ?? ""
        createdBy = dictionary["createdBy"] as? Int ?? 0
        createdDate = dictionary["createdDate"] as? String ?? ""
        updatedDate = dictionary["updatedDate"] as? String ?? ""
        updatedBy = dictionary["updatedBy"] as? Int ?? 0
        deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
        createdFromIP = dictionary["createdFromIP"] as? String ?? ""
        updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
    }
    
    public func dictionaryRepresentation() -> Dictionary<String,Any> {
        
        let dictionary = NSMutableDictionary()
        
        dictionary.setValue(self.id, forKey: "id")
        dictionary.setValue(self.cityName, forKey: "cityName")
        dictionary.setValue(self.stateID, forKey: "stateID")
        dictionary.setValue(self.cityCode, forKey: "cityCode")
        dictionary.setValue(self.numCode, forKey: "numCode")
        dictionary.setValue(self.phoneCode, forKey: "phoneCode")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.isActive, forKey: "isActive")
        dictionary.setValue(self.isDeleted, forKey: "isDeleted")
        dictionary.setValue(self.deletedBy, forKey: "deletedBy")
        dictionary.setValue(self.deletedDate, forKey: "deletedDate")
        dictionary.setValue(self.createdBy, forKey: "createdBy")
        dictionary.setValue(self.createdDate, forKey: "createdDate")
        dictionary.setValue(self.updatedDate, forKey: "updatedDate")
        dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
        dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
        dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")
        
        return dictionary as! Dictionary<String,Any>
    }
}
