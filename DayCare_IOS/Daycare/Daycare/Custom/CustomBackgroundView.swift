//
//  CustomBackgroundView.swift
//  Daycare
//
//  Created by amrut waghmare on 30/11/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

@IBDesignable class CustomBackgroundView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)  // break point 3
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)  // break point 4
        setup()
    }
    
    func setup() {
        self.backgroundColor = UIColor(red: 88.0/255.0, green: 167.0/255.0, blue: 254.0/255.0, alpha: 1.0)
    }
    
}
