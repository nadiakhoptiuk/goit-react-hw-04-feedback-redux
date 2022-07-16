import { useState } from 'react';
import Section from './Section';
import FeedbackButtons from './FeedbackButtons';
import Statistics from './Statistics';
import Notification from './Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrease = ({ target: { name } }) => {
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const typesObj = { good: good, neutral: neutral, bad: bad };
  const typesArr = Object.entries(typesObj);
  const typesVal = Object.values(typesObj);

  const countTotalFeedback = array => {
    return array.reduce((prevVal, currVal) => {
      return prevVal + currVal;
    });
  };
  const totalCount = countTotalFeedback(typesVal);

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / totalCount) * 100);
  };
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackButtons btnTypes={typesArr} onIncrease={handleIncrease} />
      </Section>

      <Section title="Statistics">
        {!totalCount ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            reportTypes={typesArr}
            totalCount={totalCount}
            goodValue={good}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
}
