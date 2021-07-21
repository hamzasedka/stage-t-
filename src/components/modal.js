import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import Firebase from '../firebase/firebase';
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code';
import Pdf from "react-to-pdf";
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReactDom from 'react-dom'
import {
        Background,
        BarCode,
        CardTitle,
        CompanyLogo,
        EmployeeQRCode,
        ModalContent, 
        ModalWrapper, 
        QRCodee, 
        StaffDetails, 
        Staffimg, 
        StaffInfo } from '../styled-component/modal-styled';
import { useDrag } from 'react-use-gesture';



const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal=({showModal,setShowModal,staffId,RelatedEvent})=> {
  const [Citys,SetCitys]=useState([]);
  const [CitysId,SetCitysId]=useState();
  const [CityClone,SetCityClone]=useState();

  const [Sex,Setsex]=useState([]);
  const [sexId,SetsexId]=useState();
  const [sexClone,SetsexClone]=useState();

  const [ChartsId,SetChartsId]=useState();
  const [staffMember,SetStaffMember]=useState('');
  const [EventId,SetEventId]=useState();


 
  const modalRef = useRef();
  const animation = useSpring({
      config: {
        duration: 250
      },
      opacity: showModal ? 1 : 0,
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

  const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };
  const ref = React.createRef();

  const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [5,5]
    };
  const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('I pressed');
        }
      },
      [setShowModal, showModal]
    );
      function print (){
        window.focus()

        window.print()
      }

    useEffect(
      () => {
        const hamza=Firebase.firestore().collection('staff').doc(staffId).get();
        hamza.then(staff=>{
          SetStaffMember(staff.data())
        })
       /* */
     
     
          Firebase.firestore().collectionGroup("city").onSnapshot(
            snapShot=>{
              SetCitys(snapShot.docs.map(doc=>({id:doc.id,citys:doc.data()})))
            })
            Firebase.firestore().collectionGroup("sex").onSnapshot(
              snapShot=>{
                Setsex(snapShot.docs.map(doc=>({id:doc.id,sexs:doc.data()})))
              })
              
            Firebase.firestore().collectionGroup("charts").onSnapshot(
              snapShot=>{
                SetChartsId(snapShot.docs.map(doc=>doc.id))
              })
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );
  
    
      function fillCharts(){
        const city=staffMember.city;
        const sex=staffMember.sex;
        Citys.map(data=>SetCitysId(data.id));
        Citys.map(data=>SetCityClone(data.citys));
        Sex.map(data=>SetsexId(data.id));
        Sex.map(data=>SetsexClone(data.sexs));
       
       const UpdateCitys=Firebase.firestore().collection('charts/'+ChartsId+'/city').doc(CitysId);
       const UpdateSex=Firebase.firestore().collection('charts/'+ChartsId+'/sex').doc(sexId);

       if(CityClone!==undefined){
        switch(city) {
          case 'mahdia':
            CityClone.mahdia+=1;
            UpdateCitys.update(CityClone)
             break;
          case 'sousse':
            CityClone.sousse+=1;
            UpdateCitys.update(CityClone)
             break;
           case 'monastir':
            CityClone.monastir+=1;
            UpdateCitys.update(CityClone)
             break;          
           case 'sfax':
            CityClone.sfax+=1;
            UpdateCitys.update(CityClone)
             break; 
           case 'tunis':
            CityClone.tunis+=1;
            UpdateCitys.update(CityClone)
             break;           
                        default:
            return 'errrr';
        }
       }
       if(sexClone!==undefined){
        switch(sex) {
          case 'male':
            sexClone.male+=1;
            UpdateSex.update(sexClone)
             break;
          case 'female':
            sexClone.female+=1;
            UpdateSex.update(sexClone)
             break;         
           default:
            return 'errrr';
        }
       }
      }
     
     
  
      const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

      // Set the drag hook and define component movement based on gesture data
      const bind = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0 })
      })

   
    return ReactDom.createPortal(
      <>
      

        {showModal ? (
          <Background  id="divcontents" style={{zIndex:100}} onClick={closeModal} ref={modalRef} className="no-printme">
             <animated.div
                  {...bind()} style={{ x, y }}
                  ><h1>skdghdksfh</h1></animated.div>
            <animated.div style={animation}>
              <ModalWrapper ref={ref} showModal={showModal}>
               
                <ModalContent style={{backgroundImage:`url(${RelatedEvent.imgUrl})`}} className="printme">
                  <CardTitle>
                  </CardTitle>
                
                    
                  <StaffInfo 
                  
                  id="staffinfo"
                  >
                    
                   
                      
                    <Staffimg
                    
                    id="staffimg"
                   
                    >
                      <img  style={{width:'100%'}} src={staffMember.imgUrl}/>
                    </Staffimg>

                 
                  
                 
                  
                    <StaffDetails
                    id="staffdetails"
                    
                    >
                    {RelatedEvent.name?
                      <span >
                      <h5>Name :</h5>
                      <h4>{staffMember.name}</h4>
                      </span>:<span></span>}
                      {RelatedEvent?
                      <span >
                      <h5>Designation :</h5>
                      <h4>{staffMember.Designation}</h4>
                      </span>:<span></span>}
                      {RelatedEvent.Joined?<span >
                      <h5>Joined :</h5>
                      <h4>{staffMember.Joined}</h4>
                      </span>:<span></span>}
                      {RelatedEvent.employeeNumber?
                      <span >
                      <h5>Employee Number :</h5>
                      <h4>{staffMember.employeeNumber}</h4>
                      </span>:<span></span>}
                      {RelatedEvent.city?
                      <span >
                      <h5>City :</h5>
                      <h4>{staffMember.city}</h4>
                      </span>:<span></span>}
                      {RelatedEvent.sex?
                      <span >
                      <h5>Sex :</h5>
                      <h4>{staffMember.sex}</h4>
                      </span>:<span></span>}
                    </StaffDetails>
                    
                  </StaffInfo>
                
                  

                  <BarCode
                  >
                  <Barcode value={staffId} format="CODE128"   fontSize={10} background="transparent" width={1} height={20} />
                  </BarCode>
                  <QRCodee>
                    <CompanyLogo >
                    <QRCode value={staffId} size={80} level={"H"} />
    
                    </CompanyLogo>
                    <EmployeeQRCode  >
                      <img  style={{width:'100%'}} src='http://e-pirana.com/images/logo-3.png'/>
                    </EmployeeQRCode>
                  </QRCodee>
                </ModalContent>
               
              </ModalWrapper>
              <Pdf targetRef={ref} filename={staffMember.name+".pdf"} options={options} x={.5} y={.5} scale={0.8} >
        {({toPdf}) => (
            <button className="printButton" onClick={()=>{print()}}><span><GetAppIcon/></span></button>
            
        )}
    </Pdf>
            </animated.div>
          </Background>
        ) : null}

      </>,
      document.getElementById('portal')
    );
}
  export default Modal;

