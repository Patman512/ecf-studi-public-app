import React, { FC } from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Rating } from './types';

interface RatingsComponentProps {
    ratings: Rating[];
    addRating: () => void;
}

export const RatingsComponent: FC<RatingsComponentProps> = (props) => {
    const renderRecentRatingsToBeReviewed = (ratings: Rating[]) => {
        return ratings
            .sort((a, b) => b.creationDateUnix - a.creationDateUnix)
            .slice(0, 2)
            .map((ratingEntry) => {
                const { id, authorName, comment, rating, creationDateUnix } = ratingEntry;

                return (
                    <Card key={id} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Card.Header>
                            <Row>
                                <Col md="4">
                                    <Badge pill bg="warning" text="dark">
                                        {rating}
                                    </Badge>
                                </Col>
                                <Col md="4" style={{ textAlign: 'center' }}>
                                    {authorName}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>{comment}</Card.Body>
                        <Card.Footer style={{ textAlign: 'end' }}>
                            {new Date(creationDateUnix * 1000).toLocaleDateString('fr-FR')}
                        </Card.Footer>
                    </Card>
                );
            });
    };

    return (
        <Container style={{ margin: 0, padding: 0 }}>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <Button onClick={props.addRating}>Laisser un avis</Button>
                </Col>
            </Row>
            <Row>
                <Col>{renderRecentRatingsToBeReviewed(props.ratings)}</Col>
            </Row>
        </Container>
    );
};
