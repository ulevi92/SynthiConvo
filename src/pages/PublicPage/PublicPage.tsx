import { Button, Col, Container, Row } from "react-bootstrap";

import { useLayoutEffect, useState } from "react";
import { State, defaultState, sentences } from "./PublicPage.helper";
import { Loader } from "../../components/loader/Loader";

import PublicPageForm from "./PublicPageForm";
import RejectedErrors from "../../components/form/RejectedErrors";
import { set } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";

const PublicPage = () => {
  const [state, setState] = useState<State>(defaultState);
  const formType = useAppSelector((state) => state.global.formType);

  useLayoutEffect(() => {
    // Pause at the end of a sentence before erasing
    const atEndOfSentence = state.subIndex === sentences[state.index].length;
    const atStartOfSentence = state.subIndex === 0;

    // Function to determine timeout duration
    const determineTimeoutDuration = (
      atEndOfSentence: boolean,
      isReversing: boolean
    ) => {
      if (atEndOfSentence && !isReversing) {
        return 1250; // Pause longer at the end of a sentence
      } else if (isReversing) {
        return 25; // Faster erase effect
      } else {
        return 75; // Normal typing speed
      }
    };

    // Switch to the next sentence or start erasing
    if (atStartOfSentence && state.reverse) {
      setState((prevState) => ({
        ...prevState,
        index: (prevState.index + 1) % sentences.length,
        reverse: false,
      }));
      return;
    }

    // Set a timeout for the typing/erasing effect
    const timeout = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        // Erase if at the end of a sentence, otherwise continue typing/erasing
        subIndex:
          atEndOfSentence && !prevState.reverse
            ? prevState.subIndex
            : prevState.subIndex + (prevState.reverse ? -1 : 1),
        // Start reversing if at the end of the sentence
        reverse:
          atEndOfSentence && !prevState.reverse ? true : prevState.reverse,
      }));
    }, determineTimeoutDuration(atEndOfSentence, state.reverse)); // Dynamically determine the timeout duration

    return () => clearTimeout(timeout);
  }, [state.index, state.subIndex, state.reverse]);

  const headerText =
    formType === "sign up"
      ? "sign up"
      : formType === "reminder"
      ? "password reminder"
      : "login";

  return (
    <>
      <Loader auth>
        <Container fluid className='vw-100 vh-100 bg-primary-subtle'>
          <Row className='h-100'>
            <Col sm={12} lg={8}>
              <div className='mt-3 mx-3 h-25'>
                <h1 className='text-dark'>SynthiConvo</h1>

                <h3 className='ms-5 mt-5'>{`${sentences[state.index].substring(
                  0,
                  state.subIndex
                )}${
                  state.subIndex !== sentences[state.index].length ? "|" : ""
                }`}</h3>
              </div>

              <div className='d-block d-lg-none mt-5 mx-3'>
                <PublicPageForm mobile />
              </div>
            </Col>

            <Col
              sm={0}
              lg={4}
              className='d-none d-lg-flex flex-column bg-secondary px-xll-5 px-xl-4 px-md-3 h-100 '
            >
              <div className='d-flex flex-column flex-grow-1 justify-content-center'>
                <h1 className='text-capitalize text-light text-center mb-4'>
                  {headerText}
                </h1>

                <PublicPageForm />

                <RejectedErrors />
              </div>
            </Col>
          </Row>
        </Container>
      </Loader>
    </>
  );
};

export default PublicPage;
