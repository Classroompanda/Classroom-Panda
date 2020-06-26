

import Foundation
 

public class Guardian: NSObject {
    public var guardianId : Int?
    public var guardianName : String?
    public var agencyID : Int?
    public var userID : Int?
    public var relationTypeId : Int?
    public var relationTypeName : String?
    public var studentID : Int?
    public var firstName : String?
    public var lastName : String?
    public var address : String?
    public var countryId : Int?
    public var stateId : Int?
    public var cityId : Int?
    public var postalCode : String?
    public var pinNumber : Int?
    public var isAuthorizedToPickup : Bool?
    public var reasonNotToAllow : String?
    public var emailId : String?
    public var imagePath : String?
    public var securityKey : Int?
    public var mobile : Int?
    public var failedLoginAttemptCount : Int?
    public var id : Int?
    public var stringId : Int?
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

    public var dateOfBirth   :  String?
    public var dateOfBirthh : Date?
    public var profession : String?
    public var genderID : Int?
    public var genderName : String?
    
    
    required public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Guardian]
    {
        var models:[Guardian] = []
        for item in array
        {
            models.append(Guardian(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

        guardianId = dictionary["guardianId"] as? Int ?? 0
        guardianName = dictionary["guardianName"] as? String ?? ""
        agencyID = dictionary["agencyID"] as? Int ?? 0
        userID = dictionary["userID"] as? Int ?? 0
        relationTypeId = dictionary["relationTypeId"] as? Int ?? 0
        relationTypeName = dictionary["relationTypeName"] as? String ?? ""
        studentID = dictionary["studentID"] as? Int ?? 0
        firstName = dictionary["firstName"] as? String ?? ""
        lastName = dictionary["lastName"] as? String ?? ""
        address = dictionary["address"] as? String ?? ""
        countryId = dictionary["countryId"] as? Int ?? 0
        stateId = dictionary["stateId"] as? Int ?? 0
        cityId = dictionary["cityId"] as? Int ?? 0
        postalCode = dictionary["postalCode"] as? String ?? ""
        pinNumber = dictionary["pinNumber"] as? Int ?? 0
        isAuthorizedToPickup = dictionary["isAuthorizedToPickup"] as? Bool ?? false
        reasonNotToAllow = dictionary["reasonNotToAllow"] as? String ?? ""
        emailId = dictionary["emailId"] as? String ?? ""
        imagePath = dictionary["imagePath"] as? String ?? ""
        imagePath = imagePath?.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        securityKey = dictionary["securityKey"] as? Int ?? 0
        mobile = dictionary["mobile"] as? Int ?? 0
        failedLoginAttemptCount = dictionary["failedLoginAttemptCount"] as? Int ?? 0
        id = dictionary["id"] as? Int ?? 0
        stringId = dictionary["stringId"] as? Int ?? 0
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
        dateOfBirth = dictionary["dateOfBirth"] as? String ?? ""
        profession = dictionary["profession"] as? String ?? ""
        genderID = dictionary["genderID"] as? Int ?? 0
        genderName = dictionary["genderName"] as? String ?? ""
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

        dictionary.setValue(self.guardianId, forKey: "guardianId")
        dictionary.setValue(self.guardianName, forKey: "guardianName")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.userID, forKey: "userID")
        dictionary.setValue(self.relationTypeId, forKey: "relationTypeId")
        dictionary.setValue(self.relationTypeName, forKey: "relationTypeName")
        dictionary.setValue(self.studentID, forKey: "studentID")
        dictionary.setValue(self.firstName, forKey: "firstName")
        dictionary.setValue(self.lastName, forKey: "lastName")
        dictionary.setValue(self.address, forKey: "address")
        dictionary.setValue(self.countryId, forKey: "countryId")
        dictionary.setValue(self.stateId, forKey: "stateId")
        dictionary.setValue(self.cityId, forKey: "cityId")
        dictionary.setValue(self.postalCode, forKey: "postalCode")
        dictionary.setValue(self.pinNumber, forKey: "pinNumber")
        dictionary.setValue(self.isAuthorizedToPickup, forKey: "isAuthorizedToPickup")
        dictionary.setValue(self.reasonNotToAllow, forKey: "reasonNotToAllow")
        dictionary.setValue(self.emailId, forKey: "emailId")
        dictionary.setValue(self.imagePath, forKey: "imagePath")
        dictionary.setValue(self.securityKey, forKey: "securityKey")
        dictionary.setValue(self.mobile, forKey: "mobile")
        dictionary.setValue(self.failedLoginAttemptCount, forKey: "failedLoginAttemptCount")
        dictionary.setValue(self.id, forKey: "id")
        dictionary.setValue(self.stringId, forKey: "stringId")
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
        dictionary.setValue(self.genderID, forKey: "genderID")
        dictionary.setValue(self.genderName, forKey: "genderName")
        dictionary.setValue(self.dateOfBirth, forKey: "dateOfBirth")
        dictionary.setValue(self.profession, forKey: "profession")
		return dictionary as! Dictionary<String,Any>
	}

}
