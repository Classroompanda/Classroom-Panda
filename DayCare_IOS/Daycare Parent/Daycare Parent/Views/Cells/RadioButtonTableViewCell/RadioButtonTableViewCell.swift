//
//  RadioButtonTableViewCell.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 08/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class RadioButtonTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var btnForYes: UIButton!
    @IBOutlet weak var btnForNo: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
