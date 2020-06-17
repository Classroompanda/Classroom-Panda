
import Foundation


public class Immunization: NSObject {
  public var updatedFlag = 1
	public var studentImmunizationID : Int?
	public var studentID : Int?
	public var immunizationID : Int?
	public var immunizationName : String?
	public var agencyID : Int?
	public var otherImmunization : String?
	public var abbreviation : String?
	public var dateReceived : String?
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
    public var receivedDate : Date?

    public required override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Immunization]
    {
        var models:[Immunization] = []
        for item in array
        {
            models.append(Immunization(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {
    updatedFlag = dictionary["updatedFlag"] as? Int ?? 0
//    updatedFlag = 1
		studentImmunizationID = dictionary["studentImmunizationID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		immunizationID = dictionary["immunizationID"] as? Int ?? 0
		immunizationName = dictionary["immunizationName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		otherImmunization = dictionary["otherImmunization"] as? String ?? ""
		abbreviation = dictionary["abbreviation"] as? String ?? ""
		dateReceived = dictionary["dateReceived"] as? String ?? ""
		id = dictionary["id"] as? Int ?? 0
		stringId = dictionary["stringId"] as? Int ?? 0
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
// dictionary.setValue(self.updatedFlag, forKey: "updatedFlag")
    dictionary.setValue(1, forKey: "updatedFlag")
       dictionary.setValue(AppInstance.shared.user?.releventUserID ?? 0, forKey: "updatedBy")
		dictionary.setValue(self.studentImmunizationID, forKey: "studentImmunizationID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.immunizationID, forKey: "immunizationID")
		dictionary.setValue(self.immunizationName, forKey: "immunizationName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.otherImmunization, forKey: "otherImmunization")
		dictionary.setValue(self.abbreviation, forKey: "abbreviation")
		dictionary.setValue(self.dateReceived, forKey: "dateReceived")
		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
//		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")

		return dictionary as! Dictionary<String,Any>
	}

}
