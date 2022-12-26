import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db,stopNetworkAcces,activeNetworkAcces, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./header.css";


function Header() {
    const [user, loading] = useAuthState(auth);
    const [photo, setPhoto] = useState();    
    const [userData, setData] = useState();

    const userid = null;
    try {
        userid = window.location.href.split('#')[1];
    } catch (err) {
        console.log(err);
    }


    // Fetch username by uid
    const fetchUserInfo = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setData(data);
            let userPhotoFetch = 0;
            try {
                userPhotoFetch = data.userPhoto;
                console.log(userPhotoFetch);
            } catch (error) {
                userPhotoFetch = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFfdPAfeJKYiwglp2z9IjDwphJAqEgyAsUv9nfcDLPVXRPzL2B0pLAvUoyVf4QTzoyso&usqp=CAU";
            }
            setPhoto(userPhotoFetch);
        } catch (err) {
            console.error(err);
        }
        // stopNetworkAcces();
    }; 

    function switchToSign() {
        window.location.href = '/sign';
    }

    useEffect(() => {
        if (loading) return;     

        fetchUserInfo();
        
    }, [user, loading]);

    if (!user) {
        return (
            <>        
            <header>
                <section id="logo">
                    <h3 id="arche">Arche</h3>
                    <p id="beta">Beta</p>
                </section>
                <section id="header-btn">
                    <button onClick={switchToSign} type="button" class="btn-primary" id="login-btn">Login</button>
                </section>
            </header>
            </>
        )
    } else {
        return (
            <>     
            <header>                   
                <section id="logo">
                    <h3 id="arche">Arche</h3>
                    <p id="beta">Beta</p>
                </section>
                <section id="img-btn">
                    <img src={photo} alt="Photo"/>
                </section>
            </header>
            </>
        )
    };
   
}

export default Header;