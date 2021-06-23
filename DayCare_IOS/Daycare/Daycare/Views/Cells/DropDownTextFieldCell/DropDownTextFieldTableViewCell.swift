//
//  DropDownTextFieldTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 01/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DropDownTextFieldTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var txtFieldForField: CustomTextField!
    @IBOutlet weak var btnForField: UIButton!
    @IBOutlet weak var imgViewForArrow: UIImageView!
    @IBOutlet weak var lblForSelectedItems: UILabel!
    @IBOutlet weak var ViewForSelectedItems: UIView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        lblForFieldTitle.font = UIDevice.current.userInterfaceIdiom == .pad ? fonts.customLoginButtonPadFont : fonts.customLoginButtonFont
        
        self.backgroundColor = .clear
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
