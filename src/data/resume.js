// Single source of truth for every page and for the generated agent-facing files
// (llms.txt, resume.json). Plain data only — no imports, so Node can read it directly.
// `logo` is a key into src/data/logos.js.

export const profile = {
  name: 'Rishi Pisipati',
  title: 'Full Stack Engineer',
  summary:
    'Software Engineer with 6+ years of experience building scalable microservices and AI-driven platforms for education technology. Proven success leading cross-functional initiatives at BetterLesson and Renaissance Learning, modernizing infrastructure, and delivering impactful teacher development tools.',
  location: 'Austin, TX',
  highlights: [
    { value: '6+', label: 'Years building production software' },
    { value: '$2.3M', label: 'Bookings driven by Learning Walks (2023)' },
  ],
}

export const contact = {
  email: 'rishiprsd@gmail.com',
  phone: '+1-715-451-5040',
  linkedin: 'https://linkedin.com/in/risshiki',
  github: 'https://github.com/rishipisipati',
}

export const experience = [
  {
    id: 'betterlesson',
    company: 'BetterLesson',
    role: 'Software Engineer II',
    start: 'June 2021',
    end: 'Dec 2025',
    location: 'Boston, MA (Remote)',
    logo: 'betterlesson',
    tags: ['Spring Boot', 'React', 'Microservices', 'Gemini API', 'AWS S3', 'Flask'],
    bullets: [
      'Built ML preprocessing pipelines and inference services using Gemini APIs and Spring Boot to generate automated insights from qualitative educational datasets.',
      'Led the redesign of a 750K-line legacy codebase, fully deprecating the previous application and resolving major scalability issues. Refactored a monolithic Flask and React Native platform into Spring Boot microservices with React micro-frontend components.',
      "Spearheaded the design and implementation of the Learning Walks app, a digital application enabling district leaders to assess the impact of professional development — from hackathon to finished product. Achieved an NPS of 68 and generated $2.3M in bookings (2023), making it the company's most successful product.",
      'Built an automated Zoom ingestion pipeline using Spring Boot, S3, and Zoom Webhook APIs to detect, fetch, and process meeting and coaching recordings in real time, normalize metadata, and synchronize sessions across microservices — eliminating manual workflows.',
      'Built scalable data pipelines for Salesforce and Quickbase, delivering reliable cross-service data consistency with strong validation and retry mechanisms.',
      'Served as Tier-2 support for mission-critical services, triaging ingestion failures, improving retry logic, and reducing incident recovery time through root-cause analysis and automated remediation.',
      'Wrote internal integration docs, architectural diagrams, and onboarding guides; led code reviews and engineering whiteboards, accelerating junior engineer ramp-up and cross-service knowledge transfer.',
      'Maintained and optimized in-house legacy Flask API endpoints used by partner districts, delivering bug fixes, performance improvements, and schema migrations while ensuring backward compatibility.',
      'Designed ML data pipelines for model preprocessing, feature extraction, and inference.',
    ],
  },
  {
    id: 'renaissance',
    company: 'Renaissance Learning',
    role: 'Software Engineer I',
    start: 'Oct 2019',
    end: 'July 2021',
    location: 'Wisconsin Rapids, WI',
    logo: 'renaissance',
    logoNeedsPlate: true,
    tags: ['Angular', 'RxJS', 'C#', 'GraphQL', 'PostgreSQL', 'MongoDB'],
    bullets: [
      'Built Angular + RxJS micro-frontend components to modernize Star Reading, Star Math, and Star Early Literacy assessment experiences for the Indiana Department of Education, improving usability and assessment delivery performance across thousands of classrooms.',
      'Maintained and enhanced backend benchmark systems built with C#, PostgreSQL, and MongoDB, ensuring district and school-level performance metrics remained accurate, up-to-date, and resilient to data drift over time.',
      'Designed and implemented GraphQL endpoints to support on-demand student report retrieval, eliminating over/under-fetching issues and improving query efficiency, page render times, and overall system responsiveness.',
      'Developed teacher-facing assessment builder features using Angular, C#, PostgreSQL, and MongoDB, enabling educators to construct custom assessments with flexibility while improving student differentiation workflows.',
      'Created and maintained TypeScript libraries supporting SAML authentication hops across Angular apps, standardizing identity flows across product surfaces and reducing duplicated code and integration friction.',
      'Investigated and resolved production issues using S3, SQS, SNS, CloudWatch, and Kinesis Streams, implementing fixes and long-term mitigations to ensure stability, reduce error frequency, and prevent regressions.',
    ],
  },
]

export const projects = [
  {
    id: 'contactless-lie-detector',
    icon: 'wifi',
    name: 'Contactless Lie Detector',
    subtitle: 'WiFi-sensed vitals → HRV → deception scoring',
    status: 'In progress',
    tags: ['WiFi CSI', 'Pulse-Fi', 'HRV', 'Python', 'Signal Processing', 'Machine Learning'],
    bullets: [
      'Designing a passive alternative to polygraph examination that recovers physiological signals over commodity WiFi — no electrodes, no contact sensors, and no examiner in the loop.',
      'Mapped the design against the traditional four-channel polygraph stack (thoracic respiration, abdominal respiration, cardiovascular, electrodermal). WiFi sensing covers the respiratory and cardiovascular channels natively; electrodermal activity — the channel usually treated as most diagnostic — is not recoverable from RF alone, making it the known gap in the approach.',
      'Anchored the signal design on respiratory suppression — shallower, slower breathing following a relevant question relative to baseline — which is among the more reliable deception indicators and already falls out of the WiFi breathing-rate channel.',
      'Selected Pulse-Fi as the sensing layer, extracting heart rate and breathing rate from WiFi channel state information on off-the-shelf hardware.',
      'Targeting heart rate variability rather than average BPM as the primary feature. HRV tracks sympathetic arousal more closely and helps separate physical exertion from a stress response — a distinction average heart rate, which conventional polygraphs lean on, cannot make.',
      'Grounded the scoring model on the methodology behind LieRHRV (Scientific Reports), a remote HRV-only deception model driven by facial video that reported 80% accuracy in a prospective study. The paper documents the method in full even though the implementation is not open source.',
    ],
    pipeline: ['Pulse-Fi WiFi layer', 'Heart rate + breathing rate', 'HRV from beat intervals', 'Deception scoring model'],
    future: [
      "Port LieRHRV's published feature set onto beat intervals recovered from WiFi rather than facial video, using existing open-source Python HRV libraries for the signal-processing layer.",
      'Establish per-subject baselines so every score is measured against that person’s own resting state instead of a population average.',
      'Quantify the accuracy cost of running without the electrodermal channel, and determine whether respiratory suppression features close any of that gap.',
      'Validate against a controlled ground-truth protocol before any accuracy claim is attached to the system.',
      'Package the stack as a documented Python library with a stable API for the sensing, HRV, and scoring layers.',
      'Publish confidence intervals and explicit intended-use limits alongside any result — deception detection is a contested field, and a contactless system invites use where consent is unclear.',
    ],
  },
  {
    id: 'viirs-fire',
    icon: 'flame',
    name: 'Global Fire Incident Analysis & Prediction',
    subtitle: 'NASA VIIRS Satellite Data',
    tags: ['GeoPandas', 'Scikit-learn', 'Random Forest', 'Gradient Boosting', 'Pandas'],
    bullets: [
      'Analyzed 74,000+ global fire detections from NASA VIIRS satellite data, performing end-to-end exploratory data analysis, geospatial visualization, and statistical modeling to understand global fire behavior patterns.',
      'Built geospatial heatmaps and regional fire clustering analyses across Africa, the Americas, Asia, and Australia using GeoPandas and Natural Earth datasets to identify biome- and region-specific fire activity.',
      'Developed and evaluated multi-class fire confidence classifiers (Logistic Regression, Random Forest), achieving 96% accuracy and significantly improving minority-class performance.',
      'Identified key predictive drivers of fire confidence and intensity, with mid-infrared brightness temperature (bright_ti4) emerging as the dominant feature via feature selection and model interpretability analysis.',
      'Implemented a Gradient Boosting regression pipeline to predict Fire Radiative Power (FRP), capturing ~50% of variance and highlighting the need for richer spatiotemporal features.',
      'Delivered publication-quality visualizations (correlation heatmaps, global maps, regional zoom-ins) and technical insights suitable for environmental monitoring and decision support.',
    ],
  },
]

export const education = [
  {
    id: 'cmu',
    school: 'Carnegie Mellon University',
    degree: 'Master of Science, Educational Technology and Applied Learning Sciences',
    location: 'Pittsburgh, PA, USA',
    date: 'Aug 2019',
    dates: '2018 – 2019',
    logo: 'cmu',
    coursework: [
      'Applied Machine Learning',
      'Human-AI Interaction',
      'Personalized Online Learning',
      'Advanced Topics in Personalized Learning',
      'E-Learning Design Principles',
      'Design of Educational Games',
      'Tools for Online Learning',
      'Interaction Design Overview',
      'Educational Goals, Instruction and Assessment',
      'METALS Project I',
      'METALS Project II',
    ],
    awards: [
      'METALS Scholarship',
      'Merit Scholarship (Aug 2018) — awarded for academic and professional record',
    ],
  },
  {
    id: 'niit',
    school: 'NIIT University',
    degree: 'Bachelor of Technology, Computer Science and Engineering',
    location: 'Alwar, Rajasthan, India',
    date: 'Aug 2017',
    dates: '2013 – 2017',
    logo: 'niit',
    logoNeedsPlate: true,
    coursework: [
      {
        group: '',
        items: [
          'Computer Programming',
          'Data Structures',
          'Object Oriented Programming',
          'Design & Analysis of Algorithms',
          'Database Management Systems',
          'Operating Systems',
          'Computer Networks',
          'Computer Architecture & Organisation',
          'Software Engineering',
          'Theory of Computation',
          'Compiler Design',
          'Mobile Computing',
          'Discrete Mathematics',
        ],
      }
    ],
    awards: ['Merit Scholarship', 'Chess Club President'],
  },
]

export const languages = [
  { name: 'English', level: 'Native / bilingual' },
  { name: 'Hindi', level: 'Full professional' },
  { name: 'Marathi', level: 'Full professional' },
  { name: 'Telugu', level: 'Full professional' },
]

export const skills = [
  { category: 'Languages', items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C#', 'SQL'] },
  {
    category: 'Frameworks',
    items: ['Spring Boot', 'Flask', 'React', 'Angular', 'MUI', 'RxJS'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['AWS S3', 'AWS SQS', 'AWS SNS', 'Kinesis', 'CloudWatch', 'Kubernetes', 'Docker', 'Terraform'],
  },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL'] },
  { category: 'DevOps & CI/CD', items: ['Jenkins', 'CircleCI', 'GitHub Actions', 'Helm'] },
  {
    category: 'Machine Learning Libraries',
    items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost', 'Pandas', 'NumPy', 'SciPy', 'NLTK', 'SpaCy'],
  },
  { category: 'ML Deployment', items: ['MLflow', 'Kubeflow', 'Airflow'] },
  {
    category: 'Data Visualization',
    items: ['Tableau', 'Power BI', 'Seaborn', 'Matplotlib', 'Excel', 'GeoPandas', 'Scikit-learn'],
  },
  { category: 'Testing & Automation', items: ['JMeter', 'PyTest', 'JUnit', 'Postman', 'Selenium'] },
  { category: 'Version Control', items: ['Git', 'GitHub', 'Bitbucket'] },
  {
    category: 'Development Practices',
    items: [
      'Agile/Scrum',
      'Test-Driven Development',
      'Code Reviews',
      'Technical Documentation',
      'Performance Optimization',
    ],
  },
]

export const awards = [
  {
    id: 'bl-2023',
    medal: 'silver',
    org: 'BetterLesson',
    name: 'BetterLesson Hackathon — Second Prize',
    year: '2023',
    description:
      'Developed a data-driven application that simplified district customer acquisition by aggregating and operationalizing public Tier 1 and Tier 2 funding datasets to improve targeting accuracy.',
    details: [
      'Built during BetterLesson\u2019s annual internal hackathon, aimed at the go-to-market side of the business rather than the product surface.',
      'Pulled the public Tier 1 and Tier 2 education funding datasets districts draw on into a single queryable view, reconciling the differing formats and reporting periods each jurisdiction publishes.',
      'Turned that into a targeting signal: which districts actually hold funds that can be spent on professional development, so outreach is prioritized by budget availability rather than by district size or an existing relationship.',
    ],
  },
  {
    id: 'bl-2022',
    medal: 'gold',
    org: 'BetterLesson',
    name: 'BetterLesson Hackathon — First Prize',
    year: '2022',
    description:
      'Built the Learning Walk Digital app, a tool to digitally aggregate insights offered by school leaders. Implemented features to ensure offline access is maintained as teachers switch between classrooms.',
    details: [
      'A Learning Walk is a structured observation cycle — define the classroom "look-fors" tied to a school initiative, observe together, calibrate in hallway huddles, then turn what was collected into a development plan. The app digitized that loop end to end.',
      'Capturing observations digitally is what makes them aggregate: trends surface across classrooms, grade levels and schools, and the same walk can be re-run over a term to track whether practice actually moved.',
      'Offline-first capture was the governing constraint. Observers move between classrooms and buildings where WiFi is unreliable, so the app had to keep recording through dead zones and reconcile once it reconnected.',
      'BetterLesson frames the underlying problem as a time gap — principals spend roughly 12.6% of their time on instruction-related work. The prototype went on to become a shipped product, which the company now reports at 96% educator satisfaction with facilitator support.',
    ],
    source: { label: 'BetterLesson — Learning Walks', url: 'https://betterlesson.com/learning-experiences/learning-walks' },
  },
  {
    id: 'upmc-2018',
    medal: 'gold',
    org: 'Children\u2019s Hospital of Pittsburgh Foundation',
    name: 'HACK THIS. HELP KIDS. Hackathon for Hope — First Place',
    year: '2018',
    description:
      'Built a functional prototype for a device that monitors the temperature and quality of breast milk for NICU patients.',
    details: [
      'A 24-hour hackathon held at Carnegie Mellon\u2019s Tepper Quad with around 300 participants. Hospital staff opened by presenting 11 real pain points, ranging from medication scheduling to asthma demographics analysis.',
      'Team "Thirsty Scholars" took first place and the $5,000 prize with Hope: A Smart Neonatal Nutrition Supply System, tackling breast-milk storage and delivery in the NICU.',
      'The build paired hardware and software to track each bottle\u2019s temperature and expiry while matching it to the correct patient — pitched at the time as "a Fitbit for the breast milk bottles in the NICU" — with a dashboard giving nursing staff oversight.',
      'Six-person team, two of us from the CMU Human-Computer Interaction Institute.',
    ],
    source: {
      label: 'CMU HCII — Hacking for Kids',
      url: 'https://www.hcii.cmu.edu/news/hacking-kids-upmc-hcii-students-1st-and-4th-place-teams',
    },
  },
  {
    id: 'aiesep-2016',
    medal: 'gold',
    org: 'Global Energy Parliament',
    name: 'Students\u2019 Energy Parliament — Best Written Submission',
    year: '2016',
    description:
      'Wrote a five-year detailed plan for digitizing educational resources, which was implemented by the state of Kerala, India.',
    details: [
      'The Students\u2019 Energy Parliament is a working body rather than a model UN — delegates are seated by academic discipline (biology, physics, arts, law) instead of by governance portfolio, and collaborate across those specialties to draft resolutions.',
      'The All-India session ran in February 2016 in the Assembly Hall of the Kerala State Secretariat in Thiruvananthapuram, drawing delegates from universities across the country.',
      'It is organized by the Isa Viswa Prajnana Trust, which holds special consultative status with the UN Economic and Social Council; its resolutions target UN Sustainable Development Goals 4 and 16.',
    ],
    source: {
      label: 'Global Energy Parliament — Students\u2019 Energy Parliament',
      url: 'https://www.global-energy-parliament.net/students-energy-parliament',
    },
  },
]
