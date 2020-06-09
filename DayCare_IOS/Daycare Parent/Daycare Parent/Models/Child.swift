
import Foundation


public class Child:NSObject {
  public var updatedFlag = 1
	public var studentId : Int?
	public var studentName : String?
	public var classId : Int?
	public var className : String?
	public var agencyID : Int?
	public var parentID : Int?
	public var parentName : String?
	public var parentEmailAddress : String?
	public var parentContactNumber : Int?
	public var firstName : String?
	public var lastName : String?
	public var genderID : Int?
	public var genderName : String?
	public var imagePath : String?
	public var address : String?
	public var countryId : Int?
	public var countryName : String?
	public var stateId : Int?
	public var stateName : String?
	public var cityId : Int?
	public var cityName : String?
	public var postalCode : String?
	public var schoolName : String?
	public var transportationID : Int?
	public var transportationTypeName : String?
	public var dateOfBirth : String?
	public var feePaymentTypeID : Int?
	public var feePaymentTypeName : String?
	public var insuranceCarrier : String?
	public var insurancePolicyNumber : String?
	public var registeredDate : String?
	public var childsAddress : String?
    public var childStartDate : Date?
    public var childStartDateString : String?
	public var physicianName : String?
    public var physicianAddress : String?
	public var preferredHospital : String?
	public var childsContactNumber : Int?
    public var physicianContactNumber : Int?
	public var guardians : String?
	public var studentImmunizations : String?
	public var studentAllergies : String?
	public var studentMedications : String?
	public var studentDisabilities : String?
    public var enrolledClassesInformation : Array<EnrolledClassesInformation>?
    public var paymentCalculations : Array<PaymentCalculations>?
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
    public var dateOfBirthh: Date?
    public var childNote : String?

    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Child]
    {
        var models:[Child] = []
        for item in array
        {
            models.append(Child(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {
    updatedFlag = dictionary["updatedFlag"] as? Int ?? 1
		studentId = dictionary["studentId"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		classId = dictionary["classId"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		parentID = dictionary["parentID"] as? Int ?? 0
		parentName = dictionary["parentName"] as? String ?? ""
        parentName = dictionary["parentName"] as? String ?? ""
		parentEmailAddress = dictionary["parentEmailAddress"] as? String ?? ""
		parentContactNumber = dictionary["parentContactNumber"] as? Int ?? 0
		firstName = dictionary["firstName"] as? String ?? ""
		lastName = dictionary["lastName"] as? String ?? ""
		genderID = dictionary["genderID"] as? Int ?? 0
		genderName = dictionary["genderName"] as? String ?? ""
		imagePath = dictionary["imagePath"] as? String ?? ""
		address = dictionary["address"] as? String ?? ""
		countryId = dictionary["countryId"] as? Int ?? 0
		countryName = dictionary["countryName"] as? String ?? ""
		stateId = dictionary["stateId"] as? Int ?? 0
		stateName = dictionary["stateName"] as? String ?? ""
		cityId = dictionary["cityId"] as? Int ?? 0
		cityName = dictionary["cityName"] as? String ?? ""
		postalCode = dictionary["postalCode"] as? String ?? ""
		schoolName = dictionary["schoolName"] as? String ?? ""
		transportationID = dictionary["transportationID"] as? Int ?? 0
		transportationTypeName = dictionary["transportationTypeName"] as? String ?? ""
		dateOfBirth = dictionary["dateOfBirth"] as? String ?? ""
		feePaymentTypeID = dictionary["feePaymentTypeID"] as? Int ?? 0
		feePaymentTypeName = dictionary["feePaymentTypeName"] as? String ?? ""
		insuranceCarrier = dictionary["insuranceCarrier"] as? String ?? ""
		insurancePolicyNumber = dictionary["insurancePolicyNumber"] as? String ?? ""
		registeredDate = dictionary["registeredDate"] as? String ?? ""
		childsAddress = dictionary["childsAddress"] as? String ?? ""
        childStartDateString = dictionary["childStartDate"] as? String ?? ""
		physicianName = dictionary["physicianName"] as? String ?? ""
        physicianAddress = dictionary["physicianAddress"] as? String ?? ""
		preferredHospital = dictionary["preferredHospital"] as? String ?? ""
		childsContactNumber = dictionary["childsContactNumber"] as? Int ?? 0
        physicianContactNumber = dictionary["physicianContactNumber"] as? Int ?? 0
		guardians = dictionary["guardians"] as? String ?? ""
		studentImmunizations = dictionary["studentImmunizations"] as? String ?? ""
		studentAllergies = dictionary["studentAllergies"] as? String ?? ""
		studentMedications = dictionary["studentMedications"] as? String ?? ""
		studentDisabilities = dictionary["studentDisabilities"] as? String ?? ""
         if (dictionary["enrolledClassesInformation"] != nil) { enrolledClassesInformation = EnrolledClassesInformation.modelsFromDictionaryArray(array: (dictionary["enrolledClassesInformation"] as? Array<Dictionary<String, Any>> ?? [])) }
        if (dictionary["paymentCalculations"] != nil) { paymentCalculations = PaymentCalculations.modelsFromDictionaryArray(array: (dictionary["paymentCalculations"] as? Array<Dictionary<String, Any>> ?? [])) }
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
        childNote = dictionary["childNotes"] as? String ?? ""

	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()
    dictionary.setValue(self.updatedFlag, forKey: "updatedFlag")
		dictionary.setValue(self.studentId, forKey: "studentId")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.classId, forKey: "classId")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.parentID, forKey: "parentID")
		dictionary.setValue(self.parentName, forKey: "parentName")
		dictionary.setValue(self.parentEmailAddress, forKey: "parentEmailAddress")
		dictionary.setValue(self.parentContactNumber, forKey: "parentContactNumber")
		dictionary.setValue(self.firstName, forKey: "firstName")
		dictionary.setValue(self.lastName, forKey: "lastName")
		dictionary.setValue(self.genderID, forKey: "genderID")
		dictionary.setValue(self.genderName, forKey: "genderName")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.address, forKey: "address")
		dictionary.setValue(self.countryId, forKey: "countryId")
		dictionary.setValue(self.countryName, forKey: "countryName")
		dictionary.setValue(self.stateId, forKey: "stateId")
		dictionary.setValue(self.stateName, forKey: "stateName")
		dictionary.setValue(self.cityId, forKey: "cityId")
		dictionary.setValue(self.cityName, forKey: "cityName")
		dictionary.setValue(self.postalCode, forKey: "postalCode")
		dictionary.setValue(self.schoolName, forKey: "schoolName")
		dictionary.setValue(self.transportationID, forKey: "transportationID")
		dictionary.setValue(self.transportationTypeName, forKey: "transportationTypeName")
		dictionary.setValue(self.dateOfBirth, forKey: "dateOfBirth")
		dictionary.setValue(self.feePaymentTypeID, forKey: "feePaymentTypeID")
		dictionary.setValue(self.feePaymentTypeName, forKey: "feePaymentTypeName")
		dictionary.setValue(self.insuranceCarrier, forKey: "insuranceCarrier")
		dictionary.setValue(self.insurancePolicyNumber, forKey: "insurancePolicyNumber")
		dictionary.setValue(self.registeredDate, forKey: "registeredDate")
		dictionary.setValue(self.childsAddress, forKey: "childsAddress")
        dictionary.setValue(self.childStartDateString, forKey: "childStartDate")
		dictionary.setValue(self.physicianName, forKey: "physicianName")
        dictionary.setValue(self.physicianAddress, forKey: "physicianAddress")
		dictionary.setValue(self.preferredHospital, forKey: "preferredHospital")
		dictionary.setValue(self.childsContactNumber, forKey: "childsContactNumber")
        dictionary.setValue(self.physicianContactNumber, forKey: "physicianContactNumber")
		dictionary.setValue(self.guardians, forKey: "guardians")
		dictionary.setValue(self.studentImmunizations, forKey: "studentImmunizations")
		dictionary.setValue(self.studentAllergies, forKey: "studentAllergies")
		dictionary.setValue(self.studentMedications, forKey: "studentMedications")
		dictionary.setValue(self.studentDisabilities, forKey: "studentDisabilities")
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
        dictionary.setValue(self.childNote, forKey: "childNotes")
		return dictionary as! Dictionary<String,Any>
	}

}
