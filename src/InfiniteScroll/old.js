// // import React, { useState, useEffect } from "react";
// // import "./InfiniteScroll.css";
// // import { Card, Button, Space } from "antd";
// // const clientID = `?client_id=JKX4P_1URlHpvW_p4gNrWaN9AFBeeeG3I2sJgQesPsc`;
// // const mainUrl = `https://api.unsplash.com/photos/`;
// // const searchUrl = `https://api.unsplash.com/search/photos/`;

// // function InfiniteScroll() {
// //   const [loading, setLoading] = useState(false);
// //   const [photos, setPhotos] = useState([]);
// //   const [page, setPage] = useState(0);
// //   const [query, setQuery] = useState("");

// //   useEffect(() => {
// //     fetchImages();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page]);

// //   const fetchImages = async () => {
// //     setLoading(true);
// //     let url;
// //     const urlPage = `&page=${page}`;
// //     const urlQuery = `&query=${query}`;
// //     if (query) {
// //       url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
// //     } else {
// //       url = `${mainUrl}${clientID}${urlPage}`;
// //     }
// //     try {
// //       const response = await fetch(url);
// //       console.log("response", response);
// //       const data = await response.json();
// //       console.log("data", data);
// //       setPhotos((oldPhotos) => {
// //         if (query && page === 1) {
// //           return data.results;
// //         } else if (query) {
// //           return [...oldPhotos, ...data.results];
// //         } else {
// //           return [...oldPhotos, ...data];
// //         }
// //       });
// //       setLoading(false);
// //     } catch (error) {
// //       console.log(error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const event = window.addEventListener("scroll", () => {
// //       if (
// //         (!loading && window.innerHeight + window.scrollY) >=
// //         document.body.scrollHeight - 2
// //       ) {
// //         setPage((oldPage) => {
// //           return oldPage + 1;
// //         });
// //       }
// //     });

// //     return () => window.removeEventListener("scroll", event);
// //   }, [loading]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setPage(1);
// //   };

// //   console.log("page", page);
// //   console.log(photos);

// //   return (
// //     <div className="container">
// //       <Space style={{ marginBottom: 16, marginTop: 10 }}>
// //         <input
// //           type="text"
// //           placeholder="Search Images"
// //           value={query}
// //           style={{ width: 300 }}
// //           onChange={(e) => setQuery(e.target.value)}
// //           className="form-control"
// //         />
// //         <Button type="primary" onClick={handleSubmit}>
// //           Search
// //         </Button>
// //       </Space>
// //       <div className="row">
// //         {photos.map((image, index) => (
// //           <div key={index} className="col-md-4">
// //             <Card
// //               cover={
// //                 <img
// //                   src={image.urls.regular}
// //                   alt="random"
// //                   style={{
// //                     height: "200px",
// //                     width: "200px",
// //                     objectFit: "cover",
// //                   }}
// //                 />
// //               }
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default InfiniteScroll;

// // import React, { useState, useEffect, useRef } from "react";
// import { imageUrls } from "./data";
// //import "./ImageGrid.css"; // Import CSS file for styling

// // console.log(imageUrls);

// // const ImageGrid = ({ imageUrls }) => {
// //   const [visibleImages, setVisibleImages] = useState([]);
// //   const containerRef = useRef(null);

// //   useEffect(() => {
// //     const container = containerRef.current;

// //     // Function to handle intersection of images
// //     const handleIntersection = (entries) => {
// //       entries.forEach((entry) => {
// //         const { target } = entry;
// //         if (entry.isIntersecting) {
// //           // Add image to visibleImages when it enters the viewport
// //           setVisibleImages((prevVisibleImages) => [
// //             ...prevVisibleImages,
// //             target.src,
// //           ]);
// //         } else {
// //           // Remove image from visibleImages when it exits the viewport
// //           setVisibleImages((prevVisibleImages) =>
// //             prevVisibleImages.filter((url) => url !== target.src)
// //           );
// //         }
// //       });
// //     };

// //     if (container) {
// //       var observer = new IntersectionObserver(handleIntersection, {
// //         root: null,
// //         rootMargin: "0px",
// //         threshold: 0.5, // Trigger when 50% of the image is visible
// //       });

// //       // Observe all images inside the container
// //       container.querySelectorAll("img").forEach((img) => observer.observe(img));
// //     }

// //     return () => {
// //       // Clean up observer on component unmount
// //       if (container) {
// //         container
// //           .querySelectorAll("img")
// //           .forEach((img) => observer.unobserve(img));
// //       }
// //     };
// //   }, [imageUrls]); // Re-run effect when imageUrls change

// //   return (
// //     <div className="image-grid" ref={containerRef}>
// //       {imageUrls.map((imageUrl, index) => (
// //         <div key={index} className="image-item">
// //           <img
// //             src={`https://source.unsplash.com/random/200x200?sig=${imageUrl.id}`}
// //             alt={`Random ${index}`}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// import React, { useState, useEffect, useRef } from "react";

// const ImageSlider = ({ imageUrls }) => {
//   const [windowTop, setWindowTop] = useState(0);
//   const [visibleIndexes, setVisibleIndexes] = useState([]);
//   const containerRef = useRef(null);

//   const itemHeight = 100; // Assuming each image item is 100px in height
//   const numColumns = 5;
//   const numRows = 4;

//   const calculateVisibleIndexes = () => {
//     const container = containerRef.current;
//     const scrollTop = container.scrollTop;
//     const windowHeight = container.clientHeight;

//     const startRow = Math.floor(scrollTop / itemHeight);
//     const endRow = startRow + Math.ceil(windowHeight / itemHeight);
//     const startIndex = startRow * numColumns;
//     const endIndex = endRow * numColumns;

//     setVisibleIndexes(
//       Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i)
//     );
//     setWindowTop(scrollTop);
//   };

//   useEffect(() => {
//     const container = containerRef.current;

//     const handleScroll = () => {
//       calculateVisibleIndexes();
//     };

//     container.addEventListener("scroll", handleScroll);

//     // Initial calculation
//     calculateVisibleIndexes();

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: "100%",
//         height: "400px", // Height of the viewport
//         overflowY: "auto",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           height: `${(imageUrls.length / numColumns) * itemHeight}px`, // Total height of all images
//           position: "relative",
//         }}
//       >
//         {visibleIndexes.map((index) => (
//           <img
//             key={index}
//             src={`https://source.unsplash.com/random/200x200?sig=${index.id}`}
//             alt={`Random ${index}`}
//             style={{
//               width: `${100 / numColumns}%`,
//               height: `${itemHeight}px`,
//               position: "absolute",
//               top: `${Math.floor(index / numColumns) * itemHeight}px`,
//               left: `${(index % numColumns) * (100 / numColumns)}%`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default ImageSlider;

// const InfiniteScroll = () => {
//   // Mock image URLs (replace with actual image URLs from backend)
//   // const imageUrls = Array.from(
//   //   { length: 1000 },
//   //   (_, i) => `https://source.unsplash.com/random/200x200?sig=${i}`
//   // );

//   return (
//     <div className="app">
//       <h1>Dynamic Image Grid</h1>
//       <ImageSlider imageUrls={imageUrls} />
//     </div>
//   );
// };

// export default InfiniteScroll;
