
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Spinner, Alert, Container } from "react-bootstrap";

const UpdateTable = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tableName = queryParams.get("tableName");

    const [formData, setFormData] = useState({
        schemaName: "",
        description: "",
        tableName: "",
        businessContext: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!tableName) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/table-data?tableName=${tableName}`);
                if (response.data.data.length > 0) {
                    setFormData(response.data.data[0]);
                }
            } catch (err) {
                setError("Failed to fetch table data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tableName]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Data:", formData);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#121212", color: "#fff" }}>
            <Card style={{ width: "50rem", padding: "30px", backgroundColor: "#1e1e1e", border: "1px solid #333" }}>
                <Card.Body>
                    <Card.Title className="text-center" style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                        Edit Table Details
                    </Card.Title>

                    {loading && <Spinner animation="border" variant="light" className="d-block mx-auto my-3" />}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {!loading && !error && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: "#bbb" }}>Schema Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="schemaName"
                                    value={formData.schemaName}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: "#bbb" }}>Table Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tableName"
                                    value={formData.tableName}
                                    onChange={handleChange}
                                    disabled
                                    style={{ backgroundColor: "#444", color: "#fff", border: "1px solid #555" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: "#bbb" }}>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    rows={5} // Increased size to avoid scrolling
                                    value={formData.description}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: "#bbb" }}>Business Context</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="businessContext"
                                    rows={5} // Increased size to avoid scrolling
                                    value={formData.businessContext}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                                />
                            </Form.Group>

                            <Button variant="outline-light" type="submit" className="w-100">
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateTable;
