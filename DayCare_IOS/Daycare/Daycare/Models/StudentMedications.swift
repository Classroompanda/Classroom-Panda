
import Foundation

public class StudentMedications {
	public var studentMedicationID : Int?
	public var studentID : Int?
	public var medicationName : String?
	public var agencyID : Int?
	public var units : Int?
	public var strength : String?
	public var doses : String?
	public var howTaken : String?
	public var otherMedication : String?
	public var startDate : String?
	public var endDate : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var doseRepeatName : String?
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [StudentMedications]
    {
        var models:[StudentMedications] = []
        for item in array
        {
            models.append(StudentMedications(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		studentMedicationID = dictionary["studentMedicationID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		medicationName = dictionary["medicationName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		units = dictionary["units"] as? Int ?? 0
		strength = dictionary["strength"] as? String ?? ""
		doses = dictionary["doses"] as? String ?? ""
		howTaken = dictionary["howTaken"] as? String ?? ""
		otherMedication = dictionary["otherMedication"] as? String ?? ""
		startDate = dictionary["startDate"] as? String ?? ""
		endDate = dictionary["endDate"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
        doseRepeatName = dictionary["doseRepeatName"] as? String ?? ""
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.studentMedicationID, forKey: "studentMedicationID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.medicationName, forKey: "medicationName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.units, forKey: "units")
		dictionary.setValue(self.strength, forKey: "strength")
		dictionary.setValue(self.doses, forKey: "doses")
		dictionary.setValue(self.howTaken, forKey: "howTaken")
		dictionary.setValue(self.otherMedication, forKey: "otherMedication")
		dictionary.setValue(self.startDate, forKey: "startDate")
		dictionary.setValue(self.endDate, forKey: "endDate")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.doseRepeatName, forKey: "doseRepeatName")
		return dictionary as! Dictionary<String,Any>
	}

}
