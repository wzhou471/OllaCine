import React from 'react';
import { 
    Col, Button, Card, CardImg, CardText, CardBody,
    CardTitle, Badge, ButtonGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'

const Movie = (props) => {

    var tabGlobalRating = [];
    for (let index = 0; index < 10; index++) {
        let color = {};
        if (index < props.globalRating) {
            color = {color: '#f1c40f'}
        }
        tabGlobalRating.push(<FontAwesomeIcon icon={faStar} style={color}/>)
    }

    return (
        <Col style={{marginTop: 30}}>
            <Card>
            <CardImg top width="100%" src={props.movieImg} alt={props.movieName} />
            <CardBody>
                <p>Like <FontAwesomeIcon icon={faHeart} style={{cursor:"pointer"}}/></p>
                <p>Nombre de vues <FontAwesomeIcon icon={faVideo} /> <Badge color="secondary">0</Badge></p>
                <p>
                Mon avis <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <ButtonGroup size="sm">
                    <Button>-</Button>
                    <Button>+</Button>
                </ButtonGroup>
                </p>
                <p>Moyenne {tabGlobalRating} ({props.globalCountRating})</p>
                <CardTitle>{props.movieName}</CardTitle>
                <CardText>{props.movieDesc}</CardText>
            </CardBody>
            </Card>
        </Col>
    );
}

export default Movie;
