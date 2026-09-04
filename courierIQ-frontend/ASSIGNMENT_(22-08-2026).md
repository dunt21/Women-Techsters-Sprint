### 1. React Import

this convention is used to pull a function, hook or an asset into a react file from another. This is done so that u can call it in different pages, without having to rewrite it manually and repeatedly.
eg.

```typescript
import { AppRoute } from "@/routes/AppRoute";
```

i called this func into my `app.tsx` so that whatever the func does, it can be able to render the logic into my `app.tsx` file. this helps to keep the `app.tsx` clean and easy to read, making other coders know what that component works like.

---

### 2. React Export

this allows to use a particular component in another file. without the export u can't import such a component or it can't be accessible. so it gives such flexibility and ease.
eg.

```typescript
export const AppRoute;
```

so has i exported this component, it made it easier for me to import it in my `app.tsx` to use.

---

### 3. Map Function

this lets u render a list of items in an array, saving u from manually doing it multiple times. helps u to keep your code clean and dry.
eg.

```javascript
publicList.map((item) =>)
```

so the `publicList` is an array of a list of objects, and the map func, runs through that list to apply the same elements or code logic to that list of items.

---

### 4. React State

this is used to store data which is rendered in a component. Meaning such data can be updated periodically, so most of the times its advisable to use a state hook.
eg.

```javascript
const [isOpen, setIsOpen] = useState(false);
```

so this state is used to store a boolean value to work in a particular logic. it can be updated by using its setter func, which is the `setIsOpen`.

---

### 5. OnClick Function

this event handler is used to run another func or apply a logic to an element, when the user makes an action of clicking a button or another element.
eg.

```javascript
onClick={() => setIsOpen(false)}
```

so this onclick func runs when the user maybe clicks a button, and after it runs it sets the `isOpen` state to false.

---

### 6. Path Alias

this feature allows you to import a file from a folder or nested folders and helps you to keep your code easy to read instead of using a relative path like this `'.././'`, which can be confusing or look to much in your code, especially depending on the location of the file you're currently working in.
eg.

```javascript
"@/pages/auth/LoginPage";
```

something like this pulls the loginpage from the auth folder which is within the pages folder.

---

### 7. React Key

this feature makes it easier for you to uniquely identify a list of items that are being rendered by the map func. It helps react keep track of what item was added & deleted.
eg.

```jsx
{
  publicList.map((item) => <Card key={item.path}>{item.name}</Card>);
}
```

this gives each route component a unique identifier of its item path.

---

### 8. React `useNavigate`

this makes it easy for a user to move through a page based on the path defined within its func. It can mostly be used in an onclick func, or a custom function a user defined.
eg.

```javascript
const navigate = useNavigate();
onClick={() => navigate("/dashboard")}
```

so the hook is stored in a variable and that variable is called as a function with a parameter of the path, that needs to be navigated when the onclick func runs.

---

### 9. OnSubmit Function

this is used to run a particular logic defined by the user when a form is being submitted. So it can contain the data from the form or any other logic written
eg.

```javascript
onSubmit={(e) => e.preventDefault()}
```

this func runs when a form is submitted and it prevents the users page from refreshing after such an event occurs, that's what the logic within it means.

---

### 10. Type Interface

this defines what an object is supposed to look like or contain. Meaning it has a list of things it expects another object to carry or contain.
eg.

```typescript
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement>
```

so the `AuthInputProps` interface means its going to have all the properties a normal input attribute must contain. And if this interface is defined as a type of another object, it means that particular object must contain all the interfaces properties
