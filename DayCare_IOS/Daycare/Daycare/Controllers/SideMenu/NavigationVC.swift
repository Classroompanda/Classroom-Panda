//
//  NavigationViewController.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class NavigationVC: UINavigationController {
    
    override var shouldAutorotate : Bool {
        return true
    }
    
    override var prefersStatusBarHidden : Bool {
        return false
    }
    
    override var preferredStatusBarStyle : UIStatusBarStyle {
        return .lightContent
    }
    
    override var preferredStatusBarUpdateAnimation : UIStatusBarAnimation {
        return (sideMenuController?.isRightViewVisible)! ? .slide : .fade
    }
    
}
