function BubbleSort(array, position, steps, colorSteps) {
    let arr = array.slice();
    let n = arr.length;
    let colors = new Array(n).fill(0);
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        colors[j] = 1;
        colors[j + 1] = 1;
  
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
  
          colors[j] = 2;
          colors[j + 1] = 2;
  
          steps.push(arr.slice());
          colorSteps.push(colors.slice());
        }
  
        colors[j] = 0;
        colors[j + 1] = 0;
      }
      colors[n - i - 1] = 2;
    }
  
    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
  }
  
  export default BubbleSort;
  