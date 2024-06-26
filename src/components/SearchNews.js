import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchNews = ({ searchQuery, country, setProgress, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async (query, page = 1) => {
    setProgress(10);
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=${country}&max=10&page=${page}&apikey=ead790a23730a119588e91f8d9d7822b`;
    setLoading(true);
    setNotFound(false); // Reset not found state
    try {
      let data = await fetch(url);
      setProgress(30);
      let parsedData = await data.json();
      setProgress(70);

      if (!parsedData.articles || parsedData.articles.length === 0) {
        setArticles([]);
        setTotalResults(0);
        setLoading(false);
        setHasMore(false);
        setNotFound(true); // Set not found state if no articles are found
      } else {
        setArticles((prevArticles) => (page === 1 ? parsedData.articles : prevArticles.concat(parsedData.articles)));
        setTotalResults(parsedData.articles.length);
        setLoading(false);
        setHasMore(parsedData.articles.length > 0);
        setNotFound(false); // Ensure not found is false if articles are found
      }
    } catch (error) {
      console.error('Failed to fetch news articles:', error);
      setArticles([]);
      setTotalResults(0);
      setLoading(false);
      setHasMore(false);
      setNotFound(true); // Show not found message on error
    }
    setProgress(100);
  };

  useEffect(() => {
    updateNews(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== '') {
      updateNews(searchQuery);
    }
  }, [searchQuery]);

  const fetchMoreData = async () => {
    if (articles.length >= totalResults) {
      setHasMore(false);
      return;
    }

    const nextPage = page + 1;
    setPage(nextPage);
    updateNews(searchQuery, nextPage);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        Search Results for "{capitalizeFirstLetter(searchQuery)}"
      </h1>
      {loading && <Spinner />}
      {!loading && notFound && (
        <h2 className="text-center">Not found</h2>
      )}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              if (element) {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.image}
                      newsUrl={element.url}
                      date={element.publishedAt}
                      source={element.source.name}
                      darkMode={darkMode}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default SearchNews;