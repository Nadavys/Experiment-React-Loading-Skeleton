import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LoremIpsum } from "lorem-ipsum";
import './App.css'
const Lorem = new LoremIpsum()

function App() {
  const [data, setData] = useState({ body: null, title: null, image: null })

  useEffect(() => {
    setTimeout(() => {
      setData((prev) => ({ ...prev, title: Lorem.generateSentences(1) }))
    }, 1000)

    setTimeout(() => {
      setData((prev) => ({ ...prev, body: Lorem.generateSentences(10) }))
    }, 2000)

    setTimeout(() => {
      fetch('https://source.unsplash.com/random').then(
        (result) => {
          setData((prev) => ({ ...prev, image: result.url }))

        }
      )
    }, 3000)
  }, [])


  return (
    <div className="container">
      <BlogPost {...data} />
    </div>
  );
}

function BlogPost(props) {
  return (
    <div>
      <h1>{props.title || <Skeleton />}</h1>
      <p>{props.body || <Skeleton count={10} />}</p>
      <div className="image-block">{props.image && <img src={props.image} height="300" /> || <Skeleton width={300} wrapper={Box} height={300} />}</div>
    </div>
  )
}

function Box({ children }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '0.5rem',
        height: '300px',
        width: '300px'
      }}
    >
      {children}
    </div>
  )
}

export default App;

