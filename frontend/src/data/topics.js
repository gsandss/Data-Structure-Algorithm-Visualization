export const categories = ['Sorting algorithms', 'Linear structures', 'Non-linear structures']

export const topics = [
  [
    'bubble-sort',
    'Bubble Sort',
    0,
    'Swap adjacent values until the largest settles at the end.',
    'O(n²)',
    [
      'Compare neighboring values.',
      'Swap them if the left value is larger.',
      'After each pass, leave the largest remaining value in place and shorten the next pass.',
    ],
  ],
  [
    'selection-sort',
    'Selection Sort',
    0,
    'Find the smallest remaining value and move it into place.',
    'O(n²)',
    [
      'Scan the unsorted portion and track its smallest value.',
      'Swap that value into the first unsorted position.',
      'Move the boundary one position to the right.',
    ],
  ],
  [
    'insertion-sort',
    'Insertion Sort',
    0,
    'Grow a sorted prefix, one carefully placed value at a time.',
    'O(n²)',
    [
      'Lift the next value out of the unsorted portion.',
      'Shift larger values in the sorted prefix to the right.',
      'Insert the saved value in the gap.',
    ],
  ],
  [
    'merge-sort',
    'Merge Sort',
    0,
    'Combine neighboring sorted runs into longer ones.',
    'O(n log n)',
    [
      'Treat each value as a sorted run of length one.',
      'Compare the first available values of adjacent runs and write the smaller one.',
      'Double the run width and repeat until only one run remains.',
    ],
  ],
  [
    'quick-sort',
    'Quick Sort',
    0,
    'Choose a pivot and partition the values around it.',
    'O(n²)',
    [
      'Use the last value in a range as the pivot.',
      'Move values less than or equal to it to the left, then place the pivot.',
      'Repeat on each remaining range. Balanced partitions take O(n log n) time; consistently uneven ones can take O(n²).',
    ],
  ],
  ['array', 'Array', 1, 'Use an index to look up a value directly.'],
  ['stack', 'Stack', 1, 'Push and pop from the same end. The last item in is the first out.'],
  ['queue', 'Queue', 1, 'Join at the back and leave from the front, in arrival order.'],
  ['linked-list', 'Linked List', 1, 'Follow a chain of nodes, each pointing to the next.'],
  ['tree', 'Tree', 2, 'Follow parent-child connections from a root to its leaves.'],
  ['graph', 'Graph', 2, 'Explore a network by visiting neighboring nodes.'],
  ['heap', 'Heap', 2, 'Keep the smallest value at the root of a complete binary tree.'],
  ['hash-table', 'Hash Table', 2, 'Map a key to a bucket, then find its associated value.'],
  ['hash-set', 'Hash Set', 2, 'Use buckets to track membership and keep each value only once.'],
].map(([slug, title, group, summary, time, steps]) => ({
  slug,
  title,
  group,
  summary,
  time,
  steps,
  id: slug.replace('-sort', ''),
}))

export const practice = {
  array: [
    'A calendar can look up a day by its position.',
    'Select index 2. Which value is stored in the third slot?',
  ],
  stack: [
    'An undo history takes the most recent edit off the top.',
    'Push 9, then pop twice. Predict the second value you will remove.',
  ],
  queue: [
    'Print jobs leave the queue in the order they arrived.',
    'Enqueue 9. How many dequeues does it take to reach it?',
  ],
  'linked-list': [
    'A playlist can store a link from each song to the next.',
    'Start at the head. How many links lead to the tail?',
  ],
  tree: [
    'Folders form a hierarchy. A depth-first walk explores one branch before returning to its siblings.',
    'Visit A, then B. Which node is next in this left-first traversal?',
  ],
  graph: [
    'A transit map connects stations. Breadth-first search visits stations in order of their distance in edges from the start.',
    'Look for two routes to the same node. Will it enter the visit queue twice?',
  ],
  heap: [
    'A priority queue can use a min-heap to retrieve its smallest priority first.',
    'Extract the root. Predict which value will become the new minimum.',
  ],
  'hash-table': [
    'A lookup table stores a value under a key. This example uses integer keys modulo 4 and keeps colliding keys together in a bucket.',
    'Set key 6, then look up key 2. Can both values share one bucket?',
  ],
  'hash-set': [
    'A set records membership. This example chooses a bucket using the remainder modulo 4, then checks the keys in that bucket.',
    'Add key 6 twice. Does the second addition create another entry?',
  ],
}
