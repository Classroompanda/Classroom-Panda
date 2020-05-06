

import Foundation
 

public class OtherActivity: NSObject {
	public var subActivityTypeName : String?
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var studentActivitiesID : Int?
	public var subActivityTypeID : Int?
	public var startTime : String?
	public var endTime : String?
	public var otherActivityNote : String?
	public var stringId : Int?
	public var activityTypeID : Int?
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

    required public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [OtherActivity]
    {
        var models:[OtherActivity] = []
        for item in array
        {
            models.append(OtherActivity(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		subActivityTypeName = dictionary["subActivityTypeName"] as? String ?? ""
		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		studentActivitiesID = dictionary["studentActivitiesID"] as? Int ?? 0
		subActivityTypeID = dictionary["subActivityTypeID"] as? Int ?? 0
		startTime = dictionary["startTime"] as? String ?? ""
		endTime = dictionary["endTime"] as? String ?? ""
		otherActivityNote = dictionary["otherActivityNote"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		activityTypeID = dictionary["activityTypeID"] as? Int ?? 0
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

		dictionary.setValue(self.subActivityTypeName, forKey: "subActivityTypeName")
		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentActivitiesID, forKey: "studentActivitiesID")
		dictionary.setValue(self.subActivityTypeID, forKey: "subActivityTypeID")
		dictionary.setValue(self.startTime, forKey: "startTime")
		dictionary.setValue(self.endTime, forKey: "endTime")
		dictionary.setValue(self.otherActivityNote, forKey: "otherActivityNote")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.activityTypeID, forKey: "activityTypeID")
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

        return dictionary as! Dictionary<String, Any>
	}

}
