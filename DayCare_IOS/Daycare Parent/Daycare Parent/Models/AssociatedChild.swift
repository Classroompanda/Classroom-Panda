

import Foundation
 

public class AssociatedChild : NSObject{
	public var id : Int?
	public var agencyID : Int?
	public var parentID : Int?
	public var studentID : Int?
	public var isParent : Bool?
	public var isGaurdian : Bool?
	public var isSecondaryParent : Bool?
	public var stringId : Int?
	public var studentName : String?
	public var firstName : String?
	public var lastName : String?
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
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [AssociatedChild]
    {
        var models:[AssociatedChild] = []
        for item in array
        {
            models.append(AssociatedChild(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		parentID = dictionary["parentID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		isParent = dictionary["isParent"] as? Bool ?? false
		isGaurdian = dictionary["isGaurdian"] as? Bool ?? false
		isSecondaryParent = dictionary["isSecondaryParent"] as? Bool ?? false
		stringId = dictionary["stringId"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		firstName = dictionary["firstName"] as? String ?? ""
		lastName = dictionary["lastName"] as? String ?? ""
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
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.parentID, forKey: "parentID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.isParent, forKey: "isParent")
		dictionary.setValue(self.isGaurdian, forKey: "isGaurdian")
		dictionary.setValue(self.isSecondaryParent, forKey: "isSecondaryParent")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.firstName, forKey: "firstName")
		dictionary.setValue(self.lastName, forKey: "lastName")
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
