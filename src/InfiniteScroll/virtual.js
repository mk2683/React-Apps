import React, { useState, useEffect } from "react";

const MyVirtualizedGrid = ({ data, columnCount, rowHeight, columnWidth }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const newScrollTop = document.getElementById("grid-container").scrollTop;
      const newScrollLeft =
        document.getElementById("grid-container").scrollLeft;
      setScrollTop(newScrollTop);
      setScrollLeft(newScrollLeft);
    };

    document
      .getElementById("grid-container")
      .addEventListener("scroll", handleScroll);

    return () => {
      document
        .getElementById("grid-container")
        .removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const visibleRows = Math.ceil(
      document.getElementById("grid-container").clientHeight / rowHeight
    );
    const visibleCols = Math.ceil(
      document.getElementById("grid-container").clientWidth / columnWidth
    );
    const startIndex = Math.floor(scrollTop / rowHeight) * columnCount;
    const endIndex = startIndex + visibleRows * columnCount;
    const visibleData = data.slice(startIndex, endIndex);

    setVisibleItems(visibleData);
    setOffset({ top: (startIndex / columnCount) * rowHeight, left: 0 });
  }, [scrollTop, scrollLeft, data, columnCount, rowHeight, columnWidth]);

  console.log(visibleItems);

  return (
    <div
      id="grid-container"
      style={{
        width: columnCount * columnWidth,
        height: (data.length / columnCount) * rowHeight,
        overflow: "auto",
      }}
    >
      <div
        style={{
          position: "elative",
          top: offset.top,
          left: offset.left,
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={index}
            style={{
              width: columnWidth,
              height: rowHeight,
              float: "left",
            }}
          >
            I{item.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVirtualizedGrid;
