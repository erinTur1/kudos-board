import { useState } from 'react';
import ModalCardPage from "./ModalCardPage";
import "../styles/CreateForm.css"

const CreateCardForm = ({ boardId, appendNewCard }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <button className="create-new-btn" onClick={openModal}>Create a New Card</button>
            {isModalVisible && <ModalCardPage boardId={boardId} closeModal={closeModal} appendNewCard={(newCard) => {
                setIsModalVisible(false);
                appendNewCard(newCard);
            }}/>}
        </>

    )
}

export default CreateCardForm