import { useRef } from "react";
import styled from './AddJokes.module.css';
import InputComponent from "./InputComponent";
import CustomButton from "./CustomButton";

const AddJokes = (props) => {

    const typeRef = useRef('');
    const setupRef = useRef('');
    const punchlineRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();
        const newJoke = {
            type: typeRef.current.value,
            setup: setupRef.current.value,
            punchline: punchlineRef.current.value,
        };
        props.onAddJoke(newJoke);
        clearInputsAfterSendRequest();
    };

    const clearInputsAfterSendRequest = () => {
        typeRef.current.value =  
        setupRef.current.value =  
        punchlineRef.current.value = '';
    }

    return (
        <form className={styled.form} onSubmit={submitHandler} >
            <h1 className={styled.head}>
                Create your own joke and add it to a list
            </h1>
            <div className={styled.control}>
                <label htmlFor="type"></label>
                <InputComponent ref={typeRef} placeholder={'Enter the type of joke'}/>
            </div>
            <div className={styled.control}>
                <label htmlFor="setup"></label>
                <InputComponent ref={setupRef} placeholder={'Enter the setup of joke'}/>
            </div>
            <div className={styled.control}>
                <label htmlFor="punchline"></label>
                <InputComponent ref={punchlineRef} placeholder={'Enter the punchline of joke'}/>
            </div>
            <CustomButton type={'submit'} text={'Add Joke'}/>
        </form>
    );
}

export default AddJokes;
