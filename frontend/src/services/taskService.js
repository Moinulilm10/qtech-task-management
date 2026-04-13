import api from "./api";

const taskService = {
  getAll: async (search = "") => {
    const response = await api.get("/tasks", {
      params: search ? { search } : {},
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  update: async (id, taskData) => {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/tasks/${id}`, { status });
    return response.data;
  },
};

export default taskService;
