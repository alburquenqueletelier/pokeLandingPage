import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { Context } from '../../store/appContext';
import FavButton from '../favButton';

const renderWithContext = (component, { contextValue }) => {
  return render(
    <Context.Provider value={contextValue}>
      {component}
    </Context.Provider>
  );
};

describe("FavButton", () => {
  const poke = { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/pikachu/" };

  test("Add pokemon to favorites", () => {
    const contextValue = {
      store: { favs: [] },
      actions: {
        addOrRemove: jest.fn(),
      },
    };

    const { getByText } = renderWithContext(<FavButton poke={poke} />, { contextValue });
    const button = getByText("Add");

    act(() => {
        fireEvent.click(button);
    });
          
    expect(contextValue.actions.addOrRemove).toHaveBeenCalledWith(poke);
  });

  test("Remove pokemon of favorites", () => {
    const contextValue = {
      store: { favs: [poke] },
      actions: {
        addOrRemove: jest.fn(),
      },
    };

    const { getByText } = renderWithContext(<FavButton poke={poke} />, { contextValue });
    const button = getByText("Remove");

    act(()=>{
        fireEvent.click(button);
    });

    expect(contextValue.actions.addOrRemove).toHaveBeenCalledWith(poke);
  });
});
