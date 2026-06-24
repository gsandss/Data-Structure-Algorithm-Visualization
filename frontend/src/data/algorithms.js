
export const algorithms = {
    insertionSort: {
        name: "Insertion Sort",
        description: "Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
    },

    selectionSort: {
        name: "Selection Sort",
        description: "Selection Sort is a comparison-based sorting algorithm. It sorts by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element.",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
        steps: [
            "Scan the unsorted portion of the array to find the smallest element.",
            "Swap that smallest element with the first element in the unsorted portion.",
            "Move the boundary between sorted and unsorted portions one position to the right.",
            "Repeat until the entire array is sorted."
        ]
    },

    quickSort: {
        name: "Quick Sort",
        description: "Quick sort is a sorting algorithm based on the Divide and Conquer that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.",
        timeComplexity: "O(nlogn)",
        spaceComplexity: "O(logn)",
        steps: [
            "Choose a pivot element from the array.",
            "Partition the array into two halves: values less than the pivot and values greater than the pivot.",
            "Recursively sort the left and right partitions.",
            "Combine the partitions and pivot to form a sorted array."            
        ]
    },

    mergeSort: {
        name: "Merge Sort",
        description: "Merge sort is a popular sorting algorithm known for its efficiency and stability. It follows the Divide and Conquer approach. It works by recursively dividing the input array into two halves, recursively sorting the two halves and finally merging them back together to obtain the sorted array.",
        timeComplexity: "O(nlogn)",
        spaceComplexity: "O(n)",
        steps: [
            "Split the array into two halves until each subarray has one element.",
            "Merge adjacent subarrays by comparing their elements and writing the smaller one first.",
            "Continue merging until you rebuild a single sorted array.",
            "Each merge step preserves order and builds the final sorted array."            
        ]
    },

    bubbleSort: {
        name: "Bubble Sort",
        description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not efficient for large data sets as its average and worst-case time complexity are quite high.",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
        steps: [
            "Compare each pair of adjacent elements in the array.",
            "Swap them if they are in the wrong order.",
            "Repeat the process for each pass until no swaps are needed.",
            "The largest values bubble to the end of the array first."            
        ]
    },
}
