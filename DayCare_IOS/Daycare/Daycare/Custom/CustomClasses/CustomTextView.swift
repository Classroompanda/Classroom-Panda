//
//  CustomTextView.swift
//  Daycare
//
//  Created by amrut waghmare on 21/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import Material

class CustomTextView: TextView {

    override init(frame: CGRect, textContainer: NSTextContainer?) {
        super.init(frame: frame, textContainer: textContainer)
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
//        layoutSetup()
    }
    func layoutSetup() {
        textContainerInset = .init(top: 5, left: 0, bottom: 0, right: 0)
        textContainer.lineFragmentPadding = 10
    }
    
    func setup(){
        self.placeholderColor = .gray
        self.textColor = .black
        self.font = PlatformUtils.isPad ? fonts.textFontForPad : fonts.textFontForPhone
    }
}
