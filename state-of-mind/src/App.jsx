import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  // Hooks
  const [ frase, setFrase ] = useState("")
  const [ autor, setAutor ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [ fade, setFade ] = useState(true)


  // Função para gerar uma nova frase com FECTH
  async function gerarFrase() {

    try {
      setFade(false)
      setLoading(true)
      const response = await fetch("https://type.fit/api/quotes")
      const data = await response.json()
      const random = data[Math.floor(Math.random() * data.length)]

      setTimeout(() => {
        setFrase(random.text)
        setAutor(random.author)
        setFade(true)
        setLoading(false)
      }, 300)
      
    } catch (error) {
      console.error("Erro ao buscar frase:", error)
      setFrase("Ops! Não foi possível carregar a frase. Tente novamente.")
      setAutor("")
      setLoading(false)
      setFade(true)
    }
   
  }

  // Função para copiar a frase para a área de transferência
  function copiarFrase() {
  navigator.clipboard.writeText(`${frase} - ${autor}`)
  setCopiado(true)
  
  setTimeout(() => {
    setCopiado(false)
  }, 5000)
}

  useEffect(() => {gerarFrase()}, [])

  return (
    <div className="container">
      <div className="card">

        <h1 className="logo">
          <span className="logo-top">STATE OF</span>
          <span className="logo-bottom">MIND</span>
        </h1>

        <p className={`frase ${fade ? "fade-in" : "fade-out"}`}>
          {frase}
        </p>

        <div className="divider" />

        <div className="footer">
          <p className='autor'>
            <em>{autor || "Autor desconhecido"}</em>
          </p>
        </div>
        

        <div className="buttons">
          <button onClick={gerarFrase}>New sentence</button>
          <button onClick={copiarFrase}>
            {copiado ? "Copied ✅" : "Copy sentence"}
          </button>
        </div>

      </div>
      
    </div>
  )
}

export default App
