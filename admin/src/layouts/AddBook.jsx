import React, { useState } from "react";
import "../CSS/AddBook.css";
import axios from "axios";
import { toast } from "react-toastify";

function AddBook() {
  const [book, setBook] = useState({
    photo: null,
    name: "",
    author: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setBook({ ...book, photo: files[0] });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("photo", book.photo);
    formData.append("name", book.name);
    formData.append("author", book.author);
    formData.append("quantity", book.quantity);
    formData.append("description", book.description);

    const res = await axios.post(
      "http://localhost:2700/api/allbooks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(res.data.message);

    setBook({
      photo: null,
      name: "",
      author: "",
      quantity: "",
      description: "",
    });

    e.target.reset();
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Failed to add book");
  }
};

  return (
    <div className="add-book-page">
      <div className="add-book-card">
        <h2>Add New Book</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Book Cover</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Book Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Book Name"
              value={book.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Author Name</label>
            <input
              type="text"
              name="author"
              placeholder="Enter Author Name"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              value={book.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write Book Description..."
              value={book.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
