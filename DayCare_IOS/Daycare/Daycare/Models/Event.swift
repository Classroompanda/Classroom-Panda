

import Foundation
 

public class Event:NSObject {
	public var id : Int?
	public var agencyID : Int?
	public var plannerRepeatTypeID : Int?
	public var plannerRepeatTypeName : String?
	public var title : String?
	public var start : String?
	public var end : String?
	public var startTime : String?
	public var endTime : String?
	public var endsOn : String?
	public var eventDescription : String?
	public var mon : Bool?
	public var tue : Bool?
	public var wed : Bool?
	public var thu : Bool?
	public var fri : Bool?
	public var sat : Bool?
	public var sun : Bool?
	public var selectedWeekDay : String?
	public var rangeOfDate : Int?
	public var involvedEventClassesList : Array<InvolvedClass>?
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
  
    required public override init() {
        super.init()
    }

    public class func modelsFromDictionaryArray(array:Array<Dictionary<String,Any>>) -> [Event]
    {
        var models:[Event] = []
        for item in array
        {
            models.append(Event(dictionary: item)!)
        }
        return models
    }


	required public init?(dictionary: Dictionary<String,Any>) {

		id = dictionary["id"] as? Int ?? 0
		agencyID = dictionary["agencyID"] as? Int ?? 0
		plannerRepeatTypeID = dictionary["plannerRepeatTypeID"] as? Int ?? 0
		plannerRepeatTypeName = dictionary["plannerRepeatTypeName"] as? String ?? ""
		title = dictionary["title"] as? String ?? ""
		start = dictionary["start"] as? String ?? ""
		end = dictionary["end"] as? String ?? ""
		startTime = dictionary["startTime"] as? String ?? ""
		endTime = dictionary["endTime"] as? String ?? ""
		endsOn = dictionary["endsOn"] as? String ?? ""
		eventDescription = dictionary["description"] as? String ?? ""
		mon = dictionary["mon"] as? Bool ?? false
		tue = dictionary["tue"] as? Bool ?? false
		wed = dictionary["wed"] as? Bool ?? false
		thu = dictionary["thu"] as? Bool ?? false
		fri = dictionary["fri"] as? Bool ?? false
		sat = dictionary["sat"] as? Bool ?? false
		sun = dictionary["sun"] as? Bool ?? false
		selectedWeekDay = dictionary["selectedWeekDay"] as? String ?? ""
		rangeOfDate = dictionary["rangeOfDate"] as? Int ?? 0
        if (dictionary["involvedEventClassesList"] != nil) { involvedEventClassesList = InvolvedClass.modelsFromDictionaryArray(array: dictionary["involvedEventClassesList"] as? Array<Dictionary<String,Any>> ?? []) }
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
	}

		
	public func dictionaryRepresentation() -> Dictionary<String,Any> {

		let dictionary = NSMutableDictionary()

		dictionary.setValue(self.id, forKey: "id")
		dictionary.setValue(self.agencyID, forKey: "agencyID")
		dictionary.setValue(self.plannerRepeatTypeID, forKey: "plannerRepeatTypeID")
		dictionary.setValue(self.plannerRepeatTypeName, forKey: "plannerRepeatTypeName")
		dictionary.setValue(self.title, forKey: "title")
		dictionary.setValue(self.start, forKey: "start")
		dictionary.setValue(self.end, forKey: "end")
		dictionary.setValue(self.startTime, forKey: "startTime")
		dictionary.setValue(self.endTime, forKey: "endTime")
		dictionary.setValue(self.endsOn, forKey: "endsOn")
		dictionary.setValue(self.eventDescription, forKey: "description")
		dictionary.setValue(self.mon, forKey: "mon")
		dictionary.setValue(self.tue, forKey: "tue")
		dictionary.setValue(self.wed, forKey: "wed")
		dictionary.setValue(self.thu, forKey: "thu")
		dictionary.setValue(self.fri, forKey: "fri")
		dictionary.setValue(self.sat, forKey: "sat")
		dictionary.setValue(self.sun, forKey: "sun")
		dictionary.setValue(self.selectedWeekDay, forKey: "selectedWeekDay")
		dictionary.setValue(self.rangeOfDate, forKey: "rangeOfDate")
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

		return dictionary as! Dictionary<String,Any>
	}

}
