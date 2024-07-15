import { mockApi } from "./mockApi";
import { GET_CHARACTERS } from "../src/lib/fetch-data";


const client = mockApi()

export const getCharactersService = async (name: string, page: number) => {
  return client.query({query: GET_CHARACTERS, variables: {name, page}})
} 