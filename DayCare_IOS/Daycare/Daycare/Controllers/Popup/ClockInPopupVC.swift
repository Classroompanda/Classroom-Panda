//
//  ClockInPopupVC.swift
//  Daycare
//
//  Created by amrut waghmare on 06/12/18.
//  Copyright © 2018 amrut waghmare. All rights reserved.
//

import UIKit
protocol ClockInDelegate : class {
    func submitButtonAction(data:String)
}
class ClockInPopupVC: UIViewController,UITextFieldDelegate {

    @IBOutlet weak var firstTextField   : UITextField!
    @IBOutlet weak var secondTextField  : UITextField!
    @IBOutlet weak var thirdTextField   : UITextField!
    @IBOutlet weak var fourthTextField  : UITextField!
    
    var delegate : ClockInDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        firstTextField.becomeFirstResponder()
        firstTextField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
        secondTextField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
        thirdTextField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
        fourthTextField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //MARK:----- Action for submit button -----
    @IBAction func actionForSubmit(_ sender: Any) {
        let otpPin = firstTextField.text!+secondTextField.text!+thirdTextField.text!+fourthTextField.text!
        print(otpPin)
        delegate?.submitButtonAction(data: otpPin)
        self .dismiss(animated: true, completion: nil)
    }
    
    //MARK:----- Textfield action function to move cursor from one textfield to another
    
    @objc func textFieldDidChange(textField: UITextField){
        let text = textField.text
        if text?.count ?? 0 >= 1{
            switch textField{
            case firstTextField:
                secondTextField.becomeFirstResponder()
            case secondTextField:
                thirdTextField.becomeFirstResponder()
            case thirdTextField:
                fourthTextField.becomeFirstResponder()
            default:
                break
            }
        }
        if text?.count == 0 {
            textField.text = ""
            switch textField {
            case fourthTextField:
                thirdTextField.becomeFirstResponder()
            case thirdTextField:
                secondTextField.becomeFirstResponder()
            case secondTextField:
                firstTextField.becomeFirstResponder()
            default:
                break
            }
        }
    }
    
    // MARK:----- TextField Delegate function -----
    // In this delegate function we have managed that one textfield can contain only single character
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        if textField.text?.count ?? 0 > 0 {
            if string == ""{
                return true
            } else {
                switch textField{
                case firstTextField:
                    secondTextField.becomeFirstResponder()
                    return true
                case secondTextField:
                    thirdTextField.becomeFirstResponder()
                    return true
                case thirdTextField:
                    fourthTextField.becomeFirstResponder()
                    return true
                default:
                    return false
                }
            }
        }
        return true
    }
}
