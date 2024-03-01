import React, { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface IViewProps {
  inViewBuns: boolean;
  inViewSauces: boolean;
  inViewMain: boolean;
  onBunClick: () => void;
  onSauceClick: () => void;
  onMainClick: () => void;
}

/**
 * Provides navigation tabs in the burger ingredients section.
 * This component uses the `Tab` component from the `@ya.praktikum/react-developer-burger-ui-components` library to display tabs for different categories of ingredients: buns, sauces, and mains.
 * It tracks which tab is currently active based on the section of the page that is in view.
 * 
 * @component
 * @param {IViewProps} props The properties passed to the Tabs component.
 * @param {boolean} props.inViewBuns Indicates if the buns section is currently in view.
 * @param {boolean} props.inViewSauces Indicates if the sauces section is currently in view.
 * @param {boolean} props.inViewMain Indicates if the main ingredients section is currently in view.
 * @param {Function} props.onBunClick The callback function to execute when the buns tab is clicked. Scrolls to the buns section.
 * @param {Function} props.onSauceClick The callback function to execute when the sauces tab is clicked. Scrolls to the sauces section.
 * @param {Function} props.onMainClick The callback function to execute when the main ingredients tab is clicked. Scrolls to the main ingredients section.
 * 
 * @example
 *  <Tabs
      inViewBuns={inViewBuns}
      inViewSauces={inViewSauces}
      inViewMain={inViewMain}
      onBunClick={scrollToBuns}
      onSauceClick={scrollToSauces}
      onMainClick={scrollToMain}
    />
 * 
 */
const Tabs: React.FC<IViewProps> = ({
  inViewBuns,
  inViewSauces,
  inViewMain,
  onBunClick,
  onSauceClick,
  onMainClick,
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
      <Tab value="bun" active={current === "bun"} onClick={onBunClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={onSauceClick}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={onMainClick}>
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
