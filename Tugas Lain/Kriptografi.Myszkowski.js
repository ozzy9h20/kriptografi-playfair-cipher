const plain = "TENTUKAN PRIORITAS ANDA SEBAB KITA TIDAK DAPAT MENGERJAKAN SEMUANYA X"
const key = "BOROBUDUR"

const sortedKey = [...key.toUpperCase()].sort().join('');

const toMatrix = plain
    .split('')
    .filter(c => c !== ' ')
    .reduce((acc, next, idx) => {
    const loc = idx % key.length;
    !acc[loc] && acc.push([]);
    acc[loc].push(next);
    return acc;
  }, [])

const rotateMatrix = matrix => {
  return matrix.reduce((acc,next,idx) => {
    next.forEach((j,jidx) => {
      !acc[jidx] && acc.push([]);
      acc[jidx][idx] = j
    })
    return acc;
  }, [])
}

const matrixSorted = key.split('').reduce((acc,next, idx) => {
  let { arr, vkey } = acc;
  const vkeyNext = vkey.indexOf(next)

  while(!arr[vkeyNext]) arr.push([]);
  arr[vkeyNext].push(toMatrix[idx]);

  return { arr, vkey };
}, {
  arr: [],
  vkey: [...new Set(sortedKey)].join('')
})

const rawCipher = matrixSorted
  .arr
  .map(x => {
    const output = [];
    x.length === 0 ? output.push(x[0]) : 
      x.forEach((y) => {
        y.forEach((z,zidx) => {
          while(!output[zidx]) output.push([])
          output[zidx].push(z);
        })
      })
    return output.flat();
  })

const cipher = rawCipher
  .flat()
  .map((c,idx) => (idx+1)%5 ? c : c+' ')
  .join('');

console.log("Kriptografi - Transposisi Myszkowwski\n\n ")
console.log("Plaintext: \n" + plain);
console.log("\nKey:\n" + key);
console.log("\nSortedKey:\n" + sortedKey);

console.log("\nRawCipher: \n");
console.table(rawCipher);

console.log("\nCipher:\n" + cipher);
// Output: TURIN EIIAM RAUAA AAANS ETIRD STTPT JKAYN POAAK ADAEA MNKNT SBBDK EGNEX 

console.log("\nTabel awal: \n");
console.table(rotateMatrix(toMatrix));

console.log("\nTabel sorted: \n");
console.table(matrixSorted.arr);
