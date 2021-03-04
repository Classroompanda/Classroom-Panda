//
//  MedicationsVC.swift
//  Daycare
//
//  Created by amrut waghmare on 04/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class MedicationsVC: BaseViewController {
   
    @IBOutlet weak var tblViewForMedication: UITableView!
    var arrForTeacherMedicationLogs:[TeacherMedicationLog] = []
    var isFirstLoad = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationTitle.Medication)
        self.tblViewForMedication.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        if AppInstance.shared.currentCheckInClass.classesID == 0 || AppInstance.shared.currentCheckInClass.classesID == nil {
            self.showAlert(with: Macros.alertMessages.pleaseCheckedInClass)
        } else {
            apiCallForGetTeacherMedicationLogs()
        }
    }
    
    @objc func actionForAddMedicationPopup(_ sender: UIButton) {
      var selectedClass : OperationalClass?
      selectedClass?.value = 1
        let dailySheet = DailySheet()
        let health = ActivityMedications()
       
        let teacherMedicationLog = self.arrForTeacherMedicationLogs[sender.tag]
        health.id = 0
        health.agencyID = teacherMedicationLog.agencyID
        health.studentActivitiesID = 0
        dailySheet.studentID = teacherMedicationLog.studentID
        dailySheet.id = 0
        let popoverContent = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Popover, vcIdentifire: Macros.Identifiers.Controller.EditDailySheetPopupVC) as! EditDailySheetPopupVC
        popoverContent.modalPresentationStyle = UIModalPresentationStyle.popover
        popoverContent.selectedIndex = sender.tag
        popoverContent.dailySheetStudent = dailySheet
        popoverContent.selectedClass = selectedClass
        popoverContent.selectedActivityTypeId = ActivityTypeID.Health
        popoverContent.health = health
        popoverContent.delegate = self
        popoverContent.isMedication = true
        popoverContent.preferredContentSize = PlatformUtils.isPad ? CGSize(width:500,height:330) : CGSize(width:300,height:300)
        let popover = popoverContent.popoverPresentationController
        popover?.permittedArrowDirections = UIPopoverArrowDirection.init(rawValue: 0)
        popover?.delegate = self
        popover?.sourceView = self.view
        popover?.sourceRect = CGRect(x:(self.view.center.x-50),y:(self.view.center.y-50),width:100,height:100)
        self.present(popoverContent, animated: true, completion: nil)
    }
    
    //MARK:----- API Calling Functions -----
    func apiCallForGetTeacherMedicationLogs(){
        let service = DashboarService()
        service.getTeacherMedicationLogs(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, askingDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), teacherID: AppInstance.shared.teacher?.id ?? 0, classId: AppInstance.shared.currentCheckInClass.classesID ?? 0) { (result) in
            if result != nil {
                self.isFirstLoad = false
                self.arrForTeacherMedicationLogs = result as? [TeacherMedicationLog] ?? []
                self.tblViewForMedication.reloadData()
            }
        }
    }
    
    func apiCallForSaveDailySheet(param: Dictionary<String,Any>){
        let service = DailySheetService()
        DispatchQueue.global(qos: .background).async {
            service.saveDailySheetData(with: nil, param: param) { (result) in
                if result as? String != nil {
                    print(result)
                }
            }
        }
    }
}

//MARK:------ UITableView Delegates and DataSources ------
extension MedicationsVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isFirstLoad ? 0 : (arrForTeacherMedicationLogs.count > 0) ? arrForTeacherMedicationLogs.count : 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if !isFirstLoad {
            return (self.arrForTeacherMedicationLogs.count) != 0 ? customTeacherMedicationTableViewCell(tableView: tableView, indexPath: indexPath) : CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForMedication)
        }
        return UITableViewCell()
    }
   
    //Custom Teacher medication log cell function
    func customTeacherMedicationTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MedicationListTableViewCell) as? MedicationListTableViewCell {
            cell.lblForStudentName.text = self.arrForTeacherMedicationLogs[indexPath.row].studentName
            cell.lblForMedication.text = self.arrForTeacherMedicationLogs[indexPath.row].medicationName
            cell.lblForStrengthValue.text = self.arrForTeacherMedicationLogs[indexPath.row].strength
            cell.lblForUnitValue.text = String(self.arrForTeacherMedicationLogs[indexPath.row].units ?? 0)
            cell.lblForDoesValue.text = self.arrForTeacherMedicationLogs[indexPath.row].doseRepeatName
            cell.lblForHowTakenValue.text = self.arrForTeacherMedicationLogs[indexPath.row].howTaken
            !(self.arrForTeacherMedicationLogs[indexPath.row].isMedicationDone ?? false) ? cell.btnForDoesAction.setImage(UIImage(named: "unchecked"), for: .normal) : cell.btnForDoesAction.setImage(UIImage(named: "checked"), for: .normal)
            cell.btnForDoesAction.tag = indexPath.row
            !(self.arrForTeacherMedicationLogs[indexPath.row].isMedicationDone ?? false) ? cell.btnForDoesAction.addTarget(self, action: #selector(actionForAddMedicationPopup(_:)), for: .touchUpInside) : cell.btnForDoesAction.removeTarget(nil, action: nil, for: .allEvents)
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:------ EditDailySheetVCDelegate ------
extension MedicationsVC: EditDailySheetVCDelegate{
    
    func doneButtonAction(dataParam: Dictionary<String, Any>, selectedIndex: Int?) {
        var dictforParameter = dataParam
        dictforParameter[Macros.ApiKeys.kid] = 0
        if let index = selectedIndex {
            self.arrForTeacherMedicationLogs[index].isMedicationDone = true
            self.arrForTeacherMedicationLogs[index].studentActivityMedicationID = 1
            if var dictForStudentHealthDescription:[String:Any] = dictforParameter[Macros.ApiKeys.kstudentActivityMedications] as? [String : Any] {
                dictForStudentHealthDescription[Macros.ApiKeys.khowTaken] = self.arrForTeacherMedicationLogs[index].howTaken
                 dictForStudentHealthDescription[Macros.ApiKeys.kstudentMedicationID] = self.arrForTeacherMedicationLogs[index].studentMedicationID
                 dictForStudentHealthDescription[Macros.ApiKeys.kdoseRepeatID] = self.arrForTeacherMedicationLogs[index].doseRepeatID
                dictforParameter[Macros.ApiKeys.kstudentActivityMedications] = dictForStudentHealthDescription
            }
            self.tblViewForMedication.reloadRows(at: [IndexPath(row: index, section: 0)], with: .automatic)
        }
        self.apiCallForSaveDailySheet(param: dictforParameter)
    }
}

//MARK:------ Medication List TableView Cell ------
class MedicationListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForStudentName: UILabel!
    @IBOutlet weak var lblForMedication: UILabel!
    @IBOutlet weak var lblForStrengthValue: UILabel!
    @IBOutlet weak var lblForHowTakenValue: UILabel!
    @IBOutlet weak var lblForDoesValue: UILabel!
    @IBOutlet weak var lblForUnitValue: UILabel!
    @IBOutlet weak var btnForDoesAction: UIButton!
}
