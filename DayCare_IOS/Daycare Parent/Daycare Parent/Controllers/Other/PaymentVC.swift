//
//  PaymentVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 08/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import Stripe

class PaymentVC: BaseViewController {
    
    @IBOutlet weak var paymentCardTextField : STPPaymentCardTextField!
    @IBOutlet weak var amountTextField: UITextField!

    var payment:Payment?
    var paymentSubmitModel = PaymentSubmit() //http://54.201.160.69:4000
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.Payment)
        paymentCardTextField.font = PlatformUtils.isPad ? fonts.customButtonFontForPad : fonts.customButtonFont
        var dueAmount = (payment?.amount ?? 0) - (payment?.debitAmount ?? 0)
        if dueAmount < 0 {
            dueAmount = 0
        }
        amountTextField.text = "$\(dueAmount)"
        apiCallForGetPublicKey()
    }
    
    // this is new method for payment - We can send custom payment
    @IBAction func actionForPay(_ sender: Any) {
        if let amountToPay = amountTextField.text?.dropFirst(1), let amountInDouble = Double(amountToPay) {
            payment?.invoiceAmount = amountInDouble
        }
        if paymentCardTextField.hasText && paymentCardTextField.isValid {
            self.addCardInStripAccount(paymentCardTextField: paymentCardTextField, complition: {(token) in
//                self.apiCallForSavePaymentDetails(token: token ?? "")
                self.apiCallForPayment(token: token ?? "")
            })
        } else {
            _  =  AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: Macros.alertMessages.cardDetail, onViewController: self)
            return
        }
    }
    
    // function for stripe token and payments
    // this is old method of payment - We have to send entire fixed payment for class

    func addCardInStripAccount(paymentCardTextField:STPPaymentCardTextField,complition:@escaping (String?) -> Void) {
        let cardParams = STPCardParams()
//        var cardParams: STPCardParams = STPCardParams()
        cardParams.number = paymentCardTextField.cardNumber
        cardParams.expMonth = paymentCardTextField.expirationMonth
        cardParams.expYear = paymentCardTextField.expirationYear
        cardParams.cvc = paymentCardTextField.cvc
        self.showLoader()
        STPAPIClient.shared().createToken(withCard: cardParams) { (stpToken, error) in
            guard let stpToken = stpToken, error == nil else {
                self.hideLoader()
                self.showAlert(with: (error?.localizedDescription) ?? "")
                print(error?.localizedDescription as Any)
                return
            }
            self.hideLoader()
            let token = String(describing: stpToken)
            print(stpToken)
            complition(token)
        }
    }
    
//    func popViewController(message: String) {
//        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
//        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: message, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
//            switch index {
//            case 0:
//                self.navigationController?.popViewController(animated: true)
//            default:
//                break
//            }
//        })
//    }
    
    //MARK:----- API Calling Function ------
    func apiCallForGetPublicKey(){
        let service = PaymentService()
        service.getStripePublicKeyForAgency(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if let response = result as? Dictionary<String,Any> {
                Stripe.setDefaultPublishableKey(response[Macros.ApiKeys.kstripePublishableKey] as? String ?? "")
            }
        }
    }
    
    func apiCallForPayment(token: String) {
        let service = PaymentService()
        payment?.tokenID = token
        payment?.sourceToken = token
        payment?.createdBy = AppInstance.shared.user?.releventUserID ?? 0
        payment?.agencyID = AppInstance.shared.user?.agencyID ?? 0
        payment?.parentID = AppInstance.shared.user?.releventUserID ?? 0
        service.makeCustomPayment(with: self, param: (payment?.dictionaryRepresentationForCustomPayment())!) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.popViewController(message: response["message"] as? String ?? "")
            }
        }
    }
    
    func apiCallForSavePaymentDetails(token: String){
        let service = PaymentService()
        paymentSubmitModel.agencyID = payment?.agencyID
        paymentSubmitModel.email = AppInstance.shared.user?.emailAddress ?? ""
        paymentSubmitModel.tokenID = token
        paymentSubmitModel.sourceToken = token
        paymentSubmitModel.createdBy = AppInstance.shared.user?.releventUserID ?? 0
        paymentSubmitModel.parentID = payment?.parentID
        paymentSubmitModel.studentID = payment?.studentID
        paymentSubmitModel.totalAmount = payment?.totalAmount
        paymentSubmitModel.paymentFromDate = payment?.invoiceFromDate
        paymentSubmitModel.paymentToDate = payment?.invoiceToDate
        paymentSubmitModel.paymentDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        paymentSubmitModel.invoiceDetailsID = payment?.id
        paymentSubmitModel.IsOffline = false
        service.savePayment(with: self, param: paymentSubmitModel.dictionaryRepresentation()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.popViewController(message: response["message"] as? String ?? "")
            }
        }
    }
}

extension PaymentVC: UITextFieldDelegate {
    
//    func textFieldDidBeginEditing(_ textField: UITextField) {
//        if textField.text?.length() == 0 {
//            textField.text = "$"
//        }
//    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        // Allow only integers
        guard CharacterSet(charactersIn: "0123456789").isSuperset(of: CharacterSet(charactersIn: string)) else {
               return false
           }
        
        if newString.length == 0  {
            return false
        }
        return true
    }
}
