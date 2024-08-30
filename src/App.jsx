import { useState } from 'react'
import './App.css'

function App() {
 
  const urlBase ="https://api.themoviedb.org/3/search/movie"
  const API_KEY="4a26af029ee9135de33fb4f33e8e56f4"

  //LOGICA 
  const[pelicula,setPelicula]= useState("") // contiene el estado de la busqueda ingresada para el manejo cuando se cambia en el buscador
  const [bdPelicula, setBdPelicula] = useState([]); // maneja el cambio de estado de la BD de la api 

  


  const handleInputChange =(e)=>{
    setPelicula(e.target.value)
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    fetchPeliculas()
  }

  const fetchPeliculas = async() =>{
    try{
      const response = await fetch(`${urlBase}?query=${pelicula}&api_key=${API_KEY}`)
      const data= await response.json()
      setBdPelicula(data.results)

    }catch(err){
      console.log("Se produjo el error: ",err)
    }
  }



  //RENDERIZADO (lo que devuelve)
  return (
    <div className='container'>
     <h1 className='title'>Buscador de Peliculas</h1>

    <form onSubmit={handleSubmit}>
      <input type="text" 
        placeholder='Ingrese Pelicula'
        value={pelicula}
        onChange={handleInputChange}
      />
      <button type='submit' className='search-button' >Buscar</button>
    </form>

    <div className='movie-list'>
    {bdPelicula.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>

        ))}
    </div>
    </div>
  )
}

export default App
