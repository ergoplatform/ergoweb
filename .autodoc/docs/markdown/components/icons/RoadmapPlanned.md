[View code on GitHub](https://github.com/ergoplatform/ergoweb/components/icons/RoadmapPlanned.js)

The `SvgRoadmapPlanned` component is a React component that renders an SVG image of a circle with a gradient fill and a path element that creates a shape within the circle. The circle has a width of 29 and a height of 28, and its fill is defined by a linear gradient that goes from white to a dark gray color. The path element creates a shape that resembles a flag or a banner, and it is filled with a solid black color.

This component is likely used in the larger project as an icon or a visual element to represent a planned or upcoming feature or milestone in a roadmap or a project plan. It can be imported and used in other React components like this:

```jsx
import SvgRoadmapPlanned from 'path/to/SvgRoadmapPlanned';

const MyComponent = () => {
  return (
    <div>
      <h2>Upcoming Features</h2>
      <ul>
        <li>
          <SvgRoadmapPlanned />
          Feature A
        </li>
        <li>
          <SvgRoadmapPlanned />
          Feature B
        </li>
        <li>
          <SvgRoadmapPlanned />
          Feature C
        </li>
      </ul>
    </div>
  );
};
```

In this example, the `SvgRoadmapPlanned` component is used to create a visual indicator for upcoming features in a list. The component can be reused multiple times with different feature names to create a consistent and recognizable visual language for the project.
## Questions: 
 1. What is the purpose of this code?
- This code defines a React component that renders an SVG image of a planned roadmap.

2. What are the dimensions of the SVG image?
- The SVG image has a width of 29 and a height of 28.

3. What is the significance of the linear gradient defined in the code?
- The linear gradient is used to fill the ellipse in the SVG image with a gradient that goes from white to a dark gray color.