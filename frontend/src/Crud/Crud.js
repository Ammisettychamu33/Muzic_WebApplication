import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Crud.css";

import API_URL from "../config/api";

const Crud = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("Add");

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    artist: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    setFetching(true);

    try {
      const response = await axios.get(`${API_URL}/albums`);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch albums.");
    } finally {
      setFetching(false);
    }
  };

  const openModal = (mode, id = null) => {
    setModalMode(mode);
    setError("");

    if (mode === "Add") {
      setFormData({
        _id: "",
        title: "",
        artist: "",
        year: "",
      });
    } else {
      const album = data.find(item => item._id === id);

      if (!album) {
        setError("Album not found.");
        return;
      }

      setFormData(album);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setFormData({
      _id: "",
      title: "",
      artist: "",
      year: "",
    });

    setError("");
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const title = formData.title.trim();
    const artist = formData.artist.trim();
    const year = Number(formData.year);

    if (!title || !artist || !year) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear) {
      setError(`Year must be between 1900 and ${currentYear}`);
      setLoading(false);
      return;
    }

    try {
      if (modalMode === "Add") {
        await axios.post(`${API_URL}/albums`, {
          title,
          artist,
          year,
        });
      } else {
        await axios.put(`${API_URL}/albums/${formData._id}`, {
          title,
          artist,
          year,
        });
      }

      await fetchAlbums();
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to save album.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this album?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/albums/${id}`);
      await fetchAlbums();

      if (isModalOpen) {
        closeModal();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete album.");
    }
  };

  return (
    <div className="crud-container">
      <h1>Music Collection</h1>

      <button
        className="insert-button"
        onClick={() => openModal("Add")}
      >
        Add New Album
      </button>

      {error && !isModalOpen && (
        <p className="error">{error}</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {modalMode === "Add"
                ? "Add Album"
                : modalMode === "Update"
                ? "Update Album"
                : "Album Details"}
            </h3>

            {(modalMode === "Add" || modalMode === "Update") && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Title</label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label>Artist</label>

                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label>Year</label>

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {error && <p className="error">{error}</p>}

                <div className="button-group">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : modalMode === "Add"
                      ? "Add Album"
                      : "Update Album"}
                  </button>
                </div>
              </form>
            )}

            {modalMode === "View" && (
              <>
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>

                <p>
                  <strong>Artist:</strong> {formData.artist}
                </p>

                <p>
                  <strong>Year:</strong> {formData.year}
                </p>

                <div className="button-group">
                  <button onClick={closeModal}>
                    Close
                  </button>

                  <button
                    onClick={() => handleDelete(formData._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="table-container">
        {fetching ? (
          <h3>Loading albums...</h3>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">No albums available.</td>
                </tr>
              ) : (
                data.map(item => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.artist}</td>
                    <td>{item.year}</td>

                    <td className="actions">
                      <button
                        onClick={() => openModal("View", item._id)}
                      >
                        View
                      </button>

                      <button
                        onClick={() => openModal("Update", item._id)}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Crud;