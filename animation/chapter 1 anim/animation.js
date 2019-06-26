// initialise layout
var layout = {
  title: 'Stiffness Matrix',
  autosize: true,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
  },
  xaxis: {
    range: [-0.5,10.5],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,6],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend: false,
  hovermode: false,
  /*
  annotations: [
    {
      x: 4.5,
      y: 7.5,
      xref: 'x',
      yref: 'y',
      text: 'R',
      showarrow: true,
      arrowhead: 2,
      ax: -40,
      ay: 0
    }
  ] */
}

// initialise coordinates
const coordRange = Array.from(Array(4).keys());
const rConst = 1; // scales input
const graphConst = 0.2; // scales input for graphing
var coordX = [0, 10, 1, 8, 5];
var coordY = [0, 0, 3, 4, 0];
var x = coordX, y = coordY;
var data = coordRange.map(function (i) {
  return {
    x: [coordX[4], coordX[i]],
    y: [coordY[4], coordY[i]],
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'black',
      size: 20
    },
    line: {
      color: 'black'
  },
    connectgaps: false,
}});

// plot graph
Plotly.newPlot('graph3', data, layout)

// initialise sliders
$("#r1").on("change mousemove", function() {update()})
$("#r2").on("change mousemove", function() {update()})
var r1 = $("#r1").val() * rConst;
var r2 = $("#r2").val() * rConst;

function update () {
  compute();
  Plotly.animate('graph3', {
    data: data
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false,
    },
    xaxis: {
      range: [-0.5,10.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-2,6],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: false,
  });

  return;
}

function compute () {
  r1 = $("#r1").val() * rConst;
  r2 = $("#r2").val() * rConst;
  coordX = [0, 10, 1, 8, 5+r1*graphConst];
  coordY = [0, 0, 3, 4, 0+r2*graphConst];
  data = coordRange.map(function (i) {
    return {
      x: [coordX[4], coordX[i]],
      y: [coordY[4], coordY[i]],
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'black',
        size: 20
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
  }});
  return;
}























// end
