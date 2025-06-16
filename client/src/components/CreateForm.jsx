import { useState } from 'react';
import Modal from "./Modal";

const CreateForm = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateBoard = () => {
        //show modal
        setIsModalVisible(true);
    }

    //pass hideModal function to Modal?
    

    return (
        <>
            <button onClick={handleCreateBoard}>Create a New Board</button>
            {isModalVisible && <Modal />}
        </>

    )
}

export default CreateForm