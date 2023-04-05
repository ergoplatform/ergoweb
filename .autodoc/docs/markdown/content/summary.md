[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/content)

The `.autodoc/docs/json/content` folder contains JSON files and subfolders that manage text content and translations for the Ergoweb project. This folder plays a crucial role in the internationalization (i18n) and localization of the project, allowing it to display text in different languages based on user preferences or browser settings.

The `compiled-locales` subfolder contains JSON files for various languages, each with key-value pairs representing text elements used throughout the project. The keys are organized hierarchically, representing the structure of components and their sub-components. The values are arrays containing objects with `type` and `value` properties, defining the formatting and content of the text.

For example, to display the Chinese text for the "ContributeForm" component's "company" section subtitle, you would use the following code:

```javascript
import content from './path/to/compiled-locales/cn.json';
const contributeFormCompanySubTitle = content['components.ContributeForm.company.subTitle'][0].value;
```

The `locales` subfolder contains localization files with translations for various components, titles, buttons, and descriptions in different languages. These key-value pairs are used to display the appropriate text based on the user's language preference, making the platform more accessible and user-friendly.

To use these translations, developers would access the values using the keys provided in the JSON file. For example, to display the title for the ContributeForm component in English, you would use the following code:

```javascript
const title = translations["components.ContributeForm.company.title"];
```

By maintaining separate files with translations, developers can easily update or add new languages without modifying the main application code. This approach allows for better maintainability and localization support, making it easier to manage and update the project over time.
