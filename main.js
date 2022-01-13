const canvas = document.getElementById('preview')
const fileInput = document.querySelector('input[type="file"]')

const context = canvas.getContext('2d')


fileInput.onchange = e => {
    //xu li upload 1 file
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = event => {
        const image = new Image()
        image.onload = () => {
            //const [width, height] = clampDimensions(image.width, image.height)

            canvas.width = image.width
            canvas.height = image.height

            context.drawImage(image, 0, 0)
            //, width, height)
            //const grayScales = 
            convertToGrayScales(context, canvas.width, canvas.height)

            //drawAscii(grayScales, width)
            //getFontRatio()
        }


        image.src = event.target.result
    }
    reader.readAsDataURL(file)
}

// doi mau anh


const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b
//0.299 * r + 0.587 * g + 0.114 * b
//0.2627 * r + 0.6780 * g + 0.0593 *b
//0.8*r + 0.15*g + 0.05*b
const convertToGrayScales = (context, width, height) => {
    // Lấy data image từ canvas tại tọa độ [0,0]
    // với chiều rộng và chiều cao
    const imageData = context.getImageData(0, 0, width, height)

    const grayScales = []

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]

        const grayScale = toGrayScale(r, g, b)
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale

        grayScales.push(grayScale)
    }

    // Vẽ một bức ảnh dựa trên image data có sẵn,
    // bắt đầu tại tọa độ [0,0]
    context.putImageData(imageData, 0, 0)

    return grayScales
}

// // doi anh áng ki tu

// const grayRamp = //"*+ "
// //"10 "
// "@%10a*-=+:. "
//     //'$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. '
// const rampLength = grayRamp.length

// // Giá trị grayScale là một số nguyên từ 0 (black) đến 255 (white)
// const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)]
// const asciiImage = document.querySelector('pre#ascii')

// const drawAscii = (grayScales, width) => {
//     const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
//         let nextChars = getCharacterForGrayScale(grayScale)

//         if ((index + 1) % width === 0) {
//             nextChars += '\n'
//         }

//         return asciiImage + nextChars
//     }, '')

//     asciiImage.textContent = ascii
// }

// // giam do phan giai cua anh
// const MAXIMUM_WIDTH = 250
// const MAXIMUM_HEIGHT = 250

// const clampDimensions = (width, height) => {
//     const rectifiedWidth = Math.floor(fontRatio * width);
//     if (height > MAXIMUM_HEIGHT) {
//         //const reducedWidth = Math.floor((width * MAXIMUM_HEIGHT) / height)
//         const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
//         return [reducedWidth, MAXIMUM_HEIGHT]
//     }

//     if (width > MAXIMUM_WIDTH) {
//         //const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / width)
//         const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
//         return [MAXIMUM_WIDTH, reducedHeight]
//     }

//   //  return [width, height]
//   return [rectifiedWidth, height];
// }

// //Xử lý Aspect Ratio của ảnh
// const getFontRatio = () => {
//     const pre = document.createElement('pre')
//     pre.style.display = 'inline'
//     pre.textContent = ' '
  
//     document.body.appendChild(pre)
//     const { width, height } = pre.getBoundingClientRect()
//     document.body.removeChild(pre)
  
//     return height / width
//   }
  
//   const fontRatio = getFontRatio()
  