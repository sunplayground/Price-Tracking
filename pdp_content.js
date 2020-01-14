var url = '';
var last_price = '';
var sku_id = "";
var url_tab = []
try{
  createBasicVE()
}catch{
  let x = ""
}

async function check_internal_api(){

// =====================  check internal api ===================

var API_ENDPOINT = [];

    try{
      var local_api_response = await fetch('http://10.152.193.112/BatchUpload/api/status.php');
      var local_api_json = await local_api_response.json();
      // console.log(json);
      console.log('pass')
      if (local_api_json.status == 200) {
        API_ENDPOINT = ['https://10.152.193.112/JDC-Price-Tracking/api/fetch.php?', 'https://10.152.193.112/JDC-Price-Tracking/api/fetch_pv.php?'];

      }

    }catch(e){
  
    }

    return API_ENDPOINT;

    // =====================  end check internal api ===================
  }

url = window.location.href;
    // https://item.jd.co.th/3132972.html
    console.log(url)
    if(url.includes('//item.jd.co.th/')){
      console.log('special detected')
      url = url.replace('//item.jd.co.th/','//item.jd.co.th/_')
    }
    if(url.includes('/product/')){
      console.log('special detected2')
      url = url.replace('/product/','/product/_')
    }
    if(url.includes('//seller-i.jd.co.th/venderCompany/information')){
      add_cate_brand()
    }
    console.log(url)
    url = url.split("_");
    url = url[url.length - 1];
    url = url.split(".html");
    url = url[0];
    console.log(url)
    url_tab.push(url)

    var now_date = Date.now();
    var last_month_date = new Date(now_date);
    last_month_date = new Date(last_month_date.setMonth(last_month_date.getMonth() - 1));
    last_month_date = last_month_date.toISOString().replace(/T.+/g, "")

    
    var today_date = new Date(now_date);
    today_date = today_date.toISOString().replace(/T.+/g, "")

    default_range = last_month_date+' to '+today_date
    default_range = encodeURI(default_range)

    initurl = 'sku='+url+'&range='+default_range
    try{
    load_init(initurl)
    } catch{
      url = url
    }

      
      // =======================================


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
  
    
    
    
    var ctx = document.getElementById('canvas').getContext('2d');
    
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
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
        backgroundColor: 'rgba(0, 119, 204, 0)',
        borderWidth: 2.5,
        borderColor: '#007bff',
        pointBackgroundColor: "#007bff",
        pointRadius: 2,
        pointHoverRadius: 2.5
     },{
      type: 'line',
      yAxisID: 'A',
      steppedLine: 'before',
      label: 'Price Before Coupon (max)',
      data: data_price_bf_max,
      backgroundColor: 'rgba(0, 119, 204, 0)',
      borderColor: "#1200ff",
      borderWidth: 2.5,
      pointBackgroundColor: "#1200ff",
      pointRadius: 2,
      pointHoverRadius: 2.5
   },{
    type: 'line',
    yAxisID: 'A',
    steppedLine: 'before',
    label: 'Price After Coupon (min)',
    data: data_price_aft_min,
    backgroundColor: 'rgba(0, 119, 204, 0)',
    borderColor: "#ff4900",
    borderWidth: 2,
    pointBackgroundColor: "#ff4900",
    pointRadius: 2,
    pointHoverRadius: 2.5
  },{
    type: 'line',
    yAxisID: 'A',
    steppedLine: 'before',
    label: 'Price After Coupon (max)',
    data: data_price_aft_max,
    backgroundColor: 'rgba(0, 119, 204, 0)',
    borderColor: "#ff0000",
    borderWidth: 2,
    pointBackgroundColor: "#ff0000",
    pointRadius: 2,
    pointHoverRadius: 2.5
  },{
    type: 'bar',
    steppedLine: 'before',
    label: 'Unit',
    data: data_unit,
    yAxisID: 'B',
    backgroundColor : '#ffd5d3',
    borderWidth: 1.5,
    borderColor: '#ffd5d3',
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
        enabled: chartzoomoption,
  
        mode: 'xy'
    },
  
    zoom: {
        enabled: chartzoomoption,
        mode: 'xy',
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
          console.log(e.conversion)
        return e.conversion;
      });

      var pv_conversion_unit = jsonfile['view'].map(function(e) {
        console.log(e.pv_conversion)
        return e.pv_conversion;
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
        borderColor: "#7297ff",
        borderWidth: 1.5,
        pointBackgroundColor: "#7297ff",
        pointRadius: 2,
        pointHoverRadius: 2.5
     },{
      type: 'line',
      yAxisID: 'A',
      label: 'UV',
      data: uv,
      // backgroundColor: 'rgba(0, 119, 204, 0.3)'
      backgroundColor: 'rgba(0, 119, 204, 0)',
      borderColor: "#ff4900",
      borderWidth: 1.5,
      pointBackgroundColor: "#ff4900",
      pointRadius: 2,
      pointHoverRadius: 2.5
    },{
      type: 'line',
      yAxisID: 'A',
      label: 'lost pv',
      data: lost_pv,
      // backgroundColor: 'rgba(0, 119, 204, 0.3)'
      backgroundColor: 'rgba(0, 119, 204, 0)',
      borderColor: "#ff0000",
      borderWidth: 1.5,
      pointBackgroundColor: "#ff0000",
      pointRadius: 2,
      pointHoverRadius: 2.5
    },{
        type: 'bar',
        label: 'UV Conversion',
        data: conversion_unit,
        yAxisID: 'B',
        // backgroundColor: 'rgba(0, 119, 204, 0.3)'
        backgroundColor : '#ffdbaf',
        borderWidth: 1,
        borderColor: '#ffdbaf',
        pointRadius: 1,
        pointHoverRadius: 2
      },{
        type: 'bar',
        label: 'PV Conversion',
        data: pv_conversion_unit,
        yAxisID: 'B',
        // backgroundColor: 'rgba(0, 119, 204, 0.3)'
        backgroundColor : '#c0d7ff',
        borderWidth: 1,
        borderColor: '#c0d7ff',
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
          enabled: chartzoomoption,
    
          mode: 'x'
      },
    
      zoom: {
          enabled: chartzoomoption,
    
          mode: 'x',
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
    var conversion_unit_max = 0.0;
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
            
            pv_jsondata['view'][i]['pv_conversion'] = ((jsondata['unit'][ii]['unit'] / pv_jsondata['view'][i]['pv']) * 100).toFixed(2);
            pv_jsondata['view'][i]['conversion'] = ((jsondata['unit'][ii]['unit'] / pv_jsondata['view'][i]['uv']) * 100).toFixed(2);
            
            if (pv_jsondata['view'][i]['pv_conversion'] == Number.POSITIVE_INFINITY || pv_jsondata['view'][i]['pv_conversion'] == Number.NEGATIVE_INFINITY)
            {
                // ...
                pv_jsondata['view'][i]['pv_conversion'] = 0;
                
            }
  
            if (pv_jsondata['view'][i]['conversion'] == Number.POSITIVE_INFINITY || pv_jsondata['view'][i]['conversion'] == Number.NEGATIVE_INFINITY)
            {
                // ...
                pv_jsondata['view'][i]['conversion'] = 0;
                
            }
  
          
            if((pv_jsondata['view'][i]['conversion']  >= conversion_unit_max)) {
              pv_jsondata['view'][i]['conversion_unit_max'] = parseFloat(pv_jsondata['view'][i]['conversion']);
              conversion_unit_max =  parseFloat(pv_jsondata['view'][i]['conversion']);
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
  function createBasicVE(){
      
        var clear_bar = document.getElementById('p-preSale-process')
        var VE_Zoom_div = document.createElement("div"); 
        VE_Zoom_div.id = 'zoom_pane';
        header_option_VE = document.createElement("div")
        header_option_VE.id = "header_option"
        header_option_VE.appendChild(VE_Zoom_div)
        clear_bar.before(header_option_VE)



        zoom_titie = document.createElement("span");
        zoom_titie.className = "zoom_label"
        zoom_titie.innerHTML = "Zoom Enable: "
        VE_Zoom_div.appendChild(zoom_titie);

        zoom_switch = document.createElement("input")
        zoom_switch.type = "checkbox"
        zoom_switch.checked = false
        zoom_switch.id = "switch"
        VE_Zoom_div.appendChild(zoom_switch)

        zoom_label = document.createElement("label")
        zoom_label.className = "toggle_switch"
        zoom_label.setAttribute("for", "switch");
        VE_Zoom_div.appendChild(zoom_label)


        var clear_bar = document.getElementById('p-preSale-process')
        var VElement_Div_Container = document.createElement("div"); 
        VElement_Div_Container.id = 'VE_Div';
        clear_bar.before(VElement_Div_Container); 
        chart1_VE_div = document.createElement("div");
        chart1_VE_div.id = "chart";
        chart1_VE_div.className = "chart"
        VElement_Div_Container.appendChild(chart1_VE_div);
        canvas1_VE = document.createElement("canvas")
        canvas1_VE.id = "canvas"
        chart1_VE_div.appendChild(canvas1_VE)

        chart2_VE_div = document.createElement("div");
        chart2_VE_div.id = "chart-pv";
        chart2_VE_div.className = "chart-pv"
        VElement_Div_Container.appendChild(chart2_VE_div);
        canvas2_VE = document.createElement("canvas")
        canvas2_VE.id = "canvas2"
        chart2_VE_div.appendChild(canvas2_VE)


        loading_VE_parent = document.createElement("div");
        loading_VE_parent.className = "lds-ellipsis";
        chart1_VE_div.before(loading_VE_parent);

        text_overlay_VE = document.createElement("span")
        text_overlay_VE.className = "text_overlay"
        loading_VE_parent.after(text_overlay_VE)

        loading_VE_child = document.createElement("div");
        loading_VE_parent.appendChild(loading_VE_child);
        loading_VE_child2 = document.createElement("div");
        loading_VE_parent.appendChild(loading_VE_child2);
        loading_VE_child3 = document.createElement("div");
        loading_VE_parent.appendChild(loading_VE_child3);
        loading_VE_child4 = document.createElement("div");
        loading_VE_parent.appendChild(loading_VE_child4);

        data_content_VE = document.createElement("div")
        data_content_VE.className = "data-content"
        title_span_VE = document.createElement("span")
        title_span_VE.innerHTML = "Range: "
        data_content_VE.appendChild(title_span_VE)
        div_range_container = document.createElement("div")
        div_range_container.setAttribute("style","display:inline-flex;")
        div_btn_group = document.createElement("div")
        div_btn_group.className = "button-group round toggle"
        div_range_container.appendChild(div_btn_group)

        input_range_last_month = document.createElement("input")
        input_range_last_month.type = "radio"
        input_range_last_month.id = "range_last_month"
        input_range_last_month.setAttribute("name","r-group")
        input_range_last_month.setAttribute("checked","checked")
        input_range_last_month.checked = true
        div_btn_group.appendChild(input_range_last_month)
        label_range_last_month = document.createElement("label")
        label_range_last_month.className = "button"
        label_range_last_month.setAttribute("for","range_last_month")
        label_range_last_month.innerHTML = " Last Month "
        div_btn_group.appendChild(label_range_last_month)


        input_range_all = document.createElement("input")
        input_range_all.type = "radio"
        input_range_all.id = "range_all"
        input_range_all.setAttribute("name","r-group")
        div_btn_group.appendChild(input_range_all)
        label_range_all = document.createElement("label")
        label_range_all.className = "button"
        label_range_all.setAttribute("for","range_all")
        label_range_all.innerHTML = " All "
        div_btn_group.appendChild(label_range_all)
        input_range_Custom = document.createElement("input")
        input_range_Custom.type = "radio"
        input_range_Custom.id = "range_Custom"
        input_range_Custom.setAttribute("name","r-group")
        div_btn_group.appendChild(input_range_Custom)
        label_range_Custom = document.createElement("label")
        label_range_Custom.className = "button"
        label_range_Custom.setAttribute("for","range_Custom")
        label_range_Custom.innerHTML = "Custom range:"
        label_range_Custom.id = "custom_btn"
        div_btn_group.appendChild(label_range_Custom)

        input_date_range = document.createElement("input")
        input_date_range.setAttribute("name","date_range")
        input_date_range.type = "text"
        input_date_range.id = "date_range"
        input_date_range.setAttribute("name","r-group")
        input_date_range.setAttribute("disabled",true)
        div_range_container.appendChild(input_date_range)





        data_content_VE.appendChild(div_range_container)
        VE_Zoom_div.before(data_content_VE)


        

}


  
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
    
    // console.log('loading endpoint').then(() => API_ENDPOINTz = check_internal_api());
    API_ENDPOINT = ['https://10.152.193.112/JDC-Price-Tracking/api/fetch.php?', 'https://10.152.193.112/JDC-Price-Tracking/api/fetch_pv.php?'];

    var data_ready_state = [];
  
  for (var i = 0; i < API_ENDPOINT.length; i++) {
  
      console.log(dataurl)
      console.log(i)
      var url = API_ENDPOINT[i] + dataurl;
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
  
  
                
                console.log(data_ready_state)
                
              }
              
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
  
  
  
  console.log(jsondata);
  console.log(pv_jsondata);
  
  
  
  
  
  }
  
  
  function load_init(url){
  
  console.log(url)
  loadchart(url);
  
  }
  
  
    var config_datepicker = {
      showShortcuts: false,
      showTopbar: false,
      customTopBar: 'Please select date range',
      endDate: moment().endOf('day').format('YYYY-MM-DD'),
      container: '.chart',
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
        document.getElementById("canvas").style.display = 'none';
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
      
  
      loadchart('sku='+url_tab[0]);
    });
  
  });
  
  
  
  
  document.getElementById('switch').addEventListener("click", function() { 
    document.getElementById('range_last_month').checked = true;
    document.getElementById('date_range').value = "";
    document.getElementById('date_range').disabled = true;
    loadchart(initurl);
    
  
  
  });

  range_all = document.getElementById("range_all")
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
    
    
    loadchart('sku='+url_tab[0]);
  });

  range_last_month = document.getElementById("range_last_month")
  range_last_month.addEventListener('click', function() {
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
    
    
    loadchart(initurl);
  });
