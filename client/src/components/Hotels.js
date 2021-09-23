import { useEffect, useState } from 'react';
import './styles.css';

const Hotels = () => {
   const [hotelsData, setHotelsData] = useState([]);

   useEffect(() => {
      fetch('https://foodbukka.herokuapp.com/api/v1/restaurant')
         .then((response) => {
            if (!response.ok) {
               throw new Error(`Error ${response.status}: something went wrong.`);
            }
            return response.json();
         })
         .then((data) => {
            if (data.error) throw new Error(`Error: ${data.reason}`);
            setHotelsData(data.Result);
         })
         .catch((error) => {
            // alert(error);
         });
   }, []);

   return (
      <section>
         <div class="search-bar">
            <input type="text" id="search" placeholder="Search..." />
         </div>
         <div class="filter-sort">
            <div class="filter">
               <span>Sort </span>
               <select id="sort">
                  <option value="0">Name</option>
                  <option value="1">Location</option>
                  <option value="2">Reviews</option>
               </select>
            </div>
            <div class="sort">
               <span>Filter </span>
               <select id="filter">
                  <option value="0">Abraham Adesanya</option>
                  <option value="1">Badore</option>
                  <option value="2">Ajah</option>
                  <option value="3">Lekki</option>
               </select>
            </div>
         </div>
         <div class="container">
            <div class="card-wrapper">
               {hotelsData.length ? (
                  hotelsData.map((res) => (
                     <div className="card">
                        <img src={res.image} alt={res.slugs} />
                        <h3>Name: {res.slug}</h3>
                        <p>Location: {res.location}</p>
                        <p>Reviews: {res.reviews}</p>
                        <p>Cost: {res.averagecost}</p>
                     </div>
                  ))
               ) : (
                  <h1>No Data</h1>
               )}
            </div>
         </div>
         <div class="pagination-btn"></div>
      </section>
   );
};

export default Hotels;
