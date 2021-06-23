//
//  LeftSideMenuHeaderCell.swift
//  Daycare
//
//  Created by amrut waghmare on 04/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

class LeftSideMenuHeaderCell: UITableViewCell {

    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForEmail: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForProfile.cornerRadius = imgViewForProfile.bounds.width / 2
//        imgViewForProfile.clipsToBounds = true
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
}

