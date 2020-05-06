
import Foundation

public class Incident: NSObject {
	public var id : Int?
	public var incidentDate : String?
	public var incidentTime : String?
	public var incidentDescription : String?
	public var actionTaken : String?
	public var isEmergency : Bool?
	public var isGeneric : Bool?
	public var studentID : Int?
	public var studentName : String?
	public var teacherID : Int?
	public var teacherName : String?
	public var incidentPriortyTypeID : Int?
	public var incidentPriortyTypeName : String?
	public var agencyID : Int?
	public var classesID : Int?
	public var className : String?
	public var placeOfIncident : String?
	public var natureOfInjuryID : Int?
	public var natureOfInjuryName : String?
	public var firstAidAdministeredID : Int?
	public var firstAidAdministeredName : String?
	public var isDoctorRequired : Bool?
	public var wasParentInformed : Bool?
	public var parentInformedBy : String?
	public var incidentInvolvments : Array<IncidentInvolvments>?
	public var stringId : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var reporter  : Int?
    
    public var parentComment : String?
    public var partOfBody : String?
    public var contextEnviroment : String?
    public var contextChild : String?
    public var isAcknowledge : Bool?
    
    required public override init() {
        super.init()
    }
    

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Incident]
    {
        var models:[Incident] = []
        for item in array
        {
            models.append(Incident(dictionary: item)!)
        }
        return models
    }

    
	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		incidentDate = dictionary["incidentDate"] as? String ?? ""
		incidentTime = dictionary["incidentTime"] as? String ?? ""
		incidentDescription = dictionary["description"] as? String ?? ""
		actionTaken = dictionary["actionTaken"] as? String ?? ""
		isEmergency = dictionary["isEmergency"] as? Bool ?? false
		isGeneric = dictionary["isGeneric"] as? Bool ?? false
		studentID = dictionary["studentID"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		teacherID = dictionary["teacherID"] as? Int ?? 0
		teacherName = dictionary["teacherName"] as? String ?? ""
		incidentPriortyTypeID = dictionary["incidentPriortyTypeID"] as? Int ?? 0
		incidentPriortyTypeName = dictionary["incidentPriortyTypeName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		placeOfIncident = dictionary["placeOfIncident"] as? String ?? ""
		natureOfInjuryID = dictionary["natureOfInjuryID"] as? Int ?? 0
		natureOfInjuryName = dictionary["natureOfInjuryName"] as? String ?? ""
		firstAidAdministeredID = dictionary["firstAidAdministeredID"] as? Int ?? 0
		firstAidAdministeredName = dictionary["firstAidAdministeredName"] as? String ?? ""
		isDoctorRequired = dictionary["isDoctorRequired"] as? Bool ?? false
		wasParentInformed = dictionary["wasParentInformed"] as? Bool ?? false
		parentInformedBy = dictionary["parentInformedBy"] as? String ?? ""
        if (dictionary["incidentInvolvments"] != nil) { incidentInvolvments = IncidentInvolvments.modelsFromDictionaryArray(array: (dictionary["incidentInvolvments"] as? Array<Dictionary<String,Any>> ?? []) ) }
		stringId = dictionary["stringId"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
        reporter = dictionary["reporter"] as? Int ?? 0
        
        parentComment = dictionary["parentComment"] as? String ?? ""
        partOfBody = dictionary["partOfBody"] as? String ?? ""
        contextEnviroment = dictionary["contextEnviroment"] as? String ?? ""
        contextChild = dictionary["contextChild"] as? String ?? ""
        isAcknowledge = dictionary["isAcknowledge"] as? Bool ?? false
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.incidentDate, forKey: "incidentDate")
		dictionary.setValue(self.incidentTime, forKey: "incidentTime")
		dictionary.setValue(self.incidentDescription, forKey: "description")
		dictionary.setValue(self.actionTaken, forKey: "actionTaken")
		dictionary.setValue(self.isEmergency, forKey: "isEmergency")
		dictionary.setValue(self.isGeneric, forKey: "isGeneric")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.teacherID, forKey: "teacherID")
		dictionary.setValue(self.teacherName, forKey: "teacherName")
		dictionary.setValue(self.incidentPriortyTypeID, forKey: "incidentPriortyTypeID")
		dictionary.setValue(self.incidentPriortyTypeName, forKey: "incidentPriortyTypeName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.placeOfIncident, forKey: "placeOfIncident")
		dictionary.setValue(self.natureOfInjuryID, forKey: "natureOfInjuryID")
		dictionary.setValue(self.natureOfInjuryName, forKey: "natureOfInjuryName")
		dictionary.setValue(self.firstAidAdministeredID, forKey: "firstAidAdministeredID")
		dictionary.setValue(self.firstAidAdministeredName, forKey: "firstAidAdministeredName")
		dictionary.setValue(self.isDoctorRequired, forKey: "isDoctorRequired")
		dictionary.setValue(self.wasParentInformed, forKey: "wasParentInformed")
		dictionary.setValue(self.parentInformedBy, forKey: "parentInformedBy")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.reporter, forKey: "reporter")
        
        dictionary.setValue(self.parentComment, forKey: "parentComment")
        dictionary.setValue(self.partOfBody, forKey: "partOfBody")
        dictionary.setValue(self.contextEnviroment, forKey: "contextEnviroment")
        dictionary.setValue(self.contextChild, forKey: "contextChild")
        dictionary.setValue(self.isAcknowledge, forKey: "isAcknowledge")
        
		return dictionary as! Dictionary<String,Any>
	}

}
