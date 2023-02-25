import "./profile.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AutoLayoutExample() {
  return (
    <Container>
        <Col sm={4}>
            <Row></Row>
            <Row></Row>
            <Row></Row>
        </Col>
        <Col sm={8}>
            <Row></Row>
            <Row></Row>
            <Row></Row>
        </Col>
    </Container>
  );
}

export default AutoLayoutExample;

