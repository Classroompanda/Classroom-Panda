//
//  AddGuardianPopupVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 19/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import DropDown

class AddGuardianVC: UIViewController {

    @IBOutlet weak var tblViewForAddGuardian: UITableView!
    
    let dropDownForRelation = DropDown()
    var guardian = Guardian()
    var arrForRelation : [Relation]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func actionForSave(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @objc func actionForRelationDropdown(_ sender: UIButton){
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        self.setupRelationDropDown(imageView ?? UIImageView(), sender: sender)
        dropDownForRelation.show()
    }
    
    @objc func actionForIsPickedUp(_ sender: UIButton){
        if let cell = self.tblViewForAddGuardian.cellForRow(at: IndexPath(row: 3, section: 0)) as? RadioButtonTableViewCell {
            if sender.tag == 111 {
                cell.btnForYes.isSelected = true
                cell.btnForNo.isSelected = false
                self.guardian.isAuthorizedToPickup = true
                if let pickedUpCell = self.tblViewForAddGuardian.cellForRow(at: IndexPath(row: 4, section: 0)) as? DropDownTextFieldTableViewCell {
                    pickedUpCell.txtFieldForField.isEnabled = false
                }
            } else {
                cell.btnForYes.isSelected = false
                cell.btnForNo.isSelected = true
                self.guardian.isAuthorizedToPickup = false
                if let pickedUpCell = self.tblViewForAddGuardian.cellForRow(at: IndexPath(row: 4, section: 0)) as? DropDownTextFieldTableViewCell {
                    pickedUpCell.txtFieldForField.isEnabled = false
                   
                }
            }
        }
    }
    
    //DropDown list for relation
    func setupRelationDropDown(_ imageView: UIImageView, sender: UIButton){
        var arrForRelationName:[String]   =   []
        for relation in self.arrForRelation ?? [] {
            arrForRelationName.append(relation.label ?? "")
        }
        dropDownForRelation.anchorView = sender
        dropDownForRelation.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForRelation.dataSource = arrForRelationName
        dropDownForRelation.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            self?.guardian.relationTypeId = self?.arrForRelation?[index].value
            self?.guardian.relationTypeName = item
        }
        dropDownForRelation.cancelAction = { [unowned self] in
            self.dropDownForRelation.hide()
            imageView.image = UIImage(named: "arrowDown")
        }
    }
}

//MARK:----- UITableView Delegate and Datasource -----

extension AddGuardianPopupVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0:
            return customTwoTextFieldCell(tableView:tableView,indexPath:indexPath)
        case 1:
            return customDropDownButtonCell(tableView:tableView,indexPath:indexPath)
        case 3:
            return customRadioButtonTableViewCell(tableView:tableView,indexPath:indexPath)
        case 2,4:
            return customSingleTextFieldCell(tableView:tableView,indexPath:indexPath)
        default:
            return UITableViewCell()
        }
    }
    
    func customTwoTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForAddGuardian.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForleft.delegate = self
            cell.txtFieldForRight.delegate = self
            if let arrForTitle = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? [String] {
                cell.txtFieldForleft.placeholder = arrForTitle[0]
                cell.txtFieldForRight.placeholder = arrForTitle[1]
            }
            cell.txtFieldForleft.tag = indexPath.row+333
            cell.txtFieldForRight.tag = indexPath.row+444
            return cell
        }
        return UITableViewCell()
    }
    
    func customSingleTextFieldCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddGuardian.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.txtFieldForField.placeholder = titleString
            }
            cell.lblForFieldTitle.isHidden = true
            cell.txtFieldForField.tag = indexPath.row
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.isHidden = true
            cell.btnForField.isHidden = true
            cell.txtFieldForField.keyboardType = (indexPath.row == 2) ? .numberPad : .default
            switch indexPath.row{
            case 2:
                if guardian.mobile == nil {
                    cell.txtFieldForField.text = ""
                } else {
                    cell.txtFieldForField.text = String(guardian.mobile ?? 0)
                }
            case 4:
                cell.txtFieldForField.text = self.guardian.reasonNotToAllow
            default:
                print("In Progress")
            }
            cell.lblForFieldTitle.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddGuardian.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            cell.btnForField.tag = indexPath.row
            cell.imgViewForArrow.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.addTarget(self, action: #selector(actionForRelationDropdown(_:)), for: .touchUpInside)
            cell.btnForField.setTitle("Select", for: .normal)
            if guardian.relationTypeId != nil && guardian.relationTypeId != 0 {
                for relation in self.arrForRelation ?? [] {
                    if relation.value == self.guardian.relationTypeId{
                        cell.btnForField.setTitle(relation.label ?? "", for: .normal)
                    }
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customRadioButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.RadioButtonTableViewCell) as? RadioButtonTableViewCell {
            if let titleString = Macros.ConstantArray.arrForAddGuardianTitle[indexPath.row] as? String {
                cell.lblForFieldTitle.text = titleString
            }
            cell.btnForYes.tag = 111
            cell.btnForNo.tag = 333
            cell.btnForNo.addTarget(self, action: #selector(actionForIsPickedUp(_:)), for: .touchUpInside)
            cell.btnForYes.addTarget(self, action: #selector(actionForIsPickedUp(_:)), for: .touchUpInside)
            if self.guardian.isAuthorizedToPickup ?? false {
                cell.btnForYes.isSelected = true
                 cell.btnForNo.isSelected = false
            } else {
                cell.btnForNo.isSelected = true
                cell.btnForYes.isSelected = false
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:------ UITextField Delegate -----
extension AddGuardianPopupVC: UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        switch textField.tag {
        case 2:
            if Macros.ConstantArray.numberStringArray.contains(string){
                let contactNo:String = newString as String
                if contactNo.length() > 10 {
                    return false
                } else {
                    self.guardian.mobile = Int(contactNo)
                    return true
                }
            } else {
                return false
            }
        case 4:
            self.guardian.reasonNotToAllow = newString as String
        case 333:
            self.guardian.firstName =  newString as String
        case 444:
            self.guardian.lastName =  newString as String
        default:
            print("invalid case")
        }
        return true
    }
    
}

//MARK:----- UITableView Cell -----
class RadioButtonTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFieldTitle: UILabel!
    @IBOutlet weak var btnForYes: UIButton!
    @IBOutlet weak var btnForNo: UIButton!
    
}
