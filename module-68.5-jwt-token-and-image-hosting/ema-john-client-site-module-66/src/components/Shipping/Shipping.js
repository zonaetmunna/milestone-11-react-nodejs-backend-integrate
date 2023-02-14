import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import './Shipping.css'

const Shipping = () => {
     const { user } = useAuth();
     const { register, handleSubmit, reset } = useForm();
     const onSubmit = data => {
          const savedCart = getStoredCart();
          data.order = savedCart;
          fetch('http://localhost:5000/orders', {
               method: "POST",
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(data)
          })
               .then(res => res.json())
               .then(result => {
                    if (result.insertedId) {
                         alert('your order successfully');
                         clearTheCart();
                         reset();
                    }
               })
     };

     return (
          <div>
               <h1>this is shipping</h1>
               <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                    <input value={user.displayName} {...register("name")} placeholder="your name" />
                    <input value={user.email} {...register("email", { required: true })} placeholder="your email" />
                    <input {...register("address", { required: true })} placeholder="address" />
                    <input {...register("city", { required: true })} placeholder="city" />
                    <input type="number" {...register("number", { required: true })} placeholder="phone number" />


                    <input type="submit" />
               </form>
          </div>
     );
};

export default Shipping;