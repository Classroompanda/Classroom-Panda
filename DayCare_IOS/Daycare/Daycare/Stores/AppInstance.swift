//
//  AppInstance.swift
//  DayCare
//
//  Created by amrut waghmare on 30/11/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//
import Foundation
import UIKit

class AppInstance: NSObject {
    static let shared = AppInstance()
    var accessToken:String?
    var firstTimeLogin: Bool?
    let kUserDefault = UserDefaults.standard
    var user:User?
    var teacher: Teacher?
    var teacherBreak: TeacherBreakLog?
    var selectedMenuIndex = 0
    var currentCheckInClass = Class()
    var token:String?
}
