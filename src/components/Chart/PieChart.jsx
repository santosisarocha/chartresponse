import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { userData1 } from '../../Data1.js';
import './PieChart.css';  // Arquivo de estilos para personalizar a posição dos elementos

ChartJS.register(ArcElement, Tooltip, Legend);

// Função auxiliar para pegar o nome do dia da semana
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return daysOfWeek[date.getDay()];
};

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Segunda'); // Estado para o dia selecionado

  useEffect(() => {
    const votosPorRestaurante = {};

    // Filtra os votos pelo dia da semana selecionado
    const filteredData = userData1.filter(
      (voto) => getDayOfWeek(voto.registro) === selectedDay
    );

    // Conta os votos por restaurante com base no dia filtrado
    filteredData.forEach((voto) => {
      const restauranteNome = voto.restaurante.nome;
      if (votosPorRestaurante[restauranteNome]) {
        votosPorRestaurante[restauranteNome]++;
      } else {
        votosPorRestaurante[restauranteNome] = 1;
      }
    });

    const restaurantes = Object.keys(votosPorRestaurante);
    const votos = Object.values(votosPorRestaurante);

    setChartData({
      labels: restaurantes,
      datasets: [
        {
          label: '# de Votos',
          data: votos,
          backgroundColor: [
            'rgba(0, 123, 192, 1)',
            'rgba(18, 129, 143, 1)',
            'rgba(197, 53, 188, 1)',
            'rgba(0, 136, 74, 1)',
          ],
          borderColor: [
            'rgba(0, 123, 192, 1)',
            'rgba(18, 129, 143, 1)',
            'rgba(197, 53, 188, 1)',
            'rgba(0, 136, 74, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [selectedDay]); // O gráfico será atualizado sempre que o dia da semana for alterado

  const handleDayChange = (day) => {
    setSelectedDay(day); // Atualiza o estado com o dia selecionado
  };

  if (!chartData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="chart-container">
      <div className="days-filter">
        {/* Botões para selecionar o dia da semana */}
        <button className={selectedDay === 'Segunda' ? 'active' : ''} onClick={() => handleDayChange('Segunda')}>
          SEGUNDA
        </button>
        <button className={selectedDay === 'Terça' ? 'active' : ''} onClick={() => handleDayChange('Terça')}>
          TERÇA
        </button>
        <button className={selectedDay === 'Quarta' ? 'active' : ''} onClick={() => handleDayChange('Quarta')}>
          QUARTA
        </button>
        <button className={selectedDay === 'Quinta' ? 'active' : ''} onClick={() => handleDayChange('Quinta')}>
          QUINTA
        </button>
        <button className={selectedDay === 'Sexta' ? 'active' : ''} onClick={() => handleDayChange('Sexta')}>
          SEXTA
        </button>
        <button className={selectedDay === 'Sábado' ? 'active' : ''} onClick={() => handleDayChange('Sábado')}>
          SÁBADO
        </button>
        <button className={selectedDay === 'Domingo' ? 'active' : ''} onClick={() => handleDayChange('Domingo')}>
          DOMINGO
        </button>
      </div>

      <div className="chart">
        <Pie 
          data={chartData} 
          width={600}  // Aumentando a largura do gráfico
          height={600}  // Aumentando a altura do gráfico
          options={{
            plugins: {
              legend: {
                position: 'right',  // Define a posição da legenda para a direita
                labels: {
                  usePointStyle: true, // Usa um estilo customizado ao invés do padrão (círculo)
                  pointStyle: 'rect', // Define o formato da cor como quadrado
                  boxWidth: 20,       // Largura do quadrado
                  boxHeight: 20,      // Altura do quadrado
                  padding: 35,        // Ajusta o espaçamento entre os itens da legenda
                },
              },
            },
            maintainAspectRatio: false, // Permite ajustar o tamanho do gráfico
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
