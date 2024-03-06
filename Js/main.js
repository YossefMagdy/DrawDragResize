const canvas = document.getElementById('drawingBoard')
const toolbar = document.getElementById('toolbar')
const ctx = canvas.getContext('2d')
let ShapeChose = document.getElementById('ShapeChose')
let Rectangle = document.getElementById('Rectangle')
let circle = document.getElementById('circle')
let CheckNav = document.getElementById('CheckNav')
let Create = document.getElementById('Create')
let pen = document.getElementById('pen')
let LineWeight = document.getElementById('LineWeight');
let shapes = []
let startDraw = false
let paint = false;
let Color = document.getElementById('Color')
LineWeight.value = 3

canvas.width = window.innerWidth - (canvas.offsetLeft + 10)
canvas.height = window.innerHeight - canvas.offsetTop


window.addEventListener('resize', handleWindowResize);

function handleWindowResize() {
    canvas.width = window.innerWidth - (canvas.offsetLeft + 10)
    canvas.height = window.innerHeight - canvas.offsetTop
}

let startx;
let starty
let freestyle = []
let freex;
let freey;
let tip2 = document.getElementById('tip2')
let secondtip = true




tip2.addEventListener('click', function () {
    secondtip=!secondtip
    if (secondtip == true) {
        tip2.classList.add('d-block')
        tip2.classList.remove('d-none')
    } else {
        tip2.classList.remove('d-block')
        tip2.classList.add('d-none')
    }
})

CheckNav.addEventListener('click', function () {
    if (toolbar.offsetWidth == 250) {
        toolbar.style.width = 0
        toolbar.style.padding = 0
        canvas.width = window.innerWidth - (canvas.offsetLeft + 10)
        canvas.height = window.innerHeight - canvas.offsetTop
        Getstyle()
        draw_shape()
    }
    else {

        canvas.width = window.innerWidth - (canvas.offsetLeft + 10)
        canvas.height = window.innerHeight - canvas.offsetTop
        toolbar.style.width = 250 + 'px'
        toolbar.style.padding = 20 + 'px'


        Getstyle()
        draw_shape()
    }

}

)


function Getstyle() {
    if (freestyle.length > 0) {
        ctx.lineWidth = LineWeight
        ctx.lineCap = 'round'
        ctx.strokeStyle = Color.value

        for (let x of freestyle) {

            ctx.lineTo(x.x1, x.y1)
        }
        ctx.stroke()
        ctx.beginPath();    
    }
    localStorage.setItem('freestyle',JSON.stringify(freestyle))
}


const draw = (e) => {

    if (startDraw == true) {
        if (!paint) {
            return;
        }

        ctx.lineWidth = LineWeight
        ctx.lineCap = 'round'
        freex = e.clientX - canvas.offsetLeft
        freey = e.clientY
        freestyle.push({ x1: freex, y1: freey })

        ctx.lineTo(freex, freey)

        ctx.stroke()

        localStorage.setItem('freestyle',JSON.stringify(freestyle))

        }
}

const drawTouch = (e) => {
    if (startDraw == true) {
        if (!paint) {
            return;
        }

        ctx.lineWidth = LineWeight
        ctx.lineCap = 'round'

        freex = e.touches[0].clientX - canvas.offsetLeft
        freey = e.touches[0].clientY
        freestyle.push({ x1: freex, y1: freey })

        ctx.lineTo(freex, freey)
        ctx.stroke()
        localStorage.setItem('freestyle',JSON.stringify(freestyle))

        }
}
let tip1 = document.getElementById('tip1')

function FreeDraw() {

    startDraw = !startDraw
    if (startDraw == true) {
        pen.classList.add("Active")
        tip1.classList.add('d-none')
        tip1.classList.remove('d-block')
    }
    else {
        pen.classList.remove("Active")
        tip1.classList.remove('d-none')
        tip1.classList.add('d-block')
    }
}

toolbar.addEventListener('click', (e) => {

    if (e.target.id == 'Clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        freestyle=[]
        shapes=[]
        localStorage.removeItem('freestyle')
        localStorage.removeItem('shapes')
    }
})

toolbar.addEventListener('change', (e) => {


    if (e.target.id == 'Color') {
        ctx.strokeStyle = e.target.value


    }
    if (e.target.id == 'LineWeight') {
        LineWeight = e.target.value


    }
})

canvas.addEventListener('mousedown', (e) => {
    paint = true
    startx = e.clientX
    starty = e.clientY
})
canvas.addEventListener('touchstart', (e) => {
    paint = true
    startx = e.touches[0].clientX
    starty = e.touches[0].clientY
})

canvas.addEventListener('mouseup', (e) => {
    paint = false
    ctx.stroke()
    ctx.beginPath()
})
canvas.addEventListener('touchend', (e) => {
    paint = false

    ctx.stroke()
    ctx.beginPath()
})



canvas.addEventListener('mousemove', draw)
canvas.addEventListener('touchmove', drawTouch)


let draw_shape = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Getstyle()
        for (let shape of shapes) {
        if (shape.type == 'Rectangle') {
            ctx.beginPath();
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
        } else if (shape.type == 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x1, shape.y1, shape.Radius, 0, 2 * Math.PI);
            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.stroke();
        }
    }
    localStorage.setItem('shapes',JSON.stringify(shapes))

}

if(localStorage.getItem('freestyle')!=null){
    freestyle=JSON.parse(localStorage.getItem('freestyle'))
    Getstyle()
}

if(localStorage.getItem('shapes')!=null){
    shapes=JSON.parse(localStorage.getItem('shapes'))
    draw_shape()
}


circle.classList.add('d-none')


ShapeChose.addEventListener('change', () => {
    if (ShapeChose.value == 'Rectangle') {
        Rectangle.classList.add('d-block')
        Rectangle.classList.remove('d-none')



        circle.classList.add('d-none')
    }
    else {
        circle.classList.add('d-block')
        circle.classList.remove('d-none')



        Rectangle.classList.add('d-none')
        Rectangle.classList.remove('d-block')

    }
})

let width = document.getElementById('width')
let height = document.getElementById('height')
let Radius = document.getElementById('Radius')

function getValue() {
    
    let color = document.getElementById('Color')
    if (ShapeChose.value == 'Rectangle') {

        shapes.push({ type: 'Rectangle', x: (canvas.width / 2), y: (canvas.height / 2), width: +(width.value), height: +(height.value), color: color.value })
        draw_shape()

    }
    else if (ShapeChose.value == 'circle') {


        shapes.push({ type: 'circle', x1: (canvas.width / 2), y1: (canvas.height / 2), Radius: +(Radius.value), color: color.value })
        draw_shape()
    }

}

let current_Shapeindex = null;
let drag = false
let Resize = false
let isshape = function (x, y, shape) {
    if (shape.type == "Rectangle") {
        let shape_left = shape.x - shape.width /1.2;
        let shape_right = shape.x + shape.width /1.2;
        let shape_top = shape.y - shape.height /1.2;
        let shape_bottom = shape.y + shape.height /1.2;

        if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
            return true;
        }
    }
    else if (shape.type == "circle") {
        let shape_left = shape.x1 - shape.Radius
        let shape_right = (shape.x1 - shape.Radius) + shape.Radius * 2
        let shape_top = shape.y1 - shape.Radius
        let shape_bottom = (shape.y1 - shape.Radius) + shape.Radius * 2
        if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
            return true
        }
    }
}


let mouse_down = function (event) {
    event.preventDefault();
    startx = parseInt(event.clientX) - canvas.offsetLeft

    starty = parseInt(event.clientY) - canvas.offsetTop
    let index = 0
    for (let shape of shapes) {
        if (isshape(startx, starty, shape)) {
            current_Shapeindex = index
            
            drag = true
            return;
        } else {
            drag = false
        }
        index++;
    }
}


let touch_down = function (event) {
    event.preventDefault();
    startx = parseInt(event.touches[0].clientX) - canvas.offsetLeft

    starty = parseInt(event.touches[0].clientY) - canvas.offsetTop
    let index = 0
    for (let shape of shapes) {
        if (isshape(startx, starty, shape)) {
            current_Shapeindex = index
            drag = true
            return;
        } else {
            drag = false
        }
        index++;
    }
}



let mouse_move = function (event) {

    if (!drag) {
        return
    } else {
        ctx.beginPath(); 
        
        let mousex = parseInt(event.clientX) - canvas.offsetLeft
        let mousey = parseInt(event.clientY) - canvas.offsetTop

        let dx = mousex - startx
        let dy = mousey - starty
        let current_shape = shapes[current_Shapeindex]
        if (shapes[current_Shapeindex].type == 'Rectangle') {

            current_shape.x += dx
            current_shape.y += dy
            draw_shape()
            startx = mousex
            starty = mousey
        } else if (shapes[current_Shapeindex].type == 'circle') {
            current_shape.x1 += dx
            current_shape.y1 += dy
            draw_shape()
            startx = mousex
            starty = mousey
        }


    }
}
let touch_move = function (event) {
    if (!drag) {
        return
    } else {
        ctx.beginPath(); 
        startDraw == false
        paint=false
        pen.classList.remove("Active")
        let mousex = parseInt(event.touches[0].clientX) - canvas.offsetLeft
        let mousey = parseInt(event.touches[0].clientY) - canvas.offsetTop

        let dx = mousex - startx
        let dy = mousey - starty
        let current_shape = shapes[current_Shapeindex]
        if (shapes[current_Shapeindex].type == 'Rectangle') {

            current_shape.x += dx
            current_shape.y += dy
            draw_shape()
            startx = mousex
            starty = mousey
        } else if (shapes[current_Shapeindex].type == 'circle') {
            current_shape.x1 += dx
            current_shape.y1 += dy
            draw_shape()
            startx = mousex
            starty = mousey
        }


    }
}

let mouse_up = function (event) {

    if (!drag) {
        return
    }
    event.preventDefault();
    drag = false

}


let mouse_out = function (event) {

    if (!drag) {
        return
    }
    event.preventDefault();
    drag = false

}
let resize = document.getElementById('resize')




let mouse_dbclick = function (event) {


    if (toolbar.offsetWidth == 0) {
        canvas.width = window.innerWidth - canvas.offsetLeft - 250 - 60
        canvas.height = window.innerHeight - canvas.offsetTop
        toolbar.style.width = 250 + 'px'
        toolbar.style.padding = 20 + 'px'
        draw()
        draw_shape()
        }


    event.preventDefault();
    drag = false
    startx = parseInt(event.clientX) - canvas.offsetLeft
    starty = parseInt(event.clientY) - canvas.offsetTop


    let index = 0
    for (let shape of shapes) {
        if (isshape(startx, starty, shape)) {



            Create.classList.add('d-none')
            Create.classList.remove('d-block')

            resize.classList.remove('d-none')
            resize.classList.add('d-block')

            current_Shapeindex = index

            Resize = true
            EditValue()

            return;
        } else {
            Create.classList.remove('d-none')
            Create.classList.add('d-block')

            resize.classList.add('d-none')
            resize.classList.remove('d-block')
            Resize = false
        }
        index++;

    }
}





function EditValue() {
    if (Resize == true) {

        if (shapes[current_Shapeindex].type == 'Rectangle') {
            circle.classList.add('d-none')
            Rectangle.classList.add('d-block')
            Rectangle.classList.remove('d-none')

            width.value = shapes[current_Shapeindex].width
            height.value = shapes[current_Shapeindex].height

        }
        else if (shapes[current_Shapeindex].type == 'circle') {
            circle.classList.add('d-block')
            circle.classList.remove('d-none')
            Rectangle.classList.add('d-none')
            Rectangle.classList.remove('d-block')




            Radius.value = shapes[current_Shapeindex].Radius
        }
    }
}

function changeSize() {
    if (shapes[current_Shapeindex].type == 'Rectangle') {
        circle.classList.add('d-none')
        Rectangle.classList.add('d-block')
        Rectangle.classList.remove('d-none')

        Create.classList.remove('d-none')
        Create.classList.add('d-block')

        resize.classList.add('d-none')
        resize.classList.remove('d-block')

        shapes[current_Shapeindex].width = width.value
        shapes[current_Shapeindex].height = height.value
        draw_shape()
    }
    else if (shapes[current_Shapeindex].type == 'circle') {
        circle.classList.add('d-block')
        circle.classList.remove('d-none')
        Rectangle.classList.add('d-none')
        Rectangle.classList.remove('d-block')

        Create.classList.remove('d-none')
        Create.classList.add('d-block')

        resize.classList.add('d-none')
        resize.classList.remove('d-block')

        shapes[current_Shapeindex].Radius = Radius.value
        draw_shape()
    }
}

canvas.onmousedown = mouse_down
canvas.ontouchstart = touch_down

canvas.onmouseup = mouse_up
canvas.ontouchend = mouse_up

canvas.onmouseout = mouse_out
canvas.ontouchend = mouse_up


canvas.onmousemove = mouse_move
canvas.ontouchmove = touch_move

canvas.ondblclick = mouse_dbclick


