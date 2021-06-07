# Editor instance for react

## This is a copy of https://github.com/Jungwoo-An/react-editor-js

## Example

```
  <Editor
    data={data}
    tools={{
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
        }
      }
    }}
  />
```
