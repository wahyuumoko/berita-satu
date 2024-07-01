// src/app/profile/page.tsx
"use client";

import { title } from "process";
import React, { useState, useEffect} from "react";

export const initialState = {
  title: "",
  img: "",
  category: "",
  author: "",
  brief: "",
  validate: "",
};
export default function createPostItem() {
  const [text, setText] = useState(initialState);

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: "" });
  };

  const handleForSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //simple for validation
    if (text.title === "" || text.category === "" || text.brief === "") {
      setText({ ...text, validate: "incomplete" });
      return;
    }
    //send post request
    try {
      const response = await fetch("/api/postitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      setText({ ...text, validate: "loading" });

      const result = response.status;

      if (result === 201) {
        setText({ ...text, validate: "success" });
        console.log("Succes", result);
      }
    } catch (error) {
      setText({ ...text, validate: "error" });
      console.log("Error", error);
    }
  };

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Create New Post</h1>
                    </div>
                  </div>
                  <form onSubmit={handleForSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Judul"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Image URL</label>
                        <input
                          type="text"
                          name="img"
                          value={text.img}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Link Gambar"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Category</label>
                        <input
                          type="text"
                          name="Category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Kategori Post"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Author</label>
                        <input
                          type="text"
                          name="Author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Penulis Post"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Brief</label>
                        <textarea
                          className="form-control"
                          value={text.brief}
                          name="brief"
                          onChange={handleTextChange}
                          placeholder="Masukkan Brief"
                          cols={30}
                          rows={10}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === "loading" && (
                          <div className="loading">Sending Post</div>
                        )}
                        {text.validate === "incomplete" && (
                          <div className="error-message">
                            Please fill in all above details.
                          </div>
                        )}
                        {text.validate === "success" && (
                          <div className="sent-message">
                            post artikel sukses
                          </div>
                        )}
                      </div>
                      {text.validate === "error" && (
                        <div className="error-message">server error</div>
                      )}
                      <div className="col-12 d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Post Item"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
