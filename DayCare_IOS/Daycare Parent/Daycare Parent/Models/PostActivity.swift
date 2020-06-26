

import Foundation


public class PostActivity: NSObject {
	public var studentName : String?
	public var postActivityImages : Array<PostActivityImages>?
	public var postActivityVideos : Array<PostActivityVideos>?
	public var totalLikes : Int?
	public var commentCount : Int?
	public var id : Int?
	public var imagePath : String?
	public var teacherID : Int?
	public var sender : String?
	public var postTitle : String?
	public var postDescription : String?
	public var agencyID : Int?
	public var studentID : Int?
	public var classesID : Int?
	public var className : String?
	public var postedDate : String?
	public var isPublic : Bool?
//    public var selectedStudents : Array<Int>?
	public var postLikeCount : Int?
	public var isPostALreadyLiked : Bool?
	public var postComment : String?
	public var isAlreadyPostComment : Bool?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?

    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PostActivity]
    {
        var models:[PostActivity] = []
        for item in array
        {
            models.append(PostActivity(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		studentName = dictionary["studentName"] as? String ?? ""
        if (dictionary["postActivityImages"] != nil) { postActivityImages = PostActivityImages.modelsFromDictionaryArray(array: dictionary["postActivityImages"] as? Array<Dictionary<String,Any>> ?? []) }
        if (dictionary["postActivityVideos"] != nil) { postActivityVideos = PostActivityVideos.modelsFromDictionaryArray(array: dictionary["postActivityVideos"] as? Array<Dictionary<String,Any>> ?? []) }
		totalLikes = dictionary["totalLikes"] as? Int ?? 0
		commentCount = dictionary["commentCount"] as? Int ?? 0
		id = dictionary["id"] as? Int ?? 0
		imagePath = dictionary["imagePath"] as? String ?? ""
        imagePath = imagePath?.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
		teacherID = dictionary["teacherID"] as? Int ?? 0
		sender = dictionary["sender"] as? String ?? ""
		postTitle = dictionary["postTitle"] as? String ?? ""
		postDescription = dictionary["postDescription"] as? String ?? ""
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		classesID = dictionary["classesID"] as? Int ?? 0
		className = dictionary["className"] as? String ?? ""
		postedDate = dictionary["postedDate"] as? String ?? ""
		isPublic = dictionary["isPublic"] as? Bool ?? false
//        if (dictionary["selectedStudents"] != nil) { selectedStudents = SelectedStudents.modelsFromDictionaryArray(dictionary["selectedStudents"] as! NSArray) }
		postLikeCount = dictionary["postLikeCount"] as? Int ?? 0
		isPostALreadyLiked = dictionary["isPostALreadyLiked"] as? Bool ?? false
		postComment = dictionary["postComment"] as? String ?? ""
		isAlreadyPostComment = dictionary["isAlreadyPostComment"] as? Bool ?? false
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.totalLikes, forKey: "totalLikes")
		dictionary.setValue(self.commentCount, forKey: "commentCount")
		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.imagePath, forKey: "imagePath")
		dictionary.setValue(self.teacherID, forKey: "teacherID")
		dictionary.setValue(self.sender, forKey: "sender")
		dictionary.setValue(self.postTitle, forKey: "postTitle")
		dictionary.setValue(self.postDescription, forKey: "postDescription")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.classesID, forKey: "classesID")
		dictionary.setValue(self.className, forKey: "className")
		dictionary.setValue(self.postedDate, forKey: "postedDate")
		dictionary.setValue(self.isPublic, forKey: "isPublic")
		dictionary.setValue(self.postLikeCount, forKey: "postLikeCount")
		dictionary.setValue(self.isPostALreadyLiked, forKey: "isPostALreadyLiked")
		dictionary.setValue(self.postComment, forKey: "postComment")
		dictionary.setValue(self.isAlreadyPostComment, forKey: "isAlreadyPostComment")
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
