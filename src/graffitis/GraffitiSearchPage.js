import React from "react";
import GraffitiSearchBar from "./GraffitiSearchBar";
import { graffitiAPI } from "./graffitiAPI";
import { useState } from "react";
import { Graffiti } from "./Graffiti";
import GraffitiList from "./GraffitiList";
import { useEffect } from "react";

function GraffitiSearchPage() {
  const [graffitis, setGraffitis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => GetSearchResults(query), 300);
    return () => clearTimeout(timeOutId);
  }, [query]);

  async function GetSearchResults(searchString) {
    if (searchString !== "") {
      setLoading(true);
      try {
        const data = await graffitiAPI.search(searchString);
        setGraffitis(data);
        console.log(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    } else {
      setGraffitis([]);
    }
  }

  const onSearch = (searchString) => {
    setQuery(searchString);
  };

  const saveGraffiti = (graffiti) => {
    graffitiAPI
      .patch(graffiti)
      .then((updatedGraffiti) => {
        let updatedGraffitis = graffitis.map((p) => {
          return p._id === graffiti._id ? new Graffiti(updatedGraffiti) : p;
        });

        setGraffitis(updatedGraffitis);
      })
      .catch((e) => {});
  };

  return (
    <>
      <h1 className="x-large centre">Search Graffiti</h1>
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <GraffitiSearchBar onType={onSearch} />
          <div className="col-sm-3"></div>
        </div>
      </div>

      {graffitis.length > 0 && !loading && (
        <GraffitiList graffitis={graffitis} onSave={saveGraffiti} />
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default GraffitiSearchPage;
