const AxiosMock = jest.fn().mockImplementation(() => ({
  get: jest.fn(),
  post: jest.fn(),
}));

export default AxiosMock;
