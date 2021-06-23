//
//  CustomLoginButton.swift
//  Daycare
//
//  Created by amrut waghmare on 02/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class CustomButton: UIButton {

    var indexPath : IndexPath?
    override init(frame: CGRect) {
        super.init(frame: frame)  // break point 3
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)  // break point 4
        setup()
    }
    
    func setup() {
        self.backgroundColor = colorCode.applicationColor
        self.titleLabel?.font = fonts.customButtonFont
        self.titleLabel?.textColor = .white
        self.titleLabel?.font = PlatformUtils.isPad ? fonts.customButtonFontForPad : fonts.customButtonFont
        self.tintColor = .white
        self.layer.cornerRadius  = PlatformUtils.isPad ? 30.0 : self.bounds.size.height / 2
        self.layer.masksToBounds = true
        self.isOpaque = true
        self.clipsToBounds = false
        self.shadowColor = .black
        self.shadowRadius = 5
        self.shadowOpacity = 0.3 
        self.shadowOffset = CGSize(width: 0, height: 5)
    }
}
