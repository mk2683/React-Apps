import React, { useState } from "react";

export default function Parent() {
  const [count, setCount] = useState(0);

  console.log(count);

  return (
    <>
      <div>Parent</div>
      <div>parent count: {count}</div>
      <Child count={count} setCount={setCount} />
    </>
  );
}

function Child({ count, setCount }) {
  function incrementCount() {
    setCount(count + 1);
  }

  return (
    <>
      <div>child count: {count}</div>
      <button onClick={incrementCount}>Child</button>
    </>
  );
}
