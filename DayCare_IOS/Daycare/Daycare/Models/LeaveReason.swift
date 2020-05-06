

import Foundation
 


public class LeaveReason {
	public var leaveReasonTypeID : Int?
	public var leaveReasonTypeName : String?
	public var agencyID : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [LeaveReason]
    {
        var models:[LeaveReason] = []
        for item in array
        {
            models.append(LeaveReason(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		leaveReasonTypeID = dictionary["leaveReasonTypeID"] as? Int ?? 0
		leaveReasonTypeName = dictionary["leaveReasonTypeName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.leaveReasonTypeID, forKey: "leaveReasonTypeID")
		dictionary.setValue(self.leaveReasonTypeName, forKey: "leaveReasonTypeName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")

        return dictionary as! Dictionary<String, Any>
	}

}
