import React, { FC, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CarOffer } from './types';

interface Filters {
    priceMin?: number;
    priceMax?: number;
    mileageMin?: number;
    mileageMax?: number;
    yearMin?: number;
    yearMax?: number;
}

interface CarOffersComponentProps {
    carOffers: CarOffer[];
    preview?: boolean;
    onModalOpen: (offer: CarOffer) => void;
}

export const CarOffersComponent: FC<CarOffersComponentProps> = (props) => {
    const [filters, setFilters] = useState<Filters>({});

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFilters({ ...filters, [name]: value });
    };

    const renderFiltersForm = () => {
        return (
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Col lg="4">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Prix</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        name="priceMin"
                                        placeholder="Minimum"
                                        onChange={changeHandler}
                                    />
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        name="priceMax"
                                        placeholder="Maximum"
                                        onChange={changeHandler}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg="4">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Kilométrage</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        name="mileageMin"
                                        placeholder="Minimum"
                                        onChange={changeHandler}
                                    />
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        name="mileageMax"
                                        placeholder="Maximum"
                                        onChange={changeHandler}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg="4">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Année</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name="yearMin"
                                        placeholder="Minimum"
                                        onChange={changeHandler}
                                    />
                                    <Form.Control
                                        type="number"
                                        name="yearMax"
                                        placeholder="Maximum"
                                        onChange={changeHandler}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        );
    };

    const renderCarOffers = (carOffers: CarOffer[]) => {
        const flexBasis = props.preview ? 'calc(50% - 10px)' : 'calc(25% - 10px)';
        const sortedOffers = carOffers.sort((a, b) => b.id - a.id);
        const slicedOffers = sortedOffers.slice(0, 4);

        return (props.preview ? slicedOffers : sortedOffers).map((offer) => {
            const { id, title, description, priceInCents, mileageInKm, year } = offer;

            if (!props.preview) {
                if (filters?.priceMin && Number(filters.priceMin) * 100 > priceInCents) return;
                if (filters?.priceMax && Number(filters.priceMax) * 100 < priceInCents) return;
                if (filters?.mileageMin && Number(filters.mileageMin) > mileageInKm) return;
                if (filters?.mileageMax && Number(filters.mileageMax) < mileageInKm) return;
                if (filters?.yearMin && Number(filters.yearMin) > year) return;
                if (filters?.yearMax && Number(filters.yearMax) < year) return;
            }

            return (
                <Card key={id} style={{ margin: '5px', flexBasis }}>
                    <Card.Img variant="top" src="img-placeholder.webp" />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            <li>{`${priceInCents / 100} €`}</li>
                            <li>{`${mileageInKm} km`}</li>
                            <li>Mise en circulation : {year}</li>
                            <li>{description}</li>
                        </ul>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: 'center' }}>
                        <Button onClick={() => props.onModalOpen(offer)}>Voir</Button>
                    </Card.Footer>
                </Card>
            );
        });
    };

    return (
        <>
            {props.preview ? null : renderFiltersForm()}
            <Row style={{ margin: 0, padding: 0 }}>
                <Col style={{ display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0 }}>
                    {renderCarOffers(props.carOffers)}
                </Col>
            </Row>
        </>
    );
};
