
import Foundation


public class ActivityMeals: NSObject {
    
    public var mealTypeName : String?
    public var id : Int?
    public var agencyID : Int?
    public var studentID : Int?
    public var studentActivitiesID : Int?
    public var mealTypeID : Int?
    public var mealComment : String?
    public var otherThanPlanMeal : String?
    public var otherThanPlanMealComment : String?
    public var stringId : Int?
    public var activityTypeID : Int?
    public var mealPlannerID : Int?
    public var mealPlanTitle : String?
    public var studentActivityMealFoodItems : Array<StudentActivityMealFoodItems>?
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
    
    override public init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [ActivityMeals]
    {
        var models:[ActivityMeals] = []
        for item in array
        {
            models.append(ActivityMeals(dictionary: item)!)
        }
        return models
    }
    
    
    required public init?(dictionary: Dictionary<String,Any>) {
        
        mealTypeName = dictionary["mealTypeName"] as? String ?? ""
        id = dictionary["id"] as? Int ?? 0
        agencyID = dictionary["agencyID"] as? Int ?? 0
        studentID = dictionary["studentID"] as? Int ?? 0
        studentActivitiesID = dictionary["studentActivitiesID"] as? Int ?? 0
        mealTypeID = dictionary["mealTypeID"] as? Int ?? 0
        mealComment = dictionary["mealComment"] as? String ?? ""
        otherThanPlanMeal = dictionary["otherThanPlanMeal"] as? String ?? ""
        otherThanPlanMealComment = dictionary["otherThanPlanMealComment"] as? String ?? ""
        stringId = dictionary["stringId"] as? Int ?? 0
        activityTypeID = dictionary["activityTypeID"] as? Int ?? 0
        mealPlannerID = dictionary["mealPlannerID"] as? Int ?? 0
        mealPlanTitle = dictionary["mealPlanTitle"] as? String ?? ""
        if (dictionary["studentActivityMealFoodItems"] != nil) { studentActivityMealFoodItems = StudentActivityMealFoodItems.modelsFromDictionaryArray(array: dictionary["studentActivityMealFoodItems"] as? Array<Dictionary<String,Any>> ?? []) }
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
        
        dictionary.setValue(self.mealTypeName, forKey: "mealTypeName")
        dictionary.setValue(self.id, forKey: "id")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.studentID, forKey: "studentID")
        dictionary.setValue(self.studentActivitiesID, forKey: "studentActivitiesID")
        dictionary.setValue(self.mealTypeID, forKey: "mealTypeID")
        dictionary.setValue(self.mealComment, forKey: "mealComment")
        dictionary.setValue(self.otherThanPlanMeal, forKey: "otherThanPlanMeal")
        dictionary.setValue(self.otherThanPlanMealComment, forKey: "otherThanPlanMealComment")
        dictionary.setValue(self.stringId, forKey: "stringId")
        dictionary.setValue(self.activityTypeID, forKey: "activityTypeID")
        dictionary.setValue(self.mealPlannerID, forKey: "mealPlannerID")
        dictionary.setValue(self.mealPlanTitle, forKey: "mealPlanTitle")
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
