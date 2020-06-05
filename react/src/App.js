import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Nav, NavItem, NavLink, Button,
  Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem
} from 'reactstrap';
import Movie from './components/Movie';

const App = () => {

  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    async function fetchData() {
    const response = await fetch('/new-movies')
    const jsonResponse = await response.json()
    setMovieList(jsonResponse.movies)

    const responseWish = await fetch('/wishlist-movie')
    
    const responseWishJson = await responseWish.json()

    const whishlistFromDb = responseWishJson.movies.map((movie,i) => {
      return {movieName: movie.movieName, movieImg: movie.movieImg}
    })
    setMoviesWishList(whishlistFromDb)
    setMoviesCount(responseWishJson.movies.length)
    }
    fetchData();
  }, [])

  const handleClickAddMovie = async (movieName, movieImg) => {
    setMoviesCount(moviesCount+1)
    setMoviesWishList([...moviesWishList, {movieName, movieImg}])

    await fetch('/whishlist-movie', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${movieName}&img=${movieImg}`
    })
  };

  const handleClickDeleteMovie = async (movieName) => {
    setMoviesCount(moviesCount-1)
    setMoviesWishList(moviesWishList.filter(element => element.movieName !== movieName))
    await fetch(`/whishlist-movie/${movieName}`, {
      method: 'DELETE'
    })
  };

  var wishList = moviesWishList.map((movie, i) => {
    return <ListGroupItem key={i} onClick={() => handleClickDeleteMovie(movie.movieName)} ><img width="25%" src={movie.movieImg} alt={movie.movieName} /> {movie.movieName}</ListGroupItem>
  });

  var movieListItems = movieList.map((movie, i) => {
    let movieInWishList = moviesWishList.find(element => element.movieName === movie.title);
    let isLiked = false;
    if (movieInWishList !== undefined) {
      isLiked = true
    }

    var result = movie.overview

    if (movie.overview.length > 80) {
      result = result.slice(0, 80)+'...'
    }

    var urlImage = '/img/generique.jpg'

    if(movie.backdrop_path !== null) {
      urlImage = 'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path
    }

    return <Movie key={i} movieLiked={isLiked} movieName={movie.title} movieDesc={result} movieImg={urlImage} globalRating={movie.popularity} globalCountRating={movie.vote_count} handleClickAddMovie={handleClickAddMovie} handleClickDeleteMovie={handleClickDeleteMovie} />;
  });
  
  return (
    <div style={{backgroundColor:"#232528", paddingTop: 10}}>
      <Container>
        <Row>
          <Nav>
            <NavItem>
              <img src='/img/logo.png' alt='logo'/>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"white", fontWeight: "bold", fontSize: 29, position: "relative", bottom: 10}}>OLLACINÉ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"white"}}>Last Releases</NavLink>
            </NavItem>
            <NavItem>
              <Button color="secondary" id="Popover1" type="button">{moviesCount} films</Button>{' '}
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>Wishlist</PopoverHeader>
                <PopoverBody>
                  <ListGroup>
                    {wishList}
                  </ListGroup>
                </PopoverBody>
              </Popover>
            </NavItem>
          </Nav>
        </Row>
        <Row xs="1" lg="2" xl="3">
          {movieListItems}
        </Row>
      </Container>
    </div>
  );
}

export default App;
