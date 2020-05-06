
import Foundation

public class InvolvedClass:NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var eventPlannerID : Int?
    public var mealPlannerID : Int?
	public var classesID : Int?
	public var className : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?
	public var stringId : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var eventID  :   Int?
    
    //InvolvedClass
    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [InvolvedClass]
    {
        var models:[InvolvedClass] = []
        for item in array
        {
            models.append(InvolvedClass(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		eventPlannerID = dictionary["eventPlannerID"] as? Int ?? 0
        mealPlannerID = dictionary["mealPlannerID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
        eventID = dictionary["eventID"] as? Int ?? 0
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.eventPlannerID, forKey: "eventPlannerID")
        dictionary.setValue(self.mealPlannerID, forKey: "mealPlannerID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.eventID, forKey: "eventID")
		return dictionary as! Dictionary<String,Any>
	}

}
