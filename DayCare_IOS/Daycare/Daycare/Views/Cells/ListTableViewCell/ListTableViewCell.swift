//
//  ListTableViewCell.swift
//  Daycare
//
//  Created by amrut waghmare on 26/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class ListTableViewCell: UITableViewCell {

    @IBOutlet weak var lblForListItem: UILabel!
    @IBOutlet weak var imgViewForSelection: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
