//
//  TextViewTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 04/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class TextViewTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var txtViewForField: CustomTextView!
    @IBOutlet weak var lblForDivider: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        lblForFieldTitle.font = UIDevice.current.userInterfaceIdiom == .pad ? fonts.customLoginButtonPadFont : fonts.customLoginButtonFont
        self.backgroundColor = .clear
        txtViewForField.delegate = self
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}

//MARK:------ UITextView Delegate -------
extension TextViewTableViewCell: UITextViewDelegate {
    func textViewDidBeginEditing(_ textView: UITextView) {
        lblForDivider.backgroundColor = colorCode.applicationColor
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        lblForDivider.backgroundColor = .darkGray
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        lblForDivider.backgroundColor = colorCode.applicationColor
        return true
    }
}
