// initialise mathJax
/*
math.config({
  number: 'Fraction'
})
*/

// initialise graph
let data, layout;
const origin = 1;
var massCoords = [origin, 0];
var m = 1, c = 0.25, k = 1;
var dt = 0.1;
var eps = 0.01;

const maxlen = 500;
var rDeque = new Deque(maxlen);

let startAnim;

// plot data
function updateData () {
  data = [{
      x: [origin-1, massCoords[0]],
      y: [0, massCoords[1]],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    }, {
      x: [massCoords[0]],
      y: [massCoords[1]],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'black', size: 50, symbol: 'square'},
      connectgaps: false,
    }];
    return;
  }

function updateLayout () {
  layout = {
    autosize: false,
    width: 500,
    height: 270,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 4,
    },
    xaxis: {
      range: [-0.5,2.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-2,2],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    showlegend: false,
    hovermode: false,
  }
  return;
}

function clamp (x, xmin, xmax) {
  return math.max(xmin, math.min(x, xmax))
}

function updatePosition () {
  updateData();
  updateLayout();
  Plotly.react(graphContainer, data, layout);
  return;
}

function startDragBehavior () {
  var startAnim;

  var d3 = Plotly.d3;
  var drag = d3.behavior.drag();
  drag.origin(function () {
    var transform = d3.select(this).attr("transform");
    var translate = transform.substring(10, transform.length-1).split(/,| /);
    return {x: translate[0], y: translate[1]};
  });
  drag.on("dragstart", function () {
    clearInterval(startAnim);
    rDeque = new Deque(maxlen);
    return;
  });
  drag.on("drag", function () {
    graphContainer = document.getElementById("graph0");
    var xmouse = d3.event.x, ymouse = d3.event.y;
    d3.select(this).attr("transform", "translate("+[xmouse,ymouse]+")");
    var xaxis = graphContainer._fullLayout.xaxis;
    // var yaxis = graphContainer._fullLayout.yaxis;
    massCoords[0] = clamp(xaxis.p2l(xmouse), 0, 2);
    updatePosition();
    return;
  });
  drag.on("dragend", function() {
    d3.select(".scatterlayer .trace:last-of-type .points path:last-of-type").call(drag);
    rDeque.push(massCoords[0], massCoords[0]);
    startAnim = setInterval(function () {
      prevR = [
        rDeque.get(-2) - origin,
        rDeque.get(-1) - origin,
      ];

      nextR = math.eval('(2*m*(2*b-a) + c*t*a - 2*t*t*b)/(2*m + c*t)', {m: m, c: c, k: k, a: prevR[0], b: prevR[1], t: dt}) + origin;

      rDeque.add(nextR);
      massCoords = [nextR, 0];
      updatePosition();

      if ((math.abs(nextR - origin) <= eps) && (((math.abs(nextR-prevR[1]-origin))/dt) <= eps)) {
        clearInterval(startAnim);
      }
    }, 15);
    return;
  });
  d3.selectAll(".scatterlayer .trace:last-of-type .points path").call(drag);
}

// when page ready
function main () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  // connect sliders
  //$("input").on("change mousemove", function() {update()})

  // plot graph
  updateData();
  updateLayout();

  var graphContainer = document.getElementById("graph0");

  Plotly.newPlot(graphContainer, data, layout, {displayModeBar: false});

  var massContainer = graphContainer.querySelector(".scatterlayer .trace:last-of-type .points");
  var massMarker = massContainer.getElementsByTagName("path");

  startDragBehavior();
}

$(document).ready(function () {
  main();
})























// end
