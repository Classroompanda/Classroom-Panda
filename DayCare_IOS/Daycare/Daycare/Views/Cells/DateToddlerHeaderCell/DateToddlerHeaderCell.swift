//
//  DateToddlerHeaderCell.swift
//  Daycare
//
//  Created by amrut waghmare on 06/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class DateToddlerHeaderCell: UITableViewCell {

    @IBOutlet weak var btnForCalender: UIButton!
    @IBOutlet weak var lblForDay: UILabel!
    @IBOutlet weak var lblForMonthYear: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var btnForToddler: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
