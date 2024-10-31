function countingSortForRadix(arr, exp, steps, colorSteps) {
    let n = arr.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);
    let colors = new Array(n).fill(0);
  
    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }
  
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
  
    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
    }
  
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      colors[i] = 1;
      steps.push(arr.slice());
      colorSteps.push(colors.slice());
      colors[i] = 0;
    }
  }
  
  function radixSort(arr, position, steps, colorSteps) {
    let max = Math.max(...arr);
    let colors = new Array(arr.length).fill(0);
  
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSortForRadix(arr, exp, steps, colorSteps);
    }
  
    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
  }
  
  export default radixSort;