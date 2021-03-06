// async function process_RS(stream) {
//     /* collect data */
//     const buffers = [];
//     const reader = stream.getReader();
//     for(;;) {
//       const res = await reader.read();
//       if(res.value) buffers.push(res.value);
//       if(res.done) break;
//     }
  
//     /* concat */
//     const out = new Uint8Array(buffers.reduce((acc, v) => acc + v.length, 0));
  
//     let off = 0;
//     for(const u8 of arr) {
//       out.set(u8, off);
//       off += u8.length;
//     }
  
//     return out;
//   }

// async function getExcelFile() {
//     const res = await fetch('/data/Sale Report_F_B.xlsx');
//     // const binData = await (await (await res.body.getReader()).read()).value
//     // console.log(binData)

//     const data = await process_RS(res.body);
//     let workbook = XLSX.read(data)
//     const firstSheetName = workbook.SheetNames[0];
//     console.log(firstSheetName)
// }

// getExcelFile()






const fetchData = async () => {
    const response = await fetch('/data/Sale Report_F_B2.xlsx');
    return response;
  };

const fetchSaleJson = async () => {
    const response = await fetch('/data/sales.json');
    return response.json();
  };
const fetchProfitJson = async () => {
    const response = await fetch('/data/profitLoss.json');
    return response.json();
  };
  
  const parseExcel = async () => {
    // const stream = await fetchData();
    // const arrayBuffer = await stream.arrayBuffer();
    // const data = new Uint8Array(arrayBuffer);
    // const arr = new Array();
    // for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    // const bstr = arr.join('');
    // const workbook = XLSX.read(bstr, { type: 'binary' });
    // const sheet = workbook.Sheets;
    // console.log(sheet)
    // // const sheetName = Object.keys(sheet)[0];
    // // const json = XLSX.utils.sheet_to_json(workbook.Sheets['Sales Data']);
    // const json = XLSX.utils.sheet_to_json(workbook.Sheets['Profit & Loss']);
    const sales = await fetchSaleJson();
    const profitLoss = await fetchProfitJson()

    console.log({sales, profitLoss});
    return {sales, profitLoss}
  };
  
  parseExcel();

const renderSalesSemiCircle = () => {
  const chartOptions = {
    chart: {
      type: "solidgauge",
      color: "#cc115e"
    },
    title: 'Sales',
    credits: {
      enabled: false
    },
    pane: {
      center: ["50%", "85%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.background2) || "#EEE",
        innerRadius: "70%",
        outerRadius: "100%",
        shape: "solid"
      }
    },
    tooltip: {
      enabled: true
    },
    // the value axis
    yAxis: {
      innerRadius: '70%',
      lineWidth: 0,
      minorTickInterval: 1,
      tickPositions: [0, 2],
      tickAmount: 1,
      min: 0,
      max: 2.0,
      title: {
        y: -110,
        text: "<h2 style='font-size: 1.5rem; font-weight: bold'>Sales</h2>"
      },
      labels: {
        y: 16
      },
      stops: [
        [0, '#8b083e']
      ]
    },
    plotOptions: {
      solidgauge: {
        innerRadius: '70%',
        dataLabels: {
          y: 5,
          borderWidth: 0,
        },
        marker: {
          enabled: true,
          symbol: "line"
        }
      },
      gauge: {
        innerRadius: '70%',
      }
    },
    series: [
      {
        name: "Sales",
        data: [1.54],
        dataLabels: 1,
        color: "green",
        fill: "#cc115e",
        backgroundColor: "#cc115e"
      },
      {
        name: "Target",
        isRectanglePoint: true,
        type: "gauge",
        data: [1.20],
        dial: {
          backgroundColor: Highcharts.getOptions().colors[1],
          rearLength: "-125%",
        },
        dataLabels: {
          enabled: false
        },
        pivot: {
          radius: 0
        }
      }
    ]
  };
  Highcharts.chart('sales-semicircle', chartOptions)
}
const renderProfitsSemiCircle = () => {
  const chartOptions = {
    chart: {
      type: "solidgauge",
      color: "#cc115e"
    },
    title: 'Profits',
    credits: {
      enabled: false
    },
    pane: {
      center: ["50%", "85%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.background2) || "#EEE",
        innerRadius: "70%",
        outerRadius: "100%",
        shape: "solid"
      }
    },
    tooltip: {
      enabled: true
    },
    // the value axis
    yAxis: {
      innerRadius: '70%',
      lineWidth: 0,
      minorTickInterval: 1,
      tickPositions: [0, 4],
      tickAmount: 1,
      min: 0,
      max: 4.0,
      title: {
        y: -110,
        text: "<h2 style='font-size: 1.5rem; font-weight: bold'>Profits</h2>"
      },
      labels: {
        y: 16
      },
      stops: [
        [0, '#cc115e']
      ]
    },
    plotOptions: {
      solidgauge: {
        innerRadius: '70%',
        dataLabels: {
          y: 5,
          borderWidth: 0,
        },
        marker: {
          enabled: true,
          symbol: "line"
        }
      },
      gauge: {
        innerRadius: '70%',
      }
    },
    series: [
      {
        name: "Profits",
        data: [2.36],
        dataLabels: 1,
      },
      {
        name: "Target",
        isRectanglePoint: true,
        type: "gauge",
        data: [3],
        dial: {
          backgroundColor: Highcharts.getOptions().colors[1],
          rearLength: "-125%",
        },
        dataLabels: {
          enabled: false
        },
        pivot: {
          radius: 0
        }
      }
    ]
  };
  Highcharts.chart('profits-semicircle', chartOptions)
}
const renderSalesPie = () => {
  const chartOptions = {
    credits: false,
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Sales Channel',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            slicedOffset: 5,
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
          }
        },
        legend : {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemMarginTop: 5,
          itemMarginBottom: 5,
          labelFormatter: function () {
            return `<div class="text-gray-300 font-black mr-4">${this.name}</div>` + ' ' + `<div class="text-gray-300 font-light ml-4">(${this.y})</div>`;
        }
        },
    series: [{
        name: 'Sales Channel',
        colorByPoint: true,
        data: [
          {
            name: 'In Store',
            y: 33487,
            sliced: true,
            color: '#cc1111',
            selected: true
          }, 
          {
            name: 'Online',
            y: 29465,
            color: '#f6abab',
        }
      ]
    }]
};
  Highcharts.chart('sales-pie', chartOptions)
}

const renderOnlineMarketPie = () => {
  const chartOptions = {
    credits: false,
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Online Marketplace share',
        align: 'left'
    },
    tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            slicedOffset: 1,
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
          }
        },
        legend : {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemMarginTop: 5,
          itemMarginBottom: 5,
          labelFormatter: function () {
            return `<div class="text-gray-300 font-black mr-4">${this.name}</div>` + ' ' + `<div class="text-gray-300 font-light ml-4">(${this.y})</div>`;
        }
        },
    series: [{
        name: 'Online Marketplace Share',
        colorByPoint: true,
        data: [
          {
            name: 'Swiggy',
            y: 10412,
            sliced: true,
            color: '#56842E',
            selected: true
          }, 
          {
            name: 'Uber Eats',
            y: 3897,
            sliced: true,
            color: '#7EBE46',
        },
          {
            name: 'Zomato',
            y: 15156,
            sliced: true,
            color: '#A8D382',
        }
      ]
    }]
};
  Highcharts.chart('online-marketplace-pie', chartOptions)
}
const renderProdCategory = () => {
  const chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Product Category Share',
        align: 'left',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                },
                format: '{point.percentage:.1f}'
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '120%',
            showInLegend: true,
        },
      },
      legend : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 5,
        itemMarginBottom: 5,
      //   labelFormatter: function () {
      //     return `<div class="text-gray-300 font-black mr-4">${this.name}</div>` + ' ' + `<div class="text-gray-300 font-light ml-4">(${this.y})</div>`;
      // }
      },
    series: [{
        type: 'pie',
        innerSize: '60%',
        data: [
            {
                name: 'Beverage',
                y: 15537,
                color: '#F6ABBB',
            },
            {
                name: 'Food',
                y: 44078,
                color: '#CC115E'
            },
            {
                name: 'Misc',
                y: 3337,
                color: '#8B083E'
            },
        ]
    }]
};
  Highcharts.chart('prod-category-share', chartOptions)
}
const renderMapChart = async () => {
  const topology = await fetch(
    'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
).then(response => response.json());

// Prepare demo data. The data is joined to map using value of 'hc-key'
// property by default. See API docs for 'joinBy' for more info on linking
// data and map.
const data = [
    ['in-py', 10], ['in-ld', 11], ['in-wb', 12], ['in-or', 13],
    ['in-br', 14], ['in-sk', 15], ['in-ct', 16], ['in-tn', 17],
];

// Create the chart
const chartOptions = {
  chart: {
    map: topology
  },
  
  title: {
    text: 'Top 10 Sales Locations'
  },
  
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    },
    enableMouseWheelZoom: false,
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        type: 'map',
        name: 'Sales Location',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
};
  Highcharts.mapChart('map-chart', chartOptions)
}
const renderSalesByLocChart = async () => {
  const chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Product Category Share',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        },
      },
      plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                },
                format: '{point.percentage:.1f}'
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '100%',
            showInLegend: true,
        },
      },
      legend : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 5,
        itemMarginBottom: 5,
      //   labelFormatter: function () {
      //     return `<div class="text-gray-300 font-black mr-4">${this.name}</div>` + ' ' + `<div class="text-gray-300 font-light ml-4">(${this.y})</div>`;
      // }
      },
    series: [{
        type: 'pie',
        innerSize: '60%',
        data: [
          { name: 'Karnataka', y: 1411415.2299999911 },
          { name: 'Maharashtra', y: 1170202.959999966 },
          { name: 'Delhi', y: 537955.0800000045 },
          { name: 'Haryana', y: 434304.1900000055 },
          { name: 'West Bengal', y: 327831.1800000011 },
          { name: 'Gujrat', y: 212333.51999999883 },
          { name: 'Kerala', y: 111314.54000000052 },
          { name: 'Assam', y: 108271.82000000055 },
          { name: 'Himachal Pradesh', y: 106799.78000000057 },
          { name: 'Tamil Nadu', y: 106403.56000000048 },
          { name: 'Rajasthan', y: 105500.3300000006 },
          { name: 'Madhya Pradesh', y: 102766.4800000006 }
        ]        
    }]
};
  Highcharts.mapChart('sales-by-location-pie', chartOptions)
}
const renderCitySalesBarChart = async () => {

  const chartOptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'City wise sales & profits'
    },
    xAxis: {
      title: 'City',
        categories: [
          'Ahmedabad', 'Bangalore',
          'Baroda',    'Belgavi',
          'Chennai',   'Delhi',
          'Gurgaon',   'Indore',
          'Jaipur',    'Kochi',
          'Kolkata',   'Mumbai',
          'Mysuru',    'Nagpur',
          'Pune',      'Sangli',
          'Shimla',    'Siliguri'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Sales, Prof...'
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 5,
      reversed: true,
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [
      {
        name: 'Profits',
        data: [
          { name: 'Ahmedabad', y: 3974.4276 },
          { name: 'Bangalore', y: 58899.0248 },
          { name: 'Baroda', y: 5022.3009 },
          { name: 'Belgavi', y: -2042.4257 },
          { name: 'Chennai', y: 4417.4782 },
          { name: 'Delhi', y: 38864.2912 },
          { name: 'Gurgaon', y: 30995.7282 },
          { name: 'Indore', y: 3035.5854 },
          { name: 'Jaipur', y: 2583.5601 },
          { name: 'Kochi', y: 4521.8563 },
          { name: 'Kolkata', y: 43198.2389 },
          { name: 'Mumbai', y: 66203.3744 },
          { name: 'Mysuru', y: 16342.5827 },
          { name: 'Nagpur', y: -17936.9459 },
          { name: 'Pune', y: -17418.6165 },
          { name: 'Sangli', y: -11440.5857 },
          { name: 'Shimla', y: 4569.2771 },
          { name: 'Siliguri', y: 2284.8426 }
        ],
        color: '#F6ABBB'
    },
      {
        name: 'Sales',
        data: [
          { name: 'Ahmedabad', y: 33347.77 },
          { name: 'Bangalore', y: 324363.16 },
          { name: 'Baroda', y: 34927.59 },
          { name: 'Belgavi', y: 33796.03 },
          { name: 'Chennai', y: 34218.9 },
          { name: 'Delhi', y: 176813.79 },
          { name: 'Gurgaon', y: 140094.32 },
          { name: 'Indore', y: 32577.19 },
          { name: 'Jaipur', y: 34482.51 },
          { name: 'Kochi', y: 37142.99 },
          { name: 'Kolkata', y: 104629.67 },
          { name: 'Mumbai', y: 274147.24 },
          { name: 'Mysuru', y: 105052.72 },
          { name: 'Nagpur', y: 32676.63 },
          { name: 'Pune', y: 33681.1 },
          { name: 'Sangli', y: 35144.47 },
          { name: 'Shimla', y: 33900.58 },
          { name: 'Siliguri', y: 35840.53 }
        ],
        color: '#CC115E'
    },
  ]
};
  Highcharts.mapChart('city-bar-chart', chartOptions)
}
const renderDaySalesBarChart = async () => {
  const chartOptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Day wise sales'
    },
    tooltip: {
      pointFormat: 'Average Sales: <b>{point.y:.1f}%</b>'
    },
    xAxis: {
      title: 'City',
        categories: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ]        
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Average Sales'
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 5,
      reversed: true,
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [
      {
        name: 'Sales',
        data: [
          { name: 'Monday', y: 23.408528960070054 },
          { name: 'Tuesday', y: 24.105967529618088 },
          { name: 'Wednesday', y: 24.730690966010556 },
          { name: 'Thursday', y: 24.758595706618813 },
          { name: 'Friday', y: 24.784191636851357 },
          { name: 'Saturday', y: 25.720188953488254 },
          { name: 'Sunday', y: 23.40694096601059 }
        ],
        color: '#CC115E'
    },
  ]
};
  Highcharts.mapChart('day-sales-bar-chart', chartOptions)
}
const renderMonthSalesSplineChart = async () => {
  const chartOptions = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Month Wise Sales'
    },
    xAxis: {
        categories: [
          'April',    'May',
          'June',     'July',
          'August',   'September',
          'October',  'November',
          'December', 'January',
          'February', 'March'
        ]
    },
    yAxis: {
        title: {
            text: 'Sales'
        },
    },
    tooltip: {
        crosshairs: true,
        shared: true,
        title: '',
        pointFormat: 'Sales: <b>{point.y:.0f}</b>'
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#CC115E',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Sales',
        marker: {
            symbol: 'circle'
        },
        color: '#CC115E',
        data: [
          122404.41000000195,
          132208.26000000275,
          122974.02000000197,
          129648.07000000158,
          130747.11000000138,
          133209.60000000184,
          129773.74000000188,
          124345.21000000025,
          123478.06000000214,
          138197.05000000188,
          119115.71999999904,
          130735.9400000013
        ]
    }]
}
  Highcharts.mapChart('month-sales-spline-chart', chartOptions)
}

const renderQuarterWiseSalesChart = async () => {
  const chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Product Category Share',
        align: 'left',
      },
      tooltip: {
        pointFormat: 'Quarter: <b>{point.name}</b><br />Percentage: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        },
      },
      plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                },
                format: '{point.percentage:.1f}'
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '100%',
            showInLegend: true,
        },
      },
      legend : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 5,
        itemMarginBottom: 5,
        labelFormatter: function () {
          return `<div class="text-gray-300 font-black mr-4">${this.name}</div>` + ' ' + `<div class="text-gray-300 font-light ml-4">(${(this.y/100000).toFixed(2)}L)</div>`;
      }
      },
    series: [{
        type: 'pie',
        innerSize: '60%',
        data: [
          { name: 'Q1', y: 377586.68999999104, color: '#F9CCD5' },
          { name: 'Q2', y: 393604.7799999916, color: '#CC115E' },
          { name: 'Q3', y: 377597.0099999928, color: '#FCE7EB' },
          { name: 'Q4', y: 388048.70999999496, color: '#F27D9B' },
        ]              
    }]
};
  Highcharts.mapChart('quarter-wise-sales-pie', chartOptions)
}

  const renderCharts = () => {
    renderSalesSemiCircle();
    renderProfitsSemiCircle();
    renderSalesPie();
    renderOnlineMarketPie();
    renderProdCategory();
    renderMapChart();
    renderSalesByLocChart();
    renderCitySalesBarChart();
    renderDaySalesBarChart();
    renderMonthSalesSplineChart();
    renderQuarterWiseSalesChart();
  }

renderCharts()






// alasql(['SELECT * FROM XLS("../data/Sale Report_F_B.xlsx")'])
//     .then(function(res){
//         console.log(res); // output depends on mydata.xls
//     }).catch(function(err){
//         console.log('Does the file exist? There was an error:', err);
//     })