

import Foundation

public class ActivityMedications: NSObject {
    public var id : Int?
    public var studentID : Int?
    public var agencyID : Int?
    public var studentActivitiesID : Int?
    public var studentHealthDescription : String?
    public var recordedTemparture : String?
    public var stringId : Int?
    public var activityTypeID : Int?
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
    public var isTeacherAcknowledge : Bool?
    public var isParentAcknowledge : Bool?
    public var acknowledgeTeacherID : Int?
    public var acknowledgeParentID : Int?
    public var doseRepeatID : Int?
    public var doseRepeatName : String?
    public var dosageQuantityID : Int?
    public var unit : Int?
    public var classesID : Int?
    public var howTaken : String?
    public var studentMedicationID : Int?
    public var studentMedicationName : String?
    public var acknowledgeParentName : String?
    public var acknowledgeTeacherName : String?
    public var isMedicationDoneToday : Bool?
   
    
    
    required public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [ActivityMedications]
    {
        var models:[ActivityMedications] = []
        for item in array
        {
            models.append(ActivityMedications(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

        id = dictionary["id"] as? Int ?? 0
        studentID = dictionary["studentID"] as? Int ?? 0
        agencyID = dictionary["agencyID"] as? Int ?? 0
        studentActivitiesID = dictionary["studentActivitiesID"] as? Int ?? 0
        studentHealthDescription = dictionary["studentHealthDescription"] as? String ?? ""
        recordedTemparture = dictionary["recordedTemparture"] as? String ?? ""
        stringId = dictionary["stringId"] as? Int ?? 0
        activityTypeID = dictionary["activityTypeID"] as? Int ?? 0
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
        isParentAcknowledge = dictionary["isParentAcknowledge"] as? Bool ?? false
        isTeacherAcknowledge = dictionary["isTeacherAcknowledge"] as? Bool ?? false
        acknowledgeParentID = dictionary["acknowledgeParentID"] as? Int ?? 0
        acknowledgeTeacherID = dictionary["acknowledgeTeacherID"] as? Int ?? 0
        
        
        doseRepeatID = dictionary["doseRepeatID"] as? Int ?? 0
        doseRepeatName = dictionary["doseRepeatName"] as? String ?? ""
        dosageQuantityID = dictionary["dosageQuantityID"] as? Int ?? 0
        unit = dictionary["unit"] as? Int ?? 0
        classesID = dictionary["classesID"] as? Int ?? 0
        howTaken = dictionary["howTaken"] as? String ?? ""
        studentMedicationID = dictionary["studentMedicationID"] as? Int ?? 0
        studentMedicationName = dictionary["studentMedicationName"] as? String ?? ""
        
        
        acknowledgeParentName = dictionary["acknowledgeParentName"] as? String ?? ""
        acknowledgeTeacherName = dictionary["acknowledgeTeacherName"] as? String ?? ""
        isMedicationDoneToday = dictionary["isMedicationDoneToday"] as? Bool ?? false
	}

    
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

        dictionary.setValue(self.id, forKey: "id")
        dictionary.setValue(self.studentID, forKey: "studentID")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.studentActivitiesID, forKey: "studentActivitiesID")
        dictionary.setValue(self.studentHealthDescription, forKey: "studentHealthDescription")
        dictionary.setValue(self.recordedTemparture, forKey: "recordedTemparture")
        dictionary.setValue(self.stringId, forKey: "stringId")
        dictionary.setValue(self.activityTypeID, forKey: "activityTypeID")
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
        dictionary.setValue(self.doseRepeatID, forKey: "doseRepeatID")
        dictionary.setValue(self.doseRepeatName, forKey: "doseRepeatName")
        dictionary.setValue(self.dosageQuantityID, forKey: "dosageQuantityID")
        dictionary.setValue(self.unit, forKey: "unit")
        dictionary.setValue(self.classesID, forKey: "classesID")
        dictionary.setValue(self.howTaken, forKey: "howTaken")
        dictionary.setValue(self.studentMedicationID, forKey: "studentMedicationID")
        dictionary.setValue(self.studentMedicationName, forKey: "studentMedicationName")
        dictionary.setValue(self.isParentAcknowledge, forKey: "isParentAcknowledge")
        dictionary.setValue(self.isTeacherAcknowledge, forKey: "isTeacherAcknowledge")
        dictionary.setValue(self.acknowledgeParentID, forKey: "acknowledgeParentID")
        dictionary.setValue(self.acknowledgeTeacherID, forKey: "acknowledgeTeacherID")
        dictionary.setValue(self.acknowledgeParentName, forKey: "acknowledgeParentName")
        dictionary.setValue(self.acknowledgeTeacherName, forKey: "acknowledgeTeacherName")
        dictionary.setValue(self.isMedicationDoneToday, forKey: "isMedicationDoneToday")
		return dictionary as! Dictionary<String,Any>
	}
}
