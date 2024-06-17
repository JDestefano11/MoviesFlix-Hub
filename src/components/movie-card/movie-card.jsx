
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
    const handleHardClick = () => {
        onMovieClick(movie);
    }

    return (
        <div className="movie-card" onClick={handleHardClick}>
            <Card>
                <Card.Img variant="top" src={movie.ImageUrl} className="card-img-top" />
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
        </div>
    );
};
