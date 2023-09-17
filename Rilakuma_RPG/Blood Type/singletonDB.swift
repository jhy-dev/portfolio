//
//  singletonDB.swift
//  Rilakkuma
//
//  Created by jhy on 2018. 5. 17..
//  Copyright © 2018년 jhy. All rights reserved.
//

import Foundation

class singletonDB
{
    static let mydb=sqliteHandler()
    //static var daytoday:Int?
    //static var randInt:Int?
    //static var visitgfday:Int?
    //static var gffriendship:Int?
    private init(){}
}
