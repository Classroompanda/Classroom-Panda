

import Foundation
 


public class StudentBreak:NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var classAttendenceID : Int?
	public var breakInTime : String?
	public var breakOutTime : String?
	public var attendenceStatusID : Int?
	public var attendanceDate : String?
	public var dropedById : Int?
	public var dropedByOtherId : Int?
	public var pickupById : Int?
	public var pickupByOtherId : Int?
	public var approvedDropedById : Int?
	public var approvedPickupById : Int?
	public var dropedByOtherNames : String?
	public var pickupByOtherName : String?
	public var stringId : Int?
	public var breakStatusId : Int?
	public var breakReason : String?
    public var pickupBy :   String?
    public var dropedBy :   String?
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

    public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [StudentBreak]
    {
        var models:[StudentBreak] = []
        for item in array
        {
            models.append(StudentBreak(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		classAttendenceID = dictionary["classAttendenceID"] as? Int ?? 0
		breakInTime = dictionary["breakInTime"] as? String ?? ""
		breakOutTime = dictionary["breakOutTime"] as? String ?? ""
		attendenceStatusID = dictionary["attendenceStatusID"] as? Int ?? 0
		attendanceDate = dictionary["attendanceDate"] as? String ?? ""
		dropedById = dictionary["dropedById"] as? Int ?? 0
		dropedByOtherId = dictionary["dropedByOtherId"] as? Int ?? 0
		pickupById = dictionary["pickupById"] as? Int ?? 0
		pickupByOtherId = dictionary["pickupByOtherId"] as? Int ?? 0
		approvedDropedById = dictionary["approvedDropedById"] as? Int ?? 0
		approvedPickupById = dictionary["approvedPickupById"] as? Int ?? 0
		dropedByOtherNames = dictionary["dropedByOtherNames"] as? String ?? ""
		pickupByOtherName = dictionary["pickupByOtherName"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		breakStatusId = dictionary["breakStatusId"] as? Int ?? 0
		breakReason = dictionary["breakReason"] as? String ?? ""
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
        pickupBy = dictionary["pickupBy"] as? String ?? ""
        dropedBy = dictionary["dropedBy"] as? String ?? ""
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.classAttendenceID, forKey: "classAttendenceID")
		dictionary.setValue(self.breakInTime, forKey: "breakInTime")
		dictionary.setValue(self.breakOutTime, forKey: "breakOutTime")
		dictionary.setValue(self.attendenceStatusID, forKey: "attendenceStatusID")
		dictionary.setValue(self.attendanceDate, forKey: "attendanceDate")
		dictionary.setValue(self.dropedById, forKey: "dropedById")
		dictionary.setValue(self.dropedByOtherId, forKey: "dropedByOtherId")
		dictionary.setValue(self.pickupById, forKey: "pickupById")
		dictionary.setValue(self.pickupByOtherId, forKey: "pickupByOtherId")
		dictionary.setValue(self.approvedDropedById, forKey: "approvedDropedById")
		dictionary.setValue(self.approvedPickupById, forKey: "approvedPickupById")
		dictionary.setValue(self.dropedByOtherNames, forKey: "dropedByOtherNames")
		dictionary.setValue(self.pickupByOtherName, forKey: "pickupByOtherName")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.breakStatusId, forKey: "breakStatusId")
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
        dictionary.setValue(self.pickupBy, forKey: "pickupBy")
        dictionary.setValue(self.dropedBy, forKey: "dropedBy")

		return dictionary as! Dictionary<String,Any>
	}

}
