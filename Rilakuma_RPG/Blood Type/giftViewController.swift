//
//  giftViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 19..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class giftViewController: UIViewController {

    @IBOutlet weak var speechbubble: UIImageView!
    @IBOutlet weak var speechtext: UITextView!
    @IBOutlet weak var gfspeechbubble: UIImageView!
    @IBOutlet weak var gfspeechtext: UITextView!
    @IBOutlet weak var btn1: UIButton!
    @IBOutlet weak var btn2: UIButton!
    @IBOutlet weak var btn3: UIButton!
    @IBOutlet weak var btn4: UIButton!
    @IBOutlet weak var btn5: UIButton!
    @IBOutlet weak var reactionImage: UIImageView!
    
    fileprivate func giveGift(_ price: Int, _ addfriendship: Int, nameGift:String) {
        var mymoney=singletonDB.mydb.mymoney()
        var myfriend=Int(singletonDB.mydb.myfriendship()*100.0)
        if(mymoney < price)
        {
            speechtext.text="돈이 부족해요"
            reactionImage.image=UIImage(named: "badreaction")
        }
        else
        {
            mymoney -= price
            myfriend += addfriendship
            if(myfriend > 100)
            {
                myfriend=100
            }
            speechtext.isHidden=true
            speechbubble.isHidden=true
            gfspeechtext.isHidden=false
            gfspeechbubble.isHidden=false
            btn1.isEnabled=false
            btn2.isEnabled=false
            btn3.isEnabled=false
            btn4.isEnabled=false
            btn5.isEnabled=false
            reactionImage.image=UIImage(named: "goodreaction")
            singletonDB.mydb.updateRecord(field: "money", changingValue: mymoney)
            singletonDB.mydb.updateRecord(field: "friendship", changingValue: myfriend)
            gfspeechtext.text="고마워 ㅎㅎ ["+String(nameGift)+" 선물 - 호감도 상승 : "+String(addfriendship)+" 현재 돈 : "+String(mymoney)+"]"
        }
    }
    
    @IBAction func lipstickOnclick(_ sender: Any)
    {
        let price=100
        let addfriendship=1
        giveGift(price, addfriendship, nameGift: "립스팁")
    }
    @IBAction func perfumeonClick(_ sender: Any)
    {
        let price=800
        let addfriendship=3
        giveGift(price, addfriendship, nameGift: "향수")
    }
    @IBAction func highheelonClick(_ sender: Any)
    {
        let price=1500
        let addfriendship=5
        giveGift(price, addfriendship, nameGift: "하이휠")
    }
    @IBAction func dressonClick(_ sender: Any)
    {
        let price=2200
        let addfriendship=7
        giveGift(price, addfriendship, nameGift: "드레스")
    }
    @IBAction func necklaceonClick(_ sender: Any)
    {
        let price=3000
        let addfriendship=9
        giveGift(price, addfriendship, nameGift: "목걸이")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        var mydaytime=singletonDB.mydb.mydaytime()
        mydaytime += 1
        singletonDB.mydb.updateRecord(field: "daytime", changingValue: mydaytime)
        
        
        var myhealth=Int(singletonDB.mydb.myHealth()*100.0)
        var myfood=Int(singletonDB.mydb.myhunger()*100.0)
        myhealth -= 5
        myfood -= 15
        singletonDB.mydb.updateRecord(field: "health", changingValue: myhealth)
        singletonDB.mydb.updateRecord(field: "hunger", changingValue: myfood)
        
        
        
        speechtext.isHidden=false
        speechbubble.isHidden=false
        gfspeechtext.isHidden=true
        gfspeechbubble.isHidden=true
        speechtext.text="무엇을 선물해주지?"
        btn1.isEnabled=true
        btn2.isEnabled=true
        btn3.isEnabled=true
        btn4.isEnabled=true
        btn5.isEnabled=true
        reactionImage.image=UIImage(named: "goodreaction")
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
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
