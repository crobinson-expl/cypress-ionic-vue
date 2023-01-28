// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import global styles
import '@/assets/main.css'

import { mount } from 'cypress/vue'
import { IonicVue, IonApp, IonPage } from "@ionic/vue"
// @ts-ignore: Could not find a declaration file for module
import { defineComponent } from "vue/dist/vue.esm-bundler"

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mount(component: any, options?: OptionsParam): Chainable<any>
    }
  }
}

Cypress.Commands.add("mount", (componentToMount, options = {}) => {
  // Setup options object
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  options.global.plugins.push(IonicVue);

  const IonicWrapper = defineComponent({
    setup() {
      const props = options.props || {};

      return {
        props,
        comp: componentToMount,
      };
    },
    components: {
      IonApp,
      IonPage,
    },
    template: `
      <div id="app">
        <IonApp>
          <IonPage>
            <component :is="comp" v-bind="props" />
          </IonPage>
        </IonApp>
      </div>
    `,
  });

  // Do not pass props to wrapper
  const wrapperOptions = { ...options, props: {} };

  return mount(IonicWrapper, wrapperOptions);
})

// Example use:
// cy.mount(MyComponent)