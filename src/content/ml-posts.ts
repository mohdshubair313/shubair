export interface LearningPost {
  id: string;
  title: string;
  publishedAt: string;
  platform: "X" | "LinkedIn";
  url: string;
  paragraphs: readonly string[];
  video?: {
    src: string;
    poster: string;
    width: number;
    height: number;
    description: string;
  };
  images?: readonly {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

// Short, plain-language versions of the linked posts. Dates are from the originals.
export const learningPosts: readonly LearningPost[] = [
  {
    id: "day-38-prediction-app",
    title: "Day 38: Building a house price app",
    publishedAt: "2026-10-16T15:55:23.000Z",
    platform: "X",
    url: "https://x.com/Shubair313/status/2111123852197769431",
    paragraphs: [
      "I built a small app that estimates a house price from the details in a form. The form sends the information to my Python server, which makes a prediction and sends the result back to the page.",
      "Here’s the demo I shared on Day 38 of learning to build AI apps.",
    ],
    video: {
      src: "/media/ml/day-38-prediction-app.mp4",
      poster: "/media/ml/day-38-prediction-app.jpg",
      width: 1044,
      height: 720,
      description: "A screen recording of my house price app: filling in property details and viewing the predicted price.",
    },
  },
  {
    id: "python-tasks",
    title: "Running Python tasks together",
    publishedAt: "2026-06-13T12:48:54.148Z",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_machinelearning-multithreading-multiprocessing-share-7471544124979195906-i6aD/",
    paragraphs: [
      "I learned how Python can run several data-loading tasks together instead of waiting for each one to finish. In the example I shared, the time went from 6.23 seconds to 1.33 seconds.",
      "This can help when collecting data or downloading files for a machine-learning project.",
    ],
  },
  {
    id: "nasa-project",
    title: "Exploring NASA’s meteorite data",
    publishedAt: "2026-06-04T09:49:00.207Z",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_datascience-machinelearning-python-ugcPost-7468237360691044353-sMLn/",
    paragraphs: [
      "After following Krish Naik’s machine-learning lessons, I tried working with NASA’s meteorite data. I cleaned up missing values and made charts to compare meteorite sizes, dates, and locations.",
      "Plotting the locations was my favourite part—the points began to show the shape of the continents.",
    ],
  },
  {
    id: "nasa-first-steps",
    title: "Starting my NASA meteorite project",
    publishedAt: "2026-06-04T09:28:43.000Z",
    platform: "X",
    url: "https://x.com/Shubair313/status/2062466568244842727",
    paragraphs: [
      "I downloaded NASA’s meteorite data and started exploring it with Python. I checked the columns, removed rows with missing values, and began making charts.",
      "These are the screenshots I shared while working on it.",
    ],
    images: [
      { src: "/media/ml/nasa-meteorites-1.jpg", alt: "Python notebook code for a chart of meteorite sizes", width: 1404, height: 393 },
      { src: "/media/ml/nasa-meteorites-2.jpg", alt: "My chart showing the distribution of meteorite sizes", width: 1920, height: 1080 },
    ],
  },
];
