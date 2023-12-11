import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import { clearModal } from "../../redux/features/global/globalSlice";
import { useEffect } from "react";
import { resetChatHistory } from "../../redux/features/user/userSlice";

export const AboutModalText = () => (
  <>
    <h1>About SynthiConvo</h1>
    <h3>overview</h3>
    <p>
      SynthiConvo is a dynamic web application that exemplifies proficiency in
      cutting-edge web development technologies. By seamlessly integrating
      React, TypeScript, Bootstrap, React-Bootstrap, React Router, Redux,
      React-Redux, and React Forms, the project underscores a commitment to
      utilizing modern tools for a polished user experience.
    </p>

    <h3>Core Technologies</h3>

    <h4>React & TypeScript</h4>
    <p>
      SynthiConvo's foundation lies in React and TypeScript, ensuring a modern
      and type-safe architecture for robust application development.
    </p>

    <h4>Bootstrap & React-Bootstrap</h4>
    <p>
      The application's sleek and responsive design is achieved through
      Bootstrap and React-Bootstrap, showcasing meticulous attention to detail
      and a focus on optimal user experience.
    </p>

    <h4>React Router</h4>
    <p>
      Enhanced user navigation is provided through React Router, offering a
      dynamic and intuitive journey within the application.
    </p>

    <h4>Redux & React-Redux</h4>
    <p>
      SynthiConvo's state management, powered by Redux and React-Redux,
      demonstrates the ability to maintain a centralized and predictable state
      for seamless data flow.
    </p>

    <h4>React Forms</h4>
    <p>
      SynthiConvo incorporates React Forms to facilitate user interactions,
      showcasing a commitment to user-friendly and efficient form handling.
    </p>

    <h4>Firebase Backend</h4>
    <p>
      As a backend solution, SynthiConvo relies on Firebase, utilizing its
      real-time database capabilities, secure authentication services, and
      efficient cloud functions.
    </p>

    <h4>OpenAI API</h4>
    <p>
      SynthiConvo integrates the OpenAI API, leveraging advanced natural
      language processing for intelligent and dynamic conversations.
    </p>

    <h4>ipRegistry API</h4>
    <p>
      To enhance security, SynthiConvo utilizes the ipRegistry API to store user
      IP addresses and prevent the usage of VPNs, ensuring a secure and reliable
      user environment.
    </p>
  </>
);

export const ClearConversationModalText = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.user.chat.history);

  const handleClearHistory = () => {
    dispatch(resetChatHistory());
    dispatch(clearModal());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (history.length === 0) dispatch(clearModal());
    }, 1500);

    return () => clearTimeout(timer);
  }, [history]);

  if (history.length === 0)
    return (
      <>
        <h3>There is no conversation to delete</h3>
      </>
    );

  return (
    <>
      <h3>
        Are you sure you want to delete the conversation history? This action is
        irreversible
      </h3>
      <p>Deleting the conversation won't restore your credit</p>

      <Button onClick={handleClearHistory} className='text-uppercase'>
        confirm
      </Button>
    </>
  );
};

export const AccountModalText = () => {
  const {} = useAppSelector((state) => ({}));

  return <></>;
};
