import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyPage = () => {
  
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Chargement...");
  const type=searchParams.get("type")
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const url= type==="vol"? "reserveflight/reserveflight" : "reserveracc/reserveacc"
   const verify=()=>{
    
    axios.get(`http://localhost:4000/${url}/verify/${orderId}/${success}`).then((response)=>
    
      console.log(response))
    .catch((error)=>{
        console.log(error)
    })
   }
  useEffect(() => {
    if (success === "true") {
      // ✅ Paiement réussi
      setMessage(" Paiement confirmed !");
      
 
    } else {
      // ❌ Paiement échoué ou annulé
      setMessage("Paiement failed.");
    }
    verify()
  }, [success, orderId]);

  return (
    <div className="bg-violet-300 h-full text-violet900 px-8 py-16 relative mx-10 flex justify-center items-center mt-50 my-10">
      <h1 className='h-full text-3xl font-bold'>{message}</h1>
    </div>
  );
};

export default VerifyPage;
