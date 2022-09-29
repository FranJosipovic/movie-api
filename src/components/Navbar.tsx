import React from "react";
import { Navbar as NavBS, Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsSearch } from "react-icons/bs";

export default function Navbar() {
  return (
    <NavBS
      className="dark-secondary d-flex text-white px-5"
      style={{
        justifyContent: "space-between",
        gap: "10px",
        position: "fixed",
        zIndex: "101",
        width: "100%",
      }}
    >
      <NavBS.Brand
        className="text-white"
        style={{ textDecoration: "underline" }}
      >
        Movie Roulette
      </NavBS.Brand>
      <div className="w-50" style={{ position: "relative" }}>
        <Form.Control
          className="w-100 dark-secondary"
          type="text"
          placeholder="Search Movie By Title..."
          style={{
            backgroundColor: "#1A1A2E",
            border: "4px solid #0F3460",
            color: "gray",
          }}
        />
        <div
          className="search-btn"
          style={{
            background: "#0F3460",
            height: "100%",
            display: "flex",
            cursor: "pointer",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            position: "absolute",
            right: "0",
            top: "50%",
            translate: "0 -50%",
            justifyContent: "center",
            alignItems: "center",
            width: "42px",
          }}
        >
          <BsSearch className="search-btn" />
        </div>
      </div>

      <NavDropdown
        title="Sort By"
        style={{ translate: "-100px 0", zIndex: "101" }}
      >
        <NavDropdown.Item>Release Date</NavDropdown.Item>
        <NavDropdown.Item>Popularity</NavDropdown.Item>
        <NavDropdown.Item>Rating</NavDropdown.Item>
        <NavDropdown.Item>Revenue</NavDropdown.Item>
      </NavDropdown>
    </NavBS>
  );
}
