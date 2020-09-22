//
//  CalendarVC.swift
//  Daycare
//
//  Created by amrut waghmare on 24/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit

import FSCalendar

class CalendarVC: BaseViewController {
    @IBOutlet weak var viewForFSCalendar: FSCalendar!
    @IBOutlet weak var btnForEventPlanner: UIButton!
    @IBOutlet weak var btnForMealPlanner: UIButton!
    @IBOutlet weak var lblForMealPlanner: UILabel!
    @IBOutlet weak var lblForEventPlanner: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var btnForAdd: UIButton!
    @IBOutlet weak var tblViewForEvent: UITableView!
    
    var isEventFirstLoad:Bool = true
    var isMealFirstLoad:Bool = true
    var selectedDate: Date?
    var selectedMonth: Date?
    
    var arrForEvents:[Event] = []
    var arrForSelectedDateEvent:[Event] = []
    var arrForMealPlan:[Meal]   =   []
    var arrForSelectedDateMealPlan:[Meal]   =   []
    var arrForMealTypeList:[MealType]?
    
    private var currentPage: Date?
    
    private lazy var today: Date = {
        return Date()
    }()
    
    
    //MARK:---- View Functions -----
    override func viewDidLoad() {
        super.viewDidLoad()
        self.selectedDate = CommonClassMethods.convertDateWithoutTime(date: Date())
        initialSetup()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.getEventByMonth(currentMonth: self.selectedMonth ?? Date())
    }
    
    
    
    //MARK:----- @IBActions -----
    
    @IBAction func actionForEventPlanner(_ sender: Any) {
        self.lblForTitle.text = Macros.ControllerStrings.CalendarVC.TodayEvents
        self.btnForAdd.isHidden = false
        self.btnForMealPlanner.isSelected = false
        self.btnForEventPlanner.isSelected = true
        self.btnForEventPlanner.titleLabel?.textColor = colorCode.selectedButtonColor
        self.btnForMealPlanner.titleLabel?.textColor = colorCode.unSelectedButtonColor
        lblForEventPlanner.backgroundColor = colorCode.applicationColor
        lblForMealPlanner.backgroundColor = .white
        self.getEventByMonth(currentMonth: selectedMonth ?? Date())
        self.viewForFSCalendar.reloadData()
        self.tblViewForEvent.reloadData()
    }
    
    @IBAction func actionForMealPlanner(_ sender: Any) {
        self.lblForTitle.text = Macros.ControllerStrings.CalendarVC.TodayMeal
        self.btnForAdd.isHidden = true
        self.btnForEventPlanner.isSelected = false
        self.btnForMealPlanner.isSelected = true
        self.btnForEventPlanner.titleLabel?.textColor = colorCode.unSelectedButtonColor
        self.btnForMealPlanner.titleLabel?.textColor = colorCode.selectedButtonColor
        lblForEventPlanner.backgroundColor = .white
        lblForMealPlanner.backgroundColor = colorCode.applicationColor
        self.getEventByMonth(currentMonth: selectedMonth ?? Date())
        self.viewForFSCalendar.reloadData()
        self.tblViewForEvent.reloadData()
    }
    
    @IBAction func actionForAddButton(_ sender: Any){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddEventVC) as! AddEventVC
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    @IBAction func monthForthButtonPressed(_ sender: Any) {
        
        self.moveCurrentPage(moveUp: true)
    }
    
    @IBAction func monthBackButtonPressed(_ sender: Any) {
        
        self.moveCurrentPage(moveUp: false)
    }
    
    private func moveCurrentPage(moveUp: Bool) {
        
        let calendar = Calendar.current
        var dateComponents = DateComponents()
        dateComponents.month = moveUp ? 1 : -1
        self.currentPage = calendar.date(byAdding: dateComponents, to: viewForFSCalendar.currentPage)
        self.viewForFSCalendar.setCurrentPage(viewForFSCalendar.currentPage, animated: true)
    }
    
    func actionForDelete(indexPath : IndexPath){
        let alertAction = AlertButton.init(style: .default, title: Macros.alertMessages.okString)
        let alertCancelAction = AlertButton.init(style: .cancel, title: Macros.alertMessages.cancelString)
        _ = AlertManager.showAlert(withTitle: Macros.ApplictionName , withMessage:Macros.alertMessages.Delete , buttons: [alertAction,alertCancelAction], onViewController: self, animatedly: true, presentationCompletionHandler:nil, returnBlock: { (index) in
            switch index {
            case 0:
                self.apiForDeleteEvent(event: self.arrForSelectedDateEvent[indexPath.row], indexPath: indexPath)
                if self.arrForSelectedDateEvent.count == 1 {
                    self.viewForFSCalendar.reloadData()
                }
                self.arrForSelectedDateEvent.remove(at: indexPath.row)
            case 1:
                self.dismiss(animated: true, completion: nil)
            default:
                break
            }
        })
    }
    
    func actionForEditEvent(indexPath : IndexPath){
        let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.AddEventVC) as! AddEventVC
        vc.event = self.arrForSelectedDateEvent[indexPath.row]
        vc.isEdited = true
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationTitle.Calendar)
        self.apiForGetMealTypeList()
        viewForFSCalendar.placeholderType = .none
        self.btnForEventPlanner.isSelected = true
    }
    
    //Genarate array of selected date Events
    func createArrayForSelectedDateEvents(){
        if btnForEventPlanner.isSelected {
            arrForSelectedDateEvent = []
            for i in 0..<arrForEvents.count {
                if selectedDate == CommonClassMethods.dateObjectWithoutTimeFromDateString(date: arrForEvents[i].start ?? ""){
                    arrForSelectedDateEvent.append(arrForEvents[i])
                }
            }
        } else {
            arrForSelectedDateMealPlan = []
            for i in 0..<arrForMealPlan.count {
                if selectedDate == CommonClassMethods.dateObjectWithoutTimeFromDateString(date: arrForMealPlan[i].start ?? "") {
                    arrForSelectedDateMealPlan.append(arrForMealPlan[i])
                }
            }
        }
        self.tblViewForEvent.reloadData()
    }
    
    
    //Genrate from date and to date of selected month
    func getEventByMonth(currentMonth:Date){
        let minimumDate = CommonClassMethods.getMinimumDateOfMonth(dateObject: currentMonth)
        let maximumDate = CommonClassMethods.getMaximumDateOfMonth(dateObject: currentMonth)
        btnForEventPlanner.isSelected ? apiForGetEventsByMonth(eventFromDate: minimumDate, eventToDate: maximumDate) : apiForGetMealPlanByMonth(eventFromDate: minimumDate, eventToDate: maximumDate)
    }
    
    //MARK:----- API Calling Functions ------
    
    func apiForGetEventsByMonth(eventFromDate:String,eventToDate:String){
        let service = CalendarService()
        service.getAllEvent(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, eventFromDate: eventFromDate, eventToDate: eventToDate) { (result) in
            if result != nil {
                self.isEventFirstLoad = false
                self.arrForEvents = result as? [Event] ?? []
                self.createArrayForSelectedDateEvents()
                self.viewForFSCalendar.reloadData()
            }
        }
    }
    
    func apiForGetMealPlanByMonth(eventFromDate:String,eventToDate:String){
        let service = CalendarService()
        service.getAllMealPlan(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, eventFromDate: eventFromDate, eventToDate: eventToDate) { (result) in
            if result != nil {
                self.isMealFirstLoad = false
                self.arrForMealPlan = result as? [Meal] ?? []
                self.createArrayForSelectedDateEvents()
                self.viewForFSCalendar.reloadData()
            }
        }
    }
    
    func apiForDeleteEvent(event: Event, indexPath: IndexPath){
        let service = CalendarService()
        service.deleteEvent(with: nil, agencyID: AppInstance.shared.user?.agencyID ?? 0, id: event.id ?? 0, isDeleted: true, deletedDate: CommonClassMethods.convertDateToServerReadableFormat(date: Date()), deletedBy: AppInstance.shared.user?.loginUserID ?? 0) { (result) in
            if result != nil {
                for i in 0..<self.arrForEvents.count {
                    if event.id == self.arrForEvents[i].id {
                        self.arrForEvents.remove(at: i)
                        break
                    }
                }
                self.viewForFSCalendar.reloadData()
                self.tblViewForEvent.reloadData()
            }
        }
    }
    
    func apiForGetMealTypeList(){
        let service = CalendarService()
        service.getMealTypeList(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0) { (result) in
            if result != nil {
                self.arrForMealTypeList = result as? [MealType] ?? []
            }
        }
    }
}

//MARK:----- UITableView DataSource and Delegates -----
extension CalendarVC: UITableViewDataSource,UITableViewDelegate{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if btnForEventPlanner.isSelected {
            return isEventFirstLoad ? 0 : ((arrForSelectedDateEvent.count == 0) ? 1 : arrForSelectedDateEvent.count)
        } else {
            return isMealFirstLoad ? 0 : ((arrForSelectedDateMealPlan.count == 0) ? 1 : arrForSelectedDateMealPlan.count)
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if btnForEventPlanner.isSelected {
            if arrForSelectedDateEvent.count == 0 {
                return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForEvent)
            } else {
                if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EventDetailTableViewCell) as? EventDetailTableViewCell {
                    cell.setEventData(arrForSelectedDateEvent[indexPath.row])
                    return cell
                }
                return UITableViewCell()
            }
        } else {
            if arrForSelectedDateMealPlan.count == 0 {
                return CommonClassMethods.customNoDataFoundCell(tableView: self.tblViewForEvent)
            } else {
                if let cell = tableView.dequeueReusableCell(withIdentifier: Macros.Identifiers.Cells.EventDetailTableViewCell) as? EventDetailTableViewCell {
                    cell.setMealPlannerData(meal: arrForSelectedDateMealPlan[indexPath.row], arrForMealType: arrForMealTypeList ?? [])
                    return cell
                }
                return UITableViewCell()
            }
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if btnForMealPlanner.isSelected {
            if (arrForSelectedDateMealPlan.count > 0) {
                let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboard.Other, vcIdentifire: Macros.Identifiers.Controller.MealDetailsVC) as! MealDetailsVC
                vc.selectedMeal = self.arrForSelectedDateMealPlan[indexPath.row]
                vc.arrForMealTypeList = self.arrForMealTypeList
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    
    @available(iOS 11.0, *)
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let delete =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            self.actionForDelete(indexPath: indexPath)
            completionHandler(true)
        })
        let edit =  UIContextualAction(style: .normal, title: "", handler: { (action,view,completionHandler ) in
            self.actionForEditEvent(indexPath: indexPath)
            completionHandler(true)
        })
        edit.image = UIImage(named: "editWhite")
        edit.backgroundColor = colorCode.applicationColor
        delete.image = UIImage(named: "delete")
        delete.backgroundColor = .red
        let confrigation = UISwipeActionsConfiguration(actions: [delete,edit])
        
        if !self.btnForEventPlanner.isSelected {
            return UISwipeActionsConfiguration(actions: [])
        }
        if arrForSelectedDateEvent.count != 0 {
            return confrigation
        } else {
            return UISwipeActionsConfiguration(actions: [])
        }
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        
        let delete = UITableViewRowAction(style: .destructive, title: "Delete") { (action, indexPath) in
            self.actionForDelete(indexPath: indexPath)
            // delete item at indexPath
        }
        let edit = UITableViewRowAction(style: .normal, title: "Edit") { (action, indexPath) in
            self.actionForEditEvent(indexPath: indexPath)
            // share item at indexPath
        }
        edit.backgroundColor = colorCode.applicationColor
        if !self.btnForEventPlanner.isSelected {
            return []
        }
        if arrForSelectedDateEvent.count != 0 {
            return [delete, edit]
        } else {
            return []
        }
    }
}

//MARK:----- FSCalendar Delegates & DataSources --------
extension CalendarVC: FSCalendarDelegate,FSCalendarDataSource{
    func calendarCurrentPageDidChange(_ calendar: FSCalendar) {
        self.selectedMonth = calendar.currentPage
        let minimumDate = CommonClassMethods.getMinimumDateOfMonth(dateObject: calendar.currentPage)
        let maximumDate = CommonClassMethods.getMaximumDateOfMonth(dateObject: calendar.currentPage)
        btnForEventPlanner.isSelected ? apiForGetEventsByMonth(eventFromDate: minimumDate, eventToDate: maximumDate) : apiForGetMealPlanByMonth(eventFromDate: minimumDate, eventToDate: maximumDate)
    }
    
    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPosition: FSCalendarMonthPosition) {
        self.selectedDate = CommonClassMethods.convertDateWithoutTime(date: date)
        if monthPosition == .next || monthPosition == .previous {
            calendar.setCurrentPage(date, animated: true)
        }
        createArrayForSelectedDateEvents()
    }
    
    func calendar(_ calendar: FSCalendar, numberOfEventsFor date: Date) -> Int {
        if btnForEventPlanner.isSelected {
            for event in self.arrForEvents {
                if (CommonClassMethods.dateObjectWithoutTimeFromDateString(date: event.start ?? "")) == CommonClassMethods.convertDateWithoutTime(date: date) {
                    return 1
                }
            }
        } else {
            for meal in self.arrForMealPlan {
                if (CommonClassMethods.dateObjectWithoutTimeFromDateString(date: meal.start ?? "")) == CommonClassMethods.convertDateWithoutTime(date: date) {
                    return 1
                }
            }
        }
        return 0
    }
    
    func calendar(_ calendar: FSCalendar, willDisplay cell: FSCalendarCell, for date: Date, at monthPosition: FSCalendarMonthPosition) {
        cell.eventIndicator.color = colorCode.applicationColor
    }
}


//MARK:----- Event Detail TableView Cell -----
class EventDetailTableViewCell: UITableViewCell {
    @IBOutlet weak var viewForColorSelection: UIView!
    @IBOutlet weak var lblForStartDate: UILabel!
    @IBOutlet weak var lblForEndDate: UILabel!
    @IBOutlet weak var lblForTime: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForSubTitle1: UILabel!
    @IBOutlet weak var lblForSubtitle2: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        viewForColorSelection.cornerRadius = 10
        // Initialization code
    }
    
    func setEventData(_ event: Event){
        lblForTitle.text = event.title
        lblForSubtitle2.text = event.eventDescription
//        var nameOfClasses = String()
//        for classes in event.involvedEventClassesList ?? [] {
//            nameOfClasses.append("\(classes.className ?? ""), ")
//        }
//        if nameOfClasses != "" && nameOfClasses.length() > 2 {
//            nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
//            nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
//        }
//        lblForSubTitle1.text = nameOfClasses
        lblForSubTitle1.text = event.involvedEventClassesList?.map{$0.className ?? ""}.joined(separator: ",")
        lblForEndDate.text = (CommonClassMethods.dateMonthFromDateString(date: event.end ?? ""))
        lblForStartDate.text = (CommonClassMethods.dateMonthFromDateString(date: event.start ?? ""))
        lblForTime.text = (CommonClassMethods.timeFromDateString(date: event.startTime ?? ""))+" - "+(CommonClassMethods.timeFromDateString(date: event.endTime ?? ""))
    }
    
    func setMealPlannerData(meal: Meal, arrForMealType:[MealType]){
        for mealType in arrForMealType {
            if meal.mealTypeID == mealType.value {
                lblForTitle.text = mealType.label
            }
        }
        lblForEndDate.text = (CommonClassMethods.dateMonthFromDateString(date: meal.end ?? ""))
        lblForStartDate.text = (CommonClassMethods.dateMonthFromDateString(date: meal.start ?? ""))
        lblForTime.text = ""
//        lblForTime.text = (CommonClassMethods.timeFromDateString(date: meal.startTime ?? ""))+" - "+(CommonClassMethods.timeFromDateString(date: meal.endTime ?? ""))
        lblForSubtitle2.text = meal.description
        lblForSubTitle1.text = meal.title
    }
}

//MARK:----- Event Detail TableView Cell -----
class NoEventFoundTableViewCell: UITableViewCell {
    @IBOutlet weak var viewForColorSelection: UIView!
    @IBOutlet weak var lblForTitle: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        viewForColorSelection.cornerRadius = 10
        // Initialization code
    }
    
    func setTitle(_ title: String){
        lblForTitle.text = title
    }
    
}
