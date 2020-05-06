

import Foundation
 


public class Meal {
	public var id : Int?
	public var agencyID : Int?
	public var foodTypeID : Int?
	public var mealTypeID : Int?
	public var amount : Int?
	public var quantity : Int?
	public var plannerRepeatTypeID : Int?
	public var title : String?
	public var start : String?
	public var end : String?
	public var endsOn : String?
	public var description : String?
	public var mon : Bool?
	public var tue : Bool?
	public var wed : Bool?
	public var thu : Bool?
	public var fri : Bool?
	public var sat : Bool?
	public var sun : Bool?
	public var involvedClass : Array<InvolvedClass>?
	public var involvedMealFoodItems : Array<InvolvedMealFoodItems>?
	public var selectedWeekDay : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?
	public var stringId : Int?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : Int?
	public var deletedDate : String?
	public var createdBy : Int?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : Int?
    public var startTime : String?
    public var endTime : String?
   
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Meal]
    {
        var models:[Meal] = []
        for item in array
        {
            models.append(Meal(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		foodTypeID = dictionary["foodTypeID"] as? Int ?? 0
		mealTypeID = dictionary["mealTypeID"] as? Int ?? 0
		amount = dictionary["amount"] as? Int ?? 0
		quantity = dictionary["quantity"] as? Int ?? 0
		plannerRepeatTypeID = dictionary["plannerRepeatTypeID"] as? Int ?? 0
		title = dictionary["title"] as? String ?? ""
		start = dictionary["start"] as? String ?? ""
		end = dictionary["end"] as? String ?? ""
		endsOn = dictionary["endsOn"] as? String ?? ""
		description = dictionary["description"] as? String ?? ""
		mon = dictionary["mon"] as? Bool ?? false
		tue = dictionary["tue"] as? Bool ?? false
		wed = dictionary["wed"] as? Bool ?? false
		thu = dictionary["thu"] as? Bool ?? false
		fri = dictionary["fri"] as? Bool ?? false
		sat = dictionary["sat"] as? Bool ?? false
		sun = dictionary["sun"] as? Bool ?? false
        if (dictionary["involvedClass"] != nil) { involvedClass = InvolvedClass.modelsFromDictionaryArray(array: dictionary["involvedClass"] as? Array<Dictionary<String,Any>> ?? []) }
        if (dictionary["involvedMealFoodItems"] != nil) { involvedMealFoodItems = InvolvedMealFoodItems.modelsFromDictionaryArray(array: dictionary["involvedMealFoodItems"] as? Array<Dictionary<String,Any>> ?? []) }
		selectedWeekDay = dictionary["selectedWeekDay"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? Int ?? 0
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? Int ?? 0
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? Int ?? 0
        startTime = dictionary["startTime"] as? String ?? ""
        endTime = dictionary["endTime"] as? String ?? ""
	}


	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.foodTypeID, forKey: "foodTypeID")
		dictionary.setValue(self.mealTypeID, forKey: "mealTypeID")
		dictionary.setValue(self.amount, forKey: "amount")
		dictionary.setValue(self.quantity, forKey: "quantity")
		dictionary.setValue(self.plannerRepeatTypeID, forKey: "plannerRepeatTypeID")
		dictionary.setValue(self.title, forKey: "title")
		dictionary.setValue(self.start, forKey: "start")
		dictionary.setValue(self.end, forKey: "end")
		dictionary.setValue(self.endsOn, forKey: "endsOn")
		dictionary.setValue(self.description, forKey: "description")
		dictionary.setValue(self.mon, forKey: "mon")
		dictionary.setValue(self.tue, forKey: "tue")
		dictionary.setValue(self.wed, forKey: "wed")
		dictionary.setValue(self.thu, forKey: "thu")
		dictionary.setValue(self.fri, forKey: "fri")
		dictionary.setValue(self.sat, forKey: "sat")
		dictionary.setValue(self.sun, forKey: "sun")
		dictionary.setValue(self.selectedWeekDay, forKey: "selectedWeekDay")
		dictionary.setValue(self.deletedFromIP, forKey: "deletedFromIP")
		dictionary.setValue(self.createdFromIP, forKey: "createdFromIP")
		dictionary.setValue(self.updatedFromIP, forKey: "updatedFromIP")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.isActive, forKey: "isActive")
		dictionary.setValue(self.isDeleted, forKey: "isDeleted")
		dictionary.setValue(self.deletedBy, forKey: "deletedBy")
		dictionary.setValue(self.deletedDate, forKey: "deletedDate")
		dictionary.setValue(self.createdBy, forKey: "createdBy")
		dictionary.setValue(self.createdDate, forKey: "createdDate")
		dictionary.setValue(self.updatedDate, forKey: "updatedDate")
		dictionary.setValue(self.updatedBy, forKey: "updatedBy")
        dictionary.setValue(self.startTime, forKey: "startTime")
        dictionary.setValue(self.endTime, forKey: "endTime")

		return dictionary as! Dictionary<String,Any>
	}

}
