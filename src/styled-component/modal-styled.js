import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top:0px;
  left:0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Config = styled.div`
width: 100%;
height: 800px;
position:relative;
top:20px;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
display:flex;
flex-direction:column;
justify-content:center;
padding-bottom:50px;
padding-top:50px;
border-radius:10px;

`;

export const ModalWrapper = styled.div`
  width: 500px;
  height: 500px;
  background: transparent;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  overflow:hidden
`;

export const CardTitle = styled.div`
width: 100%;
height:40px;
background:transparent;
text-align:center;
padding-bottom:50px;
border-radius:10px 10px 0px 0px;
color:white;
border-bottom:10px solid white;

`;
export const BarCode = styled.div`
width: 100%;
height:40px;
background:black;
background:white;
text-align:center;
padding-bottom:50px;
position:relative;
`;
export const StaffInfo = styled.div`
width: 100%;
height:220px;
display :flex;
flex-direction: row;
background:white;

`;
export const QRCodee = styled.div`
width: 100%;
height:100px;
display :flex;
flex-direction: row;
background:transparent;
`;
export const CompanyLogo = styled.div`
width: 50%;
height:100px;
height:100%;
background:transparent;
padding:20px 20px 20px 20px;
text-align:center;  
`;
export const EmployeeQRCode = styled.div`
width: 50%;
height:100px;
height:100%;
background:transparent;
padding:35px 20px 50px 20px;
border-radius:50px 0px 50px 0px;
`;
export const Staffimg = styled.div`
width: 50%;
height:100px;
height:100%;
background:white;
padding:20px 20px 20px 20px;
`;
export const StaffDetails = styled.div`
width: 50%;
height:100px;
height:100%;
background:transparent;
padding:20px 20px 20px 20px;
display:flex;
flex-direction: column;
border-radius:50px 0px 0px 50px;
h5{
  font-size:13px;
  color:black;

}
h4{
font-size:14px;
font-weight:bold;
color:black;

}
`;
export const ModalContent = styled.div`
  padding:10px 10px 10px 10px;
  width:80%;
  height:90%;
  top:5%;
  border-radius:10px;
  position:relative;
  left:10%;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
 
  background-image:url('https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/6/5/2/652a7adb1b_98148_01-intro-773.jpg');

`;

