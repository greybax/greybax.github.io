# Frontend DTO Challenge

#dto, #frontend, #javascript, #typescript, #react, #nodejs, #socket-io, #english;

_July 05, 2022_

Recently I've been working on some kinda coding assesment "challenge". The task already includes server side code based on `NodeJS` and `Socket.IO` and it requires to implement ReactJS app which will gets data from server and renders it in proper way.

## Requirements

* Build an in-browser application that displays Orders in real-time as they are delivered from a provided
server API, and allows users to search their Orders by price.
* The UI should have at least basic styling.
* The Order Events are emitted from the server in batches every second. An Order Event will have the following format:
```
{
    "id": "f3a68285", 
    "event_name": "COMPLETED", 
    "price": 7026,
    "item": "fries",
    "customer": "Anthony Cooper",
    "destination": "31508 Cook Groves Apt. 457, Cooperberg, MA 94003",
}
```
* As orders are ingested, if an existing order with the same ID is already rendered on the page, its data
should be updated.
* Users should be able to search their received Orders by dollar amount, which should display the
matching Orders as well as the count of matching Orders. Searching should happen as a user types;
* Don't use libraries that provide common algorithmic functionality (e.g., lodash, jquery, etc).

## My solution

I've used [create-react-app](https://create-react-app.dev/docs/adding-typescript/) with TypeScript just to create dummy React App from the scratch.

### Working with Socket.IO from React App

Its pretty simple to use it. Just put some lines of code to your root App component

```
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
...
}
export default App;

```

### General State Management Idea

I've choosen to work react hooks for state menagement. And in particular I've used these ones across my app:

* [useState](https://reactjs.org/docs/hooks-reference.html#useState)
* [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
* [useContext (createContext for custom contexts)](https://reactjs.org/docs/hooks-reference.html#usecontext)
* [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
* [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

So the common idea is to create custom `OrderContext` just to make state management easier across main components.

The main components actually are:

1. **App.js** - have `tableReducer` for managing data in table UI which comes from service. It has 2 methods
  - `add` - for inserting data to table
  - `search` - for searching data which are already in table and coming from service via socket.io as well.
2. **Orders.tsx** - component needs for rendering data which comes from server in UI. It listens `order_event` from socket and saves data in state for further converations. Also it calls `convertCentsToDollar` method for cents --> dollar convertation. 
3. **SearchInput.tsx** - component dispatch `search` event with search payload to `OrderContext` where reducer from App.js do remaining work.

### How to update already existed data on the page?

I've solved this problem by using [Map() ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). All logic exists in `add` action of `tableReducer` in App.js:

```
case 'add': {
  for (let i = 0; i < action.payload.length; i++) {
    if (state.data.has(action.payload[i].id)) {
      state.data.set(state.data.get(action.payload[i].id).id, action.payload[i]);
    } else {
      state.data.set(action.payload[i].id, action.payload[i]);
    }
  }

  return {
    search: state.search,
    data: new Map([...state.data].map((o) => {
      return [o[0], o[1]];
    })
  )}
}
```

## Result

Feel free to check code and fork it on my github [order-data-challenge](https://github.com/greybax/order-data-challenge)

Happy working on your ReactJS app with Socket.IO! :y:
