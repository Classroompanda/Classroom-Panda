

import Foundation

public class DailySheet: NSObject {
	public var studentName : String?
	public var imagePath : String?
	public var activityTypeName : String?
	public var className : String?
	public var totalActivityCount : Int?
	public var activityDetail : Array<ActivityDetail>?
	public var studentActivityMeals : String?
	public var studentActivityMedications : String?
	public var studentActivityNotes : String?
	public var studentActivityMoods : String?
	public var studentOtherActivity : String?
	public var studentAcitivityNap : String?
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var classesID : Int?
	public var activityTypeID : Int?
	public var activityRegisterDate : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var deletedFromIP : String?
	public var createdBy : String?
	public var createdDate : String?
	public var createdFromIP : String?
	public var updatedDate : String?
	public var updatedFromIP : String?
	public var updatedBy : String?
	public var stringId : Int?
    public var isSelected : Bool?

    required public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [DailySheet]
    {
        var models:[DailySheet] = []
        for item in array
        {
            models.append(DailySheet(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		studentName = dictionary["studentName"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
		activityTypeName = dictionary["activityTypeName"] as? String ?? ""
		className = dictionary["className"] as? String ?? ""
		totalActivityCount = dictionary["totalActivityCount"] as? Int ?? 0
        if (dictionary["activityDetail"] != nil) { activityDetail = ActivityDetail.modelsFromDictionaryArray(array: dictionary["activityDetail"] as? Array<Dictionary<String,Any>> ?? []) }
		studentActivityMeals = dictionary["studentActivityMeals"] as? String ?? ""
		studentActivityMedications = dictionary["studentActivityMedications"] as? String ?? ""
		studentActivityNotes = dictionary["studentActivityNotes"] as? String ?? ""
		studentActivityMoods = dictionary["studentActivityMoods"] as? String ?? ""
		studentOtherActivity = dictionary["studentOtherActivity"] as? String ?? ""
		studentAcitivityNap = dictionary["studentAcitivityNap"] as? String ?? ""
		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		activityTypeID = dictionary["activityTypeID"] as? Int ?? 0
		activityRegisterDate = dictionary["activityRegisterDate"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? String ?? ""
		createdDate = dictionary["createdDate"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.activityTypeName, forKey: "activityTypeName")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.totalActivityCount, forKey: "totalActivityCount")
		dictionary.setValue(self.studentActivityMeals, forKey: "studentActivityMeals")
		dictionary.setValue(self.studentActivityMedications, forKey: "studentActivityMedications")
		dictionary.setValue(self.studentActivityNotes, forKey: "studentActivityNotes")
		dictionary.setValue(self.studentActivityMoods, forKey: "studentActivityMoods")
		dictionary.setValue(self.studentOtherActivity, forKey: "studentOtherActivity")
		dictionary.setValue(self.studentAcitivityNap, forKey: "studentAcitivityNap")
		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.activityTypeID, forKey: "activityTypeID")
		dictionary.setValue(self.activityRegisterDate, forKey: "activityRegisterDate")
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
