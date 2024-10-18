import React, { useState } from 'react';
import layoutGraficos from '../../image/Monitoramento/layoutGraficos1.jpg';
import icon_Moda_da_casa from '../../image/Monitoramento/icon_moda_da_casa.png';
import icon_de_bem_com_a_vida from '../../image/Monitoramento/icon_de_bem_com_a_vida.png';
import icon_grill from '../../image/Monitoramento/icon_grill.png';
import icon_receita_do_chefe from '../../image/Monitoramento/image/icon_receita_do_chefe.png';
import edit_grill from '../../image/Monitoramento/edit_grill.png';
import edit_de_bem_com_vida from '../../image/Monitoramento/edit_de_bem_com_vida.png';
import edit_moda from '../../image/Monitoramento/edit_moda.png';
import edit_receita_chefe from '../../image/Monitoramento/edit_receita_chefe.png';
import chefe from '../../image/Cardapio/chefe.png';
import Folha from '../../image/Cardapio/Folha.png';
import Grill from '../../image/Cardapio/Grill.png';
import Panela from '../../image/Cardapio/Panela.png';
import check from '../../image/Monitoramento/animated_ic_checkmark_green.gif';




import { UserData } from '../../Data.js';
import { BiFontSize } from 'react-icons/bi';

function LayoutGraphicEdit() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // To track which image was clicked
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false); // New state for save confirmation

  const rectStyle = {
    position: 'absolute',
  };

  const locationMap = {
    'Oeste Superior Direita': 'Oeste_Superior_Direita',
    'Oeste Superior Esquerda': 'Oeste_Superior_Esquerda',
    'Oeste Inferior Direita': 'Oeste_Inferior_Direita',
    'Oeste Inferior Esquerda': 'Oeste_Inferior_Esquerda',
    'Norte Esquerda': 'Norte_Esquerda',
    'Norte Direita': 'Norte_Direita',
    'Norte Esquerda_': 'Norte_Esquerda_',
    'Norte Direita_': 'Norte_Direita_',
    'Leste Superior Esquerda': 'Leste_Superior_Esquerda',
    'Leste Superior Direita': 'Leste_Superior_Direita',
    'Leste Inferior Esquerda': 'Leste_Inferior_Esquerda',
    'Leste Inferior Direita': 'Leste_Inferior_Direito',
    'Norte Superior Direita': 'Norte_Superior_Direita',
    'Norte Superior Esquerda': 'Norte_Superior_Esquerda',
  };

  const getColorForLocation = (location) => {
    const filteredData = UserData.filter(
      (item) => item.fila.localizacao === location
    );

    if (filteredData.length > 0) {
      const lastItem = filteredData[filteredData.length - 1];
      switch (lastItem.situacao) {
        case 'verde':
          return 'rgba(0, 255, 0, 0.5)';
        case 'amarelo':
          return 'rgba(255, 255, 0, 0.5)';
        case 'vermelho':
          return 'rgba(255, 0, 0, 0.5)';
        default:
          return 'rgba(0, 0, 0, 0.5)'; // Default color if no match
      }
    }
    return 'rgba(0, 0, 0, 0.5)'; // Default color if no data for the location
  };

  const handleImageClick = (location) => {
    setSelectedImage(location);
    setPopupOpen(true);
  };
  

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
  };

  const handleSaveClick = () => {
    setIsSavePopupOpen(true);
    setTimeout(() => {
      setIsSavePopupOpen(false);
      setPopupOpen(false);
    }, 3000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '4x10%' }}>
      <img
        src={layoutGraficos}
        alt="Layout do Restaurante"
        style={{ width: '50%', height: 'auto' }}
      />
      
      <div className='Oeste_Superior'>
        <img
          src={edit_moda}
          alt="edit_moda"
          style={{
            ...rectStyle,
            top: '30.7%',
            left: '11.5%',
            width: '3%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Oeste_Superior')}
        />
      </div>
      
      <div className='Oeste_Inferior'>
        <img
          src={edit_moda}
          alt="edit_moda"
          style={{
            ...rectStyle,
            top: '55%',
            left: '11.5%',
            width: '3%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Oeste_Inferior')}
        />
      </div>
      
      <div className='Norte'>
        <img
          src={edit_moda}
          alt="edit_moda"
          style={{
            ...rectStyle,
            top: '71%',
            left: '18.1%',
            width: '3%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Norte')}
        />
      </div>
      
      <div className='Norte_'>
        <img
          src={edit_de_bem_com_vida}
          alt="edit_de_bem_com_vida"
          style={{
            ...rectStyle,
            top: '72%',
            left: '28.9%',
            width: '3.5%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Norte_')}
        />
      </div>
     
      <div className='Leste_Superior'>
        <img
          src={edit_grill}
          alt="edit_grill"
          style={{
            ...rectStyle,
            top: '31%',
            left: '46.7%',
            width: '2.8%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Leste_Superior')}
        />
      </div>
    
      <div className='Leste_Inferior'>
        <img
          src={edit_receita_chefe}
          alt="edit_receita_chefe"
          style={{
            ...rectStyle,
            top: '56%',
            left: '35.6%',
            width: '3.3%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Leste_Inferior')}
        />
      </div>
      
      <div className='Norte_Superior'>
        <img
          src={edit_grill}
          alt="edit_grill"
          style={{
            ...rectStyle,
            top: '6.5%',
            left: '30%',
            width: '3%',
            height: 'auto',
          }}
          onClick={() => handleImageClick('Norte_Superior')}
        />
      </div>
      
      
      {isPopupOpen && (
         <div style={popupStyle}>
         <div>
           <h1 style={popupHeadingStyle}>Filas do Restaurante:</h1>
           {/* Buttons Container */}
           <div style={popupButtonsContainer}>
             <div style={popupButtomModa}>
               <img
                 src={Panela}
                 alt="Panela"
                 style={{ width: '20%', height: 'auto', marginRight: '10%' }}
               />
               <h1   >Moda da casa</h1>
             </div>
             <div style={popupButtomVida}>
               <img
                 src={Folha}
                 alt="Folha"
                 style={{ width: '15%', height: 'auto', marginRight: '10%' }}
               />
               <h1 >De bem com a vida</h1>
             </div>
             <div style={popupButtomReceita}>
               <img
                 src={chefe}
                 alt="chefe"
                 style={{ width: '10%', height: 'auto', marginRight: '10%' }}
               />
               <h1>Receita do chefe</h1>
             </div>
             <div style={popupButtomGrill}>
               <img
                 src={Grill}
                 alt="grill"
                 style={{ width: '12%', height: 'auto', marginRight: '10%' }}
               />
               <h1>Grill e Bem estar</h1>
             </div>
           </div>
           <div style={closeButtonContainer}>
             <button style={closeButtonStyle} onClick={handleSaveClick}>Salvar</button>
           </div>
         </div>
       </div>
     )}
     {isSavePopupOpen && (
        <div style={savePopupStyle}>
          <p>Salvo com sucesso!</p>
          <img src={check} alt="check" style={{ width: '43px' }} />
        </div>
      )}
    </div>
  );
}


// Styles for the popup
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  height:'40vh',
  width:'120vh',
  padding: '5vh',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  
};
const popupHeadingStyle = {
  fontSize: '19.65px',
  color: '#333',
  marginTop:'1%',
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
};
const popupButtonsContainer = {
  display: 'flex',
  justifyContent: 'space-around', // Aligns buttons side by side with space between
  alignItems: 'center',
  marginBottom: '20px',
};

const popupButtomModa = {
  width: '245px',
  height: '85px',
  backgroundColor: '#007BC0',
  textAlign: 'center',
  padding: '10px',
  marginRight: '10px',
  color: '#FFFFFF',
  display: 'flex',             // Flexbox for alignment
  alignItems: 'center',        // Center vertically
  justifyContent: 'center',    // Center horizontally
};

const popupButtomVida = {
  width: '245px',
  height: '85px',
  backgroundColor: '#00884A',
  textAlign: 'center',
  padding: '10px',
  marginRight: '10px',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const popupButtomReceita = {
  width: '245px',
  height: '85px',
  backgroundColor: '#12818F',
  textAlign: 'center',
  padding: '10px',
  marginRight: '10px',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const popupButtomGrill = {
  width: '245px',
  height: '85px',
  backgroundColor: '#9E2896',
  textAlign: 'center',
  padding: '10px',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const closeButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const closeButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  padding: '5px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  
};


const savePopupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  color: 'black',
  padding: '10px', 
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  fontSize: '20px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px', 
  width: '552px',  
  height: '141px',  
};

export default LayoutGraphicEdit;
