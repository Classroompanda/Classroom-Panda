//
//  Constant.swift
//  Inchora App
//
//  Created by Subhash Kumar on 09/10/18.
//  Copyright © 2018 smartData. All rights reserved.
//

import Foundation
import UIKit




//struct AppDelegateClass{
//    static var appDelegate = UIApplication.shared.delegate as! AppDelegate
//}

struct ScreenSize{
    static let screenWidth  = UIScreen.main.bounds.size.width
    static let screenHeight = UIScreen.main.bounds.size.height
}


enum fonts{
    static let customButtonFont = UIFont(name: "Poppins", size: 13.0)
    static let customLoginButtonFont = UIFont(name: "Poppins-Medium", size: 15.0)
    static let customLoginButtonPadFont = UIFont(name: "Poppins-Medium", size: 20.0)
    static let navigationTitleFont = UIFont(name: "Poppins-Regular", size: 18.0)
    static let addIncidentTitle = UIFont(name: "Poppins-Regular", size: 15.0)
    static let calendarDateFont = UIFont(name: "Poppins-Medium", size: 13.0)
    static let placeholderFont  =   UIFont(name: "Poppins-Light", size: 17.0)
    static let textFontForPhone = UIFont(name: "Poppins-Regular", size: 17.0)
    static let textFontForPad = UIFont(name: "Poppins-Regular", size: 20.0)
}


enum colorCode{

    static let applicationColor = UIColor(red: 88.0/255.0, green: 167.0/255.0, blue: 254.0/255.0, alpha: 1.0)
    static let dullColoer   =   UIColor(red: 120.0/255.0, green: 120.0/255.0, blue: 140.0/255.0, alpha: 0.4)
    static let selectedDrowerColor = UIColor(red: 0.0/255.0, green: 119.0/255.0, blue: 179.0/255.0, alpha: 0.5)
    
    //Button Color
    static let checkInColor     =   UIColor(red: 127.0/255.0, green: 198.0/255.0, blue: 166.0/255.0, alpha: 1.0)
    static let checkOutColor    =   UIColor(red: 255.0/255.0, green: 108.0/255.0, blue: 108.0/255.0, alpha: 1.0)
    static let disableColor     =   UIColor(red: 230.0/255.0, green: 230.0/255.0, blue: 230.0/255.0, alpha: 1.0)
    static let selectedButtonColor    = UIColor(red: 112.0/255.0, green: 112.0/255.0, blue: 112.0/255.0, alpha: 1.0)
    static let unSelectedButtonColor  = UIColor(red: 180.0/255.0, green: 180.0/255.0, blue: 180.0/255.0, alpha: 1.0)
    static let floatingButtonColor = UIColor(red: 238.0/255.0, green: 130.0/255.0, blue: 34.0/255.0, alpha:1.0)
    static let checkInStatusColor   =   UIColor(red: 89.0/255.0, green: 190.0/255.0, blue: 131.0/255.0, alpha:1.0)
}


enum AttendanceStatus {
    static let isToBeChecked    = 2
    static let isCheckedIn      = 3
    static let isCheckedOut     = 4
    static let isCheckedAbsent  = 5
}

enum HealthDecriptionStatus {
    static let Immunization = 1
    static let Allergies    = 2
    static let Medication   = 3
    static let Disability   = 4
}

enum ActivityTypeID {
    static let Health = 1
    static let Notes = 2
    static let Meal = 3
    static let Mood = 4
    static let Activity = 5
    static let Nap = 6
    static let Diper = 7
}

enum ClockInStatus {
    static let notClockIn = 0
    static let clockedIn  = 1
    static let clockedOut = 2
}

enum CheckInStatus {
    static let notCheckIn = 0
    static let CheckedIn  = 1
    static let CheckedOut = 2
}

enum StudentBreakStatus {
    static let notBreakOut = 0
    static let BreakOut = 1
    static let BreakIn  = 2
}

enum teacherBreakStatus {
    static let notBreakOut = 0
    static let BreakOut = 1
    static let BreakIn  = 2
}

enum FoodConsumptionID {
    static let None = 4
    static let Some = 3
    static let Most = 2
    static let All = 1
}
struct RoleId {
    static let parent : Int = 4
    static let teacher : Int = 3
}

enum BreakStatus {
    static let onBreak = 1
}

enum ChatEvents : String{
    case sendMessage = "SendMessage" // while sending the message
    case receiveMessage = "messageReceived" // received message by other user
    case connect = "getConnectionId" // for connection with signal r
    case messageReceived = "messageSent" // received message by sender
}


