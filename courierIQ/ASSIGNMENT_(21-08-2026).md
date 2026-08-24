### `useNavigate`
In `useNavigate` we pass data by first calling this hook into a variable.
eg. 
```javascript
const navigate = useNavigate()
```
then we call the variable and pass the path into it. eg. `navigate('/')`

---

### State Changes
States changes when the value of that state is modified or updated. And its done when you use its setter function to create the update.
eg.
```javascript
const [count, setCount] = useState(0);
setCount(5);
```

---

### Component Mounting & Unmounting
When a component mounts it means its been displayed onto the screen and when it unmounts it means it taken away from the screen.
eg.
```jsx
{isOpen && <Modal />}
```
if `isOpen` is true the modal will mount on the screen
but if it becomes false it will unmount

---

### Re-renders
what trigger re-renders is when a components state changes, or when a prop of a component is changed.
eg.
```jsx
function App() {
  const [count, setCount] = useState(0);
  setCount(count + 1)
  return <div>{count}</div>;
}
```
