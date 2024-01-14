import { useMemo } from "react";
import { useAppSelector } from "../../../redux/reduxHooks";
import { Container, Row } from "react-bootstrap";
import ChatCard from "./ChatCard";
import { aiTasks } from "./ChatTasks.helper";

const ChatTasks = () => {
  const history = useAppSelector((state) => state.userData.chat.history);

  const content = useMemo(() => {
    const generateTaskIndexes = () => {
      const numbers = new Set<number>();
      while (numbers.size < 4) {
        numbers.add(Math.floor(Math.random() * 47) + 1);
      }
      return Array.from(numbers);
    };

    const RandomTasks = generateTaskIndexes().map((index) => {
      return aiTasks.find((task) => task.index === index)!;
    });

    return RandomTasks.map((task) => {
      return (
        <ChatCard
          key={task.index}
          content={task.content}
          description={task.description}
        />
      );
    });
  }, [history, aiTasks]);

  return (
    <Container className='d-flex h-100 flex-column justify-content-end'>
      <Row className='mx-5'>{content}</Row>
    </Container>
  );
};

export default ChatTasks;
