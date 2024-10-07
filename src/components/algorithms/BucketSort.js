function bucketSort(arr, position, steps, colorSteps) {
    let n = arr.length;
    let colors = new Array(n).fill(0);
    let buckets = [];
    let maxVal = Math.max(...arr);
    let bucketCount = Math.floor(Math.sqrt(n));

    for (let i = 0; i < bucketCount; i++) {
        buckets.push([]);
    }

    for (let i = 0; i < n; i++) {
        let bucketIndex = Math.floor((arr[i] / maxVal) * (bucketCount - 1));
        buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    let sortedArray = [];
    for (let i = 0; i < bucketCount; i++) {
        sortedArray = sortedArray.concat(buckets[i]);
    }

    for (let i = 0; i < n; i++) {
        arr[i] = sortedArray[i];
        colors[i] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());

        colors[i] = 2;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
    }

    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
}

export default bucketSort;
