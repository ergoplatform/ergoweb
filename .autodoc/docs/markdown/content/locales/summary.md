[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/content/locales)

The `.autodoc/docs/json/content/locales` folder contains localization files for the Ergoweb project. Localization is the process of adapting a product or content to a specific locale or market. In this case, the JSON files provide translations for various components, titles, buttons, and descriptions used throughout the Ergoweb platform in different languages.

These key-value pairs are used by the Ergoweb platform to display the appropriate text based on the user's language preference. This helps make the platform more accessible and user-friendly for users speaking different languages.

To use these translations in the project, developers would typically access the values using the keys provided in the JSON file. For example, in a JavaScript or TypeScript file, the developer might use the following code to display the title for the ContributeForm component:

```javascript
const title = translations["components.ContributeForm.company.title"];
```

This would set the `title` variable to the appropriate translation, which can then be used to render the text on the web page.

The folder contains JSON files for different languages, such as:

- `PL.json`: Polish translations
- `cn.json`: Chinese translations
- `de.json`: German translations
- `en.json`: English translations
- `es.json`: Spanish translations
- `hu.json`: Hungarian translations
- `it.json`: Italian translations
- `pt.json`: Portuguese translations
- `ru.json`: Russian translations

By centralizing these text strings in separate JSON files for each language, the Ergoweb project can easily manage and update the text content of its various components and pages without having to modify the code of each individual component or page. This makes it easier to maintain and update the project over time, and allows for easy translation of the project into different languages.
