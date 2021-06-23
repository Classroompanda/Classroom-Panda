//
//  StudentListPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 03/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

protocol StudentListVCDelegate : class {
    func doneButtonAction(data:String,selectedIndex:Int,selectedStudents:[StudentList])
}

class StudentListPopupVC: UIViewController {

    @IBOutlet weak var tblViewForStudentList: UITableView!
    var arrForAllStudents   :   [StudentList]   = []
    var arrForSelectedStudents  : [StudentList]   = []
    var arrForSortedStudentList:[StudentList]?
    var isSearchActive = false
    var delegate : StudentListVCDelegate?
    var selectedIndex:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        tblViewForStudentList.tableFooterView = UIView()
    }
    
    //MARK:----- @IBActions -----
    @IBAction func doneButtonAction(_ sender: Any) {
        var dataArray = String()
        if (arrForSelectedStudents.count) > 0 {
            let arrForStudents:[String] = arrForSelectedStudents.map { ($0.label ?? "") }
            dataArray = arrForStudents.joined(separator:", ")
            
        }
//        for student in arrForSelectedStudents {
//            dataArray.append("\(student.label ?? ""), ")
//        }
//        dataArray.remove(at: dataArray.index(before: dataArray.endIndex))
//        dataArray.remove(at: dataArray.index(before: dataArray.endIndex))
        delegate?.doneButtonAction(data: dataArray, selectedIndex: selectedIndex ?? 0, selectedStudents: arrForSelectedStudents)
        self .dismiss(animated: true, completion: nil)
    }
    
    @IBAction func cancelButtonAction(_ sender: Any) {
        self .dismiss(animated: true, completion: nil)
    }
    
}

//MARK:----- UITableView Data Source and Delegates -----

extension StudentListPopupVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearchActive ? arrForSortedStudentList?.count ?? 0 : arrForAllStudents.count 
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
         let nib = UINib(nibName: Macros.Identifiers.Cells.ListTableViewCell, bundle: nil)
         self.tblViewForStudentList.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.ListTableViewCell)
         if let cell = self.tblViewForStudentList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ListTableViewCell) as? ListTableViewCell {
            cell.selectionStyle = .none
            let arrForStudents = isSearchActive ? arrForSortedStudentList : arrForAllStudents
            cell.lblForListItem.text = arrForStudents?[indexPath.row].label ?? ""
            cell.imgViewForSelection.image = arrForStudents?[indexPath.row].isSelected == true ? UIImage(named: "selectedFill") : UIImage(named: "unselected")
            return cell
         }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let arrForStudents = isSearchActive ? arrForSortedStudentList : arrForAllStudents
        if let cell = tableView.cellForRow(at: indexPath) as? ListTableViewCell {
            if arrForStudents?[indexPath.row].isSelected ?? false {
                cell.imgViewForSelection.image = UIImage(named: "unselected")
                let selectedId = arrForStudents?[indexPath.row].value
                for i in 0..<arrForAllStudents.count{
                    if arrForStudents?[i].value == selectedId {
                        self.arrForAllStudents[i].isSelected = false
                    }
                }
                for i in 0..<arrForSelectedStudents.count{
                    if arrForSelectedStudents[i].value == selectedId{
                        arrForSelectedStudents.remove(at: i)
                        break
                    }
                }
            } else {
                cell.imgViewForSelection.image = UIImage(named: "selectedFill")
                let selectedId = arrForStudents?[indexPath.row].value
                for i in 0..<arrForAllStudents.count{
                    if arrForAllStudents[i].value == selectedId {
                        self.arrForAllStudents[i].isSelected = true
                        self.arrForSelectedStudents.append(arrForAllStudents[i])
                    }
                }
            }
        }
    }
}

//MARK:----- UITextField Delegates -----
extension StudentListPopupVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if newString == "" {
            isSearchActive = false
        }else {
            isSearchActive = true
            self.arrForSortedStudentList = self.arrForAllStudents.filter({ (student) -> Bool in
                return student.label?.lowercased().contains(newString.lowercased) ?? false
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

