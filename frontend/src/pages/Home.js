// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchRides = () => {
//     const [searchData, setSearchData] = useState({ date: '', time: '', from: '', to: '' });
//     const [rides, setRides] = useState([]);
//     const [noRides, setNoRides] = useState(false);
//     const navigate = useNavigate(); // For navigation

//     const handleChange = (e) => {
//         setSearchData({ ...searchData, [e.target.name]: e.target.value });
//     };

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (!searchData.date) return alert("Please select a date");

//         try {
//             const response = await fetch(
//                 `http://localhost:8080/api/rides/search?date=${searchData.date}&time=${searchData.time}&from=${searchData.from}&to=${searchData.to}`,
//                 {
//                     headers: { 'Authorization': localStorage.getItem('token') }
//                 }
//             );
//             const result = await response.json();
//             if (result.success && result.rides.length > 0) {
//                 setRides(result.rides);
//                 setNoRides(false);
//             } else {
//                 setRides([]);
//                 setNoRides(true);
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Error fetching rides");
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Remove token
//         navigate('/login'); // Redirect to login page
//     };

//     const handleAddRide = () => {
//         navigate('/Add_ride', { state: searchData }); // Navigate to add ride page with search data
//     };

//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             padding: '2rem',
//             backgroundColor: '#f5f5f5',
//             minHeight: '100vh'
//         }}>
//             <h2 style={{
//                 color: '#2c3e50',
//                 fontSize: '2rem',
//                 fontWeight: '400',
//                 marginBottom: '1.5rem',
//                 fontFamily: 'fantasy'
//             }}>Search for a Ride</h2>
//             <button onClick={handleLogout} style={{
//                 alignSelf: 'flex-end',
//                 background: 'red',
//                 color: 'white',
//                 padding: '0.5rem 0.6rem',
//                 border: 'none',
//                 borderRadius: '9px',
//                 cursor: 'pointer',
//                 marginBottom: '1rem',
//                 letterSpacing: '1px',
//             }}>
//                 Logout
//             </button>
//             <form onSubmit={handleSearch} style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 background: 'white',
//                 padding: '2rem',
//                 borderRadius: '10px',
//                 boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
//                 width: '100%',
//                 maxWidth: '600px',
//                 marginBottom: '2rem'
//             }}>
//                 <input type="date" name="date" value={searchData.date} onChange={handleChange} required style={{
//                     width: '100%',
//                     padding: '0.8rem',
//                     marginBottom: '1rem',
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                     fontSize: '1rem'
//                 }} />
//                 <input type="time" name="time" value={searchData.time} onChange={handleChange} style={{
//                     width: '100%',
//                     padding: '0.8rem',
//                     marginBottom: '1rem',
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                     fontSize: '1rem'
//                 }} />
//                 <select name="from" value={searchData.from} onChange={handleChange} required style={{
//                     width: '100%',
//                     padding: '0.8rem',
//                     marginBottom: '1rem',
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                     fontSize: '1rem',
//                     backgroundColor: 'white',
//                     cursor: 'pointer'
//                 }}>
//                     <option value="">From</option>
//                     <option value="NITK">NITK</option>
//                     <option value="Mangalore Airport">Mangalore Airport</option>
//                     <option value="Mangalore Railway Station">Mangalore Railway Station</option>
//                 </select>
//                 <select name="to" value={searchData.to} onChange={handleChange} required style={{
//                     width: '100%',
//                     padding: '0.8rem',
//                     marginBottom: '1rem',
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                     fontSize: '1rem',
//                     backgroundColor: 'white',
//                     cursor: 'pointer'
//                 }}>
//                     <option value="">To</option>
//                     <option value="NITK">NITK</option>
//                     <option value="Mangalore Airport">Mangalore Airport</option>
//                     <option value="Mangalore Railway Station">Mangalore Railway Station</option>
//                 </select>
//                 <button type="submit" style={{
//                     width: '100%',
//                     padding: '1rem',
//                     background: 'linear-gradient(to right, #3498db, #2980b9)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     fontSize: '1rem',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'transform 0.2s ease, box-shadow 0.2s ease'
//                 }}>Search</button>
//             </form>

//             <h3 style={{
//                 color: '#2c3e50',
//                 fontSize: '1.5rem',
//                 fontWeight: '600',
//                 marginBottom: '1rem'
//             }}>Available Rides</h3>
//             {rides.length > 0 ? (
//                 <ul style={{
//                     listStyleType: 'none',
//                     padding: '0',
//                     width: '100%',
//                     maxWidth: '600px'
//                 }}>
//                     {rides.map((ride, index) => (
//                         <li key={index} style={{
//                             background: 'white',
//                             padding: '1rem',
//                             borderRadius: '10px',
//                             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                             marginBottom: '1rem'
//                         }}>
//                             <strong>{ride.from} → {ride.to}</strong>
//                             <p><strong>Date:</strong> {ride.date}</p>
//                             <p><strong>Time:</strong> {ride.time}</p>
//                             <p><strong>Name:</strong> {ride.userName}</p>
//                             <p><strong>Phone:</strong> {ride.phoneNumber}</p>
//                             <p><strong>Email:</strong> {ride.email}</p>
//                             <p><strong>Gender:</strong> {ride.gender}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <>
//                     <p style={{
//                         color: '#7f8c8d',
//                         fontSize: '1.1rem'
//                     }}>No rides found</p>
//                     {noRides && <button onClick={handleAddRide} style={{
//                         padding: '0.8rem 1.5rem',
//                         background: '#3498db',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         fontSize: '1rem',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         transition: 'transform 0.2s ease, box-shadow 0.2s ease'
//                     }}>Add this ride</button>}
//                 </>
//             )}
//         </div>
//     );
// };

// export default SearchRides;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchRides = () => {
    const [searchData, setSearchData] = useState({ date: '', time: '', from: '', to: '' });
    const [rides, setRides] = useState([]);
    const [noRides, setNoRides] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchData.date) return alert("Please select a date");

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/rides/search?date=${searchData.date}&time=${searchData.time}&from=${searchData.from}&to=${searchData.to}`,
                { headers: { 'Authorization': localStorage.getItem('token') } }
            );
            const result = await response.json();
            if (result.success && result.rides.length > 0) {
                setRides(result.rides);
                setNoRides(false);
            } else {
                setRides([]);
                setNoRides(true);
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching rides");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleAddRide = () => {
        navigate('/Add_ride', { state: searchData });
    };

    const handleAddFromRide = (ride) => {
        // Prefill add-ride form with selected ride's details
        const state = { from: ride.from, to: ride.to, date: ride.date, time: ride.time };
        navigate('/Add_ride', { state });
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(to right, #ece9e6, #ffffff)'
        }}>
            {/* Left side - About Us */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(to bottom right, #3498db, #2980b9)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '3rem',
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Us</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    We aim to Match NITK people with similar destination, date and time, Give it a try!!!....
                    reduce Carbon footprint and save Money.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                    <li>🚗 Easy ride sharing</li>
                    <li>💰 Save travel costs</li>
                    <li>🤝 Connect with NITK Students</li>
                </ul>
            </div>

            {/* Right side - Search Rides */}
            <div style={{
                flex: 1.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 2rem 3rem',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '600px',
                    marginBottom: '1rem'
                }}>
                    <h2 style={{ color: '#2c3e50', fontSize: '2rem', fontWeight: '600' }}>
                        Search for a Ride
                    </h2>
                    <button onClick={handleLogout} style={{
                        background: 'red',
                        color: 'white',
                        padding: '0.6rem 1rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}>
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSearch} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '600px',
                    marginBottom: '2rem',
                    gap: '1rem'
                }}>
                    <input type="date" name="date" value={searchData.date} onChange={handleChange} required style={inputStyle} />
                    <input type="time" name="time" value={searchData.time} onChange={handleChange} style={inputStyle} />
                    <select name="from" value={searchData.from} onChange={handleChange} required style={inputStyle}>
                        <option value="">From</option>
                        <option value="NITK">NITK</option>
                        <option value="Mangalore Airport">Mangalore Airport</option>
                        <option value="Mangalore Railway Station">Mangalore Railway Station</option>
                    </select>
                    <select name="to" value={searchData.to} onChange={handleChange} required style={inputStyle}>
                        <option value="">To</option>
                        <option value="NITK">NITK</option>
                        <option value="Mangalore Airport">Mangalore Airport</option>
                        <option value="Mangalore Railway Station">Mangalore Railway Station</option>
                    </select>
                    <button type="submit" style={{
                        padding: '1rem',
                        background: 'linear-gradient(to right, #3498db, #2980b9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}>🔍 Search</button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '800px', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Available Rides</h3>
                    <button onClick={() => handleAddRide()} style={{
                        padding: '0.7rem 1rem',
                        background: 'linear-gradient(to right, #27ae60, #2ecc71)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>➕ Not suitable? Add your own</button>
                </div>

                {rides.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '800px' }}>
                        {rides.map((ride, index) => (
                            <li key={index} style={{
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)',
                                marginBottom: '1rem',
                                display: 'grid',
                                gridTemplateColumns: '1fr 220px',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                                        <strong>🚗 {ride.from} → {ride.to}</strong>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div><strong> Date:</strong> {ride.date}</div>
                                        <div><strong> Time:</strong> {ride.time}</div>
                                        <div><strong> Name:</strong> {ride.userName}</div>
                                        <div><strong> Gender:</strong> {ride.gender}</div>
                                    </div>
                                    <div style={{ marginTop: '0.75rem', color: '#555' }}>
                                        <div><strong> Phone:</strong> {ride.phoneNumber || '—'}</div>
                                        <div><strong> Email:</strong> {ride.email || '—'}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'stretch' }}>
                                    {ride.telegram ? (
                                        <a href={`https://t.me/${ride.telegram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" style={{
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            padding: '0.7rem',
                                            background: 'linear-gradient(to right, #0088cc, #00aeea)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontWeight: '600'
                                        }}>💬 Message on Telegram (@{ride.telegram.replace(/^@/, '')})</a>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '0.6rem', borderRadius: '8px', background: '#f3f3f3', color: '#666' }}>No Telegram</div>
                                    )}

                                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>Listed by: {ride.userName}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>No rides found</p>
                        {noRides && (
                            <button onClick={handleAddRide} style={{
                                padding: '0.9rem 1.5rem',
                                background: 'linear-gradient(to right, #27ae60, #2ecc71)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>➕ Add this ride</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.9rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
};

export default SearchRides;
