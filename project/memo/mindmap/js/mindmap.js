"use strict";
const $ = function(t = null) {
  return new class {
        constructor(t) {
            t && (this.nodes = t.nodeType ? [t] : NodeList.prototype.isPrototypeOf(t) ? t : document.querySelectorAll(t), this.n = this.nodes[0])
        }
        each = t => (this.nodes.forEach((s => t(s))), this);
        addClass = t => this.each((s => s.classList.add(...t.split(",").map((t => t.trim())))), this);
        html = t => this.each(s => s.innerHTML = t)
        create = t => $(document.createElement(t));
        append = t => {
            let s = this.create(t);
            return this.n.appendChild(s.n), s
        };
        remove = () => this.each(_node => _node.remove())
        // insertAfter = t => (t.n.after(this.n), this);
        insertAfter = t => (t.after(this.n), this);
        setAttr = (t, s = "") => this.each((e => e.setAttribute(t, s)), this);
        sCreate = t => {
            let s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            return s.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), s.setAttribute("viewBox", t), $(s)
        };
        sAppend = t => (this.n.appendChild(t.n), this);
        sC = t => document.createElementNS("http://www.w3.org/2000/svg", t);
        id = t => (this.setAttr("id", t), this);
        d = t => (this.setAttr("d", t), this);
        fill = t => (this.setAttr("fill", t), this);
        stroke = t => (this.setAttr("stroke", t), this);
        strokeWidth = t => (this.setAttr("stroke-width", t), this);
        sBezier = (t, s, e, i) => $(this.sC("path")).d(`M${t},${s} C ${(t+e)/2},${s} ${(t+e)/2},${i} ${e},${i}`);
    }(t)
};


function createMap(id,data) {
    //find depth of Elements
    function findDepth(id, depth = 0) {
        while (id !== null) {
            let aktEl = data.filter(x => x.id == id)
            depth++
            id = aktEl[0].parentId
            if (id == null) depth = depth * aktEl[0].div
        }
        return depth
    }
    // first div at right side (-1*-1=1)
    var aktDiv = -1
    // swap between left and right side
    data.filter(x => x.parentId == null)
        .forEach(x => {
            x.div = aktDiv;
            aktDiv *= -1
        })
    // set root Elements div = 0
    data.find(x => x.id == null).div = 0
    // set divs for Childs
    data.filter(x => (x.parentId !== null && x.id !== null))
        .forEach(x => x.div = findDepth(x.id))
    // find min and max Div-Number
    let minDiv = Math.min(...data.map(item => item.div))
    let maxDiv = Math.max(...data.map(item => item.div))
    // create Divs in container
    for (let i = minDiv; i <= maxDiv; i++) {
        $(id).append('div').id(`div${i}`).addClass('f-col')
    }
    // put paragraphs in Div´s
    data.forEach(el => {
        $(`#div${el.div}`).append('span').html(el.text).id(`p${el.id}`)
    })
}

function drawLines(id,data) {
    // find Coordinates from Container
    let mC = $(id).n.getBoundingClientRect();
    // create SVG with same ViewportSize as Container
    let beforeSVG = document.createElement("span");
    let parent = $('#mindmap').n.parentNode.insertBefore(beforeSVG, $(id).n);

    $().sCreate(`0,0,${mC.width},${mC.height}`).setAttr('id', 'mySVG').insertAfter(beforeSVG)

    // set SVG at same Position as Container
    $('#mySVG').n.style = `top:${mC.top}px;left:${mC.left}px;
        width:${mC.width}px;height:${mC.height}px;`
    // create Bezier from Element's to Parent´s
    data.forEach(el => {
        if ('parentId' in el) {
            let aktEl = $(`#p${el.id}`).n.getBoundingClientRect()
            let parEl = $(`#p${el.parentId}`).n.getBoundingClientRect()
            let aktLeft = (aktEl.left < parEl.left) ? aktEl.left + aktEl.width : aktEl.left
            let parLeft = (aktEl.left > parEl.left) ? parEl.left + parEl.width : parEl.left
            $('#mySVG').sAppend(
                $().sBezier(aktLeft - mC.left, aktEl.top - mC.top + (aktEl.height / 2), parLeft - mC.left, parEl.top - mC.top + (parEl.height / 2)).addClass('path'))
        }
    })
}

class Mindmap{
    constructor(id, data){
        this.id = id;
        this.data = data;
        this.width_ = window.innerWidth;
        this.height_ = window.innerHeight;

        if (id && data) {
            window.scrollTo(0, 0);
            window.onbeforeunload = function() {
                window.scrollTo(0, 0);
            };

            createMap(id, data);
            const resizeObserver = new ResizeObserver(entries => {
                $('#mySVG').remove()
                drawLines(id,data)
            })

            resizeObserver.observe($(id).n);

            let widthInput = document.getElementById('widthInput');
            let heightInput = document.getElementById('heightInput');
            widthInput.value = this.width_;
            heightInput.value = this.height_;
            
            widthInput.addEventListener('input', (e) => {
                this.width = e.target.value;
            });
            heightInput.addEventListener('input', (e) => {
                this.height = e.target.value;
            });
        }else{
            throw("Input must be (<div id>, <json data>)")
        }
    }
    get height(){
        return this.height_+'px';
    }
    get width(){
        return this.width_+'px';
    }
    set width(w){
        if(w){
            this.width_ = w;
            $("#container").n.style.width = this.width;
        }
    }
    set height(w){
        if(w){
            this.height_ = w;
            $("#container").n.style.height = this.height;
        }
    }
}








