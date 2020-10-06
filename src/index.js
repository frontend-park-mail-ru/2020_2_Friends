import { StoreController } from './controller/storeController.js';

const root = document.getElementById('root');

const storeController = new StoreController(root);
storeController.view.render();
