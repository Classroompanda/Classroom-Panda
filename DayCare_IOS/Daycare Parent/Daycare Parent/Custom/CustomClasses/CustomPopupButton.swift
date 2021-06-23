//
//  CustomPopupButton.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 19/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

@IBDesignable class CustomPopupButton: UIButton {

    override init(frame: CGRect) {
        super.init(frame: frame)  // break point 3
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)  // break point 4
        setup()
    }
    
    func setup() {
        self.cornerRadius = 8
        self.titleLabel?.font = fonts.customPopupButtonFont
        self.titleLabel?.textColor = .white
    }

}
