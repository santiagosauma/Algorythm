function selectionSort(arr, position, steps, colorSteps) {
    let n = arr.length;
    let colors = new Array(n).fill(0);

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        colors[minIndex] = 1;
        for (let j = i + 1; j < n; j++) {
            colors[j] = 1;

            steps.push(arr.slice());
            colorSteps.push(colors.slice());

            if (arr[j] < arr[minIndex]) {
                colors[minIndex] = 0;
                minIndex = j;
                colors[minIndex] = 1;
            }

            steps.push(arr.slice());
            colorSteps.push(colors.slice());

            colors[j] = 0;
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        colors[i] = 2;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());
    }

    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
}

export default selectionSort;
