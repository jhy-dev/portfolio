package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//=========================================struct
type CarInventory struct {
	No          int    `bson:"no" json:"no"`
	Vin         string `bson:"vin,omitempty" json:"vin,omitempty"`
	CarStatuses `bson:"carstatuses,omitempty" json:"carstatuses,omitempty"`
	CarDetails  `bson:"cardetails,omitempty" json:"cardetails,omitempty"`
}
type CarStatuses struct {
	Status string `bson:"status,omitempty" json:"status,omitempty"`
	Booked string `bson:"booked,omitempty" json:"booked,omitempty"`
	Listed string `bson:"listed,omitempty" json:"listed,omitempty"`
}
type CarDetails struct {
	Model string `bson:"model,omitempty" json:"model,omitempty"`
	Make  string `bson:"make,omitempty" json:"make,omitempty"`
	Year  string `bson:"year,omitempty" json:"year,omitempty"`
	Msrp  string `bson:"msrp,omitempty" json:"msrp,omitempty"`
}
type Response struct {
	StatusCode int    `bson:"statuscode" json:"statuscode"`
	Content    string `bson:"content" json:"content"`
}

func getindex(w http.ResponseWriter, r *http.Request) {

	//=========================================request
	var results []CarInventory
	sk := mux.Vars(r)["sortkey"]
	rs := mux.Vars(r)["reverse"]
	cp := mux.Vars(r)["current_page"]
	const pagelimit = 10

	//fmt.Println(sortkey)
	client := dbConn()
	c := client.DB("mongo").C("CarInventory")

	sortkey := strings.ToUpper(sk)
	reverse := strings.ToUpper(rs)
	currentPage, pageErr := strconv.Atoi(cp)
	if pageErr != nil {
		fmt.Println(pageErr)
	}
	var sortby string
	fmt.Println(reverse)
	if sortkey == "ALL" {
		if reverse == "TRUE" {
			sortby = "$natural"
		} else {
			sortby = "-$natural"
		}
	} else if sortkey == "YEAR" {
		if reverse == "TRUE" {
			sortby = "cardetails.year"
		} else {
			sortby = "-cardetails.year"
		}
	} else if sortkey == "MODEL" {
		if reverse == "TRUE" {
			sortby = "cardetails.model"
		} else {
			sortby = "-cardetails.model"
		}
	} else if sortkey == "MAKE" {
		if reverse == "TRUE" {
			sortby = "cardetails.make"
		} else {
			sortby = "-cardetails.make"
		}
	}
	err := c.Find(nil).Sort(sortby).Skip((currentPage - 1) * pagelimit).Limit(pagelimit).All(&results)
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println(results)

	defer client.Close()
	//=========================================response
	data, err := json.Marshal(results)
	fmt.Printf("%v; %v\n", string(data), err)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func updateindex(w http.ResponseWriter, r *http.Request) {

	//=========================================request
	var mycar CarInventory
	msg, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.Unmarshal([]byte(msg), &mycar)
	client := dbConn()
	c := client.DB("mongo").C("CarInventory")

	c.Update(bson.M{"no": mycar.No}, bson.M{"$set": mycar})
	defer client.Close()

	fmt.Println(mycar.No)

	//=========================================response
	resp := &Response{
		StatusCode: 200,
		Content:    "successfully updated",
	}
	data, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}
func postindex(w http.ResponseWriter, r *http.Request) {

	//=========================================request
	var mycar CarInventory
	msg, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.Unmarshal([]byte(msg), &mycar)
	//fmt.Println(mycar.CarStatuses.Status)
	client := dbConn()
	c := client.DB("mongo").C("CarInventory")

	//retrieve the last counter
	var lastresult CarInventory
	c.Find(nil).Sort("-$natural").One(&lastresult)
	if err != nil {
		fmt.Println(err)
	}
	//auto-increment the new document
	mycar.No = lastresult.No + 1
	if err := c.Insert(mycar); err != nil {
		fmt.Println(err)
	}

	defer client.Close()

	//=========================================response
	resp := &Response{
		StatusCode: 200,
		Content:    "successfully posted",
	}
	data, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func deleteindex(w http.ResponseWriter, r *http.Request) {

	//=========================================request
	var mycar CarInventory
	msg, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.Unmarshal([]byte(msg), &mycar)
	//fmt.Println(mycar.No)
	client := dbConn()
	c := client.DB("mongo").C("CarInventory")
	if err := c.Remove(bson.M{"no": mycar.No}); err != nil {
		fmt.Println(err)
	}
	fmt.Println(mycar.No)

	defer client.Close()

	//=========================================response
	resp := &Response{
		StatusCode: 200,
		Content:    "successfully deleted",
	}
	data, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}
func main() {

	r := mux.NewRouter()
	r.Path("/{sortkey}/{current_page}/{reverse}").HandlerFunc(getindex)
	r.HandleFunc("/", updateindex).Methods("PUT")
	r.HandleFunc("/", postindex).Methods("POST")
	r.HandleFunc("/", deleteindex).Methods("DELETE")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	log.Println("Server started on: http://localhost:3500")
	log.Fatal(http.ListenAndServe(":3500", handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
func dbConn() *mgo.Session {
	session, err := mgo.Dial("mongodb://mongo:27017/")
	if err != nil {
		panic(err)
	}
	return session
}
