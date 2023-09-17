//
//  eatViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 17..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class eatViewController: UIViewController {

    @IBOutlet weak var eatImage: UIImageView!
    @IBOutlet weak var eatText: UITextView!
    @IBOutlet weak var moneyLabel: UILabel!
    
    //DAY, DAYTIME ,MONEY ,FRIENDSHIP ,HUNGER ,Health

    
    override func viewDidLoad() {
        super.viewDidLoad()
        eatImage.image=UIImage(named: "default")
        eatText.text="맛있는거 사주세요 :)"
        moneyLabel.text="돈 : $"+String(singletonDB.mydb.showRecord(field: "money"))
    }

    fileprivate func eatFood(foodprice:Int, foodhunger:Int, foodhealth:Int) {
        var mymoney = singletonDB.mydb.mymoney()
        var myhunger = Int(singletonDB.mydb.myhunger()*100.0)
        var myhealth = Int(singletonDB.mydb.myHealth()*100.0)
        
        if(mymoney >= foodprice)
        {
            
            if(singletonDB.mydb.mydayToday() == 0 || singletonDB.mydb.mydayToday() != singletonDB.mydb.myday())
            {
                singletonDB.mydb.updateRecord(field: "daytoday", changingValue: singletonDB.mydb.myday())
                singletonDB.mydb.updateRecord(field: "randint", changingValue: Int(arc4random_uniform(5))+1)
            }
            
            eatImage.image=UIImage(named: "eat"+String(singletonDB.mydb.myrandInt()))
            mymoney -= foodprice
            if((myhunger+foodhunger) > 100)
            {
                myhunger = 100
            }
            else
            {
                myhunger += foodhunger
            }
            
            if((myhealth+foodhealth) > 100)
            {
                myhealth = 100
            }
            else
            {
                myhealth += foodhealth
            }
            eatText.text="맛있당 ㅎㅎ [허기 수치: "+String(myhunger)+" 건강 수치: "+String(myhealth)+" 남은 돈: "+String(mymoney)+"]"
        }
        else
        {
            eatText.text="돈이 부족해요ㅠㅠ"
        }
        singletonDB.mydb.updateRecord(field: "money", changingValue: mymoney)
        singletonDB.mydb.updateRecord(field: "hunger", changingValue: myhunger)
        singletonDB.mydb.updateRecord(field: "health", changingValue: myhealth)
        moneyLabel.text="돈 : $"+String(singletonDB.mydb.showRecord(field: "money"))
    }
    
    @IBAction func riceOnclick(_ sender: Any)
    {
        eatFood(foodprice: 4, foodhunger: 35, foodhealth: 5)
    }
    @IBAction func porkbunonClick(_ sender: Any)
    {
        eatFood(foodprice: 12, foodhunger: 70, foodhealth: 20)
    }
    @IBAction func hotdogonClick(_ sender: Any)
    {
        eatFood(foodprice: 4, foodhunger: 5, foodhealth: 35)
    }
    @IBAction func honeyonClick(_ sender: Any)
    {
        eatFood(foodprice: 12, foodhunger: 20, foodhealth: 70)
    }
    @IBAction func icecreamonClick(_ sender: Any)
    {
        eatFood(foodprice: 20, foodhunger: 55, foodhealth: 45)
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
