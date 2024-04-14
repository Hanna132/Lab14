const fs = require('fs');

function readGraph(file) {
  const data = fs.readFileSync(file, 'utf8').trim().split('\n');
  const [n, m] = data[0].split(' ').map(Number);
  const edges = data.slice(1).map(line => line.split(' ').map(Number));
  return { n, m, edges };
}

function checkReflexive(graph) {
  const { edges, n } = graph;
  for (let i = 1; i <= n; i++) {
    if (!edges.some(e => e[0] === i && e[1] === i)) {
      return false;
    }
  }
  return true;
}

function checkAsymmetric(graph) {
  const { edges } = graph;
  for (const edge of edges) {
    if (edges.some(e => e[0] === edge[1] && e[1] === edge[0])) {
      return false;
    }
  }
  return true;
}

// Вибір файлу графа та параметрів рефлексивності та асиметричності з командного рядка
const [,, graphFile, reflexiveParam, asymmetricParam] = process.argv;

const graph = readGraph(graphFile);
let reflexive = false;
let asymmetric = false;

// Перевірка рефлексивності та асиметричності на підставі параметрів командного рядка
if (reflexiveParam === 'рефлексивне') {
  reflexive = checkReflexive(graph);
}

if (asymmetricParam === 'асиметричне') {
  asymmetric = checkAsymmetric(graph);
}

console.log(Файл графа: ${graphFile});
if (reflexiveParam === 'рефлексивне') {
  console.log(Рефлексивний: ${reflexive});
}
if (asymmetricParam === 'асиметричне') {
  console.log(Асиметричний: ${asymmetric});
}