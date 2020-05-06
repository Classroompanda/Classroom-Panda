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
    let kUserDefault = UserDefaults.standard
    var selectedMenuIndex = 0
    var user: User?
    var parent: Parent?
    var selectedChild: Child?
    var arrForChild:[Child]?
    var token:String?
}
