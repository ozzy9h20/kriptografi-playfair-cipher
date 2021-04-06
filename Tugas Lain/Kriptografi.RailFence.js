const input = "TENTUKAN PRIORITAS ANDA SEBAB KITA TIDAK DAPAT MENGERJAKAN SEMUANYA X"

const crypt = input
  .split('')
  .filter(c => c !== ' ')
  .reduce((acc,next) => {
    let { arr, lastIdx, increment } = acc;
    if (lastIdx === 4 || lastIdx === 0) increment = !increment
    lastIdx = increment ? ++lastIdx : --lastIdx;
    !arr[lastIdx] && arr.push([]);
    arr[lastIdx].push(next)
    
    return {
      arr,
      lastIdx,
      increment
     };
  },{
    arr: [],
    lastIdx: 1,
    increment: false
  }
 );

const cipher = crypt.arr
  .flat()
  .map((c,idx) => (idx+1)%5===0 ? c+" " : c)
  .join('')

console.log(cipher)
// Output: TPSAD MKNEN RAABB IATEA AAYNA ITNEK TKANJ NUATK OIDSI ADPGR SMXUR ATAEE
