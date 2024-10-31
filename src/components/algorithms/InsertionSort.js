function insertionSort(array, position, steps, colorSteps) {
    let arr = array.slice();
    let colors = new Array(arr.length).fill(0);
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      colors[i] = 1;
      steps.push(arr.slice());
      colorSteps.push(colors.slice());
  
      while (j >= 0 && arr[j] > key) {
        colors[j] = 1;
  
        arr[j + 1] = arr[j];
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        colors[j] = 0;
        j--;
      }
  
      arr[j + 1] = key;
      colors[i] = 2;
      steps.push(arr.slice());
      colorSteps.push(colors.slice());
  
      colors.fill(0, 0, i + 1);
      colors[i] = 2;
    }
  
    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
  }
  
  export default insertionSort;