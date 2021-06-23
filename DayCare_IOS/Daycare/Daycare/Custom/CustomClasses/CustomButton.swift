//
//  CustomButton.swift
//  Daycare
//
//  Created by amrut waghmare on 30/11/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

@IBDesignable class CustomButton: UIButton {
    
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
        self.cornerRadius = 8
        self.titleLabel?.font = fonts.customButtonFont
        self.titleLabel?.textColor = .white
        self.titleLabel?.font = UIDevice.current.userInterfaceIdiom == .pad ? fonts.customLoginButtonPadFont : fonts.customLoginButtonFont
    }

}
