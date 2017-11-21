// define chart JSON
let myConfig = {
  type: 'bar', 
  title: {
    text: 'Multiple Datasets Using Promises resolve/reject',
    mediaRules: [
      {
        maxWidth: 500,
        visible:false
      }  
    ]
  },
  plot: {
    // barWidth: 25, // this will prevent users from noticing the barwidth changing
    animation:{}, // add animation to make the chart look alive
  },
  legend: {
   toggleAction: 'remove'
 },
  scaleY: {
    values: '0:300:100' // this will prevent users from noticing the scale repaint
  },
 noData: {
   text: 'Currently No Data In the Chart',
   fontSize: 22
 },
 series: []
};

// render the chart upon parse with no data
zingchart.render({ 
 id: 'myChart', 
 data: myConfig, 
 height: '100%', 
 width: '100%' 
});


/*
* append the plots using ZingChart API method addplot
* https://www.zingchart.com/docs/api/methods/#zingchart__exec__api__addplot
*/
let addPlotToChart = (response) => {
 zingchart.exec('myChart', 'addplot', {
   data: {
     values: JSON.parse(response.responseText)
   }
 });
};

// simple get request to return a promise
// fetch (look it up)
let GetRequest = (_url) => {
 return new Promise(function(resolve, reject) {
   const req = new XMLHttpRequest();
   req.open("GET", _url);
   req.onload = function() {
     if (req.status === 200) {
       resolve(req);
     } else {
       reject(new Error(req.statusText));
     }
   }
   req.onerror = function() {
     reject(new Error("Network error"));
   }
   req.send();
 });
}

             
// event handler for successful GET request
let successReq = (successValue) => {
 addPlotToChart(successValue);
}

// event handler for error in GET request
let errorReq = (errorValue) => {
 console.log('--- error occured getting plot ---', errorValue);   
}

// make the request for plots
const p1 = GetRequest('https://zingchart-rest-api.glitch.me/api/data/plot/v1/1500');
const p2 = GetRequest('https://zingchart-rest-api.glitch.me/api/data/plot/v2/3000');
const p3 = GetRequest('https://zingchart-rest-api.glitch.me/api/data/plot/v3/500');

// handle the returned promise
p1.then(successReq, errorReq);
p2.then(successReq, errorReq);
p3.then(successReq, errorReq);
