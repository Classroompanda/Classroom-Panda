

import Foundation

public class PaymentCalculations {
	public var totalHoursAttended : Int?
	public var feeToBePaid : Int?
	public var totalFees : Int?
	public var balanceFees : Int?

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PaymentCalculations]
    {
        var models:[PaymentCalculations] = []
        for item in array
        {
            models.append(PaymentCalculations(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		totalHoursAttended = dictionary["totalHoursAttended"] as? Int ?? 0
		feeToBePaid = dictionary["feeToBePaid"] as? Int ?? 0
		totalFees = dictionary["totalFees"] as? Int ?? 0
		balanceFees = dictionary["balanceFees"] as? Int ?? 0
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.totalHoursAttended, forKey: "totalHoursAttended")
		dictionary.setValue(self.feeToBePaid, forKey: "feeToBePaid")
		dictionary.setValue(self.totalFees, forKey: "totalFees")
		dictionary.setValue(self.balanceFees, forKey: "balanceFees")

		return dictionary as! Dictionary<String,Any>
	}

}
