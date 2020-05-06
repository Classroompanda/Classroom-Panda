

import Foundation

public class StudentActivityMealFoodItems {
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var studentActivityMealID : Int?
	public var foodTypeID : Int?
	public var foodTypeName : String?
	public var amount : Int?
	public var quantity : Int?
	public var quantityName : String?
	public var measureUnitTypeID : Int?
	public var measureUnitTypeName : String?
	public var measureQuantityTypeID : Int?
	public var measureQuantityTypeName : String?
	public var foodConsumtionID : Int?
	public var foodConsumtionName : String?
	public var stringId : Int?
	public var milkConsumptionQuantity : String?
	public var isActive : Bool?
	public var isDeleted : Bool?
	public var deletedBy : String?
	public var deletedDate : String?
	public var createdBy : String?
	public var createdDate : String?
	public var updatedDate : String?
	public var updatedBy : String?
	public var deletedFromIP : String?
	public var createdFromIP : String?
	public var updatedFromIP : String?


    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [StudentActivityMealFoodItems]
    {
        var models:[StudentActivityMealFoodItems] = []
        for item in array
        {
            models.append(StudentActivityMealFoodItems(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		studentActivityMealID = dictionary["studentActivityMealID"] as? Int ?? 0
		foodTypeID = dictionary["foodTypeID"] as? Int ?? 0
		foodTypeName = dictionary["foodTypeName"] as? String ?? ""
		amount = dictionary["amount"] as? Int ?? 0
		quantity = dictionary["quantity"] as? Int ?? 0
		quantityName = dictionary["quantityName"] as? String ?? ""
		measureUnitTypeID = dictionary["measureUnitTypeID"] as? Int ?? 0
		measureUnitTypeName = dictionary["measureUnitTypeName"] as? String ?? ""
		measureQuantityTypeID = dictionary["measureQuantityTypeID"] as? Int ?? 0
		measureQuantityTypeName = dictionary["measureQuantityTypeName"] as? String ?? ""
		foodConsumtionID = dictionary["foodConsumtionID"] as? Int ?? 0
		foodConsumtionName = dictionary["foodConsumtionName"] as? String ?? ""
		stringId = dictionary["stringId"] as? Int ?? 0
		milkConsumptionQuantity = dictionary["milkConsumptionQuantity"] as? String ?? ""
		isActive = dictionary["isActive"] as? Bool ?? false
		isDeleted = dictionary["isDeleted"] as? Bool ?? false
		deletedBy = dictionary["deletedBy"] as? String ?? ""
		deletedDate = dictionary["deletedDate"] as? String ?? ""
		createdBy = dictionary["createdBy"] as? String ?? ""
		createdDate = dictionary["createdDate"] as? String ?? ""
		updatedDate = dictionary["updatedDate"] as? String ?? ""
		updatedBy = dictionary["updatedBy"] as? String ?? ""
		deletedFromIP = dictionary["deletedFromIP"] as? String ?? ""
		createdFromIP = dictionary["createdFromIP"] as? String ?? ""
		updatedFromIP = dictionary["updatedFromIP"] as? String ?? ""
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentActivityMealID, forKey: "studentActivityMealID")
		dictionary.setValue(self.foodTypeID, forKey: "foodTypeID")
		dictionary.setValue(self.foodTypeName, forKey: "foodTypeName")
		dictionary.setValue(self.amount, forKey: "amount")
		dictionary.setValue(self.quantity, forKey: "quantity")
		dictionary.setValue(self.quantityName, forKey: "quantityName")
		dictionary.setValue(self.measureUnitTypeID, forKey: "measureUnitTypeID")
		dictionary.setValue(self.measureUnitTypeName, forKey: "measureUnitTypeName")
		dictionary.setValue(self.measureQuantityTypeID, forKey: "measureQuantityTypeID")
		dictionary.setValue(self.measureQuantityTypeName, forKey: "measureQuantityTypeName")
		dictionary.setValue(self.foodConsumtionID, forKey: "foodConsumtionID")
		dictionary.setValue(self.foodConsumtionName, forKey: "foodConsumtionName")
		dictionary.setValue(self.stringId, forKey: "stringId")
		dictionary.setValue(self.milkConsumptionQuantity, forKey: "milkConsumptionQuantity")
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
