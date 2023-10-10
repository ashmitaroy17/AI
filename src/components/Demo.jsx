// import React from 'react'
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { copy, linkIcon, loader, tick } from "../assets";

// import the hook useLazyGetSummaryQuery 

import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
   
   const [article, setArticle] = useState({
     url: "",
     summary: " ",
   });
  
  const [ allArticles, setAllArticles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [copied, setCopied] = useState("");
  
   //  calling hook
   // eslint-disable-next-line no-unused-vars
   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
   
  //  History restore
  useEffect(() => {
   const articlesFromLocalStorage = JSON.parse (
    localStorage.getItem('articles')
   )
   if(articlesFromLocalStorage) {
    setAllArticles(articlesFromLocalStorage)
   }

  }, []);

   // eslint-disable-next-line no-unused-vars
   const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary};
      
      
      const updatedAllArticles= [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
   }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }
   
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          {/* <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
            style={{
              background: `url(${linkIcon}) no-repeat 10px center,white`, // Set the image as a background
              paddingLeft: "35px", // Adjust the padding to accommodate the image
            }}
          />
          {/* // When you need to style an element based on the state of a sibling
          element, mark the sibling with the peer class, and use peer-*
          modifiers to style the target element */}
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            style={{
              backgroundColor: "white", // Set the background color to white
              border: "none", // Remove the border if needed
              position: "absolute",
              right: "450px",
              top: 0,
              bottom: 0,
              height: "100%", // Set the button height to match the input field
              width: "35px", // Set the button height to match the input field
              display: "flex", // Center the content horizontally
              justifyContent: "center", // Center the content horizontally
              alignItems: "center",
            }}
          >
            <p>🔍</p>
          </button>
        </form>

        {/* browse URL History */}
        <div className="white-box">
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="box-content">
                  <div
                    className="copy_btn"
                    onClick={() => handleCopy(item.url)}
                  >
                    <img
                      src={copy === item.url ? tick : copy}
                      alt={copy === item.url ? "tick_icon" : "copy_icon"}
                      className="w-[40%] h-[40%] object-contain"
                      style={{ marginRight: "10px" }}
                    />
                  </div>
                  <p
                    className="flex-1 font-satoshi text-sm truncate"
                    style={{ color: "blue" }}
                  >
                    {item.url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* display results */}
      <div className="my-10 max-w-full flex justify-center items-center h-screen">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <h2 className="font-satoshi font-bold text-blue-700 text-xl text-center">
              Article <span className="blue_gradient">Summary</span>
            </h2>
          )
        )}
      </div>

      {article.summary && (
        <div className=" shadow-diffuse snow-box flex flex-col gap-3">
          <p className="font-inter font-medium text-sm text-blue-700 text-center">
            {article.summary}
          </p>
        </div>
      )}
    </section>
  );
};

export default Demo
