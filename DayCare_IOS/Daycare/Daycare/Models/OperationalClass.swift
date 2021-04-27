
import Foundation


public class OperationalClass : NSObject {
	public var value : Int?
	public var label : String?
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
  public var isSelected : Bool?
  public var allergyType : String?
  public var checkInTime : String?
  
  public override init() {
      super.init()
  }
  

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [OperationalClass]
    {
        var models:[OperationalClass] = []
        for item in array
        {
            models.append(OperationalClass(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		value = dictionary["value"] as? Int ?? 0
		label = dictionary["label"] as? String ?? ""
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
    
    // new keys
    allergyType = dictionary["allergyType"] as? String ?? ""
    checkInTime = dictionary["checkInTime"] as? String ?? ""
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.value, forKey: "value")
		dictionary.setValue(self.label, forKey: "label")
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
