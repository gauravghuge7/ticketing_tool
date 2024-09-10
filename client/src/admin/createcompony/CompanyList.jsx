import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { message } from 'react-message-popup';

const CompanyList = ({ setValue, setClientId, setClientName }) => {
    
    const [companies, setCompanies] = useState([
        { 
            clientName: 'Company 1', 
            clientEmail: 'company1@gmail.com', 
            clientPassword: 'clientPassword123'
        },
        
    ]);


    const fetchCompanies = async () => {
        try {
            
            const response = await axios.get("/api/admin/getAllClients")      // this is the api call we are useing the axios 


            if(response.data.success){
                message.success(response.data.message);
                setCompanies(response.data.data.clientList);
            }

        } 
        catch (error) {
            message.error(error.message);
        }
    }

    const setDetails = (clientId, clientName) => {

        setValue("addproject");

        setClientId(clientId);
        setClientName(clientName);

    }



    useEffect(() => {
        fetchCompanies();
    },[1])


    return (
        <Container
            style={{
                background: "#f0f4f8",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                color: "#333",
                maxWidth: "95%",
                marginTop: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h2 style={{ margin: 0, color: "#333" }}>Client List</h2>
                <Button
                    style={{
                        backgroundColor: "#4CAF50",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        color: "#fff",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#45a049")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#4CAF50")
                    }
                    onClick={() => setValue("createcompany")}
                >
                    Add Companies
                </Button>
            </div>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    {companies.length > 0 ? (
                        <Table
                            striped
                            bordered
                            hover
                            style={{
                                backgroundColor: "#fff",
                                color: "#333",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <thead
                                style={{
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                }}
                            >
                                <tr>
                                    <th>#</th>
                                    <th>Company clientName</th>
                                    <th>Company clientEmail</th>
                                    <th>clientPassword</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{company.clientName}</td>
                                        <td>{company.clientEmail}</td>
                                        <td>{company.clientPassword}</td>
                                        <td>
                                            <Button
                                                style={{
                                                    backgroundColor: "#4CAF50",
                                                    border: "none",
                                                    padding: "12px 24px",
                                                    borderRadius: "8px",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    transition: "background-color 0.3s ease",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor = "#45a049")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.backgroundColor = "#4CAF50")
                                                }
                                                onClick={() => setDetails(company._id, company.clientName)}
                                            >
                                                Add Project
                                            </Button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p style={{ color: "#333" }}>No companies registered yet.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CompanyList;