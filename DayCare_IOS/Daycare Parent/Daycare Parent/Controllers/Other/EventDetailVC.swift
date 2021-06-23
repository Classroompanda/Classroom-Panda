 //
//  EventDetailVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 13/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class EventDetailVC: BaseViewController {
    var event: Event?
    
    @IBOutlet weak var tblViewForEventDetails: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.EventDetail)
        self.tblViewForEventDetails.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        // Do any additional setup after loading the view.
    }
}

//MARK:----- UITableView Delegate and Data Sources ------
extension EventDetailVC: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customEventDetailTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    func customEventDetailTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EventDetailsTableViewCell) as? EventDetailsTableViewCell {
            cell.lblForEndDate.text = (CommonClassMethods.dateMonthFromDateString(date: event?.end ?? ""))
            cell.lblForStartDate.text = (CommonClassMethods.dateMonthFromDateString(date: event?.start ?? ""))
            cell.lblForStartTime.text = (CommonClassMethods.timeFromDateString(date: event?.startTime ?? ""))
            cell.lblForEndTime.text = (CommonClassMethods.timeFromDateString(date: event?.endTime ?? ""))
            cell.lblForTitle.text = event?.title
            cell.lblForDescription.text = event?.eventDescription
            if (event?.involvedEventClassesList?.count ?? 0) > 0 {
                let arrForClasses:[String] = event?.involvedEventClassesList?.map { ($0.className ?? "") } ?? []
                let classes = arrForClasses.joined(separator:", ")
                cell.lblForClasses.text = classes
            }
            cell.lblForEndsOn.isHidden = (event?.plannerRepeatTypeID ?? 0) == 1
            cell.lblForEndsOnDate.isHidden = (event?.plannerRepeatTypeID ?? 0) == 1
            cell.lblForRepeat.text = event?.plannerRepeatTypeName
            cell.lblForEndsOnDate.text = (CommonClassMethods.dateMonthFromDateString(date: event?.endsOn ?? ""))
            return cell
        }
        return UITableViewCell()
    }
    
}

//MARK:---- UITableView Cells ----
class EventDetailsTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForStartDate: UILabel!
    @IBOutlet weak var lblForEndDate: UILabel!
    @IBOutlet weak var lblForStartTime: UILabel!
    @IBOutlet weak var lblForEndTime: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForDescription: UILabel!
    @IBOutlet weak var lblForRepeat: UILabel!
    @IBOutlet weak var lblForEndsOnDate: UILabel!
    @IBOutlet weak var lblForEndsOn: UILabel!
    @IBOutlet weak var lblForClasses: UILabel!
    
}
