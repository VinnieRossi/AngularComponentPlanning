import { Injectable } from '@angular/core';
import { ContainerModel } from './container.model';
import { ApplicationSettings } from './application-settings.model';
import { kebabCase, capitalize } from 'lodash';
import { ComponentModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerToHtmlService {

  constructor() { }

  generateHtmlForContainer(container: ContainerModel, appSettings: ApplicationSettings): string {

    const containerNameKebabCase: string = kebabCase(container.containerName);

    const componentAsHtmlString: Array<string> = container.components
      .map(component => this.createHtmlForComponent(component, appSettings));

    const containerAsHtmlString: string = (
      `<p>${containerNameKebabCase} works! </p>\n
${componentAsHtmlString.join('\n\n')}
    `);

    return containerAsHtmlString;
  }

  private createHtmlForComponent(component: ComponentModel, appSettings: ApplicationSettings): string {

    const properties: Array<string> = component.inputProperties.map(prop => `[${prop.propertyName}]="${prop.propertyName}"`);

    const events: Array<string> = component.eventEmitters.map(event => `(${event.emitterName})="on${capitalize(event.emitterName)}($event)"`);

    const html: string =
      `<${appSettings.applicationPrefix}-${kebabCase(component.componentName)} ${properties.join(' ')} ${events.join(' ')}></${appSettings.applicationPrefix}-${kebabCase(component.componentName)}>`;

    return html;
  }

}

// const component2: ComponentModel = {
//   componentName: 'GoodbyeWorld',
//   inputProperties: [
//     //TODO: Have option to generate input with separate name (eg @Input('account-id') id: string;)
//     {
//       propertyName: 'charName',
//       propertyType: SupportedTypescriptTypes.String
//     },
//     {
//       propertyName: 'barName',
//       propertyType: SupportedTypescriptTypes.String
//     }
//   ],
//   eventEmitters: [
//     {
//       emitterName: 'close',
//       emitterPropertyType: SupportedTypescriptTypes.Any
//     },
//     {
//       emitterName: 'edit',
//       emitterPropertyType: SupportedTypescriptTypes.Any
//     }
//   ]
// };