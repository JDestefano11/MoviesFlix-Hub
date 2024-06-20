import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    const handleHardClick = () => {
        onMovieClick(movie);
    };

    const cardStyles = {
        width: '250px', // Fixed width for each card
        marginBottom: '20px', // Space between cards
        backgroundColor: '#1a1a1a', // Dark background color
        color: '#f0f0f0', // Light text color
        border: '1px solid #333', // Dark border
        borderRadius: '10px', // Rounded corners
    };

    const imageStyles = {
        height: '350px', // Fixed height for the movie poster
        objectFit: 'cover', // Cover to maintain aspect ratio
        borderTopLeftRadius: '10px', // Rounded corners for top
        borderTopRightRadius: '10px',
    };

    return (
        <Card style={cardStyles}>
            <Card.Img variant="top" src={movie.ImageUrl} alt={movie.Title} style={imageStyles} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                    Genre: {movie.Genre.Name}
                </Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link" className="btn-link" style={{ color: '#007bff' }}>
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};
