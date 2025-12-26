import { useState, useEffect } from "react"
function App() {
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    "https://full-production-1aa1.up.railway.app/api/users/"
                );
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <>
            <div>
                {user.map(item => (
                    <div>
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default App
