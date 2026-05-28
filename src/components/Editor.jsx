import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const Editor = () => {
  const cmRef = useRef(null)

  useEffect(()=>{
    const textarea = document.getElementById('realtimeEditor')
    if(!textarea) return

    // avoid double-init (React StrictMode mounts components twice in dev)
    if (cmRef.current) return

    cmRef.current = CodeMirror.fromTextArea(textarea,{
      mode: {name :'javascript', json:true},
      theme: 'dracula',
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    })

    return () => {
      // cleanup: destroy editor and restore original textarea
      if (cmRef.current) {
        cmRef.current.toTextArea()
        cmRef.current = null
      }
    }
  },[])
  return (
    <textarea id='realtimeEditor' ></textarea>
  )
}

export default Editor