import  { useContext,useState ,useEffect} from 'react'
import { AppContext } from './../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Paystack from '@paystack/inline-js';





const MyAppointment = () => {

  
    const {backendURL, token, getDoctorsData } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const months = [" ","jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const slotDateFormat = (slotDate) => {
     const  dateArray = slotDate.split('_')

      return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {

      try {
        const {data} = await axios.get(backendURL+'/api/user/appointments',{headers:{token}})
        if(data.success) {
          setAppointments(data.appointments.reverse());
         
        }
      } catch (error) {
         console.error(error)
        toast.error(error.message)
      }
    };

    useEffect(() => {
      if(token){
        getUserAppointments()
      }
    },[token]);

    const cancelAppointment = async (appointmentId) => {
      try {
       
        const {data} = await axios.post(backendURL + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
        if(data.success){
          toast.success(data.message)
          getUserAppointments()
          getDoctorsData()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.message)
      }
    }

    
   


    const makePayment = async (docId) => {
      //universal is a variable used to access response from the user retrieve api and make it accessible to every part of the function.
      let universal = {}
      try{
        console.log("Initiating payment for doctor:", docId);
        
        const response = await axios.get(backendURL + '/api/user/retrieve-doctor/' + docId , {headers:{token}})
        // to make response globally accessible within this function
         universal = response
        // console.log(response.data.data)
        
        // const { success, data: doctor } = response.data
        if (response) {
          console.log("yes")
        }
      }catch (error){
        console.error(error)
        toast.error(error.message)
      }
      //create a get api that will return selected user details based on id that was passed
      
      const popup = new Paystack()
      
        try  {
        popup.newTransaction({
          key: 'pk_test_80fc943a09148f0f82a8f43e183d53d6f955c47b',
          email: universal.data.data[1].userEmail,
          amount: universal.data.data[0].doc.fees,
          userName: universal.data.data[2].userName,
          onSuccess: (transaction) => {
            console.log(transaction)
            const response = axios.post(backendURL + '/api/user/successfulPayment/',transaction)
            console.log("Response from frontend:", response.data);
            toast.success("Payment recorded successfully!");
          },
          onLoad: (response) => {
             console.log("onLoad: ", response);
          },
          onCancel: () => {
            console.log("onCancel");
          },
          onError: (error) => {
            console.log("Error: ", error.message)
          }
        })
      }catch (error) {
        console.error(error)
        toast.error(error.message)
      }
    }

    

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
         appointments.map((item,index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div>
                  <img className='w-32 bg-indigo-50 ' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                  <p className='text-xs'>{item.docData.address.line1}</p>
                  <p className='text-xs'>{item.docData.address.line2}</p>
                  <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{slotDateFormat(item.slotDate)}| {item.slotTime}</p>
                </div>
                <div>

                </div>
                <div className='flex flex-col gap-2 justify-end '>
                  {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 '>Paid</button>}
                {!item.cancelled && !item.payment && <button onClick={() => makePayment(item.docId)} className=' text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                 {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className=' text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button> } 
                 {item.cancelled && <button className='text-sm text-red-500 text-center sm:min-w-48 py-2 border rounded'> Appointment Cancelled</button>}
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment