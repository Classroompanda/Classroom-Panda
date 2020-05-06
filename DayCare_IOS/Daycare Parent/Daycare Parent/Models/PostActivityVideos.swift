
import Foundation

public class PostActivityVideos {
	public var alreadyliked : Bool?
	public var isAlreadyPostComment : Bool?
	public var id : Int?
	public var postActivitiesID : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var classesID : Int?
	public var vedioServerPath : String?
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


    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PostActivityVideos]
    {
        var models:[PostActivityVideos] = []
        for item in array
        {
            models.append(PostActivityVideos(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		alreadyliked = dictionary["alreadyliked"] as? Bool ?? false
		isAlreadyPostComment = dictionary["isAlreadyPostComment"] as? Bool ?? false
		id = dictionary["id"] as? Int ?? 0
		postActivitiesID = dictionary["postActivitiesID"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		vedioServerPath = dictionary["vedioServerPath"] as? String ?? ""
		likeCount = dictionary["likeCount"] as? Int ?? 0
		loveCount = dictionary["loveCount"] as? Int ?? 0
		thumbsUpCount = dictionary["thumbsUpCount"] as? Int ?? 0
		thumbsDownCount = dictionary["thumbsDownCount"] as? Int ?? 0
		comment = dictionary["comment"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
		stringId = dictionary["stringId"] as? String ?? ""
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
		dictionary.setValue(self.vedioServerPath, forKey: "vedioServerPath")
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
