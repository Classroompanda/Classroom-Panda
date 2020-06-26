
import Foundation

public class PostActivityImages {
	public var alreadyliked : Bool?
	public var isAlreadyPostComment : Bool?
	public var id : Int?
	public var postActivitiesID : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var classesID : Int?
	public var imageServerPath : String?
	public var likeCount : Int?
	public var loveCount : Int?
	public var thumbsUpCount : Int?
	public var thumbsDownCount : Int?
	public var comment : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var deletedFromIP : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var createdFromIP : String?
	public var updatedDate : String?
	public var updatedFromIP : String?
	public var updatedBy : Int?
	public var stringId : String?


    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PostActivityImages]
    {
        var models:[PostActivityImages] = []
        for item in array
        {
            models.append(PostActivityImages(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		alreadyliked = dictionary["alreadyliked"] as? Bool
		isAlreadyPostComment = dictionary["isAlreadyPostComment"] as? Bool
		id = dictionary["id"] as? Int
		postActivitiesID = dictionary["postActivitiesID"] as? Int
		agencyID = dictionary["agencyID"] as? Int
		studentID = dictionary["studentID"] as? Int
		classesID = dictionary["classesID"] as? Int
		imageServerPath = dictionary["imageServerPath"] as? String
        imageServerPath = imageServerPath?.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
		likeCount = dictionary["likeCount"] as? Int
		loveCount = dictionary["loveCount"] as? Int
		thumbsUpCount = dictionary["thumbsUpCount"] as? Int
		thumbsDownCount = dictionary["thumbsDownCount"] as? Int
		comment = dictionary["comment"] as? String
		isActive = dictionary["isActive"] as? Bool
		isDeleted = dictionary["isDeleted"] as? Bool
		deletedBy = dictionary["deletedBy"] as? Int
		deletedDate = dictionary["deletedDate"] as? String
		deletedFromIP = dictionary["deletedFromIP"] as? String
		createdBy = dictionary["createdBy"] as? Int
		createdDate = dictionary["createdDate"] as? String
		createdFromIP = dictionary["createdFromIP"] as? String
		updatedDate = dictionary["updatedDate"] as? String
		updatedFromIP = dictionary["updatedFromIP"] as? String
		updatedBy = dictionary["updatedBy"] as? Int
		stringId = dictionary["stringId"] as? String
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.alreadyliked, forKey: "alreadyliked")
		dictionary.setValue(self.isAlreadyPostComment, forKey: "isAlreadyPostComment")
		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.postActivitiesID, forKey: "postActivitiesID")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.imageServerPath, forKey: "imageServerPath")
		dictionary.setValue(self.likeCount, forKey: "likeCount")
		dictionary.setValue(self.loveCount, forKey: "loveCount")
		dictionary.setValue(self.thumbsUpCount, forKey: "thumbsUpCount")
		dictionary.setValue(self.thumbsDownCount, forKey: "thumbsDownCount")
		dictionary.setValue(self.comment, forKey: "comment")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
		dictionary.setValue(self.stringId, forKey: "stringId")

		return dictionary as! Dictionary<String,Any>
	}

}
