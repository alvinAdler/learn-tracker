import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ResponseNote, PayloadNote } from './types'

// Define a service using a base URL and expected endpoints
export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  endpoints: (build) => ({
    getListNotes: build.query<ResponseNote, PayloadNote>({
      query: () => `/notes/`
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetListNotesQuery } = notesApi