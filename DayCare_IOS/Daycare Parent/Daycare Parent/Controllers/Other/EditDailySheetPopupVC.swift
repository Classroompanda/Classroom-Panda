//
//  EditDailySheetPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 28/01/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import ActionSheetPicker_3_0
import DropDown

protocol UpdateMedication: class {
    func updateMedicationData(param: Dictionary<String,Any>)
}

class EditDailySheetPopupVC: BaseViewController {
    @IBOutlet weak var tblViewForEditDailySheet: UITableView!
    var dropDownForMealItemConsumption = DropDown()
    var activity    : OtherActivity?
    var meal        : ActivityMeals?
    var health      : ActivityMedications?
    var notes       : ActivityNotes?
    var mood        : ActivityMoods?
    var nap         : AcitivityNap?
    var diaper      : ActivityDiper?
    var delegate: UpdateMedication?
    var selectedIndex: Int?
    var activityDetail:ActivityDetail?
    
    var dailySheetStudent: DailySheet?
    
    var selectedActivityTypeId: Int?
    var isAlreadyAcknowledge = Bool()
    var arrForSubActivities: [SubActivity]?
    var arrForSelectedStudent:[DailySheet] = []
   
    override func viewDidLoad() {
        super.viewDidLoad()
        self.isAlreadyAcknowledge = health?.isParentAcknowledge ?? false
        // Do any additional setup after loading the view.
    }
    
        //MARK:------ @IBActiions ------
    @IBAction func actionForSave(_ sender: Any) {
        if selectedActivityTypeId == ActivityTypeID.Health {
            health?.acknowledgeParentID = AppInstance.shared.user?.loginUserID ?? 0
            if ((!isAlreadyAcknowledge) && (health?.isParentAcknowledge ?? false)) {
                self.delegate?.updateMedicationData(param: self.genrateParameters())
            }
        }
        self .dismiss(animated: true, completion: nil)
    }
    
    @IBAction func actionForCancel(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func genrateParameters() -> Dictionary<String,Any> {
        var dictForParameters:[String:Any] = [:]
        var dictForSubParametere:[String:Any] = [:]
        if self.dailySheetStudent != nil {
            self.arrForSelectedStudent.append(self.dailySheetStudent ?? DailySheet())
        }
        if selectedActivityTypeId == ActivityTypeID.Health  {
            health?.acknowledgeParentID = AppInstance.shared.user?.loginUserID
            dictForSubParametere = health?.dictionaryRepresentation() ?? [:]
            dictForSubParametere[Macros.ApiKeys.kisParentAcknowledge] = health?.isParentAcknowledge
            dictForParameters[Macros.ApiKeys.kstudentActivityMedications] = dictForSubParametere
            dictForParameters[Macros.ApiKeys.kactivityRegisterDate] = health?.createdDate ?? CommonClassMethods.convertDateToServerReadableFormat(date: Date())
            dictForParameters[Macros.ApiKeys.kagencyID] = AppInstance.shared.user?.agencyID ?? 0
            var arrForSelectedStudentId = [Int]()
            for i in 0..<(self.arrForSelectedStudent.count) {
                arrForSelectedStudentId.append(self.arrForSelectedStudent[i].studentID ?? 0)
            }
            dictForParameters[Macros.ApiKeys.kselectedStudents] = arrForSelectedStudentId
            dictForParameters[Macros.ApiKeys.kclassesID] = dailySheetStudent?.classesID
            dictForParameters[Macros.ApiKeys.kupdatedBy] = AppInstance.shared.user?.loginUserID
            dictForParameters[Macros.ApiKeys.kid] = self.health?.studentActivitiesID
            dictForParameters[Macros.ApiKeys.kactivityTypeID] = self.selectedActivityTypeId
        }
        return dictForParameters
    }
}

extension EditDailySheetPopupVC: UITableViewDelegate,UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch selectedActivityTypeId {
        case ActivityTypeID.Health:
            return (self.health?.studentMedicationID ?? 0 > 0) ? 8 : 2
        case ActivityTypeID.Notes:
            return 1
        case ActivityTypeID.Meal:
            return (5 + (self.meal?.studentActivityMealFoodItems?.count ?? 0))
        case ActivityTypeID.Mood:
            return 2
        case ActivityTypeID.Activity:
            return 3
        case ActivityTypeID.Nap:
            return 3
        case ActivityTypeID.Diper:
            return 2
        default:
            return 0
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        switch selectedActivityTypeId {
        case ActivityTypeID.Health:
            return cellForHealthTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Notes:
            return cellForNotesTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Meal:
            return cellForMealTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Mood:
            return cellForMoodTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Activity:
            return cellForActivityTableView(tableView: tableView, indexPath: indexPath)
        case ActivityTypeID.Diper:
            return cellForDiaperTableView(tableView: tableView, indexPath: indexPath)
        default:
            return cellForNapTableView(tableView: tableView, indexPath: indexPath)
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if selectedActivityTypeId == ActivityTypeID.Health && indexPath.row == 7 {
            if let cell = tableView.cellForRow(at: indexPath) as? MedicationAcknowledgeCheckTableViewCell {
                if !isAlreadyAcknowledge {
                    cell.btnForAcknowledge.isSelected = !cell.btnForAcknowledge.isSelected
                    self.health?.isParentAcknowledge = cell.btnForAcknowledge.isSelected
                }
            }
        }
    }
    
    //MARK:----- TableView Cell Loading Function -----
    
    //Cell for Activity
    func cellForActivityTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0,1:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    //Cell for Meal
    func cellForMealTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let totalNoOfRows = (5 + (self.meal?.studentActivityMealFoodItems?.count ?? 0))
        switch indexPath.row {
        case 0:
            return customDropDownButtonTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customMealPlanTitleTableViewCell(tableView:tableView,indexPath:indexPath)
        case (totalNoOfRows - 6)...(totalNoOfRows - 4) :
            return customMealPlanItemTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    //Cell for Health
    func cellForHealthTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0,2,3,4,5 :
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        case 1:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        case 6:
            return customMedicationAcknowledgeTeacherNameCell(tableView:tableView,indexPath:indexPath)
        case 7:
           return customAcknowledgeTableViewCell(tableView:tableView,indexPath:indexPath)
        default :
            return UITableViewCell()
        }
    }
    
    //Cell for Notes
    func cellForNotesTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Mood
    func cellForMoodTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return indexPath.row == 0 ? customCollectionTableViewCell(tableView: tableView, indexPath: indexPath) : customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Nap
    func cellForNapTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        return indexPath.row != 2 ? customDropDownTableViewCell(tableView: tableView, indexPath: indexPath) : customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    //Cell for Diaper
    func cellForDiaperTableView(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        switch indexPath.row {
        case 0:
            return customDropDownTableViewCell(tableView: tableView, indexPath: indexPath)
        default:
            return customDescriptionTableViewCell(tableView: tableView, indexPath: indexPath)
        }
    }
    
    
    //MARK:----- Custom TableView Cell functions -----
    
    func customDescriptionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.TextViewTableViewCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.TextViewTableViewCell) as? TextViewTableViewCell {
            cell.selectionStyle = .none
            cell.txtViewForField.isUserInteractionEnabled = false
            cell.txtViewForField.isEditable = false
            cell.txtViewForField.dividerColor = .clear
            cell.lblForDivider.isHidden = true
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            if selectedActivityTypeId == ActivityTypeID.Meal {
                let mealItemCount = self.meal?.studentActivityMealFoodItems?.count
                switch indexPath.row {
                case ((mealItemCount ?? 0)+2) :
                    cell.txtViewForField.tag = 3111
                case ((mealItemCount ?? 0)+3) :
                    cell.txtViewForField.tag = 3222
                case ((mealItemCount ?? 0)+4) :
                    cell.txtViewForField.tag = 3333
                default:
                    print("Invalid case")
                }
                let rowIndex = (indexPath.row - (self.meal?.studentActivityMealFoodItems?.count ?? 0))
                cell.lblForFieldTitle.text = arrForTitles[rowIndex] as? String ?? ""
            } else {
                cell.txtViewForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
                cell.lblForFieldTitle.text = arrForTitles[indexPath.row] as? String ?? ""
            }
            
            switch cell.txtViewForField.tag {
            case 87:
                cell.txtViewForField.text = self.activity?.otherActivityNote
            case 18:
                cell.txtViewForField.text =  self.health?.studentHealthDescription
            case 34:
                cell.txtViewForField.text = self.notes?.noteDescription
            case 69:
                cell.txtViewForField.text = self.mood?.studentMoodDescription
            case 104:
                cell.txtViewForField.text = self.nap?.napNote
            case 120:
                cell.txtViewForField.text = self.diaper?.studentActivityDiaperNote
            case 3111:
                cell.txtViewForField.text = self.meal?.otherThanPlanMealComment
            case 3222:
                cell.txtViewForField.text = self.meal?.otherThanPlanMeal
            case 3333:
                cell.txtViewForField.text = self.meal?.mealComment
            default:
                print("Invalid Case")
            }
            cell.txtViewForField.textColor = .lightGray
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownTextFieldTableViewCell) as? DropDownTextFieldTableViewCell {
            cell.selectionStyle = .none
            
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            cell.lblForFieldTitle.text = arrForTitles[indexPath.row] as? String ?? ""
            cell.btnForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
            cell.txtFieldForField.keyboardType = selectedActivityTypeId == ActivityTypeID.Health ? .numberPad : .default
            cell.txtFieldForField.dividerColor = .clear
            switch selectedActivityTypeId {
            case ActivityTypeID.Activity:
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.text = (indexPath.row == 0) ? (activity?.startTime != nil) ? (CommonClassMethods.timeFromDateString(date: activity?.startTime ?? "")) : "" : (activity?.endTime != nil) ? (CommonClassMethods.timeFromDateString(date: activity?.endTime ?? "")) : ""
                
            case ActivityTypeID.Nap:
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.txtFieldForField.text = (indexPath.row == 0) ? (nap?.sleptAtTime != nil) ? CommonClassMethods.timeFromDateString(date: nap?.sleptAtTime ?? "") : "" : (nap?.workUpTime != nil) ? CommonClassMethods.timeFromDateString(date: nap?.workUpTime ?? "") : ""
                
            case ActivityTypeID.Health:
                cell.txtFieldForField.tag = 4000
                cell.btnForField.isHidden = true
                cell.imgViewForArrow.isHidden = true
                cell.txtFieldForField.isEnabled = false
                switch indexPath.row {
                case 0:
                    cell.txtFieldForField.text = self.health?.recordedTemparture
                case 2:
                    cell.txtFieldForField.text = self.health?.studentMedicationName
                case 3:
                    cell.txtFieldForField.text = self.health?.howTaken
                case 4:
                    cell.txtFieldForField.text = self.health?.doseRepeatName
                case 5:
                    cell.txtFieldForField.text = String(describing: self.health?.unit ?? 0)
                default:
                    print("Invalid Case")
                }
            case ActivityTypeID.Diper:
                cell.txtFieldForField.tag = (17 * (selectedActivityTypeId ?? 0)) + indexPath.row
                cell.btnForField.isHidden = false
                cell.imgViewForArrow.isHidden = false
                cell.imgViewForArrow.image = UIImage(named: "clock")
                cell.txtFieldForField.text = (CommonClassMethods.timeFromDateString(date: diaper?.diaperChangeTime ?? ""))
            default:
                print("Invalid Case")
            }
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.txtFieldForField.isEnabled = false
            cell.txtFieldForField.textColor = .lightGray
             cell.imgViewForArrow.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    func customCollectionTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EditDailySheetCollectionTableViewCell) as? EditDailySheetCollectionTableViewCell {
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            if ActivityTypeID.Diper == selectedActivityTypeId {
                 cell.lblForFieldTitle.isHidden = true
            } else {
                cell.lblForFieldTitle.isHidden = false
                cell.lblForFieldTitle.text = arrForTitles[indexPath.row] as? String ?? ""
            }
            cell.collectionViewForActivityMoodSelection.reloadData()
            return cell
        }
        return UITableViewCell()
    }
    
    func customMealPlanTitleTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EditMealPlanTitleTableViewCell) {
            return cell
        }
        return UITableViewCell()
    }
    
    func customDropDownButtonTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        let nib = UINib(nibName: Macros.Identifiers.Cells.DropDownButtonCell, bundle: nil)
        self.tblViewForEditDailySheet.register(nib, forCellReuseIdentifier: Macros.Identifiers.Cells.DropDownButtonCell)
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.DropDownButtonCell) as? DropDownButtonCell {
            cell.selectionStyle = .none
            cell.btnForField.removeTarget(nil, action: nil, for: .allEvents)
            cell.btnForField.backgroundColor = .clear
            cell.btnForField.setTitleColor(colorCode.lblGrayColor, for: .normal)
            cell.btnForField.setTitle(self.meal?.mealPlanTitle ?? "", for: .normal)
            cell.btnForField.borderWidth = 0
            cell.txtFieldForField.dividerColor = .clear
            var arrForTitles = Macros.ConstantArray.arrForEditDailySheetTitles[(selectedActivityTypeId ?? 0) - 1]
            cell.lblForFieldTitle.text =  arrForTitles[indexPath.row] as? String ?? ""
            cell.imgViewForArrow.isHidden = true
            return cell
        }
        return UITableViewCell()
    }
    
    func customMealPlanItemTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = self.tblViewForEditDailySheet.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MealPlanEditItemTableViewCell) as? MealPlanEditItemTableViewCell {
            cell.lblForFoodItem.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName
            cell.lblForAmount.text = String(self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].amount ?? 0)
            cell.lblForUnit.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].measureUnitTypeName
            cell.btnForConsume.tag = indexPath.row
            
            cell.btnForConsume.removeTarget(nil, action: nil, for: .allEvents)
            if (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodTypeName?.lowercased() == Macros.ControllerString.milk.lowercased()) {
                cell.txtFieldForConsumeData.tag = (5000 + (indexPath.row - 2))
                cell.txtFieldForConsumeData.isEnabled = false
                cell.btnForConsume.isHidden = true
                cell.txtFieldForConsumeData.isDividerHidden = true
                cell.txtFieldForConsumeData.text = self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].milkConsumptionQuantity
            } else {
                cell.txtFieldForConsumeData.isEnabled = false
                cell.btnForConsume.isHidden = false
                cell.txtFieldForConsumeData.isDividerHidden = true
                (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != nil && self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName != "") ? cell.btnForConsume.setTitle(self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionName, for: .normal) : cell.btnForConsume.setTitle("---", for: .normal)
                if (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID != nil && self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID != 0) {
                    switch (self.meal?.studentActivityMealFoodItems?[indexPath.row - 2].foodConsumtionID) {
                    case FoodConsumptionID.None :
                        cell.btnForConsume.setTitle(Macros.ControllerString.None, for: .normal)
                    case FoodConsumptionID.Some :
                        cell.btnForConsume.setTitle(Macros.ControllerString.Some, for: .normal)
                    case FoodConsumptionID.Most :
                        cell.btnForConsume.setTitle(Macros.ControllerString.Most, for: .normal)
                    case FoodConsumptionID.All :
                        cell.btnForConsume.setTitle(Macros.ControllerString.All, for: .normal)
                    default:
                        cell.btnForConsume.setTitle("---", for: .normal)
                    }
                }
            }
            cell.btnForConsume.removeTarget(nil, action: nil, for: .allEvents)
            cell.txtFieldForConsumeData.textColor =  .lightGray
            cell.btnForConsume.setTitleColor(.lightGray, for: .normal)
            return cell
        }
        return UITableViewCell()
    }
    
    func customAcknowledgeTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MedicationAcknowledgeCheckTableViewCell) as? MedicationAcknowledgeCheckTableViewCell {
            cell.selectionStyle = .none
            cell.btnForAcknowledge.isSelected = self.health?.isParentAcknowledge ?? false
            return cell
        }
        return UITableViewCell()
    }
    
    func customMedicationAcknowledgeTeacherNameCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell{
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MedicationTitleLabelCell) as? MedicationTitleLabelCell {
            cell.lblForTeacherName.text = self.health?.acknowledgeTeacherName
            return cell
        }
        return UITableViewCell()
    }
}

//MARK:----- UICollectionView DataSource and Delegates -----

extension EditDailySheetPopupVC: UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout{
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch selectedActivityTypeId {
        case ActivityTypeID.Mood:
            return Macros.ConstantArray.arrForMoodTitle.count
        default :
            return 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
         return ((selectedActivityTypeId == ActivityTypeID.Activity) || (selectedActivityTypeId == ActivityTypeID.Diper)) ? customTabSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath) : customImageSelectionCollectionViewCell(collectionView:collectionView,indexPath:indexPath)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch selectedActivityTypeId {
        case ActivityTypeID.Activity :
            let lblSize =  self.arrForSubActivities?[indexPath.row].subActivityLabel?.sizeOfString(font: fonts.fieldTitle ?? UIFont.systemFont(ofSize: 15)) ?? CGSize()
            return CGSize(width: lblSize.width + 30, height: 50)
        case ActivityTypeID.Diper:
            return CGSize(width: 100, height: 50)
        default:
            return CGSize(width: 90, height: 115)
        }
    }

    func customTabSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.EditDailySheetActivityCollectionViewCell, for: indexPath) as? EditDailySheetActivityCollectionViewCell {
            cell.lblForActivityKey.text = (selectedActivityTypeId == ActivityTypeID.Activity) ?  (self.arrForSubActivities?[indexPath.item].subActivityLabel ?? "") : (Macros.ConstantArray.arrForDiperTypeSelection[indexPath.item])
            return cell
        }
        return UICollectionViewCell()
    }
    
    func customImageSelectionCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Macros.Identifiers.Cells.EditDailySheetMoodCollectionViewCell, for: indexPath) as? EditDailySheetMoodCollectionViewCell {
            if mood?.moodTypeID != nil {
                (indexPath.item == ((mood?.moodTypeID ?? 0) - 1)) ?  cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForSelectedMoodImages[indexPath.item]), for: .normal) :  cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[indexPath.item]), for: .normal)
            } else {
                cell.btnForImage.setImage(UIImage(named: Macros.ConstantArray.arrForMoodImage[indexPath.item]), for: .normal)
            }
            cell.btnForImage.tag = (indexPath.item + 1)
            cell.lblForImageTitle.text = Macros.ConstantArray.arrForMoodTitle[indexPath.item]
            return cell
        }
        return UICollectionViewCell()
    }
}



//MARK:----- EditDailySheetCollectionTableViewCell -----
class EditDailySheetCollectionTableViewCell: UITableViewCell{
    @IBOutlet weak var lblForFieldTitle                         : UILabel!
    @IBOutlet weak var collectionViewForActivityMoodSelection   : UICollectionView!
}

//MARK:----- EditDailySheetActivityCollectionViewCell -----
class EditDailySheetActivityCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var lblForActivityKey    : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:----- EditDailySheetMoodCollectionViewCell -----
class EditDailySheetMoodCollectionViewCell: UICollectionViewCell{
    @IBOutlet weak var btnForImage          : UIButton!
    @IBOutlet weak var lblForImageTitle     : UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
}

//MARK:------ MealPlan AddItem TableView Cell -----
class MealPlanEditItemTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFoodItem: UILabel!
    @IBOutlet weak var lblForAmount: UILabel!
    @IBOutlet weak var lblForUnit: UILabel!
    @IBOutlet weak var btnForConsume: UIButton!
    @IBOutlet weak var txtFieldForConsumeData: CustomTextField!
}

class MedicationAcknowledgeCheckTableViewCell: UITableViewCell {
    @IBOutlet weak var btnForAcknowledge: UIButton!
}

class MedicationTitleLabelCell: UITableViewCell {
    @IBOutlet weak var lblForTeacherName: UILabel!
}
