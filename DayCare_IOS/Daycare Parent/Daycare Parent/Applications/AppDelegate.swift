//
//  AppDelegate.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import UserNotifications
import IQKeyboardManagerSwift
import Fabric
import Crashlytics


import Firebase
import FirebaseInstanceID
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate,UNUserNotificationCenterDelegate {
  
  var window: UIWindow?
  
  //MARK :-Appdelegate ShareInstance:--
  func sharedInstance() -> AppDelegate{
    return UIApplication.shared.delegate as! AppDelegate
  }
  
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    self.registerNotificationFunction(application: application)
    IQKeyboardManager.shared.enable = true
    Fabric.with([Crashlytics.self])
    return true
  }
  
  func registerNotificationFunction(application:UIApplication) {
    FirebaseApp.configure()
    Messaging.messaging().delegate = self
    UNUserNotificationCenter.current().delegate = self
    if #available(iOS 10.0, *) {
      // For iOS 10 display notification (sent via APNS)
      let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
      UNUserNotificationCenter.current().requestAuthorization(
        options: authOptions,
        completionHandler: {(granted, error) in
          if (granted) {
            DispatchQueue.main.async(execute: {
              UIApplication.shared.registerForRemoteNotifications()
            })
          } else {
            print("permission denied")
          }
      })
    } else {
      let settings: UIUserNotificationSettings =
        UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
      application.registerUserNotificationSettings(settings)
    }
    application.registerForRemoteNotifications()
  }
  
  func applicationWillResignActive(_ application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
  }
  
  func applicationDidEnterBackground(_ application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    if  AppInstance.shared.user?.loginUserID ?? 0 > 0
    {
      SignalRConnection.sharedInstance.closeConnection(userId: AppInstance.shared.user?.loginUserID ?? 0)
    }
  }
  
  func applicationWillEnterForeground(_ application: UIApplication) {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
  }
  
  func applicationDidBecomeActive(_ application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    if  AppInstance.shared.user?.loginUserID ?? 0 > 0
    {
      SignalRConnection.sharedInstance.startConnection(currentUser:AppInstance.shared.user ?? User())
    }
  }
  
  func applicationWillTerminate(_ application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    if #available(iOS 10.0, *) {
      CoreDataStackManager.sharedManager.saveContext()
    } else {
      // Fallback on earlier versions
    }
  }  
  
  //MARK:- Register remote notification
  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    //        AppInstance.shared.kUserDefault.setValue("", forKey: Macros.DefaultKeys.kDeviceToken)
    print(error.localizedDescription)
  }
  
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    //        _ = deviceToken.reduce("", {$0 + String(format: "%02X", $1)})
    //        let token = String(format: "%@", deviceToken as CVarArg)
    //            .trimmingCharacters(in: CharacterSet(charactersIn: "<>"))
    //            .replacingOccurrences(of: " ", with: "")
    //        print(token)
    //        AppInstance.shared.kUserDefault.setValue(token, forKey: Macros.DefaultKeys.kDeviceToken)
    InstanceID.instanceID().instanceID(handler: { (tokenString, error) in
      if error != nil {
        print(error?.localizedDescription ?? "")
      } else {
        if let token = tokenString?.token {
          AppInstance.shared.token = token
          AppInstance.shared.kUserDefault.setValue(token, forKey: Macros.DefaultKeys.kDeviceToken)
        }
      }
    })
  }
  
  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    completionHandler(
      [UNNotificationPresentationOptions.alert,
       UNNotificationPresentationOptions.sound,
       UNNotificationPresentationOptions.badge])
  }
  
  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    Messaging.messaging().appDidReceiveMessage(userInfo)
//    application.applicationIconBadgeNumber = 0;
  }
  
      func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String) {
          print("Firebase registration token: \(fcmToken)")
          let dataDict:[String: String] = ["token": fcmToken]
          NotificationCenter.default.post(name: Notification.Name("FCMToken"), object: nil, userInfo: dataDict)
          AppInstance.shared.token = fcmToken
          AppInstance.shared.kUserDefault.setValue(fcmToken, forKey: Macros.DefaultKeys.kDeviceToken)
      }
  
}

//MARK: FIRMessaging Delegate
extension AppDelegate : MessagingDelegate {
  // The callback to handle data message received via FCM for devices running iOS 10 or above.
  func applicationReceivedRemoteMessage(_ remoteMessage: MessagingRemoteMessage) {
    print(remoteMessage.appData)
  }
}
//login teacher app - toby@yopmail.com/daycare@123
//Parent app - parent1@yopmail.com/daycare@123

//  9692DDD6-1C58-4AD5-8388-46E2E5
// xcrun simctl push 9692DDD6-1C58-4AD5-8388-46E2E5 com.classroompandaParent.development notification.apns
