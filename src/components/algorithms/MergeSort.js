function mergeSort(array, position, steps, colorSteps) {
    let arr = array.slice();
    let colors = new Array(arr.length).fill(0);
    let tempArray = Array(arr.length);
  
    const mergeHelper = (arr, left, mid, right) => {
      let i = left, j = mid + 1, k = left;
  
      while (i <= mid && j <= right) {
        colors[i] = 1;
        colors[j] = 1;
  
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        if (arr[i] <= arr[j]) {
          tempArray[k++] = arr[i++];
        } else {
          tempArray[k++] = arr[j++];
        }
  
        colors[i - 1] = 2;
        colors[j - 1] = 2;
  
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        colors.fill(0);
      }
  
      while (i <= mid) {
        colors[i] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        tempArray[k++] = arr[i++];
        colors.fill(0);
      }
  
      while (j <= right) {
        colors[j] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
  
        tempArray[k++] = arr[j++];
        colors.fill(0);
      }
  
      for (let i = left; i <= right; i++) {
        arr[i] = tempArray[i];
        colors[i] = 2;
      }
  
      steps.push(arr.slice());
      colorSteps.push(colors.slice());
    };
  
    const mergeSortRecursive = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortRecursive(arr, left, mid);
        mergeSortRecursive(arr, mid + 1, right);
        mergeHelper(arr, left, mid, right);
      }
    };
  
    mergeSortRecursive(arr, 0, arr.length - 1);
  
    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
  }
  
  export default mergeSort;
  