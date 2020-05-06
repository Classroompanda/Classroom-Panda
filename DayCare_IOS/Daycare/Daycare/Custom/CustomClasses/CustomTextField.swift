//
//  CustomTextField.swift
//  Daycare
//
//  Created by amrut waghmare on 30/11/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import Material

class CustomTextField: ErrorTextField {

    override init(frame: CGRect) {
        super.init(frame: frame)  // break point 3
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)  // break point 4
        setup()
    }
    
    func setup() {
        self.placeholderNormalColor = .gray
        self.textColor = .black
        self.font = PlatformUtils.isPad ? fonts.textFontForPad : fonts.textFontForPhone
    }
}
