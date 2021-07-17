import React, { useState,useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import Firebase from '../firebase/firebase';




const  Charts =()=>{
   const [sexdata,setsexdata]=useState();

  const [Citysdata,setCitysdata]=useState();
   let test=[];

            
             
                   
       
useEffect(() => {

              Firebase.firestore().collectionGroup("city").onSnapshot(
                snapShot=>{
                  snapShot.docs.map(doc=>{
                   setCitysdata(doc.data())
                  }
                    )

                 }) ;
                 Firebase.firestore().collectionGroup("sex").onSnapshot(
                  snapShot=>{
                    snapShot.docs.map(doc=>{
                      
                      setsexdata(doc.data())
                    }
                      )
                      

                   }) ;
}, [])
    console.log(Citysdata);
    return(
         <>
            <Bar 
            
            data={{
                
                labels: ['Mahdia', 'sousse', 'monastire', 'tunis', 'sfax'],
                datasets: [{
                    label: '# badge printed',
                    data:[Citysdata.mahdia,Citysdata.sousse,Citysdata.monastire,Citysdata.tunis,Citysdata.sfax],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            }}
            height={400}
            width={5000}
            options={{
                maintainAspectRatio:false
            }}
            />

            
         </>
    )
}
export default Charts;
