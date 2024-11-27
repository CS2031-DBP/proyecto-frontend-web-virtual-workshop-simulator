import React from 'react'
import { useParams } from 'react-router-dom'

const usuario = () => {
    let{userName} = useParams();


  return (
    <div>
      <h3>nombre usuario</h3>
    </div>
  )
}

export default usuario
