import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  const conversationScript = useAppSelector(
    ({ userData }) => userData.chat.history
  );
  const modalType = useAppSelector(({ global }) => global.modalType);
  const showModal = useAppSelector(({ global }) => global.showModal);

  const firstMessage = conversationScript.find(
    (message) => message.message.role === "user"
  );

  console.log(showModal, modalType);

  return (
    <Container fluid className='d-flex flex-grow-1'>
      <Row className='flex-column flex-grow-1'>
        <Col className='d-flex flex-grow-1 mt-5 align-items-start' md='12'>
          {firstMessage && (
            <SidebarCard
              cardName='conversation'
              conversationKeyWords={`${firstMessage.message.content?.slice(
                0,
                14
              )}...`}
              cardMarginB={3}
              cardMarginT={0}
            />
          )}

          {conversationScript.length === 0 && (
            <Button className='w-100 text-capitalize' variant='outline-success'>
              + new chat
            </Button>
          )}
        </Col>

        <Col
          className='d-flex flex-column justify-content-end border-top border-grey'
          md='12'
        >
          <SidebarCard
            cardName='about'
            cardMarginT={5}
            cardMarginB={1}
            clickable
          />

          <SidebarCard cardName='account' cardMarginY={1} clickable />

          <SidebarCard
            cardName='clear conversation'
            cardMarginY={1}
            clickable
          />

          <SidebarCard cardName='dark mode' cardMarginY={1} clickable />

          <SidebarCard
            cardName='logout'
            cardMarginB={5}
            cardMarginT={1}
            clickable
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
