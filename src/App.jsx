import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [name, setname] = useState('')
  const [datetime, setdatetime] =useState('')
  const [desc,setdesc] = useState('')
  const [price,setprice] = useState('')
  const [transactions,settransactions] = useState([]) 

  useEffect(() => {
    getTransactions().then(settransactions);
  }, [transactions]);
  
  async function getTransactions() {
    const url = "http://localhost:4040/api/transactions";
    const response = await fetch(url);
    const json = await response.json();
    return json; // Return the result to make the promise chain work
  }

  function addnewtransaction(e) {
    e.preventDefault();
   const url = "http://localhost:4040/api/transaction"
   
   fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name ,
      desc,
      price : parseFloat(price),
      datetime,
    }),
  })
    .then(response => {
      response.json().then(json => {
        console.log('result', json);
      });
    });
  }  
  return (
    <>
     <main>
     <h1>400<span>.00</span></h1>
     <form onSubmit = {addnewtransaction}>
      <div className='basic'>
      <input type='text' 
      value = {name}
      onChange = {(e)=> setname(e.target.value)}
      placeholder='something'></input>
      <input 
      value = {datetime}
      onChange = {(e)=> setdatetime(e.target.value)}
      type='datetime-local'></input>
      </div>
      <div className='price'>
        <input type='text'
        value = {price}
        onChange = {(e)=> setprice(e.target.value)} 
        placeholder='+/- Price'></input>
      </div>
      <div className='desc'>
        <input type='text'
        value = {desc}
        onChange = {(e)=> setdesc(e.target.value)} 
        placeholder='Description'></input>
      </div>
      <button type="submit">Add new transaction</button>
     </form>
     <div className="transactions">
     {transactions.length > 0 && transactions.map (transaction => 
     (
      <div>
        <div className="transaction">
          <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="desc">{transaction.desc}</div>
          </div>
          
          <div className="rigth">
          <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
  {transaction.price}
</div>

            
            <div className="datetime">{transaction.datetime}</div>
          </div>
        </div>

      </div>
      ))}
      
     </div>

     
     
     
      </main>
    </>
  )
}

export default App
