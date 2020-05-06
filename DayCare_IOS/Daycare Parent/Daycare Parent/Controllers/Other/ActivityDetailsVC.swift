//
//  ActivityDetailsVC.swift
//  Daycare
//
//  Created by amrut waghmare on 30/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import AVFoundation
import AVKit
import TKImageShowing

enum Observer{
    static let observerKey: String = "videoBounds"
}

class ActivityDetailsVC: BaseViewController {
    
    @IBOutlet weak var tblViewForActivityDetail: UITableView!
    var noOfCells:Int?
    let playerViewController = AVPlayerViewController()
    var postActivity:PostActivity?
    var tkImageVC = TKImageShowing()
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        if (postActivity?.postActivityVideos?.count ?? 0) > 0 && self.isMovingFromParent {
            playerViewController.removeObserver(self, forKeyPath: Observer.observerKey)
        }
    }
    
    func initialSetup(){
        self.setNavigationBarWithBackButton(title: Macros.NavigationBarTitle.ActivityDetails)
        self.noOfCells = Int((self.view.bounds.width - 21) / 60)
        var arrImages:[String] = []
        for imagePath in self.postActivity?.postActivityImages ?? [] {
            arrImages.append(imagePath.imageServerPath ?? "")
        }
        self.tkImageVC.images = arrImages.toTKImageSource()
    }
}

//MARK:----- UITableView Delegate and DataSurce -----
extension ActivityDetailsVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (postActivity?.postActivityImages?.count ?? 0 ) == 0 ? (postActivity?.postActivityVideos?.count ?? 0 ) : (postActivity?.postActivityImages?.count ?? 0 )
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ActivityDetailHeaderTableViewCell) as! ActivityDetailHeaderTableViewCell
        cell.accessoryType  = UITableViewCell.AccessoryType.none
        cell.selectionStyle = .none
        cell.lblForDate.text = CommonClassMethods.dateFromDateString(date: postActivity?.postedDate ?? "")
        cell.lblForStudentName.text = postActivity?.studentName
        cell.lblForActivityTitle.text = postActivity?.postTitle
        cell.lblForActivityDescription.text = postActivity?.postDescription
        cell.imgViewForPrivacy.image =  postActivity?.isPublic ?? false ? UIImage(named: "world") : UIImage(named: "lock")
        cell.imgViewForProfile.sd_setShowActivityIndicatorView(true)
        cell.imgViewForProfile.sd_setIndicatorStyle(.gray)
        cell.imgViewForProfile.sd_setImage(with: URL(string: self.postActivity?.imagePath ?? "")) { (image, error, type, url) in
            if error != nil {
                cell.imgViewForProfile.image = UIImage(named: "placeholder")
            }
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customPostActivityImagesTableViewCell(tableView:tableView,indexPath:indexPath)
    }
    
    func tableView(_ tableView: UITableView, estimatedHeightForHeaderInSection section: Int) -> CGFloat {
         return 181.0
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func customPostActivityImagesTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ActivityPhotoGallaryTableViewCell) as? ActivityPhotoGallaryTableViewCell {
            cell.selectionStyle = .none
            cell.photoTitleConstraint.constant = indexPath.row != 1 ? 0 : 25
            if self.postActivity?.postActivityImages?.count ?? 0 > 0 {
                cell.imgViewForActivityImages.sd_setShowActivityIndicatorView(true)
                cell.sd_setIndicatorStyle(.gray)
                cell.imgViewForActivityImages?.sd_setImage(with: URL(string: self.postActivity?.postActivityImages?[indexPath.row].imageServerPath ?? "")) { (image, error, type, url) in
                    if error == nil {
                        let viewWidth = cell.viewForVideo.bounds.width
                        let imgWidth = image?.size.width
                        let imgHeight = image?.size.height
                        let imgRatio = ((imgWidth ?? 0)/(imgHeight ?? 0)) * viewWidth
                        cell.viewForVideo.frame = CGRect(x: 0, y: 0,width: viewWidth, height: imgRatio)
                    }
                }
            } else if self.postActivity?.postActivityVideos?.count ?? 0 > 0 {
                if let videoURL: URL = URL(string: self.postActivity?.postActivityVideos?.first?.vedioServerPath ?? "") {
                    let player = AVPlayer(url: videoURL)
                    do {
                        try AVAudioSession.sharedInstance().setCategory(.playback, mode: .moviePlayback, options: .defaultToSpeaker)
                    }
                    catch let error as NSError
                    {
                      print(error.localizedDescription)
                    }
                    playerViewController.addObserver(self, forKeyPath: Observer.observerKey, options: .new, context: nil)
                    playerViewController.player = player
                     player.play()
                    playerViewController.view.frame  = CGRect(x: cell.viewForVideo.bounds.minX, y: cell.viewForVideo.bounds.minY, width: (self.view.bounds.width - 30), height: cell.viewForVideo.bounds.height)
                    self.addChild(playerViewController)
                    cell.viewForVideo.addSubview(playerViewController.view)
                    playerViewController.didMove(toParent: self)
                }
            }
            return cell
        }
        return UITableViewCell()
    }
   
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if self.postActivity?.postActivityImages?.count ?? 0 > 0 {
            let cell = tableView.cellForRow(at: indexPath) as? ActivityPhotoGallaryTableViewCell
            self.tkImageVC.animatedView     = cell?.imgViewForActivityImages
            self.tkImageVC.currentIndex     = indexPath.row
            self.present(self.tkImageVC, animated: true, completion: nil)
        }
    }
    
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?)
    {
        if keyPath == Observer.observerKey
        {
            if let rect = change?[.newKey] as? NSValue
            {
                if let newrect = rect.cgRectValue as CGRect?
                {
                    // 200 is height of playerViewController in normal screen mode
                    UIApplication.shared.isStatusBarHidden = (newrect.size.height <= 300) ? false : true
                }
            }
        }
    }
}

//MARK:-----ActivityDetailHeaderTableView Cell -----
class ActivityDetailHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForProfile: UIImageView!
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForDate: UILabel!
    @IBOutlet weak var imgViewForPrivacy: UIImageView!
    @IBOutlet weak var lblForActivityTitle: UILabel!
    @IBOutlet weak var lblForActivityDescription: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewForProfile.cornerRadius = PlatformUtils.isPad ? 30.0 : imgViewForProfile.bounds.height/2
        // Initialization code
    }
}

//MARK:-----ActivityDetailPeopleListTableView Cell -----
class ActivityDetailPeopleListTableViewCell: UITableViewCell {
    @IBOutlet weak var collectionViewForPeopleList: UICollectionView!
}

//MARK:-----ActivityPhotoGallaryTableView Cell -----
class ActivityPhotoGallaryTableViewCell: UITableViewCell {
    @IBOutlet weak var imgViewForActivityImages: UIImageView!
    @IBOutlet weak var photoTitleConstraint: NSLayoutConstraint!
    @IBOutlet weak var viewForVideo: UIView!
}

//MARK:----- ActivityPeopleListCollectionView Cell -----
class ActivityPeopleListCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var btnForPeople: UIButton!
}
