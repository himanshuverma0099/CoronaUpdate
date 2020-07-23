//jshint esversion:6
const express = require("express");

const bodyParser = require("body-parser");
const request = require('request');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine','ejs')
app.get("/", function (req, res) {
    res.render('index', {
        gnewcon: null,
        gtotalcon: null,
        gnewd: null,
        gtotald: null,
        gnewr: null,
        gtotalr: null,
        country: null,
        newcon: null,
        totalcon: null,
        newd: null,
        totald: null,
        newr: null,
        totalr: null,
        date: null,
        error: null
    });
})
// "Country": "Afghanistan",
//     "CountryCode": "AF",
//         "Slug": "afghanistan",
//             "NewConfirmed": 545,
//                 "TotalConfirmed": 15750,
//                     "NewDeaths": 8,
//                         "TotalDeaths": 265,
//                             "NewRecovered": 100,
//                                 "TotalRecovered": 1428,
//                                     "Date": "2020-06-02T17:55:21Z"
app.post("/", function (req, res) {
    const cityname = req.body.count;
    const url ="https://api.covid19api.com/summary";
    request(url, function (err,response,body) {
        if(err){
            res.render('index', {
                gnewcon: null,
                gtotalcon: null,
                gnewd: null,
                gtotald: null,
                gnewr: null,
                gtotalr: null,
                country: null,
                newcon: null,
                totalcon: null,
                newd: null,
                totald: null,
                newr: null,
                totalr: null,
                date: null,
                error: 'Error, Please try again'
            });
        }
        else{
            const wdata = JSON.parse(body);
            if(wdata.Global===undefined){
                res.render('index',{country:null,error:'Error'});
            }
            else{
                const search_val=cityname;
                const gnewcon = wdata.Global.NewConfirmed;
                const gtotalcon = wdata.Global.TotalConfirmed;
                const gnewd = wdata.Global.NewDeaths;
                const gtotald = wdata.Global.TotalDeaths;
                const gnewr = wdata.Global.NewRecovered;
                const gtotalr = wdata.Global.TotalRecovered;
                var num=null;
                
                for(var i=0;i<wdata.Countries.length;i++){
                    if (wdata.Countries[i].Slug === search_val || wdata.Countries[i].Country === search_val || wdata.Countries[i].CountryCode === search_val){
                        num=i;
                        break;
                    }
                }
                if(num!==null){
                    const country = wdata.Countries[num].Country;
                    const newcon = wdata.Countries[num].NewConfirmed;
                    const totalcon = wdata.Countries[num].TotalConfirmed;
                    const newd = wdata.Countries[num].NewDeaths;
                    const totald = wdata.Countries[num].TotalDeaths;
                    const newr = wdata.Countries[num].NewRecovered;
                    const totalr = wdata.Countries[num].TotalRecovered;
                    const date = wdata.Countries[num].Date;
                    console.log(country);
                    res.render('index', {
                        gnewcon:gnewcon,
                        gtotalcon:gtotalcon,
                        gnewd:gnewd,
                        gtotald:gtotald,
                        gnewr:gnewr,
                        gtotalr:gtotalr,
                        country:country,
                        newcon:newcon,
                        totalcon:totalcon,
                        newd:newd,
                        totald:totald,
                        newr:newr,
                        totalr:totalr,
                        date:date,
                        error: null
                    });
                    console.log(totalcon);    
                }
                else{
                    res.render('index', {
                        gnewcon: gnewcon,
                            gtotalcon: gtotalcon,
                            gnewd: gnewd,
                            gtotald: gtotald,
                            gnewr: gnewr,
                            gtotalr: gtotalr,
                        country: null,
                        newcon: null,
                        totalcon: null,
                        newd: null,
                        totald: null,
                        newr: null,
                        totalr: null,
                        date: null,
                        error: 'Error, Please try again'
                    });
                }
                            
            } 
        }   
    })
})

app.listen(2000, function () {
    console.log("Server is Running on Port.");
})