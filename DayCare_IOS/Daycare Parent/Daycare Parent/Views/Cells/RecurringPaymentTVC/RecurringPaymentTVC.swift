//
//  RecurringPaymentTVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 22/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

enum RecurringFrequency: Int {
    case Weekly = 1
    case Monthly
    
    func description() -> String {
         switch self {
         case .Weekly: return "Weekly"
         case .Monthly: return "Monthly"
         }
     }
}


class RecurringPaymentTVC: UITableViewCell {

    @IBOutlet weak var amountLabel: UILabel!
    @IBOutlet weak var frequencyLabel: UILabel!
    @IBOutlet weak var firstPaymentDateLabel: UILabel!
    @IBOutlet weak var nextPaymentDateLabel: UILabel!
    @IBOutlet weak var paymentStartDateLabel: UILabel!
    @IBOutlet weak var paymentEndDateLabel: UILabel!
    static let ongoingPaymentEndDate = "01 Jan 2080"

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func setRecurringPaymentData(recurringPaymentDetail: Payment) {
        amountLabel.text = "\(recurringPaymentDetail.amount ?? 0)"
        switch recurringPaymentDetail.billingCycle {
        case RecurringFrequency.Weekly.rawValue:
            frequencyLabel.text = RecurringFrequency.Weekly.description()
        default:
            frequencyLabel.text = RecurringFrequency.Monthly.description()
        }
        firstPaymentDateLabel.text = CommonClassMethods.dateFromDateStringSSS(date: recurringPaymentDetail.firstPaymentDate ?? "")
        nextPaymentDateLabel.text = CommonClassMethods.dateFromDateStringSSS(date: recurringPaymentDetail.nextPaymentDate ?? "")
        paymentStartDateLabel.text = CommonClassMethods.dateFromDateStringSSS(date: recurringPaymentDetail.paymentFromDate ?? "")
        let paymentToDate = CommonClassMethods.dateFromDateStringSSS(date: recurringPaymentDetail.paymentToDate ?? "")
        if  paymentToDate == RecurringPaymentTVC.ongoingPaymentEndDate {
            paymentEndDateLabel.text = "On Going"
        } else {
            paymentEndDateLabel.text = CommonClassMethods.dateFromDateStringSSS(date: recurringPaymentDetail.paymentToDate ?? "")
        }
    }
}
