import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Fetcher</h2>
      {data.map((item) => (
        <div key={item._id}>
          <p>fName: {item.fName}</p>
          <p>lName: {item.lName}</p>
          <p>Email: {item.email}</p>
          <p>Mobile Number: {item.mobileNum}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default DataFetcher;
