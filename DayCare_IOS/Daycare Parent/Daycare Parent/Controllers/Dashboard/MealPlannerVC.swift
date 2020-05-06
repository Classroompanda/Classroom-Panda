//
//  MealPlannerVC.swift
//  Daycare Parent
//
//  Created by amrut waghmare on 11/03/19.
//  Copyright © 2019 amrut waghmare. All rights reserved.
//

import UIKit
import FSCalendar


class MealPlannerVC: BaseViewController {
    @IBOutlet weak var viewForFSCalendar: FSCalendar!
    @IBOutlet weak var btnForEventPlanner: UIButton!
    @IBOutlet weak var btnForMealPlanner: UIButton!
    @IBOutlet weak var lblForMealPlanner: UILabel!
    @IBOutlet weak var lblForEventPlanner: UILabel!
//    @IBOutlet weak var lblForTitle: UILabel!
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
         self.tblViewForEvent.contentInset = UIEdgeInsets(top: -35.0, left: 0, bottom: 0, right: 0)
        initialSetup()
        viewForFSCalendar.placeholderType = .none

        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
       
    }
    
    
    //MARK:----- @IBActions -----
    
    @IBAction func actionForEventPlanner(_ sender: Any) {
//        self.lblForTitle.text = Macros.ControllerString.TodayEvents
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
//        self.lblForTitle.text = Macros.ControllerString.TodayMeal
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
        
        self.currentPage = calendar.date(byAdding: dateComponents, to: self.currentPage ?? self.today)
        self.viewForFSCalendar.setCurrentPage(self.currentPage ?? Date(), animated: true)
    }
        //MARK:----- Functions -----
    func initialSetup(){
        self.setNavigationBar(title: Macros.NavigationBarTitle.MealPlanner)
        self.apiForGetMealTypeList()
        self.btnForEventPlanner.isSelected = true
        self.getEventByMonth(currentMonth: Date())
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
        let minimumDate = CommonClassMethods.getMinimumDateOfMonth(date: currentMonth)
        let maximumDate = CommonClassMethods.getMaximumDateOfMonth(date: currentMonth)
        btnForEventPlanner.isSelected ? apiForGetEventsByMonth(eventFromDate: minimumDate, eventToDate: maximumDate) : apiForGetMealPlanByMonth(eventFromDate: minimumDate, eventToDate: maximumDate)
    }
    
    //MARK:----- API Calling Functions ------
    
    func apiForGetEventsByMonth(eventFromDate:String,eventToDate:String){
        let service = CalendarService()
        service.getAllEvent(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, eventFromDate: eventFromDate, eventToDate: eventToDate) { (result) in
            if result != nil {
                self.isEventFirstLoad = false
                self.arrForEvents = result as? [Event] ?? []
                self.viewForFSCalendar.reloadData()
                self.createArrayForSelectedDateEvents()
            }
        }
    }
    
    func apiForGetMealPlanByMonth(eventFromDate:String,eventToDate:String){
        let service = CalendarService()
        service.getAllMealPlan(with: self, agencyID: AppInstance.shared.user?.agencyID ?? 0, eventFromDate: eventFromDate, eventToDate: eventToDate) { (result) in
            if result != nil {
                self.isMealFirstLoad = false
                self.arrForMealPlan = result as? [Meal] ?? []
                self.viewForFSCalendar.reloadData()
                self.createArrayForSelectedDateEvents()
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
extension MealPlannerVC: UITableViewDataSource,UITableViewDelegate{
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
                let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.MealDetailsVC) as! MealDetailsVC
                vc.selectedMeal = self.arrForSelectedDateMealPlan[indexPath.row]
                vc.arrForMealTypeList = self.arrForMealTypeList
                self.navigationController?.pushViewController(vc, animated: true)
            }
        } else {
            if (arrForSelectedDateEvent.count > 0) {
                let vc = self.getViewController(storyboardIdentifire: Macros.Identifiers.Storyboards.Other, vcIdentifire: Macros.Identifiers.Controllers.EventDetailVC) as! EventDetailVC
                vc.event = self.arrForSelectedDateEvent[indexPath.row]
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
}

//MARK:----- FSCalendar Delegates & DataSources --------
extension MealPlannerVC: FSCalendarDelegate,FSCalendarDataSource{
    func calendarCurrentPageDidChange(_ calendar: FSCalendar) {
        self.selectedMonth = calendar.currentPage
        let minimumDate = CommonClassMethods.getMinimumDateOfMonth(date: calendar.currentPage)
        let maximumDate = CommonClassMethods.getMaximumDateOfMonth(date: calendar.currentPage)
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
                if (CommonClassMethods.dateObjectFromDateString(date: event.start ?? "")) == CommonClassMethods.convertDateWithoutTime(date: date) {
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
    //    @IBOutlet weak var lblForTime: UILabel!
    @IBOutlet weak var lblForTitle: UILabel!
    @IBOutlet weak var lblForSubTitle1: UILabel!
    @IBOutlet weak var lblForSubtitle2: UILabel!
    @IBOutlet weak var lblForTime: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        viewForColorSelection.cornerRadius = 10
        // Initialization code
    }
    
    func setEventData(_ event: Event){
        lblForTitle.text = event.title
        lblForSubtitle2.text = event.eventDescription
        var nameOfClasses = String()
        for classes in event.involvedEventClassesList ?? [] {
            nameOfClasses.append("\(classes.className ?? ""), ")
        }
        if nameOfClasses != "" && nameOfClasses.length() > 2 {
            nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
            nameOfClasses.remove(at: nameOfClasses.index(before: nameOfClasses.endIndex))
        }
        lblForSubTitle1.text = nameOfClasses
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
        lblForTime.text = (CommonClassMethods.timeFromDateString(date: meal.startTime ?? ""))+" - "+(CommonClassMethods.timeFromDateString(date: meal.endTime ?? ""))
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
