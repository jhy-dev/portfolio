//
//  workViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 17..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit



class workViewController: UIViewController {
    
    

    
    @IBOutlet weak var backgroundImage: UIImageView!
    @IBOutlet weak var workmainImage: UIImageView!
    @IBOutlet weak var farmText: UITextView!
    @IBOutlet weak var btn1: UIButton!
    @IBOutlet weak var btn2: UIButton!
    @IBOutlet weak var btn3: UIButton!
    @IBOutlet weak var speechview: UIImageView!
    @IBOutlet weak var btn4: UIButton!
    @IBOutlet weak var btn5: UIButton!
    @IBOutlet weak var btn6: UIButton!
    @IBOutlet weak var btn7: UIButton!
    @IBOutlet weak var btn8: UIButton!
    @IBOutlet weak var btn9: UIButton!
    @IBOutlet weak var btn10: UIButton!
    @IBOutlet weak var btn11: UIButton!
    @IBOutlet weak var btn12: UIButton!
    var rand:Int?
    var numCount:Int?
    
    fileprivate func disableAllButtons() {
        btn1.isEnabled=false
        btn2.isEnabled=false
        btn3.isEnabled=false
        btn4.isEnabled=false
        btn5.isEnabled=false
        btn6.isEnabled=false
        btn7.isEnabled=false
        btn8.isEnabled=false
        btn9.isEnabled=false
        btn10.isEnabled=false
        btn11.isEnabled=false
        btn12.isEnabled=false
    }
    
    fileprivate func earnMoney() {
        var mymoney=singletonDB.mydb.mymoney()
        var prize:Int?
        switch numCount {
        case 1:
            prize=1200
        case 2:
            prize=1100
        case 3:
            prize=1000
        case 4:
            prize=900
        case 5:
            prize=800
        case 6:
            prize=700
        case 7:
            prize=600
        case 8:
            prize=500
        case 9:
            prize=400
        case 10:
            prize=300
        case 11:
            prize=200
        case 12:
            prize=100
        default:
            print("error")
        }
        mymoney += prize!
        singletonDB.mydb.updateRecord(field: "money", changingValue: mymoney)
        
        //var aa = "성공! [시도 횟수 : "+String(numCount!)+" 얻은 돈 : "+String(prize!)+" 현재 돈 : "+String(mymoney)+"]"
        farmText.text="성공! [시도 횟수 : "+String(numCount!)+" 얻은 돈 : "+String(prize!)+" 현재 돈 : "+String(mymoney)+"]"
    }
    
    @IBAction func btn1onClick(_ sender: Any)
    {
        if(rand == 1)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn1.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn1.isEnabled=false
            numCount! = numCount! + 1
            farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
            btn1.setImage(UIImage(named: "fried"), for: .normal)
        }
    }
    
    @IBAction func btn2onClick(_ sender: Any)
    {
        if(rand == 2)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn2.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn2.isEnabled=false
            numCount! = numCount! + 1
            
            farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
            btn2.setImage(UIImage(named: "fried"), for: .normal)
        }
        
    }
    @IBAction func btn3onClick(_ sender: Any)
    {
        if(rand == 3)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn3.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn3.isEnabled=false
            numCount! = numCount! + 1
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
                        btn3.setImage(UIImage(named: "fried"), for: .normal)
        }
    }
    @IBAction func btn4onClick(_ sender: Any)
    {
        if(rand == 4)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn4.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn4.isEnabled=false
            numCount! = numCount! + 1
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
                        btn4.setImage(UIImage(named: "fried"), for: .normal)
        }
    }
    @IBAction func btn5onClick(_ sender: Any)
    {
        if(rand == 5)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn5.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn5.isEnabled=false
            numCount! = numCount! + 1
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
                        btn5.setImage(UIImage(named: "fried"), for: .normal)
        }
    }
    @IBAction func btn6onClick(_ sender: Any)
    {
        if(rand == 6)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn6.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn6.isEnabled=false
            numCount! = numCount! + 1
            btn6.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    @IBAction func btn7onClick(_ sender: Any)
    {
        if(rand == 7)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn7.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn7.isEnabled=false
            numCount! = numCount! + 1
                        btn7.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    
    @IBAction func btn8onClick(_ sender: Any)
    {
        if(rand == 8)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn8.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn8.isEnabled=false
            numCount! = numCount! + 1
                        btn8.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    @IBAction func btn9onClick(_ sender: Any)
    {
        if(rand == 9)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn9.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn9.isEnabled=false
            numCount! = numCount! + 1
                        btn9.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    @IBAction func btn10onClick(_ sender: Any)
    {
        if(rand == 10)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn10.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn10.isEnabled=false
            numCount! = numCount! + 1
                        btn10.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    @IBAction func btn11onClick(_ sender: Any)
    {
        if(rand == 11)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn11.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn11.isEnabled=false
            numCount! = numCount! + 1
                        btn11.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    
    @IBAction func btn12onClick(_ sender: Any)
    {
        if(rand == 12)
        {
            disableAllButtons()
            numCount! = numCount! + 1
            earnMoney()
            btn12.setImage(UIImage(named: "chick"), for: .normal)
        }
        else
        {
            btn12.isEnabled=false
            numCount! = numCount! + 1
                        btn12.setImage(UIImage(named: "fried"), for: .normal)
                        farmText.text="실패! [시도 횟수 : "+String(numCount!)+"]"
        }
    }
    
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        var mydaytime=singletonDB.mydb.mydaytime()
        var myhealth=Int(singletonDB.mydb.myHealth()*100.0)
        var myfood=Int(singletonDB.mydb.myhunger()*100.0)
        
        let timepass=1
        let gettingtired=35
        let gettinghungry=25
        workmainImage.image=UIImage(named: "watching")
        if(mydaytime<2)
        {
            backgroundImage.image=UIImage(named: "background(farm)")
            numCount=0
            rand=Int(arc4random_uniform(12))+1
            farmText.text="시도 횟수가 낮을수로 많은 돈을 받아요."
            
            mydaytime += timepass
            myhealth -= gettingtired
            myfood -= gettinghungry
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: mydaytime)
            singletonDB.mydb.updateRecord(field: "health", changingValue: myhealth)
            singletonDB.mydb.updateRecord(field: "hunger", changingValue: myfood)
        }
        else
        {
            btn1.isHidden=true
            btn2.isHidden=true
            btn3.isHidden=true
            btn4.isHidden=true
            btn5.isHidden=true
            btn6.isHidden=true
            btn7.isHidden=true
            btn8.isHidden=true
            btn9.isHidden=true
            btn10.isHidden=true
            btn11.isHidden=true
            btn12.isHidden=true
            farmText.isHidden=true
            workmainImage.isHidden=true
            speechview.isHidden=true
            //var backgroundImage = UIImageView(frame: UIScreen.main.bounds)
            //backgroundImage.image = UIImage(named: "background(night)")
            //backgroundImage.contentMode = UIViewContentMode.scaleAspectFill
            //self.view.insertSubview(backgroundImage, at: 0)
            backgroundImage.image=UIImage(named: "background(night)")
        }
        


    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
