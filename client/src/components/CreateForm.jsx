import { useState } from 'react';
import Modal from "./Modal";
import "../styles/CreateForm.css"

const CreateForm = ({ appendNewBoard }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        //show modal
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <button className="create-new-btn" onClick={openModal}>Create a New Board</button>
            {isModalVisible && <Modal closeModal={closeModal} appendNewBoard={(newBoard) => {
                setIsModalVisible(false);
                appendNewBoard(newBoard);
            }}/>}
        </>

    )
}

export default CreateForm