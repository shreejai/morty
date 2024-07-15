import '@testing-library/jest-dom'
import { GET_CHARACTERS } from "@/lib/fetch-data";
import { mockApi } from '../mocks/mockApi';
import { getCharactersService } from '../mocks/getCharactersService';

 
jest.mock('../mocks/mockApi.ts', () => {
  const mockApolloClient = { query: jest.fn() };
  return { mockApi: jest.fn(() => mockApolloClient) };
});

describe('Get characters', () => {
  it('should query and return data', async () => {
    const client = mockApi();
    const mockGraphQLResponse = { data: {}, loading: false, errors: [] };
    client.query.mockResolvedValueOnce(mockGraphQLResponse);
    const { data, loading, errors } = await getCharactersService("Rick", 1)
    expect(client.query).toHaveBeenCalledWith({ query: GET_CHARACTERS, variables: { name: 'Rick', page: 1 } });
    expect(data).toEqual({});
    expect(loading).toBeFalsy();
    expect(errors).toEqual([]);
  })
})