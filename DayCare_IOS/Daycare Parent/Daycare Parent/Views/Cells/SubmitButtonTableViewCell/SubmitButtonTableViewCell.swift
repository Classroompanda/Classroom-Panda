//
//  SubmitButtonTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 01/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class SubmitButtonTableViewCell: UITableViewCell {
    @IBOutlet weak var btnForSubmit: CustomButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.backgroundColor = .clear
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
