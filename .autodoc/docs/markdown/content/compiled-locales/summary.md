[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/content/compiled-locales)

The `.autodoc/docs/json/content/compiled-locales` folder contains JSON files for managing text content and translations in the Ergoweb project. Each file represents a specific language (e.g., `cn.json` for Chinese, `de.json` for German, etc.) and contains key-value pairs for various text elements used throughout the project. The keys are organized hierarchically, representing the structure of components and their sub-components, while the values are arrays containing objects with `type` and `value` properties, defining the formatting and content of the text.

For example, in `cn.json`, the key `"components.ContributeForm.company.subTitle"` contains an object with the Chinese text "想要成为合作伙伴？" (translates to "Want to become a partner?"). By updating the `value` property, developers can easily change the text displayed in the corresponding part of the Ergoweb project.

These JSON files are likely used for internationalization (i18n) purposes, allowing the Ergoweb project to display text in different languages based on user preferences or browser settings. By maintaining separate files with translations, developers can easily update or add new languages without modifying the main application code.

Here's an example of how these JSON files might be used in the project:

```javascript
// Import the JSON object for the desired language
import content from './path/to/compiled-locales/en.json';

// Access the text for a specific element
const contributeFormCompanySubTitle = content['components.ContributeForm.company.subTitle'][0].value;

// Render the text in a React component
function ContributeForm() {
  return (
    <div>
      <h2>{contributeFormCompanySubTitle}</h2>
      {/* Other elements */}
    </div>
  );
}
```

In this example, the `en.json` file is imported, and the text content for the "ContributeForm" component's "company" section subtitle is retrieved and rendered in a React component. This approach allows developers to easily update or translate the text content without modifying the code directly, enabling better maintainability and localization support.
