export const mockQuiz = {
  id: 'react-basics-quiz',
  title: 'React Basics Quiz',
  description: 'Test your knowledge of React fundamentals',
  questions: [
    {
      id: '1',
      question: 'What is JSX?',
      options: [
        'JavaScript XML - a syntax extension for JavaScript',
        'A new programming language',
        'A database query language',
        'A CSS framework'
      ],
      correct: 0
    },
    {
      id: '2',
      question: 'Which method is used to render a React component?',
      options: [
        'React.render()',
        'ReactDOM.render()',
        'component.render()',
        'render.component()'
      ],
      correct: 1
    },
    {
      id: '3',
      question: 'What is the purpose of useState hook?',
      options: [
        'To handle side effects',
        'To manage component state',
        'To optimize performance',
        'To handle routing'
      ],
      correct: 1
    },
    {
      id: '4',
      question: 'How do you pass data from parent to child component?',
      options: [
        'Using state',
        'Using context',
        'Using props',
        'Using refs'
      ],
      correct: 2
    },
    {
      id: '5',
      question: 'What is the virtual DOM?',
      options: [
        'A copy of the real DOM kept in memory',
        'A new type of HTML element',
        'A CSS technique',
        'A JavaScript library'
      ],
      correct: 0
    }
  ]
};
