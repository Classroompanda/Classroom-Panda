//
//  MealDetailsVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 02/05/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit

class MealDetailsVC: BaseViewController {

    @IBOutlet weak var tblViewForMealDetails: UITableView!
    var selectedMeal:Meal?
    var meal: Meal?
    var arrForMealTypeList:[MealType]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setNavigationBarWithBackButton(title: Macros.NavigationTitle.mealDetails)
        apiCallForGetPerticularMealPlan()
        // Do any additional setup after loading the view.
    }
    
    func apiCallForGetPerticularMealPlan(){
        let service = CalendarService()
        service.getPerticularMealPlan(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, mealPlanID: selectedMeal?.id ?? 0) { (result) in
            if let arrForMealPlan:[Meal] = result as? [Meal] {
                if arrForMealPlan.count > 0 {
                    self.meal = arrForMealPlan.first
                    self.tblViewForMealDetails.reloadData()
                }
            }
        }
    }
}

//MARK:------ UITableView Delegate and Datasource -------
extension MealDetailsVC: UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.meal?.involvedMealFoodItems?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return customFoodListTableViewCell(tableView: tableView, indexPath: indexPath)
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        return customMealDetailTableHeaderView(tableView: tableView)
    }
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return nil
    }
    
    func tableView(_ tableView: UITableView, estimatedHeightForHeaderInSection section: Int) -> CGFloat {
        return 310
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return UITableView.automaticDimension
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 0.0
    }
    
    func customMealDetailTableHeaderView(tableView: UITableView) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.MealDetailsHeaderTableViewCell) as? MealDetailsHeaderTableViewCell {
            let classList = meal?.involvedClass?.map{$0.className ?? ""}.joined(separator: ",")
            cell.lblForClassName.text = classList
            cell.lblForEndDate.text = TimeUtils.convertdateFormater(meal?.end, fromFormat:  DateFormats.YYYY_MM_DD_T_HH_MM_SS, toFormat: DateFormats.DD_MMM_YYYY)
            cell.lblForStartDate.text = TimeUtils.convertdateFormater(meal?.start, fromFormat:  DateFormats.YYYY_MM_DD_T_HH_MM_SS, toFormat: DateFormats.DD_MMM_YYYY)
            cell.lblForStartTime.text = TimeUtils.convertdateFormater(meal?.startTime, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSS, toFormat: DateFormats.HH_MM_A)
            cell.lblForEndTime.text = TimeUtils.convertdateFormater(meal?.endTime, fromFormat: DateFormats.YYYY_MM_DD_T_HH_MM_SS_SSS, toFormat: DateFormats.HH_MM_A)
            cell.lblForTitle.text = meal?.title
            cell.lblForDescription.text = meal?.description
            for mealType in arrForMealTypeList ?? [] {
                if meal?.mealTypeID == mealType.value {
                    cell.lblForCategory.text = mealType.label
                }
            }
            return cell
        }
        return UITableViewCell()
    }
    
    func customFoodListTableViewCell(tableView: UITableView, indexPath: IndexPath) -> UITableViewCell {
        if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.FoodListTableViewCell) as? FoodListTableViewCell {
            cell.lblForFood.text = self.meal?.involvedMealFoodItems?[indexPath.row].foodTypeName
            cell.lblForAmount.text = String(self.meal?.involvedMealFoodItems?[indexPath.row].amount ?? 0)
            cell.lblForUnit.text = self.meal?.involvedMealFoodItems?[indexPath.row].measureUnitTypeName
            return cell
        }
        return UITableViewCell()
    }
}


//MARK:---- UITableView Cells ----
class MealDetailsHeaderTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForStartDate: UILabel!
    @IBOutlet weak var lblForEndDate: UILabel!
    @IBOutlet weak var lblForStartTime: UILabel!
    @IBOutlet weak var lblForEndTime: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForClassName: UILabel!
    @IBOutlet weak var lblForCategory: UILabel!
    @IBOutlet weak var lblForDescription: UILabel!
    
}

class FoodListTableViewCell: UITableViewCell {
    @IBOutlet weak var lblForFood: UILabel!
    @IBOutlet weak var lblForAmount: UILabel!
    @IBOutlet weak var lblForUnit: UILabel!
}

