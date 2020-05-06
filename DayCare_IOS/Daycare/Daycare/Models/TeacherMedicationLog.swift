

import Foundation

public class TeacherMedicationLog {
	public var studentID : Int?
	public var studentFirstName : String?
	public var studentLastName : String?
	public var studentName : String?
	public var studentMedicationID : Int?
	public var medicationName : String?
	public var agencyID : Int?
	public var units : Int?
	public var strength : String?
	public var doseRepeatID : Int?
	public var doseRepeatName : String?
	public var dosageQuantityID : Int?
	public var howTaken : String?
	public var otherMedication : String?
	public var startDate : String?
	public var endDate : String?
    public var isMedicationDone : Bool?
	public var studentActivityMedicationID : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : String?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?


    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [TeacherMedicationLog]
    {
        var models:[TeacherMedicationLog] = []
        for item in array
        {
            models.append(TeacherMedicationLog(dictionary: item)!)
        }
        return models
    }

    required public init?(dictionary: Dictionary<String,Any>) {

		studentID = dictionary["studentID"] as? Int ?? 0
		studentFirstName = dictionary["studentFirstName"] as? String ?? ""
		studentLastName = dictionary["studentLastName"] as? String ?? ""
		studentName = dictionary["studentName"] as? String ?? ""
		studentMedicationID = dictionary["studentMedicationID"] as? Int ?? 0
		medicationName = dictionary["medicationName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		units = dictionary["units"] as? Int ?? 0
		strength = dictionary["strength"] as? String ?? ""
		doseRepeatID = dictionary["doseRepeatID"] as? Int ?? 0
		doseRepeatName = dictionary["doseRepeatName"] as? String ?? ""
		dosageQuantityID = dictionary["dosageQuantityID"] as? Int ?? 0
		howTaken = dictionary["howTaken"] as? String ?? ""
		otherMedication = dictionary["otherMedication"] as? String ?? ""
		startDate = dictionary["startDate"] as? String ?? ""
		endDate = dictionary["endDate"] as? String ?? ""
        isMedicationDone = dictionary["isMedicationDone"] as? Bool ?? false
		studentActivityMedicationID = dictionary["studentActivityMedicationID"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? String ?? ""
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
	}

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentFirstName, forKey: "studentFirstName")
		dictionary.setValue(self.studentLastName, forKey: "studentLastName")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.studentMedicationID, forKey: "studentMedicationID")
		dictionary.setValue(self.medicationName, forKey: "medicationName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.units, forKey: "units")
		dictionary.setValue(self.strength, forKey: "strength")
		dictionary.setValue(self.doseRepeatID, forKey: "doseRepeatID")
		dictionary.setValue(self.doseRepeatName, forKey: "doseRepeatName")
		dictionary.setValue(self.dosageQuantityID, forKey: "dosageQuantityID")
		dictionary.setValue(self.howTaken, forKey: "howTaken")
		dictionary.setValue(self.otherMedication, forKey: "otherMedication")
		dictionary.setValue(self.startDate, forKey: "startDate")
		dictionary.setValue(self.endDate, forKey: "endDate")
        dictionary.setValue(self.isMedicationDone, forKey: "isMedicationDone")
		dictionary.setValue(self.studentActivityMedicationID, forKey: "studentActivityMedicationID")
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
