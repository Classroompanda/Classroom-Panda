//
//  SideMenuViewController.swift
//  Daycare
//
//  Created by amrut waghmare on 03/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class SideMenuVC: LGSideMenuController {

    override func viewDidLoad() {
        super.viewDidLoad()
        leftViewController          = LeftMenuTableVC()
      delegate = self
        leftViewPresentationStyle   = LGSideMenuPresentationStyle.slideAbove
        self.isLeftViewSwipeGestureEnabled = false
    }
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    
  }
    override func leftViewWillLayoutSubviews(with size: CGSize) {
        super.leftViewWillLayoutSubviews(with: size)
        if !isLeftViewStatusBarHidden {
            leftView?.frame = CGRect(x: 0.0, y: 20.0, width: size.width, height: size.height - 20.0)
        }
    }
    
    override var isLeftViewStatusBarHidden: Bool {
        get {
            return super.isLeftViewStatusBarHidden
        }
        set {
            super.isLeftViewStatusBarHidden = newValue
        }
    }
    
}

extension SideMenuVC : LGSideMenuDelegate
{
  func willShowLeftView(_ leftView: UIView, sideMenuController: LGSideMenuController) {
    self.leftViewController?.showLeftView(nil)
  }
  func willHideLeftView(_ leftView: UIView, sideMenuController: LGSideMenuController) {
    leftViewController?.hideLeftView(nil)
  }
}
