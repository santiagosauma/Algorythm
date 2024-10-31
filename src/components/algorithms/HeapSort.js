function heapify(arr, n, i, steps, colorSteps, sortedIndex) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let colors = new Array(arr.length).fill(0);

    for (let k = sortedIndex; k < arr.length; k++) {
        colors[k] = 2;
    }

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        colors[i] = 1;
        colors[largest] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());

        heapify(arr, n, largest, steps, colorSteps, sortedIndex);
    }

    steps.push(arr.slice());
    colorSteps.push(colors.slice());
}

function heapSort(arr, position, steps, colorSteps) {
    let n = arr.length;
    let colors = new Array(arr.length).fill(0);

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, steps, colorSteps, n);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];

        colors.fill(0);
        for (let k = i; k < arr.length; k++) {
            colors[k] = 2;
        }
        colors[0] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());

        heapify(arr, i, 0, steps, colorSteps, i);

        for (let k = i; k < arr.length; k++) {
            colors[k] = 2;
        }
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
    }

    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
}

export default heapSort;