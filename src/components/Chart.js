import Button from './Button'
import ButtonsTab from './ButtonsTab'
import styles from './Chart.module.css'
import { Line } from 'react-chartjs-2'
import {Chart as ChatJS} from 'chart.js/auto'

const Chart = (props) => {
    const coinData = props.history.prices

    if(!coinData) return

    const labels = coinData.map(item => {
        const date = new Date(item[0])
        const time = date.getHours() > 12 ?
                        `${date.getHours() - 12} : ${date.getMinutes()} PM` :
                        `${date.getHours()} : ${date.getMinutes()} AM`
                return date.toLocaleDateString()
    })
    const data = {
        labels: labels,
        datasets: [{
            label: 'Price',
            data: coinData.map(item => item[1]),
            borderColor: '#11A8B1'
          }]
    }

    const options= {
        "responsive": true,
        "maintainAspectRatio": true,
        elements: {
            point : {
                radius : 1
            }
        }
    }

    return (
        <div className = {styles.chart}>
            <Line
                data = {data}
                options = {options}
                />
            {/* <ButtonsTab>
                <Button> 1 Day </Button>
                <Button> 1 Month </Button>
                <Button> 3 Months </Button>
            </ButtonsTab> */}
        </div>
    )
}

export default Chart