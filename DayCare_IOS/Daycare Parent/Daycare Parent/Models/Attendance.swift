
import Foundation

public class Attendance {
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var studentName : String?
	public var imagePath : String?
	public var classesID : Int?
	public var className : String?
	public var checkin : String?
	public var checkout : String?
	public var attendenceStatusID : Int?
	public var attendenceStatusName : String?
	public var vedioFolder : String?
	public var imagefolder : String?
	public var attendanceDate : String?
	public var dropedById : Int?
	public var dropedByOtherId : Int?
	public var pickupById : Int?
	public var pickupByOtherId : Int?
	public var approvedDropedById : Int?
	public var approvedPickupById : Int?
	public var dropedByOtherNames : String?
	public var pickupByOtherName : String?
	public var checkInTime : String?
	public var checkOutTime : String?
	public var onLeave : Bool?
	public var onLeaveComment : String?
	public var disableOnLeave : String?
	public var reasonId : Int?
	public var isEditModeOn : Bool?
	public var stringId : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var dropedByName :   String?
    public var pickupByName :   String?

    

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Attendance]
    {
        var models:[Attendance] = []
        for item in array
        {
            models.append(Attendance(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
		classesID = dictionary["classesID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		checkin = dictionary["checkin"] as? String ?? ""
		checkout = dictionary["checkout"] as? String ?? ""
		attendenceStatusID = dictionary["attendenceStatusID"] as? Int ?? 0
		attendenceStatusName = dictionary["attendenceStatusName"] as? String ?? ""
		vedioFolder = dictionary["vedioFolder"] as? String ?? ""
		imagefolder = dictionary["imagefolder"] as? String ?? ""
		attendanceDate = dictionary["attendanceDate"] as? String ?? ""
		dropedById = dictionary["dropedById"] as? Int ?? 0
		dropedByOtherId = dictionary["dropedByOtherId"] as? Int ?? 0
		pickupById = dictionary["pickupById"] as? Int ?? 0
		pickupByOtherId = dictionary["pickupByOtherId"] as? Int ?? 0
		approvedDropedById = dictionary["approvedDropedById"] as? Int ?? 0
		approvedPickupById = dictionary["approvedPickupById"] as? Int ?? 0
		dropedByOtherNames = dictionary["dropedByOtherNames"] as? String ?? ""
		pickupByOtherName = dictionary["pickupByOtherName"] as? String ?? ""
		checkInTime = dictionary["checkInTime"] as? String ?? ""
		checkOutTime = dictionary["checkOutTime"] as? String ?? ""
		onLeave = dictionary["onLeave"] as? Bool ?? false
		onLeaveComment = dictionary["onLeaveComment"] as? String ?? ""
		disableOnLeave = dictionary["disableOnLeave"] as? String ?? ""
		reasonId = dictionary["reasonId"] as? Int ?? 0
		isEditModeOn = dictionary["isEditModeOn"] as? Bool ?? false
		stringId = dictionary["stringId"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
        dropedByName = dictionary["dropedByName"] as? String ?? ""
        pickupByName = dictionary["pickupByName"] as? String ?? ""
        
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.checkin, forKey: "checkin")
		dictionary.setValue(self.checkout, forKey: "checkout")
		dictionary.setValue(self.attendenceStatusID, forKey: "attendenceStatusID")
		dictionary.setValue(self.attendenceStatusName, forKey: "attendenceStatusName")
		dictionary.setValue(self.vedioFolder, forKey: "vedioFolder")
		dictionary.setValue(self.imagefolder, forKey: "imagefolder")
		dictionary.setValue(self.attendanceDate, forKey: "attendanceDate")
		dictionary.setValue(self.dropedById, forKey: "dropedById")
		dictionary.setValue(self.dropedByOtherId, forKey: "dropedByOtherId")
		dictionary.setValue(self.pickupById, forKey: "pickupById")
		dictionary.setValue(self.pickupByOtherId, forKey: "pickupByOtherId")
		dictionary.setValue(self.approvedDropedById, forKey: "approvedDropedById")
		dictionary.setValue(self.approvedPickupById, forKey: "approvedPickupById")
		dictionary.setValue(self.dropedByOtherNames, forKey: "dropedByOtherNames")
		dictionary.setValue(self.pickupByOtherName, forKey: "pickupByOtherName")
		dictionary.setValue(self.checkInTime, forKey: "checkInTime")
		dictionary.setValue(self.checkOutTime, forKey: "checkOutTime")
		dictionary.setValue(self.onLeave, forKey: "onLeave")
		dictionary.setValue(self.onLeaveComment, forKey: "onLeaveComment")
		dictionary.setValue(self.disableOnLeave, forKey: "disableOnLeave")
		dictionary.setValue(self.reasonId, forKey: "reasonId")
		dictionary.setValue(self.isEditModeOn, forKey: "isEditModeOn")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.dropedByName, forKey: "dropedByName")
        dictionary.setValue(self.pickupByName, forKey: "pickupByName")
		return dictionary as! Dictionary<String,Any>
	}

}
