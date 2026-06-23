const sessions = new Map();

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const availableAlgorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick'];

function listAlgorithms(req, res) {
  res.json({ algorithms: availableAlgorithms });
}

function createBubbleState(arr) {
  return {
    array: Array.from(arr),
    n: arr.length,
    i: 0,
    j: 0,
    finished: false,
    lastCompared: null,
    lastSwapped: null,
  };
}

function createSelectionState(arr) {
  return {
    array: Array.from(arr),
    n: arr.length,
    i: 0,
    j: 1,
    minIndex: 0,
    finished: false,
    lastCompared: null,
    lastSwapped: null,
  };
}

function createInsertionState(arr) {
  return {
    array: Array.from(arr),
    n: arr.length,
    i: 1,
    j: null,
    key: null,
    shifting: false,
    finished: false,
    lastCompared: null,
    lastMoved: null,
    insertedIndex: null,
  };
}

function createMergeState(arr) {
  return {
    array: Array.from(arr),
    n: arr.length,
    width: 1,
    left: 0,
    merging: false,
    // merging helpers
    i: null,
    j: null,
    k: null,
    buffer: null,
    leftBound: null,
    rightBound: null,
    mid: null,
    finished: false,
    lastCompared: null,
    lastWritten: null,
  };
}

function createQuickState(arr) {
  return {
    array: Array.from(arr),
    n: arr.length,
    stack: [[0, arr.length - 1]],
    // partitioning state
    low: null,
    high: null,
    pivot: null,
    i: null,
    j: null,
    partitioning: false,
    finished: false,
    lastCompared: null,
    lastSwapped: null,
  };
}

function startSimulation(req, res) {
  const { algorithm, array } = req.body || {};
  if (!algorithm || !availableAlgorithms.includes(algorithm)) {
    return res.status(400).json({ error: 'Invalid or missing algorithm' });
  }
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: 'Missing or invalid array' });
  }

  const id = generateId();
  let state;
  switch (algorithm) {
    case 'bubble':
      state = createBubbleState(array);
      break;
    case 'selection':
      state = createSelectionState(array);
      break;
    case 'insertion':
      state = createInsertionState(array);
      break;
    case 'merge':
      state = createMergeState(array);
      break;
    case 'quick':
      state = createQuickState(array);
      break;
    default:
      // For other algorithms start with a simple full-sorted state (placeholder)
      state = {
        array: Array.from(array),
        finished: false,
      };
      state.array.sort((a, b) => a - b);
      state.finished = true;
      break;
  }

  sessions.set(id, { algorithm, state });
  res.json({ id, algorithm, state });
}

function getState(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({ id, algorithm: session.algorithm, state: session.state });
}

function stepBubble(state) {
  const { array, n } = state;
  if (state.finished) return state;

  // If array length less than 2, finish immediately
  if (n < 2) {
    state.finished = true;
    return state;
  }

  const jLimit = n - state.i - 2;
  // Compare current pair
  const a = array[state.j];
  const b = array[state.j + 1];
  state.lastCompared = [state.j, state.j + 1];
  state.lastSwapped = null;
  if (a > b) {
    // swap
    array[state.j] = b;
    array[state.j + 1] = a;
    state.lastSwapped = [state.j, state.j + 1];
  }

  // advance indices
  if (state.j < jLimit) {
    state.j += 1;
  } else {
    state.j = 0;
    state.i += 1;
  }

  if (state.i >= n - 1) {
    state.finished = true;
    state.lastCompared = null;
  }

  return state;
}

function stepSelection(state) {
  const { array, n } = state;
  if (state.finished) return state;

  if (n < 2) {
    state.finished = true;
    return state;
  }

  state.lastCompared = [state.j, state.minIndex];
  state.lastSwapped = null;
  if (array[state.j] < array[state.minIndex]) {
    state.minIndex = state.j;
  }

  state.j += 1;
  if (state.j >= n) {
    // swap min into position i
    if (state.minIndex !== state.i) {
      const t = array[state.i];
      array[state.i] = array[state.minIndex];
      array[state.minIndex] = t;
      state.lastSwapped = [state.i, state.minIndex];
    }
    state.i += 1;
    state.minIndex = state.i;
    state.j = state.i + 1;
  }

  if (state.i >= n - 1) {
    state.finished = true;
    state.lastCompared = null;
  }

  return state;
}

function stepInsertion(state) {
  const { array, n } = state;
  if (state.finished) return state;

  if (n < 2) {
    state.finished = true;
    return state;
  }

  if (!state.shifting) {
    if (state.i >= n) {
      state.finished = true;
      return state;
    }
    state.key = array[state.i];
    state.j = state.i - 1;
    state.shifting = true;
    state.lastCompared = [state.j, state.i];
    state.lastMoved = null;
    return state;
  }

  // shifting phase
  if (state.j >= 0 && array[state.j] > state.key) {
    state.lastCompared = [state.j, state.i];
    // move element right
    array[state.j + 1] = array[state.j];
    state.lastMoved = [state.j, state.j + 1];
    state.j -= 1;
    return state;
  }

  // insert key
  array[state.j + 1] = state.key;
  state.insertedIndex = state.j + 1;
  state.shifting = false;
  state.i += 1;
  state.lastCompared = null;
  state.lastMoved = null;
  return state;
}

function stepMerge(state) {
  if (state.finished) return state;
  const { array, n } = state;

  if (!state.merging) {
    if (state.width >= n) {
      state.finished = true;
      return state;
    }
    if (state.left >= n) {
      state.width *= 2;
      state.left = 0;
      return state;
    }

    const left = state.left;
    const mid = Math.min(left + state.width - 1, n - 1);
    const right = Math.min(left + 2 * state.width - 1, n - 1);
    if (mid >= right) {
      state.left += 2 * state.width;
      return state;
    }

    state.leftBound = left;
    state.mid = mid;
    state.rightBound = right;
    state.i = left;
    state.j = mid + 1;
    state.k = left;
    state.buffer = Array.from(array);
    state.merging = true;
    state.lastCompared = null;
    state.lastWritten = null;
    return state;
  }

  // perform one merge write
  const i = state.i;
  const j = state.j;
  const mid = state.mid;
  const right = state.rightBound;

  if (i <= mid && j <= right) {
    state.lastCompared = [i, j];
    if (state.buffer[i] <= state.buffer[j]) {
      array[state.k] = state.buffer[i];
      state.lastWritten = state.k;
      state.i += 1;
    } else {
      array[state.k] = state.buffer[j];
      state.lastWritten = state.k;
      state.j += 1;
    }
    state.k += 1;
    return state;
  }

  if (i <= mid) {
    array[state.k] = state.buffer[i];
    state.lastWritten = state.k;
    state.i += 1;
    state.k += 1;
    return state;
  }

  if (j <= right) {
    array[state.k] = state.buffer[j];
    state.lastWritten = state.k;
    state.j += 1;
    state.k += 1;
    return state;
  }

  // finished merging this pair
  state.merging = false;
  state.left += 2 * state.width;
  state.lastCompared = null;
  state.lastWritten = null;
  return state;
}

function stepQuick(state) {
  if (state.finished) return state;
  const { array } = state;

  if (!state.partitioning) {
    // get next range
    while (state.stack.length > 0) {
      const [low, high] = state.stack.pop();
      if (low < high) {
        state.low = low;
        state.high = high;
        state.pivot = array[high];
        state.i = low - 1;
        state.j = low;
        state.partitioning = true;
        state.lastCompared = null;
        state.lastSwapped = null;
        break;
      }
    }
    if (!state.partitioning) {
      state.finished = true;
      return state;
    }
  }

  // partition step
  if (state.j <= state.high - 1) {
    state.lastCompared = [state.j, state.high];
    if (array[state.j] <= state.pivot) {
      state.i += 1;
      // swap
      const t = array[state.i];
      array[state.i] = array[state.j];
      array[state.j] = t;
      state.lastSwapped = [state.i, state.j];
    } else {
      state.lastSwapped = null;
    }
    state.j += 1;
    return state;
  }

  // final pivot swap
  const pi = state.i + 1;
  const t = array[pi];
  array[pi] = array[state.high];
  array[state.high] = t;
  state.lastSwapped = [pi, state.high];
  // push subranges
  state.stack.push([state.low, pi - 1]);
  state.stack.push([pi + 1, state.high]);
  state.partitioning = false;
  state.lastCompared = null;
  return state;
}

function stepSimulation(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const { algorithm, state } = session;
  if (state.finished) return res.json({ id, algorithm, state });

  switch (algorithm) {
    case 'bubble':
      stepBubble(state);
      break;
    case 'selection':
      stepSelection(state);
      break;
    case 'insertion':
      stepInsertion(state);
      break;
    case 'merge':
      stepMerge(state);
      break;
    case 'quick':
      stepQuick(state);
      break;
    default:
      // Other algorithms are not stepped yet — mark finished
      state.finished = true;
      break;
  }

  res.json({ id, algorithm, state });
}

function runToCompletion(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  const { algorithm, state } = session;

  switch (algorithm) {
    case 'bubble':
      while (!state.finished) stepBubble(state);
      break;
    case 'selection':
      while (!state.finished) stepSelection(state);
      break;
    case 'insertion':
      while (!state.finished) stepInsertion(state);
      break;
    case 'merge':
      while (!state.finished) stepMerge(state);
      break;
    case 'quick':
      while (!state.finished) stepQuick(state);
      break;
    default:
      state.finished = true;
      break;
  }

  res.json({ id, algorithm, state });
}

module.exports = {
  listAlgorithms,
  startSimulation,
  getState,
  stepSimulation,
  runToCompletion,
};
