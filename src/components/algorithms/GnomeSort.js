function gnomeSort(arr, position, steps, colorSteps) {
    let n = arr.length;
    let index = 0;
    let colors = new Array(n).fill(0);

    while (index < n) {
        if (index === 0) {
            index++;
        }

        colors[index] = 1;
        colors[index - 1] = 1;
        steps.push(arr.slice());
        colorSteps.push(colors.slice());

        if (arr[index] >= arr[index - 1]) {
            colors[index] = 0;
            colors[index - 1] = 0;
            index++;
        } else {
            let temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;

            colors[index] = 2;
            colors[index - 1] = 2;
            steps.push(arr.slice());
            colorSteps.push(colors.slice());

            colors[index] = 0;
            colors[index - 1] = 0;

            index--;
        }
    }

    colors.fill(2);
    steps.push(arr.slice());
    colorSteps.push(colors.slice());
}

export default gnomeSort;