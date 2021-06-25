import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isAnswered?: boolean;
  isHighlighted?: boolean;
}


export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}) => {
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
