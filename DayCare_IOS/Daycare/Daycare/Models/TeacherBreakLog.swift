
import Foundation
 

public class TeacherBreakLog:NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var breakIn : String?
	public var breakOut : String?
	public var teacherDailyAttendenceID : Int?
	public var breakTypesID : Int?
	public var breakTypesName : String?
	public var breakStatusID : Int?
	public var stringId : Int?
	public var breakReason : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?

    public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [TeacherBreakLog]
    {
        var models:[TeacherBreakLog] = []
        for item in array
        {
            models.append(TeacherBreakLog(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		breakIn = dictionary["breakIn"] as? String ?? ""
		breakOut = dictionary["breakOut"] as? String ?? ""
		teacherDailyAttendenceID = dictionary["teacherDailyAttendenceID"] as? Int ?? 0
		breakTypesID = dictionary["breakTypesID"] as? Int ?? 0
		breakTypesName = dictionary["breakTypesName"] as? String ?? ""
		breakStatusID = dictionary["breakStatusID"] as? Int ?? 0
		stringId = dictionary["stringId"] as? Int ?? 0
		breakReason = dictionary["breakReason"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
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
		dictionary.setValue(self.breakIn, forKey: "breakIn")
		dictionary.setValue(self.breakOut, forKey: "breakOut")
		dictionary.setValue(self.teacherDailyAttendenceID, forKey: "teacherDailyAttendenceID")
		dictionary.setValue(self.breakTypesID, forKey: "breakTypesID")
		dictionary.setValue(self.breakTypesName, forKey: "breakTypesName")
		dictionary.setValue(self.breakStatusID, forKey: "breakStatusID")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.breakReason, forKey: "breakReason")
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
