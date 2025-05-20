let array = [];
const container = document.getElementById("array-container");

function generateArray() {
  array = [];
  container.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "#f8b400";
      bars[j + 1].style.backgroundColor = "#f8b400";
      await sleep(100);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      bars[j].style.backgroundColor = "#ff2e63";
      bars[j + 1].style.backgroundColor = "#ff2e63";
    }
    bars[array.length - i - 1].style.backgroundColor = "#00ff00";
  }
  bars[0].style.backgroundColor = "#00ff00";
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[i].style.backgroundColor = "#f8b400";

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "#f67280";
      await sleep(100);

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) bars[minIndex].style.backgroundColor = "#ff2e63";
        minIndex = j;
      } else {
        bars[j].style.backgroundColor = "#ff2e63";
      }
    }

    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[minIndex].style.height = `${array[minIndex]}px`;

    bars[minIndex].style.backgroundColor = "#ff2e63";
    bars[i].style.backgroundColor = "#00ff00";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.backgroundColor = "#f8b400";
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      j--;
      await sleep(100);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${array[j + 1]}px`;

    for (let k = 0; k <= i; k++) {
      bars[k].style.backgroundColor = "#00ff00";
    }
  }
}

async function mergeSort(start, end) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const bars = document.getElementsByClassName("bar");

  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    bars[k].style.backgroundColor = "#f67280";
    await sleep(100);

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }

    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "#00ff00";
    k++;
  }

  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "#00ff00";
    i++;
    k++;
    await sleep(100);
  }

  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = `${array[k]}px`;
    bars[k].style.backgroundColor = "#00ff00";
    j++;
    k++;
    await sleep(100);
  }
}

// Initial array
window.onload = generateArray;
