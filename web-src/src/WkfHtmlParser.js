import React from 'react'; 
import ACTIVITIES from './ActivityDescriptions'; 
import $ from 'jquery';
import { NONAME } from 'dns';
import exportIcon from './assets/Smock_Export_18_N.svg'; 
import helpIcon from './assets/Smock_Help_18_N.svg'; 
// Import root provider and theme
import {Provider} from '@react-spectrum/provider';
import {theme} from '@react-spectrum/theme-default';

// Import the needed components
import {Button} from '@react-spectrum/button';
import {Form} from '@react-spectrum/form';
import {Checkbox} from '@react-spectrum/checkbox';
import {TextField} from '@react-spectrum/textfield';

var id = 1; // start activity number at 1
var diagramHeight = 0; 

function drawNode(nodeObj, diagram) {
    var node = nodeObj.node;
    // Get full activity text 
    const nodeText = node.querySelector('text.so-DiagramNode__label'); 
    var fullText = ""; 
    // Save activity text/Edit spacing 
    var textYCoord = 48; 
    const nodeTSpans = nodeText.querySelectorAll('tspan'); 
    nodeTSpans.forEach((nodeTSpan) => {
        fullText += nodeTSpan.innerHTML + " "; 
        nodeTSpan.id = 'diagram-text'; 
        nodeTSpan.style.fill = "grey"; 
        nodeTSpan.style.fontSize = "16px"; 
        nodeTSpan.style.fontFamily = "Arial"; 
        nodeTSpan.setAttribute('y', textYCoord); 
        textYCoord+=20; 
    })
    node.fullText = fullText; 
    // Add activity id to text and re-append full text to node
    if (nodeObj.ignore === "N") {
        nodeText.innerHTML = id; 
        node.nodeId = id++;
        nodeText.id = 'diagram-label'; 
        nodeText.style.fill = "red"; 
        nodeText.style.fontSize = "33px"; 
        nodeText.style.textAnchor = "middle"; 
        nodeText.style.fontFamily = "Arial"; 
        if (nodeObj.y > 10) { 
            nodeText.setAttribute('y', '-10'); 
        } else {
            nodeText.setAttribute('y', '30'); 
        }
        nodeTSpans.forEach((nodeTSpan) => {
            nodeText.appendChild(nodeTSpan); 
        })
    }
    // Color background circle of activity node light blue
    var backgroundCircle = null; 
    var allCircles = node.querySelectorAll('circle'); 
    for (var i = 0; i < allCircles.length; i++) {
        var circle = allCircles[i]; 
        var radius = circle.getAttribute('r'); 
        if (radius === '24') {
            backgroundCircle = circle; 
            circle.setAttribute('fill', '#D6E6F4'); 
            break;
        }
    }
    // Color activity node icon dark blue
    const iconPieces = node.querySelectorAll('path, ellipse, rect, polygon'); 
    iconPieces.forEach((iconPiece) => {
        iconPiece.setAttribute('fill', '#4E86C2'); 
    })
    const icon = node.querySelector('svg.so-DiagramNode__icon'); 
    // Reset node element and re-add everything 
    node.innerHTML = ""; 
    node.appendChild(backgroundCircle); 
    node.appendChild(icon); 
    node.appendChild(nodeText); 
    // Add activity node to diagram 
    diagram.appendChild(node);
}

function styleTableHeader(el) {
    Object.assign(el.style, {
        padding: '5px',
        backgroundColor: '#c5d7de', 
        textAlign: 'center',
        fontWeight: 'bold',
        border: '1px solid black'
    })
}

function drawTableHeader(tableEl) {
    const tableHeader = document.createElement('tr'); 
    const no_th = document.createElement('th'); 
    const activity_th = document.createElement('th'); 
    const purpose_th = document.createElement('th'); 
    const notes_th = document.createElement('th'); 
    styleTableHeader(no_th); 
    styleTableHeader(activity_th); 
    styleTableHeader(purpose_th); 
    styleTableHeader(notes_th); 
    no_th.innerHTML = "No."; 
    activity_th.innerHTML = "Activity"; 
    purpose_th.innerHTML = "Purpose"; 
    notes_th.innerHTML = "Notes"; 
    tableHeader.appendChild(no_th); 
    tableHeader.appendChild(activity_th); 
    tableHeader.appendChild(purpose_th); 
    tableHeader.appendChild(notes_th); 
    tableEl.appendChild(tableHeader); 
}

function styleTableText(el) {
    Object.assign(el.style, {
        border:'1px solid black',
        textAlign: 'left',
        padding: '5px'
    })
}

function addTextToTable(table, nodeObj) {
    var node = nodeObj.node;
    const tableRow = document.createElement('tr'); 
    const no_td = document.createElement('td'); 
    const activity_td = document.createElement('td'); 
    const purpose_td = document.createElement('td'); 
    const notes_td = document.createElement('td');  
    styleTableText(no_td); 
    styleTableText(activity_td); 
    styleTableText(purpose_td); 
    styleTableText(notes_td); 
    no_td.innerHTML = node.nodeId; 
    activity_td.innerHTML = node.fullText; 
    purpose_td.innerHTML = nodeObj.purpose; 
    notes_td.innerHTML = nodeObj.notes; 
    tableRow.appendChild(no_td); 
    tableRow.appendChild(activity_td); 
    tableRow.appendChild(purpose_td); 
    tableRow.appendChild(notes_td); 
    table.appendChild(tableRow); 
}

function convertSVGtoPNG(svg, imgEl) {
    var svg = svg.outerHTML; 
    svgToPng(svg,(imgData)=>{
       const pngImage = document.getElementById(imgEl); 
       pngImage.src=imgData;
   });
    function svgToPng(svg, callback) {
       const url = getSvgUrl(svg);
       svgUrlToPng(url, (imgData) => {
           callback(imgData);
           URL.revokeObjectURL(url);
       });
   }
   function getSvgUrl(svg) {
       return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
   }
   function svgUrlToPng(svgUrl, callback) {
       const svgImage = document.createElement('img');
       document.body.appendChild(svgImage);
       svgImage.onload = function () {
           const canvas = document.createElement('canvas');
           canvas.width = svgImage.clientWidth;
           canvas.height = svgImage.clientHeight;
           const canvasCtx = canvas.getContext('2d');
           canvasCtx.drawImage(svgImage, 0, 0);
           const imgData = canvas.toDataURL('image/png');
           callback(imgData);
       };
       svgImage.src = svgUrl;
       svgImage.style.opacity = '0';
       document.getElementById('img-copies').appendChild(svgImage); 
    }
}

// clear input text area and diagram area 
function clear() {
    const input = document.getElementById('pageSourceHTML'); 
    input.value = ""; 
    document.getElementById('main-diagram-area').innerHTML = ""; 
    document.getElementById('breakout-diagrams').innerHTML = ""; 

}

function exportHTML() {
    document.getElementById('export-area').innerHTML = "Exported!";
    var filename = ''; 
    var element = 'export-html';
    var meta= "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
    var head= "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";
    var body= "<body>_body_</body>";
    var html = document.getElementById(element).innerHTML ;
    
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    var  css = (
           '<style>' +
           'img {width:600px;}' +
           '</style>'
          );
//  Image Area %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    var options = { maxWidth: 624};
    var images = Array();
    var img = $("#"+element).find("img");
    for (var i = 0; i < img.length/2; i++) {
        // Calculate dimensions of output image
        var w = Math.min(img[i].width, options.maxWidth);
        var h = img[i].height * (w / img[i].width);
        // Create canvas for converting image to data URL
        var canvas = document.createElement("CANVAS");
        canvas.width = w;
        canvas.height = h;
        // Draw image to canvas
        var context = canvas.getContext('2d');
        context.drawImage(img[i], 0, 0, w, h);
        // Get data URL encoding of image
        var uri = canvas.toDataURL("image/png");
        $(img[i]).attr("src", img[i].src);
        img[i].width = w;
        img[i].height = h;
        // Save encoded image to array
        images[i] = {
            type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            location: $(img[i]).attr("src"),
            data: uri.substring(uri.indexOf(",") + 1)
        };
    }

    // Prepare bottom of mhtml file with image data
    var imgMetaData = "\n";
    for (var i = 0; i < images.length; i++) {
        imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
        imgMetaData += "Content-Location: " + images[i].location + "\n";
        imgMetaData += "Content-Type: " + images[i].type + "\n";
        imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        imgMetaData += images[i].data + "\n\n";
    }
    imgMetaData += "--NEXT.ITEM-BOUNDARY--";
// end Image Area %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    var output = meta.replace("_html_", head.replace("_styles_", css) + body.replace("_body_", html)) + imgMetaData;
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);
    filename = filename ? filename + '.doc' : 'document.doc';
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  };

class WkfHtmlParser extends React.Component {
    parseHTML() { 
        document.getElementById('app').style.marginTop = "3vh";
        // clear diagrams and tables
        document.getElementById('main-diagram-area').innerHTML = "";
        document.getElementById('breakout-diagrams').innerHTML = "";
        document.getElementById('img-copies').innerHTML = ""; 
        // Get workflow html
        const input = document.getElementById('pageSourceHTML'); 
        const html = input.value; 
        // ERROR check for empty entry 
        if (html === "") {
            alert("Nothing to process!"); 
            return; 
        }
        // Convert HTML to DOM element 
        const el = document.createElement('html');
        el.innerHTML = html; 
        // Reset activity number to 1
        id = 1; 
        // Create main diagram element and add svg attributes from source html 
        var diagram = document.createElement('svg');
        diagram.setAttribute('version', '1.1'); 
        diagram.setAttribute('xmlns', "http://www.w3.org/2000/svg"); 
        diagram.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink"); 
        // Parse through activity nodes
        const nodes = el.querySelectorAll('g.so-DiagramNode');
        if (nodes.length === 0) {
            alert("No activities found:("); 
            return; 
        } else {
            // display 'Export to Word' button
            document.getElementById('export-area').style.display = "block"; 
        }
        // Gather all edges and their start/end (x, y) coordinates
        var allEdgesObj = []; 
        const edges = el.querySelectorAll('path.so-DiagramEdge__path'); 
        edges.forEach((edge) => {
            if (!edge.classList.contains('so-DiagramEdge__path--touchzone')) {
                edge.id = 'diagram-edge'; 
                edge.style.fill = "none"; 
                edge.style.stroke = "#689717"; 
                edge.style.strokeDasharray = "2, 2"; 
                edge.style.strokeWidth = "2px";
                var pathdArr = edge.getAttribute('d').split(' '); 
                allEdgesObj.push({
                    edge: edge, 
                    startX: parseInt(pathdArr[1]), 
                    startY: parseInt(pathdArr[2]),
                    endX: parseInt(pathdArr[pathdArr.length - 2]), 
                    endY: parseInt(pathdArr[pathdArr.length - 1])
                }); 
            }
        })
        // GATHER ALL NODES AND GROUP EACH WITH ITS CORRESPONDING INCOMING/OUTGOING EDGES, 
        // (X, Y) COORDS, AND ACTIVITY DESCRIPTION
        var allNodesObj = []; 
        for (var i = 1; i <= nodes.length; i++) {
            var node = nodes[i-1]; 
            // Exclude disabled activities
            const imgOverlay = node.querySelector("image"); 
            var imgHref= imgOverlay.getAttribute('xlink:href'); 
            if (imgHref !== "/xtk/img/activities/disabled.png") {
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(node.attributes[0].value);
                var coords = matches[1].split(','); 
                var outEdges = []; 
                var inEdges = [];
                allEdgesObj.forEach((edgeObj) => {
                    let xDiff = edgeObj.startX - coords[4]; 
                    let yDiff = Math.abs(edgeObj.startY - coords[5]); 
                    let endXDiff = edgeObj.endX - coords[4];
                    let endYDiff = Math.abs(edgeObj.endY - coords[5]);
                    if (xDiff === 53) {
                        if (yDiff >= 4 && yDiff <= 44) {
                            outEdges.push(edgeObj.edge); 
                        }
                    } else if (endXDiff === -12) {
                        if (endYDiff >= 6 && endYDiff <= 60) {
                            inEdges.push(edgeObj.edge);
                        }
                    }
                })
                // Get template description to fill 'Purpose' and 'Notes' fields in table
                // If activity equals 'Start', 'End', 'Fork', or 'AND-join' then ignore 
                var template_purpose = ""; 
                var template_notes = "";
                var ignore = "N"; 
                var icon = node.querySelector('svg'); 
                var iconPath = icon.querySelector('path'); 
                if (iconPath === null) {
                    // check if activity equals 'test' or 'email delivery'
                    var iconPolygon = icon.querySelector('polygon'); 
                    var testPolygon = ACTIVITIES[17].code.querySelector('polygon'); 
                    var emailPolygon = ACTIVITIES[19].code.querySelector('polygon'); 
                    // ACTIVITIES[17] is 'test'
                    // ACTIVITIES[19] is 'email delivery'
                    if (iconPolygon.getAttribute('points').substring(0,10) === testPolygon.getAttribute('points').substring(0,10)) {
                        template_purpose = ACTIVITIES[17].purpose; 
                        template_notes = ACTIVITIES[17].notes; 
                    } else if (iconPolygon.getAttribute('points').substring(0,10) === emailPolygon.getAttribute('points').substring(0,10)) {
                        template_purpose = ACTIVITIES[19].purpose;
                        template_notes = ACTIVITIES[19].notes; 
                    }
                } else {
                    ACTIVITIES.forEach((ACTIVITY) => {
                        var currActivityPath = ACTIVITY.code.querySelector('path'); 
                        if (currActivityPath !== null) {
                            if (iconPath.getAttribute('d').substring(0,30) === currActivityPath.getAttribute('d').substring(0,30)) {
                                if (ACTIVITY.type === "Start" || ACTIVITY.type === "End" || ACTIVITY.type === "Fork" || ACTIVITY.type === "AND-join") {
                                    ignore = "Y"; 
                                } else {
                                    template_purpose = ACTIVITY.purpose; 
                                    template_notes = ACTIVITY.notes; 
                                }
                            }
                        }
                    })
                }
                allNodesObj.push({
                    node: node,  
                    inEdges: inEdges,
                    outEdges: outEdges, 
                    x: coords[4], 
                    y: coords[5], 
                    purpose: template_purpose,
                    notes: template_notes, 
                    ignore: ignore,
                    visited: "N"
                })
            }
        }
        // Set diagram height based on largest y coord difference between nodes
        allNodesObj.sort(function(a, b) {
            return a.y-b.y; 
        })
        diagramHeight = allNodesObj[allNodesObj.length - 1].y - allNodesObj[0].y; 
        diagram.setAttribute('width', 4400); 
        diagram.setAttribute('height', diagramHeight + 150); 

// **********************NEW TRAVERSAL LOGIC TO DRAW NODES TO DIAGRAM**********************
        // Find all nodes with 0 incoming edges
        var nodesZeroIncomingEdges = []; 
        allNodesObj.forEach((nodeObj) => {
            if (nodeObj.inEdges.length === 0) {
                nodesZeroIncomingEdges.push(nodeObj);
            }
        })
        // Sort nodes with 0 incoming edges from left to right 
        nodesZeroIncomingEdges.sort(function(a, b) {
            return a.x-b.x;
        })
        var sortedBreakoutNodes = []; // array to store nodes for breakout diagrams
        // For each node with 0 incoming edges, 
        nodesZeroIncomingEdges.forEach((nodeObj) => {
            if (nodeObj.visited === "N") {
                // push to sortedBreakoutNodes
                sortedBreakoutNodes.push(nodeObj);
                // mark node as visited 
                nodeObj.visited === "Y"; 
                // draw node
                drawNode(nodeObj, diagram);
                // set incomingEdges array to current node's outgoing edges
                var incomingEdges = [];
                nodeObj.outEdges.forEach((edge) => {
                    incomingEdges.push(edge); 
                }); 
                var edgeIndex = 0; 
                // while there are still incoming edges,
                while (incomingEdges[edgeIndex] !== undefined) {
                    // get next incoming edge from 'queue'
                    var incomingEdge = incomingEdges[edgeIndex++];
                    // draw incoming edge
                        incomingEdge.style.fill = 'none';
                        incomingEdge.style.stroke = '#E5A442';
                        incomingEdge.style.strokeDasharray = '2, 2';
                        incomingEdge.style.strokeWidth = '2px';
                        diagram.appendChild(incomingEdge); 
                    // find next node in diagram whose incoming edge matches current one
                    var foundNextNode = false; 
                    for (var i = 0; i < allNodesObj.length; i++) {
                        if (allNodesObj[i] !== nodeObj && allNodesObj[i].visited === "N") {
                            var currNodeInEdges = allNodesObj[i].inEdges; 
                            for (var j = 0; j < currNodeInEdges.length; j++) {
                                if (currNodeInEdges[j] === incomingEdge) {
                                    // push to sortedBreakoutNodes
                                    sortedBreakoutNodes.push(allNodesObj[i]); 
                                    allNodesObj[i].visited = "Y"; 
                                    drawNode(allNodesObj[i], diagram); 
                                    // push node's outgoing edges into incoming edge []
                                    allNodesObj[i].outEdges.forEach((outEdge) => {
                                        incomingEdges.push(outEdge); 
                                    })
                                    foundNextNode = true;
                                    break;
                                }
                            }
                        }
                        if (foundNextNode) {
                            break;
                        }
                    }   
                }     
            }
        })
// **********************END OF TRAVERSAL LOGIC********************************************
        // Convert main diagram svg to png 
        var mainDiagramArea = document.getElementById('main-diagram-area');
        var newImg = document.createElement('img');
        newImg.id = 'diagram-png';
        mainDiagramArea.appendChild(newImg);
        mainDiagramArea.style.display = 'block';
        diagram.style.display = 'none';
        convertSVGtoPNG(diagram, 'diagram-png'); 

        // DRAW BREAKOUT DIAGRAMS 
        const activitiesPerBreakout = document.getElementById('activitiesPerBreakout').value; 
        if (sortedBreakoutNodes.length > activitiesPerBreakout) {
            // Add 'Breakout' header
            var breakoutHeader = document.createElement('h4'); 
            breakoutHeader.innerHTML = "Breakdown"; 
            breakoutHeader.style.fontWeight = "bold"; 
            breakoutHeader.style.fontSize = "16px";
            breakoutHeader.style.textAlign = "center"; 
            var breakoutDiagramArea = document.getElementById('breakout-diagrams'); 
            breakoutDiagramArea.appendChild(breakoutHeader); 
            // GROUP NODES BY ACTIVITIES PER BREAKOUT 
            var breakoutNodeGroups = []; 
            var nodeGroup = []; 
            var numNodes = 0; 
            var numActivities = 0; 
            while (numNodes < sortedBreakoutNodes.length) {
                if (typeof sortedBreakoutNodes[0] !== 'undefined') {
                    if (sortedBreakoutNodes[0].ignore === "N") {
                        numActivities++; 
                    }
                    nodeGroup.push(sortedBreakoutNodes.shift()); 
                    if (numActivities.toString() === activitiesPerBreakout) {
                        breakoutNodeGroups.push(nodeGroup); 
                        nodeGroup = []; 
                        numActivities = 0; 
                    }
                } else {
                    break; 
                }
            }
            // Display remainder of nodes in last nodeGroup 
            // If all should be ignored then do not use last nodeGroup
            var display = "N"; 
            nodeGroup.forEach((node) => {
                if (node.ignore === "N") {
                    display = "Y";
                }
            })
            if (display === "Y") {
                breakoutNodeGroups.push(nodeGroup); 
            }
            
            var inEdges = []; 
            var prevNodes = []; // used to store previous activities/edges for context 
            for (var i = 1; i <= breakoutNodeGroups.length; i++) {
                var allNodes = []; // used to compute svg height
                // Create breakout diagram svg and add attributes from source html 
                var currBreakoutDiagram = document.createElement('svg'); 
                currBreakoutDiagram.setAttribute('version', '1.1'); 
                currBreakoutDiagram.setAttribute('xmlns', "http://www.w3.org/2000/svg"); 
                currBreakoutDiagram.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink"); 
                // DRAW INCOMING EDGES FROM PREVIOUS BREAKOUT DIAGRAM
                inEdges.forEach((edge) => {
                    currBreakoutDiagram.appendChild(edge.cloneNode(true)); 
                })
                // DRAW PREVIOUS NODES 
                prevNodes.forEach((breakoutNode) => {
                    allNodes.push(breakoutNode); 
                    let node = breakoutNode.node; 
                    node.style.opacity = '0.3'; 
                    currBreakoutDiagram.appendChild(node.cloneNode(true)); 
                    node.style.opacity = '1.0'; 
                })
                // RESET 
                inEdges = []; 
                prevNodes = []; 
                // CREATE TABLE
                var breakoutTable = document.createElement('table');
                breakoutTable.id = 'breakout-table-' + i; 
                breakoutTable.style.borderCollapse = 'collapse';
                breakoutTable.style.fontSize = 16+'px';
                breakoutTable.style.margin = 'auto';
                breakoutTable.style.fontFamily = 'arial'; 
                drawTableHeader(breakoutTable);
                // DRAW NODES AND ADD CORRESPONDING TEXT TO TABLE 
                var nodesInCurrBreakout = breakoutNodeGroups[i-1]; 
                nodesInCurrBreakout.forEach((breakoutNode) => {
                    allNodes.push(breakoutNode); 
                    let node = breakoutNode.node; 
                    currBreakoutDiagram.appendChild(node.cloneNode(true)); 
                    prevNodes.push(breakoutNode); 
                    // DRAW OUTGOING EDGES 
                    let edges = breakoutNode.outEdges; 
                    edges.forEach((edge) => {
                        currBreakoutDiagram.appendChild(edge.cloneNode(true)); 
                        inEdges.push(edge); 
                    })
                    // ADD ACTIVITY TEXT TO TABLE
                    if (breakoutNode.ignore === "N") {
                        addTextToTable(breakoutTable, breakoutNode);
                    }
                })
                currBreakoutDiagram.setAttribute('width', 4400); 
                currBreakoutDiagram.setAttribute('height', diagramHeight + 150); 
                // Convert breakout diagram svg to png
                var breakoutDiagramArea = document.getElementById('breakout-diagrams');
                var newImg = document.createElement('img');
                newImg.id = 'breakout-diagram-' + i + '-png';
                breakoutDiagramArea.appendChild(newImg);
                breakoutDiagramArea.appendChild(breakoutTable);
                convertSVGtoPNG(currBreakoutDiagram, 'breakout-diagram-' + i + '-png');
            }
             // Add 'End of Breakdown' header
             var endBreakoutHeader = document.createElement('h4'); 
             endBreakoutHeader.innerHTML = "End of Breakdown"; 
             endBreakoutHeader.style.fontWeight = "bold"; 
             endBreakoutHeader.style.fontSize = "16px";
             endBreakoutHeader.style.textAlign = "center"; 
             breakoutDiagramArea.appendChild(endBreakoutHeader); 

            document.getElementById('breakout-diagrams').style.display = 'block'; 

        } else {
            // CREATE ONE TABLE WITH ALL ACTIVITIES 
            var table = document.createElement('table');
            table.id = 'table'; 
            table.style.borderCollapse = 'collapse';
            table.style.fontSize = 16+'px';
            table.style.margin = 'auto';
            table.style.fontFamily = 'arial'; 
            drawTableHeader(table);
            sortedBreakoutNodes.forEach((sortedNode) => {
                // Add activity text to table 
                if (sortedNode.ignore === "N") {
                    addTextToTable(table, sortedNode);
                }
            })
            var breakoutDiagramArea = document.getElementById('breakout-diagrams');
            breakoutDiagramArea.appendChild(table);
            breakoutDiagramArea.style.display = 'block'; 
        }
    }

    render() {

        const diagramArea = {
            display: "none",
            margin: "0 auto",
        }

        const exportToWord = {
            display: "none",
            textAlign: "center",
            fontSize: "16px",
            marginTop: "15px"
        }

        const textArea = {
            float: "left",
            width: "50vw"
        }

        const labelArea = {
            fontSize: "16px",
        }

        const center = {
            alignContent: "center",
            textAlign: "center",
            fontSize: "35px"
        }

        const body = {
            width: "50vw",
            // backgroundColor: "white",
            margin: "auto",
            padding: "30px",
            marginTop: "25vh"
        }

        const whiteBackground = {
            // backgroundColor: "white"
        }

        return (
            <Provider theme={theme} typekitId="mge7bvf">
            <div style={whiteBackground}>
                <div id="app" style={body}>
                <h1 style={center}>Campaignion</h1>
                <div id='form-area'>
                <Form width={192} aria-labelledby="input-label">
                    <TextField id="pageSourceHTML" placeholder="Paste HTML here..." UNSAFE_style={textArea}></TextField>
                    <div className="dropdown">
                        <img src={helpIcon} id='help-icon'></img>
                        <div className="dropdown-content">
                            <p>Open the developer console and click anywhere in the workflow area to get to the 'svg' element with class='nlui-draggable'. Right click on that in the console and select 'Edit as HTML' to retrieve all text. Command+A to select all and copy/paste here.</p>
                        </div>
                    </div>
                    <label style={labelArea}>Activities Per Breakout:</label>
                    <select id="activitiesPerBreakout">
                        <option value="2">2</option>
                        <option value="3">3</option>    
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select><br/>
                </Form>
                <span>
                    <Button variant="cta" onPress={this.parseHTML}>Process</Button>
                    <Button variant="cta" onPress={clear}>Clear</Button><br/>
                </span><br/>
                </div>
                </div>
           
                <div id='export-area' onClick={exportHTML} style={exportToWord}>
                    Export to Word
                    <img src={exportIcon} id='export-icon'></img>
                </div>
                <div id='export-html'>
                    <div id='main-diagram-area' style={diagramArea}>
                    </div>
                    <div id='breakout-diagrams' style={diagramArea}></div>
                </div>
                <div id='img-copies'></div>
            </div>
            </Provider>
        )
    }
}

export default WkfHtmlParser; 