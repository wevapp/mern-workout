import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// Get Local API from dot env
const WORKOUT_API = import.meta.env.VITE_WORKOUT_API

const Edit = () => {

    const { id } = useParams()

    // Navigate to list of user to view updated user
    const navigate = useNavigate()

    // Define error handler
    const [error, setError] = useState(true)

    // Define new variable to stored new value edited workout then patch
    const [updateWorkout, setUpdateWorkout] = useState({
        title: '',
        reps: 0,
        load: 0,
    })

    // First need to get the specific workout b4 edit
    useEffect(() => {
        axios.get(`${WORKOUT_API}/${id}`)
        .then(response => setUpdateWorkout(response.data))
        .catch(error => console.log(error.response))
    },[])

    // Update workout
    const handleUpdate = () => {
        axios.patch(`${WORKOUT_API}/edit/${id}`, updateWorkout)
        .then((response) => {
            alert('Updated Workout!')
            navigate('/')
        }).catch(error => console.log(error.response))
    }

  return (
    <div className='font-semibold flex flex-col px-10 py-6 gap-4 fixed right-20 border'>
        <section className='flex flex-col'>
            <label className='ml-2'>Title</label>
            <input 
                type="text"
                value={updateWorkout.title}
                onChange={(e) => setUpdateWorkout({...updateWorkout, title: e.target.value})}
                className='border-2 py-1 pl-2'
            />
        </section>

        <section className='flex flex-col'>
            <label className='ml-2'>Reps</label>
            <input 
                type="number"
                value={updateWorkout.reps}
                onChange={(e) => setUpdateWorkout({...updateWorkout, reps: e.target.value})}
                className='border-2 py-1 pl-2'
            />
        </section>

        <section className='flex flex-col'>
            <label className='ml-2'>Loads</label>
            <input 
                type="number"
                value={updateWorkout.load}
                onChange={(e) => setUpdateWorkout({...updateWorkout, load: e.target.value})}
                className='border-2 py-1 pl-2'
            />
        </section>

        <button 
            onClick={handleUpdate}
            className='bg-green-500 text-white py-2 mt-1 rounded'
            >Update Workout
        </button>
            {/* {error ? "" : <section className='text-center text-red-500 flex'>
                <small className='material-symbols-outlined mr-2'>Error</small>
                <small>Please fill out all fields!</small>
            </section>} */}
    </div>
 
  )
}

export default Edit