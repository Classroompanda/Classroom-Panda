//
//  SignalRConnection.swift
//  SignalRExample
//
//  Created by Avtar Singh on 30/10/18.
//  Copyright © 2018 Avtar Singh. All rights reserved.
//

import Foundation
import SwiftSignalRClient

// Notifications
let kMessageReceiveNotification = "ChatMessageReceived"
let kChatCoonectionFailNotification = "ChatCoonectionFail"

/* Here is the communication protocol
 * for the UI part. Confirm this protocol into view controller
 * or in any other Ui class for get the message from signal are server
 */
protocol SignalRConnectionDelegate {
    func signalRConnection(didDisconnected disconnected:Bool)
    func signalRConnection(didConnected connected:Bool)
    func signalRConnection(messageSent message:Message)
    func signalRConnection(receiveMessage message:Message)
    func signalRConnection(error errorMessage:String)
    func signalRConnection(errorInConnection errorMessage: String)
}

/* @SignalRConnection is the generic class which
 * controls all SIGNALR related events and connections
 * For global connection initialize this class from the
 * AppDelegate class and call startConnection for connection setup
 */
class SignalRConnection{
    static let sharedInstance = SignalRConnection()
    var chatHubConnection: HubConnection?
    var chatHubConnectionDelegate: ChatHubConnectionDelegate?
    var delegate : SignalRConnectionDelegate?
    
    private let serverUrl = Macros.URLs.chattingUrl
    
    var currentUser:User?
   
    /* @CURRENT USER is the current logged user
     * This is function which build connection with server
     */
    func startConnection(currentUser:User){
        self.currentUser = currentUser
        self.chatHubConnectionDelegate = ChatHubConnectionDelegate(controller: self)
        self.chatHubConnection = HubConnectionBuilder(url: URL(string: self.serverUrl)!)
            .withLogging(minLogLevel: .debug)
            .build()
        self.chatHubConnection!.delegate = self.chatHubConnectionDelegate
        
        self.chatHubConnection!.start()
    }
    
    // Close connection on application close
    func closeConnection(){
        chatHubConnection?.stop()
    }
    
    /* Here subscribe to the receiver event
     * This event is fired from server side when any other user
     * send message to current sessioned user.
     */
    func registerReceiver(){
        self.chatHubConnection!.on(method: ChatEvents.receiveMessage.rawValue, callback: {(user: String, message: String) in
          self.delegate?.signalRConnection(receiveMessage:self.getMessageFromString(string: message) ?? Message())
//                 "{\"message\":\"bye\",\"sender\":160,\"receiver\":165,\"senderName\":\"vera Walsh\"}"
          if let messageObj : Message = self.getMessageFromString(string: message)
          {
             NotificationCenter.default.post(name: NSNotification.Name(kMessageReceiveNotification), object: messageObj, userInfo: nil)
          }
          })
        
       /* self.chatHubConnection!.on(method: ChatEvents.receiveMessage.rawValue, callback: {args, typeConverter in
            // Index 1 will give the id of sender user
//            let user = try! typeConverter.convertFromWireType(obj: args[1], targetType: String.self)
           // Index 0 will give the message text sent by the sender user
            if args.count >= 2 {
                let message = try! typeConverter.convertFromWireType(obj: args[1], targetType: String.self)
                
                //Pass data to communication protocol
                if let msg = message{
                    self.delegate?.signalRConnection(receiveMessage: self.getMessageFromString(string: msg) ?? Message())
                }
            }
        })*/
    }
    
    func getMessageFromString(string: String) -> Message? {
        let data = string.data(using: .utf8)
        do {
            if let json = try JSONSerialization.jsonObject(with: data ?? Data(), options : .allowFragments) as? Dictionary<String,Any>
            {
                return Message.init(dictionaryM: json)
            } else {
                print("bad json")
                return nil
            }
        } catch let error as NSError {
            print(error)
            return nil
        }
    }
    //{\"message\":\"hello kaplpak\",\"sender\":88,\"receiver\":4}
    /* Here is the send message event which will
     * fired by the current sessioned user.
     * @RECEIVER USER is the target user which will be receive the
     * message of current user.
     * @ARGUMENTS order should be :  Message Text, Current Session User Id, Receiver User ID
     */
  
  
    func sendMessage(message:Message){
        chatHubConnection?.invoke(method: ChatEvents.sendMessage.rawValue, arguments: [ "",message.message,message.agencyID,message.SenderUserID,message.ReceiverUserID], invocationDidComplete:
            {error in
                if let e = error {
                    self.delegate?.signalRConnection(error: e.localizedDescription)
                }else{
                    self.delegate?.signalRConnection(messageSent: message)
                }
        })
    }
    
    /* Connect User should be fired after connection build success
     * with server. Connect event present the identity of user to the
     * server. This should be only for current user not for recipient user
     * @ARGUMENT should be array of current user id only : [CURRENT USER ID]
     */
    
    func connectUser(userId:Int){
        chatHubConnection?.invoke(method: ChatEvents.connect.rawValue, arguments: [userId], invocationDidComplete:
            {error in
                if let e = error {
                    print("\(ChatEvents.connect.rawValue) event faild for user id: \(userId) with error ",e)
                }else{
                    print("\(ChatEvents.connect.rawValue) event sucess for user id: \(userId)")
                    self.registerReceiver()
                }
        })
    }
    
    fileprivate func connectionDidOpen() {
        connectUser(userId: self.currentUser?.loginUserID ?? 0)
        delegate?.signalRConnection(didConnected: true)
    }
    
    fileprivate func connectionDidFailToOpen(error: Error) {
       delegate?.signalRConnection(errorInConnection: error.localizedDescription)
      NotificationCenter.default.post(name: NSNotification.Name(kChatCoonectionFailNotification), object: nil, userInfo: nil)
    }
    
    fileprivate func connectionDidClose(error: Error?) {
        //var message = "Connection closed."
        if let e = error {
            delegate?.signalRConnection(error: e.localizedDescription)
            delegate?.signalRConnection(didDisconnected: true)
        }
    }
}

//MARK: Hub connection delegate methods
class ChatHubConnectionDelegate: HubConnectionDelegate {
    
    weak var controller: SignalRConnection?
    
    init(controller: SignalRConnection) {
        self.controller = controller
    }
    
    func connectionDidOpen(hubConnection: HubConnection) {
        controller?.connectionDidOpen()
    }
    
    func connectionDidFailToOpen(error: Error) {
        controller?.connectionDidFailToOpen(error: error)
    }
    
    func connectionDidClose(error: Error?) {
        controller?.connectionDidClose(error: error)
    }
}
