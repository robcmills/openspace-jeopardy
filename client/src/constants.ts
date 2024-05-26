export const columnCount = 6
export const rowCount = 6

const openSpaceJeopardyImgHeight = 720
const nonCategoryRowCount = rowCount - 1
const tileHeight = openSpaceJeopardyImgHeight / nonCategoryRowCount
const boardHeight = tileHeight * rowCount

const openSpaceJeopardyImgWidth = 1280
const tileWidth = openSpaceJeopardyImgWidth / columnCount
const boardWidth = tileWidth * columnCount
export const boardAspect = boardWidth / boardHeight
