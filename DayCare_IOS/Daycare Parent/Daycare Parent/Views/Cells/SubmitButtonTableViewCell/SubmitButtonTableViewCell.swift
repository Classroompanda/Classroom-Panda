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
    @IBOutlet weak var btnForLearningProgram: UIButton!

    override func awakeFromNib() {
        super.awakeFromNib()
        self.backgroundColor = .clear
        btnForLearningProgram.isHidden = true
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
