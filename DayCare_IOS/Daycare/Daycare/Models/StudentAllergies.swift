
import Foundation

public class StudentAllergies {
	public var studentAllergiesID : Int?
	public var studentID : Int?
	public var allergyReactionTypeID : Int?
	public var allergyReactionTypeName : String?
	public var allergyNameID : Int?
	public var allergyName : String?
	public var agencyID : Int?
	public var allergyComment : String?
	public var firstAllergyObservation : String?
	public var lastAllergyObservation : String?
	public var allergyTypeID : Int?
	public var allergyTypeName : String?
	public var treatment : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var studentName : String?

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [StudentAllergies]
    {
        var models:[StudentAllergies] = []
        for item in array
        {
            models.append(StudentAllergies(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		studentAllergiesID = dictionary["studentAllergiesID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		allergyReactionTypeID = dictionary["allergyReactionTypeID"] as? Int ?? 0
		allergyReactionTypeName = dictionary["allergyReactionTypeName"] as? String ?? ""
		allergyNameID = dictionary["allergyNameID"] as? Int ?? 0
		allergyName = dictionary["allergyName"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		allergyComment = dictionary["allergyComment"] as? String ?? ""
		firstAllergyObservation = dictionary["firstAllergyObservation"] as? String ?? ""
		lastAllergyObservation = dictionary["lastAllergyObservation"] as? String ?? ""
		allergyTypeID = dictionary["allergyTypeID"] as? Int ?? 0
		allergyTypeName = dictionary["allergyTypeName"] as? String ?? ""
		treatment = dictionary["treatment"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
        studentName = dictionary["studentName"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
	}

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.studentAllergiesID, forKey: "studentAllergiesID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.allergyReactionTypeID, forKey: "allergyReactionTypeID")
		dictionary.setValue(self.allergyReactionTypeName, forKey: "allergyReactionTypeName")
		dictionary.setValue(self.allergyNameID, forKey: "allergyNameID")
		dictionary.setValue(self.allergyName, forKey: "allergyName")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.allergyComment, forKey: "allergyComment")
		dictionary.setValue(self.firstAllergyObservation, forKey: "firstAllergyObservation")
		dictionary.setValue(self.lastAllergyObservation, forKey: "lastAllergyObservation")
		dictionary.setValue(self.allergyTypeID, forKey: "allergyTypeID")
		dictionary.setValue(self.allergyTypeName, forKey: "allergyTypeName")
		dictionary.setValue(self.treatment, forKey: "treatment")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.updatedBy, forKey: "studentName")
		return dictionary as! Dictionary<String,Any>
	}

}
