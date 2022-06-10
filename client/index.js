const setOfColor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

const root = document.documentElement
const colorPicker = document.querySelector('#color')
const btn = document.querySelector('button')

const getRandomColor = () => {
    const length = 6
    let res = '#'
    for (let i = 0; i < length; i++)
        res += setOfColor[Math.floor(Math.random() * setOfColor.length)]
    return res
}
const setColors = ({ mainColor, rgbNumber, reverseCol, rgbCol }) => {
    root.style.setProperty('--bg-color', mainColor)
    root.style.setProperty('--text-color', convertRgbArrToRgb(reverseCol))
    root.style.setProperty('--lighter-color', convertRgbArrToRgb(getLighterRgb(rgbNumber)))
    root.style.setProperty('--darker-color', convertRgbArrToRgb(getDarkerRgb(rgbNumber)))
}
const getColorsSet = color => ({
    mainColor: color,
    rgbNumber: getRgbNumber(color),
    reverseCol: getReverseRgb(getRgbNumber(color)),
    rgbCol: convertRgbArrToRgb(getReverseRgb(getRgbNumber(color)))
})

const getRgbNumber = hex => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const hexNumber = [parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[2], 16)]
    return res ? hexNumber : null
}
const getReverseRgb = rgbArr => [255 - +rgbArr[0], 255 - +rgbArr[1], 255 - +rgbArr[2]]
const getDarkerRgb = rgbArr => rgbArr.map(color => Math.round(+color / 2))
const getLighterRgb = rgbArr => rgbArr.map(color => (Math.floor((255 - +color) / 2)) + +color)
const convertRgbArrToRgb = (arr, opacity = 1) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`

btn.addEventListener('click', () => setColors(getColorsSet(getRandomColor())))
colorPicker.addEventListener('change', e => setColors(getColorsSet(e.target.value)))