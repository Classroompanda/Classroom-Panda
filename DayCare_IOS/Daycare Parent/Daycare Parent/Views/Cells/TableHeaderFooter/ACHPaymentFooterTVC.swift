//
//  ACHPaymentFooterTVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 20/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class ACHPaymentFooterTVC: UITableViewCell {

    @IBOutlet weak var addButton: UIButton!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
   
    func setupForACHAccount(title: String) {
        addButton.setTitle(title, for: .normal)
        
    }
    
    func setupForSavingData() {
        addButton.setTitle("SAVE", for: .normal)
    }
    
    func setupForRecurringPayments() {
          addButton.setTitle("ADD PAYMENT", for: .normal)
      }
}
