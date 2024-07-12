import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../search-view/search-view.scss";

export const SearchView = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState("");

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchItem(newSearch);
    onSearch(newSearch);
  };

  return (
    <Form className="ml-auto navbar-search">
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Find movie"
          value={searchItem}
          className="search-input"
          onChange={handleSearchChange}
        />
      </div>
    </Form>
  );
};
