

import Foundation

public class User: NSObject {
	public var releventUserID : Int?
	public var firstName : String?
	public var lastName : String?
	public var imagePath : String?
	public var teacherTodayAttendenceId : Int?
	public var roleId : Int?
	public var emailAddress : String?
	public var teacherTodayAttendenceStatusId : Int?
	public var agencyID : Int?
    public var loginUserID : Int?
    public var password:String?
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [User]
    {
        var models:[User] = []
        for item in array
        {
            models.append(User(dictionary: item)!)
        }
        return models
    }

    required public override init() {
        super.init()
    }
    
	required public init?(dictionary: Dictionary<String,Any>) {
		releventUserID = dictionary["releventUserID"] as? Int ?? 0
		firstName = dictionary["firstName"] as? String ?? ""
		lastName = dictionary["lastName"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
		teacherTodayAttendenceId = dictionary["teacherTodayAttendenceId"] as? Int ?? 0
		roleId = dictionary["roleId"] as? Int ?? 0
		emailAddress = dictionary["emailAddress"] as? String ?? ""
		teacherTodayAttendenceStatusId = dictionary["teacherTodayAttendenceStatusId"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
        loginUserID = dictionary["loginUserID"] as? Int ?? 0
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()
		dictionary.setValue(self.releventUserID, forKey: "releventUserID")
		dictionary.setValue(self.firstName, forKey: "firstName")
		dictionary.setValue(self.lastName, forKey: "lastName")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.teacherTodayAttendenceId, forKey: "teacherTodayAttendenceId")
		dictionary.setValue(self.roleId, forKey: "roleId")
		dictionary.setValue(self.emailAddress, forKey: "emailAddress")
		dictionary.setValue(self.teacherTodayAttendenceStatusId, forKey: "teacherTodayAttendenceStatusId")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.loginUserID, forKey: "loginUserID")
		return dictionary as! Dictionary<String,Any>
	}
}
