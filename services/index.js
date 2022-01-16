const HOSTNAME = "http://localhost:4400";

//USER
export const signUp = async (first_name, email, password, password2) => {
  const body = {
    first_name,
    email,
    password,
    password2,
  };
  const res = await fetch(`${HOSTNAME}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};
export const signIn = async (email, password) => {
  const body = {
    email,
    password,
  };
  const res = await fetch(`${HOSTNAME}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const getProducts = async () =>{
  const res = await fetch(`${HOSTNAME}/api/product/all`);
  return res.json();
}

export const createProduct = async (image, name, description) =>{
  
}