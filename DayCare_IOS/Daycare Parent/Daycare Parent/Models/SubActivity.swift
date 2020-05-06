

import Foundation

public class SubActivity {
	public var id : Int?
	public var subActivityLabel : String?
	public var subActivityText : String?
	public var agencyID : Int?

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [SubActivity]
    {
        var models:[SubActivity] = []
        for item in array
        {
            models.append(SubActivity(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int
		subActivityLabel = dictionary["subActivityLabel"] as? String
		subActivityText = dictionary["subActivityText"] as? String
		agencyID = dictionary["agencyID"] as? Int
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.subActivityLabel, forKey: "subActivityLabel")
		dictionary.setValue(self.subActivityText, forKey: "subActivityText")
		dictionary.setValue(self.agencyID, forKey: "agencyID")

		return dictionary as! Dictionary<String,Any>
	}

}
