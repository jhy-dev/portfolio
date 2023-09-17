//
//  playfriendsViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 19..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class playfriendsViewController: UIViewController {

    @IBOutlet weak var lovelabel: UILabel!
    @IBOutlet weak var mainImage: UIImageView!
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
        
        
        
        var myfriendship=Int(singletonDB.mydb.myfriendship()*100.0)
        let rand_int=Int(arc4random_uniform(5))+1
        
        if(myfriendship >= 0 && myfriendship < 10)
        {
            mainImage.image=UIImage(named: "play1-1")
        }
        else if(myfriendship >= 10 && myfriendship < 20)
        {
            mainImage.image=UIImage(named: "play2-1")
        }
        else if(myfriendship >= 20 && myfriendship < 30)
        {
            mainImage.image=UIImage(named: "play3-1")
        }
        else if(myfriendship >= 30 && myfriendship < 40)
        {
            mainImage.image=UIImage(named: "play4-1")
        }
        else if(myfriendship >= 40 && myfriendship < 50)
        {
            mainImage.image=UIImage(named: "play5-1")
        }
        else if(myfriendship >= 50 && myfriendship < 60)
        {
            mainImage.image=UIImage(named: "play6-1")
        }
        else if(myfriendship >= 60 && myfriendship < 70)
        {
            mainImage.image=UIImage(named: "play7-1")
        }
        else if(myfriendship >= 70 && myfriendship < 80)
        {
            mainImage.image=UIImage(named: "play8-1")
        }
        else if(myfriendship >= 80 && myfriendship < 90)
        {
            mainImage.image=UIImage(named: "play9-1")
        }
        else if(myfriendship >= 90 && myfriendship <= 100)
        {
            mainImage.image=UIImage(named: "play10-1")
        }
        
        if(myfriendship+rand_int > 100)
        {
            myfriendship=100
        }
        else
        {
            myfriendship += rand_int
        }
        singletonDB.mydb.updateRecord(field: "friendship", changingValue: myfriendship)
        lovelabel.text="호감도 상승: "+String(rand_int)
        // Do any additional setup after loading the view.
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
