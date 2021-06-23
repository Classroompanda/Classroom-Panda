//
//  ImagePickerVC.swift
//  NDVIP
//
//  Created by amrut waghmare on 10/06/19.
//  Copyright © 2019 Ratnesh Swarkar. All rights reserved.
//

import UIKit
import AVFoundation
import OpalImagePicker

enum ImageSelectionType {
    case Single
    case Multipal
    case Video
}

class ImagePickerVC: UIImagePickerController {
    
    var selectionType :  ImageSelectionType?
    
    typealias multipalImageComplitionHandler = ([UIImage]) -> ()
    typealias singleImageComplitionHandler = (UIImage) -> ()
    typealias videoSelectionComplitionHandler = (NSURL) -> ()
    
    var multiImageSelecionComplition:multipalImageComplitionHandler = {_ in}
    var singleImageSelectionComplition:singleImageComplitionHandler = {_ in}
    var videoSelectionComplition:videoSelectionComplitionHandler = {_ in}
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.delegate = self
        // Do any additional setup after loading the view.
    }
    
    func openImagePickerPopup(target: BaseViewController) {
        let authStatus = AVCaptureDevice.authorizationStatus(for: AVMediaType.video)
        switch authStatus {
        case .authorized:
            self.showOptionAlert(viewController: target)
        case .denied:
            self.alertPromptToAllowCameraAccessViaSettings(controller: target)
        case .notDetermined:
            self.showOptionAlert(viewController: target)
        case .restricted:
            target.showAlert(with: Macros.alertMessages.cameraAccess)
        }
    }
    
    
    //MARK:-- Give the path URL if the camera access permission is denied
    func alertPromptToAllowCameraAccessViaSettings(controller: UIViewController) {
        let alert = UIAlertController(title: "\(Macros.ApplictionName) \(Macros.alertMessages.cameraPermissionRequestTitle)", message: Macros.alertMessages.cameraPermissionRequst, preferredStyle: .alert )
        alert.addAction(UIAlertAction(title: Macros.alertMessages.openSetting, style: .cancel) { alert in
            if let appSettingsURL = NSURL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(appSettingsURL as URL, options: [:], completionHandler: nil)
            }
        })
        present(alert, animated: true, completion: nil)
    }
    
    
    func openSingleImagePicker(target: BaseViewController,_ okCompletionHandler: @escaping singleImageComplitionHandler){
        self.singleImageSelectionComplition = okCompletionHandler
        self.selectionType = ImageSelectionType.Single
        self.openImagePickerPopup(target: target)
    }
    
    func openMultipalImagePicker(target: BaseViewController,_ okCompletionHandler: @escaping multipalImageComplitionHandler){
        self.multiImageSelecionComplition = okCompletionHandler
        self.selectionType = ImageSelectionType.Multipal
        self.openImagePickerPopup(target: target)
    }
    
    func openVideoPicker(target: BaseViewController,_ okCompletionHandler: @escaping videoSelectionComplitionHandler){
        self.videoSelectionComplition = okCompletionHandler
        self.selectionType = ImageSelectionType.Video
        self.openImagePickerPopup(target: target)
    }
    
    
    
    func showOptionAlert(viewController: UIViewController){
        let alertController = UIAlertController(title: Macros.ApplictionName, message:
            Macros.alertMessages.chooseOption, preferredStyle: .alert)
        
        alertController.addAction(UIAlertAction(title: Macros.alertMessages.Camera, style: UIAlertAction.Style.default,handler: { (alertController) in
            self.openCameraWith(viewController: viewController, sourceType: .camera, mediaTypes: (self.selectionType == ImageSelectionType.Video) ? ["public.movie"] : ["public.image"])
        }))
        
        alertController.addAction(UIAlertAction(title: Macros.alertMessages.photoLibrary, style: UIAlertAction.Style.default,handler: { (alertController) in
            if (self.selectionType == ImageSelectionType.Multipal){
                self.openMultiselectionAlbum(viewController: viewController)
            } else {
                self.openCameraWith(viewController: viewController, sourceType: .photoLibrary, mediaTypes: (self.selectionType == ImageSelectionType.Video) ? ["public.movie"] : ["public.image"])
            }
        }))
        
        alertController.addAction(UIAlertAction(title: Macros.alertMessages.cancelString, style: UIAlertAction.Style.cancel, handler: { (alertController) in
        }))
        
        if (UIDevice.current.userInterfaceIdiom == .pad){
            if alertController.responds(to: #selector(getter: viewController.popoverPresentationController)) {
                alertController.popoverPresentationController?.sourceView = viewController.view
                alertController.popoverPresentationController?.sourceRect = CGRect(x: 0, y: UIScreen.main.bounds.size.height, width: UIScreen.main.bounds.size.width, height: 320)
                viewController.present(alertController, animated: true, completion: nil)
            }
        }else{
            alertController.modalPresentationStyle = .popover
            viewController.present(alertController, animated: true, completion: nil)
        }
    }
    
    func openCameraWith(viewController: UIViewController, sourceType: UIImagePickerController.SourceType, mediaTypes : [String]){
        self.allowsEditing = true
        self.sourceType = sourceType
        self.modalPresentationStyle = .popover
        self.videoMaximumDuration = 20
        self.mediaTypes = mediaTypes
        let presentationController = self.popoverPresentationController
        presentationController?.sourceView = viewController.view
        if (UIDevice.current.userInterfaceIdiom == .pad){
            if self.responds(to: #selector(getter: viewController.popoverPresentationController)) {
                self.popoverPresentationController?.sourceView = viewController.view
                self.popoverPresentationController?.sourceRect = CGRect(x: 0, y: UIScreen.main.bounds.size.height, width: UIScreen.main.bounds.size.width, height: 320)
                viewController.present(self, animated: true, completion: nil)
            }
        }else{
            self.modalPresentationStyle = .popover
            viewController.present(self, animated: true, completion: nil)
        }
    }
    
    //Open Controller for Multipal Selection
    func openMultiselectionAlbum(viewController:UIViewController){
        let imagePicker = OpalImagePickerController()
        imagePicker.imagePickerDelegate = self
        imagePicker.maximumSelectionsAllowed = 3
        self.modalPresentationStyle = .popover
        let presentationController = self.popoverPresentationController
        presentationController?.sourceView = viewController.view
        viewController.present(imagePicker, animated: true) {}
    }
}

extension ImagePickerVC: UIImagePickerControllerDelegate,UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let pickedImage = info[UIImagePickerController.InfoKey.editedImage] as? UIImage {
            if self.selectionType == Daycare.ImageSelectionType.Multipal {
                self.multiImageSelecionComplition([pickedImage])
            } else {
            self.singleImageSelectionComplition(pickedImage)
            }
        } else if let pickedVideoURL = info[UIImagePickerController.InfoKey.mediaURL] as? NSURL {
            self.videoSelectionComplition(pickedVideoURL)
        }
        dismiss(animated: true, completion: nil)
    }
    
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
}

//Extension for OpalImagePicker
extension ImagePickerVC: OpalImagePickerControllerDelegate {
    func imagePickerDidCancel(_ picker: OpalImagePickerController) {
        //TODO: Cancel action?
        dismiss(animated: true, completion: nil)
    }
    
    func imagePicker(_ picker: OpalImagePickerController, didFinishPickingImages images: [UIImage]) {
        //TODO: Save Images, update UI
        dismiss(animated: true, completion: nil)
        self.multiImageSelecionComplition(images)
    }
}
