import React, { useState } from 'react';
import { 
  Container, Row, Nav, NavItem, NavLink, Button,
  Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem
} from 'reactstrap';
import Movie from './components/Movie';

const App = () => {

  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  var moviesData = [
    {name:"Star Wars : L'ascension de Skywalker", desc:"La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img:"/img/starwars.jpg", note:6.7, vote:5},
    {name:"Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img:"/img/maleficent.jpg", note:8.2, vote:3},
    {name:"Jumanji: The Next Level", desc: "L'équipe est de retour, mais le jeu a changé. Alors qu'ils retournent dans Jumanji pour secourir ...", img:"/img/jumanji.jpg", note:4, vote:5},
    {name:"Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton - star déclinante d'une série télévisée de western - et Cliff Booth ...", img:"/img/once_upon.jpg", note:6, vote:7},
    {name:"La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d'Arendelle à la recherche de réponses ...", img:"/img/frozen.jpg", note:4.6, vote:3},
    {name:"Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img:"/img/terminator.jpg", note:6.1, vote:1},
  ];

  const handleClickAddMovie = (movieName, movieImg) => {
    setMoviesCount(moviesCount+1)
    setMoviesWishList([...moviesWishList, {movieName, movieImg}])
  };

  const handleClickDeleteMovie = (movieName) => {
    setMoviesCount(moviesCount-1)
    setMoviesWishList(moviesWishList.filter(element => element.movieName !== movieName))
  };

  var wishList = moviesWishList.map((movie, i) => {
    return <ListGroupItem key={i} onClick={() => handleClickDeleteMovie(movie.movieName)} ><img width="25%" src={movie.movieImg} alt={movie.movieName} />{movie.movieName}</ListGroupItem>
  });

  var movieList = moviesData.map((movie, i) => {
    let movieInWishList = moviesWishList.find(element => element.movieName === movie.name);
    let isLiked = false;
    if (movieInWishList !== undefined) {
      isLiked = true
    }
    return <Movie key={i} movieLiked={isLiked} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} globalRating={movie.note} globalCountRating={movie.vote} handleClickAddMovie={handleClickAddMovie} handleClickDeleteMovie={handleClickDeleteMovie} />;
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
          {movieList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
