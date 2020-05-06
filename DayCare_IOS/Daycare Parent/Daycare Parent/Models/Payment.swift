

import Foundation


public class Payment: NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var parentID : Int?
	public var studentID : Int?
	public var invoiceAmount : Double?
	public var totalAmount : Double?
	public var stringID : Int?
	public var email : String?
	public var sourceToken : String?
	public var tokenID : String?
	public var stripeDetailsID : Int?
	public var studentName : String?
	public var parentName : String?
	public var dueAmount : Int?
	public var invoiceFromDate : String?
	public var invoiceToDate : String?
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

    public var className : String?
    public var classId : String?
    public var classFees : String?
    
    // new keys added
    public var amount : Int?
    public var debitAmount : Int?
    public var studentNames : String?

    // new keys added for recurring payments
    public var nextPaymentDate : String?
    public var paymentDate : String?
    public var paymentFromDate : String?
    public var paymentToDate : String?
    public var firstPaymentDate : String?
    public var billingCycle : Int?
    public var isOnGoingRecurring : Bool?

    // ACH account verification payment
    public var amountOne : String?
    public var amountTwo : String?
    
    public required override init() {
          super.init()
      }
    
    public class func modelsFromDictionaryArray(array: Array<Dictionary<String,Any>>) -> [Payment]
    {
        var models:[Payment] = []
        for item in array
        {
            models.append(Payment(dictionary: item)!)
        }
        return models
    }

	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		parentID = dictionary["parentID"] as? Int ?? 0
		studentID = dictionary["studentID"] as? Int ?? 0
		invoiceAmount = dictionary["invoiceAmount"] as? Double ?? 0.0
		totalAmount = dictionary["totalAmount"] as? Double ?? 0.0
		stringID = dictionary["stringID"] as? Int ?? 0
		email = dictionary["email"] as? String ?? ""
		sourceToken = dictionary["sourceToken"] as? String ?? ""
		tokenID = dictionary["tokenID"] as? String ?? ""
		stripeDetailsID = dictionary["stripeDetailsID"] as? Int ?? 0
		studentName = dictionary["studentName"] as? String ?? ""
		parentName = dictionary["parentName"] as? String ?? ""
		dueAmount = dictionary["dueAmount"] as? Int ?? 0
		invoiceFromDate = dictionary["invoiceFromDate"] as? String ?? ""
		invoiceToDate = dictionary["invoiceToDate"] as? String ?? ""
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
        
        className = dictionary["className"] as? String ?? ""
        classId = dictionary["classId"] as? String ?? ""
        classFees = dictionary["classFees"] as? String ?? ""
        
        amount = dictionary["amount"] as? Int ?? 0
        debitAmount = dictionary["debitAmount"] as? Int ?? 0
        studentNames = dictionary["studentNames"] as? String ?? ""
        
        nextPaymentDate = dictionary["nextPaymentDate"] as? String ?? ""
        paymentDate = dictionary["paymentDate"] as? String ?? ""
        paymentFromDate = dictionary["paymentFromDate"] as? String ?? ""
        paymentToDate = dictionary["paymentToDate"] as? String ?? ""
        firstPaymentDate = dictionary["firstPaymentDate"] as? String ?? ""
        billingCycle = dictionary["billingCycle"] as? Int ?? 1
        amountOne = dictionary["amountFirst"] as? String ?? ""
        amountTwo = dictionary["amountSecond"] as? String ?? ""
	}

    

	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.parentID, forKey: "parentID")
		dictionary.setValue(self.studentID, forKey: "studentID")
		dictionary.setValue(self.invoiceAmount, forKey: "invoiceAmount")
		dictionary.setValue(self.totalAmount, forKey: "totalAmount")
		dictionary.setValue(self.stringID, forKey: "stringID")
		dictionary.setValue(self.email, forKey: "email")
		dictionary.setValue(self.sourceToken, forKey: "sourceToken")
		dictionary.setValue(self.tokenID, forKey: "tokenID")
		dictionary.setValue(self.stripeDetailsID, forKey: "stripeDetailsID")
		dictionary.setValue(self.studentName, forKey: "studentName")
		dictionary.setValue(self.parentName, forKey: "parentName")
		dictionary.setValue(self.dueAmount, forKey: "dueAmount")
		dictionary.setValue(self.invoiceFromDate, forKey: "invoiceFromDate")
		dictionary.setValue(self.invoiceToDate, forKey: "invoiceToDate")
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
        
        dictionary.setValue(self.className, forKey: "className")
        dictionary.setValue(self.classId, forKey: "classId")
        dictionary.setValue(self.classFees, forKey: "classFees")
        
        dictionary.setValue(self.amount, forKey: "amount")
        dictionary.setValue(self.debitAmount, forKey: "debitAmount")
        dictionary.setValue(self.studentNames, forKey: "studentNames")

		return dictionary as! Dictionary<String,Any>
	}

    public func dictionaryRepresentationForCustomPayment() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.tokenID, forKey: "tokenID")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.sourceToken, forKey: "SourceToken")
        dictionary.setValue(self.invoiceAmount, forKey: "AmoutPaid")
        dictionary.setValue(self.createdBy, forKey: "createdBy")
        //        dictionary.setValue(self.email, forKey: "email")
        
        return dictionary as! Dictionary<String,Any>
    }

    public func dictionaryRepresentationForACHVerification() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.amountOne, forKey: "amountFirst")
        dictionary.setValue(self.amountTwo, forKey: "amountSecond")
        return dictionary as! Dictionary<String,Any>
    }
    
    public func dictionaryRepresentationForOneTimePayment() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.amount, forKey: "amount")
        dictionary.setValue(self.paymentDate, forKey: "date")
        return dictionary as! Dictionary<String,Any>
    }
    
    public func dictionaryRepresentationForRecurringPayment() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.amount, forKey: "amount")
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.paymentFromDate, forKey: "paymentFromDate")
        dictionary.setValue(self.paymentToDate, forKey: "paymentToDate")
//        dictionary.setValue(self.firstPaymentDate, forKey: "firstPaymentDate")
        dictionary.setValue(self.billingCycle, forKey: "billingCycle")
        return dictionary as! Dictionary<String,Any>
    }
    
    public func dictionaryRepresentationForDeleteRecurringPayment() -> Dictionary<String,Any> {
        let dictionary = NSMutableDictionary()
        dictionary.setValue(self.agencyID, forKey: "agencyID")
        dictionary.setValue(self.parentID, forKey: "parentID")
        dictionary.setValue(self.agencyID, forKey: "DeletedBy")
        dictionary.setValue(true, forKey: "IsDeleted")
        dictionary.setValue(self.id, forKey: "id")
        return dictionary as! Dictionary<String,Any>
    }
    
    
}
