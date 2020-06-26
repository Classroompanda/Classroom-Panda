//
//  PostActivityVC.swift
//  Daycare
//
//  Created by amrut waghmare on 06/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown
import ActionSheetPicker_3_0
import SDWebImage
import Floaty
import AVFoundation

class PostActivityVC: BaseViewController,FloatyDelegate {

    @IBOutlet weak var tblViewForPosts: UITableView!
    let dropDownForClass    = DropDown()
    var selectedClass:Class?
    var selectedDate:Date?
    var floaty = Floaty()
    var arrForClass         :   [Class]     = []
    var arrForPostActivity  :   [PostActivity]  = []
    var refreshControl = UIRefreshControl()
    var isFirstLoad:Bool = true
    var arrForOperationalClass : [Class]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.selectedDate = Date()
        if AppInstance.shared.currentCheckInClass.classesID != 0 && AppInstance.shared.currentCheckInClass.classesID != nil {
            layoutFAB()
            
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationTitle.PostActivity)
        self.apiForGetAllClasses()
        refreshControl.attributedTitle = NSAttributedString(string: Macros.refresh)
        refreshControl.addTarget(self, action: #selector(actionForRefresh(sender:)), for: UIControl.Event.valueChanged)
        tblViewForPosts.addSubview(refreshControl)
    }
    
    //MARK:----- @IBActions -----
    
    @objc func openDatePicker(sender: UIButton){
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: self.selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let tagDayLabel   = self.view.viewWithTag(1003) as! UILabel
            let tagMonthYearLabel   = self.view.viewWithTag(1002) as! UILabel
            let tagDateLabel   = self.view.viewWithTag(1001) as! UILabel
            let dateTime    = value as! Date
            tagDayLabel.text = CommonClassMethods.dayNameFromDate(date: dateTime)
            tagMonthYearLabel.text = CommonClassMethods.monthNameFromDate(date:dateTime) + " " + CommonClassMethods.yearFromDate(date: dateTime)
            tagDateLabel.text = CommonClassMethods.dateFromDate(date: dateTime)
            if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) != CommonClassMethods.convertDateWithoutTime(date: dateTime){
                self.selectedDate = dateTime
                if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
                    if ((self.arrForOperationalClass?.count ?? 0) > 0) {
                        self.selectedClass = self.arrForOperationalClass?[0]
                    } else {
                        self.selectedClass = nil
                        self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
                    }
                } else {
                    if self.selectedClass == nil || self.selectedClass?.className == "" ||
                        self.selectedClass?.className == nil {
                        if self.arrForClass.count > 0 {
                            self.selectedClass = self.arrForClass[0]
                        }
                    }
                }
                self.apiForGetPostActivityList()
            }
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.maximumDate = Date()
        datePicker?.show()
    }
    

    
    @objc func showClassesDropdown(sender: UIButton){
        if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()){
            if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
                 self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
            } else {
                sender.setImage(UIImage(named: "arrowUp"), for: .normal)
                dropDownForClass.show()
            }
        } else {
            sender.setImage(UIImage(named: "arrowUp"), for: .normal)
            dropDownForClass.show()
        }
    }
    
    
    @objc func actionForShowDetailPost(_ sender: UIButton){
        if self.arrForPostActivity.count > 0 {
            if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.ActivityDetailsVC) as? ActivityDetailsVC {
                vc.postActivity = self.arrForPostActivity[sender.tag]
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    
    @objc func actionForDelete(_ sender: UIButton){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiCallForSavePost(param: self.genrateParameter(activity: self.arrForPostActivity[sender.tag]))
                self.arrForPostActivity.remove(at: sender.tag)
                self.tblViewForPosts.reloadData()
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    @objc func actionForRefresh(sender:AnyObject) {
        apiForGetPostActivityList()
    }
    
    //MARK:----- Functions -----
    
    func layoutFAB() {
        let btnForVideo = FloatyItem()
        btnForVideo.hasShadow = false
        btnForVideo.buttonColor = colorCode.applicationColor
        btnForVideo.titleShadowColor = UIColor.blue
        btnForVideo.titleLabelPosition = .left
        btnForVideo.titleLabel.font = fonts.customLoginButtonFont
        btnForVideo.title = "Video"
        btnForVideo.iconImageView.image = UIImage(named: "video")
        btnForVideo.handler = { item in
            self.navigateToAddNewPost(isPhotoSelect: false)
        }
        floaty.addItem(item: btnForVideo)
        let btnForCamera = FloatyItem()
        btnForCamera.hasShadow = false
        btnForCamera.buttonColor = colorCode.applicationColor
        btnForCamera.titleShadowColor = UIColor.blue
        btnForCamera.titleLabelPosition = .left
        btnForCamera.titleLabel.font = fonts.customLoginButtonFont
        btnForCamera.title = "Photo"
        btnForCamera.iconImageView.image = UIImage(named: "camera")
        btnForCamera.handler = { item in
            self.navigateToAddNewPost(isPhotoSelect: true)
        }
        floaty.addItem(item: btnForCamera)
        floaty.hasShadow = false
        floaty.plusColor = .white
        floaty.buttonColor = colorCode.applicationColor
        floaty.fabDelegate = self
        self.view.addSubview(floaty)
    }
    
    //Dropdown list
    func setupClassesDropDown(sender:UIButton){
        var arrForClassDropDown:[Class] = []
        if CommonClassMethods.convertDateWithoutTime(date: selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
           arrForClassDropDown = arrForOperationalClass ?? []
        } else {
            arrForClassDropDown = arrForClass
        }
        dropDownForClass.anchorView = sender
        dropDownForClass.bottomOffset = CGPoint(x: 0, y: sender.bounds.height)
        dropDownForClass.dataSource = arrForClassDropDown.map{$0.className ?? ""}
        dropDownForClass.selectionAction = { [weak self] (index, item) in
            sender.setTitle(self?.dropDownForClass.dataSource[index], for: .normal)
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
//            if self?.selectedClass != self?.arrForClass[index] { // inside methods not getting called due to this condition
              self?.selectedClass = arrForClassDropDown[index]
                self?.apiForGetPostActivityList()
//            }
        }

        dropDownForClass.cancelAction = { [unowned self] in
            sender.setImage(UIImage(named: "arrowDown"), for: .normal)
        }
    }
    
    
    func navigateToAddNewPost(isPhotoSelect:Bool){
        if let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddNewPostVC) as? AddNewPostVC {
            vc.isPhotoSelect = isPhotoSelect
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    func genrateParameter(activity: PostActivity) -> Dictionary<String,Any>{
        var arrForSelectedVideo:[[String:Any]] = []
        var arrForSelectedPhotos: [[String:Any]] = []
        for i in 0..<(activity.postActivityImages?.count ?? 0) {
            var dictForImage:[String:Any] = [:]
            dictForImage = activity.postActivityImages?[i].dictionaryRepresentation() ?? [:]
            arrForSelectedPhotos.append(dictForImage)
        }
        for i in 0..<(activity.postActivityVideos?.count ?? 0) {
            var dictForVideo:[String:Any] = [:]
            dictForVideo = activity.postActivityVideos?[i].dictionaryRepresentation() ?? [:]
            arrForSelectedVideo.append(dictForVideo)
        }
        activity.isDeleted = true
        activity.deletedDate = CommonClassMethods.convertDateToServerReadableFormat(date: Date())
        var dictForParameter = activity.dictionaryRepresentation()
        dictForParameter[Macros.ApiKeys.kpostActivityImages] = arrForSelectedPhotos
        dictForParameter[Macros.ApiKeys.kpostActivityvideos] = arrForSelectedVideo
        dictForParameter[Macros.ApiKeys.kselectedStudents] = [activity.studentID ?? 0]
        dictForParameter[Macros.ApiKeys.kdeletedBy] = AppInstance.shared.user?.loginUserID
        return dictForParameter
    }

    //MARK:----- API Calling Functions -----
    
    func apiForGetAllClasses(){
        let service = AttendanceService()
        service.getAllClasses(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if let arrForClasses = result as? [Class]{
                self.arrForClass = arrForClasses
                if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
                    self.isFirstLoad = false
                    self.tblViewForPosts.reloadData()
                    if CommonClassMethods.convertDateWithoutTime(date: self.selectedDate ?? Date()) == CommonClassMethods.convertDateWithoutTime(date: Date()) {
                        self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
                    }
                }else {
                    self.apiCallGetTeacherCurrentOperationalClass()
                }
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
//                    for operationalClass in operationalClassArray {
//                        if classes.classesID == operationalClass.value {
//                            self.arrForOperationalClass?.append(classes)
//                        }
//                    }
//                }
                let arrClassesId = operationalClassArray.map{$0.value}
                self.arrForOperationalClass = self.arrForClass.filter{arrClassesId.contains($0.classesID)}
                
                if self.selectedClass == nil {
                    if (self.arrForOperationalClass?.count ?? 0) > 0 {
                        self.selectedClass = self.arrForOperationalClass?[0]
                    }
                }
                self.apiForGetPostActivityList()
            }
        }
    }
    
    func apiForGetPostActivityList(){
        let service = PostActivityService()
        service.getPostActivityList(with: self, id: 0, agencyID: AppInstance.shared.user?.agencyID ?? 0, classesID: selectedClass?.classesID ?? 0, postedDate: CommonClassMethods.convertDateToServerReadableFormatGET(date: selectedDate ?? Date()), userID: AppInstance.shared.user?.releventUserID ?? 0) { (result) in
            if result != nil {
                self.isFirstLoad = false
                self.refreshControl.endRefreshing()
                self.arrForPostActivity = result as? [PostActivity] ?? []
                self.tblViewForPosts.reloadData()
            }
        }
    }
    
    func apiCallForSavePost(param:[String:Any]){
        let service = PostActivityService()
        service.savePostActivity(with: nil, dictForParam: param) { (result) in
            if result as? String != nil {
                if self.arrForPostActivity.count == 0 {
                    self.tblViewForPosts.reloadData()
                }
            }
        }
    }
}



//MARK: ----- UITableViewDelegates and Datasource -----
extension PostActivityVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (self.isFirstLoad) ? 0 : (self.arrForPostActivity.count > 0) ? self.arrForPostActivity.count : 1
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customDateToddlerHeaderCell(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return self.arrForPostActivity.count > 0 ? customPostActivityTableViewCell(tableView:tableView,indexPath:indexPath) : CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForPosts)
    }
    
  
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 70.0
    }
    
    //Custom PostActivityDataCell
    func customPostActivityTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if  let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivityTableViewCell) as? PostActivityTableViewCell {
            cell.selectionStyle = .none
            cell.lblForStudentName.text = self.arrForPostActivity[indexPath.row].studentName ?? ""
            cell.lblForActivityTitle.text = self.arrForPostActivity[indexPath.row].postTitle ?? ""
            cell.lblForActivityDescription.text = self.arrForPostActivity[indexPath.row].postDescription ?? ""
            cell.btnForImage1.isHidden = true
            cell.btnForImage2.isHidden = true
            cell.btnForImage3.isHidden = true
            cell.btnForImage1.tag = indexPath.row
            cell.btnForImage2.tag = indexPath.row
            cell.btnForImage3.tag = indexPath.row
            cell.btnForImage1.setImage(nil, for: .normal)
            cell.btnForImage2.setImage(nil, for: .normal)
            cell.btnForImage1.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage2.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage3.imageView?.contentMode = .scaleAspectFill
            cell.btnForDelete.tag = indexPath.row
            cell.btnForDelete.addTarget(self, action: #selector(actionForDelete(_:)), for: .touchUpInside)
            cell.btnForImage1.addTarget(self, action: #selector(actionForShowDetailPost(_:)), for: .touchUpInside)
            cell.btnForImage2.addTarget(self, action: #selector(actionForShowDetailPost(_:)), for: .touchUpInside)
            cell.btnForImage3.addTarget(self, action: #selector(actionForShowDetailPost(_:)), for: .touchUpInside)
            cell.lblForDate.text = CommonClassMethods.dateMonthNameFromDateString(date: self.arrForPostActivity[indexPath.row].postedDate ?? "")
            cell.imgForPrivacy.image = self.arrForPostActivity[indexPath.row].isPublic ?? false ? UIImage(named: "world") : UIImage(named: "lock")
            cell.btnForLikes.setTitle(String(self.arrForPostActivity[indexPath.row].totalLikes ?? 0), for: .normal)
            cell.btnForComments.setTitle(String(self.arrForPostActivity[indexPath.row].commentCount ?? 0), for: .normal)
            cell.imgViewForProfile.sd_imageIndicator = SDWebImageActivityIndicator.gray

//            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
//            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
            cell.imgViewForProfile.sd_setImage(with: URL(string: arrForPostActivity[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
                }
            }
            if self.arrForPostActivity[indexPath.row].postActivityImages?.count ?? 0 > 0 {
                for i in 0..<(self.arrForPostActivity[indexPath.row].postActivityImages?.count ?? 0) {
                    switch i {
                    case 0:
                        cell.btnForImage1.isHidden = false
                        cell.btnForImage1.sd_imageIndicator = SDWebImageActivityIndicator.gray

//                        cell.btnForImage1.sd_setShowActivityIndicatorView(true)
//                        cell.btnForImage1.sd_setIndicatorStyle(.gray)
                        cell.btnForImage1.sd_setImage(with: URL(string: self.arrForPostActivity[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 1:
                        cell.btnForImage2.isHidden = false
                        cell.btnForImage2.sd_imageIndicator = SDWebImageActivityIndicator.gray

//                        cell.btnForImage2.sd_setShowActivityIndicatorView(true)
//                        cell.btnForImage2.sd_setIndicatorStyle(.gray)
                        cell.btnForImage2.sd_setImage(with: URL(string: self.arrForPostActivity[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 2:
                        cell.btnForImage3.isHidden = false
                        cell.btnForImage3.sd_imageIndicator = SDWebImageActivityIndicator.gray

//                        cell.btnForImage3.sd_setShowActivityIndicatorView(true)
//                        cell.btnForImage3.sd_setIndicatorStyle(.gray)
                        cell.btnForImage3.sd_setImage(with: URL(string: self.arrForPostActivity[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    default:
                        print("Invalid Case")
//                        cell.btnForImage3.isHidden = false
//                        cell.btnForImage3.setTitle("+\((self.arrForPostActivity[indexPath.row].postActivityImages?.count ?? 0) - 2)", for: .normal)
                    }
                }
            } else if self.arrForPostActivity[indexPath.row].postActivityVideos?.count ?? 0 > 0 {
                cell.btnForImage1.isHidden = false
                cell.btnForImage1.sd_imageIndicator = SDWebImageActivityIndicator.gray

//                cell.btnForImage1.sd_setShowActivityIndicatorView(true)
//                cell.btnForImage1.sd_setIndicatorStyle(.gray)
                DispatchQueue.global(qos: .background).async {
                    if let videoURL:URL = URL(string: self.arrForPostActivity[indexPath.row].postActivityVideos?[0].vedioServerPath ?? "") {
                        let asset = AVURLAsset(url: videoURL)
                        let generator = AVAssetImageGenerator(asset: asset)
                        generator.appliesPreferredTrackTransform = true
                        let timestamp = CMTime(seconds: 1, preferredTimescale: 60)
                        do {
                            let imageRef = try generator.copyCGImage(at: timestamp, actualTime: nil)
                            DispatchQueue.main.async {
                                cell.btnForImage1.setImage(UIImage(cgImage: imageRef), for: .normal)
                            }
                        }
                        catch let error as NSError
                        {
                            print("Image generation failed with error \(error)")
                        }
                    }
                }
            }
            return cell
        }
        return UITableViewCell()
    }

    //MARK:----- Custom TableView Cell -----
    
    //TableView Header Cell
    func customDateToddlerHeaderCell(tableView:UITableView) -> UIView{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateToddlerHeaderCell, bundle: nil)
        self.tblViewForPosts.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateToddlerHeaderCell)
        if let cell = self.tblViewForPosts.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateToddlerHeaderCell) as? DateToddlerHeaderCell {
            cell.selectionStyle = .none
            self.setupClassesDropDown(sender: cell.btnForToddler)
            
            (selectedClass == nil || selectedClass?.className == nil || selectedClass?.className == "") ? cell.btnForToddler.setTitle("Select", for: .normal) : cell.btnForToddler.setTitle(selectedClass?.className, for: .normal)
            
            cell.lblForMonthYear.text = CommonClassMethods.monthNameFromDate(date: selectedDate ?? Date()) + " " + CommonClassMethods.yearFromDate(date: selectedDate ?? Date())
            cell.lblForDate.text = CommonClassMethods.dateFromDate(date: selectedDate ?? Date())
            cell.lblForDay.text = CommonClassMethods.dayNameFromDate(date: selectedDate ?? Date())
            cell.btnForToddler.addTarget(self, action: #selector(showClassesDropdown), for: .touchUpInside)
            cell.btnForCalender.addTarget(self, action: #selector(openDatePicker), for: .touchUpInside)
            return cell.contentView
        }
        return UIView()
    }
}


//MARK: ----- PostActivity TableView Cell -----
class PostActivityTableViewCell: UITableViewCell{
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var imgForPrivacy: UIImageView!
    @IBOutlet weak var lblForActivityTitle: UILabel!
    @IBOutlet weak var lblForActivityDescription: UILabel!
    @IBOutlet weak var btnForImage1: UIButton!
    @IBOutlet weak var btnForImage2: UIButton!
    @IBOutlet weak var btnForImage3: UIButton!
    @IBOutlet weak var btnForComments: UIButton!
    @IBOutlet weak var btnForLikes: UIButton!
    @IBOutlet weak var btnForDelete: UIButton!
    @IBOutlet weak var approvalStatusLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        approvalStatusLabel.isHidden = true
        imgViewForProfile.cornerRadius = imgViewForProfile.bounds.height/2
        // Initialization code
    }
}
