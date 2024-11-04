const barsContainer = document.getElementById("barsContainer");
const algorithmSelect = document.getElementById("algorithm");
let bars = [];

function generateBars(num = 30) {
    barsContainer.innerHTML = "";
    bars = Array.from({ length: num }, () => Math.floor(Math.random() * 100) + 10);
    bars.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        barsContainer.appendChild(bar);
    });
}

async function startSorting() {
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case "bubble":
            await bubbleSort();
            break;
        case "selection":
            await selectionSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "quick":
            await quickSort(0, bars.length - 1);
            break;
        case "merge":
            await mergeSort(0, bars.length - 1);
            break;
    }
}

function swap(bars, i, j) {
    [bars[i], bars[j]] = [bars[j], bars[i]];
}

async function bubbleSort() {
    const barElements = Array.from(barsContainer.children);
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            barElements[j].style.background = "orange";
            barElements[j + 1].style.background = "orange";

            if (bars[j] > bars[j + 1]) {
                swap(bars, j, j + 1);
                barElements[j].style.height = `${bars[j] * 3}px`;
                barElements[j + 1].style.height = `${bars[j + 1] * 3}px`;
            }
            await new Promise(resolve => setTimeout(resolve, 50));

            barElements[j].style.background = "#61dafb";
            barElements[j + 1].style.background = "#61dafb";
        }
        barElements[bars.length - i - 1].classList.add("sorted");
    }
}

async function selectionSort() {
    const barElements = Array.from(barsContainer.children);
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            barElements[j].style.background = "orange";
            barElements[minIndex].style.background = "orange";
            await new Promise(resolve => setTimeout(resolve, 50));
            if (bars[j] < bars[minIndex]) {
                minIndex = j;
            }
            barElements[j].style.background = "#61dafb";
            barElements[minIndex].style.background = "#61dafb";
        }
        if (minIndex !== i) {
            swap(bars, i, minIndex);
            barElements[i].style.height = `${bars[i] * 3}px`;
            barElements[minIndex].style.height = `${bars[minIndex] * 3}px`;
        }
        barElements[i].classList.add("sorted");
    }
}

async function insertionSort() {
    const barElements = Array.from(barsContainer.children);
    for (let i = 1; i < bars.length; i++) {
        let j = i;
        while (j > 0 && bars[j] < bars[j - 1]) {
            barElements[j].style.background = "orange";
            barElements[j - 1].style.background = "orange";
            swap(bars, j, j - 1);
            barElements[j].style.height = `${bars[j] * 3}px`;
            barElements[j - 1].style.height = `${bars[j - 1] * 3}px`;
            await new Promise(resolve => setTimeout(resolve, 50));
            barElements[j].style.background = "#61dafb";
            barElements[j - 1].style.background = "#61dafb";
            j--;
        }
        barElements[i].classList.add("sorted");
    }
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = bars[high];
    const barElements = Array.from(barsContainer.children);
    barElements[high].style.background = "red";
    let i = low - 1;
    for (let j = low; j < high; j++) {
        barElements[j].style.background = "orange";
        if (bars[j] < pivot) {
            i++;
            swap(bars, i, j);
            barElements[i].style.height = `${bars[i] * 3}px`;
            barElements[j].style.height = `${bars[j] * 3}px`;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        barElements[j].style.background = "#61dafb";
    }
    swap(bars, i + 1, high);
    barElements[high].style.background = "#61dafb";
    barElements[i + 1].style.height = `${bars[i + 1] * 3}px`;
    barElements[high].style.height = `${bars[high] * 3}px`;
    barElements[i + 1].classList.add("sorted");
    return i + 1;
}

async function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const left = bars.slice(start, mid + 1);
    const right = bars.slice(mid + 1, end + 1);
    let k = start, i = 0, j = 0;
    const barElements = Array.from(barsContainer.children);
    while (i < left.length && j < right.length) {
        barElements[k].style.background = "orange";
        await new Promise(resolve => setTimeout(resolve, 50));
        if (left[i] <= right[j]) {
            bars[k] = left[i];
            i++;
        } else {
            bars[k] = right[j];
            j++;
        }
        barElements[k].style.height = `${bars[k] * 3}px`;
        barElements[k].style.background = "#61dafb";
        k++;
    }
    while (i < left.length) {
        bars[k] = left[i];
        barElements[k].style.height = `${bars[k] * 3}px`;
        i++;
        k++;
    }
    while (j < right.length) {
        bars[k] = right[j];
        barElements[k].style.height = `${bars[k] * 3}px`;
        j++;
        k++;
    }
    for (let i = start; i <= end; i++) {
        barElements[i].classList.add("sorted");
    }
}

// Generate initial bars on load
generateBars();
