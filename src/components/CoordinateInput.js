import React from 'react';
import { InputWrapper, Input, Label } from '../styles';

function CoordinateInput({ label, value, onChange }) {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <Input type="text" value={value} onChange={onChange} />
        </InputWrapper>
    );
}

export default CoordinateInput;
