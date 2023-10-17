import React, {useEffect, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function Tabs({ inViewBuns, inViewSauces, inViewMain })  {
  const [current, setCurrent] = useState('bun')

useEffect(() => {
    if (inViewBuns) {
      setCurrent('bun')
    }
    if (inViewSauces) {
      setCurrent('sauce')
    }
    if (inViewMain) {
      setCurrent('main')
    }
  }, [inViewBuns, inViewSauces, inViewMain]);

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="bun" active={current === 'bun'}>
        One
      </Tab>
      <Tab value="sauce" active={current === 'sauce'}>
        Two
      </Tab>
      <Tab value="main" active={current === 'main'}>
        Three
      </Tab>
    </div>
  )
}

export default Tabs;
