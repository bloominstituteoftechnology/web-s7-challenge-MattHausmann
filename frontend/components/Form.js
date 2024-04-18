import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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

  const [pizzaSize, setPizzaSize] = useState('');
  const [sizeErr, setSizeErr] = useState('');

  const [toppingsList, setToppingsList] = useState([]);

  const [values, setValues] = useState({ password: "", accept: false });
  const [errors, setErrors] = useState({ password: "", accept: "" });
  const [inputEnabled, setInputEnabled] = useState(false);

  // New state below:
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  const isFirstRender = useRef(true);

  useEffect(() => {
    if(pizzaSize && !sizeErr && fullName && !nameErr) {
      setInputEnabled(true);
    } else {
      setInputEnabled(false);
    }
  }, [pizzaSize, sizeErr, fullName, nameErr]);

  let handleNameEntry = (nameEntry) => {
    setFullName(nameEntry.target.value);
  }
  useEffect(() => {
    if(!isFirstRender.current) {
      formSchema.validate({fullName: fullName.trim()}).then(setNameErr('')).catch((err) => {setNameErr(err.message)});
    }
  }, [fullName])

  let handleSizeEntry = (sizeEntry) => {
    setPizzaSize(sizeEntry.target.value);
  }

  useEffect(() => {
    if(!isFirstRender.current)  {
      formSchema.validate({size: pizzaSize}).then(setSizeErr('')).catch((err) => {setSizeErr(err.message)});
    }
  }, [pizzaSize])
  




  let handleToppingEntry = (toppingEntry) => {
    const toppingInput = document.getElementById('toppingInput');
      const result = [];

      for(let i = 0; i < toppingInput.children.length; i++) {
        let currentCheckbox = toppingInput.children[i].querySelector('input'); 
        if(currentCheckbox.checked) {
          result.push(currentCheckbox.name);
        }
      }
      setToppingsList(result);
  }

  let handleSubmit = (evt) => {
    let URL = 'http://localhost:9009/api/order';
    let values = {}
    values.fullName = fullName;
    values.size = pizzaSize;
    values.toppings = toppingsList;
    evt.preventDefault();
    axios
      .post(URL, values)
      .then((res) => {
        console.log(res.data.message);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err.data.message);
        setFailure(err.data.message);
      });
      document.getElementById('fullName').value = '';
      setFullName('');
      document.getElementById('size').value='';
      setPizzaSize('');
      setToppingsList([]);
      const toppingInput = document.getElementById('toppingInput');
      for(let i = 0; i < toppingInput.children.length; i++) {
        console.log('aaaa');
        toppingInput.children[i].querySelector('input').checked = false;
      }


      isFirstRender.current = true;
  }

  


  useEffect(() => {
    isFirstRender.current = false;
    return;
  }, []);

  return (
    <form>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

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
      <input type="submit" disabled={!inputEnabled} onClick = {handleSubmit}/>
    </form>
  )
}