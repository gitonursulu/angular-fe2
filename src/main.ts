import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const bootstrap = () => bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  export default bootstrap;
