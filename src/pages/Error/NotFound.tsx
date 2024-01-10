import { FC } from "react";

import { ErroPagesProps } from "./ErrorPage";
import { Col, Container, Row } from "react-bootstrap";

import "./not-found.scss";
import { Link } from "react-router-dom";

const NotFound: FC<ErroPagesProps> = ({ countdown }) => {
  return (
    <>
      <Container className='d-flex flex-column h-100'>
        <Row className='flex-grow-1 justify-content-center align-items-center'>
          <Col md={12} className='text-center'>
            <h1 className='error-number'>404</h1>
            <p className='error-message'>
              Oops! We can't seem to find the page you're looking for.
            </p>
            <p>
              You will automatically return to the home page in {countdown}{" "}
              seconds.
            </p>
            <Link to='/' className='btn btn-primary home-link'>
              Back to Home
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
