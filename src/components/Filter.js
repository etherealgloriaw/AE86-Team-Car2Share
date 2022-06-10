import {useState,React} from 'react';

export const Filter = () => {

    const[option1, setValue1] = useState('true');
    const[option2, setValue2] = useState('');

    const handleOption1Change = (e) => {
        e.preventDefault();
        setValue1('true');
        setValue2('');
    };

    const handleOption2Change = (e) => {
        e.preventDefault();

        setValue2('true');
        setValue1('');

};



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
                <input type="radio" id="option1" value={'false'} onChange={handleOption1Change}/>Lowest to Highest
                <input type="radio" id="option2" value={option2} onChange={handleOption2Change}/>Highest to Lowest
            </div>

        </div>
      
        )

}
