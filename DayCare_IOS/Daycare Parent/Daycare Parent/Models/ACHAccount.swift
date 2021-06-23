//
//  ACHAccount.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 21/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class ACHAccount: NSObject {
    
    public var id : Int?
    public var addDate : String?
    public var agencyID : Int?
    public var parentID : Int?
    public var isActive : Bool?
    public var bankAccountID : String?
    public var customerID : String?
    public var customerToken : String?
    public var parentName : String?
    public var status : Int?
    public var accountNumber : String?
    public var routingNumber : String?
    public var accountHolderName : String?
    public var accountType : String?
    public var deletedBy : Int?

    
    required public override init() {
          super.init()
      }
      
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [ACHAccount]
      {
          var models:[ACHAccount] = []
          for item in array
          {
              models.append(ACHAccount(dictionary: item)!)
          }
          return models
      }
    
    required public init?(dictionary: Dictionary<String,Any>) {
        id = dictionary["id"] as? Int ?? 0
        addDate = dictionary["addDate"] as? String ?? ""
        agencyID = dictionary["agencyID"] as? Int ?? 0
        isActive = dictionary["isActive"] as? Bool ?? true
        bankAccountID = dictionary["bankAccountID"] as? String ?? ""
        customerID = dictionary["customerID"] as? String ?? ""
        customerToken = dictionary["customerToken"] as? String ?? ""
        parentName = dictionary["parentName"] as? String ?? ""
        status = dictionary["status"] as? Int ?? 0
    }
    
    public func dictionaryRepresentation() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.accountType, forKey: "accountType")
        dictionary.setValue(self.accountNumber, forKey: "accountNumber")
        dictionary.setValue(self.routingNumber, forKey: "routingNumber")
        dictionary.setValue(self.accountHolderName, forKey: "accountHolderName")
        dictionary.setValue(self.accountType, forKey: "accountType")

        return dictionary as! Dictionary<String,Any>
    }
    
    public func dictionaryRepresentationToDeleteACHAccount() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.agencyID, forKey: "DeletedBy")
        dictionary.setValue(true, forKey: "IsDeleted")
        dictionary.setValue(self.id, forKey: "id")
        return dictionary as! Dictionary<String,Any>
    }
}
