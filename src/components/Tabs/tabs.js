import React, {useEffect, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function Tabs({ inViewBuns, inViewSauces, inViewMain })  {
  const [current, setCurrent] = useState('bun')

useEffect(() => {
    if (inViewBuns) {
      setCurrent('bun')
    }
    else if (inViewSauces) {
      setCurrent('sauce')
    }
    else if (inViewMain) {
      setCurrent('main')
    }
  }, [inViewBuns, inViewSauces, inViewMain]);

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="bun" active={current === 'bun'}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;
