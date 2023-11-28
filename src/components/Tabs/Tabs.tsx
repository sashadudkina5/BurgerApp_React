import React, { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface IViewProps {
  inViewBuns: boolean;
  inViewSauces: boolean;
  inViewMain: boolean;
}

const Tabs: React.FC<IViewProps> = ({
  inViewBuns,
  inViewSauces,
  inViewMain,
}) => {
  const [current, setCurrent] = useState("bun");

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("bun");
    } else if (inViewSauces) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBuns, inViewSauces, inViewMain]);

  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={() => void 0}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={() => void 0}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={() => void 0}>
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
