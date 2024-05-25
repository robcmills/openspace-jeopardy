export const tileAspect = 71 / 40
export const columnCount = 6
export const rowCount = 6
export const tileGap = 4
export const xgaps = tileGap * (columnCount - 1)
export const ygaps = tileGap * (rowCount - 1)

const openSpaceJeopardyImgHeight = 720
const nonCategoryRowCount = rowCount - 1
const tileHeight = openSpaceJeopardyImgHeight / nonCategoryRowCount
const boardHeight = tileHeight * rowCount

const openSpaceJeopardyImgWidth = 1280
const tileWidth = openSpaceJeopardyImgWidth / columnCount
const boardWidth = tileWidth * columnCount
export const boardAspect = boardWidth / boardHeight
