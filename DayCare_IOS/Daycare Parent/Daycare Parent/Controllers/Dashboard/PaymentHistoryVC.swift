//
//  PaymentHistoryVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class PaymentHistoryVC: BaseViewController {
//    @IBOutlet weak var btnForDuePayment: UIButton!
//    @IBOutlet weak var lblForPaymentHistory: UILabel!
//    @IBOutlet weak var lblForDuePayment: UILabel!
    @IBOutlet weak var tblViewForPaymentList: UITableView!
//    @IBOutlet weak var btnForPaymentHistory: UIButton!
    var arrForPaymentHistory:[PaymentHistory]?
    var arrForDuePayment:[Payment]?
    var isFirstLoad:Bool = true
    override func viewDidLoad() {
        super.viewDidLoad()
//        self.btnForDuePayment.isSelected = true
        self.setNavigationBar(title: Macros.NavigationBarTitle.paymentHistory)
//        self.tblViewForPaymentList.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        tblViewForPaymentList.rowHeight = UITableView.automaticDimension

        // Do any additional setup after loading the view.
    }
    override func viewWillAppear(_ animated: Bool) {
        apiCallForGetDuePayment()
        apiCallForGetPaymentHistory()
    }
    //MARK:---- @IBActions -----
    @IBAction func actionForDuePayments(_ sender: Any) {
//        self.btnForPaymentHistory.isSelected = false
//        self.btnForDuePayment.isSelected = true
//        self.btnForDuePayment.titleLabel?.textColor = colorCode.selectedButtonColor
//        self.btnForPaymentHistory.titleLabel?.textColor = colorCode.unSelectedButtonColor
//        lblForDuePayment.backgroundColor = colorCode.applicationColor
//        lblForPaymentHistory.backgroundColor = .white
//        self.tblViewForPaymentList.reloadData()
    }
    @IBAction func actionForPaymentHistory(_ sender: Any) {
//        self.btnForDuePayment.isSelected = false
//        self.btnForPaymentHistory.isSelected = true
//        self.btnForDuePayment.titleLabel?.textColor = colorCode.unSelectedButtonColor
//        self.btnForPaymentHistory.titleLabel?.textColor = colorCode.selectedButtonColor
//        lblForDuePayment.backgroundColor = .white
//        lblForPaymentHistory.backgroundColor = colorCode.applicationColor
//        self.tblViewForPaymentList.reloadData()
    }
    
    //MARK:----- API Calling functions -------
    func apiCallForGetPaymentHistory(){
        let service = PaymentService()
        service.getPaymentHistory(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                self.arrForPaymentHistory = result as? [PaymentHistory]
                self.isFirstLoad = false
                self.tblViewForPaymentList.reloadData()
            }
        }
    }
    
    func apiCallForGetDuePayment(){
        let service = PaymentService()
        service.getDuePaymentAccordingToParent(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                self.arrForDuePayment = result as? [Payment]
                self.isFirstLoad = false
                self.tblViewForPaymentList.reloadData()
            }
        }
    }
}

//MARK:------ UITableView Delegates and DataSources -----
extension PaymentHistoryVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
         return UITableView.automaticDimension
     }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch section {
        case 0:
            return "Due Payment"
        default:
            return "Payment History"
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if isFirstLoad {
            return 0
        } else {
            switch section {
            case 0:
                return (self.arrForDuePayment?.count ?? 0) == 0 ? 1 : (self.arrForDuePayment?.count ?? 0)
            default:
                return (self.arrForPaymentHistory?.count ?? 0) == 0 ? 1 : (self.arrForPaymentHistory?.count ?? 0)
            }
            
            //            return self.btnForDuePayment.isSelected ? (self.arrForDuePayment?.count ?? 0) == 0 ? 1 : (self.arrForDuePayment?.count ?? 0) : (self.arrForPaymentHistory?.count ?? 0) == 0 ? 1 : (self.arrForPaymentHistory?.count ?? 0)
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        if self.btnForDuePayment.isSelected {
        if indexPath.section == 0 {
            return (self.arrForDuePayment?.count ?? 0) == 0 ? CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForPaymentList) : customDuePaymentListTableViewCell(tableView:tableView,indexPath:indexPath)
        } else {
            return  (self.arrForPaymentHistory?.count ?? 0) == 0 ? CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForPaymentList) :  customPaymentHistoryTableViewCell(tableView:tableView,indexPath:indexPath)
        }
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 {
            if ((AppInstance.shared.user?.isStripeAccount ?? false) && (AppInstance.shared.user?.isSubscriptionActive ?? false)) {
                if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.PaymentVC) as? PaymentVC {
                    vc.payment = self.arrForDuePayment?[indexPath.row]
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            } else {
                self.showAlert(with: Macros.alertMessages.paymentAlert)
            }
        }
    }
    
    func customDuePaymentListTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = self.tblViewForPaymentList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DuePaymentListTableViewCell) as? DuePaymentListTableViewCell{
            guard let paymentDetail = self.arrForDuePayment?[indexPath.row] else { return UITableViewCell() }
            cell.lblForName.text = paymentDetail.studentNames //self.arrForDuePayment?[indexPath.row].studentName
            var dueAmount = (paymentDetail.amount ?? 0) - (paymentDetail.debitAmount ?? 0)
            if dueAmount < 0 {
                dueAmount = 0
            }
            cell.lblForPayment.text =  "$\(dueAmount)"
//            cell.lblForDate.text =  (CommonClassMethods.dateFromDateStringS(date: self.arrForDuePayment?[indexPath.row].invoiceFromDate ?? ""))+" - "+(CommonClassMethods.dateFromDateStringS(date: self.arrForDuePayment?[indexPath.row].invoiceToDate ?? ""))
//            cell.lblForClassName.text = self.arrForDuePayment?[indexPath.row].className
            return cell
        }
        return UITableViewCell()
    }
    
    func customPaymentHistoryTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = self.tblViewForPaymentList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PaymentListTableViewCell) as? PaymentListTableViewCell{
            cell.lblForDateMonth.text = CommonClassMethods.dateFromDateStringS(date: self.arrForPaymentHistory?[indexPath.row].createdDate ?? "")
            cell.lblForPaymentAmt.text = "$\(self.arrForPaymentHistory?[indexPath.row].totalAmount ?? 0.0)"
            cell.lblForWeekDate.text = (CommonClassMethods.dateFromDateStringS(date: self.arrForPaymentHistory?[indexPath.row].paymentFromDate ?? ""))+" - "+(CommonClassMethods.dateFromDateStringS(date: self.arrForPaymentHistory?[indexPath.row].paymentToDate ?? ""))
            cell.lblForStudentName.text = self.arrForPaymentHistory?[indexPath.row].studentName
            cell.lblForClassName.text = self.arrForPaymentHistory?[indexPath.row].className
            return cell
        }
        return UITableViewCell()
    }
}



//MARK:----- UITable View Cell -----
class PaymentListTableViewCell:UITableViewCell{
    @IBOutlet weak var lblForDateMonth: UILabel!
    @IBOutlet weak var lblForPaymentAmt: UILabel!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForWeekDate: UILabel!
    @IBOutlet weak var lblForClassName: UILabel!
}

class DuePaymentListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForPayment: UILabel!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
}

