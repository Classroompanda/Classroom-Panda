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
        self.placeholderActiveColor = colorCode.applicationColor
        self.dividerActiveColor = colorCode.applicationColor
    }
    
    func setRightViewIcon(icon: UIImage) {
        let btnView = UIButton(frame: CGRect(x: 0, y: 0, width: ((self.frame.height) * 0.70), height: ((self.frame.height) * 0.70)))
        UIImageView.init(image: icon)
        btnView.setImage(icon, for: .normal)
        btnView.imageEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 13)
        self.rightViewMode = .always
        self.rightView = btnView
    }
}
