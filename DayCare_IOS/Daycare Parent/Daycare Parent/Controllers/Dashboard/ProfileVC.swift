//
//  ProfileVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 09/04/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown

import Material
import ActionSheetPicker_3_0

class ProfileVC: BaseViewController {

    @IBOutlet weak var tblViewForProfile: UITableView!
    lazy var imagePicker = ImagePickerVC()
    var imgForProfile:UIImage?
    var arrForCountry : [Country]?
    var arrForState : [State]?
    var arrForCities : [City]?
    var arrForRelation : [Relation]?
    let dropDownForRelation = DropDown()
    let dropDownForCountry = DropDown()
    let dropDownForState = DropDown()
    let dropDownForCity = DropDown()
    var parentUser = Parent()
    var child: Child?
    var isEdited:Bool?
    var guardian:Guardian?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
    }

    //MARK:----- @IBActions ------
   
    @IBAction func actionForSave(_ sender: Any) {
        if isValidate() {
            imgForProfile != nil ? self.apiCallForSaveImages() : self.apiCallForSaveParentInformation()
        }
    }
    
    @objc func actionForPhotoSelection(_ sender: UIButton){
        resignTextFieldResponder()
//        let authStatus = AVCaptureDevice.authorizationStatus(for: AVMediaType.video)
//        switch authStatus {
//        case .authorized:
//            imagePicker.delegate = self
//            imagePicker.showOptionAlertWithoutVideos(viewController: self, receivedDelegate: self, sender: sender, isMultiselection: false)
//        case .denied:
//            alertPromptToAllowCameraAccessViaSettings()
//        case .notDetermined:
//            imagePicker.delegate = self
//            imagePicker.showOptionAlertWithoutVideos(viewController: self, receivedDelegate: self, sender: sender, isMultiselection: false)
//        case .restricted:
//            self.showAlert(with: Macros.alertMessages.cameraAccess)
//        }
        imagePicker.openSingleImagePicker(target: self) { (image) in
            self.imgForProfile = image
            if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 0, section: 0)) as? ProfileHeaderCell {
                cell.imgViewForProfile.image = self.imgForProfile
            }
        }
    }
    
    @objc func actionForGenderSelection(_ sender: UIButton){
        resignTextFieldResponder()
        if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 2, section: 0)) as? RadioButtonTableViewCell {
            if sender.tag == 113 {
                cell.btnForYes.isSelected = true
                cell.btnForNo.isSelected = false
                parentUser.genderID = Gender.male
            } else {
                cell.btnForYes.isSelected = false
                cell.btnForNo.isSelected = true
                parentUser.genderID = Gender.female
            }
            cell.btnForYes.setTitle(Macros.ControllerString.male, for: .normal)
            cell.btnForNo.setTitle(Macros.ControllerString.female, for: .normal)
        }
    }
    
    @objc func actionForSelectDate(_ sender: UIButton){
        resignTextFieldResponder()
        let selectedDate = CommonClassMethods.dateObjectFromDateString(date: parentUser.dateOfBirth ?? "")
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate, doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            self.parentUser.dateOfBirth = CommonClassMethods.dateFromDateFormat(date: dateTime)
            self.parentUser.dateOfBirthh = dateTime
            if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                cell.txtFieldForField.isErrorRevealed = false
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForRelationDropdown(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupRelationDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForRelation.show()
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
    
    @objc func actionForIsPickedUp(_ sender: UIButton){
        resignTextFieldResponder()
        if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 15, section: 0)) as? RadioButtonTableViewCell {
            if sender.tag == 126 {
                cell.btnForYes.isSelected = true
                cell.btnForNo.isSelected = false
                self.parentUser.isAuthorizedToPickup = true
                if let pickedUpCell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 16, section: 0)) as? DropDownTextFieldTableViewCell {
                    pickedUpCell.txtFieldForField.isEnabled = false
                    self.parentUser.reasonNotToAllow = ""
                    pickedUpCell.txtFieldForField.text = ""
                    pickedUpCell.txtFieldForField.isErrorRevealed = false
                }
            } else {
                cell.btnForYes.isSelected = false
                cell.btnForNo.isSelected = true
                self.parentUser.isAuthorizedToPickup = false
                if let pickedUpCell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 16, section: 0)) as? DropDownTextFieldTableViewCell {
                    pickedUpCell.txtFieldForField.isEnabled = true
                }
            }
            cell.btnForYes.setTitle(Macros.ControllerString.yes, for: .normal)
            cell.btnForNo.setTitle(Macros.ControllerString.no, for: .normal)
        }
    }
    
    @objc func actionForChangePassword(){
        if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.ChangePasswordVC) as? ChangePasswordVC {
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    @objc func selectGuardianParentOption(_sender: UIButton) {
        guard let profileHeaderCell =  tblViewForProfile.cellForRow(at: IndexPath.init(row: _sender.tag, section: 0))  as? ProfileHeaderCell else { return }
        parentUser.isSecondaryParent = false
        parentUser.isGaurdian = false
        if profileHeaderCell.guardianButton == _sender {
            profileHeaderCell.guardianButton.isSelected = true
            profileHeaderCell.parentButton.isSelected = false
            parentUser.isGaurdian = true

        } else {
            profileHeaderCell.guardianButton.isSelected = false
            profileHeaderCell.parentButton.isSelected = true
            parentUser.isSecondaryParent = true
        }
    }
    
    //MARK:------ Functions ------
    
    func initialSetup(){
        
        self.apiCallForRelationTypeList()
        self.apiCallForCountryList()
        if child != nil {
            self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.AddGuardian)
        } else {
            if (isEdited ?? false) {
                self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.EditGuardian)
                self.apiForParentInformation(agencyID: guardian?.agencyID ?? 0, parentId: guardian?.guardianId ?? 0, isParent: false, isSecondaryParent: false, isGuardian: true)
            } else {
//                parentUser = AppInstance.shared.parent ?? Parent()
                self.setNavigationBar(title: Macros.NavigationBarTitle.Profile)
                self.setNavigationRightBarButton()
                self.apiForParentInformation(agencyID: AppInstance.shared.user?.agencyID ?? 0, parentId: AppInstance.shared.user?.releventUserID ?? 0, isParent: AppInstance.shared.user?.isParent ?? false, isSecondaryParent: AppInstance.shared.user?.isSecondaryParent ?? false, isGuardian: AppInstance.shared.user?.isGaurdian ?? false)
//                self.setupParentData()
            }
        }
    }
    
    func setNavigationRightBarButton(){
        let rightBarButton = UIBarButtonItem(title: "Change Password", style: .plain, target: self, action: #selector(actionForChangePassword))
        rightBarButton.tintColor = .white
        self.navigationItem.setRightBarButton(rightBarButton, animated: true)
    }
    
    func setupParentData(){
        if self.parentUser.genderID == nil || parentUser.genderID == 0 {
            parentUser.genderID = Gender.male
        }
        if parentUser.dateOfBirth != nil && parentUser.dateOfBirth != "" {
            parentUser.dateOfBirthh = CommonClassMethods.dateObjectFromDateString(date: parentUser.dateOfBirth ?? "")
        }
        if parentUser.countryId != nil && parentUser.countryId != 0 {
            apiCallForStateList(countryId: parentUser.countryId ?? 0)
        }
        if parentUser.stateId != nil && parentUser.stateId != 0 {
            apiCallForCityList(stateID: parentUser.stateId ?? 0)
        }
        self.tblViewForProfile.reloadData()
    }
    
    func alertPromptToAllowCameraAccessViaSettings() {
        let alert = UIAlertController(title: "\(Macros.ApplictionName) \(Macros.alertMessages.cameraPermissionRequestTitle)", message: Macros.alertMessages.cameraPermissionRequst, preferredStyle: .alert )
        alert.addAction(UIAlertAction(title: Macros.alertMessages.openSetting, style: .cancel) { alert in
            if let appSettingsURL = NSURL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(appSettingsURL as URL, options: [:], completionHandler: nil)
            }
        })
        present(alert, animated: true, completion: nil)
    }
    
    //DropDown list for relation
    func setupRelationDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForRelationName:[String]   =   []
        for relation in self.arrForRelation ?? [] {
            arrForRelationName.append(relation.label ?? "")
        }
        dropDownForRelation.anchorView = sender
        dropDownForRelation.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForRelation.dataSource = arrForRelationName
        dropDownForRelation.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.parentUser.relationTypeId = self?.arrForRelation?[index].value
            if let txtfield = self?.view.viewWithTag(7) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
        dropDownForRelation.cancelAction = { [unowned self] in
            self.dropDownForRelation.hide()
            imageView.image = UIImage(named: "arrowDown")
        }
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
            self?.parentUser.countryId = self?.arrForCountry?[index].id ?? 0
            self?.parentUser.stateId = nil
            self?.parentUser.cityId = nil
            self?.arrForCities = []
            self?.arrForState = []
            if let txtfield = self?.view.viewWithTag(9) as? ErrorTextField {
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
            self?.parentUser.stateId = self?.arrForState?[index].id ?? 0
            self?.parentUser.cityId = nil
            self?.arrForCities = []
            if let txtfield = self?.view.viewWithTag(10) as? ErrorTextField {
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
            self?.parentUser.cityId = self?.arrForCities?[index].id ?? 0
            if let txtfield = self?.view.viewWithTag(11) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
        dropDownForCity.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    
    func resignTextFieldResponder(){
        let view = self.view.subviews[0] as? UITableView
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
        if parentUser.firstName == "" || parentUser.firstName == nil || parentUser.firstName == "\n" {
            isValidate = false
            if let txtfield = self.view.viewWithTag(334) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
            
        } else if parentUser.lastName == "" || parentUser.lastName == nil || parentUser.lastName == "\n" {
            isValidate = false
            if let txtfield = self.view.viewWithTag(445) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.dateOfBirth == "" || parentUser.dateOfBirth == nil || parentUser.dateOfBirth == "\n" {
            isValidate = false
            if let txtfield = self.view.viewWithTag(3) as? ErrorTextField {
                txtfield.isErrorRevealed = true
            }
        }else if parentUser.emailId == "" || parentUser.emailId == nil || parentUser.emailId == "\n" {
            isValidate = false
            if let txtfield = self.view.viewWithTag(4) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if !(AlertManager.isValidEmail(testStr: parentUser.emailId ?? "")) {
            isValidate = false
            if let txtfield = self.view.viewWithTag(4) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.mobile == 0 || parentUser.mobile == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(5) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if String(parentUser.mobile ?? 0).length() != 10 {
            isValidate = false
            if let txtfield = self.view.viewWithTag(5) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.relationTypeId == 0 || parentUser.relationTypeId == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(7) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.address == "" || parentUser.address == nil || parentUser.address == "\n" {
            isValidate = false
            if let txtfield = self.view.viewWithTag(8) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if parentUser.countryId == 0 || parentUser.countryId == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(9) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.stateId == 0 || parentUser.stateId == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(10) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        }else if parentUser.cityId == 0 || parentUser.cityId == nil {
            isValidate = false
            if let txtfield = self.view.viewWithTag(11) as? ErrorTextField {
                txtfield.isErrorRevealed = true
                _ = txtfield.becomeFirstResponder()
            }
        } else if child != nil {
            if !(self.parentUser.isAuthorizedToPickup ?? false) {
                if parentUser.reasonNotToAllow == "" || parentUser.reasonNotToAllow == nil {
                    isValidate = false
                    if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 16, section: 0)) as? DropDownTextFieldTableViewCell {
                        cell.txtFieldForField.isErrorRevealed = true
                        _ = cell.txtFieldForField.becomeFirstResponder()
                    }
                }
            }
        }
        return isValidate
    }
    
    func genrateParameters() -> Dictionary<String,Any>{
        var arrForAssociateChild:[[String:Any]] = []
        if (child != nil) {
            let associateChild = AssociatedChild()
            associateChild.studentID = self.child?.studentId
            arrForAssociateChild.append(associateChild.dictionaryRepresentation())
            parentUser.agencyID = AppInstance.shared.user?.agencyID
            parentUser.addedByID = AppInstance.shared.user?.releventUserID
//            parentUser.isParent = false
//            parentUser.isSecondaryParent = false
//            parentUser.isGaurdian = true
            parentUser.createdBy = AppInstance.shared.user?.releventUserID
            parentUser.id = parentUser.id ?? 0
            parentUser.addedByID = AppInstance.shared.user?.releventUserID
            parentUser.createdBy = AppInstance.shared.user?.loginUserID
          parentUser.updatedBy = AppInstance.shared.user?.loginUserID
        } else {
            for child in parentUser.associatedChild ?? [] {
                arrForAssociateChild.append(child.dictionaryRepresentation())
            }
            parentUser.updatedBy = AppInstance.shared.user?.loginUserID
        }
        var dictForParam = parentUser.dictionaryRepresentation()
        dictForParam[Macros.ApiKeys.kassociatedChild] = arrForAssociateChild
        if child != nil {
            
        }
        
        return dictForParam
    }

    
    func backToChildViewController(message: String){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.yesString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:message, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                for viewController in (self.navigationController?.viewControllers ?? []) {
                    if let vc = viewController as? AddKidVC {
                        self.navigationController?.popToViewController(vc, animated: true)
                    }
                }
            default:
                break
            }
        })
    }
    //MARK:----- API Calling Function -------
    
    func apiForParentInformation(agencyID: Int, parentId: Int, isParent: Bool, isSecondaryParent:Bool, isGuardian: Bool){
        let service = LoginService()
        service.getParentInformation(with: self, agencyId:agencyID, parentId: parentId, isParent: isParent, isSecondaryParent: isSecondaryParent, isGuardian: isGuardian) { (result) in
            if result != nil {
                self.parentUser = result as? Parent ?? Parent()
                self.setupParentData()
            }
        }
    }
    
    func apiCallForRelationTypeList(){
        let service = ChildService()
        service.getRelationTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForRelation = result as? [Relation]
            }
            
            self.tblViewForProfile.reloadData()
        }
    }
    
    func apiCallForSaveImages(){
        let service = ChildService()
        service.uploadImageVideos(with: self, imgArray: [imgForProfile ?? UIImage()], videoURL: nil) { (result) in
            if result != nil {
                self.parentUser.imagePath = (result as? [String])?.first
                self.apiCallForSaveParentInformation()
            }
        }
    }
    func apiCallForCountryList(){
        let service = ChildService()
        service.getCountryList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForCountry = result as? [Country]
            }
            self.tblViewForProfile.reloadData()
            
        }
    }
    
    func apiCallForStateList(countryId : Int){
        let service = ChildService()
        service.getStateList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, countryID: countryId) { (result) in
            if result != nil {
                self.arrForState = result as? [State]
            }
            self.tblViewForProfile.reloadData()
            if let txtfield = self.view.viewWithTag(10) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
    }
    
    func apiCallForCityList(stateID : Int){
        let service = ChildService()
        service.getCityList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, stateId: stateID) { (result) in
            if result != nil {
                self.arrForCities = result as? [City]
            }
            self.tblViewForProfile.reloadData()
            if let txtfield = self.view.viewWithTag(11) as? ErrorTextField {
                txtfield.isErrorRevealed = false
            }
        }
    }
    
    func apiCallForSaveParentInformation() {
        let dictForParam = self.genrateParameters()
        let service = DashboardService()
        service.saveParentInformation(with: self, param: dictForParam ) { (result) in
            if let response = result as? Dictionary<String,Any> {
                if (self.child == nil) {
                    if self.isEdited ?? false {
                        self.popViewController(message: response["message"] as? String ?? "")
                    } else {
                        AppInstance.shared.parent = self.parentUser
                        AppInstance.shared.kUserDefault.setValue( AppInstance.shared.parent?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kParentDetails)
                        self.showAlert(with: response["message"] as? String ?? "")
                    }
                } else {
                    self.backToChildViewController(message: response["message"] as? String ?? "")
                }
            }
        }
    }
}


//MARK:----- UITableView Delegate and Datasource -----

extension ProfileVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return   child != nil || (isEdited ?? false) ? 18 : 16
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return customProfileHeaderCell(tableView:tableView,indexPath:indexPath)
        case 1:
            return customTwoTextFieldCell(tableView:tableView,indexPath:indexPath)
        case 7,9,10,11:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        case 2:
            return customRadioButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case 3,4,5,6,8,12,13,14,16:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        case 15:
            return  child != nil || (isEdited ?? false) ? customRadioButtonTableViewCell(tableView:tableView,indexPath:indexPath) : customSubmitButtonCell(tableView: tableView)
        default:
            return customSubmitButtonCell(tableView: tableView)
        }
    }
    
    func customProfileHeaderCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.ProfileHeaderCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.ProfileHeaderCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ProfileHeaderCell) as? ProfileHeaderCell {
            cell.selectionStyle = .none
            cell.btnForSelectImage.addTarget(self, action: #selector(actionForPhotoSelection(_:)), for: .touchUpInside)
            if self.imgForProfile != nil {
                cell.imgViewForProfile.image = self.imgForProfile
            }
            else {
                if parentUser.imagePath != nil && parentUser.imagePath != "" {
                    cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
                    cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
                    cell.imgViewForProfile.sd_setImage(with: URL(string: self.parentUser.imagePath ?? "")) { (image, error, type, url) in
                        if error != nil {
                            cell.imgViewForProfile .image = UIImage(named: "placeholder")
                        }
                    }
                }
            }
            
            if child != nil {
                cell.guardianButton.addTarget(self, action: #selector(selectGuardianParentOption(_sender:)), for: .touchUpInside)
                cell.parentButton.addTarget(self, action: #selector(selectGuardianParentOption(_sender:)), for: .touchUpInside)
            } else {
                cell.optionStackView.isHidden = true
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customTwoTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForleft.delegate = self
            cell.txtFieldForRight.delegate = self
            if let arrForTitle = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? [String] {
                cell.txtFieldForleft.placeholder = arrForTitle[0]
                cell.txtFieldForRight.placeholder = arrForTitle[1]
            }
            if let arrForErrorTitle = Macros.ConstantArray.arrForAddGuardianValidationMsg[indexPath.row] as? [String] {
                cell.txtFieldForleft.error = arrForErrorTitle[0]
                cell.txtFieldForRight.error = arrForErrorTitle[1]
            }
            cell.txtFieldForleft.tag = indexPath.row+333
            cell.txtFieldForRight.tag = indexPath.row+444
            cell.txtFieldForleft.text = parentUser.firstName
            cell.txtFieldForRight.text = parentUser.lastName
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.txtFieldForField.placeholder = titleString
            }
            if let errorTitleString = Macros.ConstantArray.arrForAddGuardianValidationMsg[indexPath.row] as? String {
                cell.txtFieldForField.error = errorTitleString
            }
            cell.lblForFieldTitle.isHidden = true
            cell.txtFieldForField.tag = indexPath.row
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.isHidden = !(indexPath.row == 3)
            cell.btnForField.isHidden = !(indexPath.row == 3)
            cell.txtFieldForField.keyboardType = ((indexPath.row == 5) || (indexPath.row == 12) || (indexPath.row == 14)) ? .numberPad : .default
            indexPath.row == 3 ? cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside) : cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row{
            case 3:
                if parentUser.dateOfBirth == "" || parentUser.dateOfBirth == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: parentUser.dateOfBirthh ?? Date())
                }
                cell.txtFieldForField.isEnabled = false
                cell.txtFieldForField.textColor = .black
            case 4:
                cell.txtFieldForField.text = parentUser.emailId
                cell.txtFieldForField.isEnabled = (child != nil)
                cell.txtFieldForField.textColor = (child != nil) ? .black : .gray
            case 5:
                if let mobile = parentUser.mobile {
                    cell.txtFieldForField.text = String(mobile)
                } else {
                    cell.txtFieldForField.text = ""
                }
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            case 6:
                cell.txtFieldForField.text = parentUser.profession
                cell.txtFieldForField.isEnabled = true
                 cell.txtFieldForField.textColor = .black
            case 8:
                cell.txtFieldForField.text = parentUser.address
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            case 12:
                cell.txtFieldForField.text = parentUser.postalCode
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            case 13:
                cell.txtFieldForField.text = parentUser.employerName
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            case 14:
                if let mobile = parentUser.employerNumber {
                    cell.txtFieldForField.text = String(mobile)
                } else {
                    cell.txtFieldForField.text = ""
                }
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            case 16:
                cell.txtFieldForField.text = parentUser.reasonNotToAllow
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
            default:
                print("In Progress")
            }
            cell.lblForFieldTitle.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            if let errorTitleString = Macros.ConstantArray.arrForAddGuardianValidationMsg[indexPath.row] as? String {
                cell.txtFieldForField.error = errorTitleString
            }
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.setTitle("Select", for: .normal)
            switch indexPath.row {
            case 7:
                cell.btnForField.addTarget(self, action: #selector(actionForRelationDropdown(_:)), for: .touchUpInside)
                if parentUser.relationTypeId != nil && parentUser.relationTypeId != 0 {
                    for relation in self.arrForRelation ?? [] {
                        if relation.value == self.parentUser.relationTypeId{
                            cell.btnForField.setTitle(relation.label ?? "", for: .normal)
                        }
                    }
                }
            case 9:
                cell.btnForField.addTarget(self, action: #selector(actionForCountryList(_:)), for: .touchUpInside)
                if parentUser.countryId != nil && parentUser.countryId != 0 {
                    for country in self.arrForCountry ?? [] {
                        if country.id == self.parentUser.countryId{
                            cell.btnForField.setTitle(country.countryName ?? "", for: .normal)
                        }
                    }
                }
            case 10:
                cell.btnForField.addTarget(self, action: #selector(actionForStateList(_:)), for: .touchUpInside)
                if parentUser.stateId != nil && parentUser.stateId != 0 {
                    for state in self.arrForState ?? [] {
                        if state.id == self.parentUser.stateId{
                            cell.btnForField.setTitle(state.stateName ?? "", for: .normal)
                        }
                    }
                }
            case 11:
                cell.btnForField.addTarget(self, action: #selector(actionForCityList(_:)), for: .touchUpInside)
                if parentUser.cityId != nil && parentUser.cityId != 0 {
                    for city in self.arrForCities ?? [] {
                        if city.id == self.parentUser.cityId {
                            cell.btnForField.setTitle(city.cityName ?? "", for: .normal)
                        }
                    }
                }
            default:
                print("Invalid case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customRadioButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.RadioButtonTableViewCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.RadioButtonTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.RadioButtonTableViewCell) as? RadioButtonTableViewCell {
            cell.selectionStyle = .none
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            cell.btnForNo.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForYes.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForYes.tag = 111+indexPath.row
            cell.btnForNo.tag = 333+indexPath.row
            if indexPath.row == 2 {
                cell.btnForYes.setTitle(Macros.ControllerString.male, for: .normal)
                cell.btnForNo.setTitle(Macros.ControllerString.female, for: .normal)
                cell.btnForYes.isSelected = (parentUser.genderID ?? 0 == Gender.male)
                cell.btnForNo.isSelected = (parentUser.genderID ?? 0 == Gender.female)
                cell.btnForYes.setTitle(Macros.ControllerString.male, for: .normal)
                cell.btnForNo.setTitle(Macros.ControllerString.female, for: .normal)
                cell.btnForNo.addTarget(self, action: #selector(actionForGenderSelection(_:)), for: .touchUpInside)
                cell.btnForYes.addTarget(self, action: #selector(actionForGenderSelection(_:)), for: .touchUpInside)
            } else {
                cell.btnForYes.setTitle(Macros.ControllerString.yes, for: .normal)
                cell.btnForNo.setTitle(Macros.ControllerString.no, for: .normal)
                cell.btnForNo.addTarget(self, action: #selector(actionForIsPickedUp(_:)), for: .touchUpInside)
                cell.btnForYes.addTarget(self, action: #selector(actionForIsPickedUp(_:)), for: .touchUpInside)
                cell.btnForYes.setTitle(Macros.ControllerString.yes, for: .normal)
                cell.btnForNo.setTitle(Macros.ControllerString.no, for: .normal)
                if self.parentUser.isAuthorizedToPickup ?? false {
                    cell.btnForYes.isSelected = true
                    cell.btnForNo.isSelected = false
                    self.parentUser.isAuthorizedToPickup = true
                } else {
                    cell.btnForNo.isSelected = true
                    cell.btnForYes.isSelected = false
                    self.parentUser.isAuthorizedToPickup = false
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSubmitButtonCell(tableView: UITableView) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            (child != nil && (self.isEdited ?? false) == false) ?  cell.btnForSubmit.setTitle(Macros.ControllerString.add, for: .normal) : cell.btnForSubmit.setTitle(Macros.ControllerString.update, for: .normal)
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSave(_:)), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Image Picker Delegate Functions-----
//extension ProfileVC: UIImagePickerControllerDelegate,UINavigationControllerDelegate,ImagePickerViewControllerDelegate{
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
//        if let cell = self.tblViewForProfile.cellForRow(at: IndexPath(row: 0, section: 0)) as? ProfileHeaderCell {
//            cell.imgViewForProfile.image = self.imgForProfile
//        }
//    }
//    
//    func getSelectedVideo(videoURL: NSURL) {
//        print(videoURL)
//    }
//}

//MARK:------ UITextField Delegate -----
extension ProfileVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if let textfield = textField as? ErrorTextField {
            textfield.isErrorRevealed = newString.trimmingCharacters(in: CharacterSet.whitespaces).length() == 0
        }
        switch textField.tag {
        case 334:
            parentUser.firstName = newString as  String
        case 445:
            parentUser.lastName = newString as  String
        case 4:
            parentUser.emailId = newString as  String
        case 5:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let contactNo:String = newString as String
                if contactNo.length() > 10 {
                    return false
                } else {
                    parentUser.mobile = Int(contactNo)
                    return true
                }
            } else {
                return false
            }
        case 6:
            parentUser.profession = newString as  String
        case 8:
            parentUser.address = newString as  String
        case 12:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let pincode:String = newString as String
                if pincode.length() > 6 {
                    return false
                } else {
                    self.parentUser.postalCode = pincode
                    return true
                }
            } else {
                return false
            }
        case 13:
            parentUser.employerName = newString as String
        case 14:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let contactNo:String = newString as String
                if contactNo.length() > 10 {
                    return false
                } else {
                    parentUser.employerNumber = Int(contactNo)
                    return true
                }
            } else {
                return false
            }
        case 16: parentUser.reasonNotToAllow = newString as String
        default:
            print("Invalid case")
        }
        return true
    }
}
