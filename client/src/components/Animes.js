import { useEffect, useState } from 'react';
import './styles.css';

const Animes = () => {
   const [animeData, setAnimeData] = useState([]);
   const [sort, setSort] = useState(0);
   const [search, setSearch] = useState('');

   useEffect(() => {
      fetch('https://api.aniapi.com/v1/anime')
         .then((response) => {
            if (!response.ok) {
               throw new Error(`Error ${response.status}: something went wrong.`);
            }
            return response.json();
         })
         .then((data) => {
            if (data.error) throw new Error(`Error: ${data.reason}`);
            // console.log(data.data.documents);
            setAnimeData(data.data.documents);
         })
         .catch((error) => {
            // alert(error);
         });
   }, []);

   const handleSort = (e) => {
      const value = e.target.value;
      setSort(value);
      let data = animeData;
      switch (value) {
         case '0':
            data = animeData.sort((a, b) => a.titles.en - b.titles.en);
            break;
         case '1':
            data = animeData.sort((a, b) => a.score - b.score);
            break;
         case '2':
            data = animeData.sort((a, b) => a.season_year - b.season_year);
            break;
         default:
            break;
      }
      setAnimeData([...data]);
   };

   return (
      <section>
         <div className="search-bar">
            <input
               type="text"
               id="search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search..."
            />
         </div>
         <div className="filter-sort">
            <div className="sort">
               <span>Sort </span>
               <select id="sort" value={sort} onChange={handleSort}>
                  <option value="0">Name</option>
                  <option value="1">Score</option>
                  <option value="2">Season Year</option>
               </select>
            </div>
         </div>
         <div className="container">
            <div className="card-wrapper">
               {animeData.length ? (
                  animeData.map((res) => {
                     if (res.titles.en.toLowerCase().includes(search.toLowerCase())) {
                        return (
                           <div className="card" key={res.id}>
                              <img src={res.cover_image} alt={res.cover_image} />
                              <h3>Name: {res.titles.en}</h3>
                              <p>Trailer URL : {res.trailer_url}</p>
                              <p>Season Year: {res.season_year}</p>
                              <p>Score: {res.score}</p>
                           </div>
                        );
                     } else return null;
                  })
               ) : (
                  <h1>No Data</h1>
               )}
            </div>
         </div>
      </section>
   );
};

export default Animes;
