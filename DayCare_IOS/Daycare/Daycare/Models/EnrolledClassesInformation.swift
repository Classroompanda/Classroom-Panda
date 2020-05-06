

import Foundation
 

public class EnrolledClassesInformation {
	public var id : Int?
	public var agencyID : Int?
	public var classesID : Int?
	public var className : String?
	public var studentID : Int?
	public var studentName : String?
	public var classEnrollStartDate : String?
	public var classEnrollEndDate : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [EnrolledClassesInformation]
    {
        var models:[EnrolledClassesInformation] = []
        for item in array
        {
            models.append(EnrolledClassesInformation(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		studentID = dictionary["studentID"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		classEnrollStartDate = dictionary["classEnrollStartDate"] as? String ?? ""
		classEnrollEndDate = dictionary["classEnrollEndDate"] as? String ?? ""
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

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.classEnrollStartDate, forKey: "classEnrollStartDate")
		dictionary.setValue(self.classEnrollEndDate, forKey: "classEnrollEndDate")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")

		return dictionary as! Dictionary<String,Any>
	}

}
