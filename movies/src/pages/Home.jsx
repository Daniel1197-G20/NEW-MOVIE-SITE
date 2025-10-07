import MovieCard from "../component/MovieCard"



function Home() {
    const movies = [
        {id: 1, title: "John Wick", release_date: "2014"},
        {id: 2, title: "Super man", release_date: "2014"},
        {id: 3, title: "Bat man", release_date: "2014"},
        {id: 4, title: "The flash", release_date: "2014"},
        {id: 5, title: "The Bad guys", release_date: "2014"},
    ];

    const handleSearch = () => {};
    return (<div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="search for movies..." className="search-input"/>
            <button type="submit" className="search-button"></button>
        </form>
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/>
        ))}
        </div>
    </div>
    );
}

export default Home