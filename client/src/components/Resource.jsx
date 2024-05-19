import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=857fd4755c4e423cac83b18bfe5741cc',);
        console.log(response);
        setNewsData(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Resources</h1>
      <ul>
        {newsData.map((article, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.description}</p>
            <p className="text-gray-500">{new Date(article.publishedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resource;
