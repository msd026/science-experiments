"use client"

// components/experiments/SortingExperiment.tsx
import { useState, useEffect } from "react";
import Button from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Slider from "../ui/slider";
import Label from "../ui/label";

type Algorithm = "bubble" | "selection" | "insertion";

const SortingExperiment = () => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);

  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(100 - speed);
        }
      }
    }
  };

  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(100 - speed);
    }
  };

  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        arr[j + 1] = key;
        setArray([...arr]);
        await sleep(100 - speed);
      }
    }
  };

  const startSort = async () => {
    setIsSorting(true);
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
    }
    setIsSorting(false);
  };

  return (
    <div className="space-y-6">
      <div className="h-[300px] bg-gray-50 rounded-lg p-4 flex items-end justify-center gap-1">
        {array.map((value, index) => (
          <div
            key={index}
            className="w-4 bg-blue-500 rounded-t"
            style={{ height: `${value * 2}px` }}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Algorithm</Label>
          <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble Sort</SelectItem>
              <SelectItem value="selection">Selection Sort</SelectItem>
              <SelectItem value="insertion">Insertion Sort</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Array Size</Label>
          <Slider
            value={[arraySize]}
            onValueChange={([value]) => setArraySize(value)}
            min={5}
            max={50}
            step={1}
            disabled={isSorting}
          />
          <span>{arraySize}</span>
        </div>

        <div className="space-y-2">
          <Label>Speed</Label>
          <Slider
            value={[speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={0}
            max={90}
            step={1}
          />
          <span>{speed}</span>
        </div>

        <div className="flex gap-4">
          <Button onClick={startSort} disabled={isSorting}>
            Start Sorting
          </Button>
          <Button onClick={generateArray} variant="outline" disabled={isSorting}>
            Generate New Array
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortingExperiment;
