/// <reference types="chrome"/>

import { getProducts, ProductDto } from '../api/devToolsApi';
import { subMenuRender } from './controls/SubMenu';
import { productListRender } from './components/ProductListRender';

export const runBackground = async (): Promise<void> => {
  try {
    const products: ProductDto[] = await getProducts();
    console.log(products);
    const properties: chrome.contextMenus.CreateProperties = {
      title: 'DevTools',
      id: 'devtools-context-main',
    };

    chrome.contextMenus.create(properties);
    productListRender({ products, parentId: 'devtools-context-main' });
  } catch (error) {
    console.log(error);
  }
};
