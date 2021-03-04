//
//  AddNewPostVC.swift
//  Daycare
//
//  Created by amrut waghmare on 01/02/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import AVFoundation

class AddNewPostVC: BaseViewController {

    @IBOutlet weak var tblViewForAddNewPost: UITableView!

    var isPhotoSelect: Bool?
    var activity = PostActivity()
    var selectedClass       :   OperationalClass?
    let dropDownForClasses = DropDown()
    var selectedVideoURL: NSURL?
    var arrForClass         :   [OperationalClass]     = []
    var arrForSelectedClassStudents     :   [Student]   =   []
    var arrForSelectedStudents  :   [Student]   =   []
    var arrForSelectedImages:[UIImage] = []
    var arrForOperationalClass : [OperationalClass]?
    
    lazy var imagePickerVC = ImagePickerVC()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    func initialSetup(){
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.AddNewPost)
        self.activity.isPublic = true
        apiForGetAllClasses()
    }
    
    //MARK:----- @IBActions ----
    @objc func actionForSubmit() {
        if isValidate() {
            apiCallForSaveImages()
        }
    }
    
    @objc func actionForSelectClass(_ sender: UIButton){
        resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForClasses.show()
    }
    
    @objc func actionForSelectStudents(_ sender: UIButton){
        resignTextFieldResponder()
        if activity.className != nil && activity.className != "" {
            showStudentListPopup(sender: sender)
        } else {
            self.showAlert(with: Macros.alertMessages.classSelectFirst)
        }
    }
    
    @objc func actionForPrivacySwitch(_ sender: UISwitch) {
        resignTextFieldResponder()
        activity.isPublic = sender.isOn
        if let cell = self.tblViewForAddNewPost.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? PostActivitySwitchTableViewCell {
            cell.lblForSwitchStatus.text = sender.isOn ? "Yes" : "No"
        }
    }
    
    @objc func actionForRemoveImage(_ sender: UIButton){
        resignTextFieldResponder()
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                if (self.isPhotoSelect ?? false) {
                    self.arrForSelectedImages.remove(at: sender.tag)
                } else {
                    self.selectedVideoURL = nil
                }
                let indexPath = IndexPath(row: 0, section: 0)
                self.tblViewForAddNewPost.reloadRows(at: [indexPath], with: .none)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    @objc func actionForOpenCamera(sender: UIButton){
        resignTextFieldResponder()
        if (isPhotoSelect ?? false) {
            imagePickerVC.openMultipalImagePicker(target: self) { (images) in
                self.dismiss(animated: true, completion: nil)
                if (images.count + self.arrForSelectedImages.count) <= 3 {
                    for image in images {
                        self.arrForSelectedImages.append(image)
                    }
                    let indexPath = IndexPath(row: 0, section: 0)
                    self.tblViewForAddNewPost.reloadRows(at: [indexPath], with: .none)
                } else {
                    self.showAlert(with: Macros.alertMessages.max3Images)
                }
            }
        } else {
            imagePickerVC.openVideoPicker(target: self) { (videoURL) in
                self.selectedVideoURL = videoURL
                let indexPath = IndexPath(row: 0, section: 0)
                self.tblViewForAddNewPost.reloadRows(at: [indexPath], with: .none)
            }
        }
        
        
    }
    
    //MARK:----- Functions -----
    
    //    function for return attributed String
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    //Dropdown list For Classes
    func setupClassesDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrforClassesName   :   [String]    = arrForOperationalClass?.map{$0.label ?? ""} ?? []
//        for i in 0 ..< (arrForOperationalClass?.count ?? 0) {
//            arrforClassesName.append(arrForOperationalClass?[i].className ?? "")
//        }
        dropDownForClasses.anchorView = sender
        dropDownForClasses.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForClasses.dataSource = arrforClassesName
        dropDownForClasses.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.selectedClass?.label != self?.arrForOperationalClass?[index].label {
                self?.selectedClass = self?.arrForOperationalClass?[index]
                self?.activity.classesID = self?.arrForOperationalClass?[index].value
                self?.activity.className = item
                self?.arrForSelectedStudents = []
                self?.apiForGetStudentsByClasses()
            }
            imageView.image = UIImage(named: "arrowDown")
        }
        dropDownForClasses.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    func showStudentListPopup(sender: UIButton) {
        resignTextFieldResponder()
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.StudentListByClassPopupVC) as! StudentListByClassPopupVC
        popoverContent.delegate = self
        popoverContent.arrForAllStudents = self.arrForSelectedClassStudents
        popoverContent.selectedIndex = sender.tag
        popoverContent.arrForSelectedStudents = self.arrForSelectedStudents
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = CGSize(width:300,height:400)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75)   ,width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    func isValidate() -> Bool {
        var isValidate = true
        if (activity.postTitle == nil || activity.postTitle == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.title)
        } else if (activity.postDescription == nil || activity.postDescription == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.description)
        } else if (activity.classesID == nil || activity.classesID == 0) {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.classes)
        } else if (arrForSelectedStudents.count == 0) {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.student)
        }
        if isPhotoSelect ?? false {
            if arrForSelectedImages.count == 0 {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.image)
            }
        } else {
            if selectedVideoURL == nil {
                isValidate = false
                self.showAlert(with: Macros.alertMessages.video)
            }
        }
        return isValidate
    }
    
    func genrateParameter(imageURL:[String]?, videoURL:[String]?) -> Dictionary<String,Any>{
        activity.agencyID = AppInstance.shared.user?.agencyID ?? 0
        activity.id = 0
        activity.studentID = 0
        activity.studentName = ""
        activity.postedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        activity.teacherID = AppInstance.shared.user?.releventUserID
        let selectedStudents:[Int] = arrForSelectedStudents.map{$0.studentId ?? 0}
//        for student in arrForSelectedStudents {
//            selectedStudents.append(student.studentId ?? 0)
//        }
        var arrForSelectedVideo:[[String:Any]] = []
        var arrForSelectedPhotos: [[String:Any]] = []
        if isPhotoSelect ?? false {
            for imgURL in imageURL ?? [] {
                var dictForImage:[String:Any] = [:]
                dictForImage[Macros.ApiKeys.kid] = 0
                dictForImage[Macros.ApiKeys.kpostActivitiesID] = 0
                dictForImage[Macros.ApiKeys.kimageServerPath] = imgURL
                arrForSelectedPhotos.append(dictForImage)
            }
        } else {
            var dictForVideo:[String:Any] = [:]
            dictForVideo[Macros.ApiKeys.kid] = 0
            dictForVideo[Macros.ApiKeys.kpostActivitiesID] = 0
            dictForVideo[Macros.ApiKeys.kvedioServerPath] = videoURL?.first
            arrForSelectedVideo.append(dictForVideo)
        }
        var dictForParameter = activity.dictionaryRepresentation()
        dictForParameter[Macros.ApiKeys.kpostActivityImages] = arrForSelectedPhotos
        dictForParameter[Macros.ApiKeys.kpostActivityvideos] = arrForSelectedVideo
        dictForParameter[Macros.ApiKeys.kselectedStudents] = selectedStudents
        dictForParameter[Macros.ApiKeys.kisPublic] = (activity.isPublic ?? false) ? true : false
        dictForParameter[Macros.ApiKeys.kcreatedBy] = AppInstance.shared.user?.loginUserID
        return dictForParameter
    }
    
    func resignTextFieldResponder(){
        let view = self.view.subviews[0] as? UITableView
        for subview in view?.subviews ?? [] where subview is DropDownTextFieldTableViewCell {
            let cell = subview as? DropDownTextFieldTableViewCell
            cell?.txtFieldForField.resignFirstResponder()
        }
        for subview in view?.subviews ?? [] where subview is TextViewTableViewCell {
            let cell = subview as? TextViewTableViewCell
            cell?.txtViewForField.resignFirstResponder()
        }
    }
    
    
    //MARK:----- API Calling Functions -----
    
    func apiForGetAllClasses(){
        let service = AttendanceService()
        service.getAllClasses(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if let arrForClasses = result as? [OperationalClass]{
                self.arrForClass = arrForClasses
                self.apiCallGetTeacherCurrentOperationalClass()
            }
        }
    }
    
    func apiCallGetTeacherCurrentOperationalClass(){
        let service = DashboarService()
        service.getTeacherCurrentOperationalClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), teacherID: AppInstance.shared.teacher?.id ?? 0, teacherDailyAttendanceID: AppInstance.shared.user?.teacherTodayAttendenceId ?? 0) { (result) in
            if result != nil {
                self.arrForOperationalClass = []
                let operationalClassArray:[OperationalClass] = result as? [OperationalClass] ?? []
              
//                for classes in self.arrForClass {
                    for operationalClass in operationalClassArray {
//                        if classes.value == operationalClass.value {
                            self.arrForOperationalClass?.append(operationalClass)
//                        }
                    }
//                }
                self.tblViewForAddNewPost.reloadData()
            }
        }
    }
    
    func apiForGetStudentsByClasses(){
        let service = StudentService()
        service.getAllStudentsByClass(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, classId: selectedClass?.value ?? 0) { (result) in
            self.arrForSelectedClassStudents = result as? [Student] ?? []
            self.tblViewForAddNewPost.reloadData()
        }
    }
    
    func apiCallForSaveImages(){
        let service = PostActivityService()
        service.uploadImageVideos(with: self, imgArray: arrForSelectedImages, videoURL: selectedVideoURL) { (result) in
            if result != nil {
               (self.isPhotoSelect ?? false) ? self.apiCallForSavePost(param: self.genrateParameter(imageURL: result as? [String] ?? [], videoURL: nil)) : self.apiCallForSavePost(param: self.genrateParameter(imageURL: nil, videoURL: result as? [String] ?? []))
                
            }
        }
    }
    
    func apiCallForSavePost(param:[String:Any]){
        let service = PostActivityService()
        service.savePostActivity(with: self, dictForParam: param) { (result) in
            if result != nil {
                let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
                _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage: result as? String ?? "", buttons: [alertAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
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

//MARK:----- UITableViewDataSource and Delegates -----
extension AddNewPostVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 7
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return customMediaSelectionTableViewCell(tableView:tableView,indexPath:indexPath)
        case 1:
            return customDropDownTextFieldTableViewCell(tableView:tableView,indexPath:indexPath)
        case 2:
            return customTextViewTableViewCell(tableView:tableView,indexPath:indexPath)
        case 3,4:
            return customDropDownButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case 5:
            return customPrivacySelectionTableViewCell(tableView:tableView,indexPath:indexPath)
        case 6:
            return customSubmitButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        default:
            return UITableViewCell()
        }
    }
    
    //MARK:----- Custom cell fucntions -----
    func customMediaSelectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivityMediaTableViewCell) as? PostActivityMediaTableViewCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.attributedText = getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForNewPostTitle[indexPath.row])
            cell.collectionViewForMedia.reloadData()
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownTextFieldTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddNewPost.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForAddNewPost.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.lblForFieldTitle.attributedText = getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForNewPostTitle[indexPath.row])
            cell.btnForField.isHidden = false
            cell.txtFieldForField.isEnabled = false
            cell.imgViewForArrow.isHidden = false
            cell.txtFieldForField.delegate = self
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            switch indexPath.row {
            case 1:
                cell.btnForField.isHidden = true
                cell.txtFieldForField.isEnabled = true
                cell.imgViewForArrow.isHidden = true
                cell.txtFieldForField.text = activity.postTitle
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customTextViewTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForAddNewPost.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForAddNewPost.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            cell.txtViewForField.tag = indexPath.row
            cell.lblForFieldTitle.attributedText = getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForNewPostTitle[indexPath.row])
            cell.txtViewForField.text = activity.postDescription
            return cell
        }
        return UITableViewCell()
    }

    
    func customPrivacySelectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivitySwitchTableViewCell) as? PostActivitySwitchTableViewCell {
            cell.selectionStyle = .none
            cell.switchForPrivacy.tag = indexPath.row
            cell.lblForSwitchStatus.text = (activity.isPublic ?? false) ? "Yes" : "No"
            cell.lblForFieldTitle.attributedText = getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForNewPostTitle[indexPath.row])
            cell.switchForPrivacy.addTarget(self, action: #selector(actionForPrivacySwitch(_:)), for: .valueChanged)
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddNewPost.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForAddNewPost.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForNewPostTitle[indexPath.row])
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 3:
                self.setupClassesDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.btnForField.addTarget(self, action: #selector(actionForSelectClass(_:)), for: .touchUpInside)
                if activity.className != nil && activity.className != "" {
                    cell.btnForField.setTitle(activity.className, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
            case 4:
                cell.btnForField.setTitle("Select", for: .normal)
                cell.btnForField.addTarget(self, action: #selector(actionForSelectStudents(_:)), for: .touchUpInside)
                if (self.arrForSelectedStudents.count) > 0 {
                    cell.lblForSelectedItems.isHidden = false
                    cell.ViewForSelectedItems.isHidden = false
                    var nameOfStudents = String()
                    for student in arrForSelectedStudents {
                        nameOfStudents.append("\(student.studentName ?? ""), ")
                    }
                    cell.lblForSelectedItems.text = nameOfStudents
                } else {
                    cell.lblForSelectedItems.isHidden = true
                    cell.ViewForSelectedItems.isHidden = true
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customSubmitButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
        self.tblViewForAddNewPost.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
        if let cell = self.tblViewForAddNewPost.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
            cell.selectionStyle = .none
            cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit), for: .touchUpInside)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView Delegate and DataSource -----
extension AddNewPostVC: UICollectionViewDelegate,UICollectionViewDataSource, UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return (isPhotoSelect ?? false) ? 3 : 1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if (isPhotoSelect ?? false) {
            if (self.arrForSelectedImages.count > indexPath.row) {
               return (customSelectedDisplayImageCollectionViewCell(collectionView: collectionView, indexPath: indexPath))
            } else {
                return (customSelectImageCollectionViewCell(collectionView: collectionView, indexPath: indexPath))
            }
        } else {
            return (selectedVideoURL != nil) ? customSelectedVideoDisplayCollectionViewCell(collectionView: collectionView, indexPath: indexPath) : customSelectImageCollectionViewCell(collectionView: collectionView, indexPath: indexPath)
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        if !(isPhotoSelect ?? false) {
            let leftInset = (collectionView.bounds.width / 2) - 70
            let rightInset = leftInset
            return UIEdgeInsets(top: 0, left: leftInset, bottom: 0, right: rightInset)
        }
        return UIEdgeInsets()
    }
    
    
    func customSelectedDisplayImageCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell{
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.PostActivityDisplayMediaCollectionViewCell, for: indexPath) as? PostActivityDisplayMediaCollectionViewCell {
            cell.imgViewForSelectedImage.image = self.arrForSelectedImages[indexPath.item]
            cell.btnForRemoveImage.tag = indexPath.item
            cell.btnForRemoveImage.addTarget(self, action: #selector(actionForRemoveImage(_:)), for: .touchUpInside)
            return cell
        }
        return UICollectionViewCell()
    }
    
    func customSelectedVideoDisplayCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell{
        if selectedVideoURL != nil {
            if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.PostActivityDisplayMediaCollectionViewCell, for: indexPath) as? PostActivityDisplayMediaCollectionViewCell {
                cell.btnForRemoveImage.tag = indexPath.item
                cell.btnForRemoveImage.addTarget(self, action: #selector(actionForRemoveImage(_:)), for: .touchUpInside)
                if let videoURL:URL = selectedVideoURL as URL? {
                    let asset = AVURLAsset(url: videoURL)
                    let generator = AVAssetImageGenerator(asset: asset)
                    generator.appliesPreferredTrackTransform = true
                    let timestamp = CMTime(seconds: 1, preferredTimescale: 60)
                    do {
                        let imageRef = try generator.copyCGImage(at: timestamp, actualTime: nil)
                        cell.imgViewForSelectedImage.image = UIImage(cgImage: imageRef)
                    }
                    catch let error as NSError
                    {
                        print("Image generation failed with error \(error)")
                    }
                }
                return cell
            }
            return UICollectionViewCell()
        }
        return UICollectionViewCell()
    }
    
    func customSelectImageCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell{
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.PostActivitySelectMediaCollectionViewCell, for: indexPath) as? PostActivitySelectMediaCollectionViewCell {
            if (isPhotoSelect ?? false) {
                if (indexPath.row == 2) {
                    cell.btnForSelectImage.addTarget(self, action: #selector(actionForOpenCamera(sender:)), for: .touchUpInside)
                    cell.lblForUplodTitle.text = "Upload"
                } else {
                    cell.lblForUplodTitle.text = ""
                    cell.btnForSelectImage.removeTarget(nil, action: nil, for: .allEvents)
                }
            } else {
                cell.lblForUplodTitle.text = "Upload"
                cell.btnForSelectImage.addTarget(self, action: #selector(actionForOpenCamera(sender:)), for: .touchUpInside)
            }
            return cell
        }
        return UICollectionViewCell()
    }
}

//MARK:----- Student List Popup Delegate -----
extension AddNewPostVC: StudentListByClassVCDelegate {
    
    func doneButtonAction(data: String,selectedIndex:Int,selectedStudents: [Student]) {
        print(data)
        self.arrForSelectedStudents = selectedStudents
        let indexPath = IndexPath(row: selectedIndex, section: 0)
        self.tblViewForAddNewPost.reloadRows(at: [indexPath], with: .none)
    }
}


//MARK:----- UITextField Delegates -----
extension AddNewPostVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        activity.postTitle = newString as String
        return true
    }
}

//MARK:----- UITextView Delegates -----
extension AddNewPostVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        activity.postDescription = newString as String
        return true
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddNewPost.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }

    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddNewPost.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}

//MARK:----- PostActivityMediaTableViewCell -----
class PostActivityMediaTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var collectionViewForMedia: UICollectionView!
    
}

//MARK:----- PostActivitySwitchTableViewCell -----
class PostActivitySwitchTableViewCell: UITableViewCell{
    @IBOutlet weak var switchForPrivacy: UISwitch!
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var lblForSwitchStatus: UILabel!
}

//MARK:----- PostActivitySelectMediaCollectionViewCell -----
class PostActivitySelectMediaCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var btnForSelectImage: UIButton!
    @IBOutlet weak var lblForUplodTitle: UILabel!
    
}

//MARK:----- PostActivityDisplayMediaCollectionViewCell -----
class PostActivityDisplayMediaCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var imgViewForSelectedImage: UIImageView!
    @IBOutlet weak var btnForRemoveImage: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForSelectedImage.cornerRadius = 20
        // Initialization code
    }
}

