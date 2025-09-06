export const mockCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg',
    description: 'Master React from scratch with hands-on projects. Build real-world applications and learn modern React patterns.',
    instructor: 'Sarah Johnson',
    duration: '12 hours 30 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Introduction to React',
        description: 'Learn what React is and why it\'s popular for building user interfaces.',
        durationSec: 596
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'Components and JSX',
        description: 'Deep dive into React components and JSX syntax.',
        durationSec: 653
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'State and Props',
        description: 'Understanding state management and props in React.',
        durationSec: 720
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        title: 'Hooks in React',
        description: 'Learn useState, useEffect and other essential hooks.',
        durationSec: 845
      }
    ],
    progress: 65,
    priceINR: 2999,
    isFree: false,
    category: 'Frontend Development'
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/hqdefault.jpg',
    description: 'Complete JavaScript course covering ES6+, async programming, and modern JavaScript features.',
    instructor: 'Michael Chen',
    duration: '8 hours 15 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Variables and Data Types',
        description: 'Learn about JavaScript variables, data types, and basic syntax.',
        durationSec: 765
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        title: 'Functions and Scope',
        description: 'Understanding functions, closures, and scope in JavaScript.',
        durationSec: 890
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        title: 'Async JavaScript',
        description: 'Master promises, async/await, and asynchronous programming.',
        durationSec: 980
      }
    ],
    progress: 30,
    priceINR: 0,
    isFree: true,
    category: 'Programming Languages'
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    thumbnail: 'https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    instructor: 'David Wilson',
    duration: '14 hours 45 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        title: 'Setting up Node.js Environment',
        description: 'Install Node.js and set up your development environment.',
        durationSec: 892
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        title: 'Express.js Fundamentals',
        description: 'Learn Express.js framework for building web applications.',
        durationSec: 1024
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        title: 'MongoDB Integration',
        description: 'Connect your Node.js app with MongoDB database.',
        durationSec: 1150
      }
    ],
    progress: 85,
    priceINR: 4999,
    isFree: false,
    category: 'Backend Development'
  },
  {
    id: '4',
    title: 'Modern CSS & Responsive Design',
    thumbnail: 'https://img.youtube.com/vi/JJSoEo8JSnc/hqdefault.jpg',
    description: 'Master modern CSS including Flexbox, Grid, animations, and responsive design principles.',
    instructor: 'Emma Davis',
    duration: '6 hours 50 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        title: 'CSS Flexbox Mastery',
        description: 'Complete guide to CSS Flexbox layout system.',
        durationSec: 543
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        title: 'CSS Grid Layout',
        description: 'Learn CSS Grid for complex layouts.',
        durationSec: 720
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        title: 'Responsive Design Principles',
        description: 'Create responsive websites that work on all devices.',
        durationSec: 650
      }
    ],
    progress: 10,
    priceINR: 0,
    isFree: true,
    category: 'Frontend Development'
  },
  {
    id: '5',
    title: 'Python Programming Complete Course',
    thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
    description: 'Complete Python course covering basics to advanced concepts including OOP and data structures.',
    instructor: 'Alex Rodriguez',
    duration: '16 hours 14 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        title: 'Python Basics',
        description: 'Learn Python syntax, variables, and basic operations.',
        durationSec: 1200
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        title: 'Object-Oriented Programming',
        description: 'Master OOP concepts in Python.',
        durationSec: 1450
      }
    ],
    progress: 0,
    priceINR: 3999,
    isFree: false,
    category: 'Programming Languages'
  },
  {
    id: '6',
    title: 'HTML & CSS Fundamentals',
    thumbnail: 'https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg',
    description: 'Learn HTML and CSS from scratch and build responsive websites.',
    instructor: 'Lisa Parker',
    duration: '5 hours 7 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        title: 'HTML Fundamentals',
        description: 'Learn HTML structure, tags, and semantic markup.',
        durationSec: 2100
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        title: 'CSS Styling and Layout',
        description: 'Style your HTML with CSS and create layouts.',
        durationSec: 2800
      }
    ],
    progress: 45,
    priceINR: 0,
    isFree: true,
    category: 'Frontend Development'
  },
  {
    id: '7',
    title: 'Vue.js Course for Beginners',
    thumbnail: 'https://i.ytimg.com/vi/FXpIoQ_rT_c/maxresdefault.jpg',
    description: 'Learn Vue.js framework from the ground up including Vuex and Vue Router.',
    instructor: 'Net Ninja',
    duration: '4 hours 32 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        title: 'Vue Basics',
        durationSec: 956
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        title: 'Vue Router & Vuex',
        durationSec: 1324
      }
    ],
    progress: 20,
    priceINR: 2499,
    category: 'Frontend Development'
  },
  {
    id: '8',
    title: 'MongoDB Tutorial',
    thumbnail: 'https://i.ytimg.com/vi/ExcRbA7fy_A/maxresdefault.jpg',
    description: 'Complete MongoDB course covering CRUD operations, aggregation, and indexing.',
    instructor: 'Net Ninja',
    duration: '3 hours 18 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        title: 'MongoDB Basics',
        durationSec: 720
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        title: 'Advanced Queries',
        durationSec: 890
      }
    ],
    progress: 75,
    priceINR: 1999,
    category: 'Database'
  },
  {
    id: '9',
    title: 'TypeScript Course for Beginners',
    thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
    description: 'Master TypeScript including types, interfaces, generics, and advanced features.',
    instructor: 'Programming with Mosh',
    duration: '5 hours 12 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        title: 'TypeScript Fundamentals',
        durationSec: 1100
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Advanced Types',
        durationSec: 1350
      }
    ],
    progress: 55,
    priceINR: 2999,
    category: 'Programming Languages'
  },
  {
    id: '10',
    title: 'Git & GitHub Complete Course',
    thumbnail: 'https://i.ytimg.com/vi/apGV9Kg7ics/maxresdefault.jpg',
    description: 'Master version control with Git and collaboration with GitHub.',
    instructor: 'Kunal Kushwaha',
    duration: '2 hours 45 minutes',
    media: [
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        title: 'Git Basics',
        durationSec: 650
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        title: 'GitHub Collaboration',
        durationSec: 780
      }
    ],
    progress: 90,
    priceINR: 1499,
    category: 'Tools & DevOps'
  }
];
