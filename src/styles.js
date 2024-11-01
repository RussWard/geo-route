import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const InputWrapper = styled.div`
    margin-bottom: 10px;
`;

export const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export const Result = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    width: 100%;
    text-align: center;
`;
