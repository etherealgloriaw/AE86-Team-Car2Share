import React from 'react';
import "./style/Filter.css"
export const Filter = () => {
    return(
        <div>
            <div className="filter">
            <label htmlFor="filter">Filter</label> 
            <select >              
                <option >Distance (starting point)</option>
                <option >Distance (destination)</option>
                <option >Ratings</option>
                <option>Total Time</option>
                <option>Available Seats</option>              
            </select>
            </div>
            <div className='sorting'>
                <input type="radio" name="option" />Lowest to Highest
                <input type="radio" name="option" />Highest to Lowest
            </div>

        </div>
      
        )

}