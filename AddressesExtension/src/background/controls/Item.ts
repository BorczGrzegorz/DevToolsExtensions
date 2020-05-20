/// <reference types="chrome"/>
import { Guid } from 'guid-typescript';

interface ItemProps<T> {
  parentId: string;
  item: {
    title: string;
    element: T;
  };
  renderChildren?: (id: string, element: T) => void;
  onClick?: (item: T) => void;
}

export const itemRender = <T>(props: ItemProps<T>) => {
  const id = Guid.create().toString();
  const properties: chrome.contextMenus.CreateProperties = {
    title: props.item.title,
    parentId: props.parentId,
    id,
    onclick: () => {
      if (props.onClick) {
        props.onClick(props.item.element);
      }
    },
  };

  chrome.contextMenus.create(properties);
  if (props.renderChildren) {
    props.renderChildren(id, props.item.element);
  }
};
