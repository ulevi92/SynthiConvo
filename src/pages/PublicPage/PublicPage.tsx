import { Button, Col, Container, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import AppModal from "../../components/modal/AppModal";
import { useLayoutEffect, useState } from "react";
import { sentences } from "./PublicPage.helper";
import {
  ModalType,
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";

interface State {
  index: number;
  subIndex: number;
  reverse: boolean;
}
const defaultState: State = {
  index: 0,
  subIndex: 0,
  reverse: false,
};

const PublicPage = () => {
  const [state, setState] = useState<State>(defaultState);

  const dispatch = useAppDispatch();

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

  const handleOpenModal = (e: React.MouseEvent) => {
    const innerText = e.currentTarget.textContent as ModalType;

    dispatch(setShowModal(true));

    dispatch(setModalType(innerText));
  };

  return (
    <>
      <Container fluid className='vw-100 vh-100 bg-primary-subtle'>
        <Row className='h-100'>
          <Col sm={12} lg={8}>
            <div className='mt-3 ms-3'>
              <h1 className='text-dark'>SynthiConvo</h1>

              <h3 className='ms-5 mt-5'>{`${sentences[state.index].substring(
                0,
                state.subIndex
              )}${
                state.subIndex !== sentences[state.index].length ? "|" : ""
              }`}</h3>
            </div>
          </Col>

          <Col
            sm={0}
            lg={4}
            className='d-none d-lg-flex bg-secondary justify-content-center align-items-center'
          >
            <Button
              variant='outline-light'
              className='me-5'
              onClick={handleOpenModal}
              size='lg'
            >
              login
            </Button>
            <Button variant='outline-light' onClick={handleOpenModal} size='lg'>
              sign up
            </Button>
          </Col>
        </Row>
      </Container>

      <AppModal />
    </>
  );
};

export default PublicPage;
