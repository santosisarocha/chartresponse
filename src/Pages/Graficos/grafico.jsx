import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useTranslation } from 'react-i18next';

import DeBemComAVida from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/DBemCVida.svg'; 
import ReceitaChefe from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ReceitaChefe.svg'; 
import ModaCasa from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/ModaCasa.svg'; 
import Grill from '../../image/ModosTemas/ModoClaro/IconesMonitoramento/Grill.svg'; 
import Footer from '../../components/Footer/footer.jsx';
import LayoutGraphic from '../../components/Chart/Layout.jsx';
import BarChartMobile from '../../components/Chart/BarChartMobile.jsx';
import { useState } from 'react';

const Grafico = () => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="bg-lightBackground dark:bg-darkBackground min-h-screen">
      <Navbar />
      <div className="flex items-center w-full mb-6 mt-[130px]">
        <div className="flex-1 flex justify-end pr-2 sm:pr-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        </div>
        <h1 className="px-4 text-4xl sm:text-xl md:text-5xl lg:text-4xl font-semibold text-center whitespace-nowrap text-lightText dark:text-darkText">
          {t('Monitoramento')}
        </h1>
        <div className="flex-1 flex justify-start pl-2 sm:pl-4">
          <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
        </div>
      </div>

      <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-32 mt-[80px]">
        <div className="flex flex-col items-center">
          {/* Seção Filas */}
          <div className="flex flex-col items-center mb-10">
            <p className="text-sm md:text-base font-medium  mb-2 text-center text-lightText dark:text-darkText">
              {t('Filas em tempo real')}
            </p>
            <div className=" w-full max-w-[100%] h-auto object-cover flex justify-center  ml-[50%]">
              <LayoutGraphic/>
            </div>
          </div>

          {/* Ícones */}
          <div className="flex flex-row items-center mb-10 space-x-20">
            <div className="flex flex-col items-center">
              <img src={ModaCasa} alt="Moda da Casa" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
              <span className="text-base text-lightText dark:text-darkText">{t('Moda da Casa')}</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={Grill} alt="Grill e Bem Estar" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
              <span className="text-base text-lightText dark:text-darkText">{t('Grill e Bem Estar')}</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={DeBemComAVida} alt="De Bem com a Vida" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
              <span className="text-base text-lightText dark:text-darkText">{t('De Bem com a Vida')}</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={ReceitaChefe} alt="Receita do Chefe" className="w-8 h-8 shadow-md transition-shadow duration-500 ease-in-out hover:shadow-2xl" />
              <span className="text-base text-lightText dark:text-darkText">{t('Receita do Chefe')}</span>
            </div>
          </div>

          {/* Seção Gráfico */}
          <div className="flex flex-col items-center">
            <p className="text-sm md:text-base font-medium mb-2 text-center text-lightText dark:text-darkText">
              {t('Gráfico Pessoas nas Filas x Horário')}
            </p>
            <div className=" w-full max-w-[90%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[50%] h-auto object-cover flex justify-center" >           
              <BarChartMobile selectedDay={selectedDay} setSelectedDay={setSelectedDay} />            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Grafico;
