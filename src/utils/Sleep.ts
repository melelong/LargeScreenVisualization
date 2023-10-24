const Sleep = (time: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export default Sleep