import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Header } from "./Header";

export function Tables() {
    const location = useLocation();
    const navigate = useNavigate();
    const { value: dbName } = location.state || {}; // Get database name from state

    const [tables, setTables] = useState([]); // State for tables
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch tables of the selected database
    useEffect(() => {
        if (dbName) {
            fetch(`http://localhost:5000/tables`)
                .then(response => response.json())
                .then(data => {
                    setTables(data.tables); // Assuming API returns { tables: [...] }
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching tables:", error);
                    setError("Failed to load tables. Try again.");
                    setLoading(false);
                });
        }
    }, [dbName]);

    const handleUpdate = (tableName) => {
        navigate("/update-table", { state: { value:tableName } }); // Navigate to update page
    };

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#ffffff" }}>
            <Header />
            <Container className="mt-4">
                <h1 className="text-center text-light mb-4">📋 Tables in {dbName}</h1>

                {/* Loading Spinner */}
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" variant="light" />
                        <p>Loading tables...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Tables List */}
                {!loading && !error && (
                    <Row className="justify-content-center">
                        {tables.map((table, index) => (
                            <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                                <Card className="shadow-sm text-center border-0 table-card">
                                    <Card.Body>
                                        <Card.Title className="text-light">{table}</Card.Title>
                                        <Button
                                            variant="outline-light"
                                            className="mt-2"
                                            onClick={() => handleUpdate(table)}
                                        >
                                            Update Table
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            {/* Custom Styles for Dark Theme */}
            <style>
                {`
                    .table-card {
                        background-color: #1e1e1e;
                        transition: transform 0.2s, background-color 0.3s;
                    }

                    .table-card:hover {
                        background-color: #333;
                        transform: scale(1.05);
                    }

                    .table-card Button:hover {
                        background-color: #ffffff;
                        color: #121212;
                    }
                `}
            </style>
        </div>
    );
}
