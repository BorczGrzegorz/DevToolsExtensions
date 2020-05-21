/// <reference types="chrome"/>

import { getProducts, ProductDto } from '../api/devToolsApi';
import { productListRender } from './components/ProductListRender';

export const runBackground = async (): Promise<void> => {
  const interval = setInterval(async () => {
    try {
      await run();
      clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  }, 60 * 1000);

  try {
    await run();
    clearInterval(interval);
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  const products: ProductDto[] = await getProducts();
  console.log(products);
  const properties: chrome.contextMenus.CreateProperties = {
    title: 'DevTools',
    id: 'devtools-context-main',
  };

  chrome.contextMenus.create(properties);
  productListRender({ products, parentId: 'devtools-context-main' });
};
