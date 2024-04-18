import React, { useEffect, useState } from 'react'
import * as yup from 'yup';

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
  fullName: yup.string().min(3,validationErrors.fullNameTooShort).max(20, validationErrors.fullNameTooLong),
  size: yup.string().matches('[SML]', validationErrors.sizeIncorrect)
});

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {

  const [fullName, setFullName] = useState('');
  const [nameErr, setNameErr] = useState('');

  const [size, setSize] = useState('');
  const [sizeErr, setSizeErr] = useState('');

  const [toppingsList, setToppingsList] = useState([]);

  let handleNameEntry = (nameEntry) => {
    setFullName(nameEntry.target.value);
    formSchema.validate({fullName: nameEntry.target.value}).then(setNameErr('')).catch((err) => {setNameErr(err.message)});
  }

  let handleSizeEntry = (sizeEntry) => {
    console.log('handling size entry');
    console.log(sizeEntry.target.value);
    setSize(sizeEntry.size);
    formSchema.validate({size: sizeEntry.target.value})    .then(setSizeErr('')).catch((err) => {setSizeErr(err.message)});
  }


  let handleToppingEntry = (toppingEntry) => {
    const toppingInput = document.getElementById('toppingInput');

      console.log(toppingInput.children.length);
      console.log('.................................');

      const result = [];

      for(let i = 0; i < toppingInput.children.length; i++) {
        let currentCheckbox = toppingInput.children[i].querySelector('input'); 
        if(currentCheckbox.checked) {
          result.push(currentCheckbox.name);
        }
      }
      console.log(result);
      setToppingsList(result);
  }

  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value = {fullName} onChange = {handleNameEntry} />
        </div>
        {nameErr && <div className='error'>{nameErr}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" onChange = {handleSizeEntry}>
          <option value="">----Choose Size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          </select>
        </div>
        {sizeErr && <div className='error'>{sizeErr}</div>}
      </div>

      <div className="input-group" id="toppingInput">
        {
          toppings.map((topping) => 
              (
                <label key={topping.topping_id} onChange={handleToppingEntry}>
                  <input name={topping.topping_id} type="checkbox" />
                  {topping.text} 
                  <br/> 
                </label>
              )
            )
        }
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" />
    </form>
  )
}