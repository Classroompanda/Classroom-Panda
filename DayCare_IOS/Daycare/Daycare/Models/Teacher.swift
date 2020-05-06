
import Foundation
 

public class Teacher: NSObject {
	public var id : Int?
	public var teacherName : String?
	public var agencyID : Int?
	public var userID : Int?
	public var firstName : String?
	public var lastName : String?
	public var genderID : Int?
	public var dateOfBirth : String?
	public var imagePath : String?
	public var positionTypeID : Int?
	public var teacherStatusID : Int?
	public var dateHired : String?
	public var email : String?
	public var address : String?
	public var countryId : Int?
	public var stateId : Int?
	public var cityId : Int?
	public var certification : String?
	public var postalCode : String?
    public var homePhone : Int?
	public var mHomePhone : String?
    public var mPhoneNumber : String?
	public var phoneNumber : Int?
	public var grossPayPerHour : Int?
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
    public var countryName : String?
    public var stateName : String?
    public var cityName : String?
    public var dateofBirth : Date?
    public var dateofHired : Date?
    required public override init() {
        super.init()  
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Teacher]
    {
        var models:[Teacher] = []
        for item in array
        {
            models.append(Teacher(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		teacherName = dictionary["teacherName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		userID = dictionary["userID"] as? Int ?? 0
		firstName = dictionary["firstName"] as? String ?? ""
		lastName = dictionary["lastName"] as? String ?? ""
		genderID = dictionary["genderID"] as? Int ?? 0
		dateOfBirth = dictionary["dateOfBirth"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
		positionTypeID = dictionary["positionTypeID"] as? Int ?? 0
		teacherStatusID = dictionary["teacherStatusID"] as? Int ?? 0
		dateHired = dictionary["dateHired"] as? String ?? ""
		email = dictionary["email"] as? String ?? ""
		address = dictionary["address"] as? String ?? ""
		countryId = dictionary["countryId"] as? Int ?? 0
		stateId = dictionary["stateId"] as? Int ?? 0
		cityId = dictionary["cityId"] as? Int ?? 0
		certification = dictionary["certification"] as? String ?? ""
		postalCode = dictionary["postalCode"] as? String ?? ""
        homePhone = dictionary["homePhone"] as? Int ?? 0
		phoneNumber = dictionary["phoneNumber"] as? Int ?? 0
		mHomePhone = dictionary["mHomePhone"] as? String ?? ""
        mPhoneNumber = dictionary["mPhoneNumber"] as? String ?? ""
		grossPayPerHour = dictionary["grossPayPerHour"] as? Int ?? 0
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
		dictionary.setValue(self.teacherName, forKey: "teacherName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.userID, forKey: "userID")
		dictionary.setValue(self.firstName, forKey: "firstName")
		dictionary.setValue(self.lastName, forKey: "lastName")
		dictionary.setValue(self.genderID, forKey: "genderID")
		dictionary.setValue(self.dateOfBirth, forKey: "dateOfBirth")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.positionTypeID, forKey: "positionTypeID")
		dictionary.setValue(self.teacherStatusID, forKey: "teacherStatusID")
		dictionary.setValue(self.dateHired, forKey: "dateHired")
		dictionary.setValue(self.email, forKey: "email")
		dictionary.setValue(self.address, forKey: "address")
		dictionary.setValue(self.countryId, forKey: "countryId")
		dictionary.setValue(self.stateId, forKey: "stateId")
		dictionary.setValue(self.cityId, forKey: "cityId")
		dictionary.setValue(self.certification, forKey: "certification")
		dictionary.setValue(self.postalCode, forKey: "postalCode")
        dictionary.setValue(self.homePhone, forKey: "homePhone")
		dictionary.setValue(self.phoneNumber, forKey: "phoneNumber")
		dictionary.setValue(self.mHomePhone, forKey: "mHomePhone")
        dictionary.setValue(self.mPhoneNumber, forKey: "mPhoneNumber")
		dictionary.setValue(self.grossPayPerHour, forKey: "grossPayPerHour")
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
