//
//  DateTimeSelectionTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 28/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DateTimeSelectionTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForLeftTitle  : UILabel!
    @IBOutlet weak var lblForRightTitle : UILabel!
    @IBOutlet weak var txtFieldForleft  : CustomTextField!
    @IBOutlet weak var txtFieldForRight : CustomTextField!
    @IBOutlet weak var viewForRight     : UIView!
    @IBOutlet weak var viewForLeft      : UIView!
   
    override func awakeFromNib() {
        super.awakeFromNib()
        txtFieldForleft.placeholderNormalColor = .gray
        txtFieldForRight.placeholderNormalColor = .gray
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
