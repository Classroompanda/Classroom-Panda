//
//  SignupFooterTVC.swift
//  Daycare Parent
//
//  Created by Kiran Thakur on 15/04/2020.
//  Copyright © 2020 amrut waghmare. All rights reserved.
//

import UIKit

class SignupFooterTVC: UITableViewCell {
    
    @IBOutlet weak var signupButton: UIButton!
    @IBOutlet weak var loginButton: UIButton!

    override func awakeFromNib() {
        super.awakeFromNib()
        underlineButtonText(button: loginButton)
        // Initialization code
    }
    
    func underlineButtonText(button: UIButton) {
        let underlineAttribute = [NSAttributedString.Key.underlineStyle: NSUnderlineStyle.single.rawValue , NSAttributedString.Key.font :  PlatformUtils.isPad ? (fonts.customButtonFontForPad ?? UIFont.systemFont(ofSize: 20)) : (fonts.customButtonFont ?? UIFont.systemFont(ofSize: 15)), NSAttributedString.Key.foregroundColor : colorCode.grayShadeColor] as [NSAttributedString.Key : Any]
        let buttonTitle = button.title(for: .normal) ?? ""
        let underlineAttributedString = NSAttributedString(string: buttonTitle, attributes: underlineAttribute)
        button.setAttributedTitle(underlineAttributedString, for: .normal)
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
