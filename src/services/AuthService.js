import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Função para registrar usuário
export const register = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/register`, usuario);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Erro ao conectar com o servidor");
    }
  }
};

// Função para login
export const login = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/login`, usuario);
    // Se o backend retornar token JWT, você pode salvar no localStorage
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Erro ao conectar com o servidor");
    }
  }
};

// Função para logout
export const logout = () => {
  localStorage.removeItem("user");
};

// Função para pegar usuário logado
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};