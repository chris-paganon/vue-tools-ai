- `v-bind` can be used to dynamically assign class and style attributes to an element
- `:class` can be used to bind classes to an element based on the truthiness of a data property
- Multiple classes can be toggled using an object syntax or an array syntax
- `:class` can also be used with components to add classes to the component's root element
- `:style` can be used to bind inline styles to an element using an object syntax
- Multiple style objects can be merged and applied to the same element using an array syntax
- Vue automatically adds vendor prefixes to CSS properties that require them
- Multiple (prefixed) values can be provided to a style property, and the browser will render the last value it supports