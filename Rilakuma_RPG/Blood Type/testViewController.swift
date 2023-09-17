//
//  testViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 18..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class testViewController: UIViewController {

    @IBOutlet weak var mainImage: UIImageView!

    
    var timer:Int?
    var goup:Bool?
    var beargoup:Bool?
    var firstchickattack:Bool?
    var secondchickattack:Bool?
    var thirdchickattack:Bool?
    var mychick:whichChick?
    var numshots:Int?
    var mysuccess:Int?
    var speedofChick:CGFloat?
    var playGame:Bool?
    
    @IBOutlet weak var bear: UIImageView!
    @IBOutlet weak var resultLabel: UILabel!
    
    
    enum whichChick {
        case first
        case second
        case third
        case none
    }

    
    @IBOutlet weak var chick1: UIImageView!
    @IBOutlet weak var chick2: UIImageView!
    @IBOutlet weak var chick3: UIImageView!
    @IBOutlet weak var gunshotButton: UIButton!
    @IBOutlet weak var piratebackgroundImage: UIImageView!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        
        var mydaytime=singletonDB.mydb.mydaytime()
        var myhealth=Int(singletonDB.mydb.myHealth()*100.0)
        var myfood=Int(singletonDB.mydb.myhunger()*100.0)
        
        piratebackgroundImage.isHidden=true

        if(mydaytime >= 2)
        {
            piratebackgroundImage.isHidden=false
            piratebackgroundImage.image=UIImage(named: "background(night)")
            gunshotButton.isHidden=true
        }
        else
        {
            //mainImage.frame.origin.y=501 /192
            playGame=true
            timer=0
            numshots = 3
            Timer.scheduledTimer(timeInterval: 0.01, target: self, selector: #selector(testViewController.action), userInfo: nil, repeats: true)
            goup=true
            beargoup=true
            firstchickattack=false
            secondchickattack=false
            thirdchickattack=false
            mychick=whichChick.first
            mysuccess=0
            bear.image=UIImage(named: "bear1")
            gunshotButton.setImage(UIImage(named: "gunfire"), for: .normal)
            resultLabel.text="시도 : "+String(numshots!)
            action()
            // Do any additional setup after loading the view.
            
            mydaytime += 1
            myhealth -= 30
            myfood -= 20
            singletonDB.mydb.updateRecord(field: "health", changingValue: myhealth)
            singletonDB.mydb.updateRecord(field: "hunger", changingValue: myfood)
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: mydaytime)
        }
        
        
        

    }
    
    @objc func action()
    {
        
        
        
        
        rilaMove()
        bearMove()
        chickAttacks()
        if(numshots! <= 0 && playGame == true && thirdchickattack == false)
        {
            playGame=false
            mainImage.isHidden=true
            bear.isHidden=true
            var getmymoney=singletonDB.mydb.mymoney()

            var successmoney:Int?
            switch mysuccess! {
            case 0:
                successmoney=100
                getmymoney += successmoney!
            case 1:
                successmoney=300
                getmymoney += successmoney!
            case 2:
                successmoney=600
                getmymoney += successmoney!
            case 3:
                successmoney=900
                getmymoney += successmoney!
            default:
                print("error")
            }
            singletonDB.mydb.updateRecord(field: "money", changingValue: getmymoney)
            resultLabel.text="[성공 : "+String(mysuccess!)+" 얻은 돈: "+String(successmoney!)+"]"
            
            
            
        }
    }
    
    @IBAction func fireonClick(_ sender: Any)
    {

        switch mychick {
        case whichChick.first?:
            chick1.frame.origin.x=mainImage.frame.origin.x
            chick1.frame.origin.y=mainImage.frame.origin.y
            firstchickattack! = true
            mychick=whichChick.second
            numshots! -= 1
            resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
        case whichChick.second?:
            chick2.frame.origin.x=mainImage.frame.origin.x
            chick2.frame.origin.y=mainImage.frame.origin.y
            secondchickattack! = true
            mychick=whichChick.third
            numshots! -= 1
            resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
        case whichChick.third?:
            chick3.frame.origin.x=mainImage.frame.origin.x
            chick3.frame.origin.y=mainImage.frame.origin.y
            thirdchickattack! = true
            mychick=whichChick.none
            numshots! -= 1
            resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
        default:
            print("no chick left")
        }
        
        
    }
    fileprivate func chickAttacks() {
        if(firstchickattack! == true)
        {
            chick1.image=UIImage(named: "shootingchick1")
            if(chick1.frame.origin.x < 416)
            {
                speedofChick = (CGFloat(arc4random_uniform(20))+1)
                chick1.frame.origin.x += speedofChick!
                
                //location x = left
                //location y = top
                //location x+width= right
                //location y+height= bottom
                
                var rec1_right=bear.frame.origin.x+74
                var rec1_left=bear.frame.origin.x
                var rec1_top=bear.frame.origin.y
                var rec1_bottom=bear.frame.origin.y+111

                var rec2_right=chick1.frame.origin.x+50
                var rec2_left=chick1.frame.origin.x
                var rec2_top=chick1.frame.origin.y
                var rec2_bottom=chick1.frame.origin.y+50
                
                if (rec1_right>rec2_left && rec1_left<rec2_right && rec1_bottom>rec2_top && rec1_top<rec2_bottom)
                {
                    chick1.isHidden=true
                    bear.image=UIImage(named: "bear2")
                    mysuccess! += 1
                    resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
                    firstchickattack! = false
                }
                
                
                
            }
            else
            {
                firstchickattack=false
            }
        }
        if(secondchickattack! == true)
        {
            chick2.image=UIImage(named: "shootingchick1")
            if(chick2.frame.origin.x < 416)
            {
                speedofChick = (CGFloat(arc4random_uniform(7))+1)
                chick2.frame.origin.x += speedofChick!
                
                
                var rec1_right=bear.frame.origin.x+74
                var rec1_left=bear.frame.origin.x
                var rec1_top=bear.frame.origin.y
                var rec1_bottom=bear.frame.origin.y+111
                
                var rec2_right=chick2.frame.origin.x+50
                var rec2_left=chick2.frame.origin.x
                var rec2_top=chick2.frame.origin.y
                var rec2_bottom=chick2.frame.origin.y+50
                
                if (rec1_right>rec2_left && rec1_left<rec2_right && rec1_bottom>rec2_top && rec1_top<rec2_bottom)
                {
                    chick2.isHidden=true
                    bear.image=UIImage(named: "bear3")
                    mysuccess! += 1
                    resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
                    secondchickattack! = false
                }
                
            }
            else
            {
                secondchickattack=false
            }
        }
        if(thirdchickattack! == true)
        {
            chick3.image=UIImage(named: "shootingchick1")
            if(chick3.frame.origin.x < 416)
            {
                speedofChick = (CGFloat(arc4random_uniform(3))+1)
                chick3.frame.origin.x += speedofChick!
                
                var rec1_right=bear.frame.origin.x+74
                var rec1_left=bear.frame.origin.x
                var rec1_top=bear.frame.origin.y
                var rec1_bottom=bear.frame.origin.y+111
                
                var rec2_right=chick3.frame.origin.x+50
                var rec2_left=chick3.frame.origin.x
                var rec2_top=chick3.frame.origin.y
                var rec2_bottom=chick3.frame.origin.y+50
                
                if (rec1_right>rec2_left && rec1_left<rec2_right && rec1_bottom>rec2_top && rec1_top<rec2_bottom)
                {
                    chick3.isHidden=true
                    bear.isHidden=true
                    mysuccess! += 1
                    resultLabel.text="시도 : "+String(numshots!)+" 성공 : "+String(mysuccess!)
                    thirdchickattack = false
                }
            }
            else
            {
                thirdchickattack=false
            }
        }
    }
    
    fileprivate func bearMove() {
        if(beargoup! == true)
        {
            if(bear.frame.origin.y > 20)
            {
                bear.frame.origin.y -= (CGFloat(arc4random_uniform(5))+1)
            }
            else
            {
                beargoup! = false
            }
        }
        else
        {
            if(bear.frame.origin.y < 396)
            {
                bear.frame.origin.y += (CGFloat(arc4random_uniform(5))+1)
            }
            else
            {
                beargoup! = true
            }
        }
    }
    
    fileprivate func rilaMove() {
        if(goup! == true)
        {
            if(mainImage.frame.origin.y > 20)
            {
                mainImage.frame.origin.y -= (CGFloat(arc4random_uniform(30))+1)
            }
            else
            {
                goup! = false
            }
        }
        else
        {
            if(mainImage.frame.origin.y < 396)
            {
                mainImage.frame.origin.y += (CGFloat(arc4random_uniform(30))+1)
            }
            else
            {
                goup! = true
            }
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
