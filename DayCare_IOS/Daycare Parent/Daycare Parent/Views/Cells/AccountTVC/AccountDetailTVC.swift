//
//  AccountDetailTVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 21/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

enum VerficationStatus: Int {
    case Pending = 1
    case Verified = 2
    func description() -> String {
          switch self {
          case .Verified: return "Verified"
          case .Pending: return "Verification Pending\n(Please check you bank account for deposits within 24 to 48 hours)"
          }
      }
 }

class AccountDetailTVC: UITableViewCell {

    @IBOutlet weak var parentNameLabel: UILabel!
    @IBOutlet weak var customerIdLabel: UILabel!
    @IBOutlet weak var verificationStatusButton: UIButton!
    @IBOutlet weak var statusView: UIView!

    override func awakeFromNib() {
        super.awakeFromNib()
        verificationStatusButton.titleLabel?.lineBreakMode = .byWordWrapping
        verificationStatusButton.titleLabel?.textAlignment = .left
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func setACHAccountData(accountDetail: ACHAccount) {
        parentNameLabel.text = accountDetail.parentName
        customerIdLabel.text = accountDetail.customerID
        switch accountDetail.status {
        case VerficationStatus.Verified.rawValue:
            verificationStatusButton.setTitle(VerficationStatus.Verified.description(), for: .normal)
            verificationStatusButton.setTitleColor(.green, for: .normal)
        default:
            verificationStatusButton.setTitle(VerficationStatus.Pending.description(), for: .normal)
            verificationStatusButton.setTitleColor(.red, for: .normal)
        }
    }
}
