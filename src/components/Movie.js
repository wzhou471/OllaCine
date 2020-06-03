import React, { useState } from 'react';
import { 
    Col, Button, Card, CardImg, CardText, CardBody,
    CardTitle, Badge, ButtonGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'

const Movie = (props) => {

    const [likeMovie, setLikeMovie] = useState(false);
    const [watchMovie, setWatchMovie] = useState(false);
    const [countWatchMovie, setCountWatchMovie] = useState(0);
    const [myRatingMovie, setMyRatingMovie] = useState(0);
    const [rating] = useState(props.globalRating);
    const [countRating] = useState(props.globalCountRating);
    const [isRatingMovie, setIsRatingMovie] = useState(false);

    const handleLikeClick = () => {
        setLikeMovie(!likeMovie);
    }
    
    if (likeMovie) {
        var likeColor = {color: '#e74c3c', cursor:"pointer"}
    } else {
        likeColor = {cursor:"pointer"}
    }

    const handleCameraClick = () => {
        setWatchMovie(true);
        setCountWatchMovie(countWatchMovie+1)
    }

    if (watchMovie) {
        var cameraColor = {color: '#e74c3c'}
    } else {
        cameraColor = {}
    }

    const setMyRating = (myRating) => {
        if (myRating >= 0 && myRating <= 10) {
            setMyRatingMovie(myRating)
            setIsRatingMovie(true)
        }
    }

    let myNote = [];
    for (let index = 0; index < 10; index++) {
        let color = {};
        if (myRatingMovie > index) {
            color = {color: '#f1c40f'};
        }
        let count = index+1;
        myNote.push(<FontAwesomeIcon onClick={() => setMyRating(count)} icon={faStar} style={color} key={index} />)
    }

    let nbTotalNote = rating * countRating;
    let nbTotalVote = countRating;

    if (isRatingMovie) {
        nbTotalVote += 1;
        nbTotalNote += myRatingMovie;
    }

    let avgTotal = Math.round(nbTotalNote / nbTotalVote)

    let tabGlobalRating = [];
    for (let index = 0; index < 10; index++) {
        let color = {};
        if (index < avgTotal) {
            color = {color: '#f1c40f'};
        }
        tabGlobalRating.push(<FontAwesomeIcon icon={faStar} style={color} key={index} />)
    }

    return (
        <Col style={{marginTop: 30}}>
            <Card>
            <CardImg top width="100%" src={props.movieImg} alt={props.movieName} />
            <CardBody>
                <p>Like <FontAwesomeIcon icon={faHeart} style={likeColor} onClick={() => handleLikeClick()} /></p>
                <p>Nombre de vues <FontAwesomeIcon icon={faVideo} style={cameraColor} onClick={() => handleCameraClick()} /> <Badge color="secondary">{countWatchMovie}</Badge></p>
                <p>
                Mon avis {myNote}
                <ButtonGroup size="sm">
                    <Button onClick={() => setMyRating(myRatingMovie-1)}>-</Button>
                    <Button onClick={() => setMyRating(myRatingMovie+1)}>+</Button>
                </ButtonGroup>
                </p>
                <p>Moyenne {tabGlobalRating} ({nbTotalVote})</p>
                <CardTitle>{props.movieName}</CardTitle>
                <CardText>{props.movieDesc}</CardText>
            </CardBody>
            </Card>
        </Col>
    );
}

export default Movie;
