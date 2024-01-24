import React from 'react';
import { render } from '@testing-library/react';
import IngredientDetail from './IngredientDetail';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/dispatch-selectos';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('../../hooks/dispatch-selectos', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn()
}));

describe('IngredientDetail', () => {
  it('renders correctly and matches snapshot', () => {
    useParams.mockReturnValue({ id: 'mockedId' });
    useLocation.mockReturnValue({ pathname: '/ingredients/mockedId' });
    useAppSelector.mockReturnValue([
      {
        _id: 'mockedId',
        image: 'mockedImage.jpg',
        name: 'Mocked Ingredient',
        calories: 100,
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
      },
    ]);

    const selectedIngredient = {
      _id: 'mockedId',
      image: 'mockedImage.jpg',
      name: 'Mocked Ingredient',
      calories: 100,
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
    };


    const { asFragment } = render(<IngredientDetail selectedIngredient={selectedIngredient} />);


    expect(asFragment()).toMatchSnapshot();
  });
});
