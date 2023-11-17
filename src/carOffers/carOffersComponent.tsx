import React, { FC } from 'react';
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { CarOffer } from './types';

interface CarOffersComponentProps {
    carOffers: CarOffer[];
}

export const CarOffersComponent: FC<CarOffersComponentProps> = (props) => {
    const renderCarOffers = (carOffers: CarOffer[]) => {
        return carOffers
            .sort((a, b) => b.id - a.id)
            .slice(0, 8)
            .map((carOffers) => {
                const { id, title, sold } = carOffers;

                return (
                    <ListGroup.Item key={id}>
                        <Row>
                            <Col md="9">{title}</Col>
                            <Col md="3" style={{ textAlign: 'end' }}>
                                <Badge bg={sold ? 'success' : 'warning'}>{sold ? 'Vendue' : 'En vente'}</Badge>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                );
            });
    };

    return (
        <>
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Annonces</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {renderCarOffers(props.carOffers)}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    );
};
