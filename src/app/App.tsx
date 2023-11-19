import React, { FC, useEffect, useState } from 'react';
import { CarOffer, CarOffersComponent, Equipment, ViewCarOfferModal } from '../carOffers';
import { OpeningHour, OpeningHoursComponent } from '../openingHours';
import { AddRatingModal, Rating, RatingsComponent } from '../ratings';
import { Service, ServicesComponent } from '../services';
import { getHomePageData } from './api';
import { Card, Col, Container, Modal, Nav, Navbar, Row, Toast, ToastContainer } from 'react-bootstrap';
import { ContactComponent, ContactFormModal } from '../contact';

enum BodyContent {
    homepage = 1,
    carOffers,
    ratings
}

enum ModalContent {
    viewCarOffer = 1,
    addRating,
    contactForm
}

export const App: FC = () => {
    const [carOffers, setCarOffers] = useState<CarOffer[]>([]);
    const [equipmentsList, setEquipmentsList] = useState<Equipment[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [bodyContent, setBodyContent] = useState<BodyContent | null>(BodyContent.homepage);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [modalCarOffer, setModalCarOffer] = useState<CarOffer>();
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

    const renderBodyContent = () => {
        switch (bodyContent) {
            case BodyContent.homepage:
                return (
                    <Container>
                        <Row>
                            <Col lg="7">
                                <ServicesComponent services={services} />
                            </Col>
                            <Col lg="5">
                                <CarOffersComponent
                                    carOffers={carOffers}
                                    preview
                                    onModalOpen={(offer) => {
                                        setModalContent(ModalContent.viewCarOffer);
                                        setModalCarOffer(offer);
                                        setModalShow(true);
                                    }}
                                />
                            </Col>
                        </Row>
                    </Container>
                );
            case BodyContent.carOffers:
                return (
                    <Container>
                        <CarOffersComponent
                            carOffers={carOffers}
                            onModalOpen={(offer) => {
                                setModalContent(ModalContent.viewCarOffer);
                                setModalCarOffer(offer);
                                setModalShow(true);
                            }}
                        />
                    </Container>
                );
            case BodyContent.ratings:
                return (
                    <Container>
                        <RatingsComponent
                            ratings={ratings}
                            addRating={() => {
                                setModalContent(ModalContent.addRating);
                                setModalShow(true);
                            }}
                        />
                    </Container>
                );
            default:
                return;
        }
    };

    const onModalClose = () => {
        setModalShow(false);
        setModalContent(null);
        setModalCarOffer(undefined);
    };

    const onModalError = (error: Error) => {
        setError(error.message);
        setErrorShow(true);
    };

    const renderModalContent = (modalContent: ModalContent | null) => {
        switch (modalContent) {
            case ModalContent.viewCarOffer:
                return (
                    <ViewCarOfferModal
                        carOffer={modalCarOffer as CarOffer}
                        equipmentsList={equipmentsList}
                        onClose={onModalClose}
                        onContactFormModalOpen={() => setModalContent(ModalContent.contactForm)}
                    />
                );
            case ModalContent.addRating:
                return <AddRatingModal onClose={onModalClose} onSave={fetchData} onError={onModalError} />;
            case ModalContent.contactForm:
                return (
                    <ContactFormModal
                        onClose={onModalClose}
                        onSave={fetchData}
                        onError={onModalError}
                        carOfferTitle={modalCarOffer?.title ?? undefined}
                    />
                );
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
                onHide={onModalClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
                fullscreen="lg-down"
            >
                {renderModalContent(modalContent)}
            </Modal>
            <Card bg="light" className="vh-100 overflow-auto">
                <Card.Header>
                    <Navbar>
                        <Navbar.Brand>Garage V. Parrot</Navbar.Brand>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link onClick={() => setBodyContent(BodyContent.homepage)}>Accueil</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => setBodyContent(BodyContent.carOffers)}>
                                    Toutes les annonces
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => setBodyContent(BodyContent.ratings)}>Avis clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Card.Header>
                <Card.Body>{renderBodyContent()}</Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <OpeningHoursComponent openingHours={openingHours} />
                        </Col>
                        <Col>
                            <ContactComponent
                                onModalOpen={() => {
                                    setModalContent(ModalContent.contactForm);
                                    setModalShow(true);
                                }}
                            />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </>
    );
};
