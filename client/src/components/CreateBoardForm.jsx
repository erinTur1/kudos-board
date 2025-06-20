import { useState } from 'react';
import ModalBoardPage from "./ModalBoardPage";
import "../styles/CreateForm.css"

//renders create button and modal for input when activated
const CreateBoardForm = ({ appendNewBoard }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <button className="create-new-btn" onClick={openModal}>Create a New Board</button>
            {isModalVisible && <ModalBoardPage closeModal={closeModal} appendNewBoard={(newBoard) => {
                setIsModalVisible(false);
                appendNewBoard(newBoard);
            }}/>}
        </>

    )
}

export default CreateBoardForm