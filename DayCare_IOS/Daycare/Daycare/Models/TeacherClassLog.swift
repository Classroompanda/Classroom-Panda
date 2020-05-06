

import Foundation
 

public class TeacherClassLog {
	public var id : Int?
	public var agencyID : Int?
	public var teacherID : Int?
	public var teacherDailyAttendenceID : Int?
	public var classesID : Int?
	public var checkInTime : String?
	public var checkOutTime : String?
	public var checkStatus : Int?
	public var className : String?
    public var presentStudentCount : Int?
	public var classStartTime : String?
	public var classEndTime : String?
	public var stringId : Int?
	public var classAssignmentLogID : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : String?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : String?
	public var likeCount : Int?
	public var loveCount : Int?
	public var thumbsUpCount : Int?
	public var thumbsDownCount : Int?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?


    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [TeacherClassLog]
    {
        var models:[TeacherClassLog] = []
        for item in array
        {
            models.append(TeacherClassLog(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		teacherID = dictionary["teacherID"] as? Int ?? 0
		teacherDailyAttendenceID = dictionary["teacherDailyAttendenceID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		checkInTime = dictionary["checkInTime"] as? String ?? ""
		checkOutTime = dictionary["checkOutTime"] as? String ?? ""
		checkStatus = dictionary["checkStatus"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		classStartTime = dictionary["classStartTime"] as? String ?? ""
		classEndTime = dictionary["classEndTime"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		classAssignmentLogID = dictionary["classAssignmentLogID"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? String ?? ""
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		likeCount = dictionary["likeCount"] as? Int ?? 0
		loveCount = dictionary["loveCount"] as? Int ?? 0
		thumbsUpCount = dictionary["thumbsUpCount"] as? Int ?? 0
		thumbsDownCount = dictionary["thumbsDownCount"] as? Int ?? 0
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
        presentStudentCount = dictionary["presentStudentCount"] as? Int ?? 0
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.teacherID, forKey: "teacherID")
		dictionary.setValue(self.teacherDailyAttendenceID, forKey: "teacherDailyAttendenceID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.checkInTime, forKey: "checkInTime")
		dictionary.setValue(self.checkOutTime, forKey: "checkOutTime")
		dictionary.setValue(self.checkStatus, forKey: "checkStatus")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.classStartTime, forKey: "classStartTime")
		dictionary.setValue(self.classEndTime, forKey: "classEndTime")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.classAssignmentLogID, forKey: "classAssignmentLogID")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
		dictionary.setValue(self.likeCount, forKey: "likeCount")
		dictionary.setValue(self.loveCount, forKey: "loveCount")
		dictionary.setValue(self.thumbsUpCount, forKey: "thumbsUpCount")
		dictionary.setValue(self.thumbsDownCount, forKey: "thumbsDownCount")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")

		return dictionary as! Dictionary<String,Any>
	}

}
