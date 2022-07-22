import React, { useState } from 'react';

const PhoneBook = () => {
  const [userData, setUserData] = useState([
    {
      id: 0,
      firstName: "Rahul",
      lastName: "David",
      phoneNumber: "986621312",
    },
    {
      id: 1,
      firstName: "Sanjay",
      lastName: "David",
      phoneNumber: "98662234212",
    },
    {
      id: 2,
      firstName: "Sourav",
      lastName: "David",
      phoneNumber: "98623421312",
    },
  ])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    let newContact = {
      firstName,
      lastName,
      phoneNumber,
      id: userData.length,
    }
    setUserData((prevData) => ([...prevData, newContact]))
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  }

  const deleteContact = (id) => {
    let newData = userData.filter(ele => ele.id !== id);
    setUserData((prevData) => ([...newData]))
  }


  return (
    <div>
      <div>
        <p className='title'>Phone Book</p>
      </div>
      <div>
        <div className='row'>
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
          <span>Action</span>
        </div>
        {userData.map(ele => <div key={ele.id} className="row">
          <span>{ele.firstName}</span>
          <span>{ele.lastName}</span>
          <span>{ele.phoneNumber}</span>
          <button className='btn' onClick={(e) => { e.preventDefault(); deleteContact(ele.id) }}>Delete</button>
        </div>)}
      </div>
      <div>
        <form>
          <label className='label'>
            <span>First Name</span>
            <input name="firstName" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
          </label>
          <label className='label'>
            <span>Last Name</span>
            <input name="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
          </label>
          <label className='label'>
            <span>Phone Number</span>
            <input name="phoneNumber" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
          </label>
          <label className='label'>
            <button className='add_contact' onClick={addContact}>Add Contact</button>
          </label>
        </form>
      </div>
    </div>
  )
}

export default PhoneBook