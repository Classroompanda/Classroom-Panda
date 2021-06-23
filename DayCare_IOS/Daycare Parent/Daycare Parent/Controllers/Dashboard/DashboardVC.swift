//
//  DashboardVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import AVFoundation
import SDWebImage
import DropDown
class DashboardVC: BaseViewController {
    
    @IBOutlet weak var lblForPrivate: UILabel!
    @IBOutlet weak var lblForPublic: UILabel!
    @IBOutlet weak var btnForPrivate: UIButton!
    @IBOutlet weak var tblViewForPostActivity: UITableView!
    @IBOutlet weak var btnForPublic: UIButton!
    var arrForPublicPostActivities:[PostActivity] = []
    var arrForPrivatePostActivities:[PostActivity] = []
    var isFirstLoad = true
//    var dropDownforStudent = DropDown()
    var pageNoForPublic         : Int   = 0
    var pageNoForPrivate        : Int   = 0
    var shouldCallAPIForPublic  : Bool  = true
    var shouldCallAPIForPrivate : Bool  = true
    var limit                   : Int   = 20
    var isPublicFirstLoad = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBar(title: Macros.NavigationBarTitle.Dashboard)
        self.btnForPublic.isSelected = true
        self.tblViewForPostActivity.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        if (AppInstance.shared.selectedChild != nil) {
            self.setupChildListMenu()
            self.apiCallForGetPostActivityList(isPublic: true, pageNumber: pageNoForPublic)
        } else {
            (isFirstLoad = false)
        }
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForPublic(_ sender: Any) {
        self.btnForPrivate.isSelected = false
        self.btnForPublic.isSelected = true
        self.btnForPrivate.titleLabel?.textColor = colorCode.unSelectedButtonColor
        self.btnForPublic.titleLabel?.textColor = colorCode.selectedButtonColor
        lblForPrivate.backgroundColor = .white
        lblForPublic.backgroundColor = colorCode.applicationColor
        tblViewForPostActivity.reloadData()
    }
    
    @IBAction func actionForPrivate(_ sender: Any) {
        self.apiCallForGetPostActivityList(isPublic: false, pageNumber: self.pageNoForPrivate)

        self.btnForPublic.isSelected = false
        self.btnForPrivate.isSelected = true
        self.btnForPrivate.titleLabel?.textColor = colorCode.selectedButtonColor
        self.btnForPublic.titleLabel?.textColor = colorCode.unSelectedButtonColor
        lblForPrivate.backgroundColor = colorCode.applicationColor
        lblForPublic.backgroundColor = .white
        tblViewForPostActivity.reloadData()
    }
    
    @objc func actionForLike(_ sender: UIButton) {
        if btnForPublic.isSelected {
            if !(self.arrForPublicPostActivities[sender.tag].isPostALreadyLiked ?? false){
                if let cell = self.tblViewForPostActivity.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? PostActivityPublicTableViewCell {
                    cell.btnForLikes.setImage(UIImage(named: "liked"), for: .normal)
                    self.arrForPublicPostActivities[sender.tag].totalLikes = (self.arrForPublicPostActivities[sender.tag].totalLikes ?? 0) + 1
                    self.arrForPublicPostActivities[sender.tag].isPostALreadyLiked = true
                    cell.btnForLikes.setTitle(String(self.arrForPublicPostActivities[sender.tag].totalLikes ?? 0), for: .normal)
                    if (self.arrForPublicPostActivities[sender.tag].postActivityImages?.count ?? 0) > 0 {
                        self.apiCallForLikeCommentOnImagePost(postActivity: self.arrForPublicPostActivities[sender.tag])
                    } else if (self.arrForPublicPostActivities[sender.tag].postActivityVideos?.count ?? 0) > 0 {
                        self.apiCallForLikeCommentOnVideoPost(postActivity: self.arrForPublicPostActivities[sender.tag])
                    }
                }
            }
        } else {
            if !(self.arrForPrivatePostActivities[sender.tag].isPostALreadyLiked ?? false){
                if let cell = self.tblViewForPostActivity.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? PostActivityPublicTableViewCell {
                    cell.btnForLikes.setImage(UIImage(named: "liked"), for: .normal)
                    self.arrForPrivatePostActivities[sender.tag].totalLikes = (self.arrForPrivatePostActivities[sender.tag].totalLikes ?? 0) + 1
                    self.arrForPrivatePostActivities[sender.tag].isPostALreadyLiked = true
                    cell.btnForLikes.setTitle(String(self.arrForPrivatePostActivities[sender.tag].totalLikes ?? 0), for: .normal)
                    if (self.arrForPrivatePostActivities[sender.tag].postActivityImages?.count ?? 0) > 0 {
                        self.apiCallForLikeCommentOnImagePost(postActivity: self.arrForPrivatePostActivities[sender.tag])
                    } else if (self.arrForPrivatePostActivities[sender.tag].postActivityVideos?.count ?? 0) > 0 {
                        self.apiCallForLikeCommentOnVideoPost(postActivity: self.arrForPrivatePostActivities[sender.tag])
                    }
                }
            }
        }
    }
    
    @objc func actionForComment(_ sender: UIButton) {
        if let cell = self.tblViewForPostActivity.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? PostActivityTableViewCell {
            cell.viewForComment.isHidden = false
            self.arrForPrivatePostActivities[sender.tag].commentCount = (self.arrForPrivatePostActivities[sender.tag].commentCount ?? 0) + 1
            cell.btnForComments.setTitle(String(self.arrForPrivatePostActivities[sender.tag].commentCount ?? 0), for: .normal)
            cell.lblForComment.text = self.arrForPrivatePostActivities[sender.tag].postComment
            if (self.arrForPrivatePostActivities[sender.tag].postActivityImages?.count ?? 0) > 0 {
                self.apiCallForLikeCommentOnImagePost(postActivity: self.arrForPrivatePostActivities[sender.tag])
            } else if (self.arrForPrivatePostActivities[sender.tag].postActivityVideos?.count ?? 0) > 0 {
                self.apiCallForLikeCommentOnVideoPost(postActivity: self.arrForPrivatePostActivities[sender.tag])
            }
        }
    }
    
    @objc func actionForActivityDetail(_ sender: UIButton){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.ActivityDetailsVC) as! ActivityDetailsVC
        vc.postActivity = self.btnForPublic.isSelected ? self.arrForPublicPostActivities[sender.tag] :  self.arrForPrivatePostActivities[sender.tag]
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    @objc func actionForOpenDropdown(sender: UIButton){
        self.setupDropDown(sender: sender)
        dropDownforStudent.show()
    }
    
    //MARK:----- Functions ------
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
        dropDownforStudent.width = PlatformUtils.isPad ? 300 : 200.0
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
            if (AppInstance.shared.selectedChild?.studentId != AppInstance.shared.arrForChild?[index].studentId){
                AppInstance.shared.selectedChild = AppInstance.shared.arrForChild?[index]
                self?.setupChildListMenu()
//                self?.arrForPublicPostActivities = []
                self?.arrForPrivatePostActivities = []
//                self?.pageNoForPublic = 0
                self?.pageNoForPrivate = 0
//                self?.shouldCallAPIForPublic = true
                self?.shouldCallAPIForPrivate = true
                self?.isFirstLoad = true
//                williaself?.isPublicFirstLoad = true
                self?.apiCallForGetPostActivityList(isPublic: false, pageNumber: self?.pageNoForPrivate ?? 0)
                //                self?.apiCallForGetPostActivityList(isPublic: false, pageNumber: self?.pageNoForPrivate ?? 0)
            }
        }
    }
    
    //MARK:----- API Calling Functions -------
    func apiCallForGetPostActivityList(isPublic: Bool, pageNumber: Int){
        let service = DashboardService()
        self.showLoader()
        service.getPostActivityList(with: nil, studentID: isPublic ? 0 : (AppInstance.shared.selectedChild?.studentId ?? 0), agencyID: AppInstance.shared.user?.agencyID ?? 0, userID: AppInstance.shared.user?.releventUserID ?? 0, isPublic: isPublic, page: pageNumber, limit: limit) { (result) in
            //            DispatchQueue.main.async {
            self.isFirstLoad = false
            if let arrForPosts:[PostActivity] = result as? [PostActivity] {
                if isPublic {
                    if arrForPosts.count < self.limit {
                        self.shouldCallAPIForPublic = false
                    }
                    self.arrForPublicPostActivities.append(contentsOf: arrForPosts)
                } else {
                    if arrForPosts.count < self.limit {
                        self.shouldCallAPIForPrivate = false
                    }
                    self.arrForPrivatePostActivities.append(contentsOf: arrForPosts)
                }
                if !self.isFirstLoad {
                    if self.isPublicFirstLoad {
                        self.isPublicFirstLoad = false
                        self.hideLoader()
                        self.tblViewForPostActivity.reloadData()
                   // self.apiCallForGetPostActivityList(isPublic: false, pageNumber: self.pageNoForPrivate)
                    } else {
                       self.hideLoader()
                        self.tblViewForPostActivity.reloadData()
                    }
                }
                //                    isPublic ? (self.arrForPublicPostActivities = result as? [PostActivity]) : (self.arrForPrivatePostActivities = result as? [PostActivity])
                //                    isPublic ? self.apiCallForGetPostActivityList(isPublic: false, pageNumber: self.pageNoForPrivate) : (self.isFirstLoad = false)
                //                    if !isPublic {
                //                        self.tblViewForPostActivity.reloadData()
                //                    }
                //                }
            }
        }
    }
    
    func apiCallForLikeCommentOnImagePost(postActivity: PostActivity){
        let service = DashboardService()
        DispatchQueue.global(qos: .background).async {
            service.savePostImageLike(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: postActivity.studentID ?? 0, postActivitiesID: postActivity.postActivityImages?.first?.postActivitiesID ?? 0, postActivityImagesID: postActivity.postActivityImages?.first?.id ?? 0, likeCount: 1, comment: postActivity.postComment ?? "", isActive: true, createdBy: AppInstance.shared.user?.loginUserID ?? 0, complition: { (result) in
                print(result as Any)
            })
        }
    }
    
    func apiCallForLikeCommentOnVideoPost(postActivity: PostActivity){
        let service = DashboardService()
        DispatchQueue.global(qos: .background).async {
            service.savePostVideoLike(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentId: postActivity.studentID ?? 0, postActivitiesID: postActivity.postActivityImages?.first?.postActivitiesID ?? 0, postActivityVideosID: postActivity.postActivityVideos?.first?.id ?? 0, likeCount: 1, comment: postActivity.postComment ?? "", isActive: true, createdBy: AppInstance.shared.user?.loginUserID ?? 0, complition: { (result) in
                print(result as Any)
            })
        }
    }
}

//MARK:----- UITableView Delegates & Datasources
extension DashboardVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if !isFirstLoad {
            if btnForPublic.isSelected {
                return (self.arrForPublicPostActivities.count) == 0 ? 1 : (self.arrForPublicPostActivities.count)
            } else {
                return (self.arrForPrivatePostActivities.count) == 0 ? 1 : (self.arrForPrivatePostActivities.count)
            }
        } else {
            return 0
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if btnForPublic.isSelected {
            return (self.arrForPublicPostActivities.count) == 0 ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForPostActivity) : customPublicPostActivityCell(tableView:tableView, indexPath:indexPath)
        } else {
            
            return (self.arrForPrivatePostActivities.count) == 0 ? CommonClassMethods.customNoDataFoundCell(tableView: tblViewForPostActivity) : customPrivatePostActivityCell(tableView:tableView, indexPath:indexPath)
        }
    }
    
    
    func customPublicPostActivityCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivityPublicTableViewCell) as? PostActivityPublicTableViewCell {
            cell.selectionStyle = .none
            cell.lblForStudentName.text = self.arrForPublicPostActivities[indexPath.row].studentName ?? ""
            cell.lblForActivityTitle.text = self.arrForPublicPostActivities[indexPath.row].postTitle ?? ""
            cell.lblForActivityDescription.text = self.arrForPublicPostActivities[indexPath.row].postDescription ?? ""
            cell.btnForImage1.isHidden = true
            cell.btnForImage2.isHidden = true
            cell.btnForImage3.isHidden = true
            cell.btnForImage1.tag = indexPath.row
            cell.btnForImage2.tag = indexPath.row
            cell.btnForImage3.tag = indexPath.row
            cell.btnForLikes.tag = indexPath.row
            cell.btnForImage1.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage2.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage3.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage1.setImage(nil, for: .normal)
            cell.btnForImage2.setImage(nil, for: .normal)
            cell.btnForImage3.setImage(nil, for: .normal)
            cell.btnForImage1.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.btnForImage2.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.btnForImage3.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: self.arrForPublicPostActivities[indexPath.row].postedDate ?? "")
            cell.imgForPrivacy.image = self.arrForPublicPostActivities[indexPath.row].isPublic ?? false ? UIImage(named: "world") : UIImage(named: "lock")
            cell.btnForLikes.setTitle(String(self.arrForPublicPostActivities[indexPath.row].totalLikes ?? 0), for: .normal)
            cell.btnForComments.setTitle(String(self.arrForPublicPostActivities[indexPath.row].commentCount ?? 0), for: .normal)
            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
            cell.imgViewForProfile.sd_setImage(with: URL(string: arrForPublicPostActivities[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
                }
            }
            if self.arrForPublicPostActivities[indexPath.row].postActivityImages?.count ?? 0 > 0 {
                for i in 0..<(self.arrForPublicPostActivities[indexPath.row].postActivityImages?.count ?? 0) {
                    switch i {
                    case 0:
                        cell.btnForImage1.isHidden = false
                        cell.btnForImage1.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage1.sd_setIndicatorStyle(.gray)
                        cell.btnForImage1.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal) { (image, error, type, url) in
//                            if error != nil {
//                                cell.btnForImage1.setImage(UIImage(named: "gallery"), for: .normal)
//                            }
                        }
                        
//                        cell.btnForImage1.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 1:
                        cell.btnForImage2.isHidden = false
                        cell.btnForImage2.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage2.sd_setIndicatorStyle(.gray)
                        cell.btnForImage2.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal) { (image, error, type, url) in
//                            if error != nil {
//                                cell.btnForImage2.setImage(UIImage(named: "gallery"), for: .normal)
//                            }
                        }
//                        cell.btnForImage2.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 2:
                        cell.btnForImage3.isHidden = false
                        cell.btnForImage3.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage3.sd_setIndicatorStyle(.gray)
                        cell.btnForImage3.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal) { (image, error, type, url) in
//                            if error != nil {
//                                cell.btnForImage3.setImage(UIImage(named: "gallery"), for: .normal)
//                            }
                        }
//                        cell.btnForImage3.sd_setImage(with: URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    default:
                        print("invalid case")
                    }
                }
            } else if self.arrForPublicPostActivities[indexPath.row].postActivityVideos?.count ?? 0 > 0 {
                cell.btnForImage1.isHidden = false
                cell.btnForImage1.sd_setShowActivityIndicatorView(true)
                cell.btnForImage1.sd_setIndicatorStyle(.gray)
                 DispatchQueue.global(qos: .background).async {
                    if let videoURL:URL = URL(string: self.arrForPublicPostActivities[indexPath.row].postActivityVideos?[0].vedioServerPath ?? "") {
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
            cell.btnForLikes.addTarget(self, action: #selector(actionForLike(_:)), for: .touchUpInside)
            cell.btnForComments.isHidden = true
            (self.arrForPublicPostActivities[indexPath.row].isPostALreadyLiked ?? false) ? cell.btnForLikes.setImage(UIImage(named: "liked"), for: .normal) : cell.btnForLikes.setImage(UIImage(named: "like"), for: .normal)
            if (indexPath.row == (arrForPublicPostActivities.count) - 1) {
                if shouldCallAPIForPublic {
                    pageNoForPublic += 1
                    self.apiCallForGetPostActivityList(isPublic: true, pageNumber: pageNoForPublic)
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customPrivatePostActivityCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivityPublicTableViewCell) as? PostActivityPublicTableViewCell {
            cell.selectionStyle = .none
            cell.lblForStudentName.text = self.arrForPrivatePostActivities[indexPath.row].studentName ?? ""
            cell.lblForActivityTitle.text = self.arrForPrivatePostActivities[indexPath.row].postTitle ?? ""
            cell.lblForActivityDescription.text = self.arrForPrivatePostActivities[indexPath.row].postDescription ?? ""
            cell.btnForImage1.isHidden = true
            cell.btnForImage2.isHidden = true
            cell.btnForImage3.isHidden = true
            cell.btnForImage1.tag = indexPath.row
            cell.btnForImage2.tag = indexPath.row
            cell.btnForImage3.tag = indexPath.row
            cell.btnForImage1.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage2.imageView?.contentMode = .scaleAspectFill
            cell.btnForImage3.imageView?.contentMode = .scaleAspectFill
            cell.btnForLikes.tag = indexPath.row
            cell.btnForImage1.setImage(nil, for: .normal)
            cell.btnForImage2.setImage(nil, for: .normal)
            cell.btnForImage3.setImage(nil, for: .normal)
            cell.btnForImage1.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.btnForImage2.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.btnForImage3.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
            cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: self.arrForPrivatePostActivities[indexPath.row].postedDate ?? "")
            //CommonClassMethods.dateMonthNameFromDateString(date: self.arrForPrivatePostActivities?[indexPath.row].postedDate ?? "")
            cell.imgForPrivacy.image = self.arrForPrivatePostActivities[indexPath.row].isPublic ?? false ? UIImage(named: "world") : UIImage(named: "lock")
            cell.btnForLikes.setTitle(String(self.arrForPrivatePostActivities[indexPath.row].totalLikes ?? 0), for: .normal)
            cell.btnForComments.setTitle(String(self.arrForPrivatePostActivities[indexPath.row].commentCount ?? 0), for: .normal)
            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
            cell.imgViewForProfile.sd_setImage(with: URL(string: arrForPrivatePostActivities[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                if error != nil {
                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
                }
            }
            if self.arrForPrivatePostActivities[indexPath.row].postActivityImages?.count ?? 0 > 0 {
                for i in 0..<(self.arrForPrivatePostActivities[indexPath.row].postActivityImages?.count ?? 0) {
                    switch i {
                    case 0:
                        cell.btnForImage1.isHidden = false
                        cell.btnForImage1.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage1.sd_setIndicatorStyle(.gray)
                        cell.btnForImage1.sd_setImage(with: URL(string: self.arrForPrivatePostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 1:
                        cell.btnForImage2.isHidden = false
                        cell.btnForImage2.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage2.sd_setIndicatorStyle(.gray)
                        cell.btnForImage2.sd_setImage(with: URL(string: self.arrForPrivatePostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    case 2:
                        cell.btnForImage3.isHidden = false
                        cell.btnForImage3.sd_setShowActivityIndicatorView(true)
                        cell.btnForImage3.sd_setIndicatorStyle(.gray)
                        cell.btnForImage3.sd_setImage(with: URL(string: self.arrForPrivatePostActivities[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
                    default:
                        print("invalid case")
                    }
                }
            } else if self.arrForPrivatePostActivities[indexPath.row].postActivityVideos?.count ?? 0 > 0 {
                cell.btnForImage1.isHidden = false
                cell.btnForImage1.sd_setShowActivityIndicatorView(true)
                cell.btnForImage1.sd_setIndicatorStyle(.gray)
                DispatchQueue.global(qos: .background).async {
                    if let videoURL:URL = URL(string: self.arrForPrivatePostActivities[indexPath.row].postActivityVideos?[0].vedioServerPath ?? "") {
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
            cell.btnForLikes.addTarget(self, action: #selector(actionForLike(_:)), for: .touchUpInside)
            (self.arrForPrivatePostActivities[indexPath.row].isPostALreadyLiked ?? false) ? cell.btnForLikes.setImage(UIImage(named: "liked"), for: .normal) : cell.btnForLikes.setImage(UIImage(named: "like"), for: .normal)
            if (indexPath.row == (arrForPrivatePostActivities.count) - 1) {
                if shouldCallAPIForPrivate {
                    pageNoForPrivate += 1
                    self.apiCallForGetPostActivityList(isPublic: false, pageNumber: pageNoForPrivate)
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //    func customPrivatePostActivityCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
    //        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.PostActivityTableViewCell) as? PostActivityTableViewCell {
    //            cell.selectionStyle = .none
    //            cell.lblForStudentName.text = self.arrForPrivatePostActivities?[indexPath.row].studentName ?? ""
    //            cell.lblForActivityTitle.text = self.arrForPrivatePostActivities?[indexPath.row].postTitle ?? ""
    //            cell.lblForActivityDescription.text = self.arrForPrivatePostActivities?[indexPath.row].postDescription ?? ""
    //            cell.btnForImage1.isHidden = true
    //            cell.btnForImage2.isHidden = true
    //            cell.btnForImage3.isHidden = true
    //            cell.btnForImage1.tag = indexPath.row
    //            cell.btnForImage2.tag = indexPath.row
    //            cell.btnForImage3.tag = indexPath.row
    //            cell.btnForImage1.imageView?.contentMode = .scaleAspectFill
    //            cell.btnForImage2.imageView?.contentMode = .scaleAspectFill
    //            cell.btnForImage3.imageView?.contentMode = .scaleAspectFill
    //            cell.btnForLikes.tag = indexPath.row
    //            cell.btnForAddComment.tag = indexPath.row
    //            cell.txtFieldForComment.tag = indexPath.row
    //            cell.txtFieldForComment.delegate = self
    //            cell.btnForImage1.setImage(nil, for: .normal)
    //            cell.btnForImage2.setImage(nil, for: .normal)
    //            cell.btnForImage3.setImage(nil, for: .normal)
    //            cell.btnForImage1.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
    //            cell.btnForImage2.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
    //            cell.btnForImage3.addTarget(self, action: #selector(actionForActivityDetail(_:)), for: .touchUpInside)
    //            cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: self.arrForPrivatePostActivities?[indexPath.row].postedDate ?? "")
    //            //CommonClassMethods.dateMonthNameFromDateString(date: self.arrForPrivatePostActivities?[indexPath.row].postedDate ?? "")
    //            cell.imgForPrivacy.image = self.arrForPrivatePostActivities?[indexPath.row].isPublic ?? false ? UIImage(named: "world") : UIImage(named: "lock")
    //            cell.btnForLikes.setTitle(String(self.arrForPrivatePostActivities?[indexPath.row].totalLikes ?? 0), for: .normal)
    //            cell.btnForComments.setTitle(String(self.arrForPrivatePostActivities?[indexPath.row].commentCount ?? 0), for: .normal)
    //            cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
    //            cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
    //            cell.imgViewForProfile.sd_setImage(with: URL(string: arrForPrivatePostActivities?[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
    //                if error != nil {
    //                    cell.imgViewForProfile.image = UIImage(named: "placeholder")
    //                }
    //            }
    //            if self.arrForPrivatePostActivities?[indexPath.row].postActivityImages?.count ?? 0 > 0 {
    //                for i in 0..<(self.arrForPrivatePostActivities?[indexPath.row].postActivityImages?.count ?? 0) {
    //                    switch i {
    //                    case 0:
    //                        cell.btnForImage1.isHidden = false
    //                        cell.btnForImage1.sd_setShowActivityIndicatorView(true)
    //                        cell.btnForImage1.sd_setIndicatorStyle(.gray)
    //                        cell.btnForImage1.sd_setImage(with: URL(string: self.arrForPrivatePostActivities?[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
    //                    case 1:
    //                        cell.btnForImage2.isHidden = false
    //                        cell.btnForImage2.sd_setShowActivityIndicatorView(true)
    //                        cell.btnForImage2.sd_setIndicatorStyle(.gray)
    //                        cell.btnForImage2.sd_setImage(with: URL(string: self.arrForPrivatePostActivities?[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
    //                    case 2:
    //                        cell.btnForImage3.isHidden = false
    //                        cell.btnForImage3.sd_setShowActivityIndicatorView(true)
    //                        cell.btnForImage3.sd_setIndicatorStyle(.gray)
    //                        cell.btnForImage3.sd_setImage(with: URL(string: self.arrForPrivatePostActivities?[indexPath.row].postActivityImages?[i].imageServerPath ?? ""), for: .normal, completed: nil)
    //                    default:
    //                        print("invalid case")
    //                    }
    //                }
    //            } else if self.arrForPrivatePostActivities?[indexPath.row].postActivityVideos?.count ?? 0 > 0 {
    //                cell.btnForImage1.isHidden = false
    //                cell.btnForImage1.sd_setShowActivityIndicatorView(true)
    //                cell.btnForImage1.sd_setIndicatorStyle(.gray)
    //                if let videoURL:URL = URL(string: self.arrForPrivatePostActivities?[indexPath.row].postActivityVideos?[0].vedioServerPath ?? "") {
    //                    let asset = AVURLAsset(url: videoURL)
    //                    let generator = AVAssetImageGenerator(asset: asset)
    //                    generator.appliesPreferredTrackTransform = true
    //                    let timestamp = CMTime(seconds: 1, preferredTimescale: 60)
    //                    do {
    //                        let imageRef = try generator.copyCGImage(at: timestamp, actualTime: nil)
    //                        cell.btnForImage1.setImage(UIImage(cgImage: imageRef), for: .normal)
    //                    }
    //                    catch let error as NSError
    //                    {
    //                        print("Image generation failed with error \(error)")
    //                    }
    //                }
    //            }
    //            cell.lblForComment.text = self.arrForPrivatePostActivities?[indexPath.row].postComment
    //            cell.viewForComment.isHidden = (self.arrForPrivatePostActivities?[indexPath.row].postComment == nil || self.arrForPrivatePostActivities?[indexPath.row].postComment == "") ? true : false
    //            cell.btnForAddComment.addTarget(self, action: #selector(actionForComment(_:)), for: .touchUpInside)
    //            cell.btnForLikes.addTarget(self, action: #selector(actionForLike(_:)), for: .touchUpInside)
    //            (self.arrForPrivatePostActivities?[indexPath.row].isPostALreadyLiked ?? false) ? cell.btnForLikes.setImage(UIImage(named: "liked"), for: .normal) : cell.btnForLikes.setImage(UIImage(named: "like"), for: .normal)
    //            return cell
    //        }
    //        return UITableViewCell()
    //    }
}

extension DashboardVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        self.arrForPrivatePostActivities[textField.tag].postComment = newString as String
        return true
    }
}


//MARK: ----- TableView Cell -----
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
    @IBOutlet weak var viewForComment: UIView!
    @IBOutlet weak var lblForComment: UILabel!
    @IBOutlet weak var btnForAddComment: UIButton!
    @IBOutlet weak var txtFieldForComment: CustomTextField!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 30 : imgViewForProfile.bounds.height/2
        // Initialization code
    }
}

class PostActivityPublicTableViewCell: UITableViewCell{
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
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 30 : imgViewForProfile.bounds.height/2
        // Initialization code
    }
}
