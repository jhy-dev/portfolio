//
//  sqliteHandler.swift
//  Blood Type
//
//  Created by jhy on 2018. 5. 16..
//  Copyright © 2018년 jhy. All rights reserved.
//

import Foundation
import SQLite3

class sqliteHandler {
    var db: OpaquePointer?

    init() {
        
        // Do any additional setup after loading the view, typically from a nib.
        let fileUrl = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false).appendingPathComponent("user.sqlite")
        if sqlite3_open(fileUrl.path, &db) != SQLITE_OK{
            print("Error opening database")
            return
        }
        

        
        
        let createTableQuery="CREATE TABLE IF NOT EXISTS MYPET (id INTEGER PRIMARY KEY AUTOINCREMENT, DAY INTEGER, DAYTIME INTEGER, MONEY INTEGER, FRIENDSHIP INTEGER, HUNGER INTEGER, HEALTH INTEGER, DAYTODAY INTEGER, VISITGFDAY INTEGER, GFFRIENDSHIP INTEGER, RANDINT INTEGER)"
        if sqlite3_exec(db, createTableQuery, nil, nil, nil) != SQLITE_OK{
            print("Error creating table")
            return
        }
        
        let insertQuery = "INSERT INTO MYPET (DAY, DAYTIME, MONEY, FRIENDSHIP, HUNGER, HEALTH, DAYTODAY, VISITGFDAY, GFFRIENDSHIP, RANDINT) VALUES (1, 0, 50, 0, 70, 80, 0, 0, 0, 1)"
        
        if sqlite3_exec(db, insertQuery, nil, nil, nil) == SQLITE_OK{
            //print("inserted")
        }
        
        
        let deleteQuery = "DELETE FROM MYPET WHERE id > 1"
        
        if sqlite3_exec(db, deleteQuery, nil, nil, nil) == SQLITE_OK{
            //print("inserted")
        }
        
    }
    
    
    
    func updateRecord(field:String, changingValue:Int) {
     
        let field = field.uppercased()
        
         if sqlite3_exec(db, "UPDATE MYPET SET \(field) = \(changingValue) WHERE id = 1", nil, nil, nil) != SQLITE_OK{
         print("error updating")
         
         
         }
     }
    
    
    func showRecord(field:String)->Int {
     
    let field = field.uppercased()

     
     var stmt: OpaquePointer?
     
     if sqlite3_prepare(db, "SELECT * FROM MYPET", -1, &stmt, nil) != SQLITE_OK{
     let errmsg = String(cString: sqlite3_errmsg(db)!)
     print("error preparing select: \(errmsg)")
     }
        
    

     
     //traversing through all the records
     while(sqlite3_step(stmt) == SQLITE_ROW){
     var id = sqlite3_column_int(stmt, 0)
        

        
        
        //let createTableQuery="CREATE TABLE IF NOT EXISTS MYPET (id INTEGER PRIMARY KEY AUTOINCREMENT, DAY INTEGER, DAYTIME INTEGER, MONEY INTEGER, FRIENDSHIP INTEGER, HUNGER INTEGER, HEALTH INTEGER)"
        

         if(id==1)
         {
            switch field {
            case "DAY":
                return Int(sqlite3_column_int(stmt, 1))
            case "DAYTIME":
                return Int(sqlite3_column_int(stmt, 2))
            case "MONEY":
                return Int(sqlite3_column_int(stmt, 3))
            case "FRIENDSHIP":
                return Int(sqlite3_column_int(stmt, 4))
            case "HUNGER":
                return Int(sqlite3_column_int(stmt, 5))
            case "HEALTH":
                return Int(sqlite3_column_int(stmt, 6))
            case "DAYTODAY":
                return Int(sqlite3_column_int(stmt, 7))
            case "VISITGFDAY":
                return Int(sqlite3_column_int(stmt, 8))
            case "GFFRIENDSHIP":
                return Int(sqlite3_column_int(stmt, 9))
            case "RANDINT":
                return Int(sqlite3_column_int(stmt, 10))
            default:
                print("error")
            }
         
         
         
         
         

         }//if id=1
     
     }//while
     
        return 0
     
     }//showrecord
       /**/
    
    
    func myrandInt() -> Int {
        return showRecord(field: "RANDINT")
    }
    
    func mydayToday() -> Int {
        return showRecord(field: "DAYTODAY")
    }
    func myvisitgfDay() -> Int {
        return showRecord(field: "VISITGFDAY")
    }
    func mygfFriendship() -> Int {
        return showRecord(field: "GFFRIENDSHIP")
    }
    
    
    
    
    func myday() -> Int {
        return showRecord(field: "DAY")
    }
    
    func mydaytime() -> Int {
        return showRecord(field: "DAYTIME")
    }
    
    func mymoney() -> Int {
        return showRecord(field: "MONEY")
    }
    
    func myfriendship() -> Float {
        return Float(showRecord(field: "FRIENDSHIP"))/100.0
    }
    
    func myhunger() -> Float {
        return Float(showRecord(field: "HUNGER"))/100.0
    }
    
    func myHealth() -> Float {
        return Float(showRecord(field: "Health"))/100.0
    }
    
}
