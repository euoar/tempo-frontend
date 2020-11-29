import React from 'react';
import { SearchIcon } from '@primer/octicons-react';
import styled from 'styled-components';

const Form = styled.form`
    /* Medium devices (tablets, 768px and up) */
    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

const SearchBox = props =>
    <Form onSubmit={props.handleSubmit}>
        <div className="input-group mx-auto mr-auto mt-1" id="search_box">
            <input type="text"
                aria-label="formulario para buscar lugares"
                className="form-control"
                value={props.text}
                onChange={props.handleChange}
                placeholder="Buscar outros lugares..." />
            <div className="input-group-append">
                <button type="submit" className="btn btn-outline-secondary" >
                    <SearchIcon size={16} aria-label="buscar un lugar" />
                </button>
            </div>
        </div>
    </Form>

export default SearchBox;