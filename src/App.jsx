import {useEffect, useState} from 'react'

import s from './App.module.css'

function getMovies(params, action){
    // Default options are marked with *
    fetch(`http://www.omdbapi.com/?apikey=d349d42&${params}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

    }).then(response => {
        if(response.status === 200)
              return response.json()

    })
        .then(data => {
            if(data.Response === "True")
                action(data);
        })
}


function search(text, year, setMovies){
    return getMovies(`${text.length > 0 ? `s=${text}` : ""}${year ? `&y=${year}` : ""}`, (data) => setMovies(data.Search))
}

function getMovie(id, setMovie){
    return getMovies(`i=${id}`, (movie) => {
        console.log(movie);
        setMovie(movie);
    })
}

function App() {

    const [movie, setMovie] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [year, setYear] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setText("love");
        search(text, "", setMovies)
    }, [text, setText, setMovies]);


  return (
    <>

        <div className={s.searchContainer}>
            <input type="text" className={s.year} placeholder={"Year"} value={year} onChange={e => setYear(e.target.value)}/>
            <input type="text" className={s.search} placeholder={"Search"} value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={() => search(text, year, setMovies)}>Send</button>
        </div>

        <div className={s.movies}>
            {movies.map((movie) =>
                <>
                    <div className={s.movie} onClick={() => { getMovie(movie.imdbID, setMovie);  setIsOpen(true)}}>
                        <div className={s.imgContainer}>
                            <img src={movie.Poster} alt=""/>
                        </div>
                        <div className={s.title}>
                            {movie.Title}
                        </div>
                        <div className={s.title}>
                            {movie.Title}
                        </div>
                    </div>
                </>
             )}
        </div>

        <div style={{display: !isOpen ? "none" : undefined }} className={s.modal}>
            <div className={s.movieDescription}>
                <div className={s.closeModal} onClick={() => {setMovie(undefined); setIsOpen(false)}}>x</div>
                <div style={{display: movie !== undefined ? "none" : undefined}}>Загрузка...</div>

                {movie !== undefined && <>
                        <div className={s.imgContainer}>
                            <img src={movie.Poster} alt=""/>
                        </div>
                        <div className={s.description}>
                            <span>Title:</span> {movie.Title}
                            <span>Year:</span> {movie.Year}
                            <span>Actors:</span> {movie.Actors}
                            <span>Country:</span> {movie.Country}
                            <span>Released:</span> {movie.Released}
                        </div>


                </>}

            </div>
        </div>

    </>
  )
}

export default App
