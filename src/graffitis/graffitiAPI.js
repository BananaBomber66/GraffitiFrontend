import { Graffiti } from "./Graffiti";

const baseUrl = "https://graffitiapi.onrender.com";
//const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/graffitis`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const graffitiAPI = {
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(checkStatus)
      .then(parseJSON)
      .then((graffitis) => {
        return graffitis.map((p) => {
          return new Graffiti(p);
        });
      })
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the projects. Please try again."
        );
      });
  },

  patch(graffiti) {
    return fetch(`${url}`, {
      method: "PATCH",
      body: JSON.stringify(graffiti),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error updating the project. Please try again."
        );
      });
  },

  find(_id) {
    return fetch(`${url}/${_id}`).then(checkStatus).then(parseJSON);
  },
};

export { graffitiAPI };
