import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { ChartsLegend } from '@mui/x-charts';

const size = {
    // width: 400,
    height: 275,
    // margin:10
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

export default function PieChartComp(props) {
    let data = props.data
    return (
        <div className='pie-chart-comp'>
            <PieChart
                series={[{ data,innerRadius:60}]} {...size}
                margin={{
                    top:30,
                    bottom:65,
                    left:70
                }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: -5,
                        color:'#F5F5F5'
                    },
                }}
            />


        </div>
    );
}
