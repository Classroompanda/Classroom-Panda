//
//  AddKidVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 13/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown
import Material
//MARK:----- TeacherBreak Delegate Protocol -----
protocol HealthDescriptionDelegate : class {
    func saveAction(param: Dictionary<String,Any>, healthStatusType: Int, selectedIndex:Int?)
}

class AddKidVC: BaseViewController {
    @IBOutlet weak var collectionViewForTab: UICollectionView!
    @IBOutlet weak var tblViewForAddChild: UITableView!
    @IBOutlet weak var btnForAddGaurdian: UIButton!
    
    var tableIndex = 0
    var firstLaunch:Bool?
    lazy var imagePicker = ImagePickerVC()
    var imgForProfile:UIImage?
    var studentInformation: StudentInformation?
    var child = Child()
    var arrForCountry : [Country]?
    var arrForState : [State]?
    var arrForCities : [City]?
    var arrForGuardian : [Guardian] = []
    var arrForAllergyName : [DropDownModel]?
    var arrForAllergyType : [DropDownModel]?
    var arrForImmunizationType  :   [DropDownModel]?
    var arrForAllergyReactionType : [DropDownModel]?
    var arrForDoesType : [DropDownModel]?
    var arrForAllergies:[Allergies]?
    var arrForImmunization:[Immunization]?
    var arrForMedication:[Medication]?
    var arrForDisability:[Disability]?
    
    let dropDownForCountry = DropDown()
    let dropDownForState = DropDown()
    let dropDownForCity = DropDown()
    var studentName: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tblViewForAddChild.bounces = false
        self.initialSetup()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if self.child.studentId != nil && self.child.studentId
            != 0 {
            self.setNavigationBarWithBackButton(title: self.child.studentName ?? "")
            apiCallForStudentInformation()
        } else {
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.AddChild)
        }
    }
    
    func initialSetup(){
        self.btnForAddGaurdian.isHidden = true
        self.firstLaunch = true
        apiCallForAllergyNameList()
        apiCallForAllergyTypeList()
        apiCallForAllergyReactionTypeList()
        apiCallForImmunizationTypeList()
        apiCallForDoesTypeList()
        if self.child.genderID == nil || child.genderID == 0 {
            child.genderID = Gender.male
        }
        if child.dateOfBirth != nil && child.dateOfBirth != "" {
            child.dateOfBirthh = CommonClassMethods.dateObjectFromDateString(date: child.dateOfBirth ?? "")
        }
        if let childStartDate = child.childStartDateString {
            child.childStartDate = CommonClassMethods.dateObjectFromDateString(date: childStartDate)
            child.childStartDateString = CommonClassMethods.dateFromDateFormat(date: child.childStartDate ??  Date())
        }
        self.apiCallForCountryList()
        if child.countryId != nil && child.countryId != 0 {
            self.apiCallForStateList(countryId: child.countryId ?? 0)
        }
        if child.stateId != nil && child.stateId != 0 {
            self.apiCallForCityList(stateID: child.stateId ?? 0)
        }
    }
    
    @objc func actionForSubmit(_ sender: UIButton){
        if isValidate() {
            imgForProfile != nil ? self.apiCallForSaveImages() : self.apiCallForSaveChildInformation()
        }
    }
    
    @objc func actionForPhotoSelection(_ sender: UIButton){
        resignTextFieldResponder()
        imagePicker.openSingleImagePicker(target: self) { (image) in
            self.imgForProfile = image
            if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: 0, section: 0)) as? AddChildProfileHeaderCell {
                cell.imgViewForChild.image = self.imgForProfile
            }
        }
        
    }
    
    @IBAction func actionForAddGuardian(_ sender: Any) {
        if child.studentId == 0 || child.studentId == nil {
            self.showAlert(with: Macros.alertMessages.addBasicInfo)
        } else {
            let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.AddExistingGuardianVC) as! AddExistingGuardianVC
            vc.child = self.child
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    @objc func actionForGenderSelection(sender: UIButton) {
        resignTextFieldResponder()
        if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: 3, section: 0)) as? GenderSelectionTableViewCell {
            if sender.tag == cell.btnForGirl.tag {
                cell.btnForGirl.isSelected = true
                cell.btnForBoy.isSelected = false
                cell.imgViewForBoy.image = UIImage(named: "boy")
                cell.imgViewForGirl.image = UIImage(named: "girlL")
                self.child.genderID = Gender.female
            } else {
                cell.btnForBoy.isSelected = true
                cell.btnForGirl.isSelected = false
                cell.imgViewForBoy.image = UIImage(named: "boyL")
                cell.imgViewForGirl.image = UIImage(named: "girl")
                self.child.genderID = Gender.male
            }
        }
    }
    
    
    @objc func actionForSelectDate(_ sender: UIButton){
        resignTextFieldResponder()
        let selectedDate = sender.tag == 2 ? child.dateOfBirthh ?? Date() : child.childStartDate ?? Date()
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            if sender.tag == 10 { // childStartDate
                self.child.childStartDate = dateTime
                 self.child.childStartDateString = txtfieldForDate?.text
            } else {
                self.child.dateOfBirth = txtfieldForDate?.text
                self.child.dateOfBirthh = dateTime
            }
            if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                cell.txtFieldForField.isErrorRevealed = false
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        if sender.tag == 2 {
        datePicker?.maximumDate = Date()
        }
        
        datePicker?.show()
    }
    
    @objc func actionForCountryList(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupCountryDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForCountry.show()
    }
    
    @objc func actionForStateList(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupStateDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForState.show()
    }
    
    @objc func actionForCityList(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupCityDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForCity.show()
    }
    
    @objc func actionForOpenPopup(_ sender: UIButton){
        switch sender.tag {
        case 0:
            self.openImmunizationsPopup()
        case 1:
            self.openAlllergiesPopup()
        case 2:
            self.openMedicationPopup()
        default:
            self.openDisabilityPopup()
        }
    }
    
    func actionForDeleteGuardian(indexPath:IndexPath){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.arrForGuardian[indexPath.row].isDeleted = true
                self.arrForGuardian[indexPath.row].deletedBy = AppInstance.shared.user?.releventUserID ?? 0
                self.arrForGuardian[indexPath.row].deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
                self.apiForDeleteGurdianInformation(guardian: self.arrForGuardian[indexPath.row], indexPath: indexPath)
                self.arrForGuardian.remove(at: indexPath.row)
                self.tblViewForAddChild.reloadData()
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    func actionForEditGuardian(indexPath:IndexPath){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Dashboard, vcIdentifire: Macros.Identifiers.Controllers.ProfileVC) as! ProfileVC
        vc.guardian = self.arrForGuardian[indexPath.row]
        vc.isEdited = true
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    //MARK:----- Functions ------
    func alertPromptToAllowCameraAccessViaSettings() {
        let alert = UIAlertController(title: "\(Macros.ApplictionName) \(Macros.alertMessages.cameraPermissionRequestTitle)", message: Macros.alertMessages.cameraPermissionRequst, preferredStyle: .alert )
        alert.addAction(UIAlertAction(title: Macros.alertMessages.openSetting, style: .cancel) { alert in
            if let appSettingsURL = NSURL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(appSettingsURL as URL, options: [:], completionHandler: nil)
            }
        })
        present(alert, animated: true, completion: nil)
    }
    
   
    //DropDown list for country
    func setupCountryDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForCountryName:[String]   =   []
        for country in arrForCountry ?? [] {
            arrForCountryName.append(country.countryName ?? "")
        }
        dropDownForCountry.anchorView = sender
        dropDownForCountry.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForCountry.dataSource = arrForCountryName
        dropDownForCountry.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.child.countryName = self?.arrForCountry?[index].countryName ?? ""
            self?.child.countryId = self?.arrForCountry?[index].id ?? 0
            self?.child.stateId = nil
            self?.child.stateName = nil
            self?.child.cityId = nil
            self?.child.cityName = nil
            self?.arrForCities = []
            self?.arrForState = []
            if let txtfield = self?.view.viewWithTag(5) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
            self?.apiCallForStateList(countryId: self?.arrForCountry?[index].id ?? 0)
        }
        dropDownForCountry.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown list For State
    func setupStateDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForStateName:[String]   =   []
        for state in arrForState ?? [] {
            arrForStateName.append(state.stateName ?? "")
        }
        dropDownForState.anchorView = sender
        dropDownForState.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForState.dataSource = arrForStateName
        dropDownForState.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            //            textField.text = arrForStateName[index]
            self?.child.stateName = self?.arrForState?[index].stateName ?? ""
            self?.child.stateId = self?.arrForState?[index].id ?? 0
            self?.child.cityId = nil
            self?.child.cityName = nil
            self?.arrForCities = []
            if let txtfield = self?.view.viewWithTag(6) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
            self?.apiCallForCityList(stateID: self?.arrForState?[index].id ?? 0)
        }
        dropDownForState.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown list For City
    func setupCityDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForCityName:[String]   =   []
        for city in arrForCities ?? [] {
            arrForCityName.append(city.cityName ?? "")
        }
        dropDownForCity.anchorView = sender
        dropDownForCity.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForCity.dataSource = arrForCityName
        dropDownForCity.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.child.cityName = self?.arrForCities?[index].cityName ?? ""
            self?.child.cityId = self?.arrForCities?[index].id ?? 0
            if let txtfield = self?.view.viewWithTag(7) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
        dropDownForCity.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    func openAlllergiesPopup(){
//        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddAllergiesPopupVC) as! AddAllergiesPopupVC
        popoverContent.delegate = self
        popoverContent.child = self.child
        popoverContent.arrForAllergyName = arrForAllergyName
        popoverContent.arrForAllergyType = arrForAllergyType
        popoverContent.arrForAllergyReactionType = arrForAllergyReactionType
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:(self.view.bounds.height - 100))
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openImmunizationsPopup(){
//        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddImmunizationPopupVC) as! AddImmunizationPopupVC
        popoverContent.delegate = self
        popoverContent.arrForImmunizationType = arrForImmunizationType
        popoverContent.child = self.child
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:440)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openDisabilityPopup(){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddDisabilityPopupVC) as! AddDisabilityPopupVC
        popoverContent.delegate = self
        popoverContent.child = self.child
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:280)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func openMedicationPopup(){
        //        self.view.isUserInteractionEnabled = false
        let storyboard = UIStoryboard.init(name: Macros.Identifiers.Storyboards.Popover, bundle: nil)
        let popoverContent = storyboard.instantiateViewController(withIdentifier: Macros.Identifiers.Controllers.AddMedicationPopupVC) as! AddMedicationPopupVC
        popoverContent.delegate = self
        popoverContent.arrForDoes = self.arrForDoesType
        popoverContent.child = self.child
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.preferredContentSize = CGSize(width:(self.view.bounds.width - 60),height:(self.view.bounds.height - 100))
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75),width:100.0,height:100.0)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func resignTextFieldResponder(){
        let view = self.view.subviews[1] as? UITableView
        for subview in view?.subviews ?? [] where subview is DropDownTextFieldTableViewCell {
            let cell = subview as? DropDownTextFieldTableViewCell
            cell?.txtFieldForField.resignFirstResponder()
        }
        //
        for subview in view?.subviews ?? [] where subview is DateTimeSelectionTableViewCell {
            let cell = subview as? DateTimeSelectionTableViewCell
            cell?.txtFieldForleft.resignFirstResponder()
            cell?.txtFieldForRight.resignFirstResponder()
        }
    }
    
    func isValidate() -> Bool{
        var isValidate = true
        if child.firstName == "" || child.firstName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(334) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }

        } else if child.lastName == "" || child.lastName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(445) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if child.dateOfBirth == "" || child.dateOfBirth == nil {
            isValidate = false
            if let cell = self.view.subviews[1].subviews[2] as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.isErrorRevealed = true
            }
        }  else if child.address == "" || child.address == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(4) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if child.countryName == "" || child.countryName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(5) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if child.stateName == "" || child.stateName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(6) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if child.cityName == "" || child.cityName == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(7) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if child.childsContactNumber == 0 || child.childsContactNumber == nil {
            if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: 9, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.isErrorRevealed = true
                _ = cell.txtFieldForField.becomeFirstResponder()
                isValidate = false
            }
        }
        else if child.childStartDateString == nil || child.childStartDateString == ""  {
            if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: 10, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.isErrorRevealed = true
                _ = cell.txtFieldForField.becomeFirstResponder()
                isValidate = false
            }
        }

        return isValidate
    }
    
    //MARK:---- API Calling Function -----
    
    func apiCallForStudentInformation(){
        let service = ChildService()
        service.getStudentInformation(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: self.child.studentId ?? 0, parentId: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                self.studentInformation = result as? StudentInformation
                self.arrForGuardian = self.studentInformation?.guardians ?? []
                self.arrForAllergies = self.studentInformation?.studentAllergies
                self.arrForImmunization = self.studentInformation?.studentImmunizations
                self.arrForMedication = self.studentInformation?.studentMedications
                self.arrForDisability = self.studentInformation?.studentDisabilities
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForCountryList(){
        let service = ChildService()
        service.getCountryList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForCountry = result as? [Country]
                for country in self.arrForCountry ?? [] {
                    if self.child.countryId == country.id {
                        self.child.countryName = country.countryName
                    }
                }
            }
            self.tblViewForAddChild.reloadData()
        }
    }
    
    func apiCallForStateList(countryId : Int){
        let service = ChildService()
        service.getStateList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, countryID: countryId) { (result) in
            if result != nil {
                self.arrForState = result as? [State]
                for state in self.arrForState ?? [] {
                    if self.child.stateId == state.id {
                        self.child.stateName = state.stateName
                    }
                }
            }
            self.tblViewForAddChild.reloadData()
            if let txtfield = self.view.viewWithTag(5) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
    }
    
    func apiCallForCityList(stateID : Int){
        let service = ChildService()
        service.getCityList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, stateId: stateID) { (result) in
            if result != nil {
                self.arrForCities = result as? [City]
                for city in self.arrForCities ?? [] {
                    if self.child.cityId == city.id {
                        self.child.cityName = city.cityName
                    }
                }
            }
            self.tblViewForAddChild.reloadData()
            if let txtfield = self.view.viewWithTag(6) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
    }
    
    
    
    func apiCallForSaveImages(){
        let service = ChildService()
        service.uploadImageVideos(with: self, imgArray: [imgForProfile ?? UIImage()], videoURL: nil) { (result) in
            if result != nil {
                self.child.imagePath = (result as? [String])?.first
                self.apiCallForSaveChildInformation()
            }
        }
    }
    
    func apiCallForAllergyNameList(){
        let service = ChildService()
        service.getAllergyNamesList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForAllergyName = result as? [DropDownModel]
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForAllergyTypeList(){
        let service = ChildService()
        service.getAllergyTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForAllergyType = result as? [DropDownModel]
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForAllergyReactionTypeList(){
        let service = ChildService()
        service.GetAllergyReactionTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForAllergyReactionType = result as? [DropDownModel]
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForImmunizationTypeList(){
        let service = ChildService()
        service.getImmunizationTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForImmunizationType = result as? [DropDownModel]
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForDoesTypeList(){
        let service = ChildService()
        service.GetAllDosesTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForDoesType = result as? [DropDownModel]
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiCallForSaveChildInformation() {
      self.child.updatedFlag = self.child.updatedFlag
        self.child.id = self.child.studentId ?? 0
        self.child.parentID = AppInstance.shared.user?.releventUserID ?? 0
       self.child.updatedBy = AppInstance.shared.user?.loginUserID ?? 0
        self.child.transportationID = self.child.transportationID ?? 1
        self.child.feePaymentTypeID = self.child.feePaymentTypeID ?? 1
        self.child.studentId = self.child.studentId ?? 0
        self.child.agencyID = AppInstance.shared.user?.agencyID ?? 0
        self.child.dateOfBirth = CommonClassMethods.convertDateToServerReadableFormat(date: self.child.dateOfBirthh ?? Date())
        (self.child.studentId != nil && self.child.studentId
            != 0) ? (self.child.updatedBy = AppInstance.shared.user?.loginUserID) : (self.child.createdBy = AppInstance.shared.user?.loginUserID)
        let service = ChildService()
        service.saveChildData(with: self, param: self.child.dictionaryRepresentation()) { (result) in
            if let response = result as? Dictionary<String,Any> {
                self.child.id = response["saveId"] as? Int
                self.child.studentId = response["saveId"] as? Int
                if (AppInstance.shared.selectedChild == nil) {
                    AppInstance.shared.selectedChild = self.child
                }
                
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: response["message"] as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        break
                    default:
                        break
                    }
                })
            }
        }
    }
    
    func apiForDeleteGurdianInformation(guardian: Guardian,indexPath:IndexPath){
        var dictForParam:[String:Any] = guardian.dictionaryRepresentation()
        dictForParam[Macros.ApiKeys.kIsDeleted] = true
        let service = ChildService()
        service.saveGuardianData(with: self, param: dictForParam) { (result) in
            if result != nil {
                if self.arrForGuardian.count == 0 {
                    self.tblViewForAddChild.reloadData()
                }
            } else {
                self.arrForGuardian.insert(guardian, at: indexPath.row)
                self.tblViewForAddChild.insertRows(at: [indexPath], with: .automatic)
            }
        }
    }
    
    func apiForSaveImmunization(param: Dictionary<String,Any>){
        let service = ChildService()
        service.saveChildImmunizationData(with: self, param: param) { (result) in
            if let response = result as? Dictionary<String,Any> {
                if let immunization =  Immunization.init(dictionary: param) {
                    immunization.id = response["saveId"] as? Int
                    immunization.immunizationID = response["saveId"] as? Int
                    immunization.dateReceived = CommonClassMethods.dateStringFromDate(date: CommonClassMethods.dateObjectFromDateStringS(date: immunization.dateReceived ?? "") ?? Date())
                    self.arrForImmunization?.append(immunization)
                }
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiForSaveAllergies(param: Dictionary<String,Any>){
        let service = ChildService()
        service.saveChildAllergiesData(with: self, param: param) { (result) in
            if let response = result as? Dictionary<String,Any> {
                if let allergy =  Allergies.init(dictionary: param) {
                    allergy.id = response["saveId"] as? Int
                    allergy.studentAllergiesID = response["saveId"] as? Int
                    if allergy.firstAllergyObservation != "" && allergy.firstAllergyObservation != nil {
                        allergy.firstAllergyObservation = CommonClassMethods.dateStringFromDate(date: CommonClassMethods.dateObjectFromDateStringS(date: allergy.firstAllergyObservation ?? "") ?? Date())
                    }
                    if allergy.lastAllergyObservation != "" && allergy.lastAllergyObservation != nil {
                        allergy.lastAllergyObservation = CommonClassMethods.dateStringFromDate(date: CommonClassMethods.dateObjectFromDateStringS(date: allergy.lastAllergyObservation ?? "") ?? Date())
                    }
                    self.arrForAllergies?.append(allergy)
                }
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiForSaveMedication(param: Dictionary<String,Any>){
         let service = ChildService()
        service.saveChildMedicationData(with: self, param: param) { (result) in
            if let response = result as? Dictionary<String,Any> {
                if let medication =  Medication.init(dictionary: param) {
                    medication.id = response["saveId"] as? Int
                    medication.studentMedicationID = response["saveId"] as? Int
                    medication.startDate = CommonClassMethods.dateStringFromDate(date: CommonClassMethods.dateObjectFromDateStringS(date: medication.startDate ?? "") ?? Date())
                    medication.endDate = CommonClassMethods.dateStringFromDate(date: CommonClassMethods.dateObjectFromDateStringS(date: medication.endDate ?? "") ?? Date())
                    self.arrForMedication?.append(medication)
                }
                self.tblViewForAddChild.reloadData()
            }
        }
    }
    
    func apiForSaveDisabilies(param: Dictionary<String,Any>){
        let service = ChildService()
        service.saveChildDisabilityData(with: self, param: param) { (result) in
            if let response = result as? Dictionary<String,Any> {
                if let disability =  Disability.init(dictionary: param) {
                    disability.id = response["saveId"] as? Int
                    self.arrForDisability?.append(disability)
                }
                self.tblViewForAddChild.reloadData()
            }
        }
    }
}

//MARK:----- UITableView Delegates & DataSources ------
extension AddKidVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch tableIndex {
        case 0:
            return 17
        case 1:
            return (self.arrForGuardian.count) == 0 ? 1 : (self.arrForGuardian.count)
        default:
            return Macros.ConstantArray.arrForAllergiesImmunizationTitle.count
        }
        
    }
    
    func customTextViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            if let titleString = Macros.ConstantArray.arrForAddChild[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            cell.txtViewForField.text = self.child.childNote
            return cell
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch tableIndex {
        case 0:
            return setBasicInfoTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return ((self.arrForGuardian.count) == 0) ? CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForAddChild) : customGuardianListTableViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return customAllergiesImmunizationTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    func setBasicInfoTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return customProfileHeaderCell(tableView:tableView,indexPath:indexPath)
        case 1:
            return customTwoTextFieldCell(tableView:tableView,indexPath:indexPath)
        case 3:
            return customGenderSelectionCell(tableView:tableView,indexPath:indexPath)
        case 5,6,7:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        case 15:
            return customTextViewCell(tableView:tableView,indexPath:indexPath)
        case 16:
            return customSubmitButtonCell(tableView:tableView,indexPath:indexPath)
        default:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if tableIndex == 2 {
            let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.StudentHealthDescriptionVC) as! StudentHealthDescriptionVC
            vc.child = self.child
            switch indexPath.row {
            case 0:
                vc.healthDescriptionStatus = HealthDecriptionStatus.Immunization
                if self.arrForImmunization?.count ?? 0 > 0 {
                    vc.arrForImmunizationType = self.arrForImmunizationType
                    vc.arrForImmunization = self.arrForImmunization ?? []
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            case 1:
                vc.healthDescriptionStatus = HealthDecriptionStatus.Allergies
                if self.arrForAllergies?.count ?? 0 > 0 {
                    vc.arrForAllergyName = self.arrForAllergyName
                    vc.arrForAllergyType = self.arrForAllergyType
                    vc.arrForAllergyReactionType    =   self.arrForAllergyReactionType
                    vc.arrForAllergies = self.arrForAllergies ?? []
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            case 2 :
                vc.healthDescriptionStatus = HealthDecriptionStatus.Medication
                if self.arrForMedication?.count ?? 0 > 0 {
                    vc.arrForDoesType = self.arrForDoesType
                    vc.arrForMedication = self.arrForMedication ?? []
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            default :
                vc.healthDescriptionStatus = HealthDecriptionStatus.Disability
                if self.arrForDisability?.count ?? 0 > 0 {
                    vc.arrForDisability = self.arrForDisability ?? []
                    self.navigationController?.pushViewController(vc, animated: true)
                }
            }

        }
    }
    
    @available(iOS 11.0, *)
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
//        let delete =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
//            //do stuff
//            self.actionForDeleteGuardian(indexPath: indexPath)
//            completionHandler(true)
//        })
        let edit =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            //do stuff
            self.actionForEditGuardian(indexPath: indexPath)
            completionHandler(true)
        })
        edit.image = UIImage(named: "editWhite")
        edit.backgroundColor = colorCode.gradientTopColor
//        delete.image = UIImage(named: "delete")
//        delete.backgroundColor = .red
        let confrigation = UISwipeActionsConfiguration(actions: [edit])
        if tableIndex == 1 && self.arrForGuardian.count != 0 {
            return confrigation
        } else {
            return UISwipeActionsConfiguration(actions: [])
        }
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
//        let delete = UITableViewRowAction(style: .destructive, title: "Delete") { (action, indexPath) in
//            self.actionForDeleteGuardian(indexPath: indexPath)
//            // delete item at indexPath
//        }
        let edit = UITableViewRowAction(style: .normal, title: "Edit") { (action, indexPath) in
            self.actionForEditGuardian(indexPath: indexPath)
            // share item at indexPath
        }
        edit.backgroundColor = colorCode.gradientTopColor
        if tableIndex == 1 || self.arrForGuardian.count != 0 {
            return [edit]
        } else {
            return []
        }
    }
    
    func customProfileHeaderCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AddChildProfileHeaderCell) as? AddChildProfileHeaderCell {
            cell.selectionStyle = .none
            cell.btnForUploadImage.addTarget(self, action: #selector(actionForPhotoSelection(_:)), for: .touchUpInside)
            if self.imgForProfile != nil {
                cell.imgViewForChild.image = self.imgForProfile
            } else {
                if child.imagePath != nil && child.imagePath != "" {
                    cell.imgViewForChild.sd_setShowActivityIndicatorView(true)
                    cell.imgViewForChild.sd_setIndicatorStyle(.gray)
                    cell.imgViewForChild.sd_setImage(with: URL(string: self.child.imagePath ?? "")) { (image, error, type, url) in
                        if error != nil {
                            cell.imgViewForChild.image = UIImage(named: "placeholder")
                        }
                    }
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customTwoTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForAddChild.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForleft.delegate = self
            cell.txtFieldForRight.delegate = self
            if let arrForTitle = Macros.ConstantArray.arrForAddChild[indexPath.row] as? [String] {
                cell.txtFieldForleft.placeholder = arrForTitle[0]
                cell.txtFieldForRight.placeholder = arrForTitle[1]
            }
            if let arrForValidationString = Macros.ConstantArray.arrForAddChildValidationMsg[indexPath.row] as? [String] {
                cell.txtFieldForleft.error = arrForValidationString[0]
                cell.txtFieldForRight.error = arrForValidationString[1]
            }
            cell.txtFieldForleft.tag = indexPath.row+333
            cell.txtFieldForRight.tag = indexPath.row+444
            cell.txtFieldForleft.text = child.firstName
            cell.txtFieldForRight.text = child.lastName
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddChild.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            if let titleString = Macros.ConstantArray.arrForAddChild[indexPath.row] as? String {
                cell.txtFieldForField.placeholder = titleString
            }
            if let validationString = Macros.ConstantArray.arrForAddChildValidationMsg[indexPath.row] as? String {
                cell.txtFieldForField.error = validationString
            }
            cell.lblForFieldTitle.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.txtFieldForField.isEnabled = indexPath.row == 2 || indexPath.row == 10 ? false : true
            cell.imgViewForArrow.isHidden = indexPath.row == 2 || indexPath.row == 10 ? false : true
            cell.btnForField.isHidden = indexPath.row == 2 || indexPath.row == 10 ? false : true
            cell.txtFieldForField.dividerColor = indexPath.row == 2 || indexPath.row == 10 ? colorCode.applicationColor : colorCode.dullColoer
            cell.txtFieldForField.keyboardType = (indexPath.row == 8 || indexPath.row == 9 || indexPath.row == 12) ? .numberPad : .default
            indexPath.row == 2 || indexPath.row == 10  ? cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside) : cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 2:
                if child.dateOfBirth == "" || child.dateOfBirth == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: child.dateOfBirthh ?? Date())
                }
            case 4:
                cell.txtFieldForField.text = child.address
            case 8:
                
                cell.txtFieldForField.text = child.postalCode
            case 9:
                if child.childsContactNumber == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = String(child.childsContactNumber ?? 0)
                }
            case 10:
                cell.txtFieldForField.text = child.childStartDateString
                
            case 11:
                cell.txtFieldForField.text = child.physicianName
            case 12:
                if child.physicianContactNumber == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = String(child.physicianContactNumber ?? 0)
                }
            case 13:
                cell.txtFieldForField.text = child.physicianAddress
            case 14:
                cell.txtFieldForField.text = child.preferredHospital
            default:
                print("Invalid Case")
            }
            cell.lblForFieldTitle.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    func customGenderSelectionCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.GenderSelectionTableViewCell) as? GenderSelectionTableViewCell {
            cell.selectionStyle = .none
            cell.btnForBoy.tag = 888
            cell.btnForGirl.tag = 999
            cell.btnForGirl.addTarget(self, action: #selector(actionForGenderSelection(sender:)), for: .touchUpInside)
            cell.btnForBoy.addTarget(self, action: #selector(actionForGenderSelection(sender:)), for: .touchUpInside)
            cell.imgViewForGirl.image = (self.child.genderID == Gender.female) ? UIImage(named: "girlL") : UIImage(named: "girl")
            cell.imgViewForBoy.image = (self.child.genderID == Gender.male) ? UIImage(named: "boyL") : UIImage(named: "boy")
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddChild.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.tag = indexPath.row
            if let titleString = Macros.ConstantArray.arrForAddChild[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            if let validationString = Macros.ConstantArray.arrForAddChildValidationMsg[indexPath.row] as? String {
                cell.txtFieldForField.error = validationString
            }
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 5:
                cell.btnForField.addTarget(self, action: #selector(actionForCountryList(_:)), for: .touchUpInside)
                (child.countryName != nil && child.countryName != "") ? cell.btnForField.setTitle(child.countryName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            case 6:
                cell.btnForField.addTarget(self, action: #selector(actionForStateList(_:)), for: .touchUpInside)
                (child.stateName != nil && child.stateName != "") ? cell.btnForField.setTitle(child.stateName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            case 7:
                cell.btnForField.addTarget(self, action: #selector(actionForCityList(_:)), for: .touchUpInside)
                (child.cityName != nil && child.cityName != "") ? cell.btnForField.setTitle(child.cityName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            default:
                cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //Custom Guardian List Cell
    func customGuardianListTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.GuardianListTableViewCell, for: indexPath) as? GuardianListTableViewCell {
            cell.lblForName.text = self.arrForGuardian[indexPath.row].guardianName ?? ""
            cell.lblForRelation.text = self.arrForGuardian[indexPath.row].relationTypeName ?? ""
            cell.lblForMobileNo.text = String(self.arrForGuardian[indexPath.row].mobile ?? 0)
            cell.imgViewForGuardian.sd_setShowActivityIndicatorView(true)
            cell.imgViewForGuardian.sd_setIndicatorStyle(.gray)
            cell.imgViewForGuardian.sd_setImage(with: URL(string: self.arrForGuardian[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForGuardian.image = UIImage(named: "placeholder")
                }
            }
            if self.arrForGuardian[indexPath.row].isAuthorizedToPickup ?? false {
                cell.lblForPickupPermission.text = Macros.ControllerString.PickupAllowed
                cell.lblForPickupPermission.textColor = colorCode.gradientTopColor
            } else {
                cell.lblForPickupPermission.text = Macros.ControllerString.PickupNotAllowed
                cell.lblForPickupPermission.textColor = colorCode.applicationColor
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customAllergiesImmunizationTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.AllergiesImmunizationTableViewCell) as? AllergiesImmunizationTableViewCell {
            cell.btnForAdd.tag = indexPath.row
            cell.lblForTitle.text = Macros.ConstantArray.arrForAllergiesImmunizationTitle[indexPath.row]
            cell.btnForAdd.addTarget(self, action: #selector(actionForOpenPopup(_:)), for: .touchUpInside)
            cell.btnForAdd.isHidden = (child.studentId == 0 || child.studentId == nil) ? true : false
            switch indexPath.row {
            case 0:
                if let count = self.arrForImmunization?.count {
                    cell.lblForSubTitle.text =  (count > 0) ? "\(count) \(Macros.ControllerString.recordAvailable)" : Macros.ControllerString.noRecordAvailable
                } else {
                    cell.lblForSubTitle.text = Macros.ControllerString.noRecordAvailable
                }
            case 1:
                if let count = self.arrForAllergies?.count {
                    cell.lblForSubTitle.text =  (count > 0) ? "\(count) \(Macros.ControllerString.recordAvailable)" : Macros.ControllerString.noRecordAvailable
                }else {
                    cell.lblForSubTitle.text = Macros.ControllerString.noRecordAvailable
                }
            case 2:
                if let count = self.arrForMedication?.count {
                    cell.lblForSubTitle.text =  (count > 0) ? "\(count) \(Macros.ControllerString.recordAvailable)" : Macros.ControllerString.noRecordAvailable
                }else {
                    cell.lblForSubTitle.text = Macros.ControllerString.noRecordAvailable
                }
            default:
                if let count = self.arrForDisability?.count {
                    cell.lblForSubTitle.text =  (count > 0) ? "\(count) \(Macros.ControllerString.recordAvailable)" : Macros.ControllerString.noRecordAvailable
                }else {
                    cell.lblForSubTitle.text = Macros.ControllerString.noRecordAvailable
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSubmitButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForAddChild.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            (self.child.studentId != nil && self.child.studentId
                != 0) ? cell.btnForSubmit.setTitle(Macros.ControllerString.update, for: .normal) : cell.btnForSubmit.setTitle(Macros.ControllerString.add, for: .normal)
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}


//MARK:----- UICollectionView Delegates & DataSources -------
extension AddKidVC: UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return Macros.ConstantArray.arrForStudentsDetilTabs.count
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.row == 2{
            return CGSize(width: PlatformUtils.isPad ? 280.00 : 195.0, height: 44.0)
        }else{
            return CGSize(width: PlatformUtils.isPad ? 180.00 : 140.0, height: 44.0)
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
        switch indexPath.item {
        case 0:
            self.tblViewForAddChild.bounces = false
            self.btnForAddGaurdian.isHidden = true
            collectionView.scrollToItem(at: indexPath, at: .right, animated: true)
        case 1:
            self.tblViewForAddChild.bounces = true
            self.btnForAddGaurdian.isHidden = (child.studentId == 0 || child.studentId == nil) ? true : false
            collectionView.reloadItems(at: [IndexPath(item: 0, section: 0)])
        case 2:
            self.tblViewForAddChild.bounces = true
            self.btnForAddGaurdian.isHidden = true
            collectionView.reloadItems(at: [IndexPath(item: 0, section: 0)])
            collectionView.scrollToItem(at: indexPath, at: .left, animated: true)
        default:
            print("Invalid case")
        }
        self.tableIndex = indexPath.row
        tblViewForAddChild.reloadData()
    }
}
////MARK:----- Image Picker Delegate Functions-----
//extension AddKidVC: UIImagePickerControllerDelegate,UINavigationControllerDelegate,ImagePickerViewControllerDelegate{
//    func multiSelectedImage(images: [UIImage]) {
//        dismiss(animated: true, completion: nil)
//        print(images)
//    }
//
//    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
//        dismiss(animated: true, completion: nil)
//        if let pickedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
//            getSelectedImage(image: pickedImage)
//        } else if let pickedVideoURL = info[UIImagePickerController.InfoKey.mediaURL] as? NSURL {
//            getSelectedVideo(videoURL: pickedVideoURL)
//        }
//    }
//
//    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
//        dismiss(animated: true, completion: nil)
//    }
//
//    func getSelectedImage(image: UIImage) {
//        self.imgForProfile = image
//        if let cell = self.tblViewForAddChild.cellForRow(at: IndexPath(row: 0, section: 0)) as? AddChildProfileHeaderCell {
//            cell.imgViewForChild.image = self.imgForProfile
//        }
//    }
//
//    func getSelectedVideo(videoURL: NSURL) {
//        print(videoURL)
//    }
//}


////MARK:----- Add/Edit Guardian Delegate -------
//extension AddKidVC: AddGuardianDelegate{
//    func submitAddGuardianAction(guardian: Guardian, selectedRow: Int?) {
//        if let index = selectedRow {
//            self.arrForGuardian[index] = guardian
//            let indexPath = IndexPath(item: index, section: 0)
//            self.tblViewForAddChild.reloadRows(at: [indexPath], with: .automatic)
//        } else {
//            if self.arrForGuardian.count == 0 {
//                self.arrForGuardian.append(guardian)
//                self.tblViewForAddChild.reloadData()
//            } else {
//                self.arrForGuardian.append(guardian)
//                let indexPath = IndexPath(item: (self.arrForGuardian.count - 1), section: 0)
//                self.tblViewForAddChild.insertRows(at: [indexPath], with: .automatic)
//            }
//        }
//    }
//}

//MARK:----- Add Health Information Delegate ------
extension AddKidVC: HealthDescriptionDelegate{
    func saveAction(param: Dictionary<String, Any>, healthStatusType: Int, selectedIndex: Int?) {
        switch healthStatusType {
        case HealthDecriptionStatus.Allergies:
            self.apiForSaveAllergies(param: param)
        case HealthDecriptionStatus.Immunization:
            self.apiForSaveImmunization(param: param)
        case HealthDecriptionStatus.Medication:
            self.apiForSaveMedication(param: param)
        case HealthDecriptionStatus.Disability:
            self.apiForSaveDisabilies(param: param)
        default:
            print("Inavalid Status")
        }
    }
}

//MARK:----- Add Guardian Popover Delegatge -----
extension AddKidVC : UIPopoverPresentationControllerDelegate {
    
    //UIPopoverPresentationControllerDelegate Functions
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
    
    func popoverPresentationControllerShouldDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) -> Bool {
        return false
    }
}

//MARK:----- UITextView Delegates -----

extension AddKidVC: UITextViewDelegate {
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        self.child.childNote = newString as String
        return true
    }
    
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = tblViewForAddChild.cellForRow(at: IndexPath(row:6, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = tblViewForAddChild.cellForRow(at: IndexPath(row:6, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}

//MARK:----- UITextField Delegates -----
extension AddKidVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        switch textField.tag {
        case 4:
            self.child.address = newString as String
        case 8:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let pincode:String = newString as String
                if pincode.length() > 6 {
                    return false
                } else {
                    self.child.postalCode = pincode
                    return true
                }
            } else {
                return false
            }
        case 9:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let contactNo:String = newString as String
                if contactNo.length() > 10 {
                    return false
                } else {
                    self.child.childsContactNumber = Int(contactNo)
                    return true
                }
            } else {
                return false
            }
        case 10:
            self.child.childStartDateString = newString as String
        case 11:
            self.child.physicianName = newString as String
        case 12:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let contactNo:String = newString as String
                if contactNo.length() > 10 {
                    return false
                } else {
                    self.child.physicianContactNumber = Int(contactNo)
                    return true
                }
            } else {
                return false
            }
        case 13:
            self.child.physicianAddress  = newString as String
        case 14:
            self.child.preferredHospital = newString as String
        case 334:
            self.child.firstName =  newString as String
        case 445:
            self.child.lastName =  newString as String
        default:
            print("invalid case")
        }
        
        return true
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

//MARK:----- UITableView Cells ------
class AddChildProfileHeaderCell: UITableViewCell{
    @IBOutlet weak var btnForUploadImage: UIButton!
    @IBOutlet weak var imgViewForChild: UIImageView!
    override func awakeFromNib() {
        super.awakeFromNib()
        btnForUploadImage.cornerRadius = PlatformUtils.isPad ? 25 : 15
        imgViewForChild.cornerRadius = PlatformUtils.isPad ? 65 : 45
        // Initialization code
    }
}

class GenderSelectionTableViewCell: UITableViewCell {
    @IBOutlet weak var btnForBoy: UIButton!
    @IBOutlet weak var btnForGirl: UIButton!
    @IBOutlet weak var imgViewForBoy: UIImageView!
    @IBOutlet weak var imgViewForGirl: UIImageView!
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
          imgViewForGuardian.cornerRadius = PlatformUtils.isPad ? 30 : 20
    }
}

class AllergiesImmunizationTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForSubTitle: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var btnForAdd: UIButton!
}


