// eslint-disable-next-line no-unused-vars
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line no-unused-vars
// const options = {
//   method: 'GET',
//   url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//   params: {
//     url: 'https://time.com/6266679/musk-ai-open-letter/',
//     length: '3'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'd56f53c140msh049d02c0c528f78p1b3c15jsn5eb94b607dfb',
//     'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//   }
// };


const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;


export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      // eslint-disable-next-line no-unused-vars
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;