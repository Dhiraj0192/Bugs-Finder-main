const storeToken = (value1) => {
  if (value1) {
   
    const { access, refresh } = value1;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    
  }
};

const storeUser = (name,id) => {
  if (name && id) {

    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");

  return { access_token, refresh_token };
};

const getUser = () => {

  let name = localStorage.getItem("name");
  let id = localStorage.getItem("id");

  return {name,id };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("name");
  localStorage.removeItem("id");

};

export { storeToken, getToken, removeToken,storeUser,getUser };
