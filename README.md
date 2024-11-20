# Dragon Ball Super Manager

A web application where you can find your favorite characters. You can register to create, edit and if you don't like it delete your own card.

Visit the web:
- [Dragon Ball Super Manager](https://dragonballmanager.netlify.app/)

## Dragon ball API Reference

#### Get characters

```http
  GET https://dragonball-api.com/api/characters
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `page`    | `number` | **it is not Required**                    |
| `limit`   | `number` | **it is not Required** (10 items default) |

## Documentation

- [Next.js: Page Router](https://nextjs.org/docs/pages/getting-started/project-structure)
- [Material UI](https://mui.com/)
- [React Hook Form](https://www.react-hook-form.com/)
- [Zod](https://mui.com/)
- [localforage](https://localforage.github.io/localForage/)

## Features

- Login / Register
- Fully responsive design
- Search and filters
- Dasboard Manage where you can create, edit, and delete a card (CRUD).

## Usage / Examples

Next.js: Page Routes

- Next.js allows you to organize paths in a clear and predictable way using the Pages Router system. Each file in the pages folder is automatically converted into an accessible route, making navigation and route management easy. The use of pages routing is ideal for small to medium-sized applications where simplicity and convention are preferable to configuration. Normally in a more robust application it is advisable to use App Routes.
- Also it has simple navigation with useRouter allows you to perform programmatic navigation within your Next.js application. This means that you can redirect users to different pages in response to events, such as after a form submission.

```javascript
/pages
  index.js      // Ruta '/'
  about.js      // Ruta '/about'
  blog/
    [id].js     // Ruta '/blog/:id'

```
Structure of this project

```javascript

/pages
_app.tsx       // Control Global State of web
_document.tsx  // Useful for SEO
index.tsx      // Ruta '/'
dashboard.tsx  // Ruta '/dashboard'
login.tsx      // Ruta '/login'

/public        // Assets like images, fonts, videos, etc

/src           // components, contexts, hooks, types, utils, views

/theme         // Global theme of the web
```

Material UI

- It is a good choice when you want to use a React component library. When you want to create your custom theme it is very easy to use.

```javascript
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({ cssVariables: true })

function App() {
  return <ThemeProvider theme={theme}>{/* ...your app */}</ThemeProvider>
}
```

We can also create themes that encompass components, something very useful to reuse in different sections of our app.

```javascript
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    // the component name defined in the `name` parameter
    // of the `styled` API
    MuiStat: {
      styleOverrides: {
        // the slot name defined in the `slot` and `overridesResolver` parameters
        // of the `styled` API
        root: {
          backgroundColor: '#121212',
        },
        value: {
          color: '#fff',
        },
        unit: {
          color: '#888',
        },
      },
    },
  },
})
```

Zod

- It is a library for schema validation and data transformation. It is used to define and validate data structures in a simple and declarative way.

```javascript
import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
})
```

React Hook form

- It is a library for handling forms in React applications. It facilitates the creation of efficient and manageable forms through the use of hooks.

```javascript
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './validationSchema'

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
```

- validationSchema.js: You define a schema using Zod that describes the structure and validation rules for your form.
- SimpleForm Component: Uses react-hook-form to handle the form state and apply the validations defined in the Zod schema. Validation errors are displayed below the corresponding fields.

Localforage

- LocalForage uses an asynchronous approach to access data, which is faster and more efficient compared to synchronous storage such as localStorage. This is crucial for keeping the UI responsive, especially when you handle large volumes of data.

```javascript
import localforage from 'localforage'

// Optional Config
localforage.config({
  name: 'myApp',
})

// Saving an Item
localforage
  .setItem('key', 'value')
  .then(() => {
    return localforage.getItem('key')
  })
  .then((value) => {
    console.log(value) // 'value'
  })
  .catch((err) => {
    console.error(err)
  })

// Get a Item
localforage
  .getItem('key')
  .then((value) => {
    console.log(value) // 'value'
  })
  .catch((err) => {
    console.error(err)
  })

// Remove an Item
localforage
  .removeItem('key')
  .then(() => {
    console.log('Item eliminado')
  })
  .catch((err) => {
    console.error(err)
  })
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Vctorqui/apolo_web_prueba_tecnica.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Authors

- [@VictorQuiñones](https://github.com/Vctorqui)
