import './styles.scss';
import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');
  const application = new App(appElement);
  application.start();
};
