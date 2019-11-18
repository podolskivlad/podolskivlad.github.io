var puzzle = document.getElementsByClassName('movil');

var width = [350, 350, 350, 350, 350, 350, 350, 350, 278];
var height = [350, 350, 350, 350, 350, 350, 350, 350, 278, 350];

for (var i = 0; i < puzzle.length; i++) {
  puzzle[i].setAttribute("width", width[i]);
  puzzle[i].setAttribute("height", height[i]);
  puzzle[i].setAttribute("x", Math.floor((Math.random() * 50) + 1));
  puzzle[i].setAttribute("y", Math.floor((Math.random() * 600) + 1));
  puzzle[i].setAttribute("onmousedown", "selectionElement(evt)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function selectionElement(evt) {
  elementSelect = reordenar(evt);
  currentX = evt.clientX;
  currentY = evt.clientY;
  currentPosX = parseFloat(elementSelect.getAttribute('x'));
  currentPosY = parseFloat(elementSelect.getAttribute('y'));
  elementSelect.setAttribute("onmousemove", "moverElement(evt)");
}
function moverElement(evt) {
  var dx = evt.clientX - currentX;
  var dy = evt.clientY - currentY;
  currentPosX = currentPosX + dx;
  currentPosY = currentPosY + dy;
  elementSelect.setAttribute("x", currentPosX)
  elementSelect.setAttribute("y", currentPosY)
  currentX = evt.clientX;
  currentY = evt.clientY;
  elementSelect.setAttribute("onmouseout", "deselectElement(evt)");
  elementSelect.setAttribute("onmouseup", "deselectElement(evt)");
  iman();
}

function deselectElement(evt) {
  testing();
  if (elementSelect != 0) {
    elementSelect.removeAttribute("onmousemove");
    elementSelect.removeAttribute("onmouseout");
    elementSelect.removeAttribute("onmouseup");
    elementSelect = 0;
  }
}

var entorno = document.getElementById('entorno');

function reordenar(evt) {
  var padre = evt.target.parentNode;
  var clone = padre.cloneNode(true);
  var id = padre.getAttribute("id");
  entorno.removeChild(document.getElementById(id));
  entorno.appendChild(clone);
  return entorno.lastChild.firstChild;
}

var origX = [400, 676, 917, 400, 676, 917, 400, 676, 953];
var origY = [50, 50, 50, 327, 327, 327, 568, 568, 604];

function iman() {
  for (var i = 0; i < puzzle.length; i++) {
    if (Math.abs(currentPosX - origX[i]) < 15 && Math.abs(currentPosY - origY[i]) < 15) {
      elementSelect.setAttribute("x", origX[i]);
      elementSelect.setAttribute("y", origY[i]);
    }
  }
}

var win = document.getElementById("win");

function testing() {
  var bien_udicada = 0;
  var padres = document.getElementsByClassName('padre');
  for (var i = 0; i < puzzle.length; i++) {
    var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
    ide = padres[i].getAttribute("id");
    if (origX[ide] == posx && origY[ide] == posy) {
      bien_udicada = bien_udicada + 1;
    }
  }
  if (bien_udicada == 9) {
    win.volume = 0.2;
    win.play();
  }
}
