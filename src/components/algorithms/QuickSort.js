function quickSort(array, position, steps, colorSteps) {
    let arr = array.slice();
    let colors = new Array(arr.length).fill(0);
  
    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
  
      colors[high] = 1;
  
      for (let j = low; j < high; j++) {
        colors[j] = 0;
        colors[high] = 1;
  
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
  
          colors[i] = 2;
          colors[j] = 2;
  
          steps.push(arr.slice());
          colorSteps.push(colors.slice());
        }
  
        colors[j] = 0;
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      colors[i + 1] = 2;
      colors[high] = 2;
  
      steps.push(arr.slice());
      colorSteps.push(colors.slice());
  
      return i + 1;
    };
  
    const quickSortRecursive = (arr, low, high) => {
      if (low < high) {
        let pi = partition(arr, low, high);
  
        quickSortRecursive(arr, low, pi - 1);
        quickSortRecursive(arr, pi + 1, high);
      }
    };
  
    quickSortRecursive(arr, 0, arr.length - 1);
  
    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
  }
  
  export default quickSort;