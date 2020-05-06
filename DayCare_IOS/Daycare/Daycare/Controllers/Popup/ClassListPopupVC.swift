//
//  ClassListPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 08/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

protocol ClassListVCDelegate : class {
    func doneButtonAction(selectedIndex:Int,selectedClasses:[Class])
}

class ClassListPopupVC: UIViewController {
    @IBOutlet weak var tblViewForClassList: UITableView!
    var arrForAllClass   :   [Class]   = []
    var arrForSelectedClass  : [Class]   = []
    var arrForSortedClassList:[Class]?
    var isSearchActive = false
    var delegate : ClassListVCDelegate?
    var selectedIndex:Int?
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        tblViewForClassList.tableFooterView = UIView()
    }
    
    //MARK:----- @IBActions -----
    @IBAction func doneButtonAction(_ sender: Any) {
        delegate?.doneButtonAction(selectedIndex: selectedIndex ?? 0, selectedClasses: arrForSelectedClass)
        self .dismiss(animated: true, completion: nil)
    }
    
    @IBAction func cancelButtonAction(_ sender: Any) {
        self .dismiss(animated: true, completion: nil)
    }
}

//MARK:----- UITableView Data Source and Delegates -----

extension ClassListPopupVC: UITableViewDelegate,UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearchActive ? arrForSortedClassList?.count ?? 0 : arrForAllClass.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.ListTableViewCell, bundle: nil)
        self.tblViewForClassList.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.ListTableViewCell)
        if let cell = self.tblViewForClassList.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.ListTableViewCell) as? ListTableViewCell {
            cell.selectionStyle = .none
            let arrForClass = isSearchActive ? arrForSortedClassList : arrForAllClass
            cell.lblForListItem.text = arrForClass?[indexPath.row].className ?? ""
             cell.imgViewForSelection.image = arrForClass?[indexPath.row].isSelected == true ? UIImage(named: "selectedFill") : UIImage(named: "unselected")
            return cell
        }
        return UITableViewCell()
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let arrForClass = isSearchActive ? arrForSortedClassList : arrForAllClass
        if let cell = tableView.cellForRow(at: indexPath) as? ListTableViewCell {
            if arrForClass?[indexPath.row].isSelected ?? false {
                cell.imgViewForSelection.image = UIImage(named: "unselected")
                let selectedId      = arrForClass?[indexPath.row].classesID
                for i in 0..<arrForAllClass.count{
                    if arrForClass?[i].classesID == selectedId {
                        self.arrForAllClass[i].isSelected = false
                    }
                }
                for i in 0..<arrForSelectedClass.count{
                    if arrForSelectedClass[i].classesID == selectedId{
                        arrForSelectedClass.remove(at: i)
                        break
                    }
                }
            } else{
                cell.imgViewForSelection.image = UIImage(named: "selectedFill")
                let selectedId = arrForClass?[indexPath.row].classesID
                for i in 0..<arrForAllClass.count{
                    if arrForAllClass[i].classesID == selectedId {
                        self.arrForAllClass[i].isSelected = true
                        self.arrForSelectedClass.append(arrForAllClass[i])
                    }
                }
            }
        }
    }
}

//MARK:----- UITextField Delegates -----
extension ClassListPopupVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if newString == "" {
            isSearchActive = false
        }else {
            isSearchActive = true
            self.arrForSortedClassList = self.arrForAllClass.filter({ (classes) -> Bool in
                return classes.className?.lowercased().contains(newString.lowercased) ?? false
            })
        }
        tblViewForClassList.reloadData()
        return true
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {   //delegate method
        textField.text = ""
        textField.resignFirstResponder()
        isSearchActive = false
        tblViewForClassList.reloadData()
        return true
    }
}
