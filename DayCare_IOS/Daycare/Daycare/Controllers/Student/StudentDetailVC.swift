//
//  StudentDetailVC.swift
//  Daycare
//
//  Created by amrut waghmare on 26/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage

class StudentDetailVC: BaseViewController {

    @IBOutlet weak var imgViewForStudent: UIImageView!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var lblForAddress: UILabel!
    @IBOutlet weak var lblForPostalCode: UILabel!
    @IBOutlet weak var collectionViewForTab: UICollectionView!
    @IBOutlet weak var tblForDetail: UITableView!
    @IBOutlet weak var activityIndicatorForProfilePic: UIActivityIndicatorView!
    
    var selectedStudent:Student?
    var studentInformation:Student?
    var tableIndex = 0
    var firstLaunch:Bool?
    var isFirstLoad:Bool = true
    
    lazy var imagePickerVC = ImagePickerVC()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        tblForDetail.rowHeight = UITableView.automaticDimension
        apiForGetStudentInformation()
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    override func viewWillAppear(_ animated: Bool) {
        firstLaunch = true
        self.navigationController?.navigationBar.setValue(true, forKey: "hidesShadow")
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.StudentDetail)
        imgViewForStudent.cornerRadius = imgViewForStudent.bounds.height/2
    }
    
    //MARK:----- Function -----
    func initialSetup(){
        tblForDetail.tableFooterView = UIView()
        collectionViewForTab.allowsMultipleSelection = false
        lblForName.text = selectedStudent?.studentName ?? ""
        lblForAddress.text = "\(selectedStudent?.address ?? ""), \(selectedStudent?.cityName ?? "")"
        lblForPostalCode.text = selectedStudent?.postalCode ?? ""
        imgViewForStudent.sd_imageIndicator = SDWebImageActivityIndicator.gray

//        imgViewForStudent.sd_setShowActivityIndicatorView(true)
//        imgViewForStudent.sd_setIndicatorStyle(.gray)
        imgViewForStudent.sd_setImage(with: URL(string: selectedStudent?.imagePath ?? "")) { (image, error, type, url) in
            if error != nil {
                self.imgViewForStudent.image = UIImage(named: "placeholder")
            }
        }
        imgViewForStudent.addTapGestureRecognizer {
            self.actionStudentProfileSelection()
        }
    }
    
    func actionStudentProfileSelection(){
        imagePickerVC.openSingleImagePicker(target: self) { (image) in
            self.apiCallForSaveImages(image: image)
        }
    }
    
    //MARK:----- API Calling Function -----
    func apiForGetStudentInformation(){
        let service = StudentService()
        service.getStudentInformation(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: self.selectedStudent?.studentId ?? 0, parentID: self.selectedStudent?.parentID ?? 0) { (result) in
            self.studentInformation = result as? Student
            self.isFirstLoad = false
            self.tblForDetail.reloadData()
        }
    }
    func apiCallForSaveImages(image: UIImage){
        activityIndicatorForProfilePic.startAnimating()
        let service = PostActivityService()
        service.uploadImageVideos(with: nil, imgArray: [image], videoURL: nil) { (result) in
            if result != nil {
                if let urlString = (result as? [String])?.first {
                self.apiCallForUpdateStudentProfilePicture(imageURL: urlString)
                }
            }
        }
    }
    func apiCallForUpdateStudentProfilePicture(imageURL:String){
        let service = StudentService()
        service.updateStudetProfile(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: self.selectedStudent?.studentId ?? 0, imagePath: imageURL) { (result) in
            
            self.selectedStudent?.imagePath = imageURL
            self.imgViewForStudent.sd_setImage(with: URL(string: imageURL)) { (image, error, type, url) in
                self.activityIndicatorForProfilePic.stopAnimating()
                if error != nil {
                    self.imgViewForStudent.image = UIImage(named: "placeholder")
                }
            }
        }
    }
}

//MARK:----- UITableView Datasource and Delegates -----
extension StudentDetailVC:UITableViewDelegate,UITableViewDataSource{
    
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
           return UITableView.automaticDimension
       }
     
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if isFirstLoad {
            return 0
        } else {
            switch tableIndex {
            case 0:
                return 1
            case 1:
                return (self.studentInformation?.guardians?.count ?? 0 == 0) ? 1 : (self.studentInformation?.guardians?.count ?? 0)
            case 2:
                return 4
            default:
                return 0
            }
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch tableIndex {
        case 0:
            return customStudentDetailTableViewCell(tableView:tableView,indexPath:indexPath)
        case 1:
            if self.studentInformation?.guardians?.count ?? 0 == 0 {
                return customNoRecordFoundTableViewCell(tableView:tableView,indexPath:indexPath, titleLable: "", count: 0)
            } else {
                return customGuardianListTableViewCell(tableView:tableView,indexPath:indexPath)
            }
        case 2:
            switch indexPath.row {
            case 0:
                return customNoRecordFoundTableViewCell(tableView:tableView,indexPath:indexPath, titleLable: Macros.ControllerStrings.StudentDetailVC.Immunization, count: self.studentInformation?.studentImmunizations?.count ?? 0)
            case 1:
                return customNoRecordFoundTableViewCell(tableView:tableView,indexPath:indexPath, titleLable: Macros.ControllerStrings.StudentDetailVC.Allergies, count: self.studentInformation?.studentAllergies?.count ?? 0)
            case 2 :
                return customNoRecordFoundTableViewCell(tableView:tableView,indexPath:indexPath, titleLable: Macros.ControllerStrings.StudentDetailVC.Medication, count: self.studentInformation?.studentMedications?.count ?? 0)
            default :
                return customNoRecordFoundTableViewCell(tableView:tableView,indexPath:indexPath, titleLable: Macros.ControllerStrings.StudentDetailVC.Disability, count: self.studentInformation?.studentDisabilities?.count ?? 0)
            }
        default:
            return UITableViewCell()
        }
    }
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        switch tableIndex {
        case 0:
            return 466
        case 1:
            return UITableView.automaticDimension
        case 2:
            return 90
        default:
            return 0
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if tableIndex == 2 {
            if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.StudentHealthDescriptionVC) as? StudentHealthDescriptionVC {
                vc.student = self.studentInformation
                switch indexPath.row {
                case 0:
                    vc.healthDescriptionStatus = HealthDecriptionStatus.Immunization
                    if self.studentInformation?.studentImmunizations?.count ?? 0 > 0 {
                        self.navigationController?.pushViewController(vc, animated: true)
                    }
                case 1:
                    vc.healthDescriptionStatus = HealthDecriptionStatus.Allergies
                    if self.studentInformation?.studentAllergies?.count ?? 0 > 0 {
                        self.navigationController?.pushViewController(vc, animated: true)
                    }
                case 2 :
                    vc.healthDescriptionStatus = HealthDecriptionStatus.Medication
                    if self.studentInformation?.studentMedications?.count ?? 0 > 0 {
                        self.navigationController?.pushViewController(vc, animated: true)
                    }
                default :
                    vc.healthDescriptionStatus = HealthDecriptionStatus.Disability
                    if self.studentInformation?.studentDisabilities?.count ?? 0 > 0 {
                        self.navigationController?.pushViewController(vc, animated: true)
                    }
                }
            }
        }
    }
    //Custom Student Detail Cell
    func customStudentDetailTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.StudentDetailTableViewCell, for: indexPath) as? StudentDetailTableViewCell {
            cell.lblForUsername.text = studentInformation?.studentName ?? ""
            cell.lblForParentName.text = studentInformation?.parentName ?? ""
            cell.lblForEmail.text = (studentInformation?.parentEmailAddress ?? "") == "" ? "---" : (studentInformation?.parentEmailAddress ?? "")
            cell.lblForGender.text = ((studentInformation?.genderID ?? 1) == 1) ? "Boy" : "Girl"
            cell.lblForMobileNo.text = String(studentInformation?.parentContactNumber ?? 0) == "0" ? "---" : String(studentInformation?.parentContactNumber ?? 0)
            cell.lblForDob.text = CommonClassMethods.dateFromDateString(date: studentInformation?.dateOfBirth ?? "")
            cell.childNotesTextView.text = studentInformation?.childNotes ?? ""
            cell.childStartDateLabel.text = CommonClassMethods.dateFromDateString(date: studentInformation?.childStartDate ?? "")
            cell.physicianNameLabel.text = studentInformation?.physicianName ?? ""
            cell.physicianAddressLabel.text = studentInformation?.physicianAddress
            cell.physicianContactNumberLabel.text = "\(studentInformation?.physicianContactNumber ?? 0)"

            return cell
        }
        return UITableViewCell()
    }
    
    //Custom Guardian List Cell
    func customGuardianListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.GuardianListTableViewCell, for: indexPath) as? GuardianListTableViewCell {
            cell.lblForName.text = self.studentInformation?.guardians?[indexPath.row].guardianName ?? ""
            cell.lblForRelation.text = self.studentInformation?.guardians?[indexPath.row].relationTypeName ?? ""
            cell.lblForMobileNo.text = String(self.studentInformation?.guardians?[indexPath.row].mobile ?? 0)
            cell.imgViewForGuardian.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imgViewForGuardian.sd_setShowActivityIndicatorView(true)
//            cell.imgViewForGuardian.sd_setIndicatorStyle(.gray)
            cell.imgViewForGuardian.sd_setImage(with: URL(string: self.studentInformation?.guardians?[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForGuardian.image = UIImage(named: "placeholder")
                }
            }
            if self.studentInformation?.guardians?[indexPath.row].isAuthorizedToPickup ?? false {
                cell.lblForPickupPermission.text = Macros.ControllerStrings.StudentDetailVC.PickupAllowed
                cell.lblForPickupPermission.textColor = colorCode.applicationColor
            } else {
                cell.lblForPickupPermission.text = Macros.ControllerStrings.StudentDetailVC.PickupNotAllowed
                cell.lblForPickupPermission.textColor = colorCode.checkOutColor
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //Custom NO Record Found Cell
    func customNoRecordFoundTableViewCell(tableView:UITableView,indexPath:IndexPath,titleLable:String,count:Int) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.NoRecordFoundTableViewCell, for: indexPath) as? NoRecordFoundTableViewCell {
            cell.lblForTitle.text = titleLable
            (count == 0) ? (cell.lblForRecordAvailable.text = Macros.ControllerStrings.StudentDetailVC.NoRecordAvailable) : ( cell.lblForRecordAvailable.text = "\(String(count)) \(Macros.ControllerStrings.StudentDetailVC.RecordAvailable)")
            
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView DataSource and Delegates -----
extension StudentDetailVC:UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return Macros.ConstantArray.arrForStudentsDetilTabs.count
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.row == 2{
            return CGSize(width: 195.0, height: 44.0)
        }else{
            return CGSize(width: 140.0, height: 44.0)
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.StudentDetailCollectionViewCell, for: indexPath) as?  StudentDetailCollectionViewCell {
            cell.lblForName.text = Macros.ConstantArray.arrForStudentsDetilTabs[indexPath.row]
            if firstLaunch ?? false {
                if indexPath.item == 0 {
                    cell.isSelected = true
                } else {
                    cell.isSelected = false
                }
            }
            return cell
        }
        return UICollectionViewCell()
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        self.firstLaunch = false
        if indexPath.item != 0{
            collectionView.reloadItems(at: [IndexPath(item: 0, section: 0)])
        }
        if indexPath.item == 2{
            collectionView.scrollToItem(at: indexPath, at: .left, animated: true)
        }else if indexPath.item == 0{
            collectionView.scrollToItem(at: indexPath, at: .right, animated: true)
        }
        self.tableIndex = indexPath.row
        tblForDetail.reloadData()
    }
}

//MARK:----- Student Detail CollectionView Cell -----
class StudentDetailCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var lblForName           : UILabel!
    @IBOutlet weak var lblForSelectionColor : UILabel!
    
    override var isSelected: Bool{
        didSet{
            if isSelected{
                self.lblForSelectionColor.backgroundColor = colorCode.applicationColor
                self.lblForName.textColor = colorCode.selectedButtonColor
            }else{
                self.lblForSelectionColor.backgroundColor = UIColor.white
                self.lblForName.textColor = colorCode.unSelectedButtonColor
            }
        }
    }
}

//MARK:----- Student Detail TableView Cell -----
class StudentDetailTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForUsername: UILabel!
    @IBOutlet weak var lblForDob: UILabel!
    @IBOutlet weak var lblForParentName: UILabel!
    @IBOutlet weak var lblForGender: UILabel!
    @IBOutlet weak var lblForEmail: UILabel!
    @IBOutlet weak var lblForMobileNo: UILabel!
    @IBOutlet weak var childStartDateLabel: UILabel!
    @IBOutlet weak var childNotesTextView: UITextView!
    @IBOutlet weak var physicianNameLabel: UILabel!
    @IBOutlet weak var physicianContactNumberLabel: UILabel!
    @IBOutlet weak var physicianAddressLabel: UILabel!

}

//MARK:----- Guardian List TableView Cell -----
class GuardianListTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForGuardian: UIImageView!
    @IBOutlet weak var lblForPickupPermission: UILabel!
    @IBOutlet weak var lblForMobileNo: UILabel!
    @IBOutlet weak var lblForRelation: UILabel!
    @IBOutlet weak var lblForName: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
    }
}

//MARK:----- No Record Found TableView Cell -----
class NoRecordFoundTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForRecordAvailable: UILabel!
}
