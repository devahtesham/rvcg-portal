import  { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { errorNotify } from "../../../../Toastify/Toastify";
import { MAIN_HEADINGS } from "../../../../data";
import { useLocation } from "react-router-dom";

const ROICalculator = () => {
    const [totalInvestment, setTotalInvestment] = useState("");
    const [netProfit, setNetProfit] = useState("");
    const [roi, setROI] = useState(null);

    const { pathname } = useLocation();

    const calculateROI = () => {
        if (!totalInvestment || !netProfit) {
            errorNotify("Both fields are required to Calculate ROI");
            setROI(null);
            return;
        }

        if (parseFloat(totalInvestment) <= 0) {
            errorNotify("Total Investment must be greater than zero.");
            return;
        }

        const roiValue = (parseFloat(netProfit) / parseFloat(totalInvestment)) * 100;
        setROI(roiValue.toFixed(2));
    };

    return (
        <Row className="justify-content-center mt-5">
            <Col lg={6}>
                <Card className="p-4 mb-4">
                    <div>
                        <h2 className="mb-4">{MAIN_HEADINGS[pathname]}</h2>
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Investment ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={totalInvestment}
                                onChange={(e) => setTotalInvestment(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Net Profit ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={netProfit}
                                onChange={(e) => setNetProfit(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="btn-main-clr" onClick={calculateROI}>
                            Calculate ROI
                        </Button>
                    </Form>

                    {roi !== null && <h4 className="mt-3 text-end">{roi}%</h4>}
                </Card>
            </Col>
        </Row>
    );
}

export default ROICalculator