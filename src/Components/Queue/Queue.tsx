import React from "react";
import { selectQueue } from "../../store/questions/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { selectShowSidebar } from "../../store/appState/selectors";
import { Button, Card } from "react-bootstrap";
import { toggleSidebar } from "../../store/appState/actions";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import UpVotes from "../UpVotes/UpVotes";
import GoToQuestionButton from "../GoToQuestionButton.tsx/GoToQuestionButton";
import { updateQuestion } from "../../store/questions/actions";
import { selectUserId } from "../../store/user/selectors";

interface propsButton {
  text: string;
}

function ToggleSidebarButton({ text }: propsButton) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(toggleSidebar())}
      className="sidebar-button"
    >
      {text}
    </Button>
  );
}
interface PropsQuestion {
  question: QuestionWithAuthorAndSolver;
}
function PendingQuestion({ question }: PropsQuestion) {
  const { id, title, author, upVotes, solver } = question;
  const { firstName, lastName, classNo } = author;

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const handleResolvedClick = (questionId: number) => {
    // dispatch(updateQuestion())
  };
  const helpClickHandler = (questionId: number, solverId: number | null) => {
    console.log("solverId", solverId);
    dispatch(updateQuestion(questionId, "solverId", solverId));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName} (${classNo})`}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>{title}</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <GoToQuestionButton />
          {solver ? (
            <Button
              disabled={solver.id !== userId}
              variant="warning"
              onClick={() => helpClickHandler(id, null)}
            >{`${solver.firstName} to the rescue`}</Button>
          ) : (
            <Button onClick={() => helpClickHandler(id, userId)}>Help</Button>
          )}

          <UpVotes upVotes={upVotes} messageId={id} />

          <Button variant="success" onClick={() => handleResolvedClick(id)}>
            {<CheckCircleOutlineOutlinedIcon />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function Queue() {
  const queue = useSelector(selectQueue);
  const sortedQueue = queue.sort((a, b) => a.createdAt - b.createdAt);
  const showSidebar = useSelector(selectShowSidebar);

  if (!showSidebar) {
    return <ToggleSidebarButton text={"< Show question queue"} />;
  }
  return (
    <div className="sidebar">
      <ToggleSidebarButton text={">"} />
      {sortedQueue.map((question) => (
        <PendingQuestion
          question={question}
          //authorInfo={question.author}
          key={question.id}
        />
      ))}
    </div>
  );
}
