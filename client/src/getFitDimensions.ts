interface GetFitDimensionsArgs {
  aspectRatio: number;
  height: number;
  width: number;
}

export function getFitDimensions({ aspectRatio, height, width }: GetFitDimensionsArgs) {
  return (width / height) > aspectRatio
    ? { height, width: height * aspectRatio }
    : { height: width / aspectRatio, width }
}
