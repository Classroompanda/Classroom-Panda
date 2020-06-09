

import Foundation
 

public class MessageUser {
	public var listUserId : Int?
	public var listUserName : String?
	public var imagePath : String?
  // Shiwani
	public var unreadMessageCount : Int?
  
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [MessageUser]
    {
        var models:[MessageUser] = []
        for item in array
        {
            models.append(MessageUser(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {
		listUserId = dictionary["listUserId"] as? Int ?? 0
		listUserName = dictionary["listUserName"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
    // Shiwani
    unreadMessageCount = dictionary["count"] as? Int ?? 0
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {
		let dictionary = NSMutableDictionary()
		dictionary.setValue(self.listUserId, forKey: "listUserId")
		dictionary.setValue(self.listUserName, forKey: "listUserName")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
      dictionary.setValue(self.unreadMessageCount, forKey: "count")
		return dictionary as! Dictionary<String,Any>
	}

}
