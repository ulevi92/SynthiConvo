import {
  ModalType,
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";
import store from "../../redux/store";

export type FormType = "login" | "sign up" | "reminder";

export interface State {
  index: number;
  subIndex: number;
  reverse: boolean;
}

export const defaultState: State = {
  index: 0,
  subIndex: 0,
  reverse: false,
};

export const sentences = [
  `Need help? I'm just a message away. Let's get started!`,
  `Curious about something? I've got answers. What would you like to know?`,
  `Got questions? I’ve got AI-powered answers. Let’s chat!`,
  `I'm here to assist with any inquiries you have`,
  `Welcome to the future of AI: Experience intelligence like never before!`,
  `Revolutionize your daily tasks with our cutting-edge AI technology.`,
  `Unlock the full potential of artificial intelligence with SynthiConvo.`,
  `Effortless solutions at your fingertips – powered by advanced AI.`,
  `AI that understands you: Personalize your experience for optimal efficiency.`,
  `Transforming the way you interact with technology, one smart solution at a time.`,
  `Your gateway to smarter living: Explore AI that adapts to your needs.`,
  `Innovative, intuitive, and intelligent – AI designed for everyone.`,
  `Beyond automation: Discover AI that thinks, learns, and grows with you.`,
  `Step into a smarter world: Let our AI take your productivity to the next level.`,
  `Tailored AI assistance – for work, play, and everything in between.`,
  `Where technology meets convenience: Your AI companion for every challenge.`,
  `Simplify your life with AI that’s always one step ahead.`,
  `Empower your decisions with AI that offers insights and guidance.`,
  `Redefine possibilities with an AI that evolves with your aspirations.`,
];

export const handleOpenModal = (e: React.MouseEvent) => {
  const dispatch = store.dispatch;

  const innerText = e.currentTarget.textContent as ModalType;

  dispatch(setShowModal(true));

  dispatch(setModalType(innerText));
};
