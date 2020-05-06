

import Foundation


public class ActivityDetail : NSObject {
    public var activityDescription : String?
	public var studentActivityID : Int?
	public var activityTypeID : Int?
	public var studentID : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : String?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?
    public var endTime : String?
    public var startTime : String?
    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [ActivityDetail]
    {
        var models:[ActivityDetail] = []
        for item in array
        {
            models.append(ActivityDetail(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {
        activityDescription = dictionary["activityDescription"] as? String ?? ""
		studentActivityID = dictionary["studentActivityID"] as? Int ?? 0
		activityTypeID = dictionary["activityTypeID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? String ?? ""
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
        endTime =   dictionary["endTime"] as? String ?? ""
        startTime =   dictionary["startTime"] as? String ?? ""
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()
        dictionary.setValue(self.activityDescription, forKey: "activityDescription")
		dictionary.setValue(self.studentActivityID, forKey: "studentActivityID")
		dictionary.setValue(self.activityTypeID, forKey: "activityTypeID")
		dictionary.setValue(self.studentID, forKey: "studentID")
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
        dictionary.setValue(self.endTime, forKey: "endTime")
        dictionary.setValue(self.startTime, forKey: "startTime")

		return dictionary as! Dictionary<String,Any>
	}

}
