//
//  girlfriendViewController.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 19..
//  Copyright © 2018년 jhy. All rights reserved.
//

import UIKit

class girlfriendViewController: UIViewController {

    @IBOutlet weak var speechtextview: UITextView!
    @IBOutlet weak var conversationImage: UIButton!
    @IBOutlet weak var giftImage: UIButton!
    @IBOutlet weak var playImage: UIButton!
    @IBOutlet weak var mygfspeechbubble: UIImageView!
    @IBOutlet weak var mygfspeechtext: UITextView!
    @IBOutlet weak var mygfImage: UIImageView!
    @IBOutlet weak var yesbtn: UIButton!
    @IBOutlet weak var nobtn: UIButton!
    @IBOutlet weak var backgroundimage: UIImageView!
    @IBOutlet weak var propose: UIButton!
    @IBAction func proposeOnClick(_ sender: Any)
    {
        speechtextview.text="청혼하기에는 돈이 부족해 - 총 $35,000 [반지 $5,000 / 신혼집 $30,000]"
    }
    
    
    fileprivate func playGame() {
        //if(singletonDB.mydb.myfriendship())
        propose.isHidden=true
        yesbtn.isHidden=false
        nobtn.isHidden=false
        conversationImage.isHidden=true
        giftImage.isHidden=true
        playImage.isHidden=true
        mygfImage.isHidden=false
        mygfspeechtext.isHidden=false
        mygfspeechbubble.isHidden=false
        //startGame=true
        yesbtn.isHidden=false
        nobtn.isHidden=false
        var myfriendship=Int(singletonDB.mydb.myfriendship()*100.0)
        var q1text="나 몇살처럼 보여요?"
        var q2text="나 어디가 바꼈게요?"
        var q3text="어제 제가 실수로 상사 책상에 커피를 쏟았는데, 미안하다했는데도 저한테 욕을하고 화를 내는거에요. 이상한 사람이죠?"
        var q4text="나 살쪘죠?"
        var q5text="제가 만든 요리 맛 어때요?"
        var q6text="제 친구 이쁘죠?"
        var q7text="어제 길가다가 어떤 남자가 번호를 물어보는거에요...그래서..."
        var q8text="여친 몇 명 사귀어봤어요?"
        var q9text="저랑 단 둘이 영화 볼래요?"
        var q10text="저랑 사귈래요?"
        
        conversationTalk(myfriendship, q1text, q2text, q3text, q4text, q5text, q6text, q7text, q8text, q9text, q10text)
        
        yesbuttonTitle(&q1text, &q2text, &q3text, &q4text, &q5text, &q6text, &q7text, &q8text, &q9text, &q10text, myfriendship)
        
        
        nobuttonTitle(&q1text, &q2text, &q3text, &q4text, &q5text, &q6text, &q7text, &q8text, &q9text, &q10text, myfriendship)
    }
    
    fileprivate func friendshipcheck(_ mygf: inout Int) {
        if(mygf >= 0 && mygf < 10)
        {
            mygf=0
        }
        else if(mygf >= 10 && mygf < 20)
        {
            mygf=10
            
        }
        else if(mygf >= 20 && mygf < 30)
        {
            mygf=20
            
        }
        else if(mygf >= 30 && mygf < 40)
        {
            mygf=30
            
        }
        else if(mygf >= 40 && mygf < 50)
        {
            mygf=40
            
        }
        else if(mygf >= 50 && mygf < 60)
        {
            mygf=50
            
        }
        else if(mygf >= 60 && mygf < 70)
        {
            mygf=60
            
        }
        else if(mygf >= 70 && mygf < 80)
        {
            mygf=70
            
        }
        else if(mygf >= 80 && mygf < 90)
        {
            mygf=80
            
        }
        else if(mygf >= 90 && mygf <= 100)
        {
            mygf=90
        }
    }
    
    @IBAction func conversationOnclik(_ sender: Any)
    {
    

        var mygf=singletonDB.mydb.mygfFriendship()
        friendshipcheck(&mygf)
        var ff=Int(singletonDB.mydb.myfriendship()*100.0)
        if(ff >= mygf && ff < 100)
        {
            //mygfImage.isHidden=false
            ff += 10
            singletonDB.mydb.updateRecord(field: "GFFRIENDSHIP", changingValue: ff)
            speechtextview.text="내가 하고 싶은 말은..."

            playGame()
            var mydaytime=singletonDB.mydb.mydaytime()
            mydaytime += 1
            singletonDB.mydb.updateRecord(field: "daytime", changingValue: mydaytime)
            var myhealth=Int(singletonDB.mydb.myHealth()*100.0)
            var myfood=Int(singletonDB.mydb.myhunger()*100.0)
            myhealth -= 5
            myfood -= 15
            singletonDB.mydb.updateRecord(field: "health", changingValue: myhealth)
            singletonDB.mydb.updateRecord(field: "hunger", changingValue: myfood)
        }
        else
        {
            speechtextview.text="벌써 말했어... 호감도 10단위로 대화할수있어..."
        }
        
        
        
        
        
        
        
        
        
        
        
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        

        if(singletonDB.mydb.mydaytime() >= 2)
        {
            backgroundimage.image=UIImage(named: "background(night)")
        }
        else if(singletonDB.mydb.myvisitgfDay() == 0 || singletonDB.mydb.myvisitgfDay() != singletonDB.mydb.myday() && singletonDB.mydb.mydaytime() < 2)
        {
            singletonDB.mydb.updateRecord(field: "visitgfday", changingValue: singletonDB.mydb.myday())
            speechtextview.text="그녀의 집 앞이다.. 무엇을 선택하지? [1. 대화 2. 선물 3. 같이 놀기]"
            //startGame=false
            mygfImage.isHidden=true
            mygfspeechtext.isHidden=true
            mygfspeechbubble.isHidden=true
            conversationImage.isHidden=false
            giftImage.isHidden=false
            playImage.isHidden=false
            propose.isHidden=false
            yesbtn.isHidden=true
            nobtn.isHidden=true
            

            
        }
        else
        {
            speechtextview.text="오늘 벌써 방문했어.. 너무 많이 들리면 부담스러워해.."
            //startGame=false
            mygfImage.isHidden=true
            mygfspeechtext.isHidden=true
            mygfspeechbubble.isHidden=true
            conversationImage.isHidden=true
            giftImage.isHidden=true
            playImage.isHidden=true
            yesbtn.isHidden=true
            nobtn.isHidden=true
            propose.isHidden=true
        }

        
        

        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    @IBAction func yesonClick(_ sender: Any)
    {
        
        yesbtn.isHidden=true
        nobtn.isHidden=true
        
        var myfriendship=Int(singletonDB.mydb.myfriendship()*100.0)
        
        if(myfriendship+5 > 100)
        {
            myfriendship=100
        }
        else
        {
            myfriendship += 5
        }
        speechtextview.text="나쁘지 않았어..."
        singletonDB.mydb.updateRecord(field: "friendship", changingValue: myfriendship)
        mygfspeechtext.text="[호감도 상승 : "+String(5)+" 현재 호감도 : "+String(myfriendship)+"]"
    }
    @IBAction func noOnClick(_ sender: Any)
    {
        
        yesbtn.isHidden=true
        nobtn.isHidden=true
        
        var myfriendship=Int(singletonDB.mydb.myfriendship()*100.0)
        
        
        myfriendship -= 5
        speechtextview.text="아... 실수했다"
        singletonDB.mydb.updateRecord(field: "friendship", changingValue: myfriendship)
        mygfspeechtext.text="[호감도 하락 : "+String(5)+" 현재 호감도 : "+String(myfriendship)+"]"
    }
    
    
    
    
    
    
    
    
    //var startGame:Bool?
    fileprivate func conversationTalk(_ myfriendship: Int, _ q1text: String, _ q2text: String, _ q3text: String, _ q4text: String, _ q5text: String, _ q6text: String, _ q7text: String, _ q8text: String, _ q9text: String, _ q10text: String) {
        
        
        
        
        
        
        
        if(myfriendship >= 0 && myfriendship < 10)
        {
            mygfspeechtext.text=q1text
            mygfImage.image=UIImage(named: "gf1")
        }
        else if(myfriendship >= 10 && myfriendship < 20)
        {
            mygfspeechtext.text=q2text
            mygfImage.image=UIImage(named: "gf22")
        }
        else if(myfriendship >= 20 && myfriendship < 30)
        {
            mygfspeechtext.text=q3text
            mygfImage.image=UIImage(named: "gf3")
        }
        else if(myfriendship >= 30 && myfriendship < 40)
        {
            mygfspeechtext.text=q4text
            mygfImage.image=UIImage(named: "gf4")
        }
        else if(myfriendship >= 40 && myfriendship < 50)
        {
            mygfspeechtext.text=q5text
            mygfImage.image=UIImage(named: "gf9")
        }
        else if(myfriendship >= 50 && myfriendship < 60)
        {
            mygfspeechtext.text=q6text
            mygfImage.image=UIImage(named: "gf7")
        }
        else if(myfriendship >= 60 && myfriendship < 70)
        {
            mygfspeechtext.text=q7text
            mygfImage.image=UIImage(named: "gf6")
        }
        else if(myfriendship >= 70 && myfriendship < 80)
        {
            mygfspeechtext.text=q8text
            mygfImage.image=UIImage(named: "gf8")
        }
        else if(myfriendship >= 80 && myfriendship < 90)
        {
            mygfspeechtext.text=q9text
            mygfImage.image=UIImage(named: "gf5")
        }
        else if(myfriendship >= 90 && myfriendship <= 100)
        {
            mygfspeechtext.text=q10text
            mygfImage.image=UIImage(named: "gf10")
        }
    }
    
    fileprivate func yesbuttonTitle(_ q1text: inout String, _ q2text: inout String, _ q3text: inout String, _ q4text: inout String, _ q5text: inout String, _ q6text: inout String, _ q7text: inout String, _ q8text: inout String, _ q9text: inout String, _ q10text: inout String, _ myfriendship: Int) {
        q1text="21살"
        q2text="머리 색깔"
        q3text="응 이상하네"
        q4text="아니"
        q5text="맛있어"
        q6text="니가 더 이뻐"
        q7text="그래서 줬어?"
        q8text="모쏠이야"
        q9text="그러자"
        q10text="그래"
        
        
        if(myfriendship >= 0 && myfriendship < 10)
        {
            yesbtn.setTitle(q1text, for: .normal)
        }
        else if(myfriendship >= 10 && myfriendship < 20)
        {
            yesbtn.setTitle(q2text, for: .normal)
        }
        else if(myfriendship >= 20 && myfriendship < 30)
        {
            yesbtn.setTitle(q3text, for: .normal)
        }
        else if(myfriendship >= 30 && myfriendship < 40)
        {
            yesbtn.setTitle(q4text, for: .normal)
        }
        else if(myfriendship >= 40 && myfriendship < 50)
        {
            yesbtn.setTitle(q5text, for: .normal)
        }
        else if(myfriendship >= 50 && myfriendship < 60)
        {
            yesbtn.setTitle(q6text, for: .normal)
        }
        else if(myfriendship >= 60 && myfriendship < 70)
        {
            yesbtn.setTitle(q7text, for: .normal)
        }
        else if(myfriendship >= 70 && myfriendship < 80)
        {
            yesbtn.setTitle(q8text, for: .normal)
        }
        else if(myfriendship >= 80 && myfriendship < 90)
        {
            yesbtn.setTitle(q9text, for: .normal)
        }
        else if(myfriendship >= 90 && myfriendship <= 100)
        {
            yesbtn.setTitle(q10text, for: .normal)
        }
    }
    
    fileprivate func nobuttonTitle(_ q1text: inout String, _ q2text: inout String, _ q3text: inout String, _ q4text: inout String, _ q5text: inout String, _ q6text: inout String, _ q7text: inout String, _ q8text: inout String, _ q9text: inout String, _ q10text: inout String, _ myfriendship: Int) {
        q1text="35살"
        q2text="전체적 느낌?"
        q3text="니가 잘못했네"
        q4text="응 조금"
        q5text="맛없어"
        q6text="응 이뻤어"
        q7text="어쩌라고?"
        q8text="10명 정도"
        q9text="싫어"
        q10text="싫어"
        
        
        if(myfriendship >= 0 && myfriendship < 10)
        {
            nobtn.setTitle(q1text, for: .normal)
        }
        else if(myfriendship >= 10 && myfriendship < 20)
        {
            nobtn.setTitle(q2text, for: .normal)
        }
        else if(myfriendship >= 20 && myfriendship < 30)
        {
            nobtn.setTitle(q3text, for: .normal)
        }
        else if(myfriendship >= 30 && myfriendship < 40)
        {
            nobtn.setTitle(q4text, for: .normal)
        }
        else if(myfriendship >= 40 && myfriendship < 50)
        {
            nobtn.setTitle(q5text, for: .normal)
        }
        else if(myfriendship >= 50 && myfriendship < 60)
        {
            nobtn.setTitle(q6text, for: .normal)
        }
        else if(myfriendship >= 60 && myfriendship < 70)
        {
            nobtn.setTitle(q7text, for: .normal)
        }
        else if(myfriendship >= 70 && myfriendship < 80)
        {
            nobtn.setTitle(q8text, for: .normal)
        }
        else if(myfriendship >= 80 && myfriendship < 90)
        {
            nobtn.setTitle(q9text, for: .normal)
        }
        else if(myfriendship >= 90 && myfriendship <= 100)
        {
            nobtn.setTitle(q10text, for: .normal)
        }
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
