

import Foundation
 
public class State {
	public var id : Int?
	public var stateName : String?
	public var countryID : Int?
	public var stateCode : String?
	public var numCode : String?
	public var phoneCode : String?
	public var agencyID : Int?
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

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [State]
    {
        var models:[State] = []
        for item in array
        {
            models.append(State(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		stateName = dictionary["stateName"] as? String ?? ""
		countryID = dictionary["countryID"] as? Int ?? 0
		stateCode = dictionary["stateCode"] as? String ?? ""
		numCode = dictionary["numCode"] as? String ?? ""
		phoneCode = dictionary["phoneCode"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
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

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.stateName, forKey: "stateName")
		dictionary.setValue(self.countryID, forKey: "countryID")
		dictionary.setValue(self.stateCode, forKey: "stateCode")
		dictionary.setValue(self.numCode, forKey: "numCode")
		dictionary.setValue(self.phoneCode, forKey: "phoneCode")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
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
