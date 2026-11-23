const sessions = new Map();

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const { availableAlgorithms, createState, advance } = require('../../frontend/src/sorting/engine.mjs');

function listAlgorithms(req, res) {
  res.json({ algorithms: availableAlgorithms });
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
  const state = createState(algorithm, array);

  sessions.set(id, { algorithm, state });
  res.json({ id, algorithm, state });
}

function getState(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json({ id, algorithm: session.algorithm, state: session.state });
}

function stepSimulation(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });

  const { algorithm, state } = session;
  if (state.finished) return res.json({ id, algorithm, state });

  advance(algorithm, state);

  res.json({ id, algorithm, state });
}

function runToCompletion(req, res) {
  const { id } = req.params;
  const session = sessions.get(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  const { algorithm, state } = session;

  while (!state.finished) advance(algorithm, state);

  res.json({ id, algorithm, state });
}

module.exports = {
  listAlgorithms,
  startSimulation,
  getState,
  stepSimulation,
  runToCompletion,
};
