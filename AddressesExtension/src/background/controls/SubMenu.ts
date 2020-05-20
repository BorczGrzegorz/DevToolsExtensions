import { itemRender } from './Item';

export interface SubMenuProps<T> {
  parentId: string;
  items: {
    title: string;
    element: T;
  }[];
  renderItemSubMenu?: (parentId: string, element: T) => void;
  onClickItem?: (item: T) => void;
}

export const subMenuRender = <T>({
  parentId,
  items,
  renderItemSubMenu,
  onClickItem,
}: SubMenuProps<T>) => {
  items.forEach((singleItem) => {
    itemRender({
      parentId,
      item: singleItem,
      onClick: onClickItem,
      renderChildren: (parentId: string, element: T) => {
        if (!renderItemSubMenu) {
          return;
        }

        renderItemSubMenu(parentId, element);
      },
    });
  });
};
