//
//  Message.swift
//  Daycare
//
//  Created by amrut waghmare on 08/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class Message: NSObject {

    public var SenderUserID : Int?
    public var message : String?
    public var ReceiverUserID : Int?
    public var agencyID : Int?
    public var CreatedDateTime : String?
   
    
    required override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Message]
    {
        var models:[Message] = []
        for item in array
        {
            models.append(Message(dictionary: item)!)
        }
        return models
    }
    
    
    required public init?(dictionary: Dictionary<String,Any>) {
        message = dictionary["message"] as? String ?? ""
        CreatedDateTime = dictionary["createdDateTime"] as? String ?? ""
        SenderUserID = dictionary["senderUserID"] as? Int ?? 0
        ReceiverUserID = dictionary["receiverUserID"] as? Int ?? 0
        agencyID = dictionary["agencyID"] as? Int ?? 0
    }
    
    required public init?(dictionaryM: Dictionary<String,Any>){
        message = dictionaryM["message"] as? String ?? ""
        SenderUserID = dictionaryM["sender"] as? Int ?? 0
        ReceiverUserID = dictionaryM["receiver"] as? Int ?? 0
    }
    
    public func dictionaryRepresentation() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.message, forKey: "message")
        dictionary.setValue(self.SenderUserID, forKey: "senderUserID")
        dictionary.setValue(self.ReceiverUserID, forKey: "receiverUserID")
        dictionary.setValue(self.CreatedDateTime, forKey: "createdDateTime")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        return dictionary as! Dictionary<String,Any>
    }
    
    public func getStringFromParam() -> String {
        if let  jsonData = try? JSONSerialization.data(withJSONObject: self.dictionaryRepresentation(), options: .prettyPrinted) {
            let convertedString = String(data: jsonData, encoding: .utf8)
            return convertedString ?? ""
        } else {
            return ""
        }
    }
}
