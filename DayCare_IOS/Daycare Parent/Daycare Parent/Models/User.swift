

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
    public var childCount   :   Int?
    public var isGaurdian : Bool?
    public var isParent    : Bool?
    public var isSecondaryParent   : Bool?
    public var loginUserID : Int?
    public var isStripeAccount : Bool?
    public var isSubscriptionActive : Bool?
    public var password : String?
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
        childCount = dictionary["childCount"] as? Int ?? 0
        isGaurdian = dictionary["isGaurdian"] as? Bool ?? false
        isParent = dictionary["isParent"] as? Bool ?? false
        isSecondaryParent = dictionary["isSecondaryParent"] as? Bool ?? false
        loginUserID = dictionary["loginUserID"] as? Int ?? 0
        isStripeAccount = dictionary["isStripeAccount"] as? Bool ?? false
        isSubscriptionActive = dictionary["isSubscriptionActive"] as? Bool ?? false
        password = dictionary["password"] as? String ?? ""
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
        dictionary.setValue(self.childCount, forKey: "childCount")
        dictionary.setValue(self.isGaurdian, forKey: "isGaurdian")
        dictionary.setValue(self.isParent, forKey: "isParent")
        dictionary.setValue(self.isSecondaryParent, forKey: "isSecondaryParent")
        dictionary.setValue(self.loginUserID, forKey: "loginUserID")
        dictionary.setValue(self.isStripeAccount, forKey: "isStripeAccount")
        dictionary.setValue(self.isSubscriptionActive, forKey: "isSubscriptionActive")
        dictionary.setValue(self.password, forKey: "password")
		return dictionary as! Dictionary<String,Any>
	}

}
