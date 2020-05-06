//
//  DropDownTextFieldTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 01/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class DropDownTextFieldTableViewCell: UITableViewCell {
    @IBOutlet weak var txtFieldForField: CustomTextField!
    @IBOutlet weak var btnForField: UIButton!
    @IBOutlet weak var imgViewForArrow: UIImageView!
    @IBOutlet weak var lblForFieldTitle: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        self.backgroundColor = .clear
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    func setupUIForDatePicker() {
       txtFieldForField.isEnabled = false
       imgViewForArrow.isHidden = false
       btnForField.isHidden = false
       txtFieldForField.dividerColor = colorCode.applicationColor
    }
    
    func setupUI(error: String, title: String, index: Int) {
        selectionStyle = .none
        txtFieldForField.placeholder = title
        txtFieldForField.error = error
        lblForFieldTitle.isHidden = true
        txtFieldForField.tag = index
        btnForField.tag = index
        imgViewForArrow.isHidden = true
        btnForField.isHidden = true
        txtFieldForField.keyboardType = .default
        lblForFieldTitle.isHidden = true
    }
    
}
