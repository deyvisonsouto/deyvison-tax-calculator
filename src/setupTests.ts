import '@testing-library/jest-dom';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    create:jest.fn()
  },
}));