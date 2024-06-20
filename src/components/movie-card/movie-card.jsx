import React from 'react';
import { Button, Card } from 'react-bootstrap';


export const MovieCard = ({ movie, onMovieClick }) => {
    const handleHardClick = () => {
        onMovieClick(movie);
    };

    return (
        <Card>
            <Card.Img variant="top" src={movie.ImageUrl} alt={movie.Title} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                    Genre: {movie.Genre.Name}
                </Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link" className="btn-link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};
