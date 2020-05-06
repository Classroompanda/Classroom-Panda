

import Foundation
 


public class ActivityMealFoodItems: NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var studentID : Int?
	public var studentActivityMealID : Int?
	public var foodTypeID : Int?
	public var foodTypeName : String?
	public var consumedAmount : Int?
	public var consumedQuantity : Int?
	public var consumedMeasureUnitTypeID : Int?
	public var consumedMeasureQuantityTypeID : Int?
	public var amount : Int?
	public var quantity : Int?
	public var quantityName : String?
	public var measureUnitTypeID : Int?
	public var measureUnitTypeName : String?
	public var measureQuantityTypeID : Int?
	public var measureQuantityTypeName : String?
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

    required public override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [ActivityMealFoodItems]
    {
        var models:[ActivityMealFoodItems] = []
        for item in array
        {
            models.append(ActivityMealFoodItems(dictionary: item)!)
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
		consumedAmount = dictionary["consumedAmount"] as? Int ?? 0
		consumedQuantity = dictionary["consumedQuantity"] as? Int ?? 0
		consumedMeasureUnitTypeID = dictionary["consumedMeasureUnitTypeID"] as? Int ?? 0
		consumedMeasureQuantityTypeID = dictionary["consumedMeasureQuantityTypeID"] as? Int ?? 0
		amount = dictionary["amount"] as? Int ?? 0
		quantity = dictionary["quantity"] as? Int ?? 0
		quantityName = dictionary["quantityName"] as? String ?? ""
		measureUnitTypeID = dictionary["measureUnitTypeID"] as? Int ?? 0
		measureUnitTypeName = dictionary["measureUnitTypeName"] as? String ?? ""
		measureQuantityTypeID = dictionary["measureQuantityTypeID"] as? Int ?? 0
		measureQuantityTypeName = dictionary["measureQuantityTypeName"] as? String ?? ""
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
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.studentActivityMealID, forKey: "studentActivityMealID")
		dictionary.setValue(self.foodTypeID, forKey: "foodTypeID")
		dictionary.setValue(self.foodTypeName, forKey: "foodTypeName")
		dictionary.setValue(self.consumedAmount, forKey: "consumedAmount")
		dictionary.setValue(self.consumedQuantity, forKey: "consumedQuantity")
		dictionary.setValue(self.consumedMeasureUnitTypeID, forKey: "consumedMeasureUnitTypeID")
		dictionary.setValue(self.consumedMeasureQuantityTypeID, forKey: "consumedMeasureQuantityTypeID")
		dictionary.setValue(self.amount, forKey: "amount")
		dictionary.setValue(self.quantity, forKey: "quantity")
		dictionary.setValue(self.quantityName, forKey: "quantityName")
		dictionary.setValue(self.measureUnitTypeID, forKey: "measureUnitTypeID")
		dictionary.setValue(self.measureUnitTypeName, forKey: "measureUnitTypeName")
		dictionary.setValue(self.measureQuantityTypeID, forKey: "measureQuantityTypeID")
		dictionary.setValue(self.measureQuantityTypeName, forKey: "measureQuantityTypeName")
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

		return dictionary as! Dictionary<String,Any>
	}

}
