import { createSlice } from '@reduxjs/toolkit'


export let initialState = [
    {
        "id": 1, "name": "Peter",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "12:30",
        "totalTime": 25
    },
    {
        "id": 2, "name": "Meg",
        "from": "A",
        "to": "B",
        "rating": 3,
        "availableSeats": 4,
        "startingTime": "12:30",
        "totalTime": 25
    },
    {
        "id": 3, "name": "Lois",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "12:30",
        "totalTime": 25
    },
    {
        "id": 4, "name": "Chris",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "12:30",
        "totalTime": 25
    },
    {
        "id": 5, "name": "Brain",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "12:30",
        "totalTime": 25
    },

];

const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state = initialState, action) {
            state.push(action.payload)
        },
    },
})

export const { postAdded } = slice.actions

export default slice.reducer



