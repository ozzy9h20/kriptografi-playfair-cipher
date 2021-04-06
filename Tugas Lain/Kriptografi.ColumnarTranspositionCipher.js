const plain = "TENTUKAN PRIORITAS ANDA SEBAB KITA TIDAK DAPAT MENGERJAKAN SEMUANYA X"
const key = "PENTING"

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

const matrixSorted = sortedKey.split('').reduce((acc,next, idx) => {
  let { arr, vkey } = acc;
  const vkeyNext = vkey.indexOf(next)

  arr.push(toMatrix[vkeyNext]);
  vkey = vkey.split('').map((c,cidx) => cidx === vkeyNext ? " " : c).join('');

  return { arr, vkey };
}, {
  arr: [],
  vkey: key
})

const cipher = matrixSorted
  .arr
  .flat()
  .map((c,idx) => (idx+1)%4 ? c : c+' ')
  .join('');

console.log("Plaintext: \n" + plain);
console.log("\nKey:\n" + key);
console.log("\nSortedKey:\n" + sortedKey);
console.log("\nCipher:\n" + cipher);
// Output: EPAE AAGN YAIA IKEK AUON BDTJ MNRS BTPE SAKR DKAM AUTN TSTD NANT IAAI AREX

console.log("\nTabel awal: \n");
console.table(rotateMatrix(toMatrix));

console.log("\nTabel sorted: \n");
console.table(rotateMatrix(matrixSorted.arr));
