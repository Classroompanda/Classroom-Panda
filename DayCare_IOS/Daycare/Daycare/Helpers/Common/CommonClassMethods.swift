

import UIKit

class CommonClassMethods: NSObject {
    
    class func getDayNameWithTime(date: Date) -> String? {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE h:mm a"
        return formatter.string(from: date)
    }
    
    //DayName From Date
    class func dayNameFromDate(date:Date) -> String{
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        let dayName = formatter.string(from: date)
        return dayName
    }
    
     //MonthName From Date
    class func monthNameFromDate(date:Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "LLLL"
        let nameOfMonth = dateFormatter.string(from: date)
        return nameOfMonth
    }
    
    class func dateMonthNameFromDateString(date:String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate = dateFormatter.date(from: date)
        let dateString = "\(self.dateFromDate(date: newDate ?? Date())) \(self.monthnameFromDate(date: newDate ?? Date()))"
        return dateString
    }
    
    //Year from Date
    class func yearFromDate(date:Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy"
        let year = dateFormatter.string(from: date)
        return year
    }
    
    //Year from Date String
    class func yearFromDateString(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate           = dateFormatter.date(from: date)
        return self.yearFromDate(date: newDate ?? Date())
    }
    
    //month from Date
    class func monthFromDate(date:Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MM"
        let month = dateFormatter.string(from: date)
        return month
    }
    
    //month from Date
    class func monthnameFromDate(date:Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMM"
        let month = dateFormatter.string(from: date)
        return month
    }
    
    
    //month from Date String
    class func monthFromDateString(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate           = dateFormatter.date(from: date)
        return self.monthFromDate(date: newDate ?? Date())
    }
    
    //Time From Time String
    class func timeFromDateString(date: String) -> String {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = (date.length() == 19) ? "yyyy-MM-dd'T'HH:mm:ss" : (date.length() == 23) ? "yyyy-MM-dd'T'HH:mm:ss.SSS" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let newDate           = dateFormatter.date(from: date)
        return self.timeFromDate(date: newDate ?? Date())
    }
    
    //date from Date
    class func dateFromDate(date:Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd"
        let dateName = dateFormatter.string(from: date)
        return dateName
    }
    
    //date & Month from Date String
    class func dateMonthFromDateString(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        let newDate           = dateFormatter.date(from: date)
        let newDateFormatter = DateFormatter()
        newDateFormatter.dateFormat = "dd MMM yyyy"
        let dateMonth = newDateFormatter.string(from: newDate ?? Date())
        return dateMonth
    }
    
    //date with format 14 December 2018
    class func dateFromFormat(date: Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd LLLL yyyy"
        let newDate = dateFormatter.string(from: date)
        return newDate
    }
    
    //date with format 14 Dec 2018
    class func dateFromDateFormat(date: Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd MMM yyyy"
        dateFormatter.timeZone = .current
        let newDate = dateFormatter.string(from: date)
        return newDate
    }
    
    //time & day name From Date
    class func timeFromDate(date: Date) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "h:mm a"
        dateFormatter.timeZone = .current
        let time = dateFormatter.string(from: date)
        return time
    }
    
    class func dateStringFromDate(date: Date) -> String{
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        let dateString = dateFormatter.string(from: date)
        return dateString
    }

    //DateObject from Date String
    class func dateObjectFromDateString(date: String) -> Date? {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = (date.length() == 19) ? "yyyy-MM-dd'T'HH:mm:ss" : (date.length() == 23) ? "yyyy-MM-dd'T'HH:mm:ss.SSS" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let newDate           = dateFormatter.date(from: date)
        return newDate ?? Date()
    }
    
    //DateObject from Date String
    class func dateObjectFromDateStringS(date: String) -> Date? {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let newDate           = dateFormatter.date(from: date)
        return newDate
    }
    
    //DateObjectWithoutTime from date string
    class func dateObjectWithoutTimeFromDateString(date: String) -> Date {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = (date.length() == 19) ? "yyyy-MM-dd'T'HH:mm:ss" : (date.length() == 23) ? "yyyy-MM-dd'T'HH:mm:ss.SSS" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate           = dateFormatter.date(from: date)
        return self.convertDateWithoutTime(date: newDate ?? Date())
    }
    

    
    //DateObjectWithoutTime from date string
    class func dateObjectWithoutTimeFromDateStringSS(date: String) -> Date {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        let newDate           = dateFormatter.date(from: date)
        return self.convertDateWithoutTime(date: newDate ?? Date())
    }
    
    //DateObjectWithoutTime from date string
    class func dateObjectWithoutTimeFromDateStringSSS(date: String) -> Date {
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS"
        let newDate           = dateFormatter.date(from: date)
        return self.convertDateWithoutTime(date: newDate ?? Date())
    }
    
    
    //date to server readable format
    class func convertDateToServerReadableFormat(date:Date) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let dateString           = dateFormatter.string(from: date)
        return dateString
    }
    
    //date to server readable format
    class func convertDateToServerReadableFormatGET(date:Date, toFormat: String = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = toFormat
//        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let dateString           = dateFormatter.string(from: date)
        return dateString
    }
    
    class func dateToStringSignalR(date:Date) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS"
        let dateString           = dateFormatter.string(from: date)
        return dateString
    }

    
    //date to dateWithoutTime
    class func convertDateWithoutTime(date:Date) -> Date{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let dateString           = dateFormatter.string(from: date)
        dateFormatter.timeZone = TimeZone(abbreviation: "UTC")
        let dateValue            = dateFormatter.date(from: dateString)
        return dateValue ?? Date()
    }
    
    //date from dateString
    class func dateFromDateString(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = (date.length() == 19) ? "yyyy-MM-dd'T'HH:mm:ss" : (date.length() == 23) ? "yyyy-MM-dd'T'HH:mm:ss.SSS" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.timeZone = TimeZone(abbreviation: "UTC")
        let newDate           = dateFormatter.date(from: date)
        return self.dateFromDateFormat(date: newDate ?? Date())
    }

    //date from dateString
    class func dateFromDateStringWithoutUTC(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = (date.length() == 19) ? "yyyy-MM-dd'T'HH:mm:ss" : (date.length() == 23) ? "yyyy-MM-dd'T'HH:mm:ss.SSS" : "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate           = dateFormatter.date(from: date)
        return self.dateFromDateFormat(date: newDate ?? Date())
    }
    
    class func convertDateFromDateString(date: String) -> Date{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let newDate           = dateFormatter.date(from: date)
        return newDate ?? Date()
    }
    
    //date & Month from Date String
    class func dateFromDateServerRequestToResponseString(date:String) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let newDate           = dateFormatter.date(from: date)
        let newDateFormatter = DateFormatter()
        newDateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        let dateString = newDateFormatter.string(from: newDate ?? Date())
        return dateString
    }
    
    //get MaximumDate Of month
    class func getMaximumDateOfMonth(dateObject:Date) -> String {
        let calendar = Calendar.current
        var component = DateComponents()
        component.day = -1
        component.month = 1
        let date = calendar.date(byAdding: component, to: dateObject) ?? Date()
        return self.dateStringFromDate(date: date)
    }
    
    //get MinimumDate Of month
    class func getMinimumDateOfMonth(dateObject:Date) -> String {
//        var minimumDate = CommonClassMethods.convertDateToServerReadableFormatS(date: dateObject)
//        minimumDate = CommonClassMethods.replace(myString: minimumDate, 8, "0")
//        minimumDate = CommonClassMethods.replace(myString: minimumDate, 9, "1")
//        return minimumDate
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month], from: dateObject)
        return self.dateStringFromDate(date: calendar.date(from: components) ?? Date())
    }
    
    //date to server readable format
    class func convertDateToServerReadableFormatS(date:Date) -> String{
        let dateFormatter        = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        //        dateFormatter.timeZone   = TimeZone(abbreviation: "UTC")
        let dateString           = dateFormatter.string(from: date)
        return dateString
    }
    
    //Replace
    class func replace(myString: String, _ index: Int, _ newChar: Character) -> String {
        var chars = Array(myString.characters)     // gets an array of characters
        chars[index] = newChar
        let modifiedString = String(chars)
        return modifiedString
    }
    
    class func checkNullForStringValue(value:Any?) -> String{
        if value == nil || value is NSNull {
            return ""
        }else{
            return value as! String
        }
    }
    
    
    class func createDateFromStringForDOB(dateString:String) -> Date? {
        if dateString == ""{
            return nil
        }
        
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "MM-dd-yyyy"
        dateFormatter.locale        = Locale.current
        
        let dateObj = dateFormatter.date(from: dateString)
        // print("createDateFromString:-\(String(describing: dateObj))")
        return dateObj
    }
    
    class func ageCalculcation(val:String)-> String?{
        if val == ""{
            return ""
        }
        let dateString              = val // change to your date format
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "yyyy-MM-dd"
        let date                    = dateFormatter.date(from: dateString)
        let now                     = Date()
        let birthday: Date          = date!
        let calendar                = Calendar.current
        let ageComponents           = calendar.dateComponents([.year], from: birthday, to: now)
        let age                     = ageComponents.year!
        print("Age \(age)")
        return String(age)
    }
    
    class func convert24TimeFormateTo12Hours(date:String, apiFormat : String?) -> String {
        if date == ""  {
            return ""
        }
        if date == "00:00"{
            return "12:01 AM"
        }
        
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = apiFormat ?? "HH:mm:ss"
        
        let dateObj                 = dateFormatter.date(from: date)
        dateFormatter.dateFormat    = "hh:mm a"
        print("Dateobj: \(dateFormatter.string(from: dateObj!))")
        return dateFormatter.string(from: dateObj!)
    }
    
    class func convert12TimeFormateTo24Hours(date:String, apiFormat : String?) -> String {
        if date == ""  {
            return ""
        }
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = apiFormat ?? "hh:mm a"
        
        let dateObj                 = dateFormatter.date(from: date)
        dateFormatter.dateFormat    = "HH:mm:ss"
        print("Dateobj: \(dateFormatter.string(from: dateObj!))")
        return dateFormatter.string(from: dateObj!)
    }
    
    class func convertDateInUTC(date:String) -> String {
        if date == "" {
            return ""
        }
        let dateFormatter                           = DateFormatter()
        dateFormatter.dateFormat                    = "yyyy-MM-dd"
        dateFormatter.timeZone                      = TimeZone(abbreviation: "UTC")
        //dateFormatter.locale = Locale.init(identifier: "en_US")
        let dateObj                                 = dateFormatter.date(from: date)
        let dateFormatterForLocalTimezone           = DateFormatter()
        dateFormatterForLocalTimezone.dateFormat    = "yyyy-MM-dd"
        dateFormatterForLocalTimezone.timeZone      = TimeZone.current
        print("Dateobj: \(dateFormatterForLocalTimezone.string(from: dateObj!))")
        return dateFormatterForLocalTimezone.string(from: dateObj!)
    }
    
    class func convertTimeInUTC(time:String) -> String {
        if time == "" {
            return ""
        }
        let formatter               = DateFormatter()
        formatter.dateFormat        = "HH:mm:ss"
        var localTimeZoneAbbreviation: String { return TimeZone.current.abbreviation() ?? "UTC" }
        print(localTimeZoneAbbreviation)
        formatter.locale            = Locale.init(identifier: localTimeZoneAbbreviation)
        formatter.timeZone          = TimeZone.current
        //formatter.dateFormat = "hh:mm:ss"
        let convertedTime           = formatter.date(from: time)
        print(convertedTime as Any)
        return formatter.string(from: convertedTime!)
        
    }
    
    class func convertTimeUTCToLocal(date:String) -> String {
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "HH:mm"
        dateFormatter.timeZone      = TimeZone(abbreviation: "UTC")
        
        let dt = dateFormatter.date(from: date)
        dateFormatter.timeZone      = TimeZone.current
        dateFormatter.dateFormat    = "h:mm a"
        
        return dateFormatter.string(from: dt!)
    }
    
    class func convertDatepUTCToLocal(date:String) -> String {
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "yyyy-MM-dd"
        dateFormatter.timeZone      = TimeZone(abbreviation: "UTC")
        
        let dt = dateFormatter.date(from: date)
        dateFormatter.timeZone      = TimeZone.current
        dateFormatter.dateFormat    = "MM-dd-yyyy"
        
        return dateFormatter.string(from: dt!)
    }
    
    class func getDatePickerDOBDateFormat(date:Date) -> String {
        let dateFormatter           = DateFormatter()
        dateFormatter.locale        = Locale.current
        dateFormatter.dateFormat    = "MM-dd-yyyy"
        return dateFormatter.string(from: date)
    }
    
    class func convertdateMMddyyformate(date:String) -> String {
        if date == "" || date == "0000-00-00"{
            return ""
        }
        
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "yyyy-MM-dd"
        dateFormatter.timeZone      = TimeZone.current
        dateFormatter.locale        = Locale.current
        
        let dateObj                 = dateFormatter.date(from: date)
        
        dateFormatter.dateFormat    = "MM-dd-yyyy"
        print("Dateobj: \(dateFormatter.string(from: dateObj!))")
        return dateFormatter.string(from: dateObj!)
        
    }
    
    class func convertdateYYMMDDformate(date:String) -> String {
        if date == "" {
            return ""
        }
        
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "MM-dd-yyyy"
        dateFormatter.timeZone      = TimeZone.current
        //dateFormatter.locale = Locale.init(identifier: "en_US")
        
        let dateObj = dateFormatter.date(from: date)
        
        dateFormatter.dateFormat    = "yyyy-MM-dd"
        print("Dateobj: \(dateFormatter.string(from: dateObj!))")
        return dateFormatter.string(from: dateObj!)
        
    }
    
    class func sortDateArray(stringArr : [String])-> [String]{
        var convertedArray          = [Date]()
        let dateFormatter           = DateFormatter()
        dateFormatter.dateFormat    = "yyyy-MM-dd" //dd MM, yyyy"//
        for oneString in stringArr {
            let date = dateFormatter.date(from: oneString)
            if let date = date {
                convertedArray.append(date)
            }
        }
        let sortedArr = convertedArray.sorted(by: { $0.compare($1) == .orderedAscending })
        var sortedArray = [String]()
        for date in sortedArr{
            let dateFormatter           = DateFormatter()
            dateFormatter.dateFormat    = "yyyy-MM-dd"
            let dateToString            =  dateFormatter.string(from: date)
            sortedArray.append(dateToString)
        }
        return sortedArray
    }
    
    class func checkIsNullForValue(value:Any?) -> Bool{
        if value == nil || value is NSNull{
            return true
        }else{
            return false
        }
        
    }
    
    //MARK:----- No Data Found Empty Cell -----
    
    //Custom No Data Found TableView Cell
    class func customNoDataFoundCell(tableView:UITableView) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.NoDataFoundTableViewCell, bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.NoDataFoundTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.NoDataFoundTableViewCell) as? NoDataFoundTableViewCell {
            cell.selectionStyle = .none
            return cell
        }
        return UITableViewCell()
    }
    
    
}
