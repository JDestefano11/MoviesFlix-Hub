import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    const handleHardClick = () => {
        onMovieClick(movie);
    }

    return (
        <div onClick={handleHardClick} style={{ cursor: "pointer" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.ImageUrl} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                        Genre: {movie.Genre.Name}
                    </Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">
                        Open
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};