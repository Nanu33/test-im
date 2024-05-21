import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import IssuerDashboard from './issuerDashboard'; // Adjust the import path
import * as apiService from '../../../servies/services'; // Adjust the import path

// Mocking the apiService module and sessionStorage
jest.mock('../../../servies/services', () => ({
  SetUpPool: jest.fn(),
}));

const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => store[key] = value.toString()),
    clear: jest.fn(() => store = {})
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

describe('<IssuerDashboard />', () => {
  beforeEach(() => {
    // Reset mocks before each test
    apiService.SetUpPool.mockClear();
    window.sessionStorage.clear();
  });

  it('calls SetUpPool on button click and displays success message', async () => {
    apiService.SetUpPool.mockResolvedValue({ status: 200 });

    const { getByText } = render(<IssuerDashboard apiService={apiService} />);
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(apiService.SetUpPool).toHaveBeenCalled();
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        "setuppooldetails",
        JSON.stringify(['', '', '']) // These values depend on the initial state or any user interaction before the submit
      );
      expect(getByText(/loading\.\.\./i)).toBeInTheDocument();
    });
  });
});
