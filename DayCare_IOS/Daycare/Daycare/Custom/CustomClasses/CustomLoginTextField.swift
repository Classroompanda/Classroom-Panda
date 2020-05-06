//
//  CustomLoginTextField.swift
//  Daycare
//
//  Created by amrut waghmare on 20/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import Material

class CustomLoginTextField: ErrorTextField {
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
        self.leftViewOffset = -30
        self.leftViewMode = .always
    }
    var inset:CGFloat = 30  // You can set the inset you want
    
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        
        return bounds.insetBy(dx: inset, dy: 0)
    }
    
    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        
        return bounds.insetBy(dx: inset, dy: 0)
    }
}
