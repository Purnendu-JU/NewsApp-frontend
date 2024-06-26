import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country, pageSize, category, setProgress, darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `News Web - ${capitalizeFirstLetter(category)}`;
  }, [category]);

  const updateNews = async () => {
    setProgress(10);
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=10&apikey=ead790a23730a119588e91f8d9d7822b`;
    setLoading(true);
    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.articles.length);
    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    if (articles.length === totalResults) {
      setHasMore(false);
      return;
    }

    setPage(page + 1);
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=10&apikey=ead790a23730a119588e91f8d9d7822b`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    if (articles.length === totalResults) {
      setHasMore(false);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        News Web - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
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
                      title={element.title? element.title : ""}
                      description={element.description? element.description : ""}
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

export default News;