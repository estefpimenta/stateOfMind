import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  // Hooks
  const [ frase, setFrase ] = useState("")
  const [ autor, setAutor ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [copiado, setCopiado] = useState(false)


  // Função para gerar uma nova frase com FECTH
  async function gerarFrase() {

    try {
      setLoading(true)
      const response = await fetch("https://api.quotable.io/random")
      const data = await response.json()
      setFrase(data.content)
      setAutor(data.author)
    } catch (error) {
      console.error("Erro ao buscar frase:", error)
      setFrase("Ops! Não foi possível carregar a frase. Tente novamente.")
      setAutor("")
    }
    finally {
      setLoading(false)
    }

    setTimeout(() => {
      const random = frasesMock[Math.floor(Math.random() * frasesMock.length)]
      setFrase(random)
      setLoading(false)
    }, 500)
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
    <div>
      <h1>State of Mind</h1>

      {loading ? (<p>Carregando...</p>) : (<p>{frase}</p>)}
      <p><em>{autor || "Autor desconhecido"}</em></p>

      <button onClick={gerarFrase}>New sentence</button>
      <button onClick={copiarFrase}>
        {copiado ? "Copied ✅" : "Copy sentence"}
      </button>
    </div>
  )
}

export default App
