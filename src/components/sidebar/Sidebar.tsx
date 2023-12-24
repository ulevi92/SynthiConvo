import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  const conversationScript = useAppSelector(
    ({ userData }) => userData.chat.history
  );
  const modalType = useAppSelector(({ global }) => global.modalType);
  const showModal = useAppSelector(({ global }) => global.showModal);
  const displayName = useAppSelector(
    (state) => state.userData.userProfile.displayName
  );
  const email = useAppSelector((state) => state.userData.userProfile.email);
  const credit = useAppSelector((state) => state.userData.chat.credit);

  const firstMessage = conversationScript.find(({ role }) => role === "user");

  console.log(credit);

  return (
    <Container fluid className='d-flex flex-grow-1'>
      <Row className='flex-column flex-grow-1'>
        <Col
          className='d-flex flex-column flex-grow-1 align-items-start '
          md='12'
        >
          <h2 className='mb-4 mt-2'>SynthiConvo</h2>

          <div className='mb-5'>
            <h5>Welcome: {displayName}</h5>
            <p>{email}</p>

            <h6>credit left: {credit}</h6>
          </div>

          {firstMessage && (
            <SidebarCard
              cardName='conversation'
              conversationKeyWords={`${firstMessage.content?.slice(0, 14)}...`}
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
