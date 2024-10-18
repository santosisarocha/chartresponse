import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { UserData } from '../../Data.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ selectedDay, setSelectedDay }) {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState('100%');
  const [chartHeight, setChartHeight] = useState(400);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const filterByDayOfWeek = (data, dayOfWeek) => {
    return data.filter((entry) => {
      const date = new Date(entry.datetime);
      return date.getDay() === dayOfWeek;
    });
  };

  const calculateRealQuantidade = (data) => {
    const groupedData = {};
    const timeInterval = isSmallScreen ? 20 : 10; // Definir o intervalo de tempo com base na largura da tela

    data.forEach((entry) => {
      const [datePart, timePart] = entry.datetime.split(' ');
      const [hour, minute] = timePart.split(':');
      const roundedMinute = Math.floor(minute / timeInterval) * timeInterval; // Agrupar de acordo com o intervalo definido
      const timeKey = `${hour}:${roundedMinute.toString().padStart(2, '0')}`;

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = { totalQuantidade: 0, count: 0 };
      }

      groupedData[timeKey].totalQuantidade += entry.quantidade;
      groupedData[timeKey].count += 1;
    });

    const resultData = Object.keys(groupedData).map((timeKey) => {
      const avgQuantidade = groupedData[timeKey].totalQuantidade / groupedData[timeKey].count;
      return {
        datetime: timeKey,
        quantidade: avgQuantidade,
      };
    });

    return resultData;
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Quantidade de Pessoas nas Filas",
      data: [],
      backgroundColor: [],
      borderColor: 'transparent',
      borderRadius: 50,
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = filterByDayOfWeek(UserData, selectedDay);
      const realData = calculateRealQuantidade(filteredData);

      const chart = chartRef.current;
      const ctx = chart?.ctx;

      if (ctx) {
        const gradientColors = realData.map(() => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(125,131,137,1)');
          gradient.addColorStop(1, 'rgba(46,48,51,1)');
          return gradient;
        });

        setChartData({
          labels: realData.map((data) => data.datetime),
          datasets: [{
            label: "Quantidade de Pessoas nas Filas",
            data: realData.map((data) => data.quantidade),
            backgroundColor: gradientColors,
            borderColor: 'transparent',
            borderRadius: 5,
          }]
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedDay, isSmallScreen]); // Adicionar isSmallScreen como dependência

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 932) {
        setChartWidth('100%');
        setChartHeight(200);
        setIsSmallScreen(true);
      } else {
        setChartWidth('150%');
        setChartHeight(800);
        setIsSmallScreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Quantidade de Pessoas nas Filas x Horário',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      }
    },
    layout: {
      backgroundColor: '#2e2e2e',
    },
  };

  const daysOfWeek = [
    { value: 0, label: 'DOM' },  
    { value: 1, label: 'SEG' },
    { value: 2, label: 'TER' },
    { value: 3, label: 'QUA' },
    { value: 4, label: 'QUI' },
    { value: 5, label: 'SEX' },
    { value: 6, label: 'SAB' },
  ];

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
      }}>
        {daysOfWeek.map((day) => (
          <div
            key={day.value}
            style={{
              margin: '0 5px',
              padding: isSmallScreen ? '3px 8px' : '10px 55px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: '#333',
              fontWeight: 'normal',
              position: 'relative',
              fontSize: isSmallScreen ? '14px' : '16px',
            }}
            onClick={() => setSelectedDay(day.value)}
          >
            <span
              style={{
                display: 'inline-block',
                borderBottom: selectedDay === day.value ? '2px solid #333' : '2px solid transparent',
                width: '100%',
                transition: 'border-bottom 0.3s ease',
              }}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ width: chartWidth, height: `${chartHeight}px`, margin: '0 auto', maxWidth: '1200px' }}>
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default BarChart;
