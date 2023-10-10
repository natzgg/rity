import React, { useEffect, useState } from "react";
import linkIcon from "../assets/link.svg";
import loader from "../assets/loader.svg";
import { useLazyGetSummaryQuery } from "../services/article";

const Content = () => {
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) {
      setArticle(existingArticle);

      return;
    }

    const { data } = await getSummary({
      articleUrl: article.url,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [...allArticles, newArticle];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="w-full mt-16 max-w-xl">
      <div className="flex flex-col w-full gap-4">
        <form
          className="relative flex flex-col justify-center items-center"
          action="submit"
          onSubmit={handleSubmit}
        >
          <img
            className="absolute left-0 w-5 my-2 ml-3"
            src={linkIcon}
            alt=""
          />
          <input
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
            type="url"
            onKeyDown={handleKeyDown}
            required
          />
          <button
            className="submit_btn peer-focus:border-gray-800 peer-focus:text-gray-700"
            type="submit"
          >
            ↵
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card cursor-pointer"
            >
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
        {/* Summary Content */}

        <div className="my-10 max-w-full flex items-center justify-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn't supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
