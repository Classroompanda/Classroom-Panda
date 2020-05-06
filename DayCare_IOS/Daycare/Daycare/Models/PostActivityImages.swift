

import Foundation

public class PostActivityImages: NSObject {
	public var id : Int?
	public var postActivitiesID : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var classesID : Int?
	public var imageServerPath : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var deletedFromIP : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var createdFromIP : String?
	public var updatedDate : String?
	public var updatedFromIP : String?
	public var updatedBy : Int?
	public var stringId : Int?

    public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PostActivityImages]
    {
        var models:[PostActivityImages] = []
        for item in array
        {
            models.append(PostActivityImages(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		postActivitiesID = dictionary["postActivitiesID"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		imageServerPath = dictionary["imageServerPath"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
		stringId = dictionary["stringId"] as? Int ?? 0
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.postActivitiesID, forKey: "postActivitiesID")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.imageServerPath, forKey: "imageServerPath")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
		dictionary.setValue(self.stringId, forKey: "stringId")

		return dictionary as! Dictionary<String,Any>
	}

}
