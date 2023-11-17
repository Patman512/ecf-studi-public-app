import React, { FC, useEffect, useState } from 'react';
import { CarOffer, CarOffersComponent, Equipment } from '../carOffers';
import { OpeningHour, OpeningHoursComponent } from '../openingHours';
import { AddRatingModal, Rating, RatingsComponent } from '../ratings';
import { Service, ServicesComponent } from '../services';
import { getHomePageData } from './api';
import { Button, Col, Container, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';

enum ModalContent {
    addRating = 1,
    contactForm
}

export const App: FC = () => {
    const [carOffers, setCarOffers] = useState<CarOffer[]>([]);
    const [equipmentsList, setEquipmentsList] = useState<Equipment[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [errorShow, setErrorShow] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const fetchData = () => {
        getHomePageData((error, homePageData) => {
            if (error) {
                return setError(error.message);
            }

            if (!homePageData) {
                return setError('Unexpected error.');
            }

            const { carOffers, equipmentsList, ratings, services, openingHours } = homePageData;

            setCarOffers(carOffers);
            setEquipmentsList(equipmentsList);
            setRatings(ratings);
            setServices(services);
            setOpeningHours(openingHours);
        });
    };

    useEffect(() => fetchData, []);

    const onModalClose = () => {
        setModalShow(false);
        setModalContent(null);
    };

    const onModalError = (error: Error) => {
        setError(error.message);
        setErrorShow(true);
    };

    const renderModalContent = (modalContent: ModalContent | null) => {
        switch (modalContent) {
            case ModalContent.addRating:
                return <AddRatingModal onClose={onModalClose} onSave={fetchData} onError={onModalError} />;
            default:
                return;
        }
    };

    return (
        <>
            <ToastContainer position="top-end" className="position-fixed">
                <Toast onClose={() => setErrorShow(false)} show={errorShow} delay={3000} autohide bg="danger">
                    <Toast.Body>Erreur: {error}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
                fullscreen="lg-down"
            >
                {renderModalContent(modalContent)}
            </Modal>
            <Container>
                <Row>
                    <Col md="9" style={{ textAlign: 'end' }}>
                        <h1>Console d&apos;administration GVP</h1>
                    </Col>
                    <Col md="3" style={{ textAlign: 'end' }}>
                        <Button
                            onClick={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.addRating);
                            }}
                            style={{ marginTop: '10px' }}
                        >
                            Laisser un avis
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ServicesComponent services={services} />
                    </Col>
                    <Col lg="6">
                        <CarOffersComponent carOffers={carOffers} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <OpeningHoursComponent openingHours={openingHours} />
                    </Col>
                    <Col lg="6">
                        <RatingsComponent ratings={ratings} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
