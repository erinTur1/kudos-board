import { useState } from 'react';
import Modal from "./Modal";

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
            <button onClick={openModal}>Create a New Board</button>
            {isModalVisible && <Modal closeModal={closeModal} appendNewBoard={(newBoard) => {
                setIsModalVisible(false);
                appendNewBoard(newBoard);
            }}/>}
        </>

    )
}

export default CreateForm