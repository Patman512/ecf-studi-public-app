import React, { FC } from 'react';
import { Button, Card, Modal, Table } from 'react-bootstrap';
import { ContactComponent } from '../contact';
import { CarOffer, Equipment } from './types';

interface ViewCarOfferModalProps {
    carOffer: CarOffer;
    equipmentsList: Equipment[];
    onClose: () => void;
    onContactFormModalOpen: () => void;
}

export const ViewCarOfferModal: FC<ViewCarOfferModalProps> = (props) => {
    const { carOffer, equipmentsList, onClose } = props;

    const renderSpecsTable = () => {
        const {
            manufacturer,
            model,
            year,
            mileageInKm,
            fuelType,
            gearboxType,
            carType,
            color,
            numberOfDoors,
            numberOfSeats,
            taxHorsePower,
            horsePower
        } = carOffer;

        return (
            <Table bordered striped>
                <tbody>
                    <tr>
                        <td>
                            Marque : <strong>{manufacturer}</strong>
                        </td>
                        <td>
                            Modèle : <strong>{model}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Année de mise en circulation : <strong>{year}</strong>
                        </td>
                        <td>
                            Kilométrage : <strong>{mileageInKm}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Carburant : <strong>{fuelType}</strong>
                        </td>
                        <td>
                            Boîte de vitesses : <strong>{gearboxType}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Type de véhicule : <strong>{carType}</strong>
                        </td>
                        <td>
                            Couleur : <strong>{color}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nombre de portes : <strong>{numberOfDoors}</strong>
                        </td>
                        <td>
                            Nombre de places : <strong>{numberOfSeats}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nombre de chevaux fiscaux : <strong>{taxHorsePower}</strong>
                        </td>
                        <td>
                            Nombre de chevaux : <strong>{horsePower}</strong>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    };

    const renderEquipmentsListItems = () => {
        const equipmentStrIdsArray = (carOffer.equipments as string).split(',');

        return equipmentStrIdsArray.map((equipmentStrId) => {
            const equipmentId = Number(equipmentStrId);

            return <li key={equipmentId}>{equipmentsList.find((equipment) => equipment.id === equipmentId)?.name}</li>;
        });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Détails de l&apos;offre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Header>{carOffer.title}</Card.Header>
                    <Card.Body>
                        <strong>{carOffer.priceInCents / 100} €</strong>
                    </Card.Body>
                    <Card.Body>{renderSpecsTable()}</Card.Body>
                    {carOffer.description ? <Card.Body>{carOffer.description}</Card.Body> : null}
                    {carOffer.equipments ? (
                        <Card.Body>
                            Liste des équipements :<ul>{renderEquipmentsListItems()}</ul>
                        </Card.Body>
                    ) : null}
                    <Card.Footer>
                        <ContactComponent onModalOpen={props.onContactFormModalOpen} />
                    </Card.Footer>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} variant="secondary">
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
