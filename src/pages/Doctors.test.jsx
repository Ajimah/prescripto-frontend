import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Doctors from './Doctors';

describe('Doctors Component', () => {
    const renderComponent = () => {
        return render(
            <AppContext.Provider value={{}}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Doctors />} />
                    </Routes>
                </MemoryRouter>
            </AppContext.Provider>
        );
    };
});
