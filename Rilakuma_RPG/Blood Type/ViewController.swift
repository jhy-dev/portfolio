//
//  ViewController.swift
//  Blood Type
//
//  Created by jhy on 2018. 5. 8..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    //DAY, DAYTIME ,MONEY ,FRIENDSHIP ,HUNGER ,Health
    
    enum DAYTIME:String {
        case MORNING="Morning"
        case AFTERNOON="Afternoon"
        case NIGHT="Night"
        case ERROR="ERROR"
    }
    
    //var mydb: sqliteHandler?
    var time: DAYTIME?
    //let mydb: sqliteHandler?
    //myday()
    //mydaytime()
    //mymoney()
    //myfriendship()
    //myhunger()
    //myHealth()
    //singletonDB.mydb.updateRecord(field: "day", changingValue: 0)
    @IBOutlet weak var btn1: UIButton!
    @IBOutlet weak var btn2: UIButton!
    @IBOutlet weak var btn3: UIButton!
    @IBOutlet weak var btn4: UIButton!
    @IBOutlet weak var btn5: UIButton!
    @IBOutlet weak var ghostimage: UIImageView!
    @IBOutlet weak var ripimage: UIImageView!
    @IBOutlet weak var deathLabel: UILabel!
    @IBOutlet weak var deathImage: UIImageView!
    @IBOutlet weak var daylabel: UILabel!
    @IBOutlet weak var progressHunger: UIProgressView!
    @IBOutlet weak var progressFriend: UIProgressView!
    @IBOutlet weak var DaytimeLabel: UILabel!
    @IBOutlet weak var progressHealth: UIProgressView!
    @IBOutlet weak var mainImage: UIImageView!
    @IBOutlet weak var healthLabel: UILabel!
    @IBOutlet weak var friendLabel: UILabel!
    @IBOutlet weak var foodLabel: UILabel!
    @IBOutlet weak var moneyLabel: UILabel!
    @IBOutlet weak var roomImage: UIImageView!
    @IBOutlet weak var backgroundImageview: UIImageView!
    @IBOutlet weak var emoticonimage: UIImageView!
    @IBOutlet weak var emoticonlabel: UILabel!
    
    @IBOutlet weak var resetButton: UIButton!
    
    @IBAction func resetOnClick(_ sender: Any)
    {
        deathImage.isHidden=true
        deathLabel.isHidden=true
        resetButton.isHidden=true
        ghostimage.isHidden=true
        ripimage.isHidden=true
        btn1.isEnabled=true
        btn2.isEnabled=true
        btn3.isEnabled=true
        btn4.isEnabled=true
        btn5.isEnabled=true
        
        
        
        
        
        
        singletonDB.mydb.updateRecord(field: "day", changingValue: 1)
        singletonDB.mydb.updateRecord(field: "daytime", changingValue: 0)
        singletonDB.mydb.updateRecord(field: "money", changingValue: 50)
        singletonDB.mydb.updateRecord(field: "friendship", changingValue: 0)
        singletonDB.mydb.updateRecord(field: "hunger", changingValue: 70)
        singletonDB.mydb.updateRecord(field: "health", changingValue: 80)
        singletonDB.mydb.updateRecord(field: "DAYTODAY", changingValue: 0)
        singletonDB.mydb.updateRecord(field: "VISITGFDAY", changingValue: 0)
        singletonDB.mydb.updateRecord(field: "GFFRIENDSHIP", changingValue: 0)
        singletonDB.mydb.updateRecord(field: "RANDINT", changingValue: 1)

        
        
        
        RenderingProcess()
    }
    @IBAction func eatonClick(_ sender: Any)
    {
        
    }
    @IBAction func sleeponClick(_ sender: Any)
    {
        var getMyHealth=Int(singletonDB.mydb.myHealth()*100.0)
        var getMyFood=Int(singletonDB.mydb.myhunger()*100.0)
        
        if(getMyHealth >= 70)
        {
            singletonDB.mydb.updateRecord(field: "health", changingValue: 100)
        }
        else
        {
            getMyHealth += 30
            singletonDB.mydb.updateRecord(field: "health", changingValue: getMyHealth)
        }
        getMyFood -= 20
        singletonDB.mydb.updateRecord(field: "hunger", changingValue: getMyFood)
        timeGoesOn()
        deathCheck()
    }
    
    

    
    fileprivate func deathCheck() {
        if(Int(singletonDB.mydb.myHealth()*100.0) <= -100 || Int(singletonDB.mydb.myhunger()*100.0) <= -100)
        {
            deathImage.isHidden=false
            deathLabel.isHidden=false
            resetButton.isHidden=false
            ghostimage.isHidden=false
            ripimage.isHidden=false
            ghostimage.image=UIImage(named: "skull")
            ripimage.image=UIImage(named: "rip")
            //deathImage.image=UIImage(named: "background(night)")
            deathImage.backgroundColor=UIColor.red
            deathLabel.text="You Are Dead"
            btn1.isEnabled=false
            btn2.isEnabled=false
            btn3.isEnabled=false
            btn4.isEnabled=false
            btn5.isEnabled=false
            RenderingProcess()
        }
    }
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        //mydb = singletonDB.mydb.
        //mydb=sqliteHandler()
        deathImage.isHidden=true
        deathLabel.isHidden=true
        resetButton.isHidden=true
        ghostimage.isHidden=true
        ripimage.isHidden=true
        deathCheck()
        
        RenderingProcess()
        
        //DAY, DAYTIME ,MONEY ,FRIENDSHIP ,HUNGER ,Health

        

    }
    
    
    
    
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    fileprivate func timeGoesOn() {
        switch time {
        case DAYTIME.MORNING?:
            time=DAYTIME.AFTERNOON
            updateTime()
            RenderingProcess()
        case DAYTIME.AFTERNOON?:
            time=DAYTIME.NIGHT
            updateTime()
            RenderingProcess()
        case DAYTIME.NIGHT?:
            time=DAYTIME.MORNING
            updateTime()
            var _day=singletonDB.mydb.myday()
            _day += 1
            singletonDB.mydb.updateRecord(field: "day", changingValue: _day)
            RenderingProcess()
        default:
            print("error")
        }
    }
    

    fileprivate func updateImage() {
        
        //print("aa")
        //print(singletonDB.daytoday)
        


        

        
        if(singletonDB.mydb.mydayToday() == 0 || singletonDB.mydb.mydayToday() != singletonDB.mydb.myday())
        {
            singletonDB.mydb.updateRecord(field: "daytoday", changingValue: singletonDB.mydb.myday())
            singletonDB.mydb.updateRecord(field: "randint", changingValue: Int(arc4random_uniform(5))+1)
        }
        
        switch time {
        case DAYTIME.MORNING?:
            mainImage.image=UIImage(named: "mor"+String(singletonDB.mydb.myrandInt()))
            roomImage.image=UIImage(named: "room1")
            //setbackgroundImage(backgroundimage: "background(morning)")
            backgroundImageview.image=UIImage(named: "background(morning)")
        case DAYTIME.AFTERNOON?:
            mainImage.image=UIImage(named: "aft"+String(singletonDB.mydb.myrandInt()))
            roomImage.image=UIImage(named: "bgafternoon")
            //setbackgroundImage(backgroundimage: "background(afternoon)")
            backgroundImageview.image=UIImage(named: "background(afternoon)")
        case DAYTIME.NIGHT?:
            mainImage.image=UIImage(named: "nig"+String(singletonDB.mydb.myrandInt()))
            roomImage.image=UIImage(named: "room3")
            //setbackgroundImage(backgroundimage: "background(night)")
            backgroundImageview.image=UIImage(named: "background(night)")
        default:
            print("error")
        }
        
        
    }
    
    fileprivate func RenderingProcess() {
        daylabel.text="Day - "+String(singletonDB.mydb.myday())
        time=SetUpDaytime()
        progressHunger.setProgress(singletonDB.mydb.myhunger(), animated: true)
        progressFriend.setProgress(singletonDB.mydb.myfriendship(), animated: true)
        progressHealth.setProgress(singletonDB.mydb.myHealth(), animated: true)
        healthLabel.text=String(Int(singletonDB.mydb.myHealth()*100))+"%"
        friendLabel.text=String(Int(singletonDB.mydb.myfriendship()*100))+"%"
        foodLabel.text=String(Int(singletonDB.mydb.myhunger()*100))+"%"
        emoticonimage.image=UIImage(named: "smiley")
        emoticonlabel.text="Happy"
        if(Int(singletonDB.mydb.myHealth()*100) < 0 || Int(singletonDB.mydb.myhunger()*100) < 0)
        {
            emoticonimage.image=UIImage(named: "angry")
            emoticonlabel.text="Unhappy"
        }
        DaytimeLabel.text=time?.rawValue
        moneyLabel.text="$ "+String(singletonDB.mydb.mymoney())
        updateImage()
    }
    

    
    
    
    

    
    
    fileprivate func updateTime() {
        switch time {
        case DAYTIME.MORNING?:
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: 0)
        case DAYTIME.AFTERNOON?:
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: 1)
        case DAYTIME.NIGHT?:
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: 2)
        default:
            print("error")
        }
        
    }
    fileprivate func SetUpDaytime()->DAYTIME {
        switch singletonDB.mydb.mydaytime() {
        case 0:
            return DAYTIME.MORNING
        case 1:
            return DAYTIME.AFTERNOON
        case 2:
            return DAYTIME.NIGHT
        default:
            print("error")
        }
        return DAYTIME.ERROR
    }


}

