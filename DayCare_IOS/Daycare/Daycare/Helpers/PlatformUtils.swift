//
//  PlatformUtils.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import Foundation

struct PlatformUtils {
    static let isSimulator: Bool = {
        var isSim = false
        #if arch(i386) || arch(x86_64)
        isSim = true
        #endif
        return isSim
    }()
    
    static let isPad:Bool = {
        return UIDevice.current.userInterfaceIdiom == .pad
    }()
}
