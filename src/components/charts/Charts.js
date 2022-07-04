import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import styles from './style.module.css';

export default function Charts() {
    const [data, setData] = useState([]);

    const getData = () => {
        setData(true);
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    let dataa = data.data?.slice(0).reverse().map((item) => {
        return [item.Year, item.Population];
    })

    let column = [['Year', 'Population']]

    let dataChart = column.concat(dataa)

    let descriptions = data.source?.map((item) => {
        return {
            source_name: item.annotations.source_name,
            dataset_link: item.annotations.dataset_link,
            source_description: item.annotations.source_description,
            dataset_name: item.annotations.dataset_name,
        };
    })

    const descriptionsObj = Object.assign({}, descriptions);

    return (
        <div className={styles.root}>
            <div className={styles.chart}>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading..</div>}
                    data={dataChart}
                    options={{
                        title: 'Line Chart',
                        curveType: 'function',
                        legend: { position: 'bottom' },
                    }} />
                <Chart
                    width={'400px'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading..</div>}
                    data={dataChart}
                    options={{
                        title: 'Pie Chart',
                        curveType: 'function',
                        legend: { position: 'bottom' },
                    }} />
            </div>
            <div className={styles.desc}>
                <p>
                    <b>Source:</b> {descriptionsObj[0]?.source_name} -
                    <a href="https://www.census.gov/programs-surveys/acs/" target="_blank" rel="noreferrer">
                        {descriptionsObj[0]?.dataset_name}</a>
                </p>
                <p>{descriptionsObj[0]?.source_description}</p>
            </div>
        </div>
    );
}