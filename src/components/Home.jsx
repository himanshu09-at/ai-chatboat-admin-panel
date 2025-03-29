import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Header } from "./Header";

export function Home() {
    const navigate = useNavigate();
    const [databases, setDatabases] = useState([]); // State for databases
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch databases on component mount
    useEffect(() => {
        fetch("http://localhost:5000/databases")
            .then(response => response.json())
            .then(data => {
                setDatabases(data.databases); // Assuming API returns { databases: [...] }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching databases:", error);
                setError("Failed to load databases. Try again.");
                setLoading(false);
            });
    }, []);

    const handleClick = (dbName) => {
        navigate("/tables", { state: { value: dbName } });
    };

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#ffffff" }}>
            <Header />
            <Container className="mt-4">
                <h1 className="text-center text-light mb-4">📂 Available Databases</h1>

                {/* Loading Spinner */}
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" variant="light" />
                        <p>Loading databases...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Databases List */}
                {!loading && !error && (
                    <Row className="justify-content-center">
                        {databases.map((db, index) => (
                            <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                                <Card className="shadow-sm text-center border-0 database-card">
                                    <Card.Body>
                                        <Card.Title className="text-light">{db}</Card.Title>
                                        <Button
                                            variant="outline-light"
                                            className="mt-2"
                                            onClick={() => handleClick(db)}
                                        >
                                            View Tables
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
                    .database-card {
                        background-color: #1e1e1e;
                        transition: transform 0.2s, background-color 0.3s;
                    }

                    .database-card:hover {
                        background-color: #333;
                        transform: scale(1.05);
                    }

                    .database-card Button:hover {
                        background-color: #ffffff;
                        color: #121212;
                    }
                `}
            </style>
        </div>
    );
}
