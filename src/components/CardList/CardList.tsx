import {FC, JSX} from "react";
import {GsuTile} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

export type CardListItem =
    | {
          label: string | number;
          value?: string | number;
          icon?: () => JSX.Element;
          isLink?: false;
      }
    | {
          label: string | number;
          value?: string | number;
          icon?: () => JSX.Element;
          isLink: true;
          href: string;
          target?: "_blank" | "_self" | "_parent" | "_top";
          rel?: string;
      };

type CardListParams = {
    items: CardListItem[];
};

const CardList: FC<CardListParams> = ({items}) => {
    return (
        <GsuTile className={styles.cardListContainer}>
            {items.map((item: CardListItem, index: number) => {
                const Element = item.isLink ? "a" : "div";
                return (
                    item.label && <Element
                        key={`list-item-${index}`}
                        className={styles.cardListItem}
                        {...(item.isLink ? {href: item.href, target: item.target, rel: item.rel} : {})}
                    >
                        {item.icon && <item.icon />}
                        <span className={styles.cardListItemLabel}>{item.label}</span>
                    </Element>
                );
            })}
        </GsuTile>
    );
};

export default CardList;
