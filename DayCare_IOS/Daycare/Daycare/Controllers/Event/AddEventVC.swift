//
//  AddEventVC.swift
//  Daycare
//
//  Created by amrut waghmare on 08/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown

class AddEventVC: BaseViewController {

    @IBOutlet weak var tblViewForAddEvent: UITableView!
    let dropDownForRepeat = DropDown()
    var event:Event = Event()
    var isEdited : Bool?
    var arrForClass         :   [Class]     =   []
    var arrForSelectedClass :   [Class]     =   []
    var arrForRepeatDropdown:   [Repeat]    =   []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        (event.id ?? 0) > 0 ? self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.EditEvent) : self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.AddNewEvent)
//        self.event.start = (event.id ?? 0) > 0 ? self.event.start : CommonClassMethods.convertDateToServerReadableFormat(date: Date())
      // shiwani
      self.event.start =  (event.id ?? 0) > 0 ? self.event.start : CommonClassMethods.dateToStringDay(date: Date())
        apiForGetAllClasses()
        apiForGetAllRepeatTypeDropdown()
        setSelectedClasses()
    }
    
    //MARK:----- @IBActions -----
    @objc func actionForSubmit(){
        if isValidate() {
            apiForSaveEvent()
        }
     }

    @objc func actionForSelectTime(_ sender: UIButton){
        var selectedDate:Date?
        switch sender.tag {
        case 1002:
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.event.startTime ?? ""))
        case 2002:
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.event.endTime ?? ""))
        default:
            print("Invalid Case")
        }
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .time, selectedDate: selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as! Date
            let txtfieldForTime = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForTime?.text = CommonClassMethods.timeFromDate(date: dateTime)
            switch sender.tag {
            case 1002 :
                self.event.startTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            case 2002 :
                self.event.endTime = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
            default :
                 print("invalid")
            }
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.show()
    }
    
    @objc func actionForSelectDate(_ sender: UIButton){
        var selectedDate:Date?
        switch sender.tag {
        case 1001:
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.event.start ?? ""))
        case 2001:
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.event.end ?? ""))
        case 6:
            selectedDate = CommonClassMethods.dateObjectFromDateString(date: (self.event.endsOn ?? ""))
        default:
            print("Invalid Case")
        }
        let datePicker = ActionSheetDatePicker(title: "", datePickerMode: .date, selectedDate: selectedDate ?? Date(), doneBlock: {
            picker, value, index in
            let dateTime    = value as? Date ?? Date()
            let txtfieldForDate = self.view.viewWithTag(sender.tag) as? CustomTextField
            txtfieldForDate?.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
            switch sender.tag {
            case 1001 :
              // shiwani
//                self.event.start = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
              self.event.start =  CommonClassMethods.dateToStringDay(date: dateTime)
            case 2001 :
              // shiwani
//                self.event.end = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
              self.event.end =  CommonClassMethods.dateToStringDay(date: dateTime)
            case 6 :
                self.event.endsOn = CommonClassMethods.convertDateToServerReadableFormat(date: dateTime)
                if let cell = self.tblViewForAddEvent.cellForRow(at: IndexPath(row: sender.tag, section: 0)) as? DropDownTextFieldTableViewCell {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateFormat(date: dateTime)
                }
            default :
                print("invalid")
            }
            self.resignTextFieldResponder()
            return
        }, cancel: { ActionStringCancelBlock in return }, origin:sender)
        datePicker?.minimumDate = Date()
        datePicker?.show()
    }
    
    @objc func showClassListPopup(sender: UIButton) {
        self.resignTextFieldResponder()
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.ClassListPopupVC) as! ClassListPopupVC
        popoverContent.delegate = self
        popoverContent.arrForAllClass = self.arrForClass
        popoverContent.selectedIndex = sender.tag
        popoverContent.arrForSelectedClass = self.arrForSelectedClass
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        let popover = popoverContent.popoverPresentationController
        popoverContent.preferredContentSize = CGSize(width:300,height:400)
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-75)   ,width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    @objc func actionForShowRepeatDropdown(sender: UIButton){
        self.resignTextFieldResponder()
        let imageView = self.view.viewWithTag(sender.tag) as? UIImageView
        imageView?.image = UIImage(named: "arrowUp")
        dropDownForRepeat.show()
    }
    //MARK:---- Functions -----
    
    //Function For Validation
    func isValidate() -> Bool {
        var isValidate = true
        if (event.start == nil || event.start == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.startDate)
        }else if (event.end == nil || event.end == ""){
            isValidate = false
            self.showAlert(with: Macros.alertMessages.endDate)
        }else if (event.startTime == nil || event.startTime == "") {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.startTime)
        }else if (event.endTime == nil || event.endTime == "") {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.endTime)
        }else if(event.involvedEventClassesList?.count == 0 || event.involvedEventClassesList == nil) {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.classes)
        }else if (event.title == nil || event.title == "") {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.title)
        }else if (event.eventDescription == nil || event.eventDescription == "") {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.description)
        }else if (event.plannerRepeatTypeID == nil) {
            isValidate = false
            self.showAlert(with: Macros.alertMessages.repeatType)
        } else if event.plannerRepeatTypeID != 1 {
            if (event.endsOn == nil || event.endsOn == ""){
                isValidate = false
                self.showAlert(with: Macros.alertMessages.endsOnDate)
            }
        }
        return isValidate
    }
    
    func setSelectedClasses(){
//        if event.involvedEventClassesList?.count ?? 0 > 0 {
//            for involvedClass in event.involvedEventClassesList ?? [] {
//                let classes = Class()
//                classes.classesID = involvedClass.classesID
//                classes.className = involvedClass.className
//                classes.isSelected = true
//                self.arrForSelectedClass.append(classes)
//            }
//        }
        self.arrForSelectedClass = event.involvedEventClassesList?.map({ (involvedClass) -> Class in
            let classes = Class()
            classes.classesID = involvedClass.classesID
            classes.className = involvedClass.className
            classes.isSelected = true
            return classes
        }) ?? []
    }
    
    //Dropdown list For Repeat
    func setupRepeatDropDown(_ imageView: UIImageView, sender: UIButton){
        let arrForRepeat:[String]   =   arrForRepeatDropdown.map{$0.label ?? ""}
//        for repeatObject in arrForRepeatDropdown {
//            arrForRepeat.append(repeatObject.label ?? "")
//        }
        dropDownForRepeat.anchorView = sender
        dropDownForRepeat.bottomOffset = CGPoint(x: 0, y: sender.bounds.height )
        dropDownForRepeat.dataSource = arrForRepeat
        dropDownForRepeat.selectionAction = { [weak self] (index, item) in
            sender.setTitle(item, for: .normal)
            if self?.event.plannerRepeatTypeName != self?.arrForRepeatDropdown[index].label {
                self?.event.plannerRepeatTypeID = self?.arrForRepeatDropdown[index].value
                self?.event.plannerRepeatTypeName = self?.arrForRepeatDropdown[index].label
                if (self?.arrForRepeatDropdown[index].value == 1 ) {
                    self?.event.endsOn = nil
                }
            }
            imageView.image = UIImage(named: "arrowDown")
            let indexPath = IndexPath(row: 6, section: 0)
            self?.tblViewForAddEvent.reloadRows(at: [indexPath], with: .none)

        }
        dropDownForRepeat.cancelAction = { [unowned self] in
            imageView.image = UIImage(named: "arrowDown")
        }
    }
    
    //    function for return attributed String
    func getAttributedStringForMandatoryField(text:String) ->NSMutableAttributedString {
        let attString: NSMutableAttributedString = NSMutableAttributedString(string: text, attributes: [.font: fonts.addIncidentTitle ?? UIFont.self])
        if text.substring((text.length() - 1)) == "*" {
            attString.setAttributes([.font: fonts.addIncidentTitle ?? UIFont.self, .baselineOffset: 2, .foregroundColor: UIColor.red], range: NSRange(location: (text.length() - 1), length: 1))
        }
        return attString
    }
    
    //function for genarating dictionary
    func genarateAPIParamDictionary() -> Dictionary<String,Any>{
        var dictForParam = event.dictionaryRepresentation()
        var arrForInvolvedEventClass:[[String:Any]] = []
        for involvedEventClass in event.involvedEventClassesList ?? [] {
            var dictForInvolvedEventClass:[String:Any] = [:]
            dictForInvolvedEventClass[Macros.ApiKeys.kclassesID] = involvedEventClass.classesID
            dictForInvolvedEventClass[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            dictForInvolvedEventClass[Macros.ApiKeys.keventID] = event.id ?? 0
            arrForInvolvedEventClass.append(dictForInvolvedEventClass)
        }
        dictForParam[Macros.ApiKeys.kinvolvedEventClassesList] = arrForInvolvedEventClass
        dictForParam[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
        (self.isEdited ?? false) ? (dictForParam[Macros.ApiKeys.kupdatedBy] = AppInstance.shared.user?.loginUserID) : (dictForParam[Macros.ApiKeys.kcreatedBy] = AppInstance.shared.user?.loginUserID)
        return dictForParam
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
            if result != nil {
                self.arrForClass = result as? [Class] ?? []
                if self.event.involvedEventClassesList?.count ?? 0 > 0 {
                    for i in 0..<self.arrForClass.count {
                        for involvedClass in self.event.involvedEventClassesList ?? []{
                            if involvedClass.classesID == self.arrForClass[i].classesID {
                                self.arrForClass[i].isSelected = true
                            }
                        }
                    }
                }
            }
        }
    }
    
    func apiForGetAllRepeatTypeDropdown(){
        let service = CalendarService()
        service.getRepeatDropDownList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForRepeatDropdown = result as? [Repeat] ?? []
                self.tblViewForAddEvent.reloadData()
            }
        }
    }
    
    func apiForSaveEvent(){
        let service = CalendarService()
        service.saveEvent(with: self, param: self.genarateAPIParamDictionary()) { (result) in
            if result as? String != nil {
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

//MARK:----- UITableView Delegate and Datasource -----
extension AddEventVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 8
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch indexPath.row {
        case 0,1 :
            return customAddEventDateTimeTableViewCell(tableView:tableView,indexPath:indexPath)
        case 2,5 :
            return customDropDownButtonTableViewCell(tableView: tableView, indexPath: indexPath)
        case 3,6 :
            return customAddEventDropDownTableViewCell(tableView:tableView,indexPath:indexPath)
        case 4:
            return customAddEventTextViewTableViewCell(tableView:tableView,indexPath:indexPath)
        default :
            let nib = UINib(nibName: Macros.Identifiers.Cells.SubmitButtonTableViewCell, bundle: nil)
            self.tblViewForAddEvent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell)
            if let cell = self.tblViewForAddEvent.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.SubmitButtonTableViewCell) as? SubmitButtonTableViewCell {
                cell.selectionStyle = .none
                cell.btnForSubmit.addTarget(self, action: #selector(actionForSubmit), for: .touchUpInside)
                return cell
            }
            return UITableViewCell()
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    //MARK:----- Custom TableView Cell -----
    
    //AddEvent DateTime TableView Cell
    func customAddEventDateTimeTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell, bundle: nil)
        self.tblViewForAddEvent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell)
        if let cell = self.tblViewForAddEvent.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DateTimeSelectionTableViewCell) as? DateTimeSelectionTableViewCell {
            cell.backgroundColor = .clear
            cell.selectionStyle = .none
            let arrForTitleLbl:[String] = Macros.ConstantArray.arrForEventTitle[indexPath.row] as? [String] ?? []
            cell.lblForLeftTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitleLbl[0])
            cell.lblForRightTitle.attributedText = self.getAttributedStringForMandatoryField(text: arrForTitleLbl[1])
            cell.btnForLeft.tag = ((indexPath.row + 1) + 1000)
            cell.txtFieldForleft.tag = ((indexPath.row + 1) + 1000)
            cell.imgViewForLeft.tag = (indexPath.row)
            cell.btnForRight.tag = ((indexPath.row + 1) + 2000)
            cell.txtFieldForRight.tag = ((indexPath.row + 1) + 2000)
            cell.imgViewForRight.tag = (indexPath.row)
            cell.lblForRightTitle.tag = ((indexPath.row + 1) + 3000)
            cell.txtFieldForRight.isEnabled = false
            cell.txtFieldForleft.isEnabled = false
            switch indexPath.row {
            case 0:
                cell.imgViewForRight.isHidden = false
                cell.btnForRight.isHidden = false
                cell.lblForRightTitle.isHidden = false
                cell.txtFieldForRight.isHidden =  false
                cell.imgViewForLeft.image = UIImage(named: "calendarBlue")
                cell.imgViewForRight.image = UIImage(named: "calendarBlue")
                cell.btnForLeft.removeTarget(nil, action: nil, for: .allEvents)
                cell.btnForRight.removeTarget(nil, action: nil, for: .allEvents)
                cell.btnForLeft.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
                cell.btnForRight.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
                if event.start != nil {
                    cell.txtFieldForleft.text = CommonClassMethods.dateFromDateString(date: event.start ?? "")
                }else {
                    cell.txtFieldForleft.placeholder = "Select"
                    cell.txtFieldForleft.text = ""
                }
                if event.end != nil {
                    cell.txtFieldForRight.text = CommonClassMethods.dateFromDateString(date: event.end ?? "")
                }else {
                    cell.txtFieldForRight.placeholder = "Select"
                    cell.txtFieldForRight.text = ""
                }
            case 1:
                cell.imgViewForRight.isHidden = false
                cell.btnForRight.isHidden = false
                cell.lblForRightTitle.isHidden = false
                cell.txtFieldForRight.isHidden =  false
                cell.imgViewForLeft.image = UIImage(named: "clock")
                cell.imgViewForRight.image = UIImage(named: "clock")
                cell.btnForLeft.removeTarget(nil, action: nil, for: .allEvents)
                cell.btnForRight.removeTarget(nil, action: nil, for: .allEvents)
                cell.btnForLeft.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
                cell.btnForRight.addTarget(self, action: #selector(actionForSelectTime(_:)), for: .touchUpInside)
                if event.startTime != nil {
                    cell.txtFieldForleft.text = CommonClassMethods.timeFromDateString(date: event.startTime ?? "")
                }else {
                    cell.txtFieldForleft.placeholder = "Select"
                    cell.txtFieldForleft.text = ""
                }
                if event.endTime != nil {
                    cell.txtFieldForRight.text = CommonClassMethods.timeFromDateString(date: event.endTime ?? "")
                }else {
                    cell.txtFieldForRight.placeholder = "Select"
                    cell.txtFieldForRight.text = ""
                }
            default:
                print("default")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //AddEvent DropDown TableView Cell
    func customAddEventDropDownTableViewCell(tableView:UITableView,indexPath:IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForAddEvent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForAddEvent.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            cell.txtFieldForField.delegate = self
            cell.lblForSelectedItems.isHidden = true
            cell.ViewForSelectedItems.isHidden = true
            cell.imgViewForArrow.isHidden = false
            cell.btnForField.isHidden = false
            cell.txtFieldForField.isEnabled = false
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForEventTitle[indexPath.row] as? String ?? "")
            cell.btnForField.tag = indexPath.row
            cell.txtFieldForField.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.isEnabled = true
            cell.txtFieldForField.textColor = .black
            cell.txtFieldForField.dividerColor = colorCode.applicationColor
            switch indexPath.row {
            case 3:
                if event.title != nil {
                    cell.txtFieldForField.text = event.title
                } else {
                    cell.txtFieldForField.text = ""
                    cell.txtFieldForField.placeholder = Macros.ControllerStrings.AddEventVC.TitlePlaceholder
                }
                cell.btnForField.isHidden = true
                cell.txtFieldForField.isEnabled = true
                cell.lblForSelectedItems.isHidden = true
                cell.ViewForSelectedItems.isHidden = true
                cell.imgViewForArrow.isHidden = true
            case 6:
                cell.imgViewForArrow.image = UIImage(named: "calendarBlue")
                cell.btnForField.addTarget(self, action: #selector(actionForSelectDate(_:)), for: .touchUpInside)
                if event.endsOn != nil {
                    cell.txtFieldForField.text = CommonClassMethods.dateFromDateString(date: event.endsOn ?? "")
                }else {
                    cell.txtFieldForField.placeholder = "Select"
                    cell.txtFieldForField.text = ""
                }
                if isEdited ?? false || event.plannerRepeatTypeID == 1 || event.plannerRepeatTypeID == nil {
                    cell.lblForFieldTitle.text = "Ends on"
                    cell.btnForField.isEnabled = false
                    cell.txtFieldForField.isEnabled = false
                    cell.txtFieldForField.textColor = .gray
                    cell.txtFieldForField.dividerColor = .gray
                } else {
                    cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForEventTitle[indexPath.row] as? String ?? "")
                    cell.btnForField.isEnabled = true
                    cell.txtFieldForField.isEnabled = true
                    cell.txtFieldForField.textColor = .black
                    cell.txtFieldForField.dividerColor = colorCode.applicationColor
                }
            default:
                print("Invalid Choice")
            }
            return cell
        }
        return UITableViewCell()
    }
    
    //AddEvent TextView TableView Cell
    func customAddEventTextViewTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForAddEvent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForAddEvent.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.delegate = self
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForEventTitle[indexPath.row] as? String ?? "")
            cell.txtViewForField.tag = indexPath.row
            if event.eventDescription != nil {
                cell.txtViewForField.text = event.eventDescription
            } else {
                cell.txtViewForField.text = ""
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForAddEvent.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForAddEvent.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.lblForFieldTitle.attributedText = self.getAttributedStringForMandatoryField(text: Macros.ConstantArray.arrForEventTitle[indexPath.row] as? String ?? "")
            cell.ViewForSelectedItems.isHidden = true
            cell.btnForField.tag = indexPath.row
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            switch indexPath.row {
            case 2:
                cell.btnForField.setTitle("Select", for: .normal)
                cell.btnForField.addTarget(self, action: #selector(showClassListPopup(sender:)), for: .touchUpInside)
                if arrForSelectedClass.count > 0 {
                    cell.lblForSelectedItems.isHidden = false
                    cell.ViewForSelectedItems.isHidden = false
//                    var nameOfClasses = String()
//                    for classes in arrForSelectedClass {
//                        nameOfClasses.append("\(classes.className ?? ""), ")
//                    }
//                    nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
//                     nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
//                    cell.lblForSelectedItems.text = nameOfClasses
                    cell.lblForSelectedItems.text = arrForSelectedClass.map{$0.className ?? ""}.joined(separator: ",")
                } else {
                    cell.lblForSelectedItems.isHidden = true
                    cell.ViewForSelectedItems.isHidden = true
                }
            case 5:
                self.setupRepeatDropDown(cell.imgViewForArrow, sender: cell.btnForField)
                cell.imgViewForArrow.image = UIImage.init(named: "arrowDown")
                cell.btnForField.addTarget(self, action: #selector(actionForShowRepeatDropdown(sender:)), for: .touchUpInside)
                if event.plannerRepeatTypeName != nil && event.plannerRepeatTypeName != ""{
                    cell.btnForField.setTitle(event.plannerRepeatTypeName, for: .normal)
                } else {
                    cell.btnForField.setTitle("Select", for: .normal)
                }
                if isEdited ?? false {
                    cell.btnForField.isEnabled = false
                } else {
                    cell.btnForField.isEnabled = true
                }
            default:
                print("Invalid Case")
            }
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- Class List Popup Delegate -----
extension AddEventVC: ClassListVCDelegate {
 
    func doneButtonAction(selectedIndex:Int,selectedClasses: [Class]) {
        self.arrForSelectedClass = selectedClasses
        let indexPath = IndexPath(row: selectedIndex, section: 0)
        var involvedEventClasses:[InvolvedClass] = []
        for i in 0..<selectedClasses.count {
            let involvedEventClass = InvolvedClass()
            involvedEventClass.classesID = selectedClasses[i].classesID
            involvedEventClass.agencyID = AppInstance.shared.user?.agencyID ?? 0
            involvedEventClass.eventID = event.id ?? 0
            involvedEventClasses.append(involvedEventClass)
        }
        event.involvedEventClassesList = involvedEventClasses
        self.tblViewForAddEvent.reloadRows(at: [indexPath], with: .none)
    }
}

//MARK:----- UITextField Delegates -----
extension AddEventVC:UITextFieldDelegate{
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentString:NSString = textField.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: string) as NSString
        if textField.tag == 3 {
            event.title = newString as String
        }
        return true
    }
}

//MARK:----- UITextView Delegates -----
extension AddEventVC: UITextViewDelegate{
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let currentString:NSString = textView.text! as NSString
        let newString: NSString = currentString.replacingCharacters(in: range, with: text) as NSString
        if textView.tag == 4 {
            if newString.length > 500 {
                self.showAlert(with: Macros.alertMessages.descriptionMaxLength)
                return false
            } else {
                event.eventDescription = newString as String
                return true
            }
        }
        return true
    }
    
    func textViewShouldBeginEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddEvent.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
        return true
    }
    func textViewDidEndEditing(_ textView: UITextView) {
        if let cell = self.tblViewForAddEvent.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
    }
    func textViewDidBeginEditing(_ textView: UITextView) {
        if let cell = self.tblViewForAddEvent.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = colorCode.applicationColor
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 2.0)
        }
    }
    func textViewShouldEndEditing(_ textView: UITextView) -> Bool {
        if let cell = self.tblViewForAddEvent.cellForRow(at: IndexPath(row: textView.tag, section: 0)) as? TextViewTableViewCell {
            cell.lblForDivider.backgroundColor = .lightGray
            cell.lblForDivider.frame = CGRect(x: cell.lblForDivider.frame.minX, y: cell.lblForDivider.frame.minY, width: cell.lblForDivider.frame.width, height: 1.0)
        }
        return true
    }
}


