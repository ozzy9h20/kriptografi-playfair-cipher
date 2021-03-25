import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update_plain, update_key, crypt, render_key } from './playfairSlice';
import Field from './Field';

const Playfair = () => {
  const playfair = useSelector(state => state.playfair);
  const dispatch = useDispatch();

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = () => {
    playfair.key && dispatch(render_key());
    (playfair.plaintext && playfair.key) && dispatch(crypt());
  }

  return (
    <div className="ui form">
      <Field
        label="plaintext"
        onChange={(e) => {
          dispatch(update_plain(e.target.value))
          handleChange();
        }}
        value={playfair.plaintext}
      />
      <Field
        label="key"
        onChange={(e) => {
          dispatch(update_key(e.target.value))
          handleChange();
        }}
        value={playfair.key}
      />

      <table className="ui table celled">
        <tbody>
          <tr>
            <td className="collapsing">Sliced Plaintext</td>
            <td>{playfair.sliced_plaintext.flat().join(" ")}</td>
          </tr>
          <tr>
            <td>ChiperText</td>
            <td>{playfair.ciphertext}</td>
          </tr>
          <tr>
            <td>Rendered Key</td>
            <td>
              <table className="ui table celled collapsing">
                <tbody>
                {playfair.key && playfair.rendered_key.map((row,rid) => 
                    <tr key={'row'+rid}>
                      {row.map((col,cid) => 
                        <td key={'col'+rid+cid}>{col}</td>
                      )}
                    </tr>
                )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )  
}

export default Playfair;