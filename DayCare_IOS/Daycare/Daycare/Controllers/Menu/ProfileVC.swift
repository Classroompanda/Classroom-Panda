//
//  ProfileVC.swift
//  Daycare
//
//  Created by amrut waghmare on 15/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import SDWebImage

class ProfileVC: BaseViewController {

    @IBOutlet weak var tbleViewForTeacherProfile: UITableView!

    let dropDownForCountry = DropDown()
    let dropDownForState = DropDown()
    let dropDownForCity = DropDown()
    
    var teacher = Teacher()
    var arrForCountry : [Country]?
    var arrForState : [State]?
    var arrForCities : [City]?
    var imgForProfile:UIImage?
    
    lazy var imagePickerVC = ImagePickerVC()
    //MARK:----- View functions -----
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.Profile)
        setNavigationRightBarButton()
        apiCallForGetTeacherInformation()
        // Do any additional setup after loading the view.
    }
    
    //MARK:----- @IBActions -----
    @objc func actionForSubmit(_ sender: CustomLoginButton){
        if isValidate(){
            imgForProfile != nil ? self.apiCallForSaveImages() : self.apiCallForSaveTeacherInformation()
        }
    }
    
    @objc func actionForCamera(_ sender: UIButton){
        imagePickerVC.openSingleImagePicker(target: self) { (image) in
            let btnForProfile = self.view.viewWithTag(1000) as? UIButton
            btnForProfile?.setImage(image, for: .normal)
            self.imgForProfile = image
        }
        
    }
    
    @objc func actionForCountryList(_ sender: UIButton){
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForCountry.show()
    }
    
    @objc func actionForStateList(_ sender: UIButton){
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForState.show()
    }
    
    @objc func actionForCityList(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForCity.show()
    }
    
    @objc func actionForSelectDate(_ sender: UIButton){
        let selectedDate = CommonClassMethods.dateObjectFromDateString(date: (sender.tag == 9) ? (teacher.dateOfBirth ?? "") : (teacher.dateHired ?? ""))
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            if sender.tag == 9 {
                self.teacher.dateofBirth = dateTime
                self.teacher.dateOfBirth = CommonClassMethods.dateStringFromDate(date: dateTime)
            }else {
                self.teacher.dateofHired = dateTime
                self.teacher.dateHired = CommonClassMethods.dateStringFromDate(date: dateTime)
            }
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    
    @objc func actionForChangePassword(){
        if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.ChangePasswordVC) as? ChangePasswordVC {
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    //MARK:----- Functions -----
    
    func setNavigationRightBarButton(){
        let rightBarButton = UIBarButtonItem(title: Macros.NavigationTitle.changePassword, style: .plain, target: self, action: #selector(actionForChangePassword))
        rightBarButton.tintColor = .white
        self.navigationItem.setRightBarButton(rightBarButton, animated: true)
    }
    
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    //Dropdown list For Country
    func setupCountryDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrForCountryName:[String]   = arrForCountry?.map{$0.countryName ?? ""} ?? []
//        for country in arrForCountry ?? [] {
//            arrForCountryName.append(country.countryName ?? "")
//        }
        dropDownForCountry.anchorView = sender
        dropDownForCountry.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForCountry.dataSource = arrForCountryName
        dropDownForCountry.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.teacher.countryName = self?.arrForCountry?[index].countryName ?? ""
            self?.teacher.countryId = self?.arrForCountry?[index].id ?? 0
            self?.teacher.stateId = nil
            self?.teacher.stateName = nil
            self?.teacher.cityId = nil
            self?.teacher.cityName = nil
            self?.arrForCities = []
            self?.arrForState = []
            self?.apiCallForStateList(countryId: self?.arrForCountry?[index].id ?? 0)
        }
        dropDownForCountry.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown list For State
    func setupStateDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrForStateName:[String]   =   arrForState?.map{$0.stateName ?? ""} ?? []
//        for state in arrForState ?? [] {
//            arrForStateName.append(state.stateName ?? "")
//        }
        dropDownForState.anchorView = sender
        dropDownForState.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForState.dataSource = arrForStateName
        dropDownForState.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
//            textField.text = arrForStateName[index]
            self?.teacher.stateName = self?.arrForState?[index].stateName ?? ""
            self?.teacher.stateId = self?.arrForState?[index].id ?? 0
            self?.teacher.cityId = nil
            self?.teacher.cityName = nil
            self?.arrForCities = []
            self?.apiCallForCityList(cityId: self?.arrForState?[index].id ?? 0)
        }
        dropDownForState.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //Dropdown list For City
    func setupCityDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrForCityName:[String]   =   arrForCities?.map{$0.cityName ?? ""} ?? []
        dropDownForCity.anchorView = sender
        dropDownForCity.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForCity.dataSource = arrForCityName
        dropDownForCity.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.teacher.cityName = self?.arrForCities?[index].cityName ?? ""
            self?.teacher.cityId = self?.arrForCities?[index].id ?? 0
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
    }
    
    func isValidate() -> Bool{
        var isValidated: Bool = true
        if teacher.firstName == "" || teacher.firstName == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.firstName)
        } else if teacher.lastName == "" || teacher.lastName == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.lastName)
        } else if teacher.mPhoneNumber == nil || teacher.mPhoneNumber == "" {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.phoneNumber)
        } else if teacher.mPhoneNumber != nil {
            if !AlertManager.isValidPhone(value: teacher.mPhoneNumber ?? "") {
                isValidated = false
                self.showAlert(with: Macros.alertMessages.phoneNo)
            }
        }
        if teacher.address == "" || teacher.address == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.address)
        } else if teacher.countryId == 0 || teacher.countryId == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.country)
        } else if teacher.stateId == 0 || teacher.stateId == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.state)
        } else if teacher.cityId == 0 || teacher.cityId == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.city)
        } else if teacher.dateOfBirth == "" || teacher.dateOfBirth == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.dateOfBirth)
        } else if teacher.dateHired == "" || teacher.dateHired == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.dateOfHire)
        } else if teacher.certification == "" || teacher.certification == nil {
            isValidated = false
            self.showAlert(with: Macros.alertMessages.certification)
        } else if teacher.mHomePhone != nil {
            if !AlertManager.isValidPhone(value: teacher.mHomePhone ?? "") {
                isValidated = false
                self.showAlert(with: Macros.alertMessages.phoneNo)
            }
        }
        return isValidated
    }
    
    //MARK:----- API Calling Function -----
    func apiCallForGetTeacherInformation(){
        let service = ProfileService()
        service.getTeacherInformation(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, teacherId: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                self.teacher = result as? Teacher ?? Teacher()
                self.apiCallForCountryList()
                self.apiCallForStateList(countryId: self.teacher.countryId ?? 0)
                self.apiCallForCityList(cityId: self.teacher.stateId ?? 0)
                self.teacher.dateofBirth = CommonClassMethods.dateObjectFromDateString(date: self.teacher.dateOfBirth ?? "")
                self.teacher.dateofHired = CommonClassMethods.dateObjectFromDateString(date: self.teacher.dateHired ?? "")
            }
            self.tbleViewForTeacherProfile.reloadData()
        }
    }
    
    func apiCallForCountryList(){
        let service = ProfileService()
        service.getCountryList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForCountry = result as? [Country]
                for country in self.arrForCountry ?? [] {
                    if self.teacher.countryId == country.id {
                        self.teacher.countryName = country.countryName
                    }
                }
            }
            self.tbleViewForTeacherProfile.reloadData()
        }
    }
    
    func apiCallForStateList(countryId : Int){
        let service = ProfileService()
        service.getStateList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, countryID: countryId) { (result) in
            if result != nil {
                self.arrForState = result as? [State]
                for state in self.arrForState ?? [] {
                    if self.teacher.stateId == state.id {
                        self.teacher.stateName = state.stateName
                    }
                }
            }
            self.tbleViewForTeacherProfile.reloadData()
        }
    }
    
    func apiCallForCityList(cityId : Int){
        let service = ProfileService()
        service.getCityList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, stateId: cityId) { (result) in
            if result != nil {
                self.arrForCities = result as? [City]
                for city in self.arrForCities ?? [] {
                    if self.teacher.cityId == city.id {
                        self.teacher.cityName = city.cityName
                    }
                }
            }
            self.tbleViewForTeacherProfile.reloadData()
        }
    }
    
    func apiCallForSaveImages(){
        let service = PostActivityService()
        service.uploadImageVideos(with: self, imgArray: [imgForProfile ?? UIImage()], videoURL: nil) { (result) in
            if result != nil {
                self.teacher.imagePath = (result as? [String])?.first
                self.apiCallForSaveTeacherInformation()
            }
        }
    }
    
    func apiCallForSaveTeacherInformation(){
        let service = ProfileService()
        self.teacher.updatedBy = AppInstance.shared.user?.loginUserID
        var dictForParam = self.teacher.dictionaryRepresentation()
        dictForParam[Macros.ApiKeys.kdateOfBirth] = CommonClassMethods.convertDateToServerReadableFormat(date: self.teacher.dateofBirth ?? Date())
        dictForParam[Macros.ApiKeys.kdateHired] = CommonClassMethods.convertDateToServerReadableFormat(date: self.teacher.dateofHired ?? Date())
        service.saveProfileData(with: self, param: dictForParam) { (result) in
            if result as? String != nil {
                self.teacher.teacherName = "\(self.teacher.firstName ?? "") \(self.teacher.lastName ?? "")"
                AppInstance.shared.teacher = self.teacher
                AppInstance.shared.kUserDefault.setValue(AppInstance.shared.teacher?.dictionaryRepresentation(), forKey: Macros.DefaultKeys.kTeacherDetails)
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: Macros.alertMessages.profileUpdate, buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
                    switch index {
                    case 0:
                        self.navigationController?.popViewController(animated: true)
                    default:
                        break
                    }
                })
            }
        }
    }
}

//MARK:----- UITableView DataSource and Delegates -----
extension ProfileVC: UITableViewDelegate,UITableViewDataSource{
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Macros.ConstantArray.arrForProfileTitle.count + 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row{
        case 5,6,7:
            return customDropDownButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case Macros.ConstantArray.arrForProfileTitle.count:
            let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
            self.tbleViewForTeacherProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
            if let cell = self.tbleViewForTeacherProfile.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
                cell.selectionStyle = .none
                cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit(_:)), for: .touchUpInside)
                return cell
            }
            return UITableViewCell()
        default:
            return customTextFieldProfileTableViewCell(tableView:tableView,indexPath:indexPath)
        }
    }
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ProfileImageHeaderCell) as? ProfileImageHeaderCell
        {
            cell.btnForProfile.cornerRadius = 45
            cell.btnForProfile.tag = 1000
            cell.btnForProfile.imageView?.contentMode = .scaleAspectFill
            cell.btnForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.btnForProfile.sd_setShowActivityIndicatorView(true)
//            cell.btnForProfile.sd_setIndicatorStyle(.gray)
            cell.btnForProfile.sd_setImage(with: URL(string: teacher.imagePath ?? ""), for: .normal) { (image, error, type, url) in
                if error != nil {
                    cell.btnForProfile.setImage(UIImage(named: "placeholder"), for: .normal)
                }
            }
            cell.btnForProfile.addTarget(self, action: #selector(actionForCamera(_:)), for: .touchUpInside)
            cell.btnForCamera.addTarget(self, action: #selector(actionForCamera(_:)), for: .touchUpInside)
            cell.btnForCamera.bringSubviewToFront(cell.btnForProfile)
            return cell.contentView
        }
        return UIView()
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 122
    }
    
    
    func customTextFieldProfileTableViewCell(tableView: UITableView,indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tbleViewForTeacherProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tbleViewForTeacherProfile.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.ViewForSelectedItems.isHidden = true
            cell.imgViewForArrow.isHidden = true
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForProfileTitle[indexPath.row])
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.txtFieldForField.isEnabled = true
            cell.txtFieldForField.delegate = self
            if (indexPath.row == 9 || indexPath.row == 10) {
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
            }else {
                cell.imgViewForArrow.isHidden = true
                cell.btnForField.isHidden = true
            }
            if (indexPath.row == 11 || indexPath.row == 2) {
                cell.txtFieldForField.isEnabled = false
                cell.txtFieldForField.textColor = .gray
                cell.txtFieldForField.dividerColor = .gray
            } else {
                cell.txtFieldForField.isEnabled = true
                cell.txtFieldForField.textColor = .black
                cell.txtFieldForField.dividerColor = colorCode.applicationColor
            }
            (indexPath.row == 2) ? (cell.txtFieldForField.keyboardType = .emailAddress) : (cell.txtFieldForField.keyboardType = .default)
            (indexPath.row == 3 || indexPath.row == 8 || indexPath.row == 13 ) ? (cell.txtFieldForField.keyboardType = .numberPad) : (cell.txtFieldForField.keyboardType = .default)
            
            switch indexPath.row {
            case 0:
                cell.txtFieldForField.text = teacher.firstName ?? ""
            case 1:
                cell.txtFieldForField.text = teacher.lastName ?? ""
            case 2:
                cell.txtFieldForField.text = teacher.email ?? ""
            case 3:
                cell.txtFieldForField.text = teacher.mPhoneNumber ?? ""
            case 4:
                cell.txtFieldForField.text = teacher.address ?? ""
            case 8:
                cell.txtFieldForField.text = teacher.postalCode ?? ""
            case 9:
                cell.imgViewForArrow.image = UIImage(named: "calendarBlue")
                cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateString(date: teacher.dateOfBirth ?? "")
            case 10:
                cell.imgViewForArrow.image = UIImage(named: "calendarBlue")
                cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
                cell.txtFieldForField.text = CommonClassMethods.dateFromDateString(date: teacher.dateHired ?? "")
            case 11:
                cell.txtFieldForField.text = "\(teacher.grossPayPerHour ?? 0)"
            case 12:
                cell.txtFieldForField.text = teacher.certification ?? ""
            case 13:
                cell.txtFieldForField.text = teacher.mHomePhone ?? ""
            default:
                print("Invalid")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tbleViewForTeacherProfile.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tbleViewForTeacherProfile.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForProfileTitle[indexPath.row])
//            cell.lblForFieldTitle.text = Macros.ConstantArray.arrForProfileTitle[indexPath.row]
            cell.btnForField.tag = indexPath.row
            switch indexPath.row {
            case 5:
                 self.setupCountryDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(actionForCountryList(_:)), for: .touchUpInside)
                (teacher.countryName != nil && teacher.countryName != "") ? cell.btnForField.setTitle(teacher.countryName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            case 6:
                self.setupStateDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(actionForStateList(_:)), for: .touchUpInside)
                (teacher.stateName != nil && teacher.stateName != "") ? cell.btnForField.setTitle(teacher.stateName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            case 7:
                self.setupCityDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(actionForCityList(_:)), for: .touchUpInside)
                (teacher.cityName != nil && teacher.cityName != "") ? cell.btnForField.setTitle(teacher.cityName, for: .normal) : cell.btnForField.setTitle("Select", for: .normal)
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
}


//MARK:----- UITextField Delegates -----
extension ProfileVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
            switch textField.tag {
            case 0:
                self.teacher.firstName = newString as String
            case 1:
                self.teacher.lastName = newString as String
            case 2:
                self.teacher.email = newString as String
            case 3:
                if Macros.ConstantArray.numberStringArray.contains(string){
                    let contactNo:String = newString as String
                    if string == "" {
                        self.teacher.mPhoneNumber = contactNo
                        return true
                    } else {
                        if contactNo.length() > 10 {
                            return false
                        } else {
                            self.teacher.mPhoneNumber = contactNo
                            return true
                        }
                    }
                }else {
                    return false
                }
            case 4:
                self.teacher.address = newString as String
            case 8:
                if Macros.ConstantArray.numberStringArray.contains(string){
                    let postalCode:String = newString as String
                    if string == "" {
                        self.teacher.postalCode = postalCode
                        return true
                    }else {
                        if postalCode.length() > 6 {
                            return false
                        } else {
                            self.teacher.postalCode = postalCode
                            return true
                        }
                    }
                } else {
                    return false
                }
            case 12:
                self.teacher.certification = newString as String
            case 13:
                if Macros.ConstantArray.numberStringArray.contains(string){
                    let contactNo:String = newString as String
                    if string == "" {
                        self.teacher.mPhoneNumber = contactNo
                        return true
                    } else {
                        if contactNo.length() > 10 {
                            return false
                        } else {
                            self.teacher.mHomePhone = contactNo
                            return true
                        }
                    }
                } else {
                    return false
                }
            default:
                print("Invalid")
            }
        return true
    }
}

//MARK:----- ProfileImageHeader TableView Cell -----
class ProfileImageHeaderCell:UITableViewCell{
    @IBOutlet weak var btnForProfile: UIButton!
    @IBOutlet weak var btnForCamera: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
       btnForProfile.cornerRadius = btnForProfile.bounds.width / 2
        // Initialization code
    }
}


