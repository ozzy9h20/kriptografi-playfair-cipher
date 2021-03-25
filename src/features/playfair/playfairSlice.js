import { createSlice } from "@reduxjs/toolkit";

export const playfairSlice = createSlice({
  name: 'playfair',
  initialState: {
    plaintext: localStorage.getItem('plaintext') || 'MOCHAMMAD ENDYARROZIQIN',
    sliced_plaintext: [],
    key: localStorage.getItem('key') || 'TEKNIK INFORMATIKA',
    rendered_key: [],
    ciphertext_arr: [],
    ciphertext: ''
  },
  reducers: {
    crypt: state => {
      state.sliced_plaintext = state.plaintext
        .replace(/J/g,'I')
        .split(' ')
        .reduce((acc,cur,idx) => {
          acc.push([]);
          for (let i = 0; i < cur.length; i++) {
            if(i === cur.length - 1 || cur[i] === cur[i+1]) {
              acc[idx].push(cur[i]+'Z');
            } else {
              acc[idx].push(cur.slice(i,i+2));
              i++;
            }
          }
          return acc;
        }, []);

      const findKey = (lt) => {
        const c = state.rendered_key.find(x => x.includes(lt));
        const rowIndex = state.rendered_key.indexOf(c);
        const colIndex = c.indexOf(lt);
        return [rowIndex,colIndex];
      }

      state.ciphertext_arr = state.sliced_plaintext.map(word => {
        return word.map(substr => {
          const [lt1, lt2] = substr;        
          const [rowIndex1, colIndex1] = findKey(lt1);
          const [rowIndex2, colIndex2] = findKey(lt2);
      
          if (rowIndex1 === rowIndex2) {
            return state.rendered_key[rowIndex1][(colIndex1+1)%5] 
              + state.rendered_key[rowIndex2][(colIndex2+1)%5];
          } else if (colIndex1 === colIndex2) {
            return state.rendered_key[(rowIndex1+1)%5][colIndex1] 
              + state.rendered_key[(rowIndex2+1)%5][colIndex2];
          } else {
            return state.rendered_key[rowIndex1][colIndex2] 
              + state.rendered_key[rowIndex2][colIndex1];
          }
        });
      });

      state.ciphertext = state.ciphertext_arr.flat().join(' ');
    },
    render_key: (state) => {
      const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
      state.rendered_key = [
        ...new Set(
          [
            ...state.key,
            ...alphabet
          ])
        ]
        .filter(lt => alphabet.includes(lt))
        .reduce((acc,cur,idx) => {
          const row = Math.floor((idx)/5);
          !acc[row] && acc.push([]);
          acc[row].push(cur);
          return acc;
        }, []);
    },
    update_plain: (state, action) => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
      const processed = action.payload
        .toUpperCase()
        .split('')
        .filter(lt => alphabet.includes(lt))
        .join('');

      state.plaintext = processed;
      localStorage.setItem('plaintext', processed);
    },
    update_key: (state,action) => {
      const processed = action.payload
        .toUpperCase()
      state.key = processed;
      localStorage.setItem('key', processed);
    }
  },
});

export const { crypt, update_plain, update_key, render_key } = playfairSlice.actions;

export default playfairSlice.reducer;