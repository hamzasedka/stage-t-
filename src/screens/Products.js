import  Modal  from '../components/modal';
import React, { useState,useEffect }from 'react';
import MaterialTable from 'material-table';
import Firebase from '../firebase/firebase';



function Products() {
  
  const [staffList,SetStaffList]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [staffId, setStaffId] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [RelatedEvent,SetRelatedEvent]=useState();
  const [EventId,SetEventId]=useState();

  useEffect(() => {
    Firebase.firestore().collectionGroup("staff").onSnapshot(snapShot=>{
      SetStaffList(snapShot.docs.map(doc=>
        ({id:doc.id,staff:doc.data()})
      
        ))
    });
   
    return()=>{
      SetStaffList([]);
    }
    
  }, [EventId])
console.log(staffList);


  const tableData=[];
  staffList.forEach(staff=>tableData.push(staff.staff));
  const tableColumns=[
    {
      title:'Name',field:'name'
    },
    {
      title:'Designation',field:'Designation'
    },
    {
      title:'Number',field:'employeeNumber'
    },
    {
      title:'Joined',field:'Joined'
    }

  ]

  var hamza=''
  function openModal  (id,eventId)  {
    
    setShowModal(prev=>!prev)
    setStaffId(id)
    SetEventId(eventId)
    hamza=eventId;
    console.log(hamza);
    
      Firebase.firestore().collection('param').doc(hamza).get()
    .then(snapShot=>SetRelatedEvent(snapShot.data())
      );
    
  };
 
  return (
    <div style={
      { maxWidth: '80%' ,position:'relative',left:'10%',top:'50px'}}>
   <MaterialTable className='stafftable' title=""
   
   data={tableData}
   columns={tableColumns}
   onRowClick={((evt, selectedRow) => {
     setSelectedRow(selectedRow.tableData.id);
     
  
    })}
   options={
     {
       search:true,
       paging:true,
       filtering:true,
       exportButton:true,
       rowStyle: rowData => ({
        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
      })
     }
   }
   actions={[
    {
      icon: 'visibility',
      tooltip: 'show details',
      onClick: (event, dataRow) => {
        openModal(dataRow.id,dataRow.relatedEvent);
      }
    },
    {
      icon: 'print',
      tooltip: 'Print ',
      onClick: (event, dataRow) => {
        openModal(dataRow.id,dataRow.relatedEvent);
        setTimeout(() => {
          window.print()
          setShowModal(prev=>!prev)

        }, 500);
      }
    }
    
    
  ]}
   />
  
        <Modal staffId={staffId} RelatedEvent={RelatedEvent} showModal={showModal} setShowModal={setShowModal} />
   

  </div>
  );
}

/*6yqyb1cmDVkchVTZsppu*/ 
export default Products;
