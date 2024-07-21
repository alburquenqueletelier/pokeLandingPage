import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import { Context } from "../../store/appContext";
import Grid from "../grid";

const mockContextValue = {
    store: {
        page: 1,
        pokeNames: [
            { name: "Bulbasaur", url: "bulbasaur.png" },
            { name: "Ivysaur", url: "ivysaur.png" }
        ],
        showFavs: false,
        favs: []
    },
    actions: {
        setShowFavs: jest.fn(),
        getPokeInfo: jest.fn()
    }
};

const MockProvider = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

test('renders Grid page', () => {
    render(
        <MemoryRouter>
            <MockProvider value={mockContextValue}>
                <Grid />
            </MockProvider>
        </MemoryRouter>
    );

    expect(screen.getByText(/filter by favs/i)).toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Ivysaur/i)).toBeInTheDocument();
});

test('filters by favs when button is clicked', () => {
    render(
        <MemoryRouter>
            <MockProvider value={mockContextValue}>
                <Grid />
            </MockProvider>
        </MemoryRouter>
    );

    const button = screen.getByText(/filter by favs/i);
    fireEvent.click(button);
    expect(mockContextValue.actions.setShowFavs).toHaveBeenCalled();
});