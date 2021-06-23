//
//  TransferStudentPopupVC.swift
//  Daycare
//
//  Created by Amrut Waghmare on 09/09/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import SDWebImage

class TransferStudentPopupVC: UIViewController {
    @IBOutlet weak var imgViewArrow: UIImageView!
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var lblForDayTime: UILabel!
    @IBOutlet weak var txtFieldForClassName: CustomTextField!
    
    var attendance : Attendance?
    var selectedDate: Date?
    var arrClassList:[Class]?
    var selectedClass:Class?
    
    lazy var classesDropdown = DropDown()
    
    typealias typeCompletionHandler = (Int) -> ()
    var okCompletion:typeCompletionHandler = {_ in}
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setup()
        // Do any additional setup after loading the view.
    }
    
    func setup(){
        imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//        imgViewForProfile?.sd_setShowActivityIndicatorView(true)
//        imgViewForProfile?.sd_setIndicatorStyle(.gray)
        imgViewForProfile.sd_setImage(with: URL(string: attendance?.imagePath ?? "")) { (image, error, type, url) in
            if error != nil {
                self.imgViewForProfile.image = UIImage(named: "placeholder")
            }
        }
        lblForName.text = attendance?.studentName
        lblForDate.text = CommonClassMethods.dateFromFormat(date: selectedDate ?? Date())
        lblForDayTime.text = CommonClassMethods.getDayNameWithTime(date: selectedDate ?? Date())
    }
    
    @IBAction func actionForClassSelection(_ sender: UIButton) {
        self.imgViewArrow.image = UIImage(named: "arrowUp")
        let arrForClassName = arrClassList?.map{$0.className ?? ""} ?? []
        classesDropdown.anchorView = sender
        classesDropdown.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        classesDropdown.dataSource = arrForClassName
        classesDropdown.selectionAction = {[weak self] (index, item) in
            self?.imgViewArrow.image = UIImage(named: "arrowDown")
            self?.txtFieldForClassName.text = arrForClassName[index]
            self?.selectedClass = self?.arrClassList?[index]
        }
        classesDropdown.cancelAction = { [unowned self] in
            self.imgViewArrow.image = UIImage(named: "arrowDown")
        }
        classesDropdown.show()
    }
    @IBAction func actionForSave(_ sender: Any) {
        if selectedClass != nil {
            self.dismiss(animated: true, completion: nil)
            self.okCompletion(selectedClass?.classesID ?? 0)
        }
    }
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    
    func show(target:BaseViewController, attendance: Attendance,selectedDate:Date?,arrClass: [Class]?, width:Double,height:Double,index:Int,_ okCompletionHandler: @escaping typeCompletionHandler){
        self.modalPresentationStyle = .popover
        preferredContentSize = CGSize(width: width, height: height)
        okCompletion = okCompletionHandler
        self.attendance = attendance
        self.selectedDate = selectedDate
        self.arrClassList = arrClass
        let popover = self.popoverPresentationController
        popover?.permittedArrowDirections = .init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = target.view
        popover?.sourceRect = CGRect(x: (target.view.center.x-50), y: (target.view.center.y), width: 100.0, height: 100.0)
        target.present(self, animated: true, completion: nil)
    }
}

//MARK:---- Popover delegate ---
extension TransferStudentPopupVC : UIPopoverPresentationControllerDelegate {
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}
