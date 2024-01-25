import React from 'react';
import { render } from '@testing-library/react';
import {OrderFeedItem} from './OrderFeedItem';
import { useAppSelector } from '../../hooks/dispatch-selectos';
import { useLocation } from 'react-router-dom';

import {
    getAllCreatedOrders,
    getListOfIngredients,
  } from "../../redux_services/selectors";

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));
jest.mock('../../hooks/dispatch-selectos', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn()
}));

describe('OrderFeedItem', () => {
  it('renders correctly and matches snapshot', () => {

    const mockOrders = [
        {
          _id: '65b117ac87899c001b82b2a4',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Антарианский spicy флюоресцентный space бургер',
          createdAt: '2024-01-24T13:59:08.544Z',
          updatedAt: '2024-01-24T13:59:08.938Z',
          number: 32809
        },
        {
          _id: '65b1173d87899c001b82b2a0',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Антарианский флюоресцентный space бургер',
          createdAt: '2024-01-24T13:57:17.432Z',
          updatedAt: '2024-01-24T13:57:17.969Z',
          number: 32808
        }];
    const mockIngredients =  
        [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          }];
    
    useAppSelector.mockImplementation((selector) => {
      if (selector === getAllCreatedOrders) return mockOrders;
      if (selector === getListOfIngredients) return { ingredientsData: { data: mockIngredients } };
      return undefined;
    });
    useLocation.mockReturnValue({pathname: '/feed/id123',});

    const { asFragment } = render(<OrderFeedItem />);

    expect(asFragment()).toMatchSnapshot();
  });
});
