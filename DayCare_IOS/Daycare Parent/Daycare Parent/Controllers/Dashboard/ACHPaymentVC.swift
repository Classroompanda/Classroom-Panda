//
//  ACHPaymentVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 20/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class ACHPaymentVC: BaseViewController {
    
    
    @IBOutlet weak var ACHTableView: UITableView!
    
    var ACHAccountDetail : ACHAccount?
    var recurringPayments : [Payment]?
    var refreshControl = UIRefreshControl()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationBarTitle.ACHPayment)
        ACHTableView.rowHeight = UITableView.automaticDimension
        initialSetup()
        getACHAccountDetails()
        getRecurringPayments()
    }
    
    @objc func actionForRefresh(sender:AnyObject) {
        getACHAccountDetails()
        getRecurringPayments()
    }
    
    //MARK:----- IBAction -----
    
 func openAddACHAccountPopup(){
       let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Payment, bundle: nil)
       let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddACHAccount) as! AddACHAccount
       popoverContent.delegate = self
       popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
       popoverContent.preferredContentSize = CGSize(width:300,height:440)
       let popover = popoverContent.popoverPresentationController
       popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
       popover?.delegate = self
       popover?.sourceView = self.view
       popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
       self.present(popoverContent, animated: true, completion: nil)
   }
    
    @objc func openAddPaymentPopup(){
        guard let accountDetail = ACHAccountDetail, accountDetail.status == VerficationStatus.Verified.rawValue else {
            _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: ACHAccountDetail == nil ? Macros.alertMessages.addACHAccount : Macros.alertMessages.verifyACHAccount, onViewController: self)
            return }
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Payment, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddPaymentVC) as! AddPaymentVC
        popoverContent.delegate = self
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:300,height:550)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    @objc func openAccountVerificationPopup(){
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Payment, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.VerifyACHAccountVC) as! VerifyACHAccountVC
        popoverContent.delegate = self
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:300,height:300)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    
    
    func initialSetup(){
         refreshControl.attributedTitle = NSAttributedString(string: Macros.ControllerString.refresh)
         refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
//         self.lblForDayName.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
//         self.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date:selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
//         self.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
         if (AppInstance.shared.selectedChild != nil) {
             ACHTableView.addSubview(refreshControl)
         }
     }
    
    @IBAction func addACHAccount(_ sender: UIButton){
        openAddACHAccountPopup()
    }

    //MARK:----- API Calling Function -------
    
    func deleteACHAccount() {
        let accountService = ACHAccountService()
        guard let accountDetail = ACHAccountDetail else { return }
        accountDetail.parentID = AppInstance.shared.user?.releventUserID ?? 0
        accountDetail.agencyID = AppInstance.shared.user?.agencyID ?? 0
        accountService.deleteACHAccount(with: self, param: accountDetail.dictionaryRepresentationToDeleteACHAccount()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: response["message"] as? String ?? "", onViewController: self)
                self.actionForRefresh(sender: self.refreshControl)
                
            }
        }
    }
    
    func deleteRecurringPayment(indexPath: IndexPath) {
        let paymentservice = PaymentService()
        guard let paymentToDelete = self.recurringPayments?[indexPath.row] else { return }
        paymentservice.DeleteRecurringPayment(with: self, param: paymentToDelete.dictionaryRepresentationForDeleteRecurringPayment()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                _ = AlertManager.showOKAlert(withTitle: Macros.ApplictionName, withMessage: response["message"] as? String ?? "", onViewController: self)
                self.recurringPayments?.remove(at: indexPath.row)
                self.ACHTableView.reloadData()
            }
        }
    }
    
    func getACHAccountDetails() {
        let accountService = ACHAccountService()
        accountService.getACHAccount(with: self) { (result) in
            if let accountDetails = result as? [ACHAccount] {
                self.ACHAccountDetail = accountDetails.first
            }
            self.ACHTableView.reloadData()
        }
    }
    
    func getRecurringPayments() {
        let accountService = ACHAccountService()
        accountService.getRecurringPayment(with: self) { (result) in
            if let payments = result as? [Payment] {
                self.recurringPayments = payments
            }
            self.refreshControl.endRefreshing()
            self.ACHTableView.reloadData()
        }
    }

}

//MARK:------ ACHAccountDelegate -----

extension ACHPaymentVC: ACHAccountDelegate {
    
    func accountUpdated() {
        actionForRefresh(sender: refreshControl)
    }
    
}

//MARK:------ ACHAccountVerifiedDelegate -----

extension ACHPaymentVC: ACHAccountVerifiedDelegate {
    
    func accountVerified() {
        actionForRefresh(sender: refreshControl)
    }
    
}

//MARK:------ ACHRecurringPaymentAddedDelegate -----

extension ACHPaymentVC: ACHRecurringPaymentAddedDelegate {
    
    func refreshRecurringPayment() {
        getRecurringPayments()
    }
    
}

//MARK:------ UITableViewDataSource and Delegates -----

extension ACHPaymentVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch section {
        case 0:
            return "ACH Account"
        default:
            return "Recurring Payments"
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch section {
        case 0:
           if ACHAccountDetail != nil { return 2 }
            return 1
        default:
            return (recurringPayments?.count ?? 0) + 1
          
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.section {
        case 0:
            return customACHAccountCell(tableView:tableView,indexPath:indexPath)
        default:
            return customRecurringPaymentCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    
    func confirmationMessageToDeleteAccount(indexPath: IndexPath) {
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.noString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                if indexPath.section == 0 {
                    self.deleteACHAccount()
                } else {
                    self.deleteRecurringPayment(indexPath: indexPath)
                }
                self.navigationController?.popViewController(animated: true)
            default:
                self.dismiss(animated: true, completion: nil)
            }
        })
    }
    
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        if indexPath.section == 0 {
            guard ACHAccountDetail != nil else { return false }
            if indexPath.row != 0 {
                return false
            }
        } else if indexPath.row >= recurringPayments?.count ?? 0 {
            return false
        }
        return true
    }
    
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            confirmationMessageToDeleteAccount(indexPath: indexPath)
        }
    }
    
    func customACHAccountCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        guard let accountDetail = ACHAccountDetail else { return customACHFooterCell(tableView:tableView,indexPath:indexPath) }
        
        switch indexPath.row {
        case 0:
            let nib = UINib(nibName: Macros.Identifiers.Cells.AccountDetailTVC, bundle: nil)
            ACHTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.AccountDetailTVC)
            if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AccountDetailTVC) as? AccountDetailTVC {
                cell.setACHAccountData(accountDetail: accountDetail)
                return cell
            }
        default:
            return customACHFooterCell(tableView:tableView,indexPath:indexPath)
        }
        return UITableViewCell()
        
    }
    
    func customRecurringPaymentCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row >= recurringPayments?.count ?? 0 {
         return customACHFooterCell(tableView:tableView,indexPath:indexPath)
        }
        guard let recurringPayment = (recurringPayments?[indexPath.row]) else { return UITableViewCell() }
        
        let nib = UINib(nibName: Macros.Identifiers.Cells.RecurringPaymentTVC, bundle: nil)
        ACHTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.RecurringPaymentTVC)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.RecurringPaymentTVC) as? RecurringPaymentTVC {
            cell.setRecurringPaymentData(recurringPaymentDetail: recurringPayment)
            return cell
        }
        return UITableViewCell()
    }
    
    
    func  customACHFooterCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.ACHPaymentFooterTVC, bundle: nil)
        ACHTableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.ACHPaymentFooterTVC)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ACHPaymentFooterTVC) as? ACHPaymentFooterTVC {
            cell.selectionStyle = .none
            cell.addButton.removeTarget(nil, action: nil, for: .touchUpInside)
            switch indexPath.section {
            case 0:
                var buttonTitle = ""
                switch ACHAccountDetail?.status {
                case VerficationStatus.Verified.rawValue:
                    buttonTitle = "ADD NEW ACCOUNT"
                    cell.addButton.addTarget(self, action: #selector(addACHAccount(_:)), for: .touchUpInside)
                    
                case VerficationStatus.Pending.rawValue:
//                    let attributedString = NSMutableAttributedString.init(string: classNameLabelText)
//                    attributedString.addAttribute(NSAttributedString.Key.foregroundColor, value: colorCode.applicationColor, range: stringRange)
//                    cell.lblForClassName.attributedText =  attributedString
                    buttonTitle = "VERIFY ACCOUNT"
                    cell.addButton.addTarget(self, action: #selector(openAccountVerificationPopup), for: .touchUpInside)
                    
                default:
                    buttonTitle = "ADD ACCOUNT"
                    cell.addButton.addTarget(self, action: #selector(addACHAccount(_:)), for: .touchUpInside)
                }
                cell.setupForACHAccount(title: buttonTitle)
            default:
                cell.setupForRecurringPayments()
                cell.addButton.addTarget(self, action: #selector(openAddPaymentPopup), for: .touchUpInside)
                
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Add Guardian Popover Delegatge -----

extension ACHPaymentVC : UIPopoverPresentationControllerDelegate {
    
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}
