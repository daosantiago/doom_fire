const firePixelsArray = []
const fireWidth = 40
const fireHeight = 40
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
//Blue fire
//const fireColorsPalette = [{"r":0,"g":0,"b":0},{"r":7,"g":7,"b":7},{"r":7,"g":7,"b":80},{"r":35,"g":0,"b":95},{"r":75,"g":0,"b":130},{"r":95,"g":43,"b":200},{"r":115,"g":43,"b":175},{"r":120,"g":43,"b":200},{"r":138,"g":43,"b":226},{"r":25,"g":25,"b":112},{"r":25,"g":0,"b":112},{"r":0,"g":0,"b":128},{"r":0,"g":0,"b":139},{"r":0,"g":0,"b":205},{"r":0,"g":0,"b":230},{"r":0,"g":0,"b":255},{"r":65,"g":105,"b":225},{"r":72,"g":61,"b":139},{"r":106,"g":90,"b":205},{"r":123,"g":104,"b":238},{"r":95,"g":158,"b":160},{"r":70,"g":130,"b":180},{"r":70,"g":130,"b":195},{"r":100,"g":149,"b":237},{"r":30,"g":144,"b":255},{"r":176,"g":196,"b":222},{"r":0,"g":191,"b":255},{"r":135,"g":206,"b":235},{"r":135,"g":206,"b":250},{"r":173,"g":216,"b":230},{"r":176,"g":224,"b":230},{"r":190,"g":224,"b":230},{"r":230,"g":230,"b":235},{"r":200,"g":220,"b":250},{"r":230,"g":230,"b":250},{"r":240,"g":248,"b":255},{"r":255,"g":255,"b":255}]


function start() {
    createFireDataStructure()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex  = column + (fireWidth * row)

            updateFireIntensityPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight){
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = 
        belowPixelFireIntensity  - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() {
    debug = false
    let html = '<table cellpadding=0 cellspacing=0>'    

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++){
            const pixelIndex = column + ( fireWidth * row )
            const fireIntensity = firePixelsArray[pixelIndex]

            if (debug){
                html += '<td>'
                //html += '<div class="pixel-index">' + pixelIndex + '</div>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else{
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r}, ${color.g}, ${color.b}`
                //html += '<td class = "pixel" style="background-color: rgb(' + colorString + ')">'
                html += `<td class = "pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
       const overflowPixelIndex = fireWidth * fireHeight
       const pixelIndex = (overflowPixelIndex - fireWidth) + column

       firePixelsArray[pixelIndex] = 35
    }
}

start()