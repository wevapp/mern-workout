import React from 'react'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Get Local API from dot env
const WORKOUT_API = import.meta.env.VITE_WORKOUT_API

const Home = () => {
      // if you want to fetch object into database use bracket to read the data in map method
    const [workouts, setWorkouts] = useState([]) // stored data from database

    // Define error handler
    const [error, setError] = useState(true)

    // Define new workout variable
    const [newWorkout, setNewWorkout] = useState({
        title: '',
        reps: 0,
        load: 0,
    })

    // Add new workout
    const handleSubmit = (e) => {
        e.preventDefault()
        const {title, reps, load} = newWorkout
        if(title === "" || reps < 0 || load < 0){
            setError(false)
        } else {
            axios.post(WORKOUT_API, newWorkout)
            .then((response) => {
                location.reload()
            }).catch(error => console.log(error.response))
            setError(true)
            setNewWorkout({
                title: '',
                reps: 0,
                load: 0,
            });
        }
    }

    // Delete workout
    const handleDelete = (workId, workTitle) => {
        const confirm = window.confirm(`Would you like to delete? ${workTitle}`);
        if (confirm) {
            axios.delete(`${WORKOUT_API}/${workId}`)
            .then((response) => {
                location.reload();
            })
            .catch(error => console.log(error.response));
        }
    };

    // Get all workout
    useEffect(() => {
        axios.get(WORKOUT_API)
        .then(response => setWorkouts(response.data))
        .catch(error => console.log(error.response))
    },[])

    return (
        
    <div className='grid grid-cols-3 gap-2 h-full w-full mt-4'>
        <div className="col-span-2 h-full">
            <ul className='grid grid-cols-1 gap-5'>
            {workouts.map((workout) => (
                <li 
                    className='shadow-md px-10 py-2 flex justify-between items-center font-semibold rounded bg-white'
                    key={workout._id}
                    >
                        <div className='flex flex-col'>
                            <span className='text-green-500 text-xl'>Title: {workout.title}</span> 
                            <span>Reps: {workout.reps}</span> 
                            <span>Load: {workout.load}</span> 
                            <span>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix : true })}</span>
                        </div>
                        <div>
                            <button className='material-symbols-outlined mr-5 text-orange-300'><Link to={`/edit/${workout._id}`}>edit</Link></button>
                            <button
                                onClick={() => {handleDelete(workout._id, workout.title)}}
                                className='material-symbols-outlined ml-7 text-rose-400'>
                                delete
                            </button>
                        </div>
                </li>
            ))}
            </ul>
        </div>
        <div className='font-semibold flex flex-col px-10 py-6 gap-4 fixed right-20 border'>
            <section className='flex flex-col'>
                <label className='ml-2'>Title</label>
                <input 
                    type="text"
                    value={newWorkout.title}
                    onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}
                    className='border-2 py-1 pl-2'
                />
            </section>

            <section className='flex flex-col'>
                <label className='ml-2'>Reps</label>
                <input 
                    type="number"
                    value={newWorkout.reps}
                    onChange={(e) => setNewWorkout({...newWorkout, reps: e.target.value})}
                    className='border-2 py-1 pl-2'
                />
            </section>

            <section className='flex flex-col'>
                <label className='ml-2'>Loads</label>
                <input 
                    type="number"
                    value={newWorkout.load}
                    onChange={(e) => setNewWorkout({...newWorkout, load: e.target.value})}
                    className='border-2 py-1 pl-2'
                />
            </section>

            <button 
                onClick={(e) => handleSubmit(e)}
                className='bg-green-500 text-white py-2 mt-1 rounded'
                >Add Workout
            </button>
                {error ? "" : <section className='text-center text-red-500 flex'>
                    <small className='material-symbols-outlined mr-2'>Error</small>
                    <small>Please fill out all fields!</small>
                </section>}
        </div>
    </div>
    )
}

export default Home