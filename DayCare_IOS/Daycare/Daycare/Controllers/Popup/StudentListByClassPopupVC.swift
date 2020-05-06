//
//  StudentListByClassPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 15/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

protocol StudentListByClassVCDelegate : class {
    func doneButtonAction(data:String,selectedIndex:Int,selectedStudents:[Student])
}

class StudentListByClassPopupVC: UIViewController {
    
    @IBOutlet weak var tblViewForStudentList: UITableView!
    var arrForAllStudents   :   [Student]   = []
    var arrForSelectedStudents  : [Student]   = []
    var arrForSortedStudentList:[Student]?
    var isSearchActive = false
    var delegate : StudentListByClassVCDelegate?
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
        for student in arrForSelectedStudents {
            dataArray.append("\(student.studentName ?? ""), ")
        }
        dataArray.remove(at: dataArray.index(before: dataArray.endIndex))
        dataArray.remove(at: dataArray.index(before: dataArray.endIndex))
        delegate?.doneButtonAction(data: dataArray, selectedIndex: selectedIndex ?? 0, selectedStudents: arrForSelectedStudents)
        self .dismiss(animated: true, completion: nil)
    }
    
    @IBAction func cancelButtonAction(_ sender: Any) {
        self .dismiss(animated: true, completion: nil)
    }
    
}

//MARK:----- UITableView Data Source and Delegates -----

extension StudentListByClassPopupVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearchActive ? arrForSortedStudentList?.count ?? 0 : arrForAllStudents.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.ListTableViewCell, bundle: nil)
        self.tblViewForStudentList.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.ListTableViewCell)
        if let cell = self.tblViewForStudentList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ListTableViewCell) as? ListTableViewCell {
            cell.selectionStyle = .none
            let arrForStudents = isSearchActive ? arrForSortedStudentList : arrForAllStudents
            cell.lblForListItem.text = arrForStudents?[indexPath.row].studentName ?? ""
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
                let selectedId      = arrForStudents?[indexPath.row].studentId
                for i in 0..<arrForAllStudents.count{
                    if arrForStudents?[i].studentId == selectedId {
                        self.arrForAllStudents[i].isSelected = false
                    }
                }
                for i in 0..<arrForSelectedStudents.count{
                    if arrForSelectedStudents[i].studentId == selectedId{
                        arrForSelectedStudents.remove(at: i)
                        break
                    }
                }
            } else {
                cell.imgViewForSelection.image = UIImage(named: "selectedFill")
                let selectedId = arrForStudents?[indexPath.row].studentId
                for i in 0..<arrForAllStudents.count{
                    if arrForAllStudents[i].studentId == selectedId {
                        self.arrForAllStudents[i].isSelected = true
                        self.arrForSelectedStudents.append(arrForAllStudents[i])
                    }
                }
            }
        }
    }
}

//MARK:----- UITextField Delegates -----
extension StudentListByClassPopupVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if newString == "" {
            isSearchActive = false
        }else {
            isSearchActive = true
            self.arrForSortedStudentList = self.arrForAllStudents.filter({ (student) -> Bool in
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

