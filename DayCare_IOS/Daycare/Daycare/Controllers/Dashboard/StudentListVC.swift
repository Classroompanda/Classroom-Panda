//
//  StudentVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
import SDWebImage


class StudentListVC: BaseViewController {
    
    @IBOutlet weak var txtFieldForSearch: UITextField!
    @IBOutlet weak var tblViewForStudentList: UITableView!
    
    var isSearchActive = false
    var arrForStudentList:[Student]?
    var arrForSortedStudentList:[Student]?
   
    override func viewDidLoad() {
        super.viewDidLoad()
       
        apiForGetAllStudents()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        initialSetup()
    }
    
    //MARK:----- Initial Functions -----
    func initialSetup(){
        self.navigationController?.navigationBar.layer.removeAllAnimations()
        self.navigationController?.navigationBar.isHidden = false
        self.navigationController?.isNavigationBarHidden = false
        self.navigationController?.navigationBar.isTranslucent = false
        self.setNavigationBar(title: Macros.NavigationTitle.StudentList)
        let imgViewForSearch = UIImageView()
        imgViewForSearch.image = UIImage(named: "searchGray")
        imgViewForSearch.frame = CGRect(x: txtFieldForSearch.frame.origin.x, y: txtFieldForSearch.frame.origin.y, width: 20, height: 20)
        txtFieldForSearch.leftView = imgViewForSearch
        txtFieldForSearch.leftViewMode = .unlessEditing
        self.tblViewForStudentList.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
    }
    

    //MARK:----- @IBActions -----
    
    @IBAction func actionForCamera(_ sender: UIButton) {
    }


    //MARK:----- API Calling Function -----
    func apiForGetAllStudents(){
       let service = StudentService()
        service.getAllStudents(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, studentName: "") { (result) in
            self.arrForStudentList = result as? [Student]
            self.tblViewForStudentList.reloadData()
        }
    }
}

//MARK:----- UITableView DataSoucre and Delegates -----
extension StudentListVC:UITableViewDelegate,UITableViewDataSource{
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearchActive ? ((arrForSortedStudentList?.count ?? 0) == 0 ? 1 : (arrForSortedStudentList?.count ?? 0)) : ((arrForStudentList?.count ?? 0) == 0 ? 1 : (arrForStudentList?.count ?? 0))
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.StudentListTableViewCell, for: indexPath) as? StudentListTableViewCell {
            let arrForStudents = isSearchActive ? arrForSortedStudentList : arrForStudentList
            if arrForStudents?.count ?? 0 > 0 {
                cell.lblForName.text = arrForStudents?[indexPath.row].studentName ?? ""
                cell.lblForParentName.text = arrForStudents?[indexPath.row].parentName ?? ""
                cell.lblForClass.text = arrForStudents?[indexPath.row].className ?? ""
                cell.imgViewforStudent.sd_imageIndicator = SDWebImageActivityIndicator.gray

//                cell.imgViewforStudent.sd_setShowActivityIndicatorView(true)
//                cell.imgViewforStudent.sd_setIndicatorStyle(.gray)
                cell.imgViewforStudent.sd_setImage(with: URL(string: arrForStudents?[indexPath.row].imagePath ?? "")) { (image, error, type, url) in
                    if (error != nil) {
                        cell.imgViewforStudent.image = UIImage(named: "placeholder")
                    }
                }
                return cell
            }
            return UITableViewCell()
        } else {
            return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForStudentList)
        }
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let arrForStudents = isSearchActive ? arrForSortedStudentList : arrForStudentList
        if arrForStudents?.count ?? 0 > 0 {
            let storyBoard =  UIStoryboard(name: Macros.Identifiers.Storyboard.Other, bundle: nil)
            if let controller = storyBoard.instantiateViewController(withIdentifier: Macros.Identifiers.Controller.StudentDetailVC) as? StudentDetailVC {
                controller.selectedStudent = arrForStudents?[indexPath.row]
                self.navigationController?.pushViewController(controller, animated: true)
            }
        }
    }
    
}


//MARK:----- UITextField Delegates -----
extension StudentListVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if newString == "" {
            isSearchActive = false
        }else {
            isSearchActive = true
            self.arrForSortedStudentList = self.arrForStudentList?.filter({ (student) -> Bool in
//                let isParentSearch:Bool = student.parentName?.lowercased().contains(newString.lowercased) ?? false
//                return isParentSearch || student.studentName?.lowercased().contains(newString.lowercased) ?? false
                return student.studentName?.lowercased().contains(newString.lowercased) ?? false
            })
        }

        tblViewForStudentList.reloadData()
        return true
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {   //delegate method
        textField.text = ""
        textField.resignFirstResponder()
        isSearchActive = false
        tblViewForStudentList.reloadData()
        return true
    }
    
}



//MARK:----- Student List TableView Cell -----
class StudentListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForParentName: UILabel!
    @IBOutlet weak var lblForName: UILabel!
    @IBOutlet weak var imgViewforStudent: UIImageView!
    @IBOutlet weak var lblForClass: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgViewforStudent.layer.cornerRadius = imgViewforStudent.bounds.height/2
        // Initialization code
    }

}
