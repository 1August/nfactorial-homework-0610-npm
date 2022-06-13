const setOfColor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

const root = document.documentElement
const colorPicker = document.querySelector('#color')
const randomColorBtn = document.querySelector('.randomColor')
const form = document.querySelector('form')

// Working with colors
/**
 * Convert HEX to RGB
 * @param hex
 * @return {number[]|null}
 */
const getRgbNumber = hex => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const hexNumber = [parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16)]
    return res ? hexNumber : null
}
/**
 * Modify rgb array to reverse codes
 * @param rgbArr
 * @return {number[]}
 */
const getReverseRgb = rgbArr => [255 - +rgbArr[0], 255 - +rgbArr[1], 255 - +rgbArr[2]]
/**
 * Modify rgb array to darker codes
 * @param rgbArr
 * @return {number[]}
 */
const getDarkerRgb = rgbArr => rgbArr.map(color => Math.round(+color / 2))
/**
 * Modify rgb array to lighter codes
 * @param rgbArr
 * @return {number[]}
 */
const getLighterRgb = rgbArr => rgbArr.map(color => (Math.floor((255 - +color) / 2)) + +color)
/**
 * @param arr array or rgb color
 * @param opacity (default 1) opacity to set rgba
 * @return {`rgba(${string}, ${string}, ${string}, 1)`}
 */
const convertRgbArrToRgb = (arr, opacity = 1) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`

/**
 * Render random HEX string
 * @return {string}
 */
const getRandomColor = () => {
    const length = 6
    let res = '#'
    for (let i = 0; i < length; i++)
        res += setOfColor[Math.floor(Math.random() * setOfColor.length)]
    return res
}
/**
 * Set variables in css
 * @param hexCol
 * @param reverseCol
 * @param lighterCol
 * @param darkerCol
 */
const setColors = ({ hexCol, reverseCol, lighterCol, darkerCol }) => {
    root.style.setProperty('--bg-color', hexCol)
    root.style.setProperty('--text-color', convertRgbArrToRgb(reverseCol))
    root.style.setProperty('--lighter-color', convertRgbArrToRgb(lighterCol))
    root.style.setProperty('--darker-color', convertRgbArrToRgb(darkerCol))
}
/**
 * Get colors object
 * @param color
 * @return {{darkerCol: number[], rgbArr: (number[]|null), lighterCol: number[], hexCol, reverseCol: number[]}}
 */
const getColorsSet = color => ({
    hexCol: color,
    rgbArr: getRgbNumber(color),
    reverseCol: getReverseRgb(getRgbNumber(color)),
    lighterCol: getLighterRgb(getRgbNumber(color)),
    darkerCol: getDarkerRgb(getRgbNumber(color))
})

// Getting color from session or local storage and setting it
const setInitialColor = () => {
    const session = sessionStorage.getItem('user-color') ?? null
    const local = localStorage.getItem('user-color') ?? null
    console.log(local)
    if (!session) console.log('no session')
    setColors(getColorsSet(local ?? '#acacac'))
}
setInitialColor()

/**
 * @param saveColorObj
 * @param saveStorage
 */
const setColorAndSave = (saveColorObj, saveStorage) => {
    setColors(getColorsSet(saveColorObj))
    saveStorage(saveColorObj)
}

// Working with storages
/**
 * Set sessionStorage
 * @param color
 */
const setSession = color => {
    sessionStorage.setItem('user-color', color)
}
/**
 * Set localStorage
 * @param color
 */
const setLocal = color => {
    localStorage.setItem('user-color', color)
}

// Events
randomColorBtn.addEventListener('click', () => setColorAndSave(getRandomColor(), setLocal))
colorPicker.addEventListener('change', e => setColorAndSave(e.target.value, setLocal))
form.addEventListener('submit', e => {
    e.preventDefault()
    const inputVal = form.querySelector('input').value
    if (!inputVal) return
    setColorAndSave(inputVal, setSession)
})