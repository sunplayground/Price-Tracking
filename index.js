// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


///NO LONGER IN USE -- THIS FILE IS NOT USED

var url = '';
var last_price = '';
var sku_id = "";
var url_tab = []
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  url = tabs[0].url;
  // https://item.jd.co.th/3132972.html
  if(url.includes('//item.jd.co.th/')){
    console.log('special detected')
    url = url.replace('//item.jd.co.th/','//item.jd.co.th/_')
  }

  if(url.includes('//seller-i.jd.co.th/venderCompany/information')){
    console.log("cccccccccccccccccc")
    alert("tadaaa")
    add_cate_brand()
  }

  console.log(url)
  url = url.split("_");
  url = url[url.length - 1];
  url = url.split(".html");
  url = url[0];
  console.log(url)
  url_tab.push(url)
  load_init(url)
  if(url.includes('seller-i.jd.co.th/venderCompany/information')){
    console.log("cccccccccccccccccc")
    alert("tadaaa")
    add_cate_brand()
  }
  // var G2 = document.getElementById("canvas2").getContext("2d");
  // new Chart(G2).Bar(barChartData2, {
  //     responsive: true
  // })

  
});



//============================ADD CATE BRAND=========================== 

function add_cate_brand(){
//updated Oct15,2019 //18.56

var addbrandButton = document.createElement('a');
    addbrandButton.id = 'prdaddbrand';
    addbrandButton.style.cssFloat = "right";
    addbrandButton.className = 'btn-c4 btn-h2 mr10'
    addbrandButton.innerText = 'ADD BRANDS'
    MainBody = document.getElementsByClassName('sub-tit')[0];
    MainBody.appendChild(addbrandButton);

var addcateButton = document.createElement('a');
    addcateButton.id = 'prdaddcate';
    addcateButton.style.cssFloat = "right";
    addcateButton.className = 'btn-c4 btn-h2 mr10'
    addcateButton.innerText = 'ADD THIRD CATEORIES'
    MainBody = document.getElementsByClassName('sub-tit')[0];
    MainBody.appendChild(addcateButton);

}

function addbrand(vendorid,brandid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "http://seller-i.jd.co.th/venderBrand/addVenderBrand", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("venderId="+vendorid+"&erpBrandId="+brandid);
}
  
function prddoaddbrand(){
    var textArea = prompt("Please enter Brand IDs", "");
    
    var vendorid = prompt("Please enter Vendor ID", "");
    
    var arrayOfLines = textArea.split(" ");
    
    for (var i = arrayOfLines.length - 1; i >= 0; i--) {
      // console.log(arrayOfLines[i])
      addbrand(vendorid,arrayOfLines[i])
    }
    alert(arrayOfLines.length + ' brand(s) added');
}

function addcate(vendorid,catedid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "http://seller-i.jd.co.th/venderCategory/doAddCategory", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("rateType=1&venderId="+vendorid+"&category3IdStr="+catedid);
}

function prddoaddcate(){
var textArea = prompt("Please enter Third Category IDs", "");

var vendorid = prompt("Please enter Vendor ID", "");

var thirdcateid = textArea.replace(/\s/g, ",");

addcate(vendorid,thirdcateid)
alert('Categories added');
}

document.getElementById("prdaddbrand").addEventListener("click", prddoaddbrand);
document.getElementById("prdaddcate").addEventListener("click", prddoaddcate);




//============================CHART JS=========================== 

function loadchartjs(jsondata,max_unit,chartzoomoption){

  var jsonfile = jsondata;

  console.log(jsonfile)
  
  
  
  var max_unit = Number(max_unit) + 1;
  console.log(max_unit);

  var labels = jsonfile['unit'].map(function(e) {
  return e.date;
  });
  var data_unit = jsonfile['unit'].map(function(e) {
    return e.unit;
  });

  var data_price_bf_min = jsonfile['price_before_coupon'].map(function(e) {
  return e.price['min'];
  });

  var data_price_bf_max = jsonfile['price_before_coupon'].map(function(e) {
  return e.price['max'];
  });

  var data_price_aft_min = jsonfile['price_after_coupon'].map(function(e) {
  return e.price['min'];
  });
  
  var data_price_aft_max = jsonfile['price_after_coupon'].map(function(e) {
  return e.price['max'];
  });

  // var data3 = jsonfile['price_after_coupon'].map(function(e) {
  //   return e.price;
  // });
  
  
  
  var ctx = document.getElementById('canvas').getContext('2d');
  
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, 'rgba(250,174,50,1)');   
    // gradient.addColorStop(1, 'rgba(250,174,50,0)');
    gradient.addColorStop(0, 'rgba(255,50,50,0.9)');   
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
  
  var config = {
    scaleStartValue : 0,
  type: 'bar',
  data: {
     labels: labels,
     datasets: [{
      type: 'line',
      yAxisID: 'A',
      steppedLine: 'before',
      label: 'Price Before Coupon (min)',
      data: data_price_bf_min,
      // backgroundColor: 'rgba(0, 119, 204, 0.3)'
      backgroundColor: 'rgba(0, 119, 204, 0)',
      borderWidth: 2.5,
      borderColor: '#007bff',
      pointRadius: 1,
      pointHoverRadius: 2
   },{
    type: 'line',
    yAxisID: 'A',
    steppedLine: 'before',
    label: 'Price Before Coupon (max)',
    data: data_price_bf_max,
    // backgroundColor: 'rgba(0, 119, 204, 0.3)'
    backgroundColor: 'rgba(0, 119, 204, 0)',
    borderColor: "#1200ff",
    borderWidth: 2.5,
    pointRadius: 1,
    pointHoverRadius: 2
 },{
  type: 'line',
  yAxisID: 'A',
  steppedLine: 'before',
  label: 'Price After Coupon (min)',
  data: data_price_aft_min,
  // backgroundColor: 'rgba(0, 119, 204, 0.3)'
  backgroundColor: 'rgba(0, 119, 204, 0)',
  borderColor: "#ff4900",
  borderWidth: 2,
  pointRadius: 1,
  pointHoverRadius: 2
},{
  type: 'line',
  yAxisID: 'A',
  steppedLine: 'before',
  label: 'Price After Coupon (max)',
  data: data_price_aft_max,
  // backgroundColor: 'rgba(0, 119, 204, 0.3)'
  backgroundColor: 'rgba(0, 119, 204, 0)',
  borderColor: "#ff0000",
  borderWidth: 2,
  pointRadius: 1,
  pointHoverRadius: 2
},{
  type: 'bar',
  steppedLine: 'before',
  label: 'Unit',
  data: data_unit,
  yAxisID: 'B',
  // backgroundColor: 'rgba(0, 119, 204, 0.3)'
  backgroundColor : '#c7c7c7',
  borderWidth: 1.5,
  borderColor: '#c7c7c7',
  pointRadius: 1,
  pointHoverRadius: 2
}]
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: true,
        autoSkipPadding: 50,
        // minRotation: 45,
        maxRotation: 0 // angle in degrees
      }
    }]
  },
  options: {
    legend: {
        display: true,
        labels: {
            fontColor: '#000000',
            fontSize: 10
        }
    },
    scales: {
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
        min: 0,
        ticks: {
          autoSkip: true,
          beginAtZero: true
      }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        min: 0,
        ticks: {
          autoSkip: true,
          max: max_unit,
          beginAtZero: true,
          precision: 0
          // stepSize: 1,
          
      },
      scaleLabel: {
        display: true,
      labelString: 'Unit'
      }
      }]
    },
    pan: {
      // Boolean to enable panning
      enabled: chartzoomoption,

      // Panning directions. Remove the appropriate direction to disable 
      // Eg. 'y' would only allow panning in the y direction
      mode: 'y'
  },

  // Container for zoom options
  zoom: {
      // Boolean to enable zooming
      enabled: chartzoomoption,
      mode: 'y',
  }

},

	
  };
  
  var chart = new Chart(ctx, config);
  }



  // ==================================PV CHART ===================================
  var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
var barChartData2 = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,0.8)",
            highlightFill : "rgba(151,187,205,0.75)",
            highlightStroke : "rgba(151,187,205,1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]

}
  function loadchartjs_pv(jsondata,max_unit,chartzoomoption){

    var jsonfile = jsondata;
  
    // console.log(jsonfile)
    document.getElementById("canvas2").className = ""    
    
    
    var max_unit = Number(max_unit) + (Number(max_unit) / 10);
    console.log(max_unit);
  
    var labels = jsonfile['view'].map(function(e) {
    return e.date;
    });
    var conversion_unit = jsonfile['view'].map(function(e) {
      return e.conversion;
    });
  
    var pv = jsonfile['view'].map(function(e) {
    return e.pv;
    });
  
    var uv = jsonfile['view'].map(function(e) {
    return e.uv;
    });
  
    var lost_pv = jsonfile['view'].map(function(e) {
    return e.lost_pv;
    });
    
    // var data_price_aft_max = jsonfile['price_after_coupon'].map(function(e) {
    // return e.price['max'];
    // });
  
    // var data3 = jsonfile['price_after_coupon'].map(function(e) {
    //   return e.price;
    // });
    
    
    
    var ctx = document.getElementById('canvas2').getContext('2d');
    
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      // gradient.addColorStop(0, 'rgba(250,174,50,1)');   
      // gradient.addColorStop(1, 'rgba(250,174,50,0)');
      gradient.addColorStop(0, 'rgba(255,50,50,0.9)');   
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    var config = {
      scaleStartValue : 0,
    type: 'bar',
    data: {
       labels: labels,
       datasets: [{
      type: 'line',
      yAxisID: 'A',
      label: 'PV',
      data: pv,
      // backgroundColor: 'rgba(0, 119, 204, 0.3)'
      backgroundColor: 'rgba(0, 119, 204, 0)',
      borderColor: "#1200ff",
      borderWidth: 2.5,
      pointRadius: 1,
      pointHoverRadius: 2
   },{
    type: 'line',
    yAxisID: 'A',
    label: 'UV',
    data: uv,
    // backgroundColor: 'rgba(0, 119, 204, 0.3)'
    backgroundColor: 'rgba(0, 119, 204, 0)',
    borderColor: "#ff4900",
    borderWidth: 2,
    pointRadius: 1,
    pointHoverRadius: 2
  },{
    type: 'line',
    yAxisID: 'A',
    label: 'lost pv',
    data: lost_pv,
    // backgroundColor: 'rgba(0, 119, 204, 0.3)'
    backgroundColor: 'rgba(0, 119, 204, 0)',
    borderColor: "#ff0000",
    borderWidth: 2,
    pointRadius: 1,
    pointHoverRadius: 2
  },{
    type: 'bar',
    label: 'Conversion',
    data: conversion_unit,
    yAxisID: 'B',
    // backgroundColor: 'rgba(0, 119, 204, 0.3)'
    backgroundColor : '#c7c7c7',
    borderWidth: 1.5,
    borderColor: '#c7c7c7',
    pointRadius: 1,
    pointHoverRadius: 2
  }]
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          autoSkipPadding: 50,
          // minRotation: 45,
          maxRotation: 0 // angle in degrees
        }
      }]
    },
    options: {
      // scaleLabel: {display: true},
      legend: {
          display: true,
          labels: {
              fontColor: '#000000',
              fontSize: 10
          }
      },
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
          min: 0,
          ticks: {
            autoSkip: true,
            beginAtZero: true
        },
        
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          min: 0,
          ticks: {
            autoSkip: true,
            max: max_unit,
            beginAtZero: true,
            precision: 0
            // stepSize: 1,
            
        },
        scaleLabel: {
          display: true,
        labelString: 'Conversion (%)'
        }
        }]
      },
      pan: {
        // Boolean to enable panning
        enabled: chartzoomoption,
  
        // Panning directions. Remove the appropriate direction to disable 
        // Eg. 'y' would only allow panning in the y direction
        mode: 'y'
    },
  
    // Container for zoom options
    zoom: {
        // Boolean to enable zooming
        enabled: chartzoomoption,
  
        // Zooming directions. Remove the appropriate direction to disable 
        // Eg. 'y' would only allow zooming in the y direction
        mode: 'y',
    }
  
  },
  
    
    };
    
    var chart2 = new Chart(ctx, config);
    }
  



    function call_chart1(jsondata) {
      // console.log(jsondata)
      // document.getElementById("url").innerHTML = url;
      try {
        document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
      } catch (error) {
        
      }
      // document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
      
      // console.log(jsondata)
      jsondata = JSON.parse(jsondata)
      console.log(jsondata)
      chartzoomoption = document.getElementById('switch').checked
      loadchartjs(jsondata,jsondata['sum']['max_unit'],chartzoomoption);
      // loadchartjs_pv(jsondata,jsondata['sum']['max_unit']);
    
      // last_price = jsondata['unit'].jsonarray[jsondata['unit'].jsonarray.length-1].unit
      
      json_array = jsondata['unit'];
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var i=json_array.length-1; i>=0; i--) {
          tmp = json_array[i].unit;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
      }
      console.log(highest, lowest);
      // document.getElementById("lastprice").innerHTML = last_price;
      // document.getElementById("highprice").innerHTML = highest;
      // document.getElementById("lowprice").innerHTML = lowest;
    }
    
     
function call_chart2(jsondata,pv_jsondata){
  var conversion_unit_max = 0;
    // document.getElementById("url").innerHTML = url;
    try {
      document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
    } catch (error) {
      
    }
    // document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
    // var pv_jsondata = xhr.response;
    pv_jsondata = JSON.parse(pv_jsondata);
    jsondata = JSON.parse(jsondata);
    console.log(pv_jsondata)

    pv_jsondata['view']['date']
    for (i = 0; i < pv_jsondata['view'].length; ++i) {
      console.log(pv_jsondata['view'][i]['date']);
      for (ii = 0; ii < jsondata['unit'].length; ++ii) {
        if (jsondata['unit'][ii]['date'] == pv_jsondata['view'][i]['date']){
          console.log('found match!')
          console.log('unit: '+jsondata['unit'][ii]['unit']+' ; uv: ' + pv_jsondata['view'][i]['uv'])
          console.log()
          
          pv_jsondata['view'][i]['conversion'] = (jsondata['unit'][ii]['unit'] / pv_jsondata['view'][i]['uv']) * 100;
          

          if (pv_jsondata['view'][i]['conversion'] == Number.POSITIVE_INFINITY || pv_jsondata['view'][i]['conversion'] == Number.NEGATIVE_INFINITY)
          {
              // ...
              pv_jsondata['view'][i]['conversion'] = 0;
              console.log('xxxxxxxxxxxxx')
              
          }

          console.log(pv_jsondata['view'][i]['conversion'])

          console.log(pv_jsondata['view'][i]['conversion_unit_max'])
          if((pv_jsondata['view'][i]['conversion']  >= conversion_unit_max)) {
            pv_jsondata['view'][i]['conversion_unit_max'] = pv_jsondata['view'][i]['conversion'];
            conversion_unit_max =  pv_jsondata['view'][i]['conversion'];
            console.log('found new max: '+conversion_unit_max)
          }



        }
      }
      // var conversion_unit_max = pv_jsondata['view'][i]['conversion_unit_max']
      // console.log(pv_jsondata['view'][i]['conversion_unit_max'])
      
    }

    
    // console.log(pv_jsondata['view'][i]['conversion_unit_max'])
    console.log(conversion_unit_max);
    chartzoomoption = document.getElementById('switch').checked
    loadchartjs_pv(pv_jsondata,conversion_unit_max,chartzoomoption);

    // last_price = jsondata['unit'].jsonarray[jsondata['unit'].jsonarray.length-1].unit
    
    // json_array = jsondata['unit'];
    
}


//============================REQUEST DATA FROM API=========================== 


function loadchart(dataurl){
  var jsondata;
  var pv_jsondata;
  var status = 0;
  try{
    document.getElementsByClassName("lds-ellipsis")[0].style.display="block";

    document.getElementById("canvas").remove();
    var canv = document.createElement('canvas');
    canv.id = 'canvas';
    chart_div = document.getElementsByClassName('chart')[0];
    chart_div.appendChild(canv);
    document.getElementsByClassName('text_overlay')[0].innerHTML = "";

    document.getElementById("canvas2").remove();
    var canv2 = document.createElement('canvas');
    canv2.id = 'canvas2';
    chart_div2 = document.getElementsByClassName('chart-pv')[0];
    chart_div2.appendChild(canv2);
  }
  catch(e){

  }
  
  var API_ENDPOINTz = ['https://82eed072.ngrok.io/JDC-Price-Tracking/api/fetch.php?', 'https://82eed072.ngrok.io/JDC-Price-Tracking/api/fetch_pv.php?'];

  var data_ready_state = [];

for (var i = 0; i < API_ENDPOINTz.length; i++) {

    console.log(dataurl)
    console.log(i)
    var url = API_ENDPOINTz[i] + dataurl;
    console.log(url)

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            // var data = JSON.parse(request.responseText);
            console.log('round '+i)
            data_ready_state.push(request.responseText);

            

            if (data_ready_state.length == 2){

              // 1 should contain 4 Elements
            // 2 should contain 1 element
            console.log('zzzzzzzzzz')
            // console.log(data_ready_state[0])
              

              var count_json_obj1 = JSON.parse(data_ready_state[0])
              var count_json_obj2 = JSON.parse(data_ready_state[1])
              // console.log(count_json_obj1.length)
              if(count_json_obj1.hasOwnProperty('view')){
                console.log('swap')
                var temp = data_ready_state[0];
                data_ready_state[0] = data_ready_state[1];
                data_ready_state[1] = temp;
                call_chart1(data_ready_state[0]);
              try{
              call_chart2(data_ready_state[0],data_ready_state[1]);
              } catch(e){
            }

              }
              
              if(count_json_obj2.hasOwnProperty('unit')){
                console.log('swap2')
                var temp = data_ready_state[0];
                data_ready_state[0] = data_ready_state[1];
                data_ready_state[1] = temp;
                call_chart1(data_ready_state[0]);
              try{
              call_chart2(data_ready_state[0],data_ready_state[1]);
              } catch(e){
            }

              } else {
                call_chart1(data_ready_state[0]);
              try{
              call_chart2(data_ready_state[0],data_ready_state[1]);
              } catch(e){
            }
              }



              // console.log(data_ready_state[0])
              console.log(data_ready_state)
              
            }
            // if (i == 0) {
            //   jsondata = request.responseText;
            //   console.log('loaded 1')
            //   console.log(jsondata)
            //   call_chart1(jsondata)
            // }
            // if (i == 1) {
            //   console.log('loaded 2')
            //  pv_jsondata = request.responseText;
            //  call_chart2(jsondata,pv_jsondata)
            // }



        }
        if(request.status != 200){
          
          
              try{
              document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
              } catch(e){
              }
              document.getElementsByClassName('text_overlay')[0].innerHTML = "<br>No data found"
              



        }
    }
    request.send();
}



// API_ENDPOINT = 'https://82eed072.ngrok.io/JDC-Price-Tracking/api/fetch_pv.php?' + dataurl;



// for (let i = 0; i < API_ENDPOINT.length; i++) {
//   console.log(i)
//   var request = new XMLHttpRequest();
//   var url = API_ENDPOINT[i] + dataurl;;

//     request.open("GET", url);
//     request.onreadystatechange = function() {
//         if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
//           status = 200;
//           console.log(i)
//           if (i == 0) {
//             jsondata = request.responseText;
//             console.log('loaded 1')
//             console.log(jsondata)
//             call_chart1(jsondata)
//           }
//           if (i == 1) {
//             console.log('loaded 2')
//            pv_jsondata = request.responseText;
//            call_chart2(jsondata,pv_jsondata)
//           }
//             // var data = JSON.parse(request.responseText);
//             // console.log('-->' + i + ' id: ' + data._id);
//             // loop(i + 1, length);
//         }
    
//       }
    
//       request.send(); 
// }

// (function loop(i, length) {
//     if (i>= length) {
//         return;
//     }
    
// })(0, API_ENDPOINT.length);



console.log(jsondata);
console.log(pv_jsondata);






// if (status === 200) {
   

//   } 
//   if(status == 204) {
//     try{
//     document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
//     } catch(e){
//     }
//     document.getElementsByClassName('text_overlay')[0].innerHTML = "<br>No data found"
    
//   } else {
//     document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
//     document.getElementsByClassName('text_overlay')[0].innerHTML = "<br>No data found"
//     console.log('cannot load data')
//   }
  



  
  // if (status === 200) {
  //   console.log('data loaded')
  //   document.getElementById("url").innerHTML = url;
  //   try {
  //     document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
  //   } catch (error) {
      
  //   }
  //   // document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
  //   var pv_jsondata = xhr.response;
    
  //   console.log(pv_jsondata)

    // pv_jsondata['view']['date']
    // for (i = 0; i < pv_jsondata['view'].length; ++i) {
    //   console.log(pv_jsondata['view'][i]['date']);
    //   for (ii = 0; ii < jsondata['unit'].length; ++ii) {
    //     if (jsondata['unit'][ii]['date'] == pv_jsondata['view'][i]['date']){
    //       pv_jsondata['view'][i]['conversion'] = (jsondata['unit'][ii]['unit'] / pv_jsondata['view'][i]['pv']);
    //     }
    //   }

    // }

    

    // loadchartjs_pv(pv_jsondata,100);

    // last_price = jsondata['unit'].jsonarray[jsondata['unit'].jsonarray.length-1].unit
    
    // json_array = jsondata['unit'];
    

  // } 
  // if( status == 204) {
  //   try{
  //   document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
  //   } catch(e){
  //   }
  //   document.getElementsByClassName('text_overlay')[0].innerHTML = "<br>No data found"
    
  // } else {
  //   document.getElementsByClassName("lds-ellipsis")[0].style.display="none";
  //   document.getElementsByClassName('text_overlay')[0].innerHTML = "<br>No data found"
  //   console.log('cannot load data')
  // }
  

}


function load_init(url){

console.log(url)
loadchart('sku='+url);

}


  var config_datepicker = {
    showShortcuts: false,
    showTopbar: false,
    customTopBar: 'Please select date range',
    endDate: moment().endOf('day').format('YYYY-MM-DD'),
    container: '.preload_div',
    inline:true,
    monthSelect: true,
    yearSelect: true,
    customOpenAnimation: function(cb)
	{
		$(this).fadeIn(200, cb);
	},
	customCloseAnimation: function(cb)
	{
		$(this).fadeOut(200, cb);
	}
    
	// container: '#date-range12-container',
  }

  $('#date_range').dateRangePicker(config_datepicker).bind('datepicker-open',function()
  {
    /* This event will be triggered before date range picker open animation */
    try{
    document.getElementsByClassName('chart')[0].style.display = 'none';
    document.getElementById("canvas2").className = "blur";
    } catch (e) {
    }
    console.log('before open');
  }).bind('datepicker-closed',function(event,obj)
  {
    /* This event will be triggered after date range picker close animation */
    document.getElementsByClassName("lds-ellipsis")[0].style.display="block";
    document.getElementsByClassName('text_overlay')[0].innerHTML = "";
    date_val = document.getElementById('date_range').value;
    console.log(date_val);
    date_val = encodeURI(date_val);
    document.getElementById("canvas").remove();
    var canv = document.createElement('canvas');
    canv.id = 'canvas';
    chart_div = document.getElementsByClassName('chart')[0];
    chart_div.appendChild(canv);

    document.getElementById("canvas2").remove();
    var canv2 = document.createElement('canvas');
    canv2.id = 'canvas2';
    chart_div2 = document.getElementsByClassName('chart-pv')[0];
    chart_div2.appendChild(canv2);

    loadchart('range='+date_val+'&sku='+url);
    document.getElementsByClassName('chart')[0].style.display = 'block';
  });

$('#range_Custom').click(function(evt)
{
  document.getElementById('date_range').disabled = false;
	evt.stopPropagation();
	$('#date_range').data('dateRangePicker').open();
});





document.addEventListener('DOMContentLoaded', function() {
  var range_all = document.getElementById('range_all');
  var range_OneMonth = document.getElementById('range_OneMonth');
  // onClick's logic below:
  range_all.addEventListener('click', function() {
    document.getElementById('date_range').disabled = true;

    document.getElementsByClassName("lds-ellipsis")[0].style.display="block";

    document.getElementById("canvas").remove();
    var canv = document.createElement('canvas');
    canv.id = 'canvas';
    chart_div = document.getElementsByClassName('chart')[0];
    chart_div.appendChild(canv);
    document.getElementsByClassName('text_overlay')[0].innerHTML = "";

    document.getElementById("canvas2").remove();
    var canv2 = document.createElement('canvas');
    canv2.id = 'canvas2';
    chart_div2 = document.getElementsByClassName('chart-pv')[0];
    chart_div2.appendChild(canv2);
    

// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//   url = tabs[0].url;
//   // https://item.jd.co.th/3132972.html
//   if(url.includes('//item.jd.co.th/')){
//     console.log('special detected')
//     url = url.replace('//item.jd.co.th/','//item.jd.co.th/_')
//   }
//   console.log(url)
//   url = url.split("_");
//   url = url[url.length - 1];
//   url = url.split(".html");
//   url = url[0];
//   console.log(url)

//   // var G2 = document.getElementById("canvas2").getContext("2d");
//   // new Chart(G2).Bar(barChartData2, {
//   //     responsive: true
//   // })
  
// });
// console.log(url_tab[0])
    loadchart('sku='+url_tab[0]);
  });

  // range_Custom.addEventListener('click', function() {
   
  // });
});


// var ctx = document.getElementById('canvas').getContext('2d');
// 				var config = barChartData2;
//         new Chart(ctx, config);

//         var ctx2 = document.getElementById('canvas2').getContext('2d');
// 				var config = barChartData2;
// 				new Chart(ctx2, config);



document.getElementById('switch').addEventListener("click", function() { 
  // document.getElementById('range_all').checked = true;
  // document.getElementById('date_range').value = "";
  // document.getElementById('date_range').disabled = true;
  // loadchart('sku='+url_tab[0]);


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: "sdsdfsdfsdf"}, function(response) {
        console.log('success');
    });
  });



});

// loadchart('http://localhost/mockupchartjsdata2.php')