
import Foundation

public class Class: NSObject {
	public var classesID : Int?
	public var agencyID : Int?
	public var className : String?
	public var categoryId : Int?
	public var classStatusId : Int?
	public var enrollCapacity : Int?
	public var minAgeFrom : Int?
	public var minAgeTo : Int?
	public var maxAgeFrom : Int?
	public var maxAgeTo : Int?
	public var ageCutOffDate : String?
	public var registrationStartDate : String?
	public var classStartDate : String?
	public var classEndDate : String?
	public var startTime : String?
	public var endTime : String?
	public var classDescription : String?
    public var feeTypeName : String?
	public var mon : Bool?
	public var tue : Bool?
	public var wed : Bool?
	public var thu : Bool?
	public var fri : Bool?
	public var sat : Bool?
	public var sun : Bool?
	public var onGoing : Bool?
	public var fees : Int?
	public var feeTypeId : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var isSelected : Bool?

    public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Class]
    {
        var models:[Class] = []
        for item in array
        {
            models.append(Class(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		classesID = dictionary["classesID"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		categoryId = dictionary["categoryId"] as? Int ?? 0
		classStatusId = dictionary["classStatusId"] as? Int ?? 0
		enrollCapacity = dictionary["enrollCapacity"] as? Int ?? 0
		minAgeFrom = dictionary["minAgeFrom"] as? Int ?? 0
		minAgeTo = dictionary["minAgeTo"] as? Int ?? 0
		maxAgeFrom = dictionary["maxAgeFrom"] as? Int ?? 0
		maxAgeTo = dictionary["maxAgeTo"] as? Int ?? 0
		ageCutOffDate = dictionary["ageCutOffDate"] as? String ?? ""
		registrationStartDate = dictionary["registrationStartDate"] as? String ?? ""
		classStartDate = dictionary["classStartDate"] as? String ?? ""
		classEndDate = dictionary["classEndDate"] as? String ?? ""
		startTime = dictionary["startTime"] as? String ?? ""
		endTime = dictionary["endTime"] as? String ?? ""
		classDescription = dictionary["description"] as? String ?? ""
        feeTypeName = dictionary["feeTypeName"] as? String ?? ""
		mon = dictionary["mon"] as? Bool ?? false
		tue = dictionary["tue"] as? Bool ?? false
		wed = dictionary["wed"] as? Bool ?? false
		thu = dictionary["thu"] as? Bool ?? false
		fri = dictionary["fri"] as? Bool ?? false
		sat = dictionary["sat"] as? Bool ?? false
		sun = dictionary["sun"] as? Bool ?? false
		onGoing = dictionary["onGoing"] as? Bool ?? false
		fees = dictionary["fees"] as? Int  ?? 0
		feeTypeId = dictionary["feeTypeId"] as? Int  ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int  ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.categoryId, forKey: "categoryId")
		dictionary.setValue(self.classStatusId, forKey: "classStatusId")
		dictionary.setValue(self.enrollCapacity, forKey: "enrollCapacity")
		dictionary.setValue(self.minAgeFrom, forKey: "minAgeFrom")
		dictionary.setValue(self.minAgeTo, forKey: "minAgeTo")
		dictionary.setValue(self.maxAgeFrom, forKey: "maxAgeFrom")
		dictionary.setValue(self.maxAgeTo, forKey: "maxAgeTo")
		dictionary.setValue(self.ageCutOffDate, forKey: "ageCutOffDate")
		dictionary.setValue(self.registrationStartDate, forKey: "registrationStartDate")
		dictionary.setValue(self.classStartDate, forKey: "classStartDate")
		dictionary.setValue(self.classEndDate, forKey: "classEndDate")
		dictionary.setValue(self.startTime, forKey: "startTime")
		dictionary.setValue(self.endTime, forKey: "endTime")
		dictionary.setValue(self.classDescription, forKey: "description")
		dictionary.setValue(self.mon, forKey: "mon")
		dictionary.setValue(self.tue, forKey: "tue")
		dictionary.setValue(self.wed, forKey: "wed")
		dictionary.setValue(self.thu, forKey: "thu")
		dictionary.setValue(self.fri, forKey: "fri")
		dictionary.setValue(self.sat, forKey: "sat")
		dictionary.setValue(self.sun, forKey: "sun")
		dictionary.setValue(self.onGoing, forKey: "onGoing")
		dictionary.setValue(self.fees, forKey: "fees")
		dictionary.setValue(self.feeTypeId, forKey: "feeTypeId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.feeTypeName, forKey: "feeTypeName")
		return dictionary as! Dictionary<String, Any>
	}

}
