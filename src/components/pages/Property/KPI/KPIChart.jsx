import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { GetPropertyKPI } from "../../../../store/slices/propertyManagementSlice/propertyManagementSlice";
import { useParams } from "react-router-dom";
import GaugeChart from "react-gauge-chart"; // Import GaugeChart
import { Col, Row } from "react-bootstrap";


const KPIChart = ({ data }) => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "bar",
                height: 380,
                animations: {
                    enabled: true,
                    easing: "bounce",  // Other options: 'linear', 'easein', 'easeinout', 'bounce'
                    speed: 1500, // Animation duration in milliseconds
                    animateGradually: {
                        enabled: true,
                        delay: 160, // Delay between series animations
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 500,
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                categories: ["Property KPI"],
            },
        },
    });
    const [acceptedPercentage, setAcceptedPercentage] = useState(0);



    useEffect(() => {
        dispatch(GetPropertyKPI(id))
            .then((response) => {
                const data = response.payload
                console.log('[data]', data)
                if (data !== 'Data not found') {
                    setChartData((prevData) => ({
                        ...prevData,
                        series: [
                            { name: "Total Offers", data: [data?.total_offers] },
                            { name: "Accepted Offers", data: [Number(data?.accepted_offers)] },
                            { name: "Total Views", data: [data?.total_views] },
                        ],
                    }));

                    // Convert "accepted_percentage" to a float and normalize it (GaugeChart expects 0-1 range)
                    setAcceptedPercentage(Number(data.accepted_percentage) / 100);
                } else {
                    setChartData('')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [dispatch, id])


    console.log('[chartData]', chartData)

    return (
        <>


            {
                chartData ? (
                    <Row className="justify-content-between mt-3">
                        <Col lg={6} className=' rounded-2 mt-3'>
                            <div className='owner-mobile my-3'>
                                <h4 className='mb-2'>KPI</h4>
                                <div className='property-kpi'>
                                    <div id="chart" className="chart-container">
                                        {chartData.series.length > 0 ? (
                                            <ReactApexChart
                                                options={chartData.options}
                                                series={chartData.series}
                                                type="bar"
                                                height={380}
                                            />
                                        ) : (
                                            <p>Loading chart...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={5} className=' rounded-2 mt-3'>
                            {/* Gauge Chart for Accepted Percentage */}
                            <div className="my-3">
                                <h4>Accepted Percentage</h4>
                                <GaugeChart
                                    id="gauge-chart"
                                    nrOfLevels={20} // Number of segments in the gauge
                                    percent={acceptedPercentage} // Value (0 to 1)
                                    colors={["#FF0000", "#FFFF00", "#00FF00"]} // Red -> Yellow -> Green
                                    arcWidth={0.3} // Thickness of the gauge arc
                                    textColor="#000" // Color of the percentage text
                                    needleColor="#345243" // Needle color
                                    animate={true} // Enable animation
                                    style={{ width: "100%", height: "100%", marginTop: '100px' }} // Ensure it scales correctly
                                />
                            </div>
                        </Col>
                    </Row>
                ) : null
            }

        </>

    );
};

export default KPIChart;
