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

export const getProducts = async () => {
  const res = await fetch(`${HOSTNAME}/api/product/recents`);
  return res.json();
};

export const createProduct = async (
  name,
  description,
  category,
  price,
  images
) => {
  const body = {
    name,
    description,
    category,
    price,
    images,
  };
  const res = await fetch(`${HOSTNAME}/api/product/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const getAllCategories = async () => {
  const res = await fetch(`${HOSTNAME}/api/category/all`);
  return res.json();
};

export const getProductsByCategory = async (category_id) => {
  const res = await fetch(`${HOSTNAME}/api/product/category/${category_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const getDetails = async (product_id) => {
  const res = await fetch(`${HOSTNAME}/api/product/details/${product_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
