

import Foundation

public class PaymentSubmit: NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var parentID : Int?
	public var studentID : Int?
	public var stringID : Int?
	public var email : String?
	public var sourceToken : String?
	public var tokenID : String?
	public var stripeDetailsID : Int?
	public var studentName : String?
	public var parentName : String?
	public var paymentFromDate : String?
	public var paymentToDate : String?
	public var paymentDate : String?
	public var totalAmount : Double?
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
    public var invoiceDetailsID:Int?
    public var IsOffline : Bool?
    public required override init() {
        super.init()
    }
    
    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [PaymentSubmit]
    {
        var models:[PaymentSubmit] = []
        for item in array
        {
            models.append(PaymentSubmit(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		parentID = dictionary["parentID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		stringID = dictionary["stringID"] as? Int ?? 0
		email = dictionary["email"] as? String ?? ""
		sourceToken = dictionary["sourceToken"] as? String ?? ""
		tokenID = dictionary["tokenID"] as? String ?? ""
		stripeDetailsID = dictionary["stripeDetailsID"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		parentName = dictionary["parentName"] as? String ?? ""
		paymentFromDate = dictionary["paymentFromDate"] as? String
		paymentToDate = dictionary["paymentToDate"] as? String ?? ""
		paymentDate = dictionary["paymentDate"] as? String ?? ""
		totalAmount = dictionary["totalAmount"] as? Double ?? 0.0
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
        invoiceDetailsID = dictionary["invoiceDetailsID"] as? Int ?? 0
        IsOffline = dictionary["IsOffline"] as? Bool ?? false
	}

		

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.parentID, forKey: "parentID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.stringID, forKey: "stringID")
		dictionary.setValue(self.email, forKey: "email")
		dictionary.setValue(self.sourceToken, forKey: "sourceToken")
		dictionary.setValue(self.tokenID, forKey: "tokenID")
		dictionary.setValue(self.stripeDetailsID, forKey: "stripeDetailsID")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.parentName, forKey: "parentName")
		dictionary.setValue(self.paymentFromDate, forKey: "paymentFromDate")
		dictionary.setValue(self.paymentToDate, forKey: "paymentToDate")
		dictionary.setValue(self.paymentDate, forKey: "paymentDate")
		dictionary.setValue(self.totalAmount, forKey: "totalAmount")
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
        dictionary.setValue(self.invoiceDetailsID, forKey: "invoiceDetailsID")
        dictionary.setValue(self.IsOffline, forKey: "IsOffline")
		return dictionary as! Dictionary<String,Any>
	}
}
