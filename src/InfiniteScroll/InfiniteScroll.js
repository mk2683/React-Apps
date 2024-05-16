// import React, { Suspense } from "react";
// import { FixedSizeGrid as Grid } from "react-window";
// import { imageIndex } from "./data.js";
// import MyVirtualizedGrid from "./virtual.js";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { imageIndex } from "./data.js";
import { throttle } from "lodash";
import "./InfiniteScroll.css";
// import "./InfiniteScroll.css";

// const InfiniteScroll = () => (
//   // <Grid
//   //   className="Grid"
//   //   columnCount={5}
//   //   columnWidth={210}
//   //   height={840}
//   //   rowCount={Math.ceil(imageIndex.length / 5)}
//   //   rowHeight={210}
//   //   width={1050}
//   // >
// {({ columnIndex, rowIndex, style }) => (
//   <Cell
//     columnIndex={columnIndex}
//     rowIndex={rowIndex}
//     style={style}
//     imageIndex={imageIndex[rowIndex * 5 + columnIndex]}
//   />
// )}
//   // </Grid>

//   <MyVirtualizedGrid
//     data={imageIndex}
//     columnCount={5}
//     rowHeight={210}
//     columnWidth={210}
//   ></MyVirtualizedGrid>
// );

// export default InfiniteScroll;

// // ReactDOM.render(<Example />, document.getElementById("root"));

// FixedSizeGrid.jsx

const FixedSizeGrid = ({
  columnCount,
  rowCount,
  columnWidth,
  rowHeight,
  width,
  height,
  renderCell,
  imageIndex,
}) => {
  const gridRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });

  const handleScroll = useCallback(() => {
    if (gridRef.current) {
      setScrollPosition({
        scrollTop: gridRef.current.scrollTop,
        scrollLeft: gridRef.current.scrollLeft,
      });
    }
  }, []);

  const visibleRowCount = Math.ceil(height / rowHeight);
  const visibleColumnCount = Math.ceil(width / columnWidth);

  const startRow = Math.floor(scrollPosition.scrollTop / rowHeight);
  const endRow = Math.min(rowCount, startRow + visibleRowCount);
  const startColumn = Math.floor(scrollPosition.scrollLeft / columnWidth);
  const endColumn = Math.min(columnCount, startColumn + visibleColumnCount);

  const cells = [];
  for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
    for (
      let columnIndex = startColumn;
      columnIndex < endColumn;
      columnIndex++
    ) {
      cells.push(
        <div
          key={`${rowIndex}-${columnIndex}`}
          className={
            columnIndex % 2
              ? rowIndex % 2 === 0
                ? "GridItemOdd"
                : "GridItemEven"
              : rowIndex % 2
              ? "GridItemOdd"
              : "GridItemEven"
          }
          style={{
            position: "absolute",
            top: rowIndex * rowHeight,
            left: columnIndex * columnWidth,
            width: columnWidth,
            height: rowHeight,
          }}
        >
          {renderCell({
            columnIndex,
            rowIndex,
            imageIndex: imageIndex[rowIndex * columnCount + columnIndex],
          })}
        </div>
      );
    }
  }

  return (
    <div
      ref={gridRef}
      className="grid-container"
      style={{ width, height, overflow: "auto", position: "relative" }}
      onScroll={handleScroll}
    >
      <div
        style={{
          width: columnCount * columnWidth,
          height: rowCount * rowHeight,
          position: "relative",
        }}
      >
        {cells}
      </div>
    </div>
  );
};

//

// App.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import FixedSizeGrid from './FixedSizeGrid'; // Adjust the path as necessary

const renderCell = ({ columnIndex, rowIndex, style, imageIndex }) => {
  return (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? "GridItemOdd"
            : "GridItemEven"
          : rowIndex % 2
          ? "GridItemOdd"
          : "GridItemEven"
      }
      // style={style}
    >
      <img
        key={imageIndex.id}
        src={`https://source.unsplash.com/random/200x200?sig=${imageIndex.id}`}
        alt={`Random {imageIndex.id}`}
        className="image"
      />
      <span className="image-id">I: {imageIndex.id}</span>
    </div>
  );
};

const columnCount = 5;
const rowCount = Math.ceil(imageIndex.length / 5);
const columnWidth = 210; // Fixed width for each column
const rowHeight = 210; // Fixed height for each row

// const renderCell = ({ columnIndex, rowIndex }) =>
//   `Item ${rowIndex}, ${columnIndex}`;

const InfiniteScroll = () => (
  <div>
    <h1>Photo Album Collection</h1>
    <FixedSizeGrid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      width={1050} // Width of the grid container
      height={840} // Height of the grid container
      imageIndex={imageIndex}
      renderCell={renderCell}
      // renderCell={ {({ columnIndex, rowIndex, style }) => (
      //   <Cell
      //     columnIndex={columnIndex}
      //     rowIndex={rowIndex}
      //     style={style}
      //     imageIndex={imageIndex[rowIndex * 5 + columnIndex]}
      //   />
      // )}}
    />
  </div>
);
export default InfiniteScroll;
// ReactDOM.render(<App />, document.getElementById("root"));
