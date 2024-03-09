import styles from './graph.module.css'
import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react';




function GraphDiv() {

const [chartData, setChartData] = useState([]);
const [lineColor, setLineColor] = useState('green')

useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const firstTransaction = transactions.length > 0 ? transactions[0] : null;


    let runningTotal = 0;
    const dataForChart = [['Date', 'Total Amount']];

    for (let i = transactions.length - 1; i >= 0; i--) {
      const transaction = transactions[i];
      runningTotal += transaction.amount;
      dataForChart.push([transaction.date, runningTotal]);
    }

    
    const newLineColor = firstTransaction && firstTransaction.amount < 0 ? 'red' : 'green';
    setLineColor(newLineColor);


    setChartData(dataForChart);
  }, []);





    return (
        <div className={styles.GraphDiv}>
             <Chart
                className={styles.chart}
                width={'100%'}
                height={'100%'}
                chartType="LineChart"
                loader={<div>Loading chart</div>}
                data={chartData}
                options={{
                    title: 'Transactions chart',
                    curveType: 'function',
                    titleTextStyle: { color: '#9f9f9f' },
                    legend: { position: 'bottom' },
                    series: {
                      0: { color: lineColor },
                    },
                    backgroundColor: 'transparent', 
                    hAxis: {
                        textStyle: { color: '#cecece' },
                        gridlines: { color: 'transparent' }, 
                        baselineColor: '#919191',
                      },
                      vAxis: {
                        textStyle: { color: '#cecece' },
                        gridlines: { color: 'transparent' }, 
                        baselineColor: '#919191',
                      },
                    chartArea: { 
                      width: '80%',
                      height: '80%',
                    },
                    legendTextStyle: { color: '#cecece' }
                  }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default GraphDiv