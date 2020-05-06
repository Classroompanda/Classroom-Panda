//
//  EnrollmentHistoryVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 15/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage
import DropDown

class EnrollmentHistoryVC: BaseViewController {
    @IBOutlet weak var tblViewforEnrollmentHistory: UITableView!
    var arrForChildEnrollment : [Enrollment] = []
    var arrForClasses:[Class]?
    var isFirstLoad:Bool = true
    var refreshControl = UIRefreshControl()
//    var dropDownforStudent = DropDown()
    @IBOutlet weak var btnForAddEnrollment: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
         self.btnForAddEnrollment.isHidden = (AppInstance.shared.user?.isGaurdian ?? false)
        self.tblViewforEnrollmentHistory.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        self.apiCallForGetAllClassList()
        self.initialSetup()
        // Do any additional setup after loading the view.
    }
    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetChildEnrollmetList()
    }
    
    @objc func actionForOpenDropdown(sender: UIButton){
        self.setupDropDown(sender: sender)
        dropDownforStudent.show()
    }
    
    @IBAction func actionForEnrollChild(_ sender: UIButton){
        self.openEnrollStudentPopup()
    }
    //MARK:------ Functions ------
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationBarTitle.EnrollmentHistory)
        if (AppInstance.shared.selectedChild != nil) {
            self.setupChildListMenu()
            apiForGetChildEnrollmetList()
        } else {
            (isFirstLoad = false)
        }
        refreshControl.attributedTitle = NSAttributedString(string: Macros.ControllerString.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        tblViewforEnrollmentHistory.addSubview(refreshControl)
    }
    
    func setupChildListMenu(){
        let studentImgbutton = UIButton(type: .custom)
        studentImgbutton.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
        let imageView = UIImageView()
        imageView.sd_setImage(with: URL(string: AppInstance.shared.selectedChild?.imagePath ?? "")) { (image, error, imageType, url) in
            let image = imageView.image ?? UIImage(named: "placeholder")!
            UIGraphicsBeginImageContextWithOptions(studentImgbutton.frame.size, false, image.scale)
            let rect  = CGRect(x:0, y:0, width: studentImgbutton.frame.size.width, height: studentImgbutton.frame.size.height)
            UIBezierPath(roundedRect: rect, cornerRadius: rect.width/2).addClip()
            image.draw(in: rect)
            if let newImage = UIGraphicsGetImageFromCurrentImageContext() {
                UIGraphicsEndImageContext()
                studentImgbutton.setImage(newImage, for: .normal)
            }
        }
        studentImgbutton.cornerRadius = studentImgbutton.frame.bounds.width/2
        studentImgbutton.clipsToBounds = true
        studentImgbutton.layer.masksToBounds = true
        studentImgbutton.imageView?.contentMode = .scaleAspectFill
        studentImgbutton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item1 = UIBarButtonItem(customView: studentImgbutton)

        let dropdownButton = UIButton(type: .custom)
        dropdownButton.setImage(UIImage(named: "dropdown"), for: .normal)
        dropdownButton.frame = CGRect(x: 0, y: -15, width: 30, height: 30)
        dropdownButton.clipsToBounds = true
        dropdownButton.layer.masksToBounds = true
        dropdownButton.imageView?.contentMode = .scaleAspectFit
        dropdownButton.addTarget(self, action: #selector(self.actionForOpenDropdown), for: .touchUpInside)
        let item2 = UIBarButtonItem(customView: dropdownButton)
        self.navigationItem.setRightBarButtonItems([item2,item1], animated: true)
    }


    func setupDropDown(sender: Any){
        var arrForChildName:[String]   =   []
        for child in AppInstance.shared.arrForChild ?? [] {
            arrForChildName.append(child.studentName ?? "")
        }
        dropDownforStudent.anchorView = sender as? UIButton ?? UIButton()
        dropDownforStudent.bottomOffset = CGPoint(x: 0, y: 30 )
        dropDownforStudent.width = 200.0
        dropDownforStudent.dataSource = arrForChildName
        dropDownforStudent.cellHeight = 50
        dropDownforStudent.cellNib = UINib(nibName: Macros.Identifiers.Cells.DropdownStudentTableViewCell, bundle: nil)
        dropDownforStudent.customCellConfiguration = { (index: Index, item: String, cell: DropDownCell) -> Void in
            guard let cell = cell as? DropdownStudentTableViewCell else { return }
            cell.imgViewForStudent.sd_setShowActivityIndicatorView(true)
            cell.imgViewForStudent.sd_setIndicatorStyle(.gray)
            cell.optionLabel.font = fonts.customButtonFont
            cell.optionLabel.textColor = colorCode.grayShadeColor
            cell.imgViewForStudent.sd_setImage(with: URL(string: AppInstance.shared.arrForChild?[index].imagePath ?? ""), completed: { (image, error, imagetype, url) in
                if error != nil {
                    cell.imgViewForStudent.image = UIImage(named: "placeholder")
                }
            })
        }
        dropDownforStudent.selectionAction = {[weak self] (index, item) in
            AppInstance.shared.selectedChild = AppInstance.shared.arrForChild?[index]
            self?.setupChildListMenu()
            self?.apiForGetChildEnrollmetList()
        }
    }

    func openEnrollStudentPopup(){
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.EnrollStudentVC) as! EnrollStudentVC
        popoverContent.arrForClasses = self.arrForClasses
        popoverContent.delegate = self
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:300,height:440)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //MARK:----- API Calling Function -----
    func apiForGetChildEnrollmetList() {
        let service = DashboardService()
        service.getChildEnrollmentList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, parentID: AppInstance.shared.user?.releventUserID ?? 0, studentId: AppInstance.shared.selectedChild?.studentId ?? 0) { (result) in
            self.isFirstLoad = false
            self.refreshControl.endRefreshing()
            self.arrForChildEnrollment = result as? [Enrollment] ?? []
            self.tblViewforEnrollmentHistory.reloadData()
        }
    }
    
    func apiCallForGetAllClassList(){
        let service = DashboardService()
        service.getAllClasses(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForClasses = result as? [Class]
                self.tblViewforEnrollmentHistory.reloadData()
            }
        }
    }
    
    func apiForSaveChildEnrollment(studentEnrollment:Enrollment) {
        let service = DashboardService()
        service.enrollStudent(with: self, param: studentEnrollment.dictionaryRepresentation()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                studentEnrollment.id = response["saveId"] as? Int
                studentEnrollment.classEnrollStartDate = CommonClassMethods.dateStringFromDate(date: studentEnrollment.enrollmentStartDateee ?? Date())
                if (studentEnrollment.classEnrollEndDate != nil && studentEnrollment.classEnrollEndDate != "") {
                    studentEnrollment.classEnrollEndDate = CommonClassMethods.dateStringFromDate(date: studentEnrollment.enrollmentEndDateee ?? Date())
                }
                self.arrForChildEnrollment.append(studentEnrollment)
                self.tblViewforEnrollmentHistory.reloadData()
            }
        }
    }
}

//MARK:----- TableViewDatasource and TableViewDelegates
extension EnrollmentHistoryVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : ((arrForChildEnrollment.count == 0) ? 1 : arrForChildEnrollment.count)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if arrForChildEnrollment.count != 0 {
            return customEnrollmentListTableViewCell(tableView:tableView,indexPath:indexPath)
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewforEnrollmentHistory)
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //Custom EnrollmentList TableView Cell
    func customEnrollmentListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EnrollmentHistoryTableViewCell) as? EnrollmentHistoryTableViewCell {
            cell.lblForStudentName.text = arrForChildEnrollment[indexPath.row].studentName
            cell.lblForClassName.text = arrForChildEnrollment[indexPath.row].className
            cell.lblForStartDate.text = CommonClassMethods.dateFromDateStringSSS(date: arrForChildEnrollment[indexPath.row].classEnrollStartDate ?? "")
            if arrForChildEnrollment[indexPath.row].classEnrollEndDate == "" || arrForChildEnrollment[indexPath.row].classEnrollEndDate == nil {
                cell.lblForEndDate.text = "---"
            } else {
                cell.lblForEndDate.text = CommonClassMethods.dateFromDateStringSSS(date: arrForChildEnrollment[indexPath.row].classEnrollEndDate ?? "")
            }
            for classes in arrForClasses ?? [] {
                if arrForChildEnrollment[indexPath.row].classesID == classes.classesID {
                    cell.lblForFees.text = "$\(classes.fees ?? 0)"
                }
            }
            
            switch arrForChildEnrollment[indexPath.row].enrollmentStatus {
            case StudentEnrollmentStatus.notEnrolled :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.notEnrolled
            case StudentEnrollmentStatus.requested :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.requested
            case StudentEnrollmentStatus.enrolled :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.enrolled
            case StudentEnrollmentStatus.requestCancelled :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.requestCancelled
            case StudentEnrollmentStatus.deniedByAgency :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.deniedByAgency
            case StudentEnrollmentStatus.completed :
                cell.lblForStatus.text = StudentEnrollmentStatusTitle.completed
            default:
                print("Invalid Case")
            }
            
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- EnrollStudent Delegate ----
extension EnrollmentHistoryVC : EnrollStudentDelegate {
    func submitEnrollStudentAction(studentEnrollment: Enrollment) {
        self.apiForSaveChildEnrollment(studentEnrollment: studentEnrollment)
    }
}

//MARK:----- Add Guardian Popover Delegatge -----
extension EnrollmentHistoryVC : UIPopoverPresentationControllerDelegate {
    
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}

//MARK:----- UITableView Cell-----
class EnrollmentHistoryTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForStartDate: UILabel!
    @IBOutlet weak var lblForEndDate: UILabel!
    @IBOutlet weak var lblForStatus: UILabel!
    @IBOutlet weak var lblForFees: UILabel!
}
