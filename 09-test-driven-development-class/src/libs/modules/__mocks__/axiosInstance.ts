export const axiosInstance = {
  get: jest.fn(),
  post: jest.fn().mockResolvedValue({
    error: false,
    message: "hello I'm mock function",
  }),
};

export default axiosInstance;
