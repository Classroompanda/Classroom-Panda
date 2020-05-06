//
//  DropDownButtonCell.swift
//  Daycare
//
//  Created by amrut waghmare on 25/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DropDownButtonCell: UITableViewCell {
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var btnForField: UIButton!
    @IBOutlet weak var imgViewForArrow: UIImageView!
    @IBOutlet weak var txtFieldForField: CustomTextField!
    
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
    
    func setupUI(error: String, title: String, index: Int) {
        selectionStyle = .none
        lblForFieldTitle.text = title
       txtFieldForField.error = error
       btnForField.tag = index
       imgViewForArrow.tag = index
       txtFieldForField.tag = index
       btnForField.removeTarget(nil, action: nil, for: .allEvents)
       btnForField.setTitle("Select", for: .normal)
    }
    
}
