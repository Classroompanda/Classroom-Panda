

import Foundation

public class Medication: NSObject {
   public var updatedFlag = 1
	public var studentMedicationID : Int?
	public var studentID : Int?
	public var medicationName : String?
	public var agencyID : Int?
	public var units : Int?
	public var strength : String?
	public var doseRepeatID : Int?
	public var dosageQuantityID : Int?
	public var dosageQuantityName : String?
	public var doseRepeatName : String?
	public var howTaken : String?
	public var otherMedication : String?
	public var startDate : String?
	public var endDate : String?
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
    public var endDatee : Date?
    public var startDatee : Date?
    
    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Medication]
    {
        var models:[Medication] = []
        for item in array
        {
            models.append(Medication(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {
    updatedFlag = dictionary["updatedFlag"] as? Int ?? 0
//    updatedFlag = 1
		studentMedicationID = dictionary["studentMedicationID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		medicationName = dictionary["medicationName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		units = dictionary["units"] as? Int ?? 0
		strength = dictionary["strength"] as? String ?? ""
		doseRepeatID = dictionary["doseRepeatID"] as? Int ?? 0
		dosageQuantityID = dictionary["dosageQuantityID"] as? Int ?? 0
		dosageQuantityName = dictionary["dosageQuantityName"] as? String ?? ""
		doseRepeatName = dictionary["doseRepeatName"] as? String ?? ""
		howTaken = dictionary["howTaken"] as? String ?? ""
		otherMedication = dictionary["otherMedication"] as? String ?? ""
		startDate = dictionary["startDate"] as? String ?? ""
		endDate = dictionary["endDate"] as? String ?? ""
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
		dictionary.setValue(self.studentMedicationID, forKey: "studentMedicationID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.medicationName, forKey: "medicationName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.units, forKey: "units")
		dictionary.setValue(self.strength, forKey: "strength")
		dictionary.setValue(self.doseRepeatID, forKey: "doseRepeatID")
		dictionary.setValue(self.dosageQuantityID, forKey: "dosageQuantityID")
		dictionary.setValue(self.dosageQuantityName, forKey: "dosageQuantityName")
		dictionary.setValue(self.doseRepeatName, forKey: "doseRepeatName")
		dictionary.setValue(self.howTaken, forKey: "howTaken")
		dictionary.setValue(self.otherMedication, forKey: "otherMedication")
		dictionary.setValue(self.startDate, forKey: "startDate")
		dictionary.setValue(self.endDate, forKey: "endDate")
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
