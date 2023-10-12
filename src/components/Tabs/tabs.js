import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function Tabs () {
    const [current, setCurrent] = React.useState('bread')
    return (
      <div style={{ display: 'flex', marginBottom: 40}}>
        <Tab value="bread" active={current === 'bread'} onClick={setCurrent}>
         Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="inner" active={current === 'inner'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )

}

export default Tabs;