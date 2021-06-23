//
//  ProfileHeaderCell.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 08/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ProfileHeaderCell: UITableViewCell {
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var optionStackView: UIStackView!
    @IBOutlet weak var btnForSelectImage: UIButton!
    @IBOutlet weak var guardianButton: UIButton!
    @IBOutlet weak var parentButton: UIButton!
    @IBOutlet weak var heightForView: NSLayoutConstraint!
    override func awakeFromNib() {
        super.awakeFromNib()
        btnForSelectImage.cornerRadius = PlatformUtils.isPad ? 25 : 15
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 65 : 45
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
