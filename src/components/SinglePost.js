import { createSlice } from '@reduxjs/toolkit'


export let initialState = [
    {
        "id": 1, "name": "Peter",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "dest": {lat: 49.2872071045258, lng:-123.11517882905274},
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "2022-06-09T01:11",
        "totalTime": 25,
        "contactInfo": "123-456-789"
    },
    {
        "id": 2, "name": "Meg",
        "from": "A",
        "to": "B",
        "dest": {lat: 49.34116418332448, lng:-123.11432052216797},
        "rating": 3,
        "availableSeats": 4,
        "startingTime": "2022-06-09T01:11",
        "totalTime": 25,
        "contactInfo": "123-456-789"
    },
    {
        "id": 3, "name": "Lois",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "dest": {lat: 49.167514062662036, lng:-123.13783813081055},
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "2022-06-09T01:11",
        "totalTime": 25,
        "contactInfo": "123-456-789"
    },
    {
        "id": 4, "name": "Chris",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "dest": {lat: 49.33588264422377, lng:-123.26418090424805},
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "2022-06-09T01:11",
        "totalTime": 25,
        "contactInfo": "123-456-789",
    },
    {
        "id": 5, "name": "Brain",
        "from": "UBC Book Store",
        "to": "Pacific center",
        "dest": {lat: 50.11802598023384, lng:-122.96137023530274},
        "rating": 4,
        "availableSeats": 4,
        "startingTime": "2022-06-09T01:11",
        "totalTime": 25,
        "contactInfo": "123-456-789",
    },

];

const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state = initialState, action) {
            state.push(action.payload)
        },
        postEdit(state = initialState, action) {
            const { id, name, from, to, dest, rating, availableSeats,startingTime, totalTime ,
                contactInfo } = action.payload
            const existingPost = state.find(post => post.id == id)
            if (existingPost) {
                existingPost.from = from
                existingPost.to = to
                existingPost.startingTime = startingTime
                existingPost.availableSeats = availableSeats
                existingPost.contactInfo = contactInfo
            }
        }
    },
})

export const { postAdded, postEdit } = slice.actions

export default slice.reducer



