import { Col, Container, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../../../redux/reduxHooks";
import DashboardCard from "./DashboardCard";
import Icon from "../../Icon";

const Dashboard = () => {
  const { conversationScript } = useAppSelector((state) => ({
    conversationScript: state.chat.history,
  }));

  const firstMessage = conversationScript.find(
    (message) => message.role === "user"
  );

  return (
    <Container fluid className='d-flex flex-grow-1'>
      <Row className='flex-column flex-grow-1'>
        <Col>
          {firstMessage && (
            <DashboardCard
              cardName='conversation'
              conversationKeyWords={`${firstMessage.content?.slice(0, 14)}...`}
              cardMarginB={3}
              cardMarginT={5}
            />
          )}
        </Col>

        <Col className='d-flex flex-column justify-content-end'>
          <DashboardCard cardName='about' cardMarginY={1} clickable />

          <DashboardCard cardName='account' cardMarginY={1} clickable />

          <DashboardCard
            cardName='clear conversation'
            cardMarginY={1}
            clickable
          />

          <DashboardCard cardName='dark mode' cardMarginY={1} clickable />

          <DashboardCard
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

export default Dashboard;
