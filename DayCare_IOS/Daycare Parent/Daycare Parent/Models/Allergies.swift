//
//  Allergies.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 20/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//


import Foundation

public class Allergies: NSObject {
    public var studentAllergiesID : Int?
    public var studentID : Int?
    public var allergyReactionTypeID : Int?
    public var allergyReactionTypeName : String?
    public var allergyNameID : Int?
    public var allergyName : String?
    public var agencyID : Int?
    public var allergyComment : String?
    public var firstAllergyObservation : String?
    public var lastAllergyObservation : String?
    public var allergyTypeID : Int?
    public var allergyTypeName : String?
    public var treatment : String?
    public var id : Int?
    public var stringId : Int?
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
    public var firstAllergyObservationDate : Date?
    public var lastAllergyObservationDate : Date?
    
    public required override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Allergies]
    {
        var models:[Allergies] = []
        for item in array
        {
            models.append(Allergies(dictionary: item)!)
        }
        return models
    }
    
    
    required public init?(dictionary: Dictionary<String,Any>) {
        
        studentAllergiesID = dictionary["studentAllergiesID"] as? Int
        studentID = dictionary["studentID"] as? Int
        allergyReactionTypeID = dictionary["allergyReactionTypeID"] as? Int
        allergyReactionTypeName = dictionary["allergyReactionTypeName"] as? String
        allergyNameID = dictionary["allergyNameID"] as? Int
        allergyName = dictionary["allergyName"] as? String
        agencyID = dictionary["agencyID"] as? Int
        allergyComment = dictionary["allergyComment"] as? String
        firstAllergyObservation = dictionary["firstAllergyObservation"] as? String
        lastAllergyObservation = dictionary["lastAllergyObservation"] as? String
        allergyTypeID = dictionary["allergyTypeID"] as? Int
        allergyTypeName = dictionary["allergyTypeName"] as? String
        treatment = dictionary["treatment"] as? String
        id = dictionary["id"] as? Int
        stringId = dictionary["stringId"] as? Int
        isActive = dictionary["isActive"] as? Bool
        isDeleted = dictionary["isDeleted"] as? Bool
        deletedBy = dictionary["deletedBy"] as? Int
        deletedDate = dictionary["deletedDate"] as? String
        createdBy = dictionary["createdBy"] as? Int
        createdDate = dictionary["createdDate"] as? String
        updatedDate = dictionary["updatedDate"] as? String
        updatedBy = dictionary["updatedBy"] as? Int
        deletedFromIP = dictionary["deletedFromIP"] as? String
        createdFromIP = dictionary["createdFromIP"] as? String
        updatedFromIP = dictionary["updatedFromIP"] as? String
    }
    
    
    
    public func dictionaryRepresentation() -> Dictionary<String,Any> {
        
        let dictionary = NSMutableDictionary()
        
        dictionary.setValue(self.studentAllergiesID, forKey: "studentAllergiesID")
        dictionary.setValue(self.studentID, forKey: "studentID")
        dictionary.setValue(self.allergyReactionTypeID, forKey: "allergyReactionTypeID")
        dictionary.setValue(self.allergyReactionTypeName, forKey: "allergyReactionTypeName")
        dictionary.setValue(self.allergyNameID, forKey: "allergyNameID")
        dictionary.setValue(self.allergyName, forKey: "allergyName")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.allergyComment, forKey: "allergyComment")
        dictionary.setValue(self.firstAllergyObservation, forKey: "firstAllergyObservation")
        dictionary.setValue(self.lastAllergyObservation, forKey: "lastAllergyObservation")
        dictionary.setValue(self.allergyTypeID, forKey: "allergyTypeID")
        dictionary.setValue(self.allergyTypeName, forKey: "allergyTypeName")
        dictionary.setValue(self.treatment, forKey: "treatment")
        dictionary.setValue(self.id, forKey: "id")
        dictionary.setValue(self.stringId, forKey: "stringId")
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
